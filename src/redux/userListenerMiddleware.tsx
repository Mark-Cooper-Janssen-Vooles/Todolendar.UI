import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
    toggleLoggedInState,
    tryLogin,
    trySignup,
    setSignupSuccessful,
    setAlertMessage,
    setUserInfo,
    setPlanReminder,
    saveUpdatePlanReminder
} from './reducers/userSlice'
import axios from 'axios';
import { getCookie } from "./getCookie";

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
                password: action.payload.password,
            })

            if (data.status == 200) {
                console.log('logged in')
                // toggleLoggedIn state + set the token
                listenerApi.dispatch(toggleLoggedInState())
                document.cookie = `Authorization=bearer ${data.data.createTokenAsync.result}`

                // set "user" state
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

                // set planReminder state
                try {
                    const planReminder = await axios(`https://localhost:7025/PlanReminder/${data.data.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': getCookie("Authorization")
                        }
                    })

                    listenerApi.dispatch(setPlanReminder(planReminder.data))
                } catch (e) {
                    console.log('error fetching planReminder')
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

listenerMiddleware.startListening({
    actionCreator: saveUpdatePlanReminder,
    effect: async (action, listenerApi) => {
        // Async logic, PUT to planReminder endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        try {
            const data = await axios.put(`https://localhost:7025/PlanReminder/${userId}`, {
                "planReminderOn": action.payload.planReminderOn,
                "frequency": action.payload.frequency,
                "nextScheduledAt": action.payload.nextScheduledAt,
                "description": action.payload.description
            }, {
                headers: {
                    'Authorization': getCookie("Authorization")
                }
            })

            console.log(data.status)
            if (data.status === 200) {
                listenerApi.dispatch(setPlanReminder(action.payload)) // keep redux store in sync
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Saving your plan reminder updates were unsuccessful. Try again'))
        }
    },
})