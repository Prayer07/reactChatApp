import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import "./App.css"

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App