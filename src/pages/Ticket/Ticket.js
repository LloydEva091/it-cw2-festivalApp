import { useEffect } from "react";


const Ticket = () => {


    useEffect(() => {
        window.location.href = "https://www.ticketsource.co.uk/uws-student/comedy-night-testing/e-oxqxeq"
    }, [])
    return (
        <main className='min-h-screen'>
            <h2>Ticket</h2>
            <p style={{ marginTop: "1rem" }}>You will be redirect to Ticket Source</p>
        </main>
    )
}

export default Ticket;