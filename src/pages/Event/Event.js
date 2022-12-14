import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getEvents } from "./../../apis/festivalApi";
import { Blocks } from 'react-loader-spinner'

import EventCard from "./EventCard";

const Event = () => {
    // const [newEvents, setNewEvents] = useState('');
    // const [sortedEvents, setSortedEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"))

    const {
        data,
        isLoading,
        isError,
        isSuccess,
      } = useQuery(["Event"], () => getEvents())


    return (
        <main className='min-h-screen'>
            <div className="p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                {isLoading &&  <div className=''>
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
                {/* <EventCard cards={props} /> */}
                {/* <EventCard cards={data}/> */}
                {/* {!isLoadingEvents && !isErrorEvents && (eventData.length ? <EventCard cards={props} /> : <p className='statusMsg'>No Events to display.</p>)} */}
                {!isLoading && !isError && (data.length ? <EventCard data={data} /> : <p className='statusMsg'>No Events to display.</p>)}
            
            
            </div>
        </main>
    )
}

export default Event;