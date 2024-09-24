import { useMIDIContext } from './useMIDIContext'

export function useMIDIInput(requestedDevice: number | string) {
  const midiInputs = useMIDIContext((cv) => cv.midiInputs)
  let device: WebMidi.MIDIInput
  try {
    if (typeof requestedDevice == 'number') {
      device = midiInputs[requestedDevice]
    } else {
      device = midiInputs.filter((device: WebMidi.MIDIInput) => device.name === requestedDevice)[0]
    }
    if (!('connection' in device)) throw new Error('no device')
    if (device.connection == 'closed') device.open()
    return device
  } catch (err) {
    return null
  }
}
