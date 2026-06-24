import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../../context/AppContext'
// react-toastify is not installed in this repo. Use a no-op toast.
const toast = { error: () => {}, success: () => {} }


const Blog = () => {
    const { id } = useParams()

    const { axios } = useAppContext()

    const [blog, setBlog] = useState(null)
    const [comments, setComments] = useState([])
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`)

            if (data.success) {
                setBlog(data.blog)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', {
                blogId: id,
            })

            if (data.success) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const addComment = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/blog/comments', {
                blogId: id,
                name,
                content,
            })

            if (data.success) {
                toast.success(data.message)
                setName('')
                setContent('')
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogData()
        fetchComments()
    }, [id])

    return blog ? (
        <div className='relative'>
            <img
                src={assets.gradientBackground}
                alt=''
                className='absolute -top-50 -z-10 opacity-50'
            />

            <Navbar />

            <div className='text-center mt-20 text-gray-600'>
                <p className='text-primary py-4 font-medium'>
                    Published on{' '}
                    {moment(blog.createdAt).format('MMM Do YYYY')}
                </p>

                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
                    {blog.title}
                </h1>

                <h2 className='text-xl text-gray-500 mt-4'>
                    {blog.subTitle}
                </h2>

                <p className='text-lg text-gray-700 mt-6'>
                    By {blog.author || 'Michael Brown'}
                </p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className='rounded-3xl mb-5'
                />

                <div
                    className='rich-text max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{
                        __html: blog.description,
                    }}
                />

                {/* Comments Section */}
                <div className='mt-4 mb-10 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>
                        Comments ({comments.length})
                    </p>

                    <div className='flex flex-col gap-4'>
                        {comments.map((comment, index) => (
                            <div
                                key={comment._id || index}
                                className='flex items-start gap-4'
                            >
                                <img
                                    src={assets.user_icon}
                                    alt=''
                                    className='w-10 rounded-full'
                                />

                                <div>
                                    <p className='text-sm font-semibold text-gray-900'>
                                        {comment.name}
                                    </p>

                                    <p className='text-sm max-w-md text-gray-700'>
                                        {comment.content}
                                    </p>

                                    <div className='text-xs text-gray-500'>
                                        {moment(
                                            comment.createdAt
                                        ).fromNow()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Comment */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>
                        Add your comment
                    </p>

                    <form
                        onSubmit={addComment}
                        className='flex items-start flex-col gap-4'
                    >
                        <input
                            type='text'
                            placeholder='Name'
                            required
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className='w-full p-2 border border-gray-300 rounded outline-none'
                        />

                        <textarea
                            placeholder='Comment'
                            required
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            className='w-full p-2 border border-gray-300 rounded outline-none'
                            rows='5'
                        />

                        <button
                            type='submit'
                            className='bg-primary text-white px-4 py-2 rounded hover:scale-105 transition'
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Share */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>
                        Share this blog
                    </p>

                    <div className='flex items-center gap-4'>
                        <img
                            src={assets.facebook_icon}
                            alt='Facebook'
                            className='w-10 h-10 cursor-pointer'
                        />

                        <img
                            src={assets.twitter_icon}
                            alt='Twitter'
                            className='w-10 h-10 cursor-pointer'
                        />

                        <img
                            src={assets.cross_icon}
                            alt='Share'
                            className='w-10 h-10 cursor-pointer'
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    ) : (
        <Loader />
    )
}

export default Blog