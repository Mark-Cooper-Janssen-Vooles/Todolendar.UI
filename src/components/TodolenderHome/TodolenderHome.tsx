import React from 'react';
import Navbar from "./Navbar";
import Todolist from "./Todolist";
import Calendar from "./Calendar";
import './TodolenderHome.css';

const TodolenderHome = () => {
    return (
        <div>
            <Navbar />
            <div className="TodolenderBody">
                <Todolist />
                <Calendar />
            </div>
        </div>
    )
}

export default TodolenderHome;