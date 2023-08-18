import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../validation/AxiosInstance'; // Import your Axios instance

import './divColor.css';
import './leave.css';

const Leave = () => {
  const [value, onChange] = useState(new Date());
  const initialFormData = {
    leaveType: 'Choose',
    dateFrom: '',
    dateTo: '',
    description: ''
  };
  const [selectedDate, setSelectedDate] = useState(new Date()); // Use state for the selected date

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
    // const headers = {
    //   Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    //   RefreshToken: refreshToken,
    // };
  
    try {
      console.log("handle Submit");
      const response = await axiosInstance.post(`/user/applyLeave/${email}`
      , formData
      // , { headers }
      );
      console.log('Server response:', response.data);
      alert(response.data);
  
      // Show toaster notification on success
      toast.success('Your leave request has been sent for approval.', {
        position: "top-right",
        autoClose: 5000, // Set the duration for how long the toast will be displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-right",
        autoClose: 5000, // Set the duration for how long the toast will be displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error:', error.response.data);
    }
    // Optional: Reset the form after submission
    setFormData(initialFormData);
  };
  
  return (
    <>
    
    <div>

    <div className='container'>
      <form className='leaveform' onSubmit={handleSubmit}>
        <div className='divColor '>
          <h1>Apply For Leave</h1>
        </div>

        <div>
          <label>Leave Type:</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleInputChange}
            required
          >
            <option value="Choose">Choose</option>
            <option value="CasualLeave">Casual Leave</option>
           
          </select>

          <br /> <br />

          <label>Date From:</label>
          <input
            type="date"
            name="dateFrom"
            min={new Date().toISOString().split('T')[0]} // Set the minimum date to today's date
            value={formData.dateFrom}
            onChange={handleInputChange}
            required
          />

<br /> <br />

          <label>Date To:</label>
          <input
            type="date"
            name="dateTo"
            min={formData.dateFrom}
            value={formData.dateTo}
            onChange={handleInputChange}
            required
          />

<br /> <br />

          <label>Description:</label>
          <textarea
            rows="1"
            placeholder="Description"
            name="description"
            value={formData.description}
            required
            onChange={handleInputChange}
           
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>

   
    </div>
    </>
    
  );
};

export default Leave;
