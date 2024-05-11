import React, { useEffect, useState } from 'react';
import './profile.scss'; // Import CSS file for styling
import closeIcon from '../../assets/icons/close.svg'
import ProfileImg from '../../assets/images/profile-holder.png'
import { logoutUser } from '../../store/auth'
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance, { setAuthToken } from '../../services/axios';
import Loader from '../Loader/Loading';

import axios from 'axios';
import { IUserProfile } from '../../interfaces/GetUserProfile';
import { RootState } from "../../store";


interface ProfileProps {
  onClose: () => void;
}


const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state: RootState) => state.profile.userProfile);
  const [sightings, setSightings] = useState([])

  const getSightings = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance.get(`/api/v1/users/${user?.id}/sightings`);

      if (response.data) {
        const sightings = response.data.sightings;
        setSightings(sightings.length)
        setIsLoading(false)
      }
    } catch (error) {
      setErrorMessage(errorMessage)
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getSightings()
  }, [])

  const dispatch = useDispatch();
  const logout = async () => {

    dispatch(logoutUser())
    onClose()
  }

  return (
    <div className="profile-overlay">
      {isLoading ? <Loader/> : 
            <div className="profile-content">
            <button className="close-button-profile" onClick={onClose}> <img src={closeIcon} alt="close" /> </button>
            {
              user ?
                (<div className="profile-modal">
                  <div className="profile-picture-wrapper">
                    <img src={ProfileImg} alt="ProfileImg" />
                    <div className="profile-name">
                      {user?.first_name && user?.last_name ? <div className='full-name'> {user.first_name}  {user.last_name} </div>
                        : null}<span className='sighting-number'>{sightings} sightings</span>
                    </div>
                  </div>
                  <div className="profile-info">
                    {user?.first_name ? <div className="labels">
                      <label className='labelFor' htmlFor="first name">First Name</label>
                      <span className='labelFor-value'>{user.first_name}</span>
                    </div> : null}
                    {user?.last_name ? <div className="labels">
                      <label className='labelFor' htmlFor="last name">Last Name</label>
                      <span className='labelFor-value'>{user.last_name}</span>
                    </div>
                      : null}{user?.date_of_birth ? <div className="labels">
                        <label className='labelFor' htmlFor="Date of Birth">Date of Birth</label>
                        <span className='labelFor-value'>May 20, 1980</span>
                      </div> : null}
                    {user?.email ? <div className="labels">
                      <label className='labelFor' htmlFor="email">Email</label>
                      <span className='labelFor-value'>michael.berry@gmail.com</span>
                    </div> : null}
                  </div>
                </div>) :
                (<div>loading...</div>)
            }
            <div className="logout-btn" onClick={logout}>
              Logout
            </div>
          </div>
      }
    </div>
  );
}

export default Profile;
