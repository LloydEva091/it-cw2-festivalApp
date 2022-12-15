// import { Link } from 'react-router-dom'
// import { Banner } from '../components/Banner'
import { useQuery } from "react-query";
import ImageSlider from '../components/ImageSlider';
import { getEvents, getComedians, getVenues } from "../apis/festivalApi";
import Carousel from '../components/Carousel';
import { Blocks } from 'react-loader-spinner'
const Home = () => {

    const {
        isLoading: isLoadingEvent,
        isError: isErrorEvent,
        error: errorEvent,
        data: eventsData
    } = useQuery('eventsCache', getEvents)

    const {
        isLoading: isLoadingComedian,
        isError: isErrorComedian,
        error: errorComedian,
        data: comediansData
    } = useQuery('comediansCache', getComedians)

    const {
        isLoading: isLoadingVenue,
        isError: isErrorVenue,
        error: errorVenue,
        data: venuesData
    } = useQuery('venuesCache', getVenues)

    const containerStyles = {
        margin: "0 auto",
    };



    const content = (
        <main className='min-h-screen'>
            {isLoadingEvent && <p className='statusMsg'>
                <div className='flex flex-col items-center justify-center'>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                </div>
            </p>}
            {!isLoadingEvent && isErrorEvent && <p className='statusMsg' style={{ color: 'red' }}>{isErrorEvent}</p>}
            {!isLoadingEvent && !isErrorEvent && (eventsData.length ?
                <div style={containerStyles} className="w-full h-80">
                    <ImageSlider slides={eventsData} />
                </div> : <p className='statusMsg'>No Events to display.</p>)}

            {isLoadingComedian && <p className='statusMsg'>
                <div className='flex flex-col items-center justify-center'>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                </div>
            </p>}
            {!isLoadingComedian && isErrorComedian && <p className='statusMsg' style={{ color: 'red' }}>{isErrorComedian}</p>}
            {!isLoadingComedian && !isErrorComedian && (comediansData.length ?
                <div>
                    <h2 className="text-4xl leading-8 text-black nav_font bg-white py-2 opacity-80 text-center translate-y-12">
                        Who's on?
                    </h2>
                    <Carousel data={comediansData} />
                </div>
                : <p className='statusMsg'>No Comedians to display.</p>)}

            {isLoadingVenue && <p className='statusMsg'>
                <div className='flex flex-col items-center justify-center'>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    /></div>
            </p>}
            {!isLoadingVenue && isErrorVenue && <p className='statusMsg' style={{ color: 'red' }}>{isErrorVenue}</p>}
            {!isLoadingVenue && !isErrorVenue && (venuesData.length ?
                <div>
                    <h2 className="text-4xl leading-8 text-black nav_font bg-white py-2 opacity-80 text-center translate-y-12">
                        Where at?
                    </h2>
                    <Carousel data={venuesData} />
                </div> : <p className='statusMsg'>No Venues to display.</p>)}
        </main>
    )
    return content
}
export default Home