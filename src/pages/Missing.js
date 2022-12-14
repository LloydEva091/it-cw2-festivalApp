import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main className='missing min-h-screen'>
            <div>
                <h1 className='text-2xl text-yellow-500'>Page Not Found</h1>
                <p>Something went wrong.</p>
                <p>
                    <Link to='/'>Go back to HOME page</Link>
                </p>
            </div>
        </main>
    )
}

export default Missing