import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'

import dummy from '../images/images/addem.png';
import leaves from '../images/images/em2.png';
import total from '../images/total.jpg';
import shift from '../images/shift.jpg';
import approve from '../images/approve.png';
import feedback from '../images/feedback.png';


import leave from '../images/leave.png'; // Add the image for the second card
import './Home.css'
const Home = () => {
  const [data, setData] = useState(0);
  useEffect(() => {
    totalEmployee();
  }, []);

  const totalEmployee = async () => {
    try {
      const result = await axios.get('/user/getuser/total');
     
      setData(result.data);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
  <>
    <div className='home-container d-flex flex-row mr-5' style={{ marginLeft: '20%', marginTop: '5%' }}>
      <div className='d-flex flex-row employee-card card1 '>
        <div className='avatar'>
          <img src={dummy} alt='dummy' 
          className='avatar-image'
           />
        </div>
        <div>
          <Link to='/admin/addemployee'><h5>Add Employee</h5></Link>
        </div>
      </div>


      <div className='d-flex flex-row employee-card card2 mx-5 '>
        <div>
          <img src={total} alt='dummy' className='avatar-image' />
        </div>
        <div>
          <h5 to=''>Total Employees: {data}</h5>
        </div>
      </div>
    </div>
    <div className='home-container d-flex flex-row mr-5' style={{ marginLeft: '20%', marginTop: '5%' }}>
      <div className='d-flex flex-row employee-card card3 '>
        <div className='avatar'>
          <img src={leave} alt='dummy' className='avatar-image' />
        </div>
        <div>
          <Link to='/admin/leave'><h5>Pending Leaves</h5></Link>
        </div>
      </div>


      <div className='d-flex flex-row employee-card card4 mx-5 '>
        <div>
          <img src={shift} alt='dummy' className='avatar-image' />
        </div>
        <div>
        <Link to='/admin/shift'><h5 to=''>Approve Shift</h5></Link>  
        </div>
      </div>
    </div>
    <div className='home-container d-flex flex-row mr-5' style={{ marginLeft: '20%', marginTop: '5%' }}>
      <div className='d-flex flex-row employee-card card5 '>
        <div className='avatar'>
          <img src={approve} alt='dummy' className='avatar-image' />
        </div>
        <div>
          <Link to='/admin/userApproval'><h5>Approve Employee</h5></Link>
        </div>
      </div>


      <div className='d-flex flex-row employee-card card6 mx-5 '>
        <div>
          <img src={feedback} alt='dummy' className='avatar-image' />
        </div>
        <div>
        <Link to='/admin/feedback'><h5 to=''>Feedbacks</h5></Link>  
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
