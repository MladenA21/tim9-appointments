import './SuccessfulReservation.css'
import React from "react";
import {Link} from "react-router-dom";
import successful  from '../assets/successful.png'

const SuccessfulReservation = () => {
    return (
        <div>
            <div className="message-container">
                <img src={successful} style={{width: "100px"}}/>
                <h2 className="success-message">Successful reservation!</h2>
                <p className="text-cont">Continue to home...</p>
                <Link className="btn home-btn" to={`/`}>Home</Link>

            </div>
        </div>
    )
}

export default SuccessfulReservation;