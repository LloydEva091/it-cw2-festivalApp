import InputControl from "../../components/InputControl"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createEvent, getComedians, getVenues } from "./../../apis/festivalApi";

const NewEvent = () => {

    const {
        isLoadingComedians,
        isErrorComedians,
        errorComedians,
        data: comedianData
    } = useQuery('comediansCache', getComedians)

    const {
        isLoadingVenues,
        isErrorVenues,
        errorVenues,
        data: venuesData
    } = useQuery('venuesCache', getVenues)

    const [selectedOption, setSelectedOption] = useState('');
    const [cm, setCm] = useState("Select Comedian");
    const [vn, setVn] = useState("Select Venue");
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date_time: "",
        // comedian: "",
        // venue: "",
        time:"",
        image: "",
    })

    const user = JSON.parse(localStorage.getItem("user"))

    const { isError } = useMutation(createEvent)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }))
    }

    const selectOption = (error, loading, dataSource) => {
        if (loading) {
            return <p>"Loading data"</p>
        }
        if (error) {
            console.log(error)
        }
        if (dataSource) {
            return dataSource.map((items, key) => (
                <option value={items._id} key={items._id}>{items.name}</option>
            ))
        }
    }

    const handleChangeComedian = (selectedOption) => {
        setCm(selectedOption.target.value)
    }

    const handleChangeVenue = (selectedOption) => {
        setVn(selectedOption.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newEvent = {
            name: formData.name,
            description: formData.description,
            date_time: formData.date_time,
            comedian: cm,
            venue: vn,
            image: formData.image,
        }

        try {
            await createEvent(newEvent, user.token)
            navigate("/events")
            setCm('')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded login_container">
                <h2 className="font-bold text-xl flex items-center justify-center gap-2 max-w-max px-2 py-1 mx-auto">New Event</h2>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <InputControl
                        label="Event name"
                        type="name"
                        placeholder="Enter event name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-white">Description</label>
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
                    <label htmlFor="comedians" className="font-bold text-white">Select a comedian</label>
                    <select id="comedians" defaultValue={cm} onChange={handleChangeComedian} className="bg-transparent py-2 px-1 border border-gray-300 focus:text-gray-300 rounded-lg focus:ring-green-300 focus:border-blue-300 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled>Choose a comedian</option>
                        {selectOption(isLoadingComedians, isErrorComedians, comedianData)}
                    </select>
                    
                    <label htmlFor="venues" className="font-bold text-white">Select a comedian</label>
                    <select id="venues" defaultValue={vn} onChange={handleChangeVenue} className="bg-transparent py-2 px-1 border border-gray-300 focus:text-gray-300 rounded-lg focus:ring-green-300 focus:border-blue-300 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled>Choose a venues</option>
                        {selectOption(isLoadingVenues, isErrorVenues, venuesData)}
                    </select>

                    <label htmlFor="dateSchedule" className="font-bold text-white">Date and Time</label>
                    <input type="datetime-local" id="dateSchedule" name="date_time" className="bg-transparent py-2 px-1 border border-gray-300 rounded" onChange={handleChange} value={formData.date_time}></input>

                    <InputControl
                        label="Image"
                        type="image1"
                        placeholder="Enter image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <div>
                        <button className="login_button py-2 rounded block w-full">
                            Submit
                        </button>
                    </div>
                </form>

                {isError && (
                    <p className="text-center text-red-300">Something went wrong!</p>
                )}
            </div>
        </section>
    )
}

export default NewEvent;