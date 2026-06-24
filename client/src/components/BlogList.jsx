import React,{useState} from 'react'
import { blogCategories, blog_data } from '../assets/assets'
import {motion} from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../../context/AppContext'

const BlogList = () => {
    const [menu,setMenu]= useState("All")
    const {blogs,input}=useAppContext()

    const filteredBlogs=()=>{
      if(input===''){
        return blogs
      }
      return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 '>
        {blogCategories.map((item)=>(
            <button
              key={item}
              onClick={()=>setMenu(item)}
              className={`relative cursor-pointer rounded-full px-4 py-1.5 text-gray-500 ${menu===item ? 'text-white' : ''}`}
            >
                {item}
                {menu=== item && (
                    <motion.div layoutId='underline' transition={{type:'spring',stiffness:500,damping:30}} className='absolute inset-0 bg-primary rounded-full -z-10' />
                )}
            </button>
        ))}
      </div>
      <div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8'>
              {filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
          </div>
    </div>
  )
}

export default BlogList
