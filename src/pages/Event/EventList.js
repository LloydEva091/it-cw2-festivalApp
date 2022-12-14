import { useQuery } from "react-query";
import { getEvents } from "../../apis/festivalApi";
import EventTable from "./EventTable";
import { Blocks } from 'react-loader-spinner'
const EventList = () => {

    const {
        isLoading,
        isError,
        error,
        data: eventData
    } = useQuery('eventsCache', getEvents)

    return (
        <main className='min-h-screen'>
            {isLoading &&  <div className='flex flex-col items-center justify-center'>
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                </div>}
            {!isLoading && isError && <p className='statusMsg' style={{ color: 'red' }}>{isError}</p>}
            {!isLoading && !isError && (eventData.length ? <EventTable eventD={eventData} /> : <p className='statusMsg'>No Events to display.</p>)}
        </main>
    )
}

export default EventList