import React, { useState } from 'react';
import Form from "./Form";
import '../../App.css'
import './LoginSignupBar.css'

export const displayStates = {
    LoginAndSignup: 'LoginAndSignup',
    LoginForm: 'Form',
    SignupForm: 'SignupForm'
}

const LoginSignupBar = () => {
    const [display, setDisplay] = useState(displayStates.LoginAndSignup);

    const handleLoginOnClick = () => {
        setDisplay(displayStates.LoginForm)
    }

    const handleSignupOnClick = () => {
        setDisplay(displayStates.SignupForm)
    }

    return (
        <div className="LoginSignupBar Border">
            { display === displayStates.LoginAndSignup &&
                <div>
                    <button className="Button LoginButton" onClick={handleLoginOnClick}>Login</button>
                    <button className="Button" onClick={handleSignupOnClick}>Signup</button>
                </div>
            }
            { display === displayStates.LoginForm && <Form formType={displayStates.LoginForm} submitButtonText="Login"/> }
            { display === displayStates.SignupForm && <Form formType={displayStates.SignupForm} submitButtonText="Signup"/> }
        </div>
    )
}

export default LoginSignupBar;