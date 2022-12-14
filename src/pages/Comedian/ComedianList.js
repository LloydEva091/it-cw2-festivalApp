import { useQuery } from "react-query";
import { getComedians } from "../../apis/festivalApi";
import ComedianTable from "./ComedianTable";
import { Blocks } from 'react-loader-spinner'
const ComedianList = () => {

    const {
        isLoading,
        isError,
        error,
        data: comedianData
    } = useQuery('comediansCache', getComedians)

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
            {!isLoading && !isError && (comedianData.length ? <ComedianTable comedianD={comedianData} /> : <p className='statusMsg'>No Comedians to display.</p>)}
        </main>
    )
}

export default ComedianList