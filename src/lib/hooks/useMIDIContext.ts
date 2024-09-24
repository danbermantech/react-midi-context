import { useSelektor } from 'use-selektor'
import { MIDIContextValue } from '../types'
import { MIDIContext } from '../MIDIContext/MIDIContext'

export function useMIDIContext<T>(selektor: (args: MIDIContextValue) => T) {
  return useSelektor(selektor, MIDIContext)
}
