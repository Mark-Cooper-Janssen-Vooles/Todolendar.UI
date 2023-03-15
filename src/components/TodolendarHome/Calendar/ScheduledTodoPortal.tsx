import React, {useState} from 'react'
import * as ReactDOM from "react-dom";
import './ScheduledTodoPortal.css'
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {updateScheduledTodo} from "../../../redux/reducers/scheduledTodoSlice";
const objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

export enum IRecurFrequencyType {
    None = 0,
    Daily = 1,
    Weekly = 2,
    Monthly = 3,
    Yearly= 4,
}

export type IActiveScheduledTodo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    colour: string;
    active: boolean;
    recurCount: number;
    recurFrequencyType: IRecurFrequencyType;
    recurEndDate: string;
    notifyBeforeTime: number; // minutes?
    lastUpdatedAt: string;
    scheduledAt: string;
    triggeredAt: string;
}

type IUpdatedScheduledTodo = {
    id: string;
    title: string;
    description: string;
    colour: string;
    recurCount: number;
    recurFrequencyType: IRecurFrequencyType,
    recurEndDate: string;
    notifyBeforeTime: number;
    scheduledAt: string;
}

type IScheduledTodoPortal = {
    setScheduledTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeScheduledTodo: IActiveScheduledTodo
}

const ScheduledTodoPortal = ({ setScheduledTodoOpen, activeScheduledTodo }: IScheduledTodoPortal) => {
    const [editingTitleForm, setEditingTitleForm] = useState(false)
    const [title, setTitle] = useState(activeScheduledTodo.title)
    const [editingDescriptionForm, setEditingDescriptionForm] = useState(false)
    const [description, setDescription] = useState(activeScheduledTodo.description)
    const [editingNotifyTimeForm, setEditingNotifyTimeForm] = useState(false)
    const [notifyTime, setNotifyTime] = useState(activeScheduledTodo.notifyBeforeTime.toString())
    const [editingColourForm, setEditingColourForm] = useState(false)
    const [colour, setColour] = useState(activeScheduledTodo.colour)
    const [editingScheduledAtForm, setEditingScheduledAtForm] = useState(false)

    const [scheduledAt, setScheduledAt] = useState(activeScheduledTodo.scheduledAt)
    const [scheduledAtDate, setScheduledAtDate] = useState('')
    const [scheduledAtTime, setScheduledAtTime] = useState('')

    const dispatch = useDispatch()

    const getUpdatedScheduledTodoObject = () => {
        const updatedScheduledTodo: IUpdatedScheduledTodo = {
            id: activeScheduledTodo.id,
            title: title,
            description: description,
            colour: colour,
            recurCount: activeScheduledTodo.recurCount, // this isn't editable yet
            recurFrequencyType: activeScheduledTodo.recurFrequencyType, // this isn't editable yet
            recurEndDate: activeScheduledTodo.recurEndDate, // this isn't editable yet
            notifyBeforeTime: parseInt(notifyTime),
            scheduledAt: scheduledAt,
        }
        return updatedScheduledTodo
    }

    const handleEditTitle = () => setEditingTitleForm(true)
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string> } }) => setTitle(event.target.value)
    const cancelEditTitle = () => setEditingTitleForm(false)
    const handleSaveEditTitle = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        dispatch(updateScheduledTodo(getUpdatedScheduledTodoObject()))
        cancelEditTitle();
    }

    const handleEditDescription = () => setEditingDescriptionForm(true)
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string> } }) => setDescription(event.target.value)
    const cancelEditDescription = () => setEditingDescriptionForm(false)
    const handleSaveEditDescription = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        dispatch(updateScheduledTodo(getUpdatedScheduledTodoObject()))
        cancelEditDescription();
    }

    const handleEditNotifyTime = () => setEditingNotifyTimeForm(true)
    const handleEditNotifyTimeChange = (event: { target: { value: React.SetStateAction<string> } }) => setNotifyTime(event.target.value)
    const cancelEditNotifyTime = () => setEditingNotifyTimeForm(false)
    const handleSaveNotifyTime = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        dispatch(updateScheduledTodo(getUpdatedScheduledTodoObject()))
        cancelEditNotifyTime();
    }

    const handleEditColourForm = () => setEditingColourForm(true)
    const handleEditColourFormChange = (event: { target: { value: React.SetStateAction<string> } }) => setColour(event.target.value)
    const cancelEditColourForm = () => setEditingColourForm(false)
    const handleSaveColourForm = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        dispatch(updateScheduledTodo(getUpdatedScheduledTodoObject()))
        cancelEditColourForm();
    }

    const handleEditScheduledAtForm = () => setEditingScheduledAtForm(true)
    const handleEditScheduledAtFormChangeDate = (event: any) => {
        setScheduledAtDate(event.target.value)
        const scheduledAtDate = event.target.value;

        const year = scheduledAtDate.split('-')[0]
        const month = scheduledAtDate.split('-')[1]
        const day = scheduledAtDate.split('-')[2]
        let hour = '0'
        let minute = '0'

        let dayjsObj;

        if (scheduledAtTime) {
            hour = scheduledAtTime.split(':')[0]
            minute = scheduledAtTime.split(':')[1]
        }

        // @ts-ignore => Zero indexed month
        dayjsObj = dayjs({ year: parseInt(year), month: parseInt(month) - 1, day: parseInt(day),
            hour: parseInt(hour), minute: parseInt(minute), second: 0, millisecond: 0 })
        setScheduledAt(dayjsObj.toISOString())
    }

    const handleEditScheduledAtFormChangeTime = (event: any) => {
        setScheduledAtTime(event.target.value)
        const scheduledAtTime = event.target.value;

        const hour = scheduledAtTime.split(':')[0]
        const minute = scheduledAtTime.split(':')[1]
        let year = '0'
        let month = '0'
        let day = '0'

        let dayjsObj;

        if (scheduledAtDate) {
            year = scheduledAtDate.split('-')[0]
            month = scheduledAtDate.split('-')[1]
            day = scheduledAtDate.split('-')[2]
        }

        // @ts-ignore => Zero indexed month
        dayjsObj = dayjs({ year: parseInt(year), month: parseInt(month) - 1, day: parseInt(day),
            hour: parseInt(hour), minute: parseInt(minute), second: 0, millisecond: 0 })
        setScheduledAt(dayjsObj.toISOString())
    }

    const cancelEditScheduledAtForm = () => setEditingScheduledAtForm(false)
    const handleSaveScheduledAtForm = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        dispatch(updateScheduledTodo(getUpdatedScheduledTodoObject()))
        cancelEditScheduledAtForm();
    }

    return ReactDOM.createPortal(
        <div className="ScheduledTodoPortalContainer Border">
            <div className="CloseIcon" onClick={() => setScheduledTodoOpen(false)}>X</div>
            <div className="ScheduledTodoPortalSection">
                { editingTitleForm ?
                    <>
                        <form onSubmit={handleSaveEditTitle}>
                            <input type="text" name="title" onChange={handleTitleChange} placeholder={`Title: ${title}`}/>
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={cancelEditTitle}>Cancel</button>
                    </> :
                    <>
                        {title}
                        <button onClick={handleEditTitle}>Edit</button>
                    </>
                }
            </div>

            <div className="ScheduledTodoPortalSection">
                { editingDescriptionForm ?
                    <>
                        <form onSubmit={handleSaveEditDescription}>
                            <textarea name="description" onChange={handleDescriptionChange} placeholder={`Description: ${description}`}/>
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={cancelEditDescription}>Cancel</button>
                    </> :
                    <>
                        {description}
                        <button onClick={handleEditDescription}>Edit</button>
                    </>
                }
            </div>

            <div className="ScheduledTodoPortalSection">
                { editingNotifyTimeForm ?
                    <>
                        <form onSubmit={handleSaveNotifyTime}>
                            <label htmlFor="title">Notify Before Time (minutes):</label>
                            <input type="number" name="title" onChange={handleEditNotifyTimeChange} placeholder={`${notifyTime}`}/>
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={cancelEditNotifyTime}>Cancel</button>
                    </> :
                    <>
                        Notify Before Time: {notifyTime} minutes
                        <button onClick={handleEditNotifyTime}>Edit</button>
                    </>
                }
            </div>

            <div className="ScheduledTodoPortalSection">
                { editingColourForm ?
                    <>
                        <form onSubmit={handleSaveColourForm}>
                            <input type="color" name="title" onChange={handleEditColourFormChange} placeholder={`${colour}`}/>
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={cancelEditColourForm}>Cancel</button>
                    </> :
                    <>
                        Colour: {colour}
                        <button onClick={handleEditColourForm}>Edit</button>
                    </>
                }
            </div>

            <div className="ScheduledTodoPortalSection">
                { editingScheduledAtForm ?
                    <>
                        <form onSubmit={handleSaveScheduledAtForm}>
                            <input type="date" onChange={handleEditScheduledAtFormChangeDate}/>
                            <input type="time" onChange={handleEditScheduledAtFormChangeTime}/>
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={cancelEditScheduledAtForm}>Cancel</button>
                    </> :
                    <>
                        Scheduled at: {scheduledAt}
                        <button onClick={handleEditScheduledAtForm}>Edit</button>
                    </>
                }
            </div>
        </div>,
        // @ts-ignore
        document.body
    )
}

export default ScheduledTodoPortal
