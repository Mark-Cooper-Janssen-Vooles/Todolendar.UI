import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { displayStates } from "./LoginSignupBar";
import '../../App.css';

import { tryLogin, trySignup, setAlertMessage } from "../../redux/reducers/userSlice";
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "../../redux/store";

type FormData = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    mobile: string;
    currentgoal: string;
}

type FormProps = {
    formType: string;
    submitButtonText: string;
    setDisplay: React.Dispatch<React.SetStateAction<string>>
}

const Form = (props: FormProps) => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const { formType, submitButtonText } = props;
    const dispatch = useDispatch()
    const alertMessage = useSelector((state: RootState) => state.user.alertMessage)

    useEffect(() => {
        if (alertMessage !== '') {
            window.alert(alertMessage)
            dispatch(setAlertMessage(''))
            reset() // resets form values to empty
        }
    }, [alertMessage])

    const onSubmit = (data: FormData) => {
        if (formType === displayStates.LoginForm) {
            // do redux login call
            dispatch(tryLogin(data))
        }
        if (formType === displayStates.SignupForm) {
            // do redux signup call
            dispatch(trySignup(data))
        }
    }

    const handleBackButton = () => {
        props.setDisplay(displayStates.LoginAndSignup)
    }

    return (
        <form className="FormWrapper" onSubmit={handleSubmit(onSubmit)}>
            {
                formType === displayStates.SignupForm ?
                    <>
                        <div className="Form">
                            <input className="Input BottomMargin LeftMargin" {...register("username")} placeholder="Email"/>
                            <input className="Input BottomMargin LeftMargin" {...register("password")} placeholder="Password" type="password"/>
                        </div>

                        <div className="Form">
                            <input className="Input BottomMargin LeftMargin" {...register("firstname")} placeholder="First Name" type="firstName"/>
                            <input className="Input BottomMargin LeftMargin" {...register("lastname")} placeholder="Last Name" type="lastName"/>
                        </div>

                        <div className="Form">
                            <input className="Input BottomMargin LeftMargin" {...register("currentgoal")} placeholder="Current Goal" type="currentgoal"/>
                            <input className="Input BottomMargin LeftMargin" {...register("mobile")} placeholder="Mobile" type="mobile"/>
                        </div>

                        <div className="Form">
                            <input className="Button BottomMargin LeftMargin" type="submit" value={submitButtonText} />
                            <button onClick={handleBackButton}>Cancel</button>
                        </div>
                    </>
                : // login form:
                    <>
                        <div className="Form">
                            <input className="Input BottomMargin" {...register("username")} placeholder="Email"/>
                            <input className="Input BottomMargin" {...register("password")} placeholder="Password" type="password"/>
                            <input className="Button" type="submit" value={submitButtonText} />
                            <button onClick={handleBackButton}>Cancel</button>
                        </div>
                    </>
            }
        </form>
    );
}

export default Form;
