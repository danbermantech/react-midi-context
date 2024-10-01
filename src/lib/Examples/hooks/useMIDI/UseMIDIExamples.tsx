import { useState } from 'react'
import { useMIDI, useMIDIContext } from '../../../hooks'

export const UseMIDIWithArgsExample = () => {
  const device = useMIDIContext((cv) => cv.midiOutputs[0])
  const send = useMIDI({ channel: 1, cc: 1, device })
  return <button onClick={() => send(127)}>Send MIDI Message</button>
}

export const UseMIDIWithoutArgsExample = () => {
  const { sendMIDIMessage, sendMIDINoteOn, sendMIDINoteOff, midiOutputs } = useMIDI()

  const [selectedOutput, setSelectedOutput] = useState<WebMidi.MIDIOutput | null>(null)

  return (
    <div>
      <label htmlFor="midiOutputSelect">
        MIDI Output
        <select
          id="midiOutputsSelect"
          onChange={(e) => setSelectedOutput(midiOutputs.find((output) => output.id === e.target.value) ?? null)}
        >
          <option key="none" value={undefined}>
            {' '}
            -{' '}
          </option>
          {midiOutputs.map((output) => (
            <option key={output.id} value={output.id}>
              {output.name}
            </option>
          ))}
        </select>
      </label>
      <button
        disabled={selectedOutput == null}
        onClick={() => sendMIDIMessage({ channel: 1, pitch: 1, velocity: 127, device: selectedOutput! })}
      >
        Send MIDI Message
      </button>
      <button
        disabled={selectedOutput == null}
        onClick={() => sendMIDINoteOn({ channel: 1, pitch: 60, velocity: 127, device: selectedOutput! })}
      >
        Send MIDI Note On
      </button>
      <button
        disabled={selectedOutput == null}
        onClick={() => sendMIDINoteOff({ channel: 1, pitch: 60, device: selectedOutput! })}
      >
        Send MIDI Note Off
      </button>
    </div>
  )
}
