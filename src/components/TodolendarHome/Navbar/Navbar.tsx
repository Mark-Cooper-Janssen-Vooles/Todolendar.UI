import React from 'react'
import './Navbar.css'
import MonthNavigation from "./MonthNavigation";
import ViewDropdown from "./ViewDropdown";
import ProfileSettings from "./ProfileSettings";
import '../../../App.css'
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
