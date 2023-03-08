import React, {useEffect, useState} from 'react';
import '../../App.css';
import './Todolist.css'
import {useDispatch, useSelector} from "react-redux";
import {createTodo, fetchTodos} from "../../redux/reducers/todoSlice";
import {RootState} from "../../redux/store";
import TodoList from "./TodoList";

const Todos = () => {
    const [createTodoActive, setCreateTodoActive] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const todos = useSelector((state: RootState) => state.todo.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    const handleTitleChange = (e: any) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e: any) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handleCreateTodo = (e: any) => {
        e.preventDefault()

        if (title !== '' && description !== '') {
            // make API call to create todo
            dispatch(createTodo({title, description}))
            setCreateTodoActive(false);
        } else {
            window.alert('you did not enter either a title, a description, or both!')
        }
    }

    return (
        <div className="Todolist Border">
            <div className="TodoTitle">
                <div>Todo List</div>
                {
                    createTodoActive
                        ?
                    <>
                        <form onSubmit={handleCreateTodo}>
                            <input type="text" name="title" placeholder="title" onChange={handleTitleChange}/>
                            <textarea name="description" placeholder="description" onChange={handleDescriptionChange} />
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={() => setCreateTodoActive(false)}>Cancel</button>
                    </>
                        :
                    <button onClick={() => setCreateTodoActive(true)}>Create Todo</button>
                }
            </div>

            { todos.length > 0 ?
                <TodoList />
                :
                <div className="TodoTitle">You currently have no todos, you can add some above if you wish.</div>
            }
        </div>
    )
}

export default Todos
