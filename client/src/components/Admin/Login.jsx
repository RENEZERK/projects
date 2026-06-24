import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext.jsx'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setToken, axios: appAxios } = useAppContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await appAxios.post('/api/admin/login', { email, password })
      if (data?.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        appAxios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        navigate('/admin')
      } else {
        toast.error(data?.message || 'Login failed')
      }
    } catch (error) {
      toast.error(error?.message || 'Login failed')
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Admin Login</h2>
        <h3>Enter your credentials to proceed further.</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
