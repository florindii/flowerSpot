import React from 'react';
import './createAccount.scss'; // Import CSS file for styling


interface CreateAccountProps {
    onClose: () => void;
  }
  

const CreateAccount: React.FC<CreateAccountProps> = ({ onClose }) => {


  return (
    <div className="create-account-overlay">
      <div className="create-account-modal">
        <h2 className='popup-title'>Create an Account</h2>
        <div className="acc-form-group">
            <div className="acc-form-control-except">
                <div className="acc-input-form">
                    <label htmlFor="First Name">First Name</label>
                    <input type="text" />
                </div>
                <div className="acc-input-form">
                    <label htmlFor="First Name">Last Name</label>
                    <input type="text" />
                </div>
            </div>
            <div className="acc-form-control">
                <div className="acc-input-form">
                <label htmlFor="Date of Birth">Date of Birth</label>
                <input type="date" />
                </div>
            </div>
            <div className="acc-form-control">
                <div className="acc-input-form">
                <label htmlFor="email">Email</label>
                <input type="email" />
                </div>
            </div>
            <div className="acc-form-control">
                <div className="acc-input-form">
                <label htmlFor="Password">Password</label>
                <input type="password" />
                </div>
            </div>
            <div className="acc-form-control">
                <div className="submit-button">
                    <button className='create-account-btn'>Create Account</button>
                </div>
            </div>
        </div>
        <button className="close-button" onClick={onClose}>I don’t want to register</button>
      </div>
    </div>
  );
}

export default CreateAccount;
