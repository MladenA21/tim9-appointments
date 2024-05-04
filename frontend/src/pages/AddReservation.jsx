import './AddReservation.css'
import logo from '../assets/logo.png'
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

const AddReservation = () => {
    return (
        <div className="page-cont">
            <div className="top-cont">
                <div className="container text-center p-4">
                    <div className='container w-50 mx-auto'>
                        <div className='w-75 mx-auto' style={{ fontFamily: "Madimi One", color: "#6c596e", fontSize: "4rem" }}>
                            <img className='mx-3' src={logo} alt="logo" style={{ width: "70px" }} />
                            Reserfivy
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-container">
                <h2 className="title-form">reservation details</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="date">date:</label>
                        <input type="date" id="date" name="date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timeSlots">open time slots:</label>
                        <select id="timeSlots" name="timeSlots">
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">type:</label>
                        <select id="type" name="type">
                            <option value="meeting">Meeting</option>
                            <option value="workshop">Workshop</option>
                            <option value="conference">Conference</option>
                        </select>
                    </div>
                    <div className="button-cont">
                        <button type="submit" className="custom-btn">reserve</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default AddReservation;
