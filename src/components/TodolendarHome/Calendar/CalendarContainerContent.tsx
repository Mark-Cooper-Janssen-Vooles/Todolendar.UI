import React, {useEffect, useState} from "react";
import ScheduledTodoPortal from "./ScheduledTodoPortal";
import { IActiveScheduledTodo } from "./ScheduledTodoPortal";
import {IScheduledTodosDummyDataWeekly, scheduledTodosDummyDataWeekly} from './dummyScheduledEvents'
import WeeklyViewDayColumn from "./Weekly/WeeklyViewDayColumn";
import {useDispatch, useSelector} from "react-redux";
import {
    dateRangeWeekly,
    fetchScheduledTodos,
} from "../../../redux/reducers/scheduledTodoSlice";
import {RootState} from "../../../redux/store";
import {Dayjs} from "dayjs";
import {computeDaysOfMonth} from "../../../helpers/computeDaysOfMonth";
import {dateRangeWeeklyObject, fixEndMonth, fixLength, fixStartMonth} from "../../../helpers/fetchScheduledTodosHelper";

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
    // const [scheduledTodos, setScheduledTodos] = useState<IScheduledTodosDataWeekly>({
    //     Fri: [],
    //     Mon: [],
    //     Sat: [],
    //     Sun: [],
    //     Thu: [],
    //     Tue: [],
    //     Wed: []
    // })
    const scheduledTodosRedux = useSelector((state: RootState) => state.scheduledTodo.scheduledTodosWeekly)
    const viewingTime = useSelector((state: RootState) => state.date.viewingTime)
    const dispatch = useDispatch()

    useEffect(() => {
        // Scroll current hour into view
        setTimeout(() => {
            const calendarContainer = document.getElementsByClassName("CalendarWeeklyColumnTimeContentItemCurrentHour")[0]
            calendarContainer.scrollIntoView()
        }, 1000)

        dispatch(dateRangeWeekly(dateRangeWeeklyObject(viewingTime)))
        dispatch(fetchScheduledTodos())
    }, [])

    // not about below: might need scheduledTodos / setScheduledTodos as well as redux state for when editing!?

    // useEffect(() => {
    //     setScheduledTodos(scheduledTodosRedux)
    //     console.log(scheduledTodos.Mon)
    //
    //     console.log(scheduledTodosRedux.Mon)
    // }, [scheduledTodos])

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

           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Sun} day="Sun" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Mon} day="Mon" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Tue} day="Tue" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Wed} day="Wed" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Thu} day="Thu" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Fri} day="Fri" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
           <WeeklyViewDayColumn hours={hours} currentHour={currentHour} daysTodos={scheduledTodosRedux.Sat} day="Sat" handleScheduledTodoOpen={handleScheduledTodoOpen}/>
        </div>
    )
}

export default CalendarContainerContent
