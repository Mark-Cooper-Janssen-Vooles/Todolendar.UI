import React, {useState} from 'react';
import '../../App.css';
import './Todolist.css'

const todos = [
    {
        id: 1,
        title: 'Todo item 1',
        description: 'To do item 1 description'
    },
    {
        id: 2,
        title: 'Todo item 2',
        description: 'To do item 2 description'
    },
    {
        id: 3,
        title: 'Todo item 3',
        description: 'To do item 3 description'
    },
    {
        id: 4,
        title: 'Todo item 4',
        description: 'To do item 4 description'
    }
]

const Todolist = () => {
    const [createTodoActive, setCreateTodoActive] = useState(false)
    const [createTodo, setCreateTodo] = useState({
        title: '',
        description: ''
    })

    const [addActive, setAddActive] = useState(false)
    const [addDate, setAddDate] = useState('')
    const [addTime, setAddTime] = useState('')

    const [editTodo, setEditTodo] = useState(false)
    const [activeTodo, setActiveTodo] = useState({ id: 0, title: '', description: ''})

    const handleCreateTodo = (e: any) => {
        const title = e.target[0].value
        const description = e.target[1].value
        e.preventDefault()

        if (title !== '' && description !== '') {
            setCreateTodo({ title, description })
            // make API call to create todo
            setCreateTodoActive(false);
        } else {
            window.alert('you did not enter either a title, a description, or both!')
        }
    }

    const handleAdd = (todo: React.SetStateAction<{ id: number; title: string; description: string; }>) => {
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
            // api call to add to calendar using the date and time
            // re-fetch data

            console.log('api call')
            setAddActive(false)
        } else {
            window.alert('you did not enter either a date, a time, or both!')
        }
    }

    const handleEditTodo = (todo: React.SetStateAction<{ id: number; title: string; description: string; }>) => {
        setEditTodo(!editTodo)
        setActiveTodo(todo)
    }

    const handleEditedTodo = (e: any) => {
        e.preventDefault()

        console.log(e.target.type)

        if (e.target.type == "text") {
            console.log(e.target.value)
            setActiveTodo({
                id: activeTodo.id,
                title: e.target.value,
                description: activeTodo.description
            })
        }

        if (e.target.type == "textarea") {
            console.log(e.target.value)
            setActiveTodo({
                id: activeTodo.id,
                title: activeTodo.title,
                description: e.target.value
            })
        }
    }

    const handleSaveEditTodo = (e: any) => {
        e.preventDefault()
        console.log(activeTodo)
        // api call to edit todo
        // re-fetch data

        setEditTodo(false)
    }

    const handleDeleteTodo = (todo: React.SetStateAction<{ id: number; title: string; description: string; }>) => {
        window.alert('You have deleted the todo!')
        // api call to delete todo
    }

    const StandardButtons = (props: { currentTodo: { id: number, title: string, description: string }}) => <>
            <button onClick={() => handleAdd(props.currentTodo)}>Add</button>
            <button onClick={() => handleEditTodo(props.currentTodo)}>Edit</button>
            <button onClick={() => handleDeleteTodo(props.currentTodo)}>Delete</button>
        </>

    return (
        <div className="Todolist Border">
            <div className="TodoTitle">
                <div>Todo List</div>
                {
                    createTodoActive
                        ?
                    <>
                        <form onSubmit={handleCreateTodo}>
                            <input type="text" name="title" placeholder="title"/>
                            <textarea name="description" placeholder="description" />
                            <input type="submit" value="save" />
                        </form>
                        <button onClick={() => setEditTodo(false)}>Cancel</button>
                    </>
                        :
                    <button onClick={() => setCreateTodoActive(true)}>Create Todo</button>
                }
            </div>
            <ul className="TodolistUl">
                {todos?.map((todo) => {
                    const currentTodo = todos.find(x => x.id == todo.id)
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
        </div>
    )
}

export default Todolist