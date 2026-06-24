import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'
import Sidebar from '../../components/Admin/Sidebar'
import { useAppContext } from '../../../context/AppContext.jsx'





const Layout = () => {
  const navigate = useNavigate()
  const { axios, setToken } = useAppContext()

  const logout = () => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = undefined
    setToken(null)
    navigate('/')
  }

  return (
    <>
    <div className='flex justify-between items-center px-4 py-2 sm:px-12 sm:py-4 bg-white shadow-md'>

      <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={()=>navigate('/')} />
      <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:scale-105 transition'>Logout</button>
    </div>
    <div className='flex' style={{height: 'calc(100vh - 70px)'}}>
      <Sidebar/>
      <Outlet/>
    </div>
    </>
  )
}

export default Layout
