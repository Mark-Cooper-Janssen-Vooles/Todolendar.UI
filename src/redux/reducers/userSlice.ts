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
        toggleLoggedInState: (state) => {
            state.loggedIn = !state.loggedIn
        },
        tryLogin: (state, action ) => {}, // do nothing, picked up in middleware
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        setPlanReminder: (state, action) => {
            state.planReminder = action.payload
        },
        trySignup: (state, action) => {}, // picked up in middleware
        setSignupSuccessful: (state) => {
            state.signupSuccessful = true
        },
        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload
        }
    }
})

export const { toggleLoggedInState, tryLogin, setUserInfo, trySignup, setSignupSuccessful, setAlertMessage } = userSlice.actions

export default userSlice.reducer