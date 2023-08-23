import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'

import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';

const Signup = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = {};
    if (!data.isAdminKey) {
      validationErrors.isAdminKey = 'Admin Key is required';
    }
    if (!data.name) {
      validationErrors.name = 'Name is required';
    }
    if (!data.email) {
      validationErrors.email = 'Email is required';
    }
    if (!data.password) {
      validationErrors.password = 'Password is required';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await axios.post('/admin/signup', data);
        console.log('result', result.data);
         navigate('/admin/login');
      } catch (err) {
        console.log('err', err.response);
        alert(err.response.data.error);
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
            <label>Admin Key:</label>
            <input
              type="text"
              name="isAdminKey"
              value={data.isAdminKey || ''}
              placeholder="Enter Admin Key"
              onChange={handleChange}
              required
            />
            {errors.isAdminKey && <p className="text-danger">{errors.isAdminKey}</p>}
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={data.name || ''}
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>

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
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

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
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
