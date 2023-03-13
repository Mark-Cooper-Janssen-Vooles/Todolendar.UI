import {IActiveScheduledTodo} from "../components/TodolendarHome/Calendar/ScheduledTodoPortal";
import dayjs from "dayjs";

export const fixLength = (str: string) => {
    if (str.length < 2 ) {
        return "0" + str
    }

    return str
}

export const fixStartMonth = (month: string, currentDay: string, startDay: string) => {
    if (startDay > currentDay) {
        const monthNum = parseInt(month) - 1 // decrement startMonth by 1
        return fixLength(monthNum.toString())
    }
    return month
}

export const fixEndMonth = (month: string, currentDay: string, endDay: string) => {
    if (currentDay > endDay) {
        const monthNum = parseInt(month) + 1 // increment endMonth by 1
        return fixLength(monthNum.toString())
    }

    return month
}

export const scheduledTodosDayFilter = (scheduledTodos: IActiveScheduledTodo[], day: number, action: any) => {
    return (
    scheduledTodos
        .filter(( scheduledTodo: IActiveScheduledTodo) => {
            // @ts-ignore*/
            const timezone = dayjs.tz.guess()
            // @ts-ignore*/ => converts ISO string in DB (GMT format) to current timezone
            const scheduledTodoLocalTz = dayjs(scheduledTodo.scheduledAt).utc('z').local().tz(timezone).local().format()

            // console.log(scheduledTodoLocalTz.local().format())
            //
            // console.log(scheduledTodoLocalTz)
            // console.log(scheduledTodo.scheduledAt)

            // const scheduledTodosDay =
            //     scheduledTodo.scheduledAt.split('T')[0].split('-')[2]
            const scheduledTodosDay =
                scheduledTodoLocalTz.split('T')[0].split('-')[2]

            let dayOfMonth = action.payload.daysOfMonth[day].toString() // i.e. day = 0 is sunday


            if (dayOfMonth.length < 2) {
                dayOfMonth = "0" + dayOfMonth
            }

            if (dayOfMonth == scheduledTodosDay) {
                return scheduledTodo
            }
        })
)}
