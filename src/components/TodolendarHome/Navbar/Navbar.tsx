import React, {useEffect, useState} from 'react'
import './Navbar.css'
import MonthNavigation from "./MonthNavigation";
import ViewDropdown from "./ViewDropdown";
import ProfileSettings from "./ProfileSettings";
import '../../../App.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {saveUpdateUserInfo} from "../../../redux/reducers/userSlice";
import CurrentGoal from "./CurrentGoal";

const Navbar = () => {
    return (
        <div className="Navbar Border">
            <CurrentGoal />
            <div className="NavbarRight">
                <MonthNavigation />
                <ViewDropdown />
                <ProfileSettings />
            </div>
        </div>
    )
}

export default Navbar