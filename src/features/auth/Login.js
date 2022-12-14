import { useState } from "react";
import InputControl from "../../components/InputControl";
import { useMutation } from "react-query";
import { loginUser } from "../../apis/festivalApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "", roles: "" });
  const [errorMessage, setErrorMessage] = useState("Invalid Email or Password");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const { isError, isLoading, error } = useMutation(loginUser)
  const notify = (msg) => toast(msg);
  const handleSubmit = async (e) => {
    e.preventDefault()

    const existingUser = {
      email: formData.email,
      password: formData.password,
      roles: formData.roles,
    }

    if (formData.email && formData.password) {
      try {
        const payload = await loginUser(existingUser)
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: "",
          password: "",
          roles: ""
        }))
        localStorage.setItem("user", JSON.stringify(payload))
        setIsLoggedIn(true)
        if (payload.roles == 5045) {
          navigate("/admin")
        } else {
          navigate("/")
        }
      } catch (err) {
        setErrorMessage("Invalid Email or Password")
        console.log(err)
        console.log(error)
        notify(errorMessage);
      }
    }
  }

  return (
    <section className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded login_container">
        <h2 className="font-bold text-xl flex items-center justify-center gap-2 max-w-max px-2 py-1 mx-auto">
          LOGIN
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <InputControl
            label="Email"
            type="email"
            placeholder="Enter email"
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
          <div>
            <button className="login_button py-2 rounded block w-full">
              Login
            </button>
          </div>
        </form>
        {isLoading && <p className="text-center text-white">Loading...</p>}
        {isError && <p className="text-center text-red-300">{errorMessage}</p>}
        {/* // <Dialog open={isOpen} onClose={() => setIsOpen(true)}>
            //     <Dialog.Panel>
            //         <p className="text-center text-red-300">{errorMessage}</p>
            //     </Dialog.Panel>
            // </Dialog>
          // <p className="text-center text-red-300">Something went wrong!</p>
        // <p className="text-center text-red-300">{errorMessage}</p> */}
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
        toastStyle={{ backgroundColor: "crimson", color:"white" }}
      />
    </section>
  )
}

export default Login