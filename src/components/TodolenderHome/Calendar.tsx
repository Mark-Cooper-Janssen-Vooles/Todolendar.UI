import React from 'react'
import '../../App.css'
import './Calendar.css'

const Calendar = () => {
    const date = new Date();

    return (
        <div className="Calendar Border">
            <h1>calendar</h1>
            <div>
                {/*<p>{dayjs1}</p>*/}
                <p>Month: {date.getMonth() + 1}</p>
                <p>Date: {date.getDate()}</p>
                <p>year: {date.getFullYear()}</p>
            </div>
        </div>
    )
}

export default Calendar