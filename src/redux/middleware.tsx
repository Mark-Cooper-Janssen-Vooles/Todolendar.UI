import { createListenerMiddleware } from '@reduxjs/toolkit'
import {toggleLoggedInState, tryLogin, trySignup, setSignupSuccessful, setAlertMessage } from './reducers/userSlice'
import axios from 'axios';

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.

// user middleware:
listenerMiddleware.startListening({
    actionCreator: tryLogin,
    effect: async (action, listenerApi) => {
        // Async logic, POST to login endpoint
        try {
            const data = await axios.post('https://localhost:7025/Auth/login', {
                email: action.payload.username,
                password: action.payload.password
            })

            if (data.status == 200) {
                // toggleLoggedIn state
                listenerApi.dispatch(toggleLoggedInState())
                console.log('logged in')
                // set the token somehow
                document.cookie = `Authorization=bearer ${data.data.result}`
            }
        } catch (e) {
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Login was unsuccessful. Try again'))
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: trySignup,
    effect: async (action, listenerApi) => {
        // Async logic, POST to login endpoint
        try {
            const data = await axios.post('https://localhost:7025/Auth/CreateUser', {
                email: action.payload.username,
                passwordHash: action.payload.password,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                mobile: action.payload.mobile,
                currentGoal: ''
            })

            if (data.status == 201) {
                console.log(data)
                console.log('Sign up successful')
                listenerApi.dispatch(setAlertMessage('Sign up was successful. You may now log in.'))
                listenerApi.dispatch(setSignupSuccessful())
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Signup was unsuccessful. Try again'))
        }
    },
})