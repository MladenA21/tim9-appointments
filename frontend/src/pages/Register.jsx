import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/auth-context'
import LoadingSpinner from '../components/LoadingSpinner'

const Register = () => {
  const [type, setType] = useState('client');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const days = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (data.days) {
      data.days = Array.from(formData.getAll('days'));
    } else {
      data.days = [];
    }
    data.days = JSON.stringify(data.days);
    console.log(data.days);

    try {
      setIsLoading(true);
      console.log('Sending registration data:', data);
      const response = await fetch("https://tim9.smetkovodstvo.com/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
          type: data.type,
          time_from: data.from,
          time_to: data.to,
          days: data.days,
        })
      });

      const resData = await response.json();
      console.log('Received response:', resData);
      setIsLoading(false);

      if (!response.ok) {
        toast.error("Could not register! Please try again.");
        console.error('Error:', resData);
        return;
      }

      toast.success("You have successfully registered!");
      // navigate('/');
      // added by Angela
      auth.login(resData.token, resData.type, resData.id);
      console.log(resData);

      if (resData.type === 'organization'){
        navigate(`/reservations/${resData.id}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred! Please try again.");
      console.error('Registration error:', error);
    }
  };

  return (
      <div style={{ marginTop: "5%" }}>
        <Header />
        <div className='container justify-content-center align-items-center w-50 fw-bold text-center'>
          <form onSubmit={handleSubmit}>
            <div className='pt-4 w-75 mx-auto'>
              <input type="text" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="name" id="name" name="name" required />
            </div>
            <div className='py-4 w-75 mx-auto'>
              <input type="text" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="email" id="email" name="email" required />
            </div>
            <div className='pb-4 w-75 mx-auto'>
              <input type="password" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="password" id="password" name="password" required />
            </div>
            <div className='pb-4 w-75 mx-auto'>
              <input type="password" className='rounded-5 py-2 px-3 fw-bold fs-5 border-0' style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }} placeholder="confirm password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <div className='pb-4 w-75 mx-auto'>
              <fieldset>
                <label className='fs-5'>Type:</label>
                <label htmlFor="client" className='fs-5'>
                  <input
                      className='mx-1'
                      type="radio"
                      id="client"
                      name="type"
                      checked={type === 'client'}
                      value="client"
                      onChange={() => setType('client')}
                  />Client
                </label>
                <label htmlFor="organization" className='fs-5'>
                  <input
                      className='mx-1'
                      type="radio"
                      id="organization"
                      name="type"
                      value="organization"
                      onChange={() => setType('organization')}
                  />
                  Organization
                </label>
              </fieldset>
              {type === 'organization' &&
              <div className='pt-3'>
                <div className='pb-4 w-75 mx-auto'>
                  <input
                      type="number"
                      placeholder='From'
                      name='from'
                      className='rounded-5 py-2 px-3 fw-bold fs-5 border-0'
                      style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }}
                      required
                  />
                </div>
                <div className='pb-4 w-75 mx-auto'>
                  <input
                      type="number"
                      placeholder='To'
                      name="to"
                      className='rounded-5 py-2 px-3 fw-bold fs-5 border-0'
                      style={{ width: "90%", backgroundColor: "#2f3234", color: "#878889" }}
                      required
                  />
                </div>
                <div className='pb-4 w-75 mx-auto'>
                  <Select isMulti name="days" options={days} closeMenuOnSelect={false} className='p-2' required />
                </div>
              </div>
              }
            </div>

            <div className='pb-2'>
              {isLoading ? <LoadingSpinner /> : <button className='rounded-3 w-25 p-1 fw-bold fs-5 text-white border-0 auth-button' type="submit">register</button>}
            </div>
            <p className='fs-5'>or click <Link to="/login" className='redirecting-button' style={{ color: "#878889" }}>here</Link> to login</p>
          </form>
        </div>
      </div>
  )
}

export default Register