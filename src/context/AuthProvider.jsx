import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/ClientAxios'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {


    const [auth, setAuth] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')

        const authenticateUser = async () => {
            if (!token) {
                setLoading(false)
                return
            }

            const cfg = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clientAxios(`/users/profile`, cfg)
                const user = {
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    picture: data.picture,
                    id: data._id
                }
                setAuth(user)
                navigate('/proyectos')
            } catch (error) {
                setAuth({})
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext