import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../../assets/assets'
import Quill from 'quill'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../../../context/AppContext'
// 'marked' is not installed in this repo; keep raw AI content.
const parse = (s) => s


const AddBlog = () => {
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const {axios}=useAppContext()
  const [isAdding,setIsAdding]=useState(false)
  const [loading,setLoading]=useState(false)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent=async()=>{
    if(!title)return toast.error('Please enter a title')
      try{
    setLoading(true);
    const {data}=await axios.post('/api/blog/generate',{prompt:title})
    if(data.success){
      quillRef.current.root.innerHTML=parse(data.content)
    }
    else{
      toast.error(data.message)
    }
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }
  const onSubmitHandler = async (e) => {
     try{
      e.preventDefault();
      setIsAdding(true)
      const blog={
        title,subTitle,description:quillRef.current.root.innerHTML,category,isPublished
      }
      const formData=new FormData();
      formData.append('blog',JSON.stringify(blog))
      formData.append('image',image)

      const {data}=await axios.post('/api/blog/add',formData);
      if(data.success){
        toast.success(data.message);
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML=''
        setCategory('Startup')
      }
     }
     catch(error){
      toast.error(error.message)
     }
     finally{
      setIsAdding(false)
     }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
          ]
        }
      })
      quillRef.current.on('text-change', () => {
        setDescription(quillRef.current.root.innerHTML)
      })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor='image'>
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='thumbnail' className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </label>

        <div className='mt-6'>
          <p className='text-gray-700 font-medium mb-2'>Blog Title</p>
          <input
            type='text'
            placeholder='Enter blog title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none'
            required
          />
        </div>

        <div className='mt-4'>
          <p className='text-gray-700 font-medium mb-2'>Blog Subtitle</p>
          <input
            type='text'
            placeholder='Enter blog subtitle'
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none'
            required
          />
        </div>

        <div className='mt-4'>
          <p className='text-gray-700 font-medium mb-2'>Blog Description</p>
          <div ref={editorRef} style={{ height: '300px', backgroundColor: '#fff' }} className='border border-gray-300 rounded'></div>
          {loading && <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'><div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div></div>}
          <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer' >Generate with AI</button>
        </div>

        <div className='mt-4'>
          <p className='text-gray-700 font-medium mb-2'>Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none'
          >
            <option value='Startup'>Startup</option>
            <option value='Technology'>Technology</option>
            <option value='Lifestyle'>Lifestyle</option>
          </select>
        </div>

        <div className='mt-4 flex items-center gap-3'>
          <input
            type='checkbox'
            id='published'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className='w-4 h-4'
          />
          <label htmlFor='published' className='text-gray-700'>
            Publish blog
          </label>
        </div>

        <button disabled={isAdding}
          type='submit'
          className='mt-6 px-8 py-2 bg-primary text-white rounded cursor-pointer hover:scale-105 transition'
        >
          {isAdding? 'Adding...':'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog
