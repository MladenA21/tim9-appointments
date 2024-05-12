import { useContext } from "react";

import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Reservation from "./pages/Reservation";
import AddReservation from "./pages/AddReservation";
import { AuthContext } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const auth = useContext(AuthContext);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                {auth.isLoggedIn ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reserve" element={<AddReservation />} />
            </Routes>
        </>
    );

}

export default App
