import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../validation/AxiosInstance'; // Import your Axios instance

import './divColor.css';
import './leave.css';

const Shift = () => {
  const initialFormData = {
    shiftType: 'Choose',
    dateFrom: '',
    reason: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("formData",formData)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const email = currentUser.email;
   // const token = JSON.parse(localStorage.getItem('token'));
    // const headers = {
    //   Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    // };
    // Check if any of the form fields are empty
    if (
      formData.shiftType === 'Choose' ||
      formData.dateFrom === '' ||
      formData.reason === ''
    ) {
      toast.error('Please fill in all the details', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      console.log('handle Submit');
      const response = await axiosInstance.post(`/user/chooseshift/${email}`, formData);
      console.log('Server response:', response.data);
      alert(response.data.message);
      toast.success('Your request for shift change has been sent for approval.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.response.data,"0000000000000000000")
      toast.error(error.response.data, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error message:', error.message);
    }
    // Optional: Reset the form after submission
    setFormData(initialFormData);
  };
  

  return (
    <div className='container'>
      <form 
    //   onSubmit={handleSubmit}
      >
        <div className='divColor '>
          <h4>Request For Shift Change</h4>
        </div>

        <div>
          <label>Choose Shift:</label>
          <select
            name="shiftType"
            value={formData.shiftType}
            onChange={handleInputChange}
            required
          >
             <option value="choose">Select Shift</option>
            <option value="morning">Morning Shift</option>
            <option value="evening">Evening Shift</option>
            <option value="night">Night Shift</option>
           
          </select>

          <br /> <br />

          <label>Date :</label>
          <input
            type="date"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleInputChange}
            required
          />
<br /> <br />

          <label>Reason:</label>
          <textarea
            rows="5"
            placeholder="reason"
            name="reason"
            value={formData.reason}
           required
            onChange={handleInputChange}
          />
        </div>
         <br />

<div className='d-flex flex-row '>
<button type="submit" className='mx-5'
onClick={handleSubmit}
>Submit</button>

<button type="submit" className='mx-5'>Reset</button>
</div>
      </form>
    </div>
  );
};

export default Shift;
