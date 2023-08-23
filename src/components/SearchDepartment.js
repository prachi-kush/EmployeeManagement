import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'
import {Link} from 'react-router-dom'
import './searchUser.css'
import nodata from '../images/nodata.jpg'

const SearchDepartment = () => {
  const [formData, setFormData] = useState({
    department: ''
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (!value) {
      setSearchResults([]); // Clear the search results if the input is empty
    } else {
      try {
        const response = await axios.get(`/user/searchUser/${value}`);
        console.log("response", response);
        setSearchResults(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle the 404 error (data not found)
          setSearchResults([]);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    }
  };

  return (
    <div>
       <div className="searchContainer">
      <form className="form-container  ">
        <label>Department: </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          className='col-3'
        >
          <option value="">Select Department</option>
          <option value="HR Department">HR Department</option>
          <option value="Cloud Computing">Cloud computing</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="IT Department">IT Department</option>
          <option value="Software Development">Software Development</option>
          <option value="Web Development">Web Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>
      </form>
      </div>
      <div>
      

        {searchResults.length > 0 ? (
          searchResults.map((user, index) => (
            <div className="leave-card border border-dark p-2 m-5" key={user._id}>
            <div className="user-details d-flex flex-row justify-content-between">
      
      <div className="user-info col-6">
      <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.number}</p>
      </div>
      <div className="user-image ">
        <img  src={user.imageUrl}  className="rounded-circle" alt="User" 
        style={{height:"80%",width:'100%'}}
        />
      </div>
     
    </div>
    <div className='d-flex flex-row  '>
      <p><strong>Mother Name:</strong> {user.motherName}</p>
      <p  className='mx-3 '><strong>Father Name:</strong> {user.fatherName}</p>
      </div>
      <div className='d-flex flex-row  '>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p  className='mx-3 '><strong>Joining Date:</strong> {user.joiningDate}</p>
      </div>
      
      <div className='d-flex flex-row  '>
      <p  className=''><strong>Department:</strong> {user.department}</p>

      <p  className='mx-3'><strong>Education:</strong> {user.education}</p>

      <p  className='mx-3 '><strong>Skills:</strong> {user.skills}</p>
      </div>
      <div className='d-flex flex-row align-items-center'>
        <button
          className="btn btn-primary"
          // onClick={handleVideoChat}
        >
          <Link to ='/videoHome' className='text-dark'> Video Chat</Link>
         
        </button>
      </div>
            </div>
          ))
        ) : (
          (
            <div className="justify-content-center">
              {formData.department ? (
                <div>
                 <img 
                  className='mt-5'
                  src={nodata} alt="User" style={{ height: '30%', width: '30%', marginLeft: '30%' }} />
                </div>
              ) : null}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchDepartment;
