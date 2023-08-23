import React, { useState } from 'react';
import './divColor.css';
import { toast } from 'react-toastify';
import axiosInstance from '../validation/AxiosInstance'; // Import your Axios instance

import contact2 from '../images/contact2.png'
import contact5 from '../images/contact5.avif'
import contact3 from '../images/contact3.jpeg'
import axios from 'axios';

const Contact = () => {
 const [formData, setFormData] = useState({});
 const [showModal, setShowModal] = useState(false);
 const initialFormData = {
  feedbackType: '',
  department: '',
  issue: '',
  solution: '',
  myname: ''
};

 const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("name : value", name, value)
};

const resetForm = () => {
  setFormData(initialFormData);
};

  const handleSubmit = async (event) => {
    console.log("handleSubmit")
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/user/feedback", formData);
      console.log("api response", response.data); // Use response.data to access the response payload
      handleCloseModal()

      toast.success('Your request submitted successfully.', {
        position: "top-right",
        autoClose: 5000, // Set the duration for how long the toast will be displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      resetForm();
     
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000, // Set the duration for how long the toast will be displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("error", err);
    }
  };
  

  return (
       <div>
    
      <div className='form mt-5'>
        <div className='divColor justify-content-between d-flex flex-row'>
          <h4>How can we help you?</h4>
          <button className='btn btn-warning mx-5 '
          onClick={handleOpenModal}
          >
            <h4 >Click here</h4>
          </button>
        </div>
        <div className='m-5'>
         <h4>-You are facing an issue?</h4>
         <h4>-You want to submit feedback?</h4>
         <h4>-You want to give suggestion?</h4>
         
        </div>

        <div style={{ alignItems: 'center',  }}>
        <img
       
          src={contact5}
          alt='welcome image'
          style={{ height: '505px', width: '50%', alignSelf: 'center', }}
        />
      </div>
      </div>

      {showModal && (
        <>
        <div className="modal-backdrop " style={{ display: 'block', backdropFilter: 'blur(5px)' }}>
          <div className="modal " tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title divColor">Describe Issue/Solution</h5>
                  <button  type="button" className="close bg-danger" onClick={handleCloseModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Add necessary text fields or UI elements here */}
                  <div className="App-content">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="feedbackType">Objective *</label>
            <select id="feedbackType" name="feedbackType"
            value={formData.feedbackType} onChange={handleInputChange}
            required
            >
              <option value="">Choose</option>
              <option value="FEEDBACK">Feedback</option>
              <option value="SUGGESTION">Suggestion</option>
              <option value="COMPLAINT">Complaint</option>
            </select>
          </div>

          <div>
            <label htmlFor="department">Is it related to any Specific Department? (Optional)</label>
            <select id="department" name="department"
            value={formData.department} onChange={handleInputChange}
            >
              <option value="">N/A</option>
              <option value="21">Bench</option>
              <option value="4">Business Development</option>
              <option value="4">HR Department</option>
              <option value="4">Business Development</option>
              <option value="4">Digital Marketing</option>
              <option value="4">Testing Team</option>
              <option value="4">IT Development</option>
             
            </select>
          </div>

          <div>
            <label htmlFor="issue">Brief about your Input *</label>
            <textarea
              rows="6"
              cols="70"
              id="issue"
              name="issue"
              value={formData.issue} onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="solution">What do you think, how can we solve it? (Optional)</label>
            <textarea
              rows="6"
              cols="70"
              id="solution"
              name="solution"
              value={formData.solution} onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="myname">Your Name, if you like to discuss further (Optional)</label>
            <input
              type="text"
              id="myname"
              name="myname"
              maxLength="50"
              value={formData.myname} onChange={handleInputChange}
            />
          </div>

          <div>
            <input className='divColor mt-3' type="submit" value="Submit" />
          </div>
        </form> 
      </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>




   
        </>
      )}
    </div>
  );
};

export default Contact;
