/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import useAuth from '../hooks/useAuth'

export default function Navbar() {

    const { auth } = useAuth()

    return (
        <Popover className="relative bg-white">
            <div className="mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/iniciar-sesion">
                            <span className="sr-only">3Destiny</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src={Logo}
                                alt="3Destiny RA logo"
                            />
                        </Link>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                        {
                            auth.id
                                ?
                                <>
                                    <Link to="/iniciar-sesion" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                        Proyectos
                                    </Link>
                                    <Link to="/iniciar-sesion" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                        Perfil
                                    </Link>
                                </>
                                :
                                <>
                                </>
                        }
                    </Popover.Group>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        {
                            auth.id
                                ?
                                <>

                                    <button className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                        Cerrar sesion
                                    </button>
                                    <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-destiny px-4 py-2 text-base font-medium text-white shadow-sm">
                                        Crear proyecto
                                    </button>
                                </>
                                :
                                <>
                                    <Link to="/registrarse" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                        Registrarse
                                    </Link>
                                    <Link
                                        to="/iniciar-sesion"
                                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-destiny px-4 py-2 text-base font-medium text-white shadow-sm"
                                    >
                                        Iniciar sesion
                                    </Link>
                                </>
                        }

                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <Link to="/iniciar-sesion">
                                    <img
                                        className="h-8 w-auto"
                                        src={Logo}
                                        alt="3Destiny RA logo"
                                    />
                                </Link>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            <div>
                                {
                                        <>
                                            <Link
                                                to="/registrarse"
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-destiny px-4 py-2 text-base font-medium text-white shadow-sm"
                                            >
                                                Registrarse
                                            </Link>
                                            <Link
                                                to="/iniciar-sesion"
                                                className="flex w-full items-center mt-4 justify-center rounded-md border border-transparent bg-destiny px-4 py-2 text-base font-medium text-white shadow-sm"
                                            >
                                                Iniciar sesion
                                            </Link>
                                        </>
                                }

                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}