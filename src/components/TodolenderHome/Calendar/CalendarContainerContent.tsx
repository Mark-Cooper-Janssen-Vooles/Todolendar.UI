import React, {useEffect, useState} from "react";
import ScheduledTodoPortal from "./ScheduledTodoPortal";
import { IActiveScheduledTodo } from "./ScheduledTodoPortal";
import dayjs from "dayjs";
import {dayjsFormat} from "../../../reducers/dateSlice";
import { days } from "./Calendar"
import {IScheduledTodosDummyDataWeekly, scheduledTodosDummyDataWeekly} from './dummyScheduledEvents'

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

        // scheduledTodos.Wed.find

        // scheduledTodos.find(scheduledTodo => {
        //     console.log(scheduledTodo.ScheduledAt)
        //     const dayjsTimeObject = dayjs(scheduledTodo.ScheduledAt, dayjsFormat)
        //
        //     const day = days[dayjsTimeObject.day()]
        //     console.log(day);
        //
        //     const hour = dayjsTimeObject.hour()
        //     console.log(hour)
        //
        //     // const min = dayjsTimeObject.minute()
        //     // // console.log(min)
        //     //
        //
        //
        // })
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
            <div className="CalendarWeeklyColumn" id="sun-content">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`sun-${hour}`} key={id}></div>
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`sun-${hour}`} key={id}></div>
                })}
            </div>
            <div className="CalendarWeeklyColumn" id="mon-content">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`mon-${hour}`} key={id}></div>
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`mon-${hour}`} key={id}></div>
                })}
            </div>
            <div className="CalendarWeeklyColumn" id="tue-content">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`tue-${hour}`} key={id}></div>
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`tue-${hour}`} key={id}></div>
                })}
            </div>

            <div className="CalendarWeeklyColumn" id="wed-content">
                {hours.map((hour, id) => {
                    // if hour == a scheduledEvent from wed && currentHour == hour, make block highlighted with "CurrentHour" class
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`tue-${hour}`} key={id}>
                            {
                                scheduledTodos.Wed.map(scheduledTodo => {
                                    const scheduledTodoHour = dayjs(scheduledTodo.ScheduledAt, dayjsFormat).hour()
                                    const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
                                    if (scheduledTodoHourFormatted == hour) {
                                        return <div className="CalendarWeeklyColumnContentItemEvent">{scheduledTodo.Title}</div>
                                    }
                                })
                            }
                        </div>
                    }
                    // if hour == a scheduledEvent from wed, generate div for that to put it in.
                    return <div className="CalendarWeeklyColumnContentItem" id={`tue-${hour}`} key={id}>
                        {
                            scheduledTodos.Wed.map(scheduledTodo => {
                                const scheduledTodoHour = dayjs(scheduledTodo.ScheduledAt, dayjsFormat).hour()
                                const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
                                if (scheduledTodoHourFormatted == hour) {
                                    return <div className="CalendarWeeklyColumnContentItemEvent">{scheduledTodo.Title}</div>
                                }
                            })
                        }
                    </div>
                })}
            </div>

            <div className="CalendarWeeklyColumn" id="thu-content">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`thu-${hour}`} key={id}></div>
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`thu-${hour}`} key={id}></div>
                })}
            </div>
            <div className="CalendarWeeklyColumn" id="fri-content">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`fri-${hour}`} key={id}></div>
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`fri-${hour}`} key={id}></div>
                })}
            </div>
            <div className="CalendarWeeklyColumn" id="sat-content">
                {hours.map((hour, id) => {
                    if (currentHour === hour ) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`sat-${hour}`} key={id}></div>
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`sat-${hour}`} key={id}></div>
                })}
            </div>
        </div>
    )
}

export default CalendarContainerContent