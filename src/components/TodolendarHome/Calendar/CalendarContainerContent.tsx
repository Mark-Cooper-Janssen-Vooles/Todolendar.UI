import React, {useEffect, useState} from "react";
import ScheduledTodoPortal from "./ScheduledTodoPortal";
import { IActiveScheduledTodo } from "./ScheduledTodoPortal";
import {IScheduledTodosDummyDataWeekly, scheduledTodosDummyDataWeekly} from './dummyScheduledEvents'
import WeeklyViewDayColumn from "./Weekly/WeeklyViewDayColumn";
import {useDispatch, useSelector} from "react-redux";
import {fetchScheduledTodos, IScheduledTodosDataWeekly} from "../../../redux/reducers/scheduledTodoSlice";
import {RootState} from "../../../redux/store";
import {Dayjs} from "dayjs";
import {computeDaysOfMonth} from "../../../helpers/computeDaysOfMonth";
import {fixEndMonth, fixLength, fixStartMonth} from "../../../helpers/fetchScheduledTodosHelper";

type ICalendarContainerContent = {
    hours: string[];
    currentHour: string;
    currentDay: Dayjs;
}

const CalendarContainerContent = ({ hours, currentHour, currentDay }: ICalendarContainerContent) => {
    const [scheduledTodoOpen, setScheduledTodoOpen] = useState(false)
    const [activeScheduledTodo, setActiveScheduledTodo] = useState<IActiveScheduledTodo>({
        id: '',
        userId: '',
        title: '',
        description: '',
        colour: '',
        active: false,
        recurCount: 0,
        recurFrequencyType: 0,
        recurEndDate: '',
        notifyBeforeTime: 0,
        lastUpdatedAt: '',
        scheduledAt: '',
        triggeredAt: ''
    })
    const [scheduledTodos, setScheduledTodos] = useState<IScheduledTodosDataWeekly>({
        Fri: [],
        Mon: [],
        Sat: [],
        Sun: [],
        Thu: [],
        Tue: [],
        Wed: []
    })
    const scheduledTodosRedux = useSelector((state: RootState) => state.scheduledTodo.scheduledTodosWeekly)
    const viewingTime = useSelector((state: RootState) => state.date.viewingTime)
    const dispatch = useDispatch()

    useEffect(() => {
        // Scroll current hour into view
        setTimeout(() => {
            const calendarContainer = document.getElementsByClassName("CalendarWeeklyColumnTimeContentItemCurrentHour")[0]
            calendarContainer.scrollIntoView()
        }, 1000)

        // fetch scheduled todos for THIS WEEK ONLY
        const daysOfMonth = computeDaysOfMonth(currentDay, viewingTime)

        const yearMonthDay = currentDay.toISOString().split('T')[0]
        const yearMonthDayArray = yearMonthDay.split('-')
        const currentDayString = yearMonthDayArray[2];

        const startDay = fixLength(daysOfMonth[0].toString())
        const endDay = fixLength(daysOfMonth[6].toString())

        const startMonth = fixStartMonth(yearMonthDayArray[1], currentDayString, startDay)
        const endMonth = fixEndMonth(yearMonthDayArray[1], currentDayString, endDay)

        // year and month stay the same, convert to ISO format
        const startDate = [ yearMonthDayArray[0], startMonth, startDay].join('-') + 'T00:00:00.000Z'
        const endDate = [ yearMonthDayArray[0], endMonth, endDay].join('-') + 'T00:00:00.000Z'

        dispatch(fetchScheduledTodos({
            startDate,
            endDate,
            currentDayString,
            daysOfMonth
        })) // pass in dates!
    }, [])

    const handleScheduledTodoOpen = (scheduledTodo: IActiveScheduledTodo) => {
        setScheduledTodoOpen(true);
        setActiveScheduledTodo(scheduledTodo)
    }

    return (
       <div className="CalenderContainerContent">
           { scheduledTodoOpen && <ScheduledTodoPortal setScheduledTodoOpen={setScheduledTodoOpen} activeScheduledTodo={activeScheduledTodo} />}
            <div className="CalendarWeeklyColumnTimeContent">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" key={id}>{hour}</div>
                    }
                    return <div className="CalendarWeeklyColumnTimeContentItem" key={id}>{hour}</div>
                })}
            </div>

           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Sun} day="Sun" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Mon} day="Mon" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Tue} day="Tue" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Wed} day="Wed" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Thu} day="Thu" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Fri} day="Fri" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodos.Sat} day="Sat" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
        </div>
    )
}

export default CalendarContainerContent
