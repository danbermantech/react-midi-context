import { MessageTypes, Recording } from '../../types'
import { translateTypeToStatusByte } from '../translateTypeToStatusByte'

export function parseRecordingToMidiFile(recording: Recording) {
  const header = new Uint8Array([0x4d, 0x54, 0x68, 0x64, 0x00, 0x00, 0x00, 0x06, 0x00, 0x01, 0x00, 0x01, 0x00, 0x80])
  const trackHeader = new Uint8Array([0x4d, 0x54, 0x72, 0x6b])
  const messagesAsRawMIDI = recording.map((record) => {
    const { command, time } = record
    const { channel, cc, value, pitch, type } = command
    const statusByte = translateTypeToStatusByte(type ?? MessageTypes.cc)
    const data = [statusByte + channel, pitch || cc || 0, value || 0]
    return { data, time }
  })
  const trackData = messagesAsRawMIDI.reduce((acc, { data }) => {
    const deltaTime = new Uint8Array([0x00])
    const timeBytes = new Uint8Array([0x00, 0x00, 0x00, 0x00])
    const message = new Uint8Array([...deltaTime, ...timeBytes, ...data])
    return new Uint8Array([...acc, ...message])
  }, new Uint8Array([]))
  const trackLength = new Uint8Array([
    (trackData.length & 0xff000000) >> 24,
    (trackData.length & 0x00ff0000) >> 16,
    (trackData.length & 0x0000ff00) >> 8,
    trackData.length & 0x000000ff,
  ])
  // const trackLength = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
  // const trackData = new Uint8Array([0x00, 0xFF, 0x2F, 0x00]);
  const track = new Uint8Array([...trackHeader, ...trackLength, ...trackData])
  const midiData = new Uint8Array([...header, ...track])
  return new Blob([midiData], { type: 'audio/midi' })
}
