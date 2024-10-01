import { useMIDIContext } from '../../../hooks'
import { MessageTypes } from '../../../types'

export const UseMIDIContextExample = () => {
  const initializeMIDI = useMIDIContext((ctx) => ctx.initializeMIDI)
  const openMIDIInput = useMIDIContext((ctx) => ctx.openMIDIInput)
  const sendMIDIMessage = useMIDIContext((ctx) => ctx.sendMIDIMessage)
  const sendMIDICC = useMIDIContext((ctx) => ctx.sendMIDICC)
  const sendMIDINoteOn = useMIDIContext((ctx) => ctx.sendMIDINoteOn)
  const sendMIDINoteOff = useMIDIContext((ctx) => ctx.sendMIDINoteOff)
  const midiAccess = useMIDIContext((ctx) => ctx.midiAccess)
  const midiInputs = useMIDIContext((ctx) => ctx.midiInputs)
  const midiOutputs = useMIDIContext((ctx) => ctx.midiOutputs)
  const connectedMIDIInputs = useMIDIContext((ctx) => ctx.connectedMIDIInputs)
  const addMIDIInput = useMIDIContext((ctx) => ctx.addMIDIInput)
  const removeMIDIInput = useMIDIContext((ctx) => ctx.removeMIDIInput)
  const connectedMIDIOutputs = useMIDIContext((ctx) => ctx.connectedMIDIOutputs)
  const addMIDIOutput = useMIDIContext((ctx) => ctx.addMIDIOutput)
  const removeMIDIOutput = useMIDIContext((ctx) => ctx.removeMIDIOutput)

  if (!midiAccess) return <div>no midi access</div>
  return (
    <>
      <button onClick={() => initializeMIDI((err) => console.error(err))}>initializeMIDI</button>
      <button onClick={() => openMIDIInput({ input: [...midiAccess!.inputs.values()][0] })}>openMIDIInput</button>
      <button onClick={() => addMIDIInput([...midiAccess!.inputs.values()][0])}>addMIDIInput</button>
      <button onClick={() => removeMIDIInput([...midiAccess!.inputs.values()][0])}>removeMIDIInput</button>
      <button onClick={() => addMIDIOutput([...midiAccess!.outputs.values()][0])}>addMIDIOutput</button>
      <button onClick={() => removeMIDIOutput([...midiAccess!.outputs.values()][0])}>removeMIDIOutput</button>
      <button
        onClick={() =>
          sendMIDIMessage({ channel: 0, cc: 0, type: MessageTypes.afterTouch, value: 64, device: midiOutputs[0] })
        }
      >
        sendMIDIMessage
      </button>
      <button onClick={() => sendMIDICC({ channel: 0, cc: 0, value: 64, device: midiOutputs[0] })}>sendMIDICC</button>
      <button onClick={() => sendMIDINoteOn({ channel: 0, pitch: 60, velocity: 127, device: midiOutputs[0] })}>
        sendMIDINoteOn
      </button>
      <button onClick={() => sendMIDINoteOff({ channel: 0, pitch: 60, device: midiOutputs[0] })}>
        sendMIDINoteOff
      </button>
      <h2>Inputs</h2>
      <div>{midiInputs.map((input) => input?.name)}</div>
      <h2>Outputs</h2>
      <div>{midiOutputs.map((output) => output?.name)}</div>
      <h2>Connected Inputs</h2>
      <div>{connectedMIDIInputs.map((input) => input?.name)}</div>
      <h2>Connected Outputs</h2>
      <div>{connectedMIDIOutputs.map((output) => output?.name)}</div>
    </>
  )
}
