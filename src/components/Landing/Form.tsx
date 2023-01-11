import React from 'react';
import { useForm } from "react-hook-form";
import { displayStates } from "./LoginSignupBar";
import '../../App.css';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

type FormData = {
    username: string;
    password: string;
}

type FormProps = {
    formType: string;
    submitButtonText: string;
}

const Form = (props: FormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { formType, submitButtonText } = props;

    const onSubmit = (data: FormData) => {
        if (formType == displayStates.LoginForm) {
            // do redux login call
            // set loggedIn as true
        }
        if (formType == displayStates.SignupForm) {
            // do redux signup call
            // display success message + new button to try logging in. new button sets LoginSignupBar's state as "displayStates.LoginAndSignup"
        }
        console.log(data);
    }

    return (
        <form className="Form" onSubmit={handleSubmit(onSubmit)}>
            <input className="Input BottomMargin" {...register("username")} placeholder="Email"/>
            <input className="Input BottomMargin" {...register("password")} placeholder="Password" type="password"/>
            <input className="Button" type="submit" value={submitButtonText} />
        </form>
    );
}

export default Form;