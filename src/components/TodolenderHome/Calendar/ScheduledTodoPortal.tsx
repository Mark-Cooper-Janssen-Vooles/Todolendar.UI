import React from 'react'
import * as ReactDOM from "react-dom";
import './ScheduledTodoPortal.css'

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
    // normal view

    // edit / form view with save / submit

    return ReactDOM.createPortal(
        <div className="ScheduledTodoPortalContainer Border">
            <div className="CloseIcon" onClick={() => setScheduledTodoOpen(false)}>X</div>
            <div>{activeScheduledTodo.Title}</div>
            <div>{activeScheduledTodo.Description}</div>
            <div>Notify Before Time: {activeScheduledTodo.NotifyBeforeTime} minutes</div>
            <div>Created at: {activeScheduledTodo.CreatedAt}</div>
            <div>Updated at: {activeScheduledTodo.UpdatedAt}</div>
            <div>Scheduled at: {activeScheduledTodo.ScheduledAt}</div>
            <div>Colour: {activeScheduledTodo.Colour}</div>
        </div>,
        // @ts-ignore
        document.body
    )
}

export default ScheduledTodoPortal