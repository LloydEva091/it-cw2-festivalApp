import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ logIn, isLogged }) => {
    return (
        <>
            <Header logIn={logIn} isLogged={isLogged} />
            <div className="dash-container">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout