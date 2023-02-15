import React, {useEffect, useState} from "react";
import ScheduledTodoPortal from "./ScheduledTodoPortal";
import { IActiveScheduledTodo } from "./ScheduledTodoPortal";

type ICalendarContainerContent = {
    hours: string[];
    currentHour: string;
}

const scheduledTodosDummyData: IActiveScheduledTodo[] = [{
    Id: '123',
    UserId: '1',
    Title: 'Scheduled Todo Example',
    Description: 'A description of the scheduled todo',
    Colour: 'red',
    Active: true,
    RecurCount: 0,
    RecurFrequency: 0,
    RecurFrequencyType: 'none',
    RecurendDate: 'some date',
    NotifyBeforeTime: 10, // minutes?
    CreatedAt: 'some date',
    UpdatedAt: 'some date',
    ScheduledAt: '15-02-2023 3:4:15 PM', // not sure of exact time, but something like this!
    TriggeredAt: 'some date'
},
{
    Id: '123',
    UserId: '1',
    Title: 'Later Example',
    Description: 'A description of the scheduled todo',
    Colour: 'red',
    Active: true,
    RecurCount: 0,
    RecurFrequency: 0,
    RecurFrequencyType: 'none',
    RecurendDate: 'some date',
    NotifyBeforeTime: 10, // minutes?
    CreatedAt: 'some date',
    UpdatedAt: 'some date',
    ScheduledAt: '15-02-2023 3:5:15 PM', // not sure of exact time, but something like this!
    TriggeredAt: 'some date'
},
{
    Id: '123',
    UserId: '1',
    Title: 'Later Example',
    Description: 'A description of the scheduled todo',
    Colour: 'red',
    Active: true,
    RecurCount: 0,
    RecurFrequency: 0,
    RecurFrequencyType: 'none',
    RecurendDate: 'some date',
    NotifyBeforeTime: 10, // minutes?
    CreatedAt: 'some date',
    UpdatedAt: 'some date',
    ScheduledAt: '15-02-2023 3:6:15 PM', // not sure of exact time, but something like this!
    TriggeredAt: 'some date'
}]

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
    const [scheduledTodos, setScheduledTodos] = useState<IActiveScheduledTodo[]>([])

    useEffect(() => {
        // Scroll current hour into view
        setTimeout(() => {
            const calendarContainer = document.getElementsByClassName("CalendarWeeklyColumnTimeContentItemCurrentHour")[0]
            calendarContainer.scrollIntoView()
        }, 1000)

        // fetch scheduled todos for this week
        setScheduledTodos(scheduledTodosDummyData);
    }, [])

    const handleScheduledTodoOpen = () => {
        setScheduledTodoOpen(true);
        setActiveScheduledTodo(scheduledTodos[0]) // need to work this out better somehow
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
                    if (currentHour === hour ) {
                        return (
                            <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`wed-${hour}`} key={id}>
                                <div className="CalendarWeeklyColumnContentItemEvent" onClick={handleScheduledTodoOpen}>{scheduledTodos[0]?.Title}</div>
                            </div>
                        )
                    }
                    return <div className="CalendarWeeklyColumnContentItem" id={`wed-${hour}`} key={id}></div>
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