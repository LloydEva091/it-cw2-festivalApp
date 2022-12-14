import { Link } from 'react-router-dom'

// Content of the admin page
const Admin = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-UK', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <main className='flex items-center min-h-screen pt-0 sm:justify-center sm:pt-0 '>
            <div className='p-5 m-5 md:w-80 h-full rounded-lg shadow-lg bg-white'>
                <h2 className="nav_font ">Welcome Admin </h2>
                <div className="flex-col mt-5 nav_font ">
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="User/New">Add User</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="Event/New">Add Event</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="Venue/New">Add Venue</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="Comedian/New">Add Comedian</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="User/List">View User List</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="Event/List">View Event List</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="Venue/List">View Venue List</Link>
                <Link className="md:block login_button hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" to="Comedian/List">View Comedian List</Link>
                </div>
                
            </div>
           
        </main>
    )

    return content
}
export default Admin