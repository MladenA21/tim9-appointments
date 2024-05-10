import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Reservation from "./pages/Reservation";
import AddReservation from "./pages/AddReservation";
import Repository from "./repository/Repository";
import {Component} from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function App() {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.post('/api/login', {
            email: "org@tim9.co",
            password: "asdasd123"
        }).then((res) => {
            console.log(res);
            // Cookies.set('token', res.data.token, { expires: 1 });
            setAuthenticated(true);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <Routes>
            {authenticated ? (
                <Route path="/" element={<Home />} />
            ) : (
                <Route path="/login" element={<Login />} />
            )}
            <Route path="/register" element={<Register />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reserve" element={<AddReservation />} />
        </Routes>
    );

}

export default App
