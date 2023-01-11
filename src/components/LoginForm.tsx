import React from 'react';
import { useForm } from "react-hook-form";
import '../App.css';

type FormData = {
    username: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        // send to redux here
        console.log(data);
    }

    return (
        <form className="Form" onSubmit={handleSubmit(onSubmit)}>
            <input className="Input BottomMargin" {...register("username")} placeholder="Email"/>
            <input className="Input BottomMargin" {...register("password")} placeholder="Password" type="password"/>
            <input className="Button" type="submit" />
        </form>
    );
}

export default LoginForm;