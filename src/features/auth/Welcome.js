import { Link } from 'react-router-dom'

// Content of the welcome page
const Welcome = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-UK', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <main className='flex flex-col items-center min-h-screen pt-0 sm:justify-center sm:pt-0 bg-gray-200'>
        <h2>Event</h2>
        <p style={{ marginTop: "1rem" }}>This blog app is a project in the Learn React tutorial series.</p>
    </main>
    )

    return content
}
export default Welcome