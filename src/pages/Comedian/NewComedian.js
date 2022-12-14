import { useState } from "react"
import InputControl from "../../components/InputControl"
import { useMutation } from "react-query"
import { createComedian } from "../../apis/festivalApi"
import { useNavigate } from "react-router-dom"


const NewComedian = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
    })


    const user = JSON.parse(localStorage.getItem("user"))

    // console.log((user.token));
    const { isError } = useMutation(createComedian)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newComedian = {
            name: formData.name,
            description: formData.description,
            image: formData.image
        }

        try {
            await createComedian(newComedian, user.token)
            navigate("/comedians")
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <section className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded login_container">
                <h2 className="font-bold text-xl flex items-center justify-center gap-2 max-w-max px-2 py-1 mx-auto">New Comedian</h2>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <InputControl
                        label="Comedian name"
                        type="name"
                        placeholder="Enter comedian name"
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

export default NewComedian