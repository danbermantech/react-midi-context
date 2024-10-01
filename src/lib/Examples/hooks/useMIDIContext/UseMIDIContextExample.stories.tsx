import { UseMIDIContextExample } from './UseMIDIContextExample'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MIDIProvider } from '../../../MIDIContext/MIDIProvider'

const meta: Meta<typeof UseMIDIContextExample> = {
  component: UseMIDIContextExample,
  title: 'hooks/useMIDIContext',
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UseMIDIContextExample>

export const Primary: Story = {
  name: 'Primary',
}
