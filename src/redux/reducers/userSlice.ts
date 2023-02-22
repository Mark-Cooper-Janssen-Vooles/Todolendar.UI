import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    errorMessage: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleLoggedInState: (state) => {
            state.loggedIn = !state.loggedIn
        },
        tryLogin: (state, action ) => {
            // console.log(action.payload)
        }, // do nothing, picked up in middleware
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        }
    }
})

export const { toggleLoggedInState, tryLogin, setErrorMessage } = userSlice.actions

export default userSlice.reducer