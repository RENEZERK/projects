import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-white border-gray-700'></div>
    </div>
  )
}

export default Loader
