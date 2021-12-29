import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        console.log(blogs)
        setBlogs(blogs.sort((a, b) => {
          return b.likes - a.likes
        }))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(createdBlog => {
        console.log(createdBlog)
        blogService
          .getAll().then(blogs => {
            console.log(blogs)
            setBlogs(blogs.sort((a, b) => {
              return b.likes - a.likes
            }))
          })
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

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleName={({ target }) => setUsername(target.value)}
        handlePasswd={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogsList = () => (
    <div>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />)}
    </div>
  )

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
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={notification}/>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogsList()}
        </div>
      }
    </div>
  )
}

export default App