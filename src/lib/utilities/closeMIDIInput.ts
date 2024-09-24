/**
 * @description Closes and returns the input
 * @param {MIDIInput} input
 * @returns {MIDIInput}
 */
export async function closeMIDIInput(input: WebMidi.MIDIInput): Promise<WebMidi.MIDIInput> {
  await input.close()
  return input
}
