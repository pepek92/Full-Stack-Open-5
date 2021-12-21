import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    console.log(blogObject)
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setNotification(`${title} by ${author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ?
        <div>
        <h2>Log in to application</h2>
        <Notification message={notification}/>
        <LoginForm 
          uname={username} passwd={password} 
          handleSubmit={handleLogin} 
          handleName={({ target }) => setUsername(target.value)}
          handlePasswd={({ target }) => setPassword(target.value)} />
          </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={notification}/>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm
          title={title} author={author} url={url}
          handleSubmit={addBlog}
          handleTitle={({ target }) => setTitle(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
          />
          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
    </div>
  )
}

export default App