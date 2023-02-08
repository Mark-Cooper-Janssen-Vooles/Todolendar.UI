import React, {useEffect, useState} from "react";

type ICalendarContainerContent = {
    hours: string[];
    currentHour: string;
}

const scheduledTodos = [{
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
    ScheduledAt: 'some date',
    TriggeredAt: 'some date'
}]

const CalendarContainerContent = ({ hours, currentHour }: ICalendarContainerContent) => {
    const [scheduledTodoOpen, setScheduledTodoOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const calendarContainer = document.getElementsByClassName("CalendarWeeklyColumnTimeContentItemCurrentHour")[0]
            calendarContainer.scrollIntoView()
        }, 1000)
    }, [])

    const handleScheduledTodoOpen = () => {
        setScheduledTodoOpen(true);
        // open a modal similar to settings
    }

    return (
       <div className="CalenderContainerContent">
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
                                <div className="CalendarWeeklyColumnContentItemEvent" onClick={handleScheduledTodoOpen}>Scheduled Todo</div>
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