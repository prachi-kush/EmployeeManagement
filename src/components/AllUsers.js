import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'
import './searchUser.css'
import nodata from '../images/nodata.jpg'
import UserCart from './UserCart';

const AllUsers = () => {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  console.log("formData",formData)

useEffect(()=>{
    fetchData();
     },[])

     const fetchData = async () => {
        try {
          const response = await axios.get('/user/getUser');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
  
  
  return (
    <div>
         <UserCart data={data} inputValue={data} />


    </div>
  );
};

export default AllUsers;
