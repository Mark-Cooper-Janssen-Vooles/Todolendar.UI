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

    const [editingEmailForm, setEditingEmailForm] = useState(false);
    const [email, setEmail] = useState(dummyData.email)

    const [editingFirstNameForm, setEditingFirstNameForm] = useState(false);
    const [firstName, setFirstName] = useState(dummyData.firstName)

    const [editingLastNameForm, setEditingLastNameForm] = useState(false);
    const [lastName, setLastName] = useState(dummyData.lastName)

    const [editingMobileForm, setEditingMobileForm] = useState(false);
    const [mobile, setMobile] = useState(dummyData.mobile)

    const [editingPlanReminderForm, setEditingPlanReminderForm] = useState(false);
    const [planReminder, setPlanReminder] = useState(dummyData.planReminder)

    const [deleteAccountActive, setDeleteAccountActive] = useState(false);


    const handleEditEmail = () => setEditingEmailForm(true)
    const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => setEmail(event.target.value)
    const cancelEditEmail = () => setEditingEmailForm(false)
    const handleSaveEditEmail = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(email)
        // api call to save and update email
        // re-fetch data

        cancelEditEmail();
    }

    const handleEditFirstName = () => setEditingFirstNameForm(true)
    const handleFirstNameChange = (event: { target: { value: React.SetStateAction<string> } }) => setFirstName(event.target.value)
    const cancelEditFirstName = () => setEditingFirstNameForm(false)
    const handleSaveEditFirstName = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        // api call to save and update email
        // re-fetch data

        cancelEditFirstName();
    }

    const handleEditLastName = () => setEditingLastNameForm(true)
    const handleLastNameChange = (event: { target: { value: React.SetStateAction<string> } }) => setLastName(event.target.value)
    const cancelEditLastName = () => setEditingLastNameForm(false)
    const handleSaveEditLastName = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        // api call to save and update email
        // re-fetch data

        cancelEditLastName();
    }

    const handleEditMobile = () => setEditingMobileForm(true)
    const handleMobileChange = (event: { target: { value: React.SetStateAction<string> } }) => setMobile(event.target.value)
    const cancelEditMobile = () => setEditingMobileForm(false)
    const handleSaveEditMobile= (event: { preventDefault: () => void }) => {
        event.preventDefault()
        // api call to save and update email
        // re-fetch data

        cancelEditMobile();
    }

    return ReactDOM.createPortal(
        <div className="ProfileSettingsMenu Border">
            <div className="ProfileSettingsTop">
                <div className="ProfileSettingsSection">
                    { editingEmailForm ?
                        <>
                            <form onSubmit={handleSaveEditEmail}>
                                <input type="text" name="email" onChange={handleEmailChange} placeholder="Email"/>
                                <input type="submit" value="save" />
                            </form>
                            <button onClick={cancelEditEmail}>Cancel</button>
                        </> :
                        <>
                            {email}
                            <button onClick={handleEditEmail}>Edit</button>
                        </>
                    }
                </div>
                <div className="ProfileSettingsSection">
                    { editingFirstNameForm ?
                        <>
                            <form onSubmit={handleSaveEditFirstName}>
                                <input type="text" name="email" onChange={handleFirstNameChange} placeholder="First Name"/>
                                <input type="submit" value="save" />
                            </form>
                            <button onClick={cancelEditFirstName}>Cancel</button>
                        </> :
                        <>
                            {firstName}
                            <button onClick={handleEditFirstName}>Edit</button>
                        </>
                    }
                </div>
                <div className="ProfileSettingsSection">
                    { editingLastNameForm ?
                        <>
                            <form onSubmit={handleSaveEditLastName}>
                                <input type="text" name="email" onChange={handleLastNameChange} placeholder="Last Name"/>
                                <input type="submit" value="save" />
                            </form>
                            <button onClick={cancelEditLastName}>Cancel</button>
                        </> :
                        <>
                            {lastName}
                            <button onClick={handleEditLastName}>Edit</button>
                        </>
                    }
                </div>
                <div className="ProfileSettingsSection">
                    { editingMobileForm ?
                        <>
                            <form onSubmit={handleSaveEditMobile}>
                                <input type="text" name="email" onChange={handleMobileChange} placeholder="Email"/>
                                <input type="submit" value="save" />
                            </form>
                            <button onClick={cancelEditMobile}>Cancel</button>
                        </> :
                        <>
                            {mobile}
                            <button onClick={handleEditMobile}>Edit</button>
                        </>
                    }
                </div>
                <div className="ProfileSettingsSection">
                    &nbsp;
                    <button>Edit Plan Reminder</button>
                </div>
                <div className="ProfileSettingsSection">
                    &nbsp;
                    <button>Delete Account</button>
                </div>
            </div>
            <button>Logout</button>
        </div>,
        // @ts-ignore
        document.body
    )
}