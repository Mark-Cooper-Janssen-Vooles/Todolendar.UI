import React from 'react';
import LandingGraphic from "./LandingGraphic";
import LoginSignupBar from "./LoginSignupBar";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Landing = () => {
    return (
        <>
            <LandingGraphic />
            <LoginSignupBar />
        </>
    )
}

export default Landing;