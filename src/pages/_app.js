import { AppProvider } from '@/context'

import Layout from '@/Layout/Layout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  const arr = undefined;


  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
