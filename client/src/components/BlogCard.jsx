import React from 'react'
import { useNavigate } from 'react-router-dom'

// Safely strip HTML tags from server-provided rich text
const stripHtml = (html) => {
  if (!html) return ''
  try {
    return new DOMParser().parseFromString(html, 'text/html').body.textContent || ''
  } catch (e) {
    return html.replace(/<[^>]+>/g, '')
  }
}

const BlogCard = ({blog}) => {
    const {title,description,category,image,_id}=blog;
    const navigate = useNavigate()
    return (
    <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full max-w-sm bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer duration-300 hover:scale-105'>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full'>
        {category}
      </span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600'>{stripHtml(description).slice(0,80)}</p>
    </div>
    </div>
  )
}

export default BlogCard
