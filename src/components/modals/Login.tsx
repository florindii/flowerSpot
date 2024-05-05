import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import './createAccount.scss'; // Import CSS file for styling
import { loginUser } from '../../store/auth'
import { IUser } from '../../interfaces/User'; // Import IUser interface


interface LoginProps {
  onClose: () => void;
  onOpenProfile : () => void;
}


const Login: React.FC<LoginProps> = ({ onClose, onOpenProfile }) => {

  const dispatch = useDispatch(); // Use the AppDispatch type for dispatch
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successfully, setSuccessfully] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const loginData: IUser = {
      user: {
        email: email,
        password: password,
      },
    };
    try {
      // Dispatch the login action with email and password
      const action = await dispatch(loginUser(loginData));
      // Handle successful login
      console.log("action", action.payload);

      if(action.payload?.user){
        setSuccessfully(true);
      } else {
        setSuccessfully(false)
      }

      // onClose(); // Close the modal or perform other actions on successful login
    } catch (error) {
      // Handle login failure
      console.error('Login failed:', error);
    }
  };

  const openProfile = () => {
    onOpenProfile()
    onClose()
  }

  return (
    <div className="create-account-overlay">
      <div className="create-account-modal">
        {   successfully ?
            <>
             <h2 className='succesfull-message'>“Congratulations! You have successfully logged into FlowrSpot!”</h2>
              <div className="close-login-btns">
                <button className="ok-btn" onClick={onClose}>OK</button>
                <button className="ok-btn" onClick={openProfile}>Profile</button>
              </div>
           </>
            :
           <>
           <h2 className='popup-title'>Welcome Back</h2>
 
           <div className="acc-form-group">
             <div className="acc-form-control">
               <div className="acc-input-form">
                 <label htmlFor="email">Email Address</label>
                 <input type="email" onChange={(e) => setEmail(e.target.value)} />
               </div>
             </div>
             <div className="acc-form-control">
               <div className="acc-input-form">
                 <label htmlFor="Password">Password</label>
                 <input type="password" onChange={(e) => setPassword(e.target.value)} />
               </div>
             </div>
             <div className="acc-form-control" onClick={onSubmit}>
               <div className="submit-button">
                 <button type='submit' className='create-account-btn' >Login to your Account</button>
               </div>
             </div>
           </div>
           <button className="close-button" onClick={onClose}>I don’t want to login</button>
         </>
        }
      </div>
    </div>
  );
}

export default Login;
