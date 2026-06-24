import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../../assets/assets'

const Sidebar = () => {
  const getNavLinkClass = ({isActive}) => 
    isActive 
      ? 'bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg mb-2' 
      : 'flex items-center gap-2 px-4 py-2 rounded-lg mb-2 hover:bg-primary hover:text-white transition'

  return (
    <div className='w-64 h-full bg-gray-50 p-4 border-r border-gray-200'>
      <NavLink end to='/admin' className={getNavLinkClass}>
        <img src={assets.home_icon} alt="dashboard" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      <NavLink to='/admin/addBlog' className={getNavLinkClass}>
        <img src={assets.add_icon} alt="add blog" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Add Blog</p>
      </NavLink>

      <NavLink to='/admin/listBlog' className={getNavLinkClass}>
        <img src={assets.list_icon} alt="list blogs" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>List Blogs</p>
      </NavLink>

      <NavLink to='/admin/comments' className={getNavLinkClass}>
        <img src={assets.comment_icon} alt="comments" className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
