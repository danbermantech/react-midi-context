import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
  stories: [
    // { directory: '../src/examples', files: '@(Example.mdx|*.stories.@(js|jsx|ts|tsx))', titlePrefix: 'Example' },
    '../README.mdx',
    { directory: '../src/lib/MIDIContext', files: '@(*.stories.@(js|jsx|ts|tsx)|*.mdx)' },
    { directory: '../src/lib/hooks', files: '*.stories.@(js|jsx|ts|tsx)', titlePrefix: 'Hooks' },
    { directory: '../src/lib/components', files: '*.stories.@(js|jsx|ts|tsx)', titlePrefix: 'Components' },
    { directory: '../src/lib/Examples', files: '**/@(*.stories.@(js|jsx|ts|tsx)|*.mdx)', titlePrefix: 'Examples' },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '@storybook/addon-theming',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
