import { UseMIDIInputExample } from './UseMIDIInputExample'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MIDIProvider } from '../../../MIDIContext/MIDIProvider'

const meta: Meta<typeof UseMIDIInputExample> = {
  component: UseMIDIInputExample,
  title: 'hooks/useMIDIInput',
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UseMIDIInputExample>

export const Primary: Story = {
  name: 'Primary',
}
