import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  // UseMIDIWithArgsExample,
  UseMIDIWithoutArgsExample,
} from './UseMIDIExamples'
import { MIDIProvider } from '../../../MIDIContext/MIDIProvider'

const meta: Meta<typeof UseMIDIWithoutArgsExample> = {
  component: UseMIDIWithoutArgsExample,
  title: 'hooks/useMIDI/without args',
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UseMIDIWithoutArgsExample>

export const WithoutArgs: Story = {
  name: 'Without Args',
}
