import {IActiveScheduledTodo} from "./ScheduledTodoPortal";
import dayjs from "dayjs";
import {dayjsFormat} from "../../../redux/reducers/dateSlice";

export type IScheduledTodosDummyDataWeekly = {
    Sun: IActiveScheduledTodo[]
    Mon: IActiveScheduledTodo[]
    Tue: IActiveScheduledTodo[]
    Wed: IActiveScheduledTodo[]
    Thu: IActiveScheduledTodo[]
    Fri: IActiveScheduledTodo[]
    Sat: IActiveScheduledTodo[]
}

export const scheduledTodosDummyDataWeekly: IScheduledTodosDummyDataWeekly = {
    Sun: [

    ],
    Mon: [

    ],
    Tue: [

    ],
    Wed: [
        // {
        //     Id: '123',
        //     UserId: '1',
        //     Title: 'Scheduled Todo Example',
        //     Description: 'A description of the scheduled todo',
        //     Colour: 'red',
        //     Active: true,
        //     RecurCount: 0,
        //     RecurFrequency: 0,
        //     RecurFrequencyType: 'none',
        //     RecurendDate: 'some date',
        //     NotifyBeforeTime: 10, // minutes?
        //     CreatedAt: 'some date',
        //     UpdatedAt: 'some date',
        //     ScheduledAt: dayjs().subtract(0, 'hour').format(dayjsFormat), // not sure of exact time, but something like this!
        //     TriggeredAt: 'some date'
        // },
        // {
        //     Id: '12',
        //     UserId: '1',
        //     Title: 'Some todo',
        //     Description: 'A description of the scheduled todo',
        //     Colour: 'red',
        //     Active: true,
        //     RecurCount: 0,
        //     RecurFrequency: 0,
        //     RecurFrequencyType: 'none',
        //     RecurendDate: 'some date',
        //     NotifyBeforeTime: 10, // minutes?
        //     CreatedAt: 'some date',
        //     UpdatedAt: 'some date',
        //     ScheduledAt: dayjs().subtract(4, 'hour').format(dayjsFormat), // not sure of exact time, but something like this!
        //     TriggeredAt: 'some date'
        // },
        // {
        //     Id: '1',
        //     UserId: '1',
        //     Title: 'Scheduled Example 123',
        //     Description: 'A description of the scheduled todo',
        //     Colour: 'red',
        //     Active: true,
        //     RecurCount: 0,
        //     RecurFrequency: 0,
        //     RecurFrequencyType: 'none',
        //     RecurendDate: 'some date',
        //     NotifyBeforeTime: 10, // minutes?
        //     CreatedAt: 'some date',
        //     UpdatedAt: 'some date',
        //     ScheduledAt: dayjs().subtract(4, 'hour').add(10, 'minutes').format(dayjsFormat), // not sure of exact time, but something like this!
        //     TriggeredAt: 'some date'
        // }
    ],
    Thu: [
    //     {
    //         Id: '4',
    //         UserId: '1',
    //         Title: 'Scheduled Example Thurs',
    //         Description: 'A description of the scheduled todo',
    //         Colour: 'red',
    //         Active: true,
    //         RecurCount: 0,
    //         RecurFrequency: 0,
    //         RecurFrequencyType: 'none',
    //         RecurendDate: 'some date',
    //         NotifyBeforeTime: 10, // minutes?
    //         CreatedAt: 'some date',
    //         UpdatedAt: 'some date',
    //         ScheduledAt: dayjs().add(1, 'day').format(dayjsFormat), // not sure of exact time, but something like this!
    //         TriggeredAt: 'some date'
    //     }
    ],
    Fri: [

    ],
    Sat: [

    ]
}