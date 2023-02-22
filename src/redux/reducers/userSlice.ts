import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false
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
    }
})

export const { toggleLoggedInState, tryLogin } = userSlice.actions

export default userSlice.reducer