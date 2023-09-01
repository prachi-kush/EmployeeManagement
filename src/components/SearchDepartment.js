import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'
import {Link} from 'react-router-dom'
import './searchUser.css'
import nodata from '../images/nodata.jpg'
import UserCart from './UserCart';

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
      <UserCart data={searchResults} inputValue={formData.department} />

    </div>
  );
};

export default SearchDepartment;
