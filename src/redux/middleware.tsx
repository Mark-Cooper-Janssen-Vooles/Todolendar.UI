import { createListenerMiddleware } from '@reduxjs/toolkit'
import {toggleLoggedInState, tryLogin, setErrorMessage } from './reducers/userSlice'
import axios from 'axios';

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
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
            listenerApi.dispatch(setErrorMessage('Login was unsuccessful. Try again'))
        }
    },
})