import React, {useState} from 'react'
import * as ReactDOM from "react-dom";
import './ScheduledTodoPortal.css'
import {dayjsFormat} from "../../../redux/reducers/dateSlice";
import dayjs from "dayjs";
const objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

export type IActiveScheduledTodo = {
    Id: string;
    UserId: string;
    Title: string;
    Description: string;
    Colour: string;
    Active: boolean;
    RecurCount: number;
    RecurFrequency: number;
    RecurFrequencyType: string;
    RecurendDate: string;
    NotifyBeforeTime: number; // minutes?
    CreatedAt: string;
    UpdatedAt: string;
    ScheduledAt: string;
    TriggeredAt: string;
}

type IScheduledTodoPortal = {
    setScheduledTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeScheduledTodo: IActiveScheduledTodo
}

const ScheduledTodoPortal = ({ setScheduledTodoOpen, activeScheduledTodo }: IScheduledTodoPortal) => {
    const [editingTitleForm, setEditingTitleForm] = useState(false)
    const [title, setTitle] = useState(activeScheduledTodo.Title)
    const [editingDescriptionForm, setEditingDescriptionForm] = useState(false)
    const [description, setDescription] = useState(activeScheduledTodo.Description)
    const [editingNotifyTimeForm, setEditingNotifyTimeForm] = useState(false)
    const [notifyTime, setNotifyTime] = useState(activeScheduledTodo.NotifyBeforeTime.toString())
    const [editingColourForm, setEditingColourForm] = useState(false)
    const [colour, setColour] = useState(activeScheduledTodo.Colour)
    const [editingScheduledAtForm, setEditingScheduledAtForm] = useState(false)

    const [scheduledAt, setScheduledAt] = useState(activeScheduledTodo.ScheduledAt)
    const [scheduledAtDate, setScheduledAtDate] = useState('')
    const [scheduledAtTime, setScheduledAtTime] = useState('')

    const handleEditTitle = () => setEditingTitleForm(true)
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string> } }) => setTitle(event.target.value)
    const cancelEditTitle = () => setEditingTitleForm(false)
    const handleSaveEditTitle = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(title)
        // api call to save and update email
        // re-fetch data
        cancelEditTitle();
    }

    const handleEditDescription = () => setEditingDescriptionForm(true)
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string> } }) => setDescription(event.target.value)
    const cancelEditDescription = () => setEditingDescriptionForm(false)
    const handleSaveEditDescription = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(description)
        // api call to save and update email
        // re-fetch data
        cancelEditDescription();
    }

    const handleEditNotifyTime = () => setEditingNotifyTimeForm(true)
    const handleEditNotifyTimeChange = (event: { target: { value: React.SetStateAction<string> } }) => setNotifyTime(event.target.value)
    const cancelEditNotifyTime = () => setEditingNotifyTimeForm(false)
    const handleSaveNotifyTime = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(description)
        // api call to save and update email
        // re-fetch data
        cancelEditNotifyTime();
    }

    const handleEditColourForm = () => setEditingColourForm(true)
    const handleEditColourFormChange = (event: { target: { value: React.SetStateAction<string> } }) => setColour(event.target.value)
    const cancelEditColourForm = () => setEditingColourForm(false)
    const handleSaveColourForm = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(description)
        // api call to save and update email
        // re-fetch data
        cancelEditColourForm();
    }

    const handleEditScheduledAtForm = () => setEditingScheduledAtForm(true)
    const handleEditScheduledAtFormChangeDate = (event: { target: { value: React.SetStateAction<string> } }) =>
        setScheduledAtDate(event.target.value)
    const handleEditScheduledAtFormChangeTime = (event: { target: { value: React.SetStateAction<string> } }) =>
        setScheduledAtTime(event.target.value)

    const cancelEditScheduledAtForm = () => setEditingScheduledAtForm(false)

    const handleSaveScheduledAtForm = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        console.log(scheduledAtDate)
        console.log(scheduledAtTime)

        const year = scheduledAtDate.split('-')[0]
        const month = scheduledAtDate.split('-')[1]
        const day = scheduledAtDate.split('-')[2]
        const hour = scheduledAtTime.split(':')[0]

        const minute = scheduledAtTime.split(':')[1]

        // @ts-ignore
        const dayjsObj = dayjs({ year: parseInt(year), month: parseInt(month), day: parseInt(day),
            hour: parseInt(hour), minute: parseInt(minute), second: 0, millisecond: 0 })

        const scheduledAtString = dayjsObj.format(dayjsFormat)
        setScheduledAt(scheduledAtString)

        // api call to save and update email
        // re-fetch data
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