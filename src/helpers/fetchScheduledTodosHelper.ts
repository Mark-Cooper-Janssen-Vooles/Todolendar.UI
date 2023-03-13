import {IActiveScheduledTodo} from "../components/TodolendarHome/Calendar/ScheduledTodoPortal";
import dayjs from "dayjs";
import {IDateRangeWeekly} from "../redux/reducers/scheduledTodoSlice";
import {computeDaysOfMonth} from "./computeDaysOfMonth";
import {days} from "../components/TodolendarHome/Calendar/Calendar";
import {dayjsFormat} from "../redux/reducers/dateSlice";

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

export const scheduledTodosDayFilter = (scheduledTodos: IActiveScheduledTodo[], day: number, dateRangeWeekly: IDateRangeWeekly) => {
    return (
    scheduledTodos
        .filter(( scheduledTodo: IActiveScheduledTodo) => {
            // @ts-ignore*/
            const timezone = dayjs.tz.guess()
            // @ts-ignore*/ => converts ISO string in DB (GMT format) to current timezone string
            const scheduledTodoLocalTz = dayjs(scheduledTodo.scheduledAt).utc('z').local().tz(timezone).local().format()
            const scheduledTodosDay =
                scheduledTodoLocalTz.split('T')[0].split('-')[2]

            let dayOfMonth = dateRangeWeekly.daysOfMonth[day].toString() // i.e. day = 0 is sunday

            if (dayOfMonth.length < 2) {
                dayOfMonth = "0" + dayOfMonth
            }

            if (dayOfMonth == scheduledTodosDay) {
                return scheduledTodo
            }
        })
)}

export const dateRangeWeeklyObject = (viewingTime: string) => {
    // fetch scheduled todos for THIS WEEK ONLY
    const dayjsTimeObject = dayjs(viewingTime, dayjsFormat)

    const daysOfMonth = computeDaysOfMonth(dayjsTimeObject, viewingTime)

    const yearMonthDay = dayjsTimeObject.toISOString().split('T')[0]
    const yearMonthDayArray = yearMonthDay.split('-')
    const currentDayString = yearMonthDayArray[2];

    const startDay = fixLength((daysOfMonth[0] - 1).toString()) // -1 to capture times for GMT difference
    const endDay = fixLength((daysOfMonth[6] + 1).toString()) // +1 to capture times got GMT difference

    const startMonth = fixStartMonth(yearMonthDayArray[1], currentDayString, startDay)
    const endMonth = fixEndMonth(yearMonthDayArray[1], currentDayString, endDay)

    // year and month stay the same, convert to ISO format
    const startDate = [ yearMonthDayArray[0], startMonth, startDay].join('-') + 'T00:00:00.000Z'
    const endDate = [ yearMonthDayArray[0], endMonth, endDay].join('-') + 'T00:00:00.000Z'

    console.log({
        startDate,
        endDate,
        currentDayString,
        daysOfMonth
    })

    return {
        startDate,
        endDate,
        currentDayString,
        daysOfMonth
    }
}
