import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getComedians, addComedians, updateComedians, deleteComedians } from "../../apis/festivalApi";
import { Blocks } from 'react-loader-spinner'
import Card from "../../components/Card";

const Comedian = () => {
    // const [newComedians, setNewComedians] = useState('');
    // const [comedians, setComedians] = useState([]);
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery('comediansCache', getComedians)


    // const addComediansMutation = useMutation(addComedians, {
    //     onSuccess: () => {
    //         // Invalidates cache and refetch
    //         queryClient.invalidateQueries('comediansCache')
    //     }
    // })

    // For creating new comedians
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // "add all properties needed"
    //     addComediansMutation.mutate({ userID: 1, title: newComedians, completed: false });
    //     setNewComedians('')
    // }

    return (
        <main className='min-h-screen'>
            <div className="p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {isLoading && <div className=''>
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
                {!isLoading && !isError && (data.length ? <Card cards={data} /> : <p className='statusMsg'>No Comedians to display.</p>)}
            </div>
        </main>
    )
}

export default Comedian;