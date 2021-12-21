import React from 'react'

const BlogForm = (props) => {
  
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
        <h2>Create new</h2>
          title
            <input
            type="text"
            value={props.uname}
            name="Title"
            onChange={props.handleTitle}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={props.passwd}
            name="Title"
            onChange={props.handleAuthor}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={props.passwd}
            name="Title"
            onChange={props.handleUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>      
    )
    }

    export default BlogForm