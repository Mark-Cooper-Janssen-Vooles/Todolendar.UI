import React from 'react';
import './LandingGraphic.css';
import '../../App.css'
import todolenderLogo from "../../logo.png";

const LandingGraphic = () => {
    return (
        <div className="LandingGraphic Border">
            <img src={todolenderLogo} alt="Todolender logo" />

        </div>
    )
}

export default LandingGraphic;