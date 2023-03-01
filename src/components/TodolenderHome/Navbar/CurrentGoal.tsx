import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {saveUpdateUserInfo} from "../../../redux/reducers/userSlice";

const CurrentGoal = () => {
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
    )
}

export default CurrentGoal