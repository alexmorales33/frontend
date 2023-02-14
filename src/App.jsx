import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthProvider'
import { ProjectProvider } from './context/ProjectProvider'
import AuthLayout from './layouts/AuthLayout'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Navbar />
          <Routes>

            <Route path='/' element={<AuthLayout />}>
              <Route path='registrarse' element={<Register />} />
              <Route path="iniciar-sesion" element={<Login />} />
            </Route>

          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
