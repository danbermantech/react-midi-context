import { MessageTypes, MIDICommand } from '../types'
import { translateTypeToStatusByte } from './translateTypeToStatusByte'

export function sendMIDIMessage(props: MIDICommand): string {
  const { channel, cc, value, pitch, device, type = MessageTypes.cc, log } = props

  const firstStatusByte = translateTypeToStatusByte(type)
  const statusBytes = firstStatusByte + (channel ?? 0)
  const msg = [statusBytes, pitch || cc || 0, value || 0]
  if (device) {
    try {
      device.send(msg)
    } catch (error) {
      if (log) console.warn(error)
      return 'an error occured.'
    }
    return `MIDI message successfully sent : ${msg}`
  }
  return 'No device specified'
}
