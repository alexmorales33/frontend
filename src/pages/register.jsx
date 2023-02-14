import React, { useState, useEffect } from 'react'
import logoSolo from '../assets/logo-solo.png'
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserIcon, XMarkIcon, CheckIcon, EyeIcon, EyeSlashIcon, UserGroupIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import jwt_decode from 'jwt-decode'
import clientAxios from '../config/ClientAxios'

const Register = () => {

    const handleSubmit = async (values) => {
        const { firstName, lastName, email, password } = values
        try {
            const { data } = await clientAxios.post(`/users`, {
                name: firstName,
                lastname: lastName,
                email: email,
                password: password,
                picture: values.picture ? values.picture : ''
            })
            notify(email)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCallbackResponse = (res) => {
        const user = jwt_decode(res.credential)
        console.log(user)
        console.log(res.credential)
        const values = {
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            password: user.sub,
            picture: user.picture
        }
        handleSubmit(values)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "855940304418-mij7rib5tqum9l8fjlc5e1nv7jhml5mv.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { type: 'icon', size: 'large', theme: 'filled_blue', text: 'signup_with' }
        )
        google.accounts.id.disableAutoSelect()

    }, [])




    const [showPassword, setShowPassword] = useState(false);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };


    const validateSchema = yup.object().shape({
        firstName: yup
            .string()
            .required("Tu nombre es necesario")
            .matches(/^[a-zA-Z]+$/, "Este campo debe ser alfabético")
            .min(2, "Muy corto, minimo 2 caracteres"),
        lastName: yup
            .string()
            .required("Tu apellido es necesario")
            .matches(/^[a-zA-Z]+$/, "Este campo debe ser alfabético")
            .min(2, "Muy corto, minimo 2 caracteres"),
        email: yup
            .string()
            .email("Email invalido")
            .matches(/(\W|^)[\w.-]/, "Email incorrecto")
            .required("Tu email es necesario"),
        password: yup
            .string()
            .min(6, "Muy corta, minimo 6 caracteres")
            .required("Este campo es necesario")
    });

    const navigate = useNavigate()

    const notify = (email) => {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={logoSolo}
                                alt="3Destiny"
                            />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                3Destiny te ha enviado un mensaje!
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {`Revisa tu email "${email}" te enviamos un correo de confirmacion! `}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#1579BE] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#1579BE]"
                    >
                        Close
                    </button>
                </div>
            </div>
        ))
    }

  



    return (
        <>
            <Toaster />
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={logoSolo} alt="Your Company" />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-destiny ">Registrarse</h2>
                    </div>

                    {/* FORMIK */}

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={validateSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // setTimeout(() => {
                            //     alert(JSON.stringify(values, null, 2));
                            //     setSubmitting(false);
                            // }, 400);
                            handleSubmit(values)
                            resetForm({ values: '' })
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>

                                {/* FIRSTNAME */}
                                <div className="flex items-stretch relative h-15 bg-white rounded-lg border border-sky-500">
                                    <div className="flex -mr-px justify-center p-2">
                                        <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl whitespace-no-wrap text-gray-600">
                                            <UserIcon className="w-6 h-6 text-[#1579BE]" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        placeholder="Nombre"
                                        className="flex-shrink flex-grow text-black rubik leading-normal  h-10 border-grey-light rounded rounded-l-none px-3 self-center relative bg-white border-  text-base outline-none"
                                    />
                                    <div className="flex -mr-px">
                                        <span className="flex items-center leading-normal  border- rounded rounded-l-none px-3 whitespace-no-wrap text-gray-600">
                                            {
                                                errors.firstName && touched.firstName
                                                    ? <XMarkIcon className='w-6 h-6 text-[#FB2723]' />
                                                    : touched.firstName
                                                        ? <CheckIcon className='w-6 h-6 text-[#1579BE]' />
                                                        : null
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white rubik text-sm pt-1 mb-3">
                                    {errors.firstName && touched.firstName ? (
                                        <p className='text-black '>{errors.firstName}</p>
                                    ) : (
                                        <p className="invisible">develop</p>
                                    )}
                                </div>

                                {/* LASTNAME */}
                                <div className="flex items-stretch relative h-15 bg-white rounded-lg border border-sky-500">
                                    <div className="flex -mr-px justify-center p-2">
                                        <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl whitespace-no-wrap text-gray-600">
                                            <UserGroupIcon className="w-6 h-6 text-[#1579BE]" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        placeholder="Apellido"
                                        className="flex-shrink flex-grow text-black rubik leading-normal  h-10 border-grey-light rounded rounded-l-none px-3 self-center relative bg-white border-  text-base outline-none"
                                    />
                                    <div className="flex -mr-px">
                                        <span className="flex items-center leading-normal  border- rounded rounded-l-none px-3 whitespace-no-wrap text-gray-600">
                                            {
                                                errors.lastName && touched.lastName
                                                    ? <XMarkIcon className='w-6 h-6 text-[#FB2723]' />
                                                    : touched.lastName
                                                        ? <CheckIcon className='w-6 h-6 text-[#1579BE]' />
                                                        : null
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white rubik text-sm pt-1 mb-3">
                                    {errors.lastName && touched.lastName ? (
                                        <p className='text-black '>{errors.lastName}</p>
                                    ) : (
                                        <p className="invisible">develop</p>
                                    )}
                                </div>

                                {/* EMAIL */}
                                <div className="flex items-stretch relative h-15 bg-white rounded-lg border border-sky-500">
                                    <div className="flex -mr-px justify-center p-2">
                                        <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl whitespace-no-wrap text-gray-600">
                                            <AtSymbolIcon className="w-6 h-6 text-[#1579BE]" />
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Email"
                                        className="flex-shrink flex-grow text-black rubik leading-normal  h-10 border-grey-light rounded rounded-l-none px-3 self-center relative bg-white border-  text-base outline-none"
                                    />
                                    <div className="flex -mr-px">
                                        <span className="flex items-center leading-normal  border- rounded rounded-l-none px-3 whitespace-no-wrap text-gray-600">
                                            {
                                                errors.email && touched.email
                                                    ? <XMarkIcon className='w-6 h-6 text-[#FB2723]' />
                                                    : touched.email
                                                        ? <CheckIcon className='w-6 h-6 text-[#1579BE]' />
                                                        : null
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white rubik text-sm pt-1 mb-3">
                                    {errors.email && touched.email ? (
                                        <p className='text-black '>{errors.email}</p>
                                    ) : (
                                        <p className="invisible">develop</p>
                                    )}
                                </div>

                                {/* PASSWORD */}
                                <div className="flex items-stretch relative h-15 bg-white rounded-lg border border-sky-500">
                                    <div className="flex -mr-px justify-center p-2">
                                        <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl whitespace-no-wrap text-gray-600">
                                            <LockClosedIcon className="w-6 h-6 text-[#1579BE]" />
                                        </span>
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="password"
                                        className="flex-shrink flex-grow text-black rubik leading-normal  h-10 border-grey-light rounded rounded-l-none px-3 self-center relative bg-white border-  text-base outline-none"
                                    />
                                    <div className="flex -mr-px">
                                        <span className="flex items-center leading-normal  border- rounded rounded-l-none px-3 whitespace-no-wrap text-gray-600">
                                            {
                                                errors.password && touched.password
                                                    ? <XMarkIcon className='w-6 h-6 text-[#FB2723]' />
                                                    : touched.password
                                                        ? showPassword ? <EyeIcon className='w-6 h-6 text-[#1579BE]' onClick={handlePassword} /> : <EyeSlashIcon className='w-6 h-6 text-[#1579BE]' onClick={handlePassword} />
                                                        : null
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white rubik text-sm pt-1 mb-3">
                                    {errors.password && touched.password ? (
                                        <p className='text-black '>{errors.password}</p>
                                    ) : (
                                        <p className="invisible">develop</p>
                                    )}
                                </div>

                                <button type="submit" disabled={isSubmitting} className="group mt-10 relative flex w-full justify-center rounded-md border border-transparent bg-destiny py-2 px-4 text-sm font-medium text-white">
                                    Registrarme
                                </button>
                            </form>
                        )}
                    </Formik>
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">ó</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>


                    <div className='flex items-center justify-center bg-red-5'>
                        <p className='text-center mr-5'>Registrarse con:</p>
                        <div className='flex justify-center'>
                            <div id="signInDiv"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
