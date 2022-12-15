
import { Link } from 'react-router-dom';

const Footer = () => {

    const today = new Date();


    const content = (
        <footer className="dash-footer opacity-85 w-full text-xs">
            <p className='justify-self-end'>Copyright &copy; {today.getFullYear()} </p>
            <p>|</p>
                <Link to="/About"> About</Link>
                <Link to="/Contact"> Contact Us</Link>   
            
        </footer>
    )
    return content
}
export default Footer