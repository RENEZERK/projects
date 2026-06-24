import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Layout from './pages/Admin/Layout.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import Comments from './pages/Admin/Comments.jsx'
import AddBlog from './pages/Admin/AddBlog.jsx'
import ListBlog from './pages/Admin/ListBlog.jsx'
import Login from './components/admin/Login.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { token } = useAppContext()

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

