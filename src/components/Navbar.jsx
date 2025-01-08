import React, { useContext, useState } from 'react';
import logo from "../../public/logo.png";
import '../components/Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from './context/Context';

const Navbar = () => {
    const { setMoalOpen } = useContext(LoginContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const loginStatus = (login) => {
        const token = localStorage.getItem('jwt');
        return (
            <>
                <li><Link to='/'>Home</Link></li> {/* Added Home link */}
                {login || token ? (
                    <>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/createPost'>Create Post</Link></li>
                        <li><Link style={{ marginLeft: "20px" }} to='/following/post'>My Following Post</Link></li>
                        <li>
                            <button
                                className='primaryBtn'
                                onClick={() => {
                                    setMoalOpen(true);
                                    console.log("clicked");
                                }}
                            >
                                Log out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to='/signup'>SignUp</Link></li>
                        <li><Link to='/signin'>Signin</Link></li>
                    </>
                )}
            </>
        );
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={logo} alt="insta-logo" className="logo" /></Link>

            {/* Mobile Sidebar Menu */}
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="close-btn" onClick={toggleMenu}>&#10005;</div>
                <ul className='nav-menu'>
                    {loginStatus()}
                </ul>
            </div>

            {/* Desktop Menu */}
            {/* You can add your desktop menu items here if needed */}

            {/* Mobile Menu Toggle */}
            <div className='menu-toggle' onClick={toggleMenu}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </div>
        </div>
    );
};

export default Navbar;
