import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useMIDIContext } from '../hooks/useMIDIContext'
import { useState } from 'react'
import { MessageObject } from '../types'
import { MIDIProvider } from '../MIDIContext/MIDIProvider'

const List = () => {
  const inputs = useMIDIContext((cv) => cv.midiInputs)
  const outputs = useMIDIContext((cv) => cv.midiOutputs)
  return (
    <div>
      <h2>Inputs</h2>
      <ul>
        {inputs.map((input, i) => (
          <li key={i}>{input.name}</li>
        ))}
      </ul>
      <h2>Outputs</h2>
      <ul>
        {outputs.map((output, i) => (
          <li key={i}>{output.name}</li>
        ))}
      </ul>
    </div>
  )
}

const SendCC = () => {
  const sendMIDICC = useMIDIContext((cv) => cv.sendMIDICC)
  const midiOutputs = useMIDIContext((cv) => cv.midiOutputs)
  const device = Object.values(midiOutputs)[0]
  const [value, setValue] = useState(0)
  if (!device) return <>No device found, sorry</>
  return (
    <label style={{ display: 'flex', flexFlow: 'column', width: 'max-content', maxWidth: '100%' }}>
      <div>
        Use the slider below to send a MIDI CC message on channel 1 control 0<code>(0|0|x)</code>
        to your first midi output (<code style={{ fontWeight: 600 }}>"{device.name}"</code>)
      </div>
      <br />
      Current value: {value}
      <input
        type="range"
        min="0"
        max="127"
        value={value}
        onChange={(e) => {
          sendMIDICC({ channel: 0, cc: 0, value: parseInt(e.currentTarget.value), device })
          setValue(parseInt(e.currentTarget.value))
        }}
      />
    </label>
  )
}

const SendNote = () => {
  const sendMIDINoteOn = useMIDIContext((cv) => cv.sendMIDINoteOn)
  const sendMIDINoteOff = useMIDIContext((cv) => cv.sendMIDINoteOff)
  const midiOutputs = useMIDIContext((cv) => cv.midiOutputs)
  const device = Object.values(midiOutputs)[0]
  if (!device) return <>No device found, sorry</>
  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <div>
        Use the buttons below to send MIDI Note On and Note Off messages on channel 1 with pitch 60 (C3) to your first
        midi output (<code style={{ fontWeight: 600 }}>"{device.name}"</code>)
      </div>
      <div>
        <button onPointerDown={() => sendMIDINoteOn({ channel: 0, pitch: 60, value: 127, device })}>
          Send Note On message
        </button>
        <button onPointerDown={() => sendMIDINoteOff({ channel: 0, pitch: 60, device })}>Send Note Off message</button>
      </div>
    </div>
  )
}

const ViewIncomingMessages = () => {
  const addMIDIInput = useMIDIContext((cv) => cv.addMIDIInput)
  const removeMIDIInput = useMIDIContext((cv) => cv.removeMIDIInput)
  const midiInputs = useMIDIContext((cv) => cv.midiInputs)
  const [messages, setMessages] = useState<MessageObject[]>([])
  const [mostRecent, setMostRecent] = useState('')
  return (
    <>
      <button
        onClick={() => {
          addMIDIInput(midiInputs[0], (message: MessageObject) => {
            // setMostRecent(prev=>prev+JSON.stringify(Object.values(message)))
            setMessages((prev) => [message, ...prev])
          })
        }}
      >
        Enable "{midiInputs[0]?.name}"
      </button>
      <button
        onClick={() => {
          removeMIDIInput(midiInputs[0])
        }}
      >
        Disable "{midiInputs[0]?.name}"
      </button>
      <button
        onClick={() => {
          setMessages([])
        }}
      >
        Clear messages
      </button>
      <div>{mostRecent}</div>
      <ul style={{ height: '20rem', overflow: 'auto' }}>
        {messages.map((message, i) => (
          <li key={i}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </>
  )
}

const meta: Meta<typeof MIDIProvider> = {
  component: MIDIProvider,
  render: (props) => {
    const children = (() => {
      switch (props.children) {
        case 'Device List':
          return <List />
        case 'Send CC':
          return <SendCC />
        case 'Send Note':
          return <SendNote />
        case 'View Incoming Messages':
          return <ViewIncomingMessages />
        default:
          return <></>
      }
    })()
    return <MIDIProvider onError={console.error}>{children}</MIDIProvider>
  },
  argTypes: {
    children: {
      control: {
        type: 'select',
      },
      options: ['Device List', 'Send CC', 'Send Note', 'View Incoming Messages'],
    },
  },
  title: 'Examples',
}

export default meta
type Story = StoryObj<typeof MIDIProvider>

export const Devices: Story = {
  args: {
    children: 'Device List',
  },
  name: 'Device List',
}

export const SendCCStory: Story = {
  args: {
    children: 'Send CC',
  },
  name: 'Send CC',
}

export const SendNoteStory: Story = {
  args: {
    children: 'Send Note',
  },
  name: 'Send Note',
}

export const ViewIncomingMessagesStory: Story = {
  args: {
    children: 'View Incoming Messages',
  },
  name: 'View Incoming Messages',
}
