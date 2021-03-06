import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        title:
        <input
          id='title'
          value={title}
          onChange={handleTitle}
        /><br/>
        author:
        <input
          id='author'
          value={author}
          onChange={handleAuthor}
        /><br/>
        url:
        <input
          id='url'
          value={url}
          onChange={handleUrl}
        /><br/>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm