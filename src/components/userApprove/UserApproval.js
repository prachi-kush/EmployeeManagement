import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userApproval.css'
import axiosInstance from '../../validations/AxiosInstance'

const UserApproval = () => {
  const [data, setData] = useState({});
const token =JSON.parse(localStorage.getItem('token'));
const refreshToken= JSON.parse(localStorage.getItem('refreshToken'))
const headers={
  Authorization:`Bearer ${token}`,
  RefreshToken: refreshToken,
};
  useEffect(() => {
    getData();
    console.log("dataaaaa",data)
  }, []);

  const getData = async () => {
    try {
      const response = await axiosInstance.get('/admin/userList/false');
      setData(response.data);
      console.log(response.data)
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleAccept =async (id) => {
   
    try{
        const response= await axiosInstance.put(`/admin/approve/${id}`,data).then((res)=>{
            alert("user approved successfully")    
        getData()

            console.log("response",res.data)
        })
    } catch(err){
        console.log(err,"errrr")
    }
   
  };

  const handleRemove = async (id) => {
   try{
    const result=await axiosInstance.delete(`/admin/deleteUser/${id}`).then((res)=>{
        alert("removed user successfully")
        getData()
    })
   }catch(err){
    console.log(err)
   }
  };



  return (
    <div className="container">
      <h1>Approve Users</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td className="actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAccept(user._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(user._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserApproval;
