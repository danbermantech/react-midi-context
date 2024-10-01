import { UseMIDIActionsExample } from './UseMIDIActionsExample'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MIDIProvider } from '../../../MIDIContext/MIDIProvider'

const meta: Meta<typeof UseMIDIActionsExample> = {
  component: UseMIDIActionsExample,
  title: 'hooks/useMIDIActions',
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UseMIDIActionsExample>

export const Primary: Story = {
  name: 'Primary',
}
