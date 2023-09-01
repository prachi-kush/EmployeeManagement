import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'
import './searchUser.css'
import nodata from '../images/nodata.jpg'
import UserCart from './UserCart';

const Search = () => {
  const [formData, setFormData] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  console.log("formData",formData)

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  
    if (!value) {
      setSearchResults([]); // Clear the search results if the input is empty
    } else {
      try {
        const response = await axios.get(`/user/getUser/${value}`);
  
        // Check if response.data exists and is an array before filtering and sorting
        if (Array.isArray(response.data)) {
          const filteredAndSortedResults = response.data
            .filter((item) => item.name && item.name.toUpperCase().startsWith(value.toUpperCase()))
            .sort((a, b) => {
              const nameA = a.name.toUpperCase(); // Convert to uppercase for case-insensitive sorting
              const nameB = b.name.toUpperCase();
              return nameA.localeCompare(nameB);
            });
  
          setSearchResults(filteredAndSortedResults);
        } else {
          // Handle the case where response.data is not an array
          console.error('Invalid data received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  
  return (
    <div>
      <div className="searchContainer">
        <form
          className="form-container">
          <label>Employee: </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Enter Employee Name"
          />
        </form>
      </div>
      <UserCart data={searchResults} inputValue={formData.name} />

    </div>
  );
};

export default Search;
