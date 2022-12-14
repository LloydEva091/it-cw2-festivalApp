import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getVenues, addVenues, updateVenues, deleteVenues } from "../../apis/festivalApi";
import { Blocks } from 'react-loader-spinner'
import Card from "../../components/Card";

const Venue = () => {
    // const [newVenues, setNewVenues] = useState('');
    // const [venues, setVenues] = useState([]);
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery('venuesCache', getVenues)


    // const addVenuesMutation = useMutation(addVenues, {
    //     onSuccess: () => {
    //         // Invalidates cache and refetch
    //         queryClient.invalidateQueries('venuesCache')
    //     }
    // })

    // const updateVenuesMutation = useMutation(updateVenues, {
    //     onSuccess: () => {
    //         // Invalidates cache and refetch
    //         queryClient.invalidateQueries('venuesCache')
    //     }
    // })

    // const deleteVenuesMutation = useMutation(deleteVenues, {
    //     onSuccess: () => {
    //         // Invalidates cache and refetch
    //         queryClient.invalidateQueries('venuesCache')
    //     }
    // })

    // For creating new venues
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // "add all properties needed"
    //     addVenuesMutation.mutate({ userID: 1, title: newVenues, completed: false });
    //     setNewVenues('')
    // }

    return (
        <main className='min-h-screen'>
            <div className="p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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
                {!isLoading && !isError && (data.length ? <Card cards={data} /> : <p className='statusMsg'>No Venues to display.</p>)}
            </div>
        </main>
    )
}

export default Venue;