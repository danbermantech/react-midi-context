import { UseMIDIOutputExample } from './UseMIDIOutputExample'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MIDIProvider } from '../../../MIDIContext/MIDIProvider'

const meta: Meta<typeof UseMIDIOutputExample> = {
  component: UseMIDIOutputExample,
  title: 'hooks/useMIDIOutput',
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UseMIDIOutputExample>

export const Primary: Story = {
  name: 'Primary',
}
