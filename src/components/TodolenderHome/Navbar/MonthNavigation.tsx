import React from 'react'
import './MonthlyNavigation.css'

const MonthNavigation = () => {
    const handleTodayOnClick = () => {
        console.log("somehow use computers clock to set calendar at todays date")
    }

    return (
        <div className="MonthlyNavigation">
            <button className="ButtonSmall" onClick={handleTodayOnClick}>Today</button>
            {'<'}{'>'}
            {/*// above needs to navigate calendar forward or backward in time */}
            <div>January 2023</div>
            {/*// get above from clock */}
        </div>
    )
}

export default MonthNavigation