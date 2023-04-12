import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Registration } from './element/Registration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './element/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
