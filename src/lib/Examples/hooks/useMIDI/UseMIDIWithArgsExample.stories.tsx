import { UseMIDIWithArgsExample } from './UseMIDIExamples'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MIDIProvider } from '../../../MIDIContext/MIDIProvider'

const meta: Meta<typeof UseMIDIWithArgsExample> = {
  component: UseMIDIWithArgsExample,
  title: 'hooks/useMIDI/with args',
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UseMIDIWithArgsExample>

export const WithArgs: Story = {
  name: 'With Args',
}
