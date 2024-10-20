import React from 'react'
import Headers from './components/Headers'
import Footer from './components/Footer'
import Router from './Router'
import useFetchUserProfile from './hook/useFetchUserProfile'
const App = () => {

  return (
    <>
    <Headers />
    <main>
      <Router />
    </main>
    <Footer />
  </>
  )
}

export default App