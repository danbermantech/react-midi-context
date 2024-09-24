import { sendMIDIMessage } from '../utilities/sendMIDIMessage'
import { MessageTypes, MIDIContextValue } from '../types'
import { useMIDIContext } from './useMIDIContext'

function useMIDI(): MIDIContextValue
function useMIDI(props: { channel?: number; cc?: number; device?: WebMidi.MIDIOutput }): {
  sendMIDIMessage: (value: number) => void
}

//Document the following function

/*
    This hook returns a function that sends a MIDI message with a specific channel and control change value. 
    The function takes a parameter that is an object with the following properties:
    - channel: a number that represents the MIDI channel
    - cc: a number that represents the control change value
    - device: a WebMidi.MIDIOutput object that represents the MIDI output device
    The function returns an object with a sendMIDIMessage function that takes a value parameter and sends a MIDI message with the specified channel, control change value, and value.
*/

function useMIDI(props?: { channel?: number; cc?: number; device?: WebMidi.MIDIOutput }) {
  const { channel, cc, device } = props ?? {}
  if (typeof channel == 'number' && typeof cc == 'number') {
    const send = (value: number) => {
      sendMIDIMessage({
        channel,
        cc,
        value,
        device,
        type: MessageTypes.cc,
      })
    }
    return {
      sendMIDIMessage: send,
    }
  }
  return useMIDIContext((cv) => cv)
}

export { useMIDI }
