import React, {useEffect, useState} from "react";
import ScheduledTodoPortal from "./ScheduledTodoPortal";
import { IActiveScheduledTodo } from "./ScheduledTodoPortal";
import dayjs from "dayjs";
import {dayjsFormat} from "../../../reducers/dateSlice";
import { days } from "./Calendar"
import {IScheduledTodosDummyDataWeekly, scheduledTodosDummyDataWeekly} from './dummyScheduledEvents'
import WeeklyViewDayColumn from "./Weekly/WeeklyViewDayColumn";

type ICalendarContainerContent = {
    hours: string[];
    currentHour: string;
}

const CalendarContainerContent = ({ hours, currentHour }: ICalendarContainerContent) => {
    const [scheduledTodoOpen, setScheduledTodoOpen] = useState(false)
    const [activeScheduledTodo, setActiveScheduledTodo] = useState<IActiveScheduledTodo>({
        Id: '',
        UserId: '',
        Title: '',
        Description: '',
        Colour: '',
        Active: false,
        RecurCount: 0,
        RecurFrequency: 0,
        RecurFrequencyType: '',
        RecurendDate: '',
        NotifyBeforeTime: 0, // minutes?
        CreatedAt: '',
        UpdatedAt: '',
        ScheduledAt: '',
        TriggeredAt: ''
    })
    const [scheduledTodos, setScheduledTodos] = useState<IScheduledTodosDummyDataWeekly>({
        Fri: [],
        Mon: [],
        Sat: [],
        Sun: [],
        Thu: [],
        Tue: [],
        Wed: []
    })

    useEffect(() => {
        // Scroll current hour into view
        setTimeout(() => {
            const calendarContainer = document.getElementsByClassName("CalendarWeeklyColumnTimeContentItemCurrentHour")[0]
            calendarContainer.scrollIntoView()
        }, 1000)

        // fetch scheduled todos for THIS WEEK ONLY
        setScheduledTodos(scheduledTodosDummyDataWeekly);
    }, [])

    const handleScheduledTodoOpen = () => {
        setScheduledTodoOpen(true);
        setActiveScheduledTodo(scheduledTodosDummyDataWeekly.Wed[0]) // need to work this out better somehow
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

           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Sun} day="Sun"/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Mon} day="Mon"/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Tue} day="Tue"/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Wed} day="Wed"/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Thu} day="Thu"/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Fri} day="Fri"/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysScheduledTodos={scheduledTodos.Sat} day="Sat"/>
        </div>
    )
}

export default CalendarContainerContent