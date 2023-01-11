import React from 'react'
import './Navbar.css'
import MonthNavigation from "./MonthNavigation";
import ViewDropdown from "./ViewDropdown";
import ProfileSettings from "./ProfileSettings";
import '../../../App.css'

const Navbar = () => {
    return (
        <div className="Navbar Border">
            <div className="LeftMargin">Current Goal Placeholder</div>
            <div className="NavbarRight">
                <MonthNavigation />
                <ViewDropdown />
                <ProfileSettings />
            </div>
        </div>
    )
}

export default Navbar