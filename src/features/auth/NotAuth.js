import { Link } from 'react-router-dom';

const NotAuth = () => {
    return (
        <main className='missing min-h-screen'>
            <h1 className='text-2xl text-yellow-500'>Not Authorized to View</h1>
            <p>Nice Try.</p>
            <p>
                <Link to='/'>Go back to HOME page.</Link>
            </p>
        </main>
    )
}

export default NotAuth