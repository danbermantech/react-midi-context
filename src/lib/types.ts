import { openMIDIInput } from './utilities/openMIDIInput'
import { sendMIDIMessage } from './utilities/sendMIDIMessage'

export enum MessageTypes {
  noteOff = 'noteOff',
  noteOn = 'noteOn',
  afterTouch = 'afterTouch',
  cc = 'cc',
  controlChange = 'controlChange',
  programChange = 'programChange',
  channelPressure = 'channelPressure',
  pitchWheel = 'pitchWheel',
}

export interface MIDICommand {
  channel: number
  cc?: number
  value?: number
  velocity?: number
  pitch?: number
  device?: WebMidi.MIDIOutput
  type?: MessageTypes
  log?: boolean
}

export type GetStoreDataArgs = {
  channel?: number
  cc?: number
  device?: WebMidi.MIDIInput | WebMidi.MIDIOutput
}

export type SetStoreDataArgs = {
  channel: number
  cc: number
  value: number
  device: WebMidi.MIDIPort
}

export type SendMIDICCArgs = {
  channel: number
  cc: number
  value: number
  device?: WebMidi.MIDIOutput
}

export type SendMIDINoteOnArgs = {
  channel: number
  pitch: number
  value?: number
  velocity?: number
  device?: WebMidi.MIDIOutput
}

export type SendMIDINoteOffArgs = {
  channel: number
  pitch: number
  device?: WebMidi.MIDIOutput
}

export type MessageObject =
  | {
      type: MessageTypes.cc
      channel: number
      cc: number
      value: number
    }
  | {
      type: MessageTypes.noteOn | MessageTypes.noteOff
      channel: number
      pitch: number
      velocity: number
    }
  | {
      type: MessageTypes.channelPressure
      channel: number
      pressure: number
    }
  | {
      type: MessageTypes.programChange
      channel: number
      value: number
    }
  | {
      type: MessageTypes.afterTouch
      channel: number
      pitch: number
      value: number
    }
  | {
      type: MessageTypes
      channel: number
      value: number
    }

export interface OpenMIDIInputArgs {
  input: WebMidi.MIDIInput
  callback?: (message: MessageObject) => void
}

export interface MIDIContextValue {
  initializeMIDI: (onError: (err: Error) => void) => void
  openMIDIInput: typeof openMIDIInput
  sendMIDIMessage: typeof sendMIDIMessage
  sendMIDICC: (args: SendMIDICCArgs) => void
  sendMIDINoteOn: (args: SendMIDINoteOnArgs) => void
  sendMIDINoteOff: (args: SendMIDINoteOffArgs) => void
  midiAccess: WebMidi.MIDIAccess | null
  midiInputs: WebMidi.MIDIInput[]
  midiOutputs: WebMidi.MIDIOutput[]
  connectedMIDIInputs: WebMidi.MIDIInput[]
  addMIDIInput: (input: WebMidi.MIDIInput, callback?: (message: MessageObject) => void) => Promise<boolean>
  removeMIDIInput: (input: WebMidi.MIDIInput) => boolean
  connectedMIDIOutputs: WebMidi.MIDIOutput[]
  addMIDIOutput: (output: WebMidi.MIDIOutput) => boolean
  removeMIDIOutput: (output: WebMidi.MIDIOutput) => boolean
}

export type Recording = {
  command: MIDICommand
  time: number
}[]
