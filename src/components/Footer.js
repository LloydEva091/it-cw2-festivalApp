import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {

   
    const { pathname } = useLocation();
    const today = new Date();

    // const onGoHomeClicked = () => navigate('/dash');

    // let goHomeButton = null;
    // if (pathname === '/admin') {
    //     goHomeButton = (
    //         <button
    //             className="dash-footer__button icon-button"
    //             title="Home"
    //             onClick={onGoHomeClicked}
    //         >
    //         </button>
    //     )
    // }

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