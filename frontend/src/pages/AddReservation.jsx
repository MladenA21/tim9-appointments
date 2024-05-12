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

    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);

    useEffect(() => {
        axios.get('/api/organizations')
            .then((response) => {
                console.log("Data:", response.data);
                setOrganizations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching organizations:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reserve', {
                organization: formData.organization,
                dateTime: formData.dateTime,
            });
            window.location.href = '/';
        } catch (error) {
            console.error('Error adding reservation:', error);
        }
    };

    const handleOrganizationChange = (e) => {
        const selectedOrgId = e.target.value;
        const selectedOrg = organizations.find(org => org.id === selectedOrgId);
        setSelectedOrganization(selectedOrg);
        setFormData({ ...formData, organization: selectedOrgId });
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
                </div>
            </div>
            <div className="form-container">
                <h1>Add Reservation</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Organization</label>
                        <select
                            name="organization"
                            value={formData.organization}
                            onChange={handleOrganizationChange}
                            required
                        >
                            <option value="">Select Organization</option>
                            {organizations.map((organization) => (
                                <option key={organization.id} value={organization.id}>
                                    {organization.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Working Days:</label>
                        {selectedOrganization && (
                            <h5>{selectedOrganization.name}</h5>
                        )}
                    </div>
                    <div>
                        <label>Date and Time:</label>
                        <input
                            type="datetime-local"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddReservation;
