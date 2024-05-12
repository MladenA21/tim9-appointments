import logo from "../assets/logo.png";
import React from "react";
import Repository from "../repository/Repository";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";

const Home = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                Reserfivy
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-stripped">
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
                                            <td>{term.days}</td>
                                            <td>{term.time_from} - {term.time_to}</td>
                                            <td><Link className={"d-block btn btn-outline-primary my-2"} to={`/reservations/${term.id}`}>View organization</Link></td>
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
