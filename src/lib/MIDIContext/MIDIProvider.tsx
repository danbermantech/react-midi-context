import React, { useMemo, useReducer, useCallback, useState, useEffect } from 'react'
import { simpleReducer } from '../utilities/simpleReducer'
import { openMIDIInput } from '../utilities/openMIDIInput'
import { closeMIDIInput } from '../utilities/closeMIDIInput'
import { sendMIDIMessage } from '../utilities/sendMIDIMessage'
import { MIDIContext } from './MIDIContext'
import {
  SendMIDICCArgs,
  SendMIDINoteOffArgs,
  SendMIDINoteOnArgs,
  MessageTypes,
  MIDIContextValue,
  MessageObject,
} from '../types'

export function MIDIProvider(props: { children: React.ReactNode; onError: (err: Error) => void }): JSX.Element {
  const { children, onError } = props

  const [connectedMIDIInputs, setConnectedMIDIInputs] = useReducer(simpleReducer<WebMidi.MIDIInput>, [])
  const [connectedMIDIOutputs, setConnectedMIDIOutputs] = useReducer(simpleReducer<WebMidi.MIDIOutput>, [])

  const [midiAccess, setMIDIAccess] = useState<WebMidi.MIDIAccess | null>(null)
  const [midiInputs, setMIDIInputs] = useState<WebMidi.MIDIInput[]>([])
  const [midiOutputs, setMIDIOutputs] = useState<WebMidi.MIDIOutput[]>([])

  useEffect(() => {
    initializeMIDI(onError)
  }, [])

  const initializeMIDI = useCallback(async (onError: (err: Error) => void) => {
    try {
      if (!('requestMIDIAccess' in navigator)) throw new Error('MIDI is not supported in this browser.')
      const tempMidiAccess = await navigator.requestMIDIAccess({
        software: true,
        sysex: true,
      })
      setMIDIAccess(() => tempMidiAccess)
      setMIDIInputs(() => [...tempMidiAccess.inputs].map((input) => input[1]))
      setMIDIOutputs(() => [...tempMidiAccess.outputs].map((output) => output[1]))
    } catch (error) {
      onError(error as Error)
    }
  }, [])

  const addMIDIInput = useCallback(
    async (input: WebMidi.MIDIInput, callback?: (message: MessageObject) => void): Promise<boolean> => {
      try {
        if (!midiAccess || !('inputs' in midiAccess)) throw new Error('inputs not available.')
        await openMIDIInput({ input, callback: callback ? callback : () => {} })
        setConnectedMIDIInputs({ type: 'add', value: input })
        return true
      } catch (error) {
        return false
      }
    },
    [midiInputs, midiAccess, connectedMIDIInputs],
  )

  const removeMIDIInput = useCallback(
    (input: WebMidi.MIDIInput): boolean => {
      try {
        closeMIDIInput(input)
        setConnectedMIDIInputs({ type: 'remove', value: input })
        return true
      } catch (error) {
        return false
      }
    },
    [midiInputs, midiAccess, connectedMIDIInputs],
  )

  const addMIDIOutput = useCallback(
    (output: WebMidi.MIDIOutput) => {
      try {
        if (!midiAccess || !('outputs' in midiAccess)) throw new Error('outputs not available.')
        setConnectedMIDIOutputs({ type: 'add', value: output })
        return true
      } catch (error) {
        return false
      }
    },
    [midiOutputs, midiAccess, connectedMIDIOutputs],
  )

  const removeMIDIOutput = useCallback(
    (output: WebMidi.MIDIOutput) => {
      try {
        setConnectedMIDIOutputs({ type: 'remove', value: output })
        return true
      } catch (error) {
        return false
      }
    },
    [midiOutputs, midiAccess, connectedMIDIOutputs],
  )

  const sendMIDICC = useCallback(
    (args: SendMIDICCArgs) => {
      const { channel, cc, value, device } = args
      try {
        if (typeof channel !== 'number')
          throw new Error(`no channel provided for cc. Expected a number and received ${channel}`)
        if (typeof cc !== 'number') throw new Error(`no cc# provided for cc. Expected a number and received ${cc}`)
        if (typeof value !== 'number')
          throw new Error(`no value provided for cc. Expected a number and received ${value}`)
        if (!device) throw new Error(`no device provided for cc. Expected a MIDIOutputDevice and recieved ${device}`)
        sendMIDIMessage({
          channel,
          cc,
          value,
          device,
          type: MessageTypes.cc,
        })
      } catch (error: any) {
        onError(error as Error)
      }
    },
    [connectedMIDIOutputs, sendMIDIMessage],
  )

  const sendMIDINoteOn = useCallback(
    (args: SendMIDINoteOnArgs) => {
      const { channel, pitch, value, device, velocity } = args
      if (typeof channel !== 'number')
        throw new Error(`no channel provided for noteOn. Expected a number and received ${channel}`)
      if (typeof pitch !== 'number')
        throw new Error(`no pitch provided for noteOn. Expected a number and received ${pitch}`)
      if (typeof velocity !== 'number' && typeof value !== 'number')
        throw new Error(`no value/velocity provided for noteOn. Expected a number and received ${velocity ?? value}`)
      if (!device) throw new Error(`no device provided for noteOn. Expected a MIDIOutputDevice and recieved ${device}`)
      sendMIDIMessage({
        channel,
        pitch,
        value: value ?? velocity,
        device,
        type: MessageTypes.noteOn,
      })
    },
    [connectedMIDIOutputs, sendMIDIMessage],
  )

  const sendMIDINoteOff = useCallback(
    (args: SendMIDINoteOffArgs) => {
      const { channel, pitch, device } = args
      if (typeof channel !== 'number')
        throw new Error(`no channel provided for noteOff. Expected a number and received ${channel}`)
      if (typeof pitch !== 'number')
        throw new Error(`no pitch provided for noteOff. Expected a number and received ${pitch}`)
      if (!device) throw new Error(`no device provided for noteOff. Expected a MIDIOutputDevice and received ${device}`)
      sendMIDIMessage({
        channel,
        pitch,
        value: 0,
        device,
        type: MessageTypes.noteOff,
      })
    },
    [connectedMIDIOutputs, sendMIDIMessage],
  )

  const value = useMemo(
    (): MIDIContextValue => ({
      initializeMIDI,
      openMIDIInput,
      sendMIDIMessage,
      sendMIDICC,
      sendMIDINoteOn,
      sendMIDINoteOff,
      midiAccess,
      midiInputs,
      midiOutputs,
      connectedMIDIInputs,
      addMIDIInput,
      removeMIDIInput,
      connectedMIDIOutputs,
      addMIDIOutput,
      removeMIDIOutput,
    }),
    [
      midiInputs,
      midiOutputs,
      connectedMIDIInputs,
      connectedMIDIOutputs,
      midiAccess,
      removeMIDIOutput,
      addMIDIOutput,
      removeMIDIInput,
      addMIDIInput,
      sendMIDINoteOff,
      sendMIDINoteOn,
      sendMIDICC,
      sendMIDIMessage,
      initializeMIDI,
      onError,
    ],
  )
  return <MIDIContext.Provider value={value}>{children}</MIDIContext.Provider>
}
