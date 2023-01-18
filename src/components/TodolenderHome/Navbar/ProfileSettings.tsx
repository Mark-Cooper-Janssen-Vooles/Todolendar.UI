import React, { useState } from 'react'
import '../../../App.css'
import './ProfileSettings.css'
import * as ReactDOM from 'react-dom'

const ProfileSettings = () => {
    const [ expanded, setExpanded ] = useState(false)

    const handleButtonOnClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="RightMargin">
            {/*<label htmlFor="settings-dropdown">Settings</label>*/}
            {/*<select name="settings-dropdown" id="settings-dropdown" defaultValue="Settings">*/}
            {/*    <option value="day">Day</option>*/}
            {/*    <option value="Week">Week</option>*/}
            {/*    <option value="Month">Month</option>*/}
            {/*</select>*/}

            <button className="ButtonSmall" onClick={handleButtonOnClick}>Settings</button>
            {
                expanded && <ProfileSettingsPortal />
            }
        </div>
    )
}

export default ProfileSettings

const ProfileSettingsPortal = () => {
    // typically get this info from the state, but for now:
    const dummyData = {
        email: 'hmm@hmm.com',
        firstName: 'hmm',
        lastName: 'humm',
        mobile: '0431175219',
        planReminder: {
            planReminderOn: true,
            frequency: "week",
            description: "text message about plan reminder"
        }
    }

    return ReactDOM.createPortal(
        <div className="ProfileSettingsMenu Border">
            <button>Edit Email</button><br />
            <button>Edit First Name</button><br />
            <button>Edit Last Name</button><br />
            <button>Edit Mobile</button><br />
            <button>Edit Plan Reminder</button><br />
            <button>Delete Account</button><br />
            <br /><br />
            <button>Logout</button>
        </div>,
        // @ts-ignore
        document.body
    )
}