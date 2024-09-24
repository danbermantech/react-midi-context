import { useCallback, useRef } from 'react'
import type { GetStoreDataArgs, SetStoreDataArgs } from '../types'

export function useStoreData() {
  const store: React.MutableRefObject<{
    byDevice: any
    byChannel: any
  }> = useRef({ byDevice: {}, byChannel: {} })

  const get = useCallback((props?: GetStoreDataArgs) => {
    if (!props) return store.current
    const { channel, cc, device } = props
    if (device) {
      return [...store.current.byDevice[device.id]].filter((record) => {
        if (channel && record.channel !== channel) return false
        if (cc && record.cc !== cc) return false
        return true
      })
    }
    if (!channel) return store.current
    if (!cc) return store.current.byChannel[channel]
    return store.current.byChannel[channel][cc]
  }, [])

  const set = useCallback((value: SetStoreDataArgs) => {
    store.current = {
      byChannel: {
        ...store.current.byChannel,
        [value.channel]: {
          ...store.current.byChannel[value.channel],
          [value.cc]: value.value,
        },
      },
      byDevice: {
        ...store.current.byDevice,
        [value.device.id]: {
          ...store.current.byDevice[value.device.id],
          [value.channel]: {
            ...store.current.byDevice[value.device.id]?.[value.channel],
            [value.cc]: value.value,
          },
        },
      },
    }
  }, [])

  const subscribers = useRef(new Set())

  const subscribe = useCallback(
    (callback: Function) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    },
    [subscribers],
  )

  return {
    get,
    set,
    subscribe,
  }
}
