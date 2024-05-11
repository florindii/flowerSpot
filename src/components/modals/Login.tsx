import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import './createAccount.scss';
import { loginUser } from '../../store/auth';
import { IUser } from '../../interfaces/User';
import axios from 'axios';
import AxiosInstance, { setAuthToken } from '../../services/axios';
import { IUserProfile } from '../../interfaces/GetUserProfile';
import { setUser } from '../../store/profile';
import useInputFocus from '../../customHooks/useInputFocus'; // Import the custom hook
import Loader from '../Loader/Loading';

interface LoginProps {
  onClose: () => void;
  onOpenProfile: () => void;
  closePopupMessage: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onOpenProfile, closePopupMessage }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [requestCompleted, setRequestCompleted] = useState(false);

  const {
    isFocused: isFocusedEmail,
    inputRef: emailInputRef,
    handleInputFocus: handleInputFocusEmail,
    handleInputBlur: handleInputBlurEmail,
    focusInput: focusEmailInput,
  } = useInputFocus();

  const {
    isFocused: isFocusedPassword,
    inputRef: passwordInputRef,
    handleInputFocus: handleInputFocusPassword,
    handleInputBlur: handleInputBlurPassword,
    focusInput: focusPasswordInput,
  } = useInputFocus();

  const openProfile = () => {
    onOpenProfile();
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 
    const loginData: IUser = {
      user: {
        email: email,
        password: password,
      }
    };

    try {
      await axios.post(`https://flowrspot-api.herokuapp.com/api/v1/users/login`, loginData.user).then(async res => {    
        if (res.data) {
          const action = dispatch(loginUser(res.data));
          setAuthToken(res.data.auth_token);
          await getUserInfo();
          setRequestCompleted(true); // Request completed successfully
          setIsError(false); // No error occurred
        }
      }).catch(error => {
        console.error('Login failed:', error);
        setErrorMessage(error.response.data.message || 'An error occurred');
        setRequestCompleted(true); // Request completed with an error
        setIsError(true); // Error occurred
      });
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(errorMessage || 'An error occurred');
      setRequestCompleted(true); // Request completed with an error
      setIsError(true); // Error occurred
    } finally {
      setIsLoading(false);
    }
    
  };



  const getUserInfo = async () => {
    try {
      const response = await AxiosInstance.get(`/api/v1/users/me`);
      if (response.data) {
        dispatch(setUser(response.data.user));
      }

    }
    catch (e) {
      dispatch(setUser(null))
    }
  }

  const loginRender = () => {
    if(requestCompleted && isError){
      return (
        <>
           <h2 className="error-message"> {errorMessage} </h2>
                  <div className="close-login-btns">
                  <button className="ok-btn" onClick={onClose}>
                    OK
                  </button>
                </div>
        </>
      )
    } else if(requestCompleted && !isError){
      return (
        <>
        <h2 className="succesfull-message">Congratulations! You have successfully logged into FlowrSpot!</h2>
        <div className="close-login-btns">
          <button className="ok-btn" onClick={closePopupMessage}>
            OK
          </button>
          <button className="ok-btn" onClick={openProfile}>
            Profile
          </button>
        </div>
        </>
      )
    } else {
      return (
        <>
        <h2 className="popup-title">Welcome Back</h2>
        <form onSubmit={onSubmit}>
          <div className="acc-form-group">
            <div className={`acc-form-control ${isFocusedEmail ? 'focused' : ''}`} onClick={focusEmailInput}>
              <div className="acc-input-form">
                <label htmlFor="email">Email Address</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} 
                  onFocus={handleInputFocusEmail}
                  onBlur={handleInputBlurEmail}
                  ref={emailInputRef} />
              </div>
            </div>
            <div className={`acc-form-control ${isFocusedPassword ? 'focused' : ''}`} onClick={focusPasswordInput}>
              <div className="acc-input-form">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleInputFocusPassword}
                  onBlur={handleInputBlurPassword}
                  ref={passwordInputRef} />
              </div>
            </div>
            <div className="acc-form-control">
              <div className="submit-button">
                <button type="submit" className="create-account-btn">
                  Login to your Account
                </button>
              </div>
            </div>
          </div>
        </form>
        <button className="close-button" onClick={onClose}>
          I don’t want to login
        </button>
      </>
      )
    }
  }

  return (
    <div className="create-account-overlay">
      {isLoading ? <Loader /> :
            <div className="create-account-modal-wrapper">
            <div className="create-account-modal">
              {loginRender()}
            </div>
          </div>
          } 

    </div>
  );
};

export default Login;
