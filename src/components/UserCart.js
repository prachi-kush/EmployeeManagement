import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './searchUser.css'
import nodata from '../images/nodata.jpg'
const UserCart = ({ data, inputValue }) => {
    console.log(data)
    const navigate = useNavigate();
    const updateProfile = async (email) => {
        navigate(`/admin/updateProfile/${email}`);
      };
      
    return (
        <div>
            <div>
                {
                    data && data.length > 0 ? (data.map((user, index) => (
                        <div className="container leave-card border border-dark p-2 m-5"
                            style={{ width: '800px' }}
                        >
                            <div className="user-details d-flex flex-row justify-content-between">
                                <div className="user-info col-6">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Mobile:</strong> {user.number}</p>
                                </div>
                                <div className="user-image ">
                                    <img src={user.imageUrl} className="rounded-circle" alt="User"
                                        style={{ height: "80%", width: '100%' }}
                                    />
                                </div>

                            </div>
                            <div className='d-flex flex-row  '>
                                <p><strong>Mother Name:</strong> {user.motherName}</p>
                                <p className='mx-3 '><strong>Father Name:</strong> {user.fatherName}</p>
                            </div>
                            <div className='d-flex flex-row  '>
                                <p><strong>Gender:</strong> {user.gender}</p>
                                <p className='mx-3 '><strong>Joining Date:</strong> {user.joiningDate}</p>
                                <p className='mx-3 '><strong>Shift Time:</strong> {user.shiftType}</p>

                            </div>

                            <div className='d-flex flex-row  '>
                                <p className=''><strong>Department:</strong> {user.department}</p>

                                <p className='mx-3'><strong>Education:</strong> {user.education}</p>

                                <p className='mx-3 '><strong>Skills:</strong> {user.skills}</p>
                            </div>
                            <div className='d-flex flex-row  '>
                                <button className='mx-3 bg-primary'
                                    onClick={() => updateProfile(user.email)}
                                >Update Employee</button>
                                {/* <button className='mx-3'>Delete Employee</button> */}
                            </div>
                        </div>
                    )))
                        :
                        (
                            <div className="justify-content-center">
                                {inputValue ? (
                                    <div>
                                        {/* <h4>No user found</h4> */}
                                        <img
                                            className='mt-5'
                                            src={nodata} alt="User" style={{ height: '30%', width: '30%', marginLeft: '30%' }} />
                                    </div>
                                ) : null}
                            </div>
                        )

                }
            </div>
        </div>
    )
}

export default UserCart

