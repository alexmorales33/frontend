import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const protectedRoutes = () => {

    // Si no esta iniciado sesion, es decir, no hay un ID, te devuelve al login

    const { auth, loading } = useAuth()

    if (loading) return <p>Loading ...</p>
    return (
        <div>
            {
                auth.id ? <Outlet /> : <Navigate to='/iniciar-sesion' />
            }
        </div>
    )
}

export default protectedRoutes
