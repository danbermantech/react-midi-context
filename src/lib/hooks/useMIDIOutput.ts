import { useMIDIContext } from './useMIDIContext'
import type { SendMIDICCArgs, SendMIDINoteOffArgs, SendMIDINoteOnArgs, MIDICommand } from '../types'

export function useMIDIOutput(requestedDevice: number | string) {
  const midiOutputs = useMIDIContext((cv) => cv.midiOutputs)
  const sendMIDICC = useMIDIContext((cv) => cv.sendMIDICC)
  const sendMIDIMessage = useMIDIContext((cv) => cv.sendMIDIMessage)
  const sendMIDINoteOn = useMIDIContext((cv) => cv.sendMIDINoteOn)
  const sendMIDINoteOff = useMIDIContext((cv) => cv.sendMIDINoteOff)

  let device =
    typeof requestedDevice == 'number'
      ? midiOutputs[requestedDevice]
      : midiOutputs.filter((device) => device.name === requestedDevice)[0]
  if (!device) {
    return {
      device,
      sendMIDICC: () => {},
      sendMIDIMessage: () => {},
      sendMIDINoteOn: () => {},
      sendMIDINoteOff: () => {},
    }
  }
  return {
    device,
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
