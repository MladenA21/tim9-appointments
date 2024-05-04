import './Reservation.css';
import logo from '../assets/logo.png'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Reservation = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <div className="top-cont">
                <div className="container text-center p-4">
                    <div className='container w-50 mx-auto'>
                        <div className='w-75 mx-auto' style={{ fontFamily: "Madimi One", color: "#6c596e", fontSize: "4rem" }}>
                            <img className='mx-3' src={logo} alt="logo" style={{ width: "70px" }} />
                            Reserfivy
                        </div>
                    </div>
                    <div className="row justify-content-center p-2">
                        <div className="col-auto">
                            <button className="btn custom-btn">add reservation</button>
                        </div>
                        <div className="col-auto">
                            <button className="btn custom-btn">filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 calendar-cont">
                <div className="row">
                    <h2>Organization name</h2>
                    <div className="d-flex justify-content-center">
                        <Calendar
                            onChange={onChange}
                            value={date}
                            className="custom-calendar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
