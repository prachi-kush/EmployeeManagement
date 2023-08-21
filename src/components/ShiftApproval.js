import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShiftApprovalApplication from './ShiftApprovalApplication';

const ShiftApproval = () => {

  return (
    <div style={{marginLeft:'20%'}}>
      <h1 className='tetx-center'>Approve Shift</h1>
     <ShiftApprovalApplication/>
    </div>
  );
};

export default ShiftApproval;
