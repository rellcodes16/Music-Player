import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { useAuth } from '../Components/context/FakeAuthContext'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('rell@example.com')
  const [password, setPassword] = useState('qwerty')
  const { Login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(email && password) Login(email, password)
  }

  useEffect(function(){
    function handleLogin(){
      if(isAuthenticated === true)
        navigate('/player', { replace: true })
    }

    handleLogin()
  }, [isAuthenticated, navigate])
  return (
    <main className={styles.login} onSubmit={handleSubmit}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Login</button>
      </form>
    </main>
  )
}

export default Login