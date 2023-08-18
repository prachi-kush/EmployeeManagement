import React, { useState } from 'react';
import welcome from '../images/erp2.jpg';
import './divColor.css';
import { Link, useNavigate } from 'react-router-dom';
import UpcomingBirthday from './UpcomingBirthday';
import TodayBirthday from './TodayBirthday';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.clear();
      navigate('/home'); 
    }
  };

  return (
    <div style={{ alignItems: 'center' }}>
     
      <div style={{ alignItems: 'center',  }}>
        <img
       
          src={welcome}
          alt='welcome image'
          style={{ height: '500px', width: '100%', alignSelf: 'center',backgroundSize:'cover' }}
        />
      </div>

<div className='m-5 p-3 bg-light border border-dark'>
<p>We deeply value our employees and their feedback is essential to us. We have created a platform where you can anonymously share your valuable feedback, suggestions, or any concerns you might have. Your input will play a crucial role in helping us improve and provide you with the best possible experience.

Please use the following link to access the feedback platform-  <Link to='/contact' className=''>here </Link>

Your contributions will be treated with utmost confidentiality, and we encourage you to be open and honest. Your feedback will assist us in making positive changes and ensuring a better work environment for everyone.

Thank you for being a part of our team and helping us grow together. 
We look forward to hearing from you!</p>
</div>
      
<TodayBirthday/>
    </div>
  );
};

export default Dashboard;
