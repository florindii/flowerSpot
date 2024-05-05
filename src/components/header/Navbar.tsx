import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateAccount from '../modals/createAccount';
import Login from '../modals/Login';
import Profile from '../modals/Profile';
import FlowerSpotLogo from '../../assets/images/flower-spot-logo.png';
import './Navbar.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { logoutUser } from '../../store/auth'
import { useDispatch } from "react-redux";
import menu_profile_holder from '../../assets/images/menu_profile_holder.png';

function Navbar() {
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuthenticated(auth.isLogin)
  }, [auth])

  const toggleCreateAccount = () => {
    setIsCreateAccountOpen(!isCreateAccountOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when screen size is >= 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className='logo'>
          <img src={FlowerSpotLogo} alt="FlowerSpotLogo" />
        </div>
        <div className={`menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {
          isMobileMenuOpen ?
            <ul className={`nav ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
              <div className={`${isMobileMenuOpen ? 'mobile-nav' : ''}`}>
                <li className='nav-item'>
                  <Link to="/">Flowers</Link>
                </li>
                <li className='nav-item'>
                  Latest Sightings
                </li>
                <li className='nav-item'>
                  Favorites
                </li>
                {
                  isAuthenticated ? null : <li className='nav-item' onClick={toggleLoginPopup}>
                    Login
                  </li>
                }
                {isAuthenticated ? null : <li className='nav-item new-account-item' onClick={toggleCreateAccount}>
                  New Account
                </li>}
                {isAuthenticated ? <li className='nav-item' onClick={toggleProfilePopup}>
                  Profile
                </li> : null}
              </div>
            </ul> :
            <ul className='nav'>
              <li className='nav-item'>
                <Link to="/">Flowers</Link>
              </li>
              <li className='nav-item'>
                Latest Sightings
              </li>
              <li className='nav-item'>
                Favorites
              </li>
              {
                isAuthenticated ? null : <li className='nav-item' onClick={toggleLoginPopup}>
                  Login
                </li>
              }
              {isAuthenticated ? null : <li className='nav-item new-account-item' onClick={toggleCreateAccount}>
                New Account
              </li>}
              {isAuthenticated ? <li className='nav-item' onClick={toggleProfilePopup}>
                <span>John Doe</span>
                <img src={menu_profile_holder} alt="menu_profile_holder" />
              </li>  : null}
            </ul>

        }
      </nav>
      {/* Modals */}
      {isCreateAccountOpen && <CreateAccount onClose={toggleCreateAccount} />}
      {isLoginOpen && <Login onClose={toggleLoginPopup} onOpenProfile={toggleProfilePopup}/>}
      {isProfileOpen && <Profile onClose={toggleProfilePopup} />}
    </header>
  );
}

export default Navbar;
