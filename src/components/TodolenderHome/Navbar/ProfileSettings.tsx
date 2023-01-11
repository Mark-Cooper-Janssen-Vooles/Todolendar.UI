import React, { useState } from 'react'
import '../../../App.css'

const ProfileSettings = () => {
    const [ expanded, setExpanded ] = useState(false)

    const handleButtonOnClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="RightMargin">
            <button className="ButtonSmall" onClick={handleButtonOnClick}>Settings</button>
            {
                expanded && <div className="ProfileSettingsMenu Border">Profile settings menu here</div>
            }
        </div>
    )
}

export default ProfileSettings