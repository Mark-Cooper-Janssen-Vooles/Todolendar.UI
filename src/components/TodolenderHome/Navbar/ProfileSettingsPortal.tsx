import React, {useState} from "react";
import * as ReactDOM from "react-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

type IProfileSettingsPortal = {
    expanded: boolean;
    setExpanded:  React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileSettingsPortal = (props: IProfileSettingsPortal) => {
    const userState = useSelector((state: RootState) => state.user.user)
    const planReminderState = useSelector((state: RootState) => state.user.planReminder)

    const [editingEmailForm, setEditingEmailForm] = useState(false);
    const [email, setEmail] = useState(userState.email)

    const [editingFirstNameForm, setEditingFirstNameForm] = useState(false);
    const [firstName, setFirstName] = useState(userState.firstName)

    const [editingLastNameForm, setEditingLastNameForm] = useState(false);
    const [lastName, setLastName] = useState(userState.lastName)

    const [editingMobileForm, setEditingMobileForm] = useState(false);
    const [mobile, setMobile] = useState(userState.mobile)

    const [editingPlanReminderForm, setEditingPlanReminderForm] = useState(false);
    const [planReminder, setPlanReminder] = useState(planReminderState)

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

    const handleEditPlanReminder = () => setEditingPlanReminderForm(true)
    const handlePlanReminderChange = (event: any) => {
        let setNewPlanReminder = planReminder;

        if (event.target.type === 'checkbox') {
            setNewPlanReminder = {
                userId: planReminder.userId,
                planReminderOn: event.target.checked,
                frequency: planReminder.frequency,
                nextScheduledAt: planReminder.nextScheduledAt,
                description: planReminder.description
            }
        }

        if (event.target.type === 'select-one' && event.target.id === 'frequency') {
            setNewPlanReminder = {
                userId: planReminder.userId,
                planReminderOn: planReminder.planReminderOn,
                frequency: event.target.value,
                nextScheduledAt: planReminder.nextScheduledAt,
                description: planReminder.description
            }
        }

        if (event.target.id === 'description') {
            setNewPlanReminder = {
                userId: planReminder.userId,
                planReminderOn: planReminder.planReminderOn,
                frequency: planReminder.frequency,
                nextScheduledAt: planReminder.nextScheduledAt,
                description: event.target.value
            }
        }

        setPlanReminder(setNewPlanReminder)
    }
    const cancelEditPlanReminder = () => setEditingPlanReminderForm(false)
    const handleSaveEditPlanReminder= (event: { preventDefault: () => void }) => {
        event.preventDefault()
        // api call to save and update email
        // re-fetch data

        cancelEditPlanReminder()
    }

    const handleDeleteAccount = () => setDeleteAccountActive(!deleteAccountActive)
    const handleConfirmedDeletion = () => {
        // api call to delete user
        window.alert("Your account has been deleted")
        handleLogout();
    }

    const handleLogout = () => {
        // sign user out, clear cookies or something
        window.alert("You have been signed out")
    }

    return ReactDOM.createPortal(
        <div className="ProfileSettingsMenu Border">
            <div className="ProfileSettingsTop">
                <div className="CloseIcon" onClick={() => props.setExpanded(false)}>X</div>
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
                                <input type="text" name="firstname" onChange={handleFirstNameChange} placeholder="First Name"/>
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
                                <input type="text" name="lastname" onChange={handleLastNameChange} placeholder="Last Name"/>
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
                                <input type="text" name="mobile" onChange={handleMobileChange} placeholder="Email"/>
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
                    { editingPlanReminderForm ?
                        <>
                            <form onSubmit={handleSaveEditPlanReminder}>
                                <div>
                                    <label htmlFor="planReminderOn">Plan reminder on?</label>
                                    <input type="checkbox" name="planReminderOn" id ="planReminderOn" onChange={handlePlanReminderChange}
                                           defaultChecked={planReminder.planReminderOn} />
                                </div>
                                <select id="frequency" name="frequency" defaultValue={planReminder.frequency} onChange={handlePlanReminderChange}>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                                <textarea name="planReminderDesc" id="description" defaultValue={planReminder.description}
                                          onChange={handlePlanReminderChange}
                                          placeholder="description" />
                                <div>
                                    <input type="submit" value="save" />
                                    <button onClick={cancelEditPlanReminder}>Cancel</button>
                                </div>
                            </form>

                        </> :
                        <>
                            &nbsp;
                            <button onClick={handleEditPlanReminder}>Edit Plan Reminder</button>
                        </>
                    }
                </div>
                <div className="ProfileSettingsSection">
                    { deleteAccountActive ?
                        <>
                            <button onClick={handleConfirmedDeletion}>Confirm Deletion</button>
                            <button onClick={handleDeleteAccount}>Cancel</button>
                        </>
                        :
                        <>
                            &nbsp;
                            <button onClick={handleDeleteAccount}>Delete Account</button>
                        </>
                    }
                </div>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>,
        // @ts-ignore
        document.body
    )
}

export default ProfileSettingsPortal