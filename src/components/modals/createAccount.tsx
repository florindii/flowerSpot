import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import './createAccount.scss'; // Import CSS file for styling
import {CreateUser} from '../../interfaces/CreateUser';
import { registerUser } from '../../store/auth'
import axios from 'axios';
import Loader from '../Loader/Loading';
import useInputFocus from '../../customHooks/useInputFocus'; // Import the custom hook


interface CreateAccountProps {
    onClose: () => void;
    onLogin:() => void;
  }
  

const CreateAccount: React.FC<CreateAccountProps> = ({ onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successfully, setSuccessfully] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const dispatch = useDispatch();

  const registerData: CreateUser = {
    createUser:{
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      email: email,
      password: password
    }
  }

  const {
    isFocused: isFocusedfirst_name,
    inputRef: first_nameInputRef,
    handleInputFocus: handleInputFocusfirst_name,
    handleInputBlur: handleInputBlurfirst_name,
    focusInput: focusfirst_nameInput,
  } = useInputFocus();

  const {
    isFocused: isFocusedLastName,
    inputRef: lastNameInputRef,
    handleInputFocus: handleInputFocusLastName,
    handleInputBlur: handleInputBlurLastName,
    focusInput: focusLastNameInput,
  } = useInputFocus();

  const {
    isFocused: isFocusedDateOfBirth,
    inputRef: dateOfBirthInputRef,
    handleInputFocus: handleInputFocusDateOfBirth,
    handleInputBlur: handleInputBlurDateOfBirth,
    focusInput: focusDateOfBirthInput,
  } = useInputFocus();

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


  const onSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`https://flowrspot-api.herokuapp.com/api/v1/users/register`,registerData.createUser).then(res => {
        if(res.data){
          const action =  dispatch(registerUser(registerData));
        }      
        setSuccessfully(true);
      })
    } catch (error) {
      console.log("err",error);
      setErrorMessage(errorMessage)
      
    }finally{
    setIsLoading(false);
    }
    
  }

  const closeMessageAndOpenLogin = () => {
    onClose();
    onLogin();
  }
  return (
    <div className="create-account-overlay">
      {isLoading ? <Loader/> :
            <div className="create-account-modal">
              {successfully ? (
                 <>
                 <h2 className="success-message"> “Congratulations! You have successfully signed up for FlowrSpot!”</h2>
                 <div className="close-login-btns">
                   <button className="ok-btn" onClick={closeMessageAndOpenLogin}>
                     OK
                   </button>
                 </div>
               </>
              )
              
            :
            (
              <>
              <h2 className="popup-title">Create an Account</h2>
              <form onSubmit={onSubmit}>
                <div className="acc-form-group">
                  <div className="acc-form-control-except"
                 >
                    <div className={`acc-input-form ${isFocusedfirst_name ? 'focused' : ''}`}  onClick={focusfirst_nameInput}  ref={first_nameInputRef}>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={handleInputFocusfirst_name}
                        onBlur={handleInputBlurfirst_name}
                        ref={first_nameInputRef}
                      />
                    </div>
                    <div className={`acc-input-form ${isFocusedLastName ? 'focused' : ''}`} onClick={focusLastNameInput} ref={lastNameInputRef}>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={handleInputFocusLastName}
                        onBlur={handleInputBlurLastName}
                      />
                    </div>
                  </div>
                  <div className={`acc-form-control ${isFocusedDateOfBirth ? 'focused' : ''}`} onClick={focusDateOfBirthInput} ref={dateOfBirthInputRef}>
                    <div className="acc-input-form">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        onFocus={handleInputFocusDateOfBirth}
                        onBlur={handleInputBlurDateOfBirth}
                      />
                    </div>
                  </div>
                  <div className={`acc-form-control ${isFocusedEmail ? 'focused' : ''}`} onClick={focusEmailInput} ref={emailInputRef}>
                    <div className="acc-input-form">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={handleInputFocusEmail}
                        onBlur={handleInputBlurEmail}
                      />
                    </div>
                  </div>
                  <div className={`acc-form-control ${isFocusedPassword ? 'focused' : ''}`} onClick={focusPasswordInput} ref={passwordInputRef}>
                  <div className="acc-input-form">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={handleInputFocusPassword}
                        onBlur={handleInputBlurPassword}
                      />
                    </div>
                  </div>
                  <div className="acc-form-control">
                    <div className="submit-button">
                      <button type="submit" className="create-account-btn">
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <button className="close-button" onClick={onClose}>
                I don’t want to register
              </button>
              </>
            )}

          </div>
          }

    </div>
  );
}

export default CreateAccount;
