import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../validations/AxiosInstance'

const Feedback = () => {
    const [feedbackData, setfeedbackData] = useState({});
     const [feedbackType,setfeedbackType]=useState('COMPLAINT')

    useEffect(() => {
      getData(feedbackType);
     
    }, []);
    const getData = async (feedbackType) => {
        try {
          const response = await axiosInstance.get(`/admin/users-feedback/${feedbackType}`);
          setfeedbackData(response.data);
                 } catch (err) {
          console.log("Error:", err);
        }
      };


  return (
    <div className='m-5'>

     <div className='d-flex flex-row'>
     <div className='col-3 '>
      
     <div className=' d-flex flex-column '>
<button className='btn btn-warning p-3 m-1'
        onClick={(e) => {
          getData('COMPLAINT');
          setfeedbackType('COMPLAINT');
        }}
        > COMPLAINT</button>
      <button className='btn btn-success p-3 m-1'
        onClick={(e) => {
          getData('SUGGESTION');
          setfeedbackType('SUGGESTION');
        }}
        >SUGGESTION</button>

        <button className='btn btn-danger p-3 m-1'
        onClick={(e) => {
          getData('FEEDBACK');
          setfeedbackType('FEEDBACK');
        }}
        >FEEDBACK</button>


      </div>
      
      
      </div>
      <div className='col-9'><>
     { 
          feedbackData.length>0 ? feedbackData.map((data, index) => (
     <div className="leave-card border border-dark p-2 m-5 col-6">
      <div className="user-details d-flex flex-row justify-content-between">
       
        <div className="user-info col-6">
        <h6><strong>Feedback Type:</strong> {data.feedbackType}</h6>
          <p ><strong className='text-danger'>Issue:</strong > {data.issue}</p>
          <p><strong className='text-success'>Solution:</strong> {data.solution}</p>
         {data.department && <p><strong className='text-dark'>Department:</strong> {data.department}</p>}
         {data.myname &&  <p><strong className='text-dark'>Name:</strong> {data.myname}</p>}

        </div>
      
      </div>

    </div>
          ))
          :
          <h1>No Data</h1>
}
</></div>
     </div>
   


    </div>
   
  );
};

export default Feedback;
