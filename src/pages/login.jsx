import React, { useState } from 'react'
import logoSolo from '../assets/logo-solo.png'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik';
import { UserIcon, XMarkIcon, CheckIcon, EyeIcon, EyeSlashIcon, UserGroupIcon ,AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import clientAxios from '../config/ClientAxios'
import useAuth from '../hooks/useAuth';
const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const { setAuth, auth, loading } = useAuth()

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const SignUpSchema = yup.object().shape({
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

  const handleSubmit = async (values) => {
    try {
      const { data } = await clientAxios.post(`/users/login`, values)
      localStorage.setItem('token', data.token)
      setAuth(data)
      console.log('/proyectos')
      navigate('/proyectos');
    } catch (error) {
      console.log(error.response.data.msg)
    }

  }

  return (
    <div className="flex h-[100%] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className='mb-14'>
          <img className="mx-auto h-12 w-auto" src={logoSolo} alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-destiny ">Iniciar sesión</h2>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
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
                  autoComplete="current-password"
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
                  <p className="invisible">develop </p>
                )}
              </div>

              <div className="flex items-center justify-center mt-5">
                <div className="text-sm">
                  <Link to="/recuperar-cuenta" className="font-medium text-center text-destiny">¿Olvidaste tu contraseña?</Link>
                </div>
              </div>



              <button type="submit" disabled={isSubmitting} className="group mt-10 relative flex w-full justify-center rounded-md border border-transparent bg-destiny py-2 px-4 text-sm font-medium text-white">
                Acceder
              </button>
            </form>
          )}
        </Formik>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">ó</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div>
          <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-destiny py-2 px-4 text-sm font-medium text-white">
            Acceder con Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
