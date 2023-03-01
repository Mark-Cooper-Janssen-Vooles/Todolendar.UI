import React, {useEffect, useState} from 'react'
import './Navbar.css'
import MonthNavigation from "./MonthNavigation";
import ViewDropdown from "./ViewDropdown";
import ProfileSettings from "./ProfileSettings";
import '../../../App.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {saveUpdateUserInfo} from "../../../redux/reducers/userSlice";

const Navbar = () => {
    const userState = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const [editingGoal, setEditingGoal] = useState(false)
    const [goal, setGoal] = useState(userState.currentGoal)

    useEffect(() => {
        // set all state to match redux when it updates
        setGoal(userState.currentGoal)
    }, [userState])

    const handleEditGoal = () => setEditingGoal(true)
    const handleGoalChange = (event: { target: { value: React.SetStateAction<string> } }) => setGoal(event.target.value)
    const cancelEditGoal = () => setEditingGoal(false)
    const handleSaveGoal = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        console.log(goal)
        // api call to save and update goal
        dispatch(saveUpdateUserInfo({
            email: userState.email,
            passwordHash: userState.passwordHash,
            firstName: userState.firstName,
            lastName: userState.lastName,
            mobile: userState.mobile,
            currentGoal: goal
        }))
        cancelEditGoal()
    }

    return (
        <div className="Navbar Border">
            <div className="LeftMargin">
                { editingGoal ?
                    <>
                        <form onSubmit={handleSaveGoal}>
                            <input type="text" name="goal" onChange={handleGoalChange} placeholder={goal}/>
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={cancelEditGoal}>Cancel</button>
                    </>
                    :
                    <>
                        Current Goal: {goal} &nbsp;
                        <button onClick={handleEditGoal}>🖊</button>
                    </>
                }
            </div>
            <div className="NavbarRight">
                <MonthNavigation />
                <ViewDropdown />
                <ProfileSettings />
            </div>
        </div>
    )
}

export default Navbar