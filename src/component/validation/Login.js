import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!data.email) {
      validationErrors.email = 'Email is required';
    }
    if (!data.password) {
      validationErrors.password = 'Password is required';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let result = await axios.post('http://localhost:6700/user/login', data);
        console.log('result====================>>>>>', result.data.user);
        console.log('result: ', result);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        localStorage.setItem('token', JSON.stringify(result.data.token));
        localStorage.setItem('refreshToken', JSON.stringify(result.data.refreshToken));
       
        console.log('result.data.user.isApproved: ', result.data.user.isApproved);

        if (result.data.user.isApproved === true) {
          navigate('/dashboard');
        } else {
          navigate('/Approval');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login-form-container">
      <div className="bodyColor">
        <h2>Login</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
