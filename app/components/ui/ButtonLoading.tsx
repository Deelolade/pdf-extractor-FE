import React from 'react'

const ButtonLoading = () => {
  return (
    <div className="flex items-center gap-2 justify-center">
      {/* <span>Connecting</span> */}
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default ButtonLoading
