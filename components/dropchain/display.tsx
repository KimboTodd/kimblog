import React, { memo, useEffect, useState } from 'react'

const Display = ({ text, flash }) => {
  const [flashing, setFlashing] = useState(false)

  useEffect(() => {
    if (!flash) return

    setFlashing(true)
    const timeout = setTimeout(() => {
      setFlashing(false)
    }, 200)
    return () => clearTimeout(timeout)
  }, [flash])

  return (
    <div
      className={`box-border flex w-full p-1 ${
        flashing ? 'animate-flash-white' : ''
      } border-2 border-green-700 border-dashed p-2 text-center font-mono text-base text-green-500 md:text-base lg:text-2xl`}
    >
      {text}
    </div>
  )
}

export default memo(Display)
