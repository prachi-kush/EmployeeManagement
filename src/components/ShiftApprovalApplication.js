import axios from 'axios';
import React, { useEffect, useState } from 'react';
import nodata from '../images/nodata.jpg'
import axiosInstance from '../validations/AxiosInstance';

const ShiftApprovalApplication = () => {
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [shiftData, setshiftData] = useState({});
 
  // const token =JSON.parse(localStorage.getItem('token'));
  // const refreshToken=JSON.parse(localStorage.getItem('refreshToken'))

  // const headers={
  //   Authorization:`Bearer ${token}`,
  //   RefreshToken: refreshToken,
  // };

  useEffect(() => {
    getData();
    console.log("dataaaaa", data.shiftData)
  }, []);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/admin/getShiftData/false`,);
      setUserData(response.data.userData);
      setshiftData(response.data.shiftData);
      
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axiosInstance.put(`/admin/shiftApprove/${id}`, data);
      alert("Shift change request approved successfully");
      getData();
   
    } catch (err) {
      console.error(err); // Log the error to the console for debugging
      alert("Failed to approve leave. Please try again later.");
    }
  };

  const handleRemove = async (id) => {
    try {
      const result = await axios.delete(`/admin/deleteUser/${id}`).then((res) => {
        alert("shift change request rejected successfully")
        getData()
      })
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      {
        userData.length > 0 ? userData.map((user, index) => (
          <div className="leave-card border border-dark p-2 m-5 col-6">
            <div className="user-details d-flex flex-row justify-content-between">

              <div className="user-info col-6">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile:</strong> {user.number}</p>
              </div>
              <div className="user-image col-3">
                <img src={user.imageUrl} className="rounded-circle" alt="User"
                  style={{ height: "80%", width: '100%' }}
                />
              </div>
            </div>

            {
              shiftData.length > 0 && shiftData.map((leave, index) => (
                <div className="leave-details">
                  <h4>{index + 1}. Shift Change Details</h4>
                  <div className='border border-danger p-2 m-1'>

                    <div className='d-flex flex-row  '>
                      <p className='mx-2'><strong>Date From:</strong> {leave.dateFrom}</p>
                      <p><strong>Shift Time</strong> {leave.shiftType}</p>

                    </div>
                    <p><strong>Reason:</strong> {leave.reason}</p>
                    <div className='d-flex flex-row  '>
                      <button className='btn btn-primary rounded  '
                        onClick={() => handleAccept(leave._id)}
                      >Accept</button>
                      <button className='btn btn-danger rounded mx-4 '
                        onClick={() => handleRemove(leave._id)}
                      >Reject</button>
                    </div>

                  </div>

                </div>
              ))}
          </div>
        ))
          :
          <div>
            <img
              className='mt-5'
              src={nodata} alt="User" style={{ height: '30%', width: '30%', marginLeft: '30%' }} />
          </div>
      }




    </>

  );
};

export default ShiftApprovalApplication;
