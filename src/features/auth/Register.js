import { useState } from "react"
import InputControl from "../../components/InputControl"
import { useMutation } from "react-query"
import { registerUser } from "../../apis/festivalApi"
import { useNavigate } from "react-router-dom"

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const { isError, isLoading } = useMutation(registerUser)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      name: formData.name,
      email: formData.email.toLocaleLowerCase(),
      password: formData.password,
    }

    if (formData.password === formData.password2) {
      try {
        const payload = await registerUser(newUser)
        localStorage.setItem("user", JSON.stringify(payload))
        setIsLoggedIn(true)
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded login_container">
        <h2 className="font-bold text-xl flex items-center justify-center gap-2 max-w-max px-2 py-1 mx-auto">
          REGISTER 
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <InputControl
            label="Your name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputControl
            label="Email"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputControl
            label="Password"
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputControl
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          <div>
            <button className="login_button py-2 rounded block w-full">
              Submit
            </button>
          </div>
        </form>
        {isLoading && <p className="text-center text-white">Loading...</p>}
        {isError && (
          <p className="text-center text-red-300">Something went wrong!</p>
        )}
      </div>
    </section>
  )
}

export default Register