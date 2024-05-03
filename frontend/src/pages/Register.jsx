import React from 'react'

import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Register = () => {
  return (
    <div style={{ marginTop: "5%" }}>
      <Header />
      <div className='container justify-content-center align-items-center w-50 fw-bold text-center'>
        <form>
          <div className='py-4 w-75 mx-auto'>
            <input type="text" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="email" id="email" name="email" />
          </div>
          <div className='pb-4 w-75 mx-auto'>
            <input type="password" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="password" id="password" name="password" />
          </div>
          <div className='pb-4 w-75 mx-auto'>
            <input type="password" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="confirm password" id="confirmPassword" name="confirmPassword" />
          </div>
          <div className='pb-2'>
            <button className='rounded-3 w-25 p-1 fw-bold fs-5 text-white border-0' style={{ backgroundColor: "#6c596e" }} type="submit">register</button>
          </div>
          <p className='fs-5'>or click <Link to="/login" className='text-decoration-none' style={{ color: "#878889" }}>here</Link> to login</p>
        </form>
      </div>
    </div>
  )
}

export default Register
