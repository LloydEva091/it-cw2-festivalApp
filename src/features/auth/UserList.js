import { useQuery } from "react-query";
import { getUsers } from "../../apis/festivalApi";
import UserTable from "./UserTable";
import { Blocks } from 'react-loader-spinner'
const UserList = () => {

    const {
        isLoading,
        isError,
        error,
        data: userData
    } = useQuery('usersCache', getUsers)

    return (
        <main className='min-h-screen'>
            {isLoading &&  
            <div className='flex flex-col items-center justify-center'>
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
            {!isLoading && !isError && (userData.length ? <UserTable userD={userData} /> : <p className='statusMsg'>No Users to display.</p>)}
        </main>
    )
}

export default UserList