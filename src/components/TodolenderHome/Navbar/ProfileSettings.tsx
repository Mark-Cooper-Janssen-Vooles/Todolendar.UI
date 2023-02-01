import React, { useState } from 'react'
import '../../../App.css'
import './ProfileSettings.css'
import * as ReactDOM from 'react-dom'
import ProfileSettingsPortal from "./ProfileSettingsPortal";

const ProfileSettings = () => {
    const [ expanded, setExpanded ] = useState(false)

    const handleButtonOnClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="RightMargin">
            <button className="ButtonSmall" onClick={handleButtonOnClick}>Settings</button>
            { expanded && <ProfileSettingsPortal expanded={expanded} setExpanded={setExpanded} /> }
        </div>
    )
}

export default ProfileSettings