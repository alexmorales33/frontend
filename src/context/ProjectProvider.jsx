import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../config/ClientAxios'
const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {

    const navigate = useNavigate()

    useEffect(() => {


    }, [])

    return (
        <ProjectContext.Provider
            value={{
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export {
    ProjectProvider
}

export default ProjectContext