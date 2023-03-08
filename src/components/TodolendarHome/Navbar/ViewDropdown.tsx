import React from 'react';

const ViewDropdown = () => {
    return (
        <>
            <select name="view-dropdown" id="view-dropdown" defaultValue="Week">
                <option value="day" disabled>Day</option>
                <option value="Week">Week</option>
                <option value="Month" disabled>Month</option>
            </select>
        </>
    )
}

export default ViewDropdown