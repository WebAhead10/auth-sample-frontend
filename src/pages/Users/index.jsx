import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useHistory } from "react-router"
import './style.css'

const Users = () => {
    const history = useHistory()
    const [users, setUsers]= useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    setLoading(true)

    if (!token) {
        history.push('/login')
    }

    axios.get(process.env.REACT_APP_API_URL + "/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        setLoading(false)

        if (!res.data.success) {
            setError(res.data.message)
        }

        setUsers(res.data.users)
    }).catch((err) => {
        setLoading(false)
        setError(err.message)
        history.push('/login')
    })
  }, [])


  if (loading) {
    return (
      <div class="container">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.username}, {user.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
