import { Link } from "react-router-dom";
const EventCard = ({ data }) => {
    return (
        <>
            {data.map((items, key) => (
               
                    <article className="grid place-items-start bg-transparent" key={key}>
                    <section className="bg-slate-800 w-full h-90 shadow-lg p-2 mt-6 mb-2" >
                        <div className="md:flex px-4 max-w-4xl">
                            <div className="flex-none ">
                                <img
                                    src={items.image}
                                    alt="pic"
                                    className="h-80 w-60 rounded-md shadow-2xl transform -translate-y-5 border-4 border-gray-300"
                                />
                                <div className="flex justify-center text-bold bg-white w-60 text-lg px-11">
                                <p className="time_style text-lg">{new Date(items.date_time).toDateString()}</p>
                                </div>
                                <div className="flex justify-center text-bold bg-white w-60 text-lg px-11">
                                <p className="time_style px-6 text-lg">{new Date(items.date_time).toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</p>
                                </div>
                                <Link type="button" className="flex justify-center border border-gray-400 text-white rounded-md py-2 mt-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline login_button px-11 w-60" to="/tickets"  target="_blank">Book Now</Link>
                            </div>

                            <div className="flex-col text-gray-300">
                                <h1 className="px-4 pt-4 text-2xl font-bold">{items.name}</h1>
                                <hr className="hr-text" data-content="" />
                                <p className="hidden md:block px-4 my-4 text-md text-left">{items.description} </p>
                                <p className="flex text-lg px-4 my-2 ">
                                    <span className="font-bold">Starring: {items.comedian_name}</span>
                                </p>
                                <p className="flex text-lg px-4 my-2">
                                    <span className="font-bold">Venue: {items.venue_name}</span>
                                </p>
                                <p className="flex text-lg px-4 my-2">
                                    <span className="font-bold">Location: {items.venue_address}</span>
                                </p>
                                <hr className="hr-text" data-content="" />
                            </div>
                        </div>
                    </section>
                </article>

                
               
            ))}
        </>
    )
}

export default EventCard