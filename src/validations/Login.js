import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from '../validations/AxiosInstance'
import './LoginForm.css';
import { toast } from 'react-toastify';
// import { loginAsync } from '../store/thunks/authAsync';
// import { setUser, setError } from '../store/reducers/authSlice'; 


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
//redux implemantation==============
 const dispatch =useDispatch();
  const auth =useSelector((state)=>state.auth)
  console.log('auth:777777777777777 ', auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
     setData((prevData) => ({ ...prevData, [name]: value }));
   };

  //  const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission behavior
  //   const validationErrors = {};
  
  //   if (!data.email) {
  //     validationErrors.email = 'Email is required';
  //   }
  //   if (!data.password) {
  //     validationErrors.password = 'Password is required';
  //   }
  
  //   if (Object.keys(validationErrors).length === 0) {
  //     dispatch(loginAsync(data))
     
      
  //       .then((response) => {
  //         console.log('response: back ', response);
  //         dispatch(setUser(response));
  //         console.log('response: ', response.type);
  //       alert("response")
       
  //         toast.success('Logged in successfully!', {
  //           position: 'top-right',
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         navigate('/admin/home');
  //       })
  //       .catch((error) => {
  //         dispatch(setError(error.message))
  //         console.log('error.message: ', error.message);
  //         alert("failure=============>",error.message)
  //         toast.error(error.message || 'An error occurred', {
  //           position: 'top-right',
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       });
  //   }
  // };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!data.email) {
      validationErrors.email = 'Email is required';
    }
    if (!data.password) {
      validationErrors.password = 'Password is required';
    } if (!data.isAdminKey) {
      validationErrors.password = 'Admin Key is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const result = await axios.post('/admin/login', data);
        console.log('result: ', result);
        localStorage.setItem('admin', JSON.stringify(result.data));
        localStorage.setItem('token', JSON.stringify(result.data.token));
        localStorage.setItem('refreshToken', JSON.stringify(result.data.refreshToken));
      
        toast.success('Logged In successfully', {
          position: "top-right",
          autoClose: 5000, // Set the duration for how long the toast will be displayed (in milliseconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate('/admin/home');
      } catch (err) {
        console.log(err);

        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000, // Set the duration for how long the toast will be displayed (in milliseconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="login-form-container">
      <div className="bodyColor">
        <h2>Login</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Admin Key field */}
        <div className="form-group">
          <label>Admin Key:</label>
          <input
            type="text"
            name="isAdminKey"
            value={data.isAdminKey}
            placeholder="Enter Admin Key"
            onChange={handleChange}
          />
          {errors.isAdminKey && <p className="text-danger">{errors.isAdminKey}</p>}
        </div>

        {/* Email field */}
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
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        {/* Password field */}
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
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
