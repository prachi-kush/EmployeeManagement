import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';

const Signup = () => {
  const [data, setData] = useState({});
  const [err, setErr] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Perform validations for each field
    if (name === 'name') {
      setErr((prevErr) => ({ ...prevErr, [name]: value.length < 4 }));
    } else if (name === 'email') {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setErr((prevErr) => ({ ...prevErr, [name]: !emailRegex.test(value) }));
    } else if (name === 'password') {
      setErr((prevErr) => ({ ...prevErr, [name]: value.length < 6 || value.length > 15 }));
    } else if (name === 'confirmPassword') {
      setErr((prevErr) => ({ ...prevErr, [name]: value !== data.password }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    const hasErrors = Object.values(err).some((error) => error);
    if (hasErrors) {
      alert('Please Enter Valid Details');
    } else {
      try {
        let result = await axios.post('http://localhost:6700/user/signup', data);
        // console.log("result----------->>>",result)
        // localStorage.setItem('user', JSON.stringify(result.data));
        // console.log("is approved result data",result.data.isApproved)
        alert("Registered successfully !! Please Login")
        navigate('/login');
      } catch (err) {
        console.log('err', err.response);
        alert(err.response.data);
      }
    }
  };

  return (
    <>
      <div className="signup-form-container">
        <div className="bodyColor">
          <h2>Signup</h2>
        </div>
        <form>
          <div className="form-group">
            <label className="text-right">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name || ''}
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
          </div>
          {err.name && <p className="text-danger">Please Enter Valid Name</p>}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={data.email || ''}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>
          {err.email && <p className="text-danger">Please Enter Valid Mail</p>}

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={data.password || ''}
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>
          {err.password && <p className="text-danger">Please Enter Valid Password</p>}

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword || ''}
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />
          </div>
          {err.confirmPassword && <p className="text-danger">Passwords do not match</p>}

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
