import { useEffect, useState } from 'react'
import { useMIDIContext, useMIDIInput } from '../../../hooks'
import { MessageObject } from '../../../types'

export const UseMIDIInputExample = () => {
  const device = useMIDIInput(1)
  const openMIDIInput = useMIDIContext((cv) => cv.openMIDIInput)
  const [lastMessage, setLastMessage] = useState<MessageObject>()

  useEffect(() => {
    if (!device) return
    if (device.connection === 'closed')
      openMIDIInput({
        input: device,
        callback: (msg) => {
          setLastMessage(msg)
        },
      })
    return () => {
      device.onmidimessage = null
    }
  }, [device, setLastMessage])

  if (!device) return <>No device found, sorry</>
  return (
    <>
      <h1>Device: {device?.name}</h1>
      <h2>{device?.manufacturer}</h2>
      <h2>(status: {device?.connection})</h2>
      <h2>Last Message:</h2>
      <pre>{JSON.stringify(lastMessage, null, 2)}</pre>
    </>
  )
}
