import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import axios from "axios";
import Cookies from 'js-cookie';
import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";

const Home = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        toast.success("You have successfully logged out!");
        navigate("/login");
    };

    useEffect(() => {
        const token = Cookies.get('token');
        console.log("Token:", token);
        axios.get("/organizations", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
                <div className="text-center">
                    <button onClick={handleLogout}>Logout</button>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-stripped">
                                <thead>
                                <tr>
                                    <th scope={"col"}>Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* {organizations.map((term) => {
                                    return (
                                        <tr key={term.id}>
                                            <td>{term.name}</td>
                                        </tr>
                                    );
                                })} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


export default Home;
