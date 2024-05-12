import './Reservations.css';
import logo from '../assets/logo.png'
import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import Cookies from 'js-cookie';
import {Link, useParams} from "react-router-dom";


function Reservation() {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
        setSelectedDay(newDate);
    };

    const { id } = useParams();

    const [reservations, setReservations] = useState([]);
    const organizationName = reservations.length > 0 ? reservations[0].organization.name : '';

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedReservations, setSelectedReservations] = useState([]);

    const generateWorkingHours = () => {
        const { time_from, time_to } = reservations.length > 0 ? reservations[0].organization : {};
        const hours = [];
        for (let i = time_from; i <= time_to; i++) {
            hours.push(`${i}:00`);
        }
        return hours;
    };


    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`/api/organization/${id}/reservations`)
            .then((response) => {
                console.log("Data:", response.data);
                setReservations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching organizations:", error);
            });
    }, []);

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
                            <Link className="btn add-btn" to={`/reserve`}>add reservation</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div className="row">
                    <h2 className="organization-name">{organizationName}</h2>
                </div>
            </div>
            <div className="text-center mt-4">
                <div className="row">
                    <div className="col-5 offset-1">
                        <div className="calendar-container d-flex justify-content-center align-items-center">
                            <Calendar
                                className="centered-calendar"
                                onChange={onChange}
                                value={date}
                                onClickDay={(clickedDate) => {
                                    setSelectedDay(clickedDate);
                                    const reservationsForDay = reservations.filter(reservation =>
                                        new Date(reservation.dateTime).toDateString() === clickedDate.toDateString()
                                    );
                                    setSelectedReservations(reservationsForDay);
                                }}
                                tileContent={({ date, view }) => {
                                    if (view === 'month') {
                                        const hasReservations = reservations.some(reservation =>
                                            new Date(reservation.dateTime).toDateString() === date.toDateString()
                                        );
                                        return hasReservations && <div className="reservation-dot"></div>;
                                    }
                                    return null;
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="table-container d-flex justify-content-center align-items-center">
                            <table className="reservation-table">
                                <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Availability</th>
                                </tr>
                                </thead>
                                <tbody>
                                {generateWorkingHours().map((hour, index) => (
                                    <tr key={index} className={selectedReservations.some(reservation => reservation.dateTime.includes(hour)) ? 'reserved' : 'not-reserved'}>
                                        <td>{hour}</td>
                                        <td>{selectedReservations.find(reservation => reservation.dateTime.includes(hour)) ? 'Reserved' : 'Open'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Reservation;
