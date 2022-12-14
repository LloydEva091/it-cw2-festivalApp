import { useQuery } from "react-query";
import { getVenues } from "../../apis/festivalApi";
import VenueTable from "./VenueTable";
import { Blocks } from 'react-loader-spinner'
const VenueList = () => {

    const {
        isLoading,
        isError,
        error,
        data: venueData
    } = useQuery('venuesCache', getVenues)

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
            {!isLoading && !isError && (venueData.length ? <VenueTable venueD={venueData} /> : <p className='statusMsg'>No venues to display.</p>)}
        </main>
    )
}

export default VenueList