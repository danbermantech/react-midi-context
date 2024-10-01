import React from 'react'
import type { Preview } from '@storybook/react'
import theme from './theme'
import { MIDIProvider } from '../src/lib/MIDIContext/MIDIProvider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    theme,
    options: {
      storySort: {
        order: ['hooks/*', 'components/*'],
      },
    },
  },
  decorators: [
    (Story) => (
      <MIDIProvider onError={console.error}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </MIDIProvider>
    ),
  ],
}

export default preview
