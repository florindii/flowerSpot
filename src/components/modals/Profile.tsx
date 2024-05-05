import React from 'react';
import './profile.scss'; // Import CSS file for styling
import closeIcon from '../../assets/icons/close.svg'
import ProfileImg from '../../assets/images/profile-holder.png'
import { logoutUser  } from '../../store/auth'
import { useDispatch } from "react-redux";

interface ProfileProps {
    onClose: () => void;
  }
  

const Profile: React.FC<ProfileProps> = ({ onClose }) => {

  const dispatch = useDispatch();
  const logout = async () =>{

    dispatch(logoutUser()) 
    onClose()  
  }

  return (
    <div className="profile-overlay">
      <div className="profile-content">
        <button className="close-button-profile" onClick={onClose}> <img src={closeIcon} alt="close" /> </button>
      <div className="profile-modal">
        <div className="profile-picture-wrapper">
            <img src={ProfileImg} alt="ProfileImg" />
            <div className="profile-name">
                <div className='full-name'>Michael Berry</div>
                <span className='sighting-number'>47 sightings</span>
            </div>
        </div>
        <div className="profile-info">
          <div className="labels">
            <label className='labelFor' htmlFor="first name">First Name</label>
            <span className='labelFor-value'>Michael</span>
          </div>
          <div className="labels">
            <label className='labelFor' htmlFor="last name">Last Name</label>
            <span className='labelFor-value'>Berry</span>
          </div>
          <div className="labels">
            <label className='labelFor' htmlFor="Date of Birth">Date of Birth</label>
            <span className='labelFor-value'>May 20, 1980</span>
          </div>
          <div className="labels">
            <label className='labelFor' htmlFor="email">Email</label>
            <span className='labelFor-value'>michael.berry@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="logout-btn" onClick={logout}>
        Logout
      </div>
      </div>
    </div>
  );
}

export default Profile;
