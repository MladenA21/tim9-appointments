import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import Reccomendations from '../components/Reccomendations'
import Header from '../components/Header'
import { AuthContext } from '../context/auth-context'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

const Login = () => {
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            setIsLoading(true);
            const response = await fetch("https://tim9.smetkovodstvo.com/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                })
            });

            const resData = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                toast.error("Invalid credentials! Please try again.");
                return;
            }

            console.log(resData);
            auth.login(resData.token, resData.type, resData.id);

            if (resData.type === 'organization'){
                navigate(`/reservations/${resData.id}`);
            } else {
                navigate('/');
            }
            toast.success("You have successfully logged in!");
        } catch (error) {}
    };

    return (
        <div style={{ marginTop: "5%" }}>
            <Header />
            <div className='container justify-content-center align-items-center w-50 fw-bold text-center' style={{ marginBottom: "5%" }}>
                <form onSubmit={handleSubmit}>
                    <div className='py-4 w-75 mx-auto'>
                        <input type="text" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="email" id="email" name="email" required />
                    </div>
                    <div className='pb-4 w-75 mx-auto'>
                        <input type="password" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="password" id="password" name="password" required />
                    </div>
                    <div className='pb-2'>
                        {isLoading ? <LoadingSpinner /> : <button className='rounded-3 w-25 p-1 fw-bold fs-5 text-white border-0 auth-button' type="submit">login</button>}
                    </div>
                    <p className='fs-5'>or click <Link to="/register" className='redirecting-button' style={{ color: "#878889" }}>here</Link> to join</p>
                </form>
            </div>
            <Reccomendations />
        </div>
    )
}

export default Login