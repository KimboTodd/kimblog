import React, { memo } from 'react'

const StartButton = ({ callback }) => (
  <button
    className="box-border w-full cursor-pointer border-4 border-green-600 border-double p-4 font-mono text-green-500 sm:text-xl lg:text-2xl"
    onClick={callback}
  >
    START
  </button>
)

export default memo(StartButton)
