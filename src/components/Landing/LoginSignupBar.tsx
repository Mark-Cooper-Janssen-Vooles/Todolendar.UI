import React, {useEffect, useState} from 'react';
import Form from "./Form";
import '../../App.css'
import './LoginSignupBar.css'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export const displayStates = {
    LoginAndSignup: 'LoginAndSignup',
    LoginForm: 'Form',
    SignupForm: 'SignupForm'
}

const LoginSignupBar = () => {
    const signupSuccessful = useSelector((state: RootState) => state.user.signupSuccessful)
    const [display, setDisplay] = useState(displayStates.LoginAndSignup);

    useEffect(() => {
        setDisplay(displayStates.LoginAndSignup)
    }, [signupSuccessful])

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
            { display === displayStates.LoginForm && <Form formType={displayStates.LoginForm} submitButtonText="Login" setDisplay={setDisplay} /> }
            { display === displayStates.SignupForm && <Form formType={displayStates.SignupForm} submitButtonText="Signup" setDisplay={setDisplay}/>}
        </div>
    )
}

export default LoginSignupBar;