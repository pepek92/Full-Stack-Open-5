import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [blogLikes, setLikes] = useState(blog.likes)

  const blogStyle = {
    marginTop: 5,
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const handleInfoButton = () => {
    setShowInfo(!showInfo)
  }

  const handleRemoveButton = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await blogService.remove(blog.id)
      console.log(response)
      setBlogs(blogs.filter(x => x.id !== blog.id))
    }
  }

  const handleLikeButton = async blog => {

    const likedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blogLikes + 1,
      user: blog.user,
      id: blog.id
    }
    const response = await blogService.update(likedBlog)
    console.log(response)
    setLikes(blogLikes + 1)
    setBlogs(blogs.map(x => x.id !== blog.id ? x : likedBlog))
  }

  const FullInfo = () => {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}, {blog.author} <button onClick={() => handleInfoButton()}>hide</button>
          <br />
          {blog.url}
          <br />
          {blog.likes} likes <button id='like' onClick={() => handleLikeButton(blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          {user.username === blog.user.username && <button id='remove' onClick={() => handleRemoveButton(blog)}>remove</button>}
        </p>
      </div>
    )
  }
  const LessInfo = () => {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}, {blog.author} <button id='view' onClick={() => handleInfoButton()}>view</button> <br/>
        </p>
      </div>
    )
  }
  return (
    <div className='blog'>
      {showInfo ? <FullInfo /> : <LessInfo />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog