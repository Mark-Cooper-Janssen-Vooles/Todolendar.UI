import React from 'react'
import './Navbar.css'
import MonthNavigation from "./MonthNavigation";
import ViewDropdown from "./ViewDropdown";
import ProfileSettings from "./ProfileSettings";
import '../../../App.css'
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const Navbar = () => {
    const currentGoal = useSelector((state: RootState) => state.user.user.currentGoal)

    return (
        <div className="Navbar Border">
            <div className="LeftMargin">Current Goal: {currentGoal}</div>
            <div className="NavbarRight">
                <MonthNavigation />
                <ViewDropdown />
                <ProfileSettings />
            </div>
        </div>
    )
}

export default Navbar