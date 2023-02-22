import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
    toggleLoggedInState,
    tryLogin,
    trySignup,
    setSignupSuccessful,
    setAlertMessage,
    setUserInfo
} from './reducers/userSlice'
import axios from 'axios';

function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
                password: action.payload.password,
            })

            if (data.status == 200) {
                console.log('logged in')
                // toggleLoggedIn state
                listenerApi.dispatch(toggleLoggedInState())
                // set the token
                document.cookie = `Authorization=bearer ${data.data.createTokenAsync.result}`

                try {
                    const user = await axios(`https://localhost:7025/Auth/user/${data.data.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': getCookie("Authorization")
                        }
                    })

                    listenerApi.dispatch(setUserInfo(user.data))
                } catch (e) {
                    console.log('error fetching user')
                }
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