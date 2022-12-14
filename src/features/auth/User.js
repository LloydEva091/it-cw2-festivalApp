import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUsers, addUsers, updateUsers, deleteUsers } from "../../apis/festivalApi";

import Card from "../../components/Card";

const User = () => {
    // const [newUsers, setNewUsers] = useState('');
    // const [users, setUsers] = useState([]);
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery('usersCache', getUsers)


    const addUsersMutation = useMutation(addUsers, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('usersCache')
        }
    })

    const updateUsersMutation = useMutation(updateUsers, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('usersCache')
        }
    })

    const deleteUsersMutation = useMutation(deleteUsers, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('usersCache')
        }
    })

    // For creating new users
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // "add all properties needed"
    //     addUsersMutation.mutate({ userID: 1, title: newUsers, completed: false });
    //     setNewUsers('')
    // }

    return (
        <main className=''>
            <div className="p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {isLoading && <p className='statusMsg'>Loading posts...</p>}
                {!isLoading && isError && <p className='statusMsg' style={{ color: 'red' }}>{isError}</p>}
                {!isLoading && !isError && (data.length ? <Card cards={data} /> : <p className='statusMsg'>No Users to display.</p>)}
            </div>
        </main>
    )
}

export default User;