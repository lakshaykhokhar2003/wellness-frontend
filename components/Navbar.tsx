"use client"

import React, {Fragment} from "react"
import Link from "next/link"
import {Menu, Transition} from "@headlessui/react"
import {ChevronDownIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {logout} from "@/store/authSlice";

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth.authState)
    const id = useSelector((state: RootState) => state.auth.id)
    const router = useRouter()
    const logoutHandler = () => dispatch(logout())

    return (
        <nav className="bg-card text-card-foreground p-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/">
                        <span className="text-lg font-semibold">Home</span>
                    </Link>
                    {auth && (
                        <>
                            <Link href="/add-book">
                                <span className="text-lg font-semibold">Add Book</span>
                            </Link>
                            <Link href={`/${id}`}>
                                <span className="text-lg font-semibold">Favorites</span>
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {!auth ? (
                        <>
                            <button onClick={() => router.push('/login')}
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded">
                                Login
                            </button>
                            <button onClick={() => router.push('/register')}
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded">
                                Register
                            </button>
                        </>
                    ) : (
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-card text-card-foreground hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                    Account
                                    <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true"/>
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    onClick={logoutHandler}
                                                    className={`${
                                                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                                    } group flex items-center px-4 py-2 text-sm w-full`}
                                                >
                                                    Logout
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
