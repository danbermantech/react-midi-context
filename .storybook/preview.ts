import type { Preview } from '@storybook/react'
import theme from './theme'

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
}

export default preview
