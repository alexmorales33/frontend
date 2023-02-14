import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AuthLayout = () => {

    const { auth, loading } = useAuth()

    if (loading) return <p>Loading ...</p>

    if (auth.id) return <Navigate to='/' />

    return <Outlet />
}

export default AuthLayout
