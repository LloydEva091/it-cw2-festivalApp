import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from "react-query"
import InputControl from '../../components/InputControl'
import { updateVenue, deleteVenue } from '../../apis/festivalApi'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ComedianTable = ({ venueD }) => {
    const [errMsg, setErrMsg] = useState('')
    const queryClient = useQueryClient()
    const notify = (msg) => toast(msg);
    let index = 1


    const user = JSON.parse(localStorage.getItem("user"))

    const { isError } = useMutation(updateVenue)

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        address: "",
        image: "",
    })


    const updateVenueMutation = useMutation(
        () => updateVenue({
            id: formData.id,
            name: formData.name,
            description: formData.description,
            address: formData.address,
            image: formData.description
        }, user.token),
        {
            onSuccess: () => {
                // Invalidates cache and refetch 
                queryClient.invalidateQueries("venuesCache")
            },
            onError: (error) => {
                setErrMsg(error)
                notify(error)
            }
        }
    )

    const deleteMutation = useMutation(
        () => deleteVenue({ id: formData.id }, user.token),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("venuesCache")
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
            await updateVenueMutation.mutateAsync(({
                id: formData.id,
                name: formData.name,
                description: formData.description,
                address: formData.address,
                image: formData.description
            }), user.token)
        } catch (error) {
            console.log(error)
            notify(error)
        }
    }

    const handleDelete = async () => {
        // console.log(formData.id)
        try {
            await deleteMutation.mutateAsync({ id: formData.id }, user.token)
        } catch (error) {
            console.log(error)        
            notify(error);
        }
    }

    

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="overflow-x-auto">
                <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-scroll">
                    <div className="m-5">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">#</th>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Address</th>
                                        <th className="py-3 px-6 text-left">Description</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>

                                {venueD.map((items, key) => (
                                    <tbody className="text-gray-600 text-sm font-light w-full" key={items._id}>
                                        <tr className="border-b border-gray-200 hover:bg-gray-100 " >
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
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-left">
                                                    <span>{items.address}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span className="table_description truncate">{items.description}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <div type="button" onClick={() => {
                                                            setShowModal(true)
                                                            setFormData({
                                                                id: items._id, name: items.name, description: items.description, address: items.address, image: items.image
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
                                                            handleDelete()
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
                                                                        <div className="relative p-6 flex-auto">
                                                                            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                                                                <input type="hidden" name="id" value={formData.id} />
                                                                                <label className="font-bold text-black">NAME</label>
                                                                                <InputControl
                                                                                    label="Venue name"
                                                                                    type="name"
                                                                                    placeholder="Enter venue name"
                                                                                    name="name"
                                                                                    value={formData.name}
                                                                                    onChange={handleChange}
                                                                                />
                                                                                <div className="flex flex-col gap-2">
                                                                                    <label className="font-bold text-BLACK p-4">DESCRIPTION</label>
                                                                                    <textarea
                                                                                        label="Description"
                                                                                        type="description"
                                                                                        placeholder="Enter description"
                                                                                        name="description"
                                                                                        value={formData.description}
                                                                                        onChange={handleChange}
                                                                                        className="bg-transparent py-2 px-1 border border-gray-300 rounded"
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <label className="font-bold text-BLACK p-4 ">ADDRESS</label>
                                                                                    <textarea
                                                                                        label="Address"
                                                                                        type="address"
                                                                                        placeholder="Enter address"
                                                                                        name="address"
                                                                                        value={formData.address}
                                                                                        onChange={handleChange}
                                                                                        className="bg-transparent py-2 px-1 border border-gray-300 rounded"
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <label className="font-bold text-black ">IMAGE URL</label>
                                                                                <InputControl
                                                                                    label="Image"
                                                                                    type="image1"
                                                                                    placeholder="Enter image URL"
                                                                                    name="image"
                                                                                    value={formData.image}
                                                                                    onChange={handleChange}
                                                                                />


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
export default ComedianTable
