import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 py-10 md:py-20'>
      <h1>NEVER MISS A BLOG!</h1>
      <p className='md:text-4xl text-2xl font-semibold'>Subscribe to get the latest blog,new tech and exclusive news.</p>
      <form className='flex items-center justify-center max-w-2xl w-full md:h-13 h-12 mx-auto border rounded overflow-hidden'>
        <input type="text" placeholder='Enter your email id' required />
        <button className='mid:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
