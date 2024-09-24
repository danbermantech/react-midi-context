import { createContext } from 'react'
import type { MIDIContextValue } from '../types'

export const MIDIContext = createContext<MIDIContextValue>({} as MIDIContextValue)
