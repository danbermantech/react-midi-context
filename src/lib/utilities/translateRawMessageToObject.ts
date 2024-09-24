import { MessageObject, MessageTypes } from '../types'
import { translateStatusByteToType } from './translateStatusByteToType'

function combineBytes(first: number, second: number) {
  // Ensure first and second are within 7 bits (0-127)
  first = first & 0x7f // Keep lower 7 bits of 'first'
  second = second & 0x7f // Keep lower 7 bits of 'second'

  // Combine them into a 14-bit value
  // Shift 'second' left by 7 bits to place it in the upper part
  let value = first | (second << 7)

  return value // Return the combined 14-bit value
}

export function translateRawMessageToObject(message: Uint8Array): MessageObject {
  const statusByte = message[0]
  const type = translateStatusByteToType(statusByte)
  const channel = statusByte & 0x0f
  switch (type) {
    case MessageTypes.cc:
      const cc = message[1]
      const value = message[2]
      return {
        type,
        channel,
        cc,
        value,
      }
    case MessageTypes.noteOn:
    case MessageTypes.noteOff:
      const pitch = message[1]
      const velocity = message[2]
      return {
        type,
        channel,
        pitch,
        velocity,
      }
    case MessageTypes.channelPressure:
      return {
        type,
        channel,
        pressure: message[1],
      }
    case MessageTypes.pitchWheel:
      return {
        type,
        channel,
        value: combineBytes(message[1], message[2]),
      }
    case MessageTypes.programChange:
      return {
        type,
        channel,
        value: message[1],
      }
    case MessageTypes.afterTouch:
      return {
        type,
        channel,
        pitch: message[1],
        value: message[2],
      }
    default:
      return {
        type,
        channel,
        value: message[1],
      }
  }
}
