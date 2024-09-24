![react-midi-context](https://i.postimg.cc/YkN97Qg4/react-midi-context-2.png)

# react-midi-context

The easiest way to work with MIDI in React

![sizeMin](https://img.shields.io/bundlephobia/min/react-midi-context)
![sizeMinZip](https://img.shields.io/bundlephobia/minzip/react-midi-context)
![languages](https://img.shields.io/github/languages/top/danbermantech/react-midi-context)
![GitHub package.json version](https://img.shields.io/github/package-json/v/danbermantech/react-midi-context)
![NPM License](https://img.shields.io/npm/l/react-midi-context)

## Features

- **TypeScript Support**: Includes TypeScript definitions for a smoother development experience.
- **Public Storybook**: Explore and interact with the components live at [react-midi-context.danberman.dev](https://react-midi-context.danberman.dev).

## Installation

To install `react-midi-context`, use npm, Yarn, or pnpm:

```bash
npm install react-midi-context
```

or with Yarn:

```bash
yarn add react-midi-context
```

or with pnpm:

```bash
pnpm add react-midi-context
```

If you're using TypeScript you may also want to install `@types/webmidi` as a dev dependency

## Usage

### Wrap your app in the `MIDIProvider`

#### Example

```tsx
import { MIDIProvider } from 'react-midi-context'
import { App } from './app'
export const WrappedApp = () => {
  return (
    <MIDIProvider onError={console.error}>
      <App />
    </MIDIProvider>
  )
}
```

### Then use the hookes provided in your components

#### Example

```tsx
const SendCCRange = () => {
  const sendMIDICC = useMIDIContext((cv) => cv.sendMIDICC)
  const midiOutputs = useMIDIContext((cv) => cv.midiOutputs)
  const device = Object.values(midiOutputs)[0]
  const [value, setValue] = useState(0)
  if (!device) return <>No device found, sorry</>
  return (
    <label style={{ display: 'flex', flexFlow: 'column', width: 'max-content', maxWidth: '100%' }}>
      <br />
      Current value: {value}
      <input
        type="range"
        min="0"
        max="127"
        value={value}
        onChange={(e) => {
          sendMIDICC({ channel: 0, cc: 0, value: parseInt(e.currentTarget.value), device })
          setValue(parseInt(e.currentTarget.value))
        }}
      />
    </label>
  )
}
```

## Public Storybook

Explore and interact with the `react-midi-context` components in our publicly available Storybook at [react-midi-context.danberman.dev](https://react-midi-context.danberman.dev). This is a great way to see the components in action and understand how different styles and props affect their appearance.

## Contributing

To contribute to `react-midi-context`:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a Pull Request on GitHub.

## License

`react-midi-context` is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

## Additional Resources

- [GitHub Repository](https://github.com/DanBermanTech/react-midi-context) – Source code and issue tracking.

Thank you for choosing `react-midi-context`!
