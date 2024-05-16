import './Home.css'
import logo from "../assets/logo.png";
import React from "react";
import Repository from "../repository/Repository";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";

const Home = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    //Adding
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    //Adding
    const handleLogout = () => {
        auth.logout();
        toast.success("You have successfully logged out!");
        navigate("/login");
    };

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get('/api/organizations')
            .then((response) => {
                console.log("Data:", response.data);
                setOrganizations(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching organizations:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    <div className="row justify-content-center p-2">
                        <div className="col-auto">
                            <Link className="btn add-btn" to={`/reserve`}>Add Reservation</Link>
                            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div>
                        <table className="table org-table">
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Working days</th>
                                <th scope={"col"}>Working hours</th>
                                <th scope={"col"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {organizations.map((term) => {
                                return (
                                    <tr key={term.id}>
                                        <td>{term.name}</td>
                                        <td>{term.days.join(', ')}</td>
                                        <td>{term.time_from} - {term.time_to}</td>
                                        <td><Link className="btn more-btn" to={`/reservations/${term.id}`}>View organization</Link></td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;