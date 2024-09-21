import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { UserConfigExport } from 'vite'
import { name } from './package.json'

const app = async (): Promise<UserConfigExport> => {
  /**
   * Removes everything before the last
   * @octocat/library-repo -> library-repo
   * vite-component-library-template -> vite-component-library-template
   */
  console.log(name)
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name
  console.log(formattedName)
  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        // entry: path.resolve(__dirname, 'src/lib/index.ts'),
        entry: {
          main: path.resolve(__dirname, 'src/lib/index.ts'),
          components: path.resolve(__dirname, 'src/lib/components/index.ts'), // Add components
          hooks: path.resolve(__dirname, 'src/lib/hooks/index.ts'), // Add hooks
        },
        name: formattedName,
        formats: ['es'],
        fileName: (format, entryName) => {
          console.log(entryName)
          if (entryName === 'main') return `${formattedName}.js`
          else return `${entryName}/index.js`
        },
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  })
}
// https://vitejs.dev/config/
export default app
