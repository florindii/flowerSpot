import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateAccount from '../modals/createAccount';
import Login from '../modals/Login';
import Profile from '../modals/Profile';
import FlowerSpotLogo from '../../assets/images/flower-spot-logo.png';
import './Navbar.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import menu_profile_holder from '../../assets/images/menu_profile_holder.png';

function Navbar() {
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state: RootState) => state.profile.userProfile)


  useEffect(() => {
    setIsAuthenticated(auth.isLogin)
  }, [auth])

  const closeMessageModal = () => {
    setIsLoginOpen(!isLoginOpen);
    
  }
  const openProfileFromLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsProfileOpen(!isProfileOpen);
  }
  const toggleCreateAccount = () => {
    if(window.innerWidth <= 768){
      document.body.style.overflow = 'hidden';
      const search = document.getElementById('search');
  
      if (search) {
        search.style.marginTop = '3px'; // Set marginTop to 3px
      }

      setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    setIsCreateAccountOpen(!isCreateAccountOpen);

  };

  const toggleLoginPopup = () => {
    if(window.innerWidth <= 768){
      document.body.style.overflow = 'hidden';
      const search = document.getElementById('search');
  
      if (search) {
        search.style.marginTop = '3px'; // Set marginTop to 3px
      }

      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    setIsLoginOpen(!isLoginOpen);

  };

  const toggleProfilePopup = () => {
    if(window.innerWidth <= 768){
      document.body.style.overflow = 'hidden';
      const search = document.getElementById('search');
  
      if (search) {
        search.style.marginTop = '3px'; // Set marginTop to 3px
      }

      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    setIsProfileOpen(!isProfileOpen);

  };

  const toggleMobileMenu = () => {
    const body = document.body;
    const search = document.getElementById('search');
  
    if (!isMobileMenuOpen) {
      // Menu is opening, hide body overflow
      body.style.overflow = 'hidden';
  
      // Adjust styles as needed (example: setting marginTop of 'search')
      if (search) {
        search.style.marginTop = '3px';
      }
  
      // Close other components if open
      setIsCreateAccountOpen(false);
      setIsLoginOpen(false);
      setIsProfileOpen(false);
    } else {
      // Menu is closing, restore body overflow
      body.style.overflow = '';
  
      // Reset styles that were modified
      if (search) {
        search.style.marginTop = ''; // Reset marginTop
      }
    }
  
    // Toggle mobile menu state
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
                <li className='nav-item' onClick={toggleMobileMenu}>
                  <Link to="/">Flowers</Link>
                </li>
                <li className='nav-item' onClick={toggleMobileMenu}>
                <Link to="/latest-slights">
                  Latest Sightings
                  </Link>
                </li>
                <li className='nav-item' onClick={toggleMobileMenu}>
                  <Link to="/favorite">
                    Favorites
                  </Link>
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
              <Link to="/latest-slights">
                Latest Sightings
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/favorite">
                  Favorites
                </Link>
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
                <span> {user?.first_name} {user?.last_name} </span>
                <img src={menu_profile_holder} alt="menu_profile_holder" />
              </li>  : null}
            </ul>

        }
      </nav>
      {/* Modals */}
      {isCreateAccountOpen && <CreateAccount onClose={toggleCreateAccount}  onLogin={toggleLoginPopup}/>}
      {isLoginOpen && <Login onClose={toggleLoginPopup} onOpenProfile={openProfileFromLogin} closePopupMessage={closeMessageModal}/>}
      {isProfileOpen && <Profile onClose={toggleProfilePopup} />}
    </header>
  );
}

export default Navbar;
