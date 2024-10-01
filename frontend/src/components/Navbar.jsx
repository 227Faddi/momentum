import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import { logout } from '../services/api/auth';

const NavBar = ({ user, setUser, setToken }) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await logout()
        if(response.ok){
            setUser(null)
            setToken(null)
        }
    };

    const location = useLocation();
    let elements
    if(location.pathname.startsWith('/dashboard')){
        elements = (
            <>
                { user && user.username }
                <div className='flex items-center gap-1'>
                    <FaFire />
                    { user && user.points }
                </div>
                <a href="/add-goal">Add</a>
                <button onClick={handleLogout}>Logout</button>
            </>
        )
    }
    return (
        <nav className="py-5 text-center">
            <div className="md:flex justify-around items-center">
                <h2 className="mb-0 text-3xl cursor-pointer">
                    <Link to="/">
                        <img
                            src="../src/assets/img/logo.svg"
                            alt="logo"
                            className="w-10 inline-block mr-2"
                        />
                            Momentum
                    </Link>
                </h2>
                <div className="flex content-between items-center gap-10 px-2">
                    { elements }
                </div>
            </div>
        </nav>
    )
}

export default NavBar