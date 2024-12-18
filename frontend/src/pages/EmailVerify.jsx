import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [token, setToken] = useState();

  useEffect(()=>{
    localStorage.setItem('token',token);
  },[token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post("http://localhost:8080/emailverify", formData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log("Response :"+response);

        if(response.status===200)
        {
            const token = response.data;
            setToken(token);
            window.location.href = '/';
        }else
        {
            console.log("Error occured ");
        }
    }catch(error)
    {
        console.log("Error :" + error);
    }

  };

  const handleBackToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the OTP sent to your email
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Verify Email
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={handleBackToSignup}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Back to Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;