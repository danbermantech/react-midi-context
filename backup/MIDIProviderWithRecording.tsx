import React, { useMemo, useReducer, useCallback, useState, useEffect } from 'react'
// import { useStoreData } from '../src/lib/hooks/useStoreData'
import { simpleReducer } from '../src/lib/utilities/simpleReducer'
import { openMIDIInput } from '../src/lib/utilities/openMIDIInput'
import { closeMIDIInput } from '../src/lib/utilities/closeMIDIInput'
import { sendMIDIMessage } from '../src/lib/utilities/sendMIDIMessage'
import { MIDIContext } from '../src/lib/MIDIContext/MIDIContext'
import {
  SendMIDICCArgs,
  SendMIDINoteOffArgs,
  SendMIDINoteOnArgs,
  MessageTypes,
  // MIDICommand,
  MIDIContextValue,
  // OpenMIDIInputArgs,
  // Recording,
  MessageObject,
} from '../src/lib/types'

export function MIDIProvider(props: { children: React.ReactNode; onError: (err: Error) => void }): JSX.Element {
  const { children, onError } = props

  // const [experimental_recording, experimental_setRecording] = useState<Recording>([])
  // const [experimental_isRecording, experimental_setIsRecording] = useState<boolean>(false)
  const [connectedMIDIInputs, setConnectedMIDIInputs] = useReducer(simpleReducer<WebMidi.MIDIInput>, [])
  const [connectedMIDIOutputs, setConnectedMIDIOutputs] = useReducer(simpleReducer<WebMidi.MIDIOutput>, [])
  // const [experimental_savedRecordings, experimental_setSavedRecordings] = useState<Recording[]>([])

  const [midiAccess, setMIDIAccess] = useState<WebMidi.MIDIAccess | null>(null)
  const [midiInputs, setMIDIInputs] = useState<WebMidi.MIDIInput[]>([])
  const [midiOutputs, setMIDIOutputs] = useState<WebMidi.MIDIOutput[]>([])

  // const recordMessage = useCallback(
  //   (command: MIDICommand) => {
  //     experimental_setRecording((prev: Recording) => [...prev, { command, time: Date.now() }])
  //   },
  //   [experimental_setRecording],
  // )

  // const experimental_startRecording = useCallback(() => {
  //   experimental_setIsRecording(true)
  // }, [])

  // const experimental_saveRecording = useCallback(() => {
  //   experimental_setSavedRecordings((prev: Recording[]) => [...prev, experimental_recording])
  //   experimental_setRecording([])
  //   experimental_setIsRecording(false)
  // }, [experimental_setSavedRecordings, experimental_setRecording, experimental_setIsRecording, experimental_recording])
  // const { get: experimental_getMIDIValue, set: experimental_setMIDIValue, subscribe:experimental_subscribe } = useStoreData()

  useEffect(() => {
    initializeMIDI(onError)
  }, [])

  const initializeMIDI = useCallback(async (onError: (err: Error) => void) => {
    try {
      if (!('requestMIDIAccess' in navigator)) throw new Error('MIDI is not supported in this browser.')
      const tempMidiAccess = await navigator.requestMIDIAccess()
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
        // experimental_setMIDIValue({
        //   channel,
        //   cc,
        //   value,
        //   device,
        // })
        // if (experimental_isRecording)
        //   recordMessage({
        //     channel,
        //     cc,
        //     value,
        //     device,
        //     type: MessageTypes.cc,
        //   })
      } catch (error: any) {
        onError(error as Error)
      }
    },
    [connectedMIDIOutputs, sendMIDIMessage /*experimental_isRecording, recordMessage, experimental_setMIDIValue */],
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

      // if (experimental_isRecording)
      //   recordMessage({
      //     channel,
      //     pitch,
      //     value: value ?? velocity,
      //     device,
      //     type: MessageTypes.noteOn,
      //   })
    },
    [connectedMIDIOutputs, sendMIDIMessage /*experimental_isRecording, recordMessage*/],
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
      // if (experimental_isRecording)
      //   recordMessage({
      //     channel,
      //     pitch,
      //     value: 0,
      //     device,
      //     type: MessageTypes.noteOff,
      //   })
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
