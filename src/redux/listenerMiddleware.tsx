import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
    setLoggedInState,
    tryLogin,
    trySignup,
    setSignupSuccessful,
    setAlertMessage,
    setUserInfo,
    setPlanReminder,
    saveUpdatePlanReminder,
    saveUpdateUserInfo,
    tryGetUserAndPlanReminderInfo,
    deleteUser
} from './reducers/userSlice'
import axios from 'axios';
import { getCookie, deleteCookies } from "./helpers";
import {fetchTodos, setTodos} from "./reducers/todoSlice";

// Create the middleware instance and methods
export const listenerMiddleware = createListenerMiddleware()
const baseUrl = 'https://localhost:7025'

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.


// user listener middleware
listenerMiddleware.startListening({
    actionCreator: tryLogin,
    effect: async (action, listenerApi) => {
        // Async logic, POST to login endpoint
        try {
            const data = await axios.post(`${baseUrl}/Auth/login`, {
                email: action.payload.username,
                password: action.payload.password,
            })

            if (data.status === 200) {
                // set cookies
                // 1 Day = 24 Hrs = 24*60*60 = 86400.
                const expireTime = (new Date(Date.now()+ 86400*1000)).toUTCString(); //cookie expires in 1 day
                document.cookie = `Authorization=bearer ${data.data.createTokenAsync.result};expires=${expireTime};path=/`
                document.cookie = `UserId=${data.data.id};expires=${expireTime};path=/`

                listenerApi.dispatch(tryGetUserAndPlanReminderInfo())
            }
        } catch (e) {
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Login was unsuccessful. Try again'))
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: tryGetUserAndPlanReminderInfo,
    effect: async (action, listenerApi) => {
        // set "user" state
        try {
            const user = await axios(`${baseUrl}/Auth/user/${getCookie("UserId")}`, {
                method: 'GET',
                headers: {
                    'Authorization': getCookie("Authorization")
                }
            })

            listenerApi.dispatch(setUserInfo(user.data))
            listenerApi.dispatch(setLoggedInState(true))
        } catch (e) {
            console.log('error fetching user')
        }

        // set planReminder state
        try {
            const planReminder = await axios(`${baseUrl}/PlanReminder/${getCookie("UserId")}`, {
                method: 'GET',
                headers: {
                    'Authorization': getCookie("Authorization")
                }
            })

            listenerApi.dispatch(setPlanReminder(planReminder.data))
        } catch (e) {
            console.log('error fetching planReminder')
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: trySignup,
    effect: async (action, listenerApi) => {
        // Async logic, POST to login endpoint
        try {
            const data = await axios.post(`${baseUrl}/Auth/CreateUser`, {
                email: action.payload.username,
                passwordHash: action.payload.password,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                mobile: action.payload.mobile,
                currentGoal: ''
            })

            if (data.status === 201) {
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
            const data = await axios.put(
                `${baseUrl}/PlanReminder/${userId}`,
                {
                    "planReminderOn": action.payload.planReminderOn,
                    "frequency": action.payload.frequency,
                    "nextScheduledAt": action.payload.nextScheduledAt,
                    "description": action.payload.description
                },
                { headers: { 'Authorization': getCookie("Authorization") }
            })

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

listenerMiddleware.startListening({
    actionCreator: saveUpdateUserInfo,
    effect: async (action, listenerApi) => {
        // Async logic, PUT to planReminder endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        try {
            const data = await axios.put(
                `${baseUrl}/Auth/user/${userId}`,
                {
                    "email": action.payload.email,
                    "passwordHash": action.payload.passwordHash,
                    "firstName": action.payload.firstName,
                    "lastName": action.payload.lastName,
                    "mobile": action.payload.mobile,
                    "currentGoal": action.payload.currentGoal
                },
                { headers: { 'Authorization': getCookie("Authorization") }
                })

            if (data.status === 200) {
                listenerApi.dispatch(setUserInfo(data.data)) // keep redux store in sync
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Saving your user information was unsuccessful. Try again'))
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: deleteUser,
    effect: async (action, listenerApi) => {
        // Async logic, PUT to planReminder endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        try {
            const data = await axios.delete(`${baseUrl}/Auth/user/${userId}`,
                { headers: { 'Authorization': getCookie("Authorization") } })

            if (data.status === 200) {
                listenerApi.dispatch(setAlertMessage('Your account has been deleted'))
                // delete cookies
                deleteCookies()
                // log out
                setTimeout(() => {
                    listenerApi.dispatch(setLoggedInState(false))
                }, 1000)
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Deleting your account was unsuccessful. Try again'))
        }
    },
})


// todo listener middleware
listenerMiddleware.startListening({
    actionCreator: fetchTodos,
    effect: async (action, listenerApi) => {
        // Async logic, GET to /todo/{userId] endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        console.log('todo middleware')

        try {
            const todos = await axios.get(`${baseUrl}/Todo/${userId}`,
                { headers: { 'Authorization': getCookie("Authorization") } })

            if (todos.status === 200) {
                console.log(todos.data)
                listenerApi.dispatch(setTodos(todos.data))
            }
        } catch (e) {
            console.log('fetching todos was unsuccessful')
        }
    },
})

