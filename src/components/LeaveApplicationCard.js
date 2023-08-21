import axios from 'axios';
import React, { useEffect, useState } from 'react';
import nodata from '../images/nodata.jpg'
import axiosInstance from '../validations/AxiosInstance';

const LeaveApplicationCard = () => {
    const [data, setData] = useState({});
    const [userData, setUserData] = useState({});
    const [leaveData, setLeaveData] = useState({});
     const [status,setStatus]=useState('pending')
    //  const token =JSON.parse(localStorage.getItem('token'));
    //  const refreshToken=JSON.parse(localStorage.getItem('refreshToken'))
    //  const headers={
    //    Authorization:`Bearer ${token}`,
    //    RefreshToken: refreshToken,

    //  };
    useEffect(() => {
      const token =JSON.parse(localStorage.getItem('token'));
// const headers={
//   Authorization:`Bearer ${token}`,
// };
      getData(status);
      console.log("dataaaaa",data.leaveData)
    }, []);
    const getData = async (status) => {
        try {
          const response = await axiosInstance.get(`/admin/leaveUsers/${status}`);
          setUserData(response.data.userData);
          setLeaveData(response.data.leaveData);
          console.log("response=============",response.data)
        } catch (err) {
          console.log("Error:", err);
        }
      };

      const handleAccept = async (id) => {
        
        console.log("iddddddddddd", id);
        try {
          const response = await axiosInstance.put(`/admin/leaveApprove/${id}`, data);
          alert("User leave approved successfully");
          getData();
          console.log("response", response.data);
        } catch (err) {
          console.error(err); // Log the error to the console for debugging
          alert("Failed to approve leave. Please try again later.");
        }
      };

      const handleRemove = async (id) => {
        
        console.log("iddddddddddd", id);
        try {
          const response = await axiosInstance.put(`/admin/rejectLeave/${id}`, data,);
          alert("User leave rejected successfully");
          getData();
          console.log("response", response.data);
        } catch (err) {
          console.error(err); // Log the error to the console for debugging
          alert("Failed to approve leave. Please try again later.");
        }
      };

  return (
    <div className='m-2'>

     <div className='d-flex flex-row'>
     <div className='col-3 '>
      
     <div className=' d-flex flex-column '>
<button className='btn btn-warning p-3 m-1'
        onClick={(e) => {
          getData('pending');
          setStatus('pending');
          
        }}
        disabled={status === 'pending'}
        >Pending Leaves</button>
      <button className='btn btn-success p-3 m-1'
        onClick={(e) => {
          getData('accepted');
          setStatus('accepted');
        }}
        disabled={status === 'accepted'}
        >Accepted Leaves</button>

        <button className='btn btn-danger p-3 m-1'
        onClick={(e) => {
          getData('rejected');
          setStatus('rejected');
        }}
        disabled={status === 'rejected'}
        >Rejected Leaves</button>


      </div>
      
      
      </div>
     {
      status!=='' &&
      <div className='col-9'><>
      { 
           userData.length>0 ? userData.map((user, index) => (
      <div className="leave-card border border-dark p-2 m-5 col-6">
       <div className="user-details d-flex flex-row justify-content-between">
        
         <div className="user-info col-6">
         <p><strong>Name:</strong> {user.name}</p>
           <p><strong>Email:</strong> {user.email}</p>
           <p><strong>Mobile:</strong> {user.number}</p>
         </div>
         <div className="user-image col-3">
           <img  src={user.imageUrl}  className="rounded-circle" alt="User" 
           style={{height:"80%",width:'100%'}}
           />
         </div>
       </div>
 
       { 
           leaveData.length>0 && leaveData.map((leave, index) => (
       <div className="leave-details">
         <h4>{index+1}. Leave Details</h4>
         <div className='border border-danger p-2 m-1'>
 
         <div className='d-flex flex-row  '>
         <p><strong>Date From:</strong> {leave.dateFrom}</p>
         <p  className='mx-3 '><strong>Date To:</strong> {leave.dateTo}</p>
         </div>
        <p><strong>Reason:</strong> {leave.description}</p>
        {status=='pending'&&
        <div className='d-flex flex-row  '>
         <button className='btn btn-primary rounded  '
            onClick={() => handleAccept(leave._id)}
         >Accept</button>
         <button className='btn btn-danger rounded mx-4 '
          onClick={() => handleRemove(leave._id)}
         >Reject</button>
         </div> }
         {status=='accepted'&&
        <div className='d-flex flex-row  '>
         <button className='btn btn-success rounded  '
          disabled
         >Accepted</button>
         
         </div> }
         {status=='rejected'&&
        <div className='d-flex flex-row  '>
         <button className='btn btn-danger rounded  '
           disabled
         >Rejected</button>
         
         </div> }
 
 
 
 
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
 </></div>
     }
     </div>
   


    </div>
   
  );
};

export default LeaveApplicationCard;
