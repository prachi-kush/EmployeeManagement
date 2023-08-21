import React, { useEffect, useState } from 'react';
import LeaveApplicationCard from './LeaveApplicationCard';

const LeaveApproval = () => {



  return (
    <div style={{marginLeft:'20%'}}>
      <h1 className='tetx-center'>Employee Leaves</h1>
      
      <LeaveApplicationCard/>
      
    
    </div>
  );
};

export default LeaveApproval;
