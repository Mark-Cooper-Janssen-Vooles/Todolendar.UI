import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { displayStates } from "./LoginSignupBar";
import '../../App.css';

import { tryLogin, setErrorMessage } from "../../redux/reducers/userSlice";
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "../../redux/store";

type FormData = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    mobile: string;
}

type FormProps = {
    formType: string;
    submitButtonText: string;
}

const Form = (props: FormProps) => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const { formType, submitButtonText } = props;
    const dispatch = useDispatch()
    const errorMessage = useSelector((state: RootState) => state.user.errorMessage)

    useEffect(() => {
        if (errorMessage != '') {
            window.alert(errorMessage)
            dispatch(setErrorMessage(''))
            reset() // resets form values to empty
        }
    }, [errorMessage])

    const onSubmit = (data: FormData) => {
        if (formType == displayStates.LoginForm) {
            // do redux login call
            dispatch(tryLogin(data))
        }
        if (formType == displayStates.SignupForm) {
            // do redux signup call
            // display success message + new button to try logging in. new button sets LoginSignupBar's state as "displayStates.LoginAndSignup"
        }
    }

    return (
        <form className="FormWrapper" onSubmit={handleSubmit(onSubmit)}>
            {
                formType == displayStates.SignupForm ?
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
                            <input className="Input BottomMargin LeftMargin" {...register("mobile")} placeholder="Mobile" type="mobile"/>
                            <input className="Button BottomMargin LeftMargin" type="submit" value={submitButtonText} />
                        </div>
                    </>
                : // login form:
                    <>
                        <div className="Form">
                            <input className="Input BottomMargin" {...register("username")} placeholder="Email"/>
                            <input className="Input BottomMargin" {...register("password")} placeholder="Password" type="password"/>
                            <input className="Button" type="submit" value={submitButtonText} />
                        </div>
                    </>
            }
        </form>
    );
}

export default Form;