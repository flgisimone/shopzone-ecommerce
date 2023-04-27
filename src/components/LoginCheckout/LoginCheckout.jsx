import { useEffect } from "react"
import { useGlobalContext } from "@/context"

import Signup from "@/components/Signup/Signup"

import styles from "../../styles/Login.module.scss"

const LoginCheckout = () => {

  const {
    users, setUsers,
    email, setEmail,
    password, setPassword,
    loginState, setLoginState,
    activeForm, setActiveForm,
    invalidLogin, setInvalidLogin,
  } = useGlobalContext()

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users")
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const onHandleEmail = (e) =>{
    setLoginState((prev) => ({...prev, email: e.target.value}))
    setEmail(e.target.value)
  }

  const onHandlePassword = (e) =>{
    setLoginState((prev) => ({...prev, password: e.target.value}))
    setPassword(e.target.value)
  }

  const onHandleShowSignUp = () => setActiveForm(false)
  const onHandleShowLogin = () => setActiveForm(true)

  const onFormSubmit = (e) => {
    e.preventDefault()
    let userFound = false
    if (users){
        users.map((user) => {
            if(
                user.email === loginState.email &&
                user.email === email &&
                user.password === loginState.password &&
                user.password === password
            ) {
              localStorage.setItem("user", JSON.stringify({ user }))
              localStorage.setItem("email", JSON.stringify({ email: loginState.email, emailUser: user.email }))
              localStorage.setItem("password", JSON.stringify({ password: loginState.password, passwordUser: user.password }))
              userFound = true
              window.location.href = "/checkout";
            } 
        })
        if (!userFound) {
          setInvalidLogin("Email/Password not valid! Try again.")
          setLoginState({ email: "", password: "" })
          location.reload()
        }
    }
  }

  return (
    <section className={styles.Login}>
      <div className={styles.containerLogin}>
        <span>Login or Register</span>
        <div className={styles.chooseForm}>
          <button className={!activeForm ? `` : `${styles.active}`} onClick={onHandleShowLogin}>Login</button>
          <button className={!activeForm ? `${styles.active}` : ``} onClick={onHandleShowSignUp}>Sign Up</button>
        </div>
        <div className={styles.containerForm}>
          <div className={!activeForm ? `${styles.formLogin} ${styles.hidden}` : `${styles.formLogin} ${styles.show}`}>
            <h1>Login</h1>
            <form onSubmit={onFormSubmit}>
              <input type="email" placeholder="Email" value={email} onChange={onHandleEmail} required/>
              <input type="password" placeholder="Password" value={password} onChange={onHandlePassword} required autoComplete="off"/>
              {invalidLogin && <p className={styles.invalidLogin}>{invalidLogin}</p>}
              <input type="submit" value="Login" />
            </form>
          </div>
          <div className={!activeForm ? `${styles.formSignUp} ${styles.show} ${styles.show}` : `${styles.formSignUp} ${styles.hidden}`}>
            <Signup />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginCheckout