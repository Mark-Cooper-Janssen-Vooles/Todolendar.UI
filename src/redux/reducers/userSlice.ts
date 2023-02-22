import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    alertMessage: '',
    signupSuccessful: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleLoggedInState: (state) => {
            state.loggedIn = !state.loggedIn
        },
        tryLogin: (state, action ) => {}, // do nothing, picked up in middleware
        trySignup: (state, action) => {}, // picked up in middleware
        setSignupSuccessful: (state) => {
            state.signupSuccessful = true
        },
        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload
        }
    }
})

export const { toggleLoggedInState, tryLogin, trySignup, setSignupSuccessful, setAlertMessage } = userSlice.actions

export default userSlice.reducer