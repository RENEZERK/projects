import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Header = () => {

  const { setInput, input } = useAppContext()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setInput(input)
  }

  const onClear = () => {
    setInput('')
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>

      {/* CONTENT */}
      <div className='text-center mt-20 mb-8 relative z-10'>

        <div className='inline-flex items-center justify-center gap-4 py-1.5 mb-4 text-sm text-primary font-medium'>
          <p className='flex items-center gap-4'>
            New: AI feature integrated
            <img src={assets.star_icon} className='w-2.5' alt='' />
          </p>
        </div>

        <h1 className='text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-800 mb-6'>
          Your own <span className='text-primary'>blogging </span>
          <br />
          platform.
        </h1>

        <p className='my-6 sm:my-8 max-w-2xl mx-auto text-gray-500'>
          Create an account and start sharing your thoughts with the world.
        </p>

        {/* FORM */}
        <form
          onSubmit={onSubmitHandler}
          className='flex items-center max-w-lg mx-auto border rounded overflow-hidden bg-white relative z-10'
        >
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search for blogs'
            required
            className='flex-1 pl-4 py-2 outline-none'
          />

          <button
            type='submit'
            className='bg-primary text-white px-8 py-2 m-1.5 cursor-pointer rounded hover:scale-105 transition'
          >
            Search
          </button>
        </form>

      </div>

      {/* CLEAR BUTTON */}
      <div className='text-center relative z-10'>
        {input && (
          <button
            onClick={onClear}
            className='border font-light text-xs py-1 px-3 rounded shadow-custom-sm cursor-pointer'
          >
            Clear Search
          </button>
        )}
      </div>

      {/* BACKGROUND IMAGE FIX */}
      <img
        src={assets.gradientBackground}
        alt='gradient'
        className='absolute -top-50 left-0 w-full pointer-events-none z-0'
      />

    </div>
  )
}

export default Header
