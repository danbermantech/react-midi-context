import { MessageTypes } from '../types'

export function translateStatusByteToType(statusBye: number) {
  switch (statusBye & 0xf0) {
    case 0x80:
      return MessageTypes.noteOff
    case 0x90:
      return MessageTypes.noteOn
    case 0xa0:
      return MessageTypes.afterTouch
    case 0xb0:
      return MessageTypes.cc
    case 0xc0:
      return MessageTypes.programChange
    case 0xd0:
      return MessageTypes.channelPressure
    case 0xe0:
      return MessageTypes.pitchWheel
    default:
      return MessageTypes.noteOff
  }
}
