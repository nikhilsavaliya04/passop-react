import { useState } from 'react'
import './App.css'
import Navbar from './componets/Navbar'
import Manager from './componets/Manager'
import Footer from './componets/Footer'


function App() {


  return (
    <>
     <Navbar></Navbar>
     <div className="text-black absolute top-0 z-[-2] h-screen w-screen bg-green-80 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
     <Manager></Manager>
     <Footer></Footer>
     </div>
     
     
    </>
  )
}

export default App
