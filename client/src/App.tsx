import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Registration } from './element/Registration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './element/Login'
import { TodoPage } from './element/todoPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path={`/todo/:user`} element={<TodoPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
