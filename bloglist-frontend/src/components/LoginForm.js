import React from 'react'

const loginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          username
        <input
          id='username'
          type="text"
          value={props.uname}
          name="Username"
          onChange={props.handleName}
        />
      </div>
      <div>
          password
        <input
          id='password'
          type="password"
          value={props.passwd}
          name="Password"
          onChange={props.handlePasswd}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default loginForm