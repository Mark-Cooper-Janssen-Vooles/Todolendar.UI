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
    const [addActive, setAddActive] = useState(false)
    const [addDate, setAddDate] = useState('')

    const handleAdd = () => {
        setAddActive(!addActive)
    }

    const handleAddDate = (e: any) => {
        e.preventDefault()
        setAddDate(e.target.value)
    }

    const handleSaveAdd = (e: any) => {
        e.preventDefault()
        console.log(addDate)
        // api call to add to calendar
        // re-fetch data

        setAddActive(false)
    }

    const StandardButtons = () => <>
        <button onClick={handleAdd}>Add</button>
        <button>Edit</button>
        <button>Delete</button>
    </>

    return (
        <div className="Todolist Border">
            <div className="TodoTitle">Todo List</div>
            <ul className="TodolistUl">
                {todos?.map((todo) => {
                    return (
                    <li key={todo.id} className="TodolistLi">
                        <div className="TodoListLiTitle">{todo.title} </div>
                        {todo.description && <div className="TodolistLiDescription">{todo.description}</div>}

                        { addActive ?
                            <>
                                <form onSubmit={handleSaveAdd}>
                                    <input type="date" onChange={handleAddDate}/>
                                    <input type="submit" value="save" />
                                </form>
                                <button onClick={handleAdd}>Cancel</button>
                            </>
                            :
                            <StandardButtons />
                        }
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Todolist