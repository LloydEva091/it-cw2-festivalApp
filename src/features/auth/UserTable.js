import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from "react-query"
import InputControl from '../../components/InputControl'
import { updateUser, deleteUser } from '../../apis/festivalApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserTable = ({ userD }) => {
    const [errMsg, setErrMsg] = useState('')
    const queryClient = useQueryClient()
    const notify = (msg) => toast(msg);
    let index = 1


    const user = JSON.parse(localStorage.getItem("user"))

    const { isError, error: errorMSG } = useMutation(deleteUser)

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        password: "",
        password2: "",
        email: "",
        roles: "",
        active: ""
    })


    const updateUserMutation = useMutation(
        () => updateUser({
            id: formData.id,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            roles: formData.roles,
            active: formData.active
        }, user.token),
        {
            onSuccess: () => {
                // Invalidates cache and refetch 
                queryClient.invalidateQueries("usersCache")
            },
            onError: (error) => {
                setErrMsg(error)
                notify(error)
            }
        }
    )

    const deleteMutation = useMutation(
        () => deleteUser({ id: formData.id }, user.token),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("usersCache")
            },
            onError: (error) => {
                setErrMsg(error)
                notify(error)
            }
        })

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async () => {
        // console.log(user.token)
        try {
            await updateUserMutation.mutateAsync(({
                id: formData.id,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                roles: formData.roles,
                active: formData.active
            }), user.token)
        } catch (error) {
            console.log(error)
            notify(errMsg);
        }
    }

    const handleDelete = async (id) => {
        // console.log(formData.id)
        try {
            await deleteMutation.mutateAsync({ id: id }, user.token)
        } catch (error) {
            console.log(error)
            console.log(errMsg)
            notify("User has an event assigned. Cannot delete");
        }
    }


    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div className="overflow-x-auto">
                <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-scroll">
                    <div className="m-5">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead >
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">#</th>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Email</th>
                                        <th className="py-3 text-left">Roles</th>
                                        <th className="py-3 text-left">Active</th>
                                        <th className="py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                {userD.map((items, key) => (
                                    <tbody className="text-gray-600 text-sm font-light w-full" key={items._id}>
                                        <tr className="border-b border-gray-200 hover:bg-gray-100 ">
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center">
                                                    <span>{index++}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center">
                                                    <span>{items._id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-left">
                                                    <span>{items.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span className="table_description truncate">{items.email}</span>
                                            </td>
                                            <td className="py-3 text-left">
                                                <span className="table_description truncate">{items.roles ==5045? "ADMIN":"USER"}</span>
                                            </td>
                                            <td className="py-3 text-left">
                                                <span className="table_description truncate">{JSON.stringify(items.active)}</span>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <div type="button" onClick={() => {
                                                            setShowModal(true)
                                                            setFormData({
                                                                id: items._id, name: items.name, email: items.email, password: items.passsword, roles:items.roles, active:JSON.stringify(items.active)
                                                            })
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" >
                                                        <div type="button" onClick={() => {
                                                            setFormData({ id: items._id })
                                                            handleDelete(items._id)
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </div>
                                                    </div>


                                                    {showModal ? (
                                                        <>

                                                            <div
                                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                            >
                                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                                    {/*content*/}
                                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                        {/*header*/}
                                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                            <h3 className="text-3xl font-semibold">
                                                                                UPDATE
                                                                            </h3>
                                                                            <button
                                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                                onClick={() => setShowModal(false)}
                                                                            >
                                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                                    ×
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                        {/*body*/}
                                                                        <div className="relative p-6 flex-auto h-full">
                                                                            <form className="flex flex-col " onSubmit={handleSubmit}>
                                                                                <input type="hidden" name="id" value={formData.id} />
                                                                                <label htmlFor="name" className='font-bold text-black'>USER NAME</label>
                                                                                <InputControl
                                                                                    label="User name"
                                                                                    type="name"
                                                                                    placeholder="Enter user name"
                                                                                    name="name"
                                                                                    value={formData.name}
                                                                                    onChange={handleChange}
                                                                                />
                                                                               
                                                                                <label htmlFor="name" className='font-bold text-black p-2'>EMAIL</label>
                                                                                <InputControl
                                                                                    label="email"
                                                                                    type="email"
                                                                                    placeholder="Enter Email"
                                                                                    name="email"
                                                                                    value={formData.email}
                                                                                    onChange={handleChange}
                                                                                />
                                                                                <label htmlFor="name" className='font-bold text-black p-2'>PASSWORD</label>
                                                                                <InputControl
                                                                                    label="password"
                                                                                    type="password"
                                                                                    placeholder="Enter password"
                                                                                    name="password"
                                                                                    value={formData.password}
                                                                                    onChange={handleChange}
                                                                                />
                                                                                <label htmlFor="name" className='font-bold text-black p-2'>ROLES</label>
                                                                                <select
                                                                                    label="roles"
                                                                                    type="roles"
                                                                                    name="roles" 
                                                                                    // defaultValue={formData.roles}     
                                                                                    onChange={handleChange}
                                                                                >
                                                                                    <option value={formData.roles}>{formData.roles == 5045? "ADMIN":"USER"}</option>
                                                                                    <option value="5045">ADMIN</option>
                                                                                    <option value="2821">USER</option>
                                                                                </select>
                                                                                <label htmlFor="name" className='font-bold text-black p-2'>ACTIVE</label>
                                                                                <select
                                                                                    label="active"
                                                                                    type="active"
                                                                                    name="active" 
                                                                                    // defaultValue={formData.active}     
                                                                                    onChange={handleChange}
                                                                                >
                                                                                    <option value={formData.active}>{JSON.stringify(formData.active)}</option>
                                                                                    <option value={true}>TRUE</option>
                                                                                    <option value={false}>FALSE</option>
                                                                                </select>


                                                                                {/*footer*/}
                                                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                                    <button
                                                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                        type="button"
                                                                                        onClick={() => { setShowModal(false) }}
                                                                                    >
                                                                                        Close
                                                                                    </button>
                                                                                    <button
                                                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            handleSubmit()
                                                                                            setShowModal(false)
                                                                                        }}
                                                                                    >
                                                                                        Update Changes
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                        </>
                                                    ) : null}

                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    toastStyle={{ backgroundColor: "crimson", color: "white" }}
                />
            </div>
        </>
    )

}
export default UserTable
