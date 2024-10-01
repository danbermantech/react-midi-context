import { sendMIDIMessage } from '../utilities/sendMIDIMessage'
import { MessageTypes, MIDIContextValue } from '../types'
import { useMIDIContext } from './useMIDIContext'

function useMIDI(): MIDIContextValue
function useMIDI(props: { channel?: number; cc?: number; device?: WebMidi.MIDIOutput }): (value: number) => void

function useMIDI(props?: { channel?: number; cc?: number; device?: WebMidi.MIDIOutput }) {
  const { channel, cc, device } = props ?? {}
  if (typeof channel == 'number' && typeof cc == 'number') {
    return (value: number) => {
      sendMIDIMessage({
        channel,
        cc,
        value,
        device,
        type: MessageTypes.cc,
      })
    }
  }
  return useMIDIContext((cv) => cv)
}

export { useMIDI }
