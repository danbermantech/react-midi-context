import { Recording } from '../../types'
import { parseRecordingToMidiFile } from './parseRecordingToMidiFile'

function exportRecording(recording: Recording) {
  const midiData = parseRecordingToMidiFile(recording)
  const url = URL.createObjectURL(midiData)
  const a = document.createElement('a')
  a.href = url
  a.download = 'recording.mid'
  a.click()
  URL.revokeObjectURL(url)
}
