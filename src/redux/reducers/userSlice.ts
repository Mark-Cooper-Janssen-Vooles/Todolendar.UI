import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    alertMessage: '',
    signupSuccessful: false,
    user: {
        id: '',
        email: '',
        passwordHash: '',
        firstName: '',
        lastName: '',
        mobile: '',
        currentGoal: '',
        lastActive: ''
    },
    planReminder: {
        userId: '',
        planReminderOn: false,
        frequency: '',
        nextScheduledAt: '',
        description: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedInState: (state, action) => {
            state.loggedIn = action.payload
        },
        tryLogin: (state, action ) => {}, // do nothing, picked up in middleware
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        tryGetUserAndPlanReminderInfo: (state) => {}, // picked up in middleware
        trySignup: (state, action) => {}, // picked up in middleware
        setSignupSuccessful: (state) => {
            state.signupSuccessful = true
        },
        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload
        },
        setPlanReminder: (state, action) => {
            state.planReminder = action.payload
        },
        saveUpdatePlanReminder: (state, action) => {}, // picked up in middleware
        saveUpdateUserInfo: (state, action) => {}, // picked up in middleware
        deleteUser: (state) => {}, // picked up in middleware
    }
})

export const {
    setLoggedInState,
    tryLogin,
    setUserInfo,
    trySignup,
    setSignupSuccessful,
    setAlertMessage,
    setPlanReminder,
    saveUpdatePlanReminder,
    saveUpdateUserInfo,
    tryGetUserAndPlanReminderInfo,
    deleteUser,
} = userSlice.actions

export default userSlice.reducer