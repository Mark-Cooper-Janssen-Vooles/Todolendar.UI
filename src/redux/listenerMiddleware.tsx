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
import {createTodo, deleteTodo, fetchTodos, saveEditedTodo, setTodos} from "./reducers/todoSlice";
import {
    createScheduledTodo,
    fetchScheduledTodos,
    IScheduledTodosDataWeekly,
    setScheduledTodos, updateScheduledTodo
} from "./reducers/scheduledTodoSlice";
import {IActiveScheduledTodo} from "../components/TodolendarHome/Calendar/ScheduledTodoPortal";
import {scheduledTodosDayFilter} from "../helpers/fetchScheduledTodosHelper";

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

        try {
            const todos = await axios.get(`${baseUrl}/Todo/${userId}`,
                { headers: { 'Authorization': getCookie("Authorization") } })

            if (todos.status === 200) {
                listenerApi.dispatch(setTodos(todos.data))
            }
        } catch (e) {
            console.log('fetching todos was unsuccessful')
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: createTodo,
    effect: async (action, listenerApi) => {
        // Async logic, GET to /todo/{userId] endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        try {
            const data = await axios.post(
                `${baseUrl}/Todo/${userId}`,
                {
                    userId: userId,
                    title: action.payload.title,
                    description: action.payload.description,
                },
                { headers: { 'Authorization': getCookie("Authorization") }
                })

            if (data.status === 201) {
                // re-fetch todos
                listenerApi.dispatch(fetchTodos())
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Create todo was unsuccessful. Try again'))
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: deleteTodo,
    effect: async (action, listenerApi) => {
        // Async logic, GET to /todo/{userId] endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        try {
            const data = await axios.delete(`${baseUrl}/Todo/${userId}/${action.payload.id}`,
                { headers: { 'Authorization': getCookie("Authorization") } })

            if (data.status === 200) {
                // re-fetch todos
                listenerApi.dispatch(fetchTodos())
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Deleting your todo was unsuccessful. Try again'))
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: saveEditedTodo,
    effect: async (action, listenerApi) => {
        // Async logic, GET to /todo/{userId] endpoint
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        try {
            const data = await axios.put(
                `${baseUrl}/Todo/${userId}/${action.payload.id}`,
                {
                    "title": action.payload.title,
                    "description": action.payload.description
                },
                { headers: { 'Authorization': getCookie("Authorization") }
                })

            if (data.status === 200) {
                listenerApi.dispatch(fetchTodos())
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Editing your todo was unsuccessful. Try again'))
        }
    },
})

// scheduledTodo middleware
listenerMiddleware.startListening({
    actionCreator: createScheduledTodo,
    effect: async (action, listenerApi) => {
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;
        // @ts-ignore
        const scheduledTodosWeekly: IScheduledTodosDataWeekly = listenerApi.getState().scheduledTodo.scheduledTodosWeekly;


        try {
            const data = await axios.post(
                `${baseUrl}/ScheduledTodo/${userId}`,
                {
                    title: action.payload.title,
                    description: action.payload.description,
                    colour: 'gray',
                    recurCount: 0,
                    recurFrequencyType: 'none',
                    recurEndDate: action.payload.scheduledAt,
                    notifyBeforeTime: 10,
                    scheduledAt: action.payload.scheduledAt
                },
                { headers: { 'Authorization': getCookie("Authorization") }
                })

            if (data.status === 201) {
                // delete todo
                listenerApi.dispatch(deleteTodo({id: action.payload.id}))
                // re-fetch todos
                listenerApi.dispatch(fetchTodos())
                listenerApi.dispatch(fetchScheduledTodos())
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Adding todo was unsuccessful. Try again'))
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: fetchScheduledTodos,
    effect: async (action, listenerApi) => {
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;
        // @ts-ignore
        const dateRangeWeekly = listenerApi.getState().scheduledTodo.dateRangeWeekly

        try {
            const scheduledTodos = await axios(`${baseUrl}/ScheduledTodo/get/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': getCookie("Authorization"),
                },
                data: { // need to update this, get it from where its called
                    startDate: dateRangeWeekly.startDate,
                    endDate: dateRangeWeekly.endDate
                }
            })

            if (scheduledTodos.status === 200) {
                const scheduledTodosWeekly = {
                    Sun: scheduledTodosDayFilter(scheduledTodos.data, 0, dateRangeWeekly),
                    Mon: scheduledTodosDayFilter(scheduledTodos.data, 1, dateRangeWeekly),
                    Tue: scheduledTodosDayFilter(scheduledTodos.data, 2, dateRangeWeekly),
                    Wed: scheduledTodosDayFilter(scheduledTodos.data, 3, dateRangeWeekly),
                    Thu: scheduledTodosDayFilter(scheduledTodos.data, 4, dateRangeWeekly),
                    Fri: scheduledTodosDayFilter(scheduledTodos.data, 5, dateRangeWeekly),
                    Sat: scheduledTodosDayFilter(scheduledTodos.data, 6, dateRangeWeekly)
                }

                listenerApi.dispatch(setScheduledTodos(scheduledTodosWeekly))
            }
        } catch (e) {
            console.log(e)
            console.log('fetching weekly scheduled todos was unsuccessful')
        }
    },
})

listenerMiddleware.startListening({
    actionCreator: updateScheduledTodo,
    effect: async (action, listenerApi) => {
        // @ts-ignore
        const userId = listenerApi.getState().user.user.id;

        console.log(action.payload.scheduledAt)

        try {
            const data = await axios.put(
                `${baseUrl}/ScheduledTodo/${userId}/`,
                {
                    id: action.payload.id,
                    userId: userId,
                    title: action.payload.title,
                    description: action.payload.description,
                    colour: action.payload.colour,
                    recurCount: action.payload.recurCount,
                    recurFrequencyType: action.payload.recurFrequencyType,
                    recurEndDate: action.payload.recurEndDate,
                    notifyBeforeTime: action.payload.notifyBeforeTime,
                    scheduledAt: action.payload.scheduledAt,
                },
                { headers: { 'Authorization': getCookie("Authorization") }
                })

            if (data.status === 200) {
                listenerApi.dispatch(fetchScheduledTodos())
            }
        } catch (e) {
            console.log(e)
            // set error message to user, toggle a window.Alert in the component
            listenerApi.dispatch(setAlertMessage('Editing your todo was unsuccessful. Try again'))
        }
    },
})
