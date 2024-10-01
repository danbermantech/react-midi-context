export function formatRawMIDIMessage(event: WebMidi.MIDIMessageEvent): {
  data: Uint8Array
  timeStamp: number
  str: string
} {
  let str = ''
  for (let i = 0; i < event.data.length; i += 1) {
    str += `0x${event.data[i].toString(16)} `
  }
  return { data: event.data, timeStamp: event.timeStamp, str }
}
