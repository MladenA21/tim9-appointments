import './AddReservation.css'
import logo from '../assets/logo.png'
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const AddReservation = () => {

    const [formData, setFormData] = useState({
        dateTime: '',
        organization: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedTime = new Date(formData.dateTime);
        const minutes = selectedTime.getMinutes();

        if (minutes !== 0) {
            alert("Reservations can be scheduled only at the start of each hour (e.g., 08:00, 09:00, 16:00)");
            return;
        }
        try {
            await axios.post('/api/reserve', {
                organization: formData.organization,
                dateTime: formData.dateTime,
            });
            window.location.href = '/successful-reservation';
        } catch (error) {
            console.error('Error adding reservation:', error);
            if (error.response && error.response.data && error.response.data.message) {
                let errorMessage = error.response.data.message;
                if (error.response.data.allowed_days) {
                    errorMessage += `\nWorking days: ${error.response.data.allowed_days.join(', ')}`;
                } else if(error.response.data.time_from && error.response.data.time_to) {
                    errorMessage +=`\nWorking hours: ${error.response.data.time_from} - ${error.response.data.time_to}`;
                }
                window.alert(errorMessage);
            } else {
                window.alert('An error occurred while adding the reservation.');
            }
        }
    };

    const [org, setOrganizations] = useState([]);

    useEffect(() => {
        axios.get('/api/organizations')
            .then((response) => {
                console.log("Data:", response.data);
                setOrganizations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching organizations:", response.data);
            });
    }, []);

    return (
        <div>
            <div className="top-cont">
                <div className="container text-center p-4">
                    <div className='container w-50 mx-auto'>
                        <div className='w-75 mx-auto' style={{ fontFamily: "Madimi One", color: "#6c596e", fontSize: "4rem" }}>
                            <img className='mx-3' src={logo} alt="logo" style={{ width: "70px" }} />
                            Reservify
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <h1 className="title-form">Add Reservation</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Organization</label>
                        <select
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Organization</option>
                            {org.map((organization) => (
                                <option key={organization.id} value={organization.id}>
                                    {organization.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date and Time</label>
                        <input
                            type="datetime-local"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-cont">
                        <Link className="btn bck-btn" to={`/`}>Cancel</Link>
                        <button className="submit-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddReservation;
