import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./style.css"

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()

  const onChange =
    (stateKey) =>
    ({ target }) =>
      setUserData({ ...userData, [stateKey]: target.value })

  const onSubmit = () => {
    setLoading(true)
    axios
      .post(process.env.REACT_APP_API_URL + "/login", userData)
      .then((res) => {
        setLoading(false)

        if (!res.data.success) {
          setError(res.data.message)
        } else {
          localStorage.setItem("token", res.data.token)
          history.push("/")
        }
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div class="container">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div class="container">
      <h1>Login</h1>

      <label htmlFor="">
        <b>Username</b>
        <input
          type="text"
          onChange={onChange("username")}
          value={userData.username}
        />
      </label>

      <label htmlFor="">
        <b>Password</b>
        <input
          type="password"
          onChange={onChange("password")}
          value={userData.password}
        />
      </label>

      <input type="button" value="Submit" onClick={onSubmit} />
      {error && <span class="error">{error}</span>}
      <a href="/signup">Signup here</a>
    </div>
  )
}

export default Login
