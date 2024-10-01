import { useMIDIActions, useMIDIContext } from '../../../hooks'
import { MessageTypes } from '../../../types'

export const UseMIDIActionsExample = () => {
  const device = useMIDIContext((cv) => cv.midiOutputs[0])
  const { sendMIDICC, sendMIDIMessage, sendMIDINoteOn, sendMIDINoteOff } = useMIDIActions(device)

  return (
    <>
      <label htmlFor="ccSlider">
        Send CC
        <input
          type="range"
          id="ccSlider"
          name="ccSlider"
          min="0"
          max="127"
          onChange={(e) => sendMIDICC({ channel: 1, cc: 1, value: parseInt(e.currentTarget.value) })}
        ></input>
      </label>
      <label htmlFor="pitchWheel">
        Send Pitch Wheel
        <input
          type="range"
          id="pitchWheel"
          name="messageSlider"
          min="0"
          max="16383"
          onChange={(e) =>
            sendMIDIMessage({
              channel: 1,
              pitch: 1,
              type: MessageTypes.pitchWheel,
              velocity: parseInt(e.currentTarget.value),
            })
          }
        ></input>
      </label>
      <button onClick={() => sendMIDINoteOn({ channel: 1, pitch: 60, velocity: 127 })}>Send Note On</button>
      <button onClick={() => sendMIDINoteOff({ channel: 1, pitch: 60 })}>Send Note Off</button>
    </>
  )
}
