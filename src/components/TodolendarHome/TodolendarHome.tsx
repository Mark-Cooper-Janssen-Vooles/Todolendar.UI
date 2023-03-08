import React from 'react';
import Navbar from "./Navbar/Navbar";
import Todolist from "./Todolist";
import Calendar from "./Calendar/Calendar";
import './TodolendarHome.css';

const TodolendarHome = () => {
    return (
        <div>
            <Navbar />
            <div className="TodolendarBody">
                <Todolist />
                <Calendar />
            </div>
        </div>
    )
}

export default TodolendarHome;
