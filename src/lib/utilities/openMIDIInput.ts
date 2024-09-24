import { OpenMIDIInputArgs } from '../types'
import { onMIDIMessage } from './onMIDIMessage'
import { translateRawMessageToObject } from './translateRawMessageToObject'

export async function openMIDIInput(props: OpenMIDIInputArgs): Promise<WebMidi.MIDIInput | Error> {
  const { input, callback } = props
  if (typeof input !== 'object') return new Error('No input supplied')
  if (input.connection === 'open' && !callback) return input
  if (typeof callback === 'function') {
    const cb = (msg: WebMidi.MIDIMessageEvent) => {
      const message = onMIDIMessage(msg)
      const translated = translateRawMessageToObject(message.data)
      callback(translated)
    }
    input.onmidimessage = (msg: WebMidi.MIDIMessageEvent) => {
      cb(msg)
    }
  }
  await input.open()
  return input
}
