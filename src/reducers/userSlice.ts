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
        }
    }
})

export const { toggleLoggedInState } = userSlice.actions

export default userSlice.reducer