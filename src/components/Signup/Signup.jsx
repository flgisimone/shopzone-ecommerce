import { POST } from "@/utils/http"
import { useEffect, useState } from "react"

import { MdOutlinePassword } from 'react-icons/md';

import styles from "./styles.module.scss"

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userPost, setUserPost] = useState("")
  const [successful, setSuccessful] = useState(false)
  
  let generator = require('generate-password');
  
  let passwordGen = generator.generate({
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
  });

  const onHandleGeneratePassword = () => {
    setPassword(passwordGen)
  }

  const onHandleName = (e) => setName(e.target.value);
  const onHandleEmail = (e) => setEmail(e.target.value);
  const onHandlePassword = (e) => setPassword(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault()
    setUserPost({
      name,
      email,      
      password,
    })
    setSuccessful(true)
  }

  useEffect(() => {
    if (email && password) {
      POST("users", name, email, password)
        .then(() => {
          console.log("Registrazione avvenuta con successo");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userPost]);

  return (
    <section className={styles.Signup}>
      <div className={styles.containerSignUp}>
        <h1>Sign Up</h1>
        <form onSubmit={onHandleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={onHandleName} required/>
          <input type="email" placeholder="Insert valid email address" value={email} onChange={onHandleEmail} required/>
          <input type="password" placeholder="Password" value={password} onChange={onHandlePassword} required autoComplete="off"/>
          <div className={styles.requirePassword}>
            <span>Password must contains </span>
            <ul>
              <li>at least one uppercase</li>
              <li>at least one lowercase</li>
              <li>at least a number</li>
              <li>minimum 8 characters</li>
            </ul>
            <button onClick={onHandleGeneratePassword}><MdOutlinePassword className={styles.iconGenPass}/> Generate Password</button>
          </div>
          <span className={successful ? `${styles.show}` : `${styles.hidden}`}>Registration successful!</span>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </section>
  )
}

export default Signup