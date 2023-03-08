import React from 'react';
import './LandingGraphic.css';
import '../../App.css'
import todolendarLogo from "../../logo.png";

const LandingGraphic = () => {
    return (
        <div className="LandingGraphic Border">
            <img src={todolendarLogo} alt="Todolendar logo" />

        </div>
    )
}

export default LandingGraphic;
