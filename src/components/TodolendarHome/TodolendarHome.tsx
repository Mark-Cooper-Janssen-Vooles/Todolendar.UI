import React from 'react';
import Navbar from "./Navbar/Navbar";
import Todos from "./Todos";
import Calendar from "./Calendar/Calendar";
import './TodolendarHome.css';

const TodolendarHome = () => {
    return (
        <div>
            <Navbar />
            <div className="TodolendarBody">
                <Todos />
                <Calendar />
            </div>
        </div>
    )
}

export default TodolendarHome;
