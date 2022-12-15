import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import jwt_decode from "jwt-decode";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = ({ logIn, isLogged }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    // const decoded = jwt_decode(userData.token)

    let adminLink = {}
    if(!userData) {
        adminLink = { name: 'HOME', href: '/', current: false }
    } else if(userData.roles == 5045){
        adminLink = { name: 'ADMINDASH', href: '/admin', current: false }
    }  else if(userData.roles == 2821){
        adminLink = { name: 'HOME', href: '/', current: false }
    } else {
        adminLink = { name: 'HOME', href: '/', current: false }
    }

    const navigation = [
        adminLink,
        { name: 'EVENTS', href: '/Events', current: false },
        { name: 'COMEDIANS', href: '/Comedians', current: false },
        { name: 'VENUES', href: '/Venues', current: false },
    ];
    
    const login = [{ name: 'LOGIN', href: '/Login', current: false },
    { name: 'REGISTER', href: '/Register', current: false }
    ];

    const onLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    if (isLogged) {
        logIn()
    }

    const content = (
        <Disclosure as="nav" className="opacity-85">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 nav_font">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                {/* Logo Image */}
                                <div className="flex flex-shrink-0 items-center">
                                    <a href="/"><img
                                        className="block h-8 w-auto lg:hidden"
                                        src="../img/logo.png"
                                        alt="Comedy Festival"
                                    /></a>
                                    <a href="/"><img
                                        className="hidden h-8 w-auto lg:block"
                                        src="../img/logo.png"
                                        alt="Comedy Festival"
                                    /></a>
                                </div>
                                {/* Menu Nav */}
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="hidden space-x-6 text-xl md:block">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? ' text-white dash-header' : 'text-white hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>

                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Check if user is logged in and swap menu */}
                                {JSON.parse(localStorage.getItem("user")) !== null ? (
                                    // Profile dropdown 
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full  text-sm focus:outline-none ">
                                            {/* focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 */}
                                                <span className="sr-only">Open user menu</span>
                                                <span className="text-white mt-3">{userData.name}</span>
                                                <UserIcon className="h-6 w-6 text-white m-2" aria-hidden="true" />
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
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                                                {/* //For when Profile and Setting is implemented
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-400' : '', 'block px-4 py-2 text-sm text-black')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-400' : '', 'block px-4 py-2 text-sm text-teal-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item> */}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="/"
                                                            className={classNames(active ? 'bg-gray-400' : '', 'block px-4 py-2 text-sm text-white')}
                                                            onClick={()=>onLogout()}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <div className="relative ml-3">
                                        {login.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
    return content
}
export default Navbar