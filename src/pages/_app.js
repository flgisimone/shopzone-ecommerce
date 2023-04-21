/**
 * This component uses the useState and useEffect hooks to keep track of user state and page loading.
 
 * Specifically, the component defines a "user" state that is set with the user's email and password values stored in Local Storage, if any.
 * It also defines an "isLoading" state that is initially set to true and is used until the user's state has been retrieved.
 
 * The component returns the AppProvider provider, which contains the entire application and allows data to be shared between components. 
 * It also uses a ternary operator to check whether the user is authenticated or not and returns the layout component 
 * and its child pages (Component {...pageProps}) if the user is authenticated, otherwise it displays the login component.
 */

import { useState, useEffect } from 'react'
import { AppProvider } from '@/context'

import Layout from '@/Layout/Layout'
import Login from './login'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      setUser(JSON.parse(localStorage.getItem("email")).email);
      setUser(JSON.parse(localStorage.getItem("password")).password);
    }
    setIsLoading(false)
  }, []); 

  return (
    <AppProvider>
      {
        isLoading ? (
          <></>
        ) : (
          user ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) :
          (
            <Login />
          )
        )
      }
    </AppProvider>
  )
}
