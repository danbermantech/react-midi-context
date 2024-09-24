import { SendMIDICCArgs, SendMIDINoteOffArgs, SendMIDINoteOnArgs, MIDICommand } from '../types'
import { useMIDIContext } from './useMIDIContext'

export function useMIDIActions(device?: WebMidi.MIDIOutput) {
  const sendMIDICC = useMIDIContext((cv) => cv.sendMIDICC)
  const sendMIDIMessage = useMIDIContext((cv) => cv.sendMIDIMessage)
  const sendMIDINoteOn = useMIDIContext((cv) => cv.sendMIDINoteOn)
  const sendMIDINoteOff = useMIDIContext((cv) => cv.sendMIDINoteOff)

  if (!device) {
    return { sendMIDICC, sendMIDIMessage, sendMIDINoteOn, sendMIDINoteOff }
  }
  return {
    sendMIDICC: (command: SendMIDICCArgs) => {
      sendMIDICC({ device, ...command })
    },
    sendMIDIMessage: (command: MIDICommand) => {
      sendMIDIMessage({ device, ...command })
    },
    sendMIDINoteOn: (command: SendMIDINoteOnArgs) => {
      sendMIDINoteOn({ device, ...command })
    },
    sendMIDINoteOff: (command: SendMIDINoteOffArgs) => {
      sendMIDINoteOff({ device, ...command })
    },
  }
}
