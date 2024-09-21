import type { Meta, StoryObj } from '@storybook/react'
import Example from './Example'

const meta: Meta<typeof Example> = {
  component: Example,
}

export default meta
type Story = StoryObj<typeof Example>

export const Primary: Story = {
  name: 'Example',
  args: {
    id: 'example',
    className: 'example',
    style: {
      width: 'auto',
      height: '100px',
      backgroundColor: '#8877ff',
      padding: '16px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem',
      color: 'white',
      fontFamily: 'sans-serif',
    },
    title: 'example',
    role: 'example',
    tabIndex: 1,
    hidden: false,
    lang: 'string',
    dir: 'string',
    children: 'Example',
  },
  // tags: ['autodocs'],
}
