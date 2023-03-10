import React, {useEffect, useState} from "react";
import ScheduledTodoPortal from "./ScheduledTodoPortal";
import { IActiveScheduledTodo } from "./ScheduledTodoPortal";
import {IScheduledTodosDummyDataWeekly, scheduledTodosDummyDataWeekly} from './dummyScheduledEvents'
import WeeklyViewDayColumn from "./Weekly/WeeklyViewDayColumn";
import {useDispatch} from "react-redux";
import {fetchScheduledTodos} from "../../../redux/reducers/scheduledTodoSlice";

type ICalendarContainerContent = {
    hours: string[];
    currentHour: string;
    currentDay: string;
}

const CalendarContainerContent = ({ hours, currentHour, currentDay }: ICalendarContainerContent) => {
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
    const dispatch = useDispatch()

    useEffect(() => {
        // Scroll current hour into view
        setTimeout(() => {
            const calendarContainer = document.getElementsByClassName("CalendarWeeklyColumnTimeContentItemCurrentHour")[0]
            calendarContainer.scrollIntoView()
        }, 1000)

        // fetch scheduled todos for THIS WEEK ONLY
        // API call here
        dispatch(fetchScheduledTodos())
        // setScheduledTodos(scheduledTodosDummyDataWeekly);
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
