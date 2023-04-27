import { AppProvider } from '@/context'
import Layout from '@/Layout/Layout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
