import React, { useState } from 'react';
import LoginForm from "./LoginForm";
import '../App.css'
import './LoginSignupBar.css'

const displayStates = {
    LoginAndSignup: 'LoginAndSignup',
    LoginForm: 'LoginForm',
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

            { display === displayStates.LoginForm &&
                <LoginForm />
            }

            { display === displayStates.SignupForm &&
                <div>signup form</div>
            }
        </div>
    )
}

export default LoginSignupBar;