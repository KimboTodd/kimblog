import React, { memo } from 'react'

const InverseDisplay = ({ gameOver, text }) => {
  return (
    <div
      className={`box-border flex w-full border-2 border-green-700 border-solid bg-green-600 p-4 text-center font-bold font-mono ${gameOver ? 'text-slate-800' : 'text-slate-900'} text-2xl`}
    >
      {text}
    </div>
  )
}

export default memo(InverseDisplay)
