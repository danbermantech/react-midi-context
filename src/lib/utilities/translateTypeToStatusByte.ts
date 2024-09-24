import { MessageObject, MessageTypes } from '../types'

export function translateTypeToStatusByte(type: MessageTypes): number {
  switch (type) {
    case 'noteOff':
      return 0x80
    case 'noteOn':
      return 0x90
    case 'afterTouch':
      return 0xa0
    case 'cc':
      return 0xb0
    case 'controlChange':
      return 0xb0
    case 'programChange':
      return 0xc0
    case 'channelPressure':
      return 0xd0
    case 'pitchWheel':
      return 0xe0
    default:
      return 0x00
  }
}
