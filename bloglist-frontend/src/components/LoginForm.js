import React from 'react'

const loginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          username
        <input
          type="text"
          value={props.uname}
          name="Username"
          onChange={props.handleName}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={props.passwd}
          name="Password"
          onChange={props.handlePasswd}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default loginForm