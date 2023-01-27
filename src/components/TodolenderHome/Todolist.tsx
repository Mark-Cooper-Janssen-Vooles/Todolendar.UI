import React, {useState} from 'react';
import '../../App.css';
import './Todolist.css'

const todos = [
    {
        title: 'Todo item 1',
        description: 'To do item 1 description'
    },
    {
        title: 'Todo item 2',
        description: 'To do item 2 description'
    },
    {
        title: 'Todo item 3',
        description: 'To do item 3 description'
    },
    {
        title: 'Todo item 4',
        description: 'To do item 4 description'
    }
]


const Todolist = () => {
    const [addActive, setAddActive] = useState(false)

    return (
        <div className="Todolist Border">
            <div className="TodoTitle">Todo List</div>
            <ul className="TodolistUl">
                {todos?.map((todo) => {
                    return (
                    <li className="TodolistLi">
                        <div className="TodoListLiTitle">{todo.title} </div>
                        {todo.description && <div className="TodolistLiDescription">{todo.description}</div>}

                        { addActive ?
                            <>
                                <div>Add form</div>
                                <button>Cancel</button>
                            </>
                            :
                            <>
                                <button>Add</button>
                                <button>Edit</button>
                                <button>Delete</button>
                            </>
                        }
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Todolist