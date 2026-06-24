import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// react-toastify is not installed in this repo. Keep AppContext toast-free.
const toast = { error: () => {} }


const AppContext = createContext(null)

// If VITE_BASE_URL is not set, axios will use same-origin.
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all')
      if (data?.success) setBlogs(data.blogs || [])
      else toast.error(data?.message || 'Failed to fetch blogs')
    } catch (error) {
      toast.error(error?.message || 'Failed to fetch blogs')
    }
  }

  useEffect(() => {
    // Optional; safe to call once.
    fetchBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({ axios, navigate, token, setToken, blogs, setBlogs, input, setInput }),
    [navigate, token, blogs, input]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within an AppProvider')
  return ctx
}

