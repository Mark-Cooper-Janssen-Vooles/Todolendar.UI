import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {deleteTodo, fetchTodos, saveEditedTodo} from "../../redux/reducers/todoSlice";
import {createScheduledTodo} from "../../redux/reducers/scheduledTodoSlice";
import dayjs from "dayjs";

const TodoList = () => {
    const todos = useSelector((state: RootState) => state.todo.todos)

    const [addActive, setAddActive] = useState(false)
    const [addDate, setAddDate] = useState('')
    const [addTime, setAddTime] = useState('')
    const [editTodo, setEditTodo] = useState(false)
    const [activeTodo, setActiveTodo] = useState({ id: '', title: '', description: ''})
    const dispatch = useDispatch()

    const handleAdd = (todo: React.SetStateAction<{ id: string; title: string; description: string; }>) => {
        setAddActive(!addActive)
        setActiveTodo(todo)
    }

    const handleAddDate = (e: any) => {
        e.preventDefault()
        setAddDate(e.target.value)
    }

    const handleAddTime = (e: any) => {
        e.preventDefault()
        setAddTime(e.target.value)
    }

    const handleSaveAdd = (e: any) => {
        e.preventDefault()

        if (addDate !== '' && addTime !== '' ) {
            const hour = addTime.split(':')[0]
            const minute = addTime.split(':')[1]

            const scheduledAt = dayjs(addDate).add(parseInt(hour), 'hour').add(parseInt(minute), 'minute').toISOString()

            dispatch(createScheduledTodo({
                ...activeTodo,
                scheduledAt
            }))
            setAddActive(false)
        } else {
            window.alert('you did not enter either a date, a time, or both!')
        }
    }

    const handleEditTodo = (todo: React.SetStateAction<{ id: string; title: string; description: string; }>) => {
        setEditTodo(!editTodo)
        setActiveTodo(todo)
    }

    const handleEditedTodo = (e: any) => {
        e.preventDefault()

        if (e.target.type === "text") {
            setActiveTodo({
                id: activeTodo.id,
                title: e.target.value,
                description: activeTodo.description
            })
        }

        if (e.target.type === "textarea") {
            setActiveTodo({
                id: activeTodo.id,
                title: activeTodo.title,
                description: e.target.value
            })
        }
    }

    const handleSaveEditTodo = (e: any) => {
        e.preventDefault()
        // api call to edit todo
        dispatch(saveEditedTodo(activeTodo))

        setEditTodo(false)
    }

    const handleDeleteTodo = (todo: React.SetStateAction<{ id: string; title: string; description: string; }>) => {
        window.alert('You have deleted the todo!')
        // api call to delete todo
        dispatch(deleteTodo(todo))
    }

    const StandardButtons = (props: { currentTodo: { id: string, title: string, description: string }}) => <>
        <button onClick={() => handleAdd(props.currentTodo)}>Add</button>
        <button onClick={() => handleEditTodo(props.currentTodo)}>Edit</button>
        <button onClick={() => handleDeleteTodo(props.currentTodo)}>Delete</button>
    </>

    return (
        <ul className="TodolistUl">
            {todos?.map((todo) => {
                const currentTodo = todos.find(x => x.id === todo.id)
                const currentTodoAddActiveForm = addActive && todo.id === activeTodo.id
                const currentTodoEditTodoActive = editTodo && todo.id === activeTodo.id;
                const formActiveForCurrentTodo = currentTodoAddActiveForm || currentTodoEditTodoActive

                return (
                    <li key={todo.id} className="TodolistLi">
                        <div className="TodoListLiTitle">{todo.title} </div>
                        {todo.description && <div className="TodolistLiDescription">{todo.description}</div>}

                        { currentTodoAddActiveForm &&
                            <>
                                <form onSubmit={handleSaveAdd}>
                                    <input type="date" onChange={handleAddDate}/>
                                    <input type="time" onChange={handleAddTime}/>
                                    <input type="submit" value="save" />
                                </form>
                                <button onClick={() => setAddActive(false)}>Cancel</button>
                            </> }

                        { currentTodoEditTodoActive &&
                            <>
                                <form onSubmit={handleSaveEditTodo}>
                                    {/*// @ts-ignore*/}
                                    <input type="text" name="title" onChange={handleEditedTodo} defaultValue={currentTodo.title}/>
                                    {/*// @ts-ignore*/}
                                    <textarea name="description" onChange={handleEditedTodo} defaultValue={currentTodo.description} />
                                    <input type="submit" value="save" />
                                </form>
                                <button onClick={() => setEditTodo(false)}>Cancel</button>
                            </> }
                        { !formActiveForCurrentTodo && <StandardButtons currentTodo={todo} /> }
                    </li>
                )
            })}
        </ul>
    )
}

export default TodoList;
