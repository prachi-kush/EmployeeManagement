import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TodayBirthday.css'; // Import the CSS file for styling
import dummy from '../images/dummyUser.png'

const TodayBirthday = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTodayBirthdays();
  }, []);

  const fetchTodayBirthdays = async () => {
    try {
      const response = await axios.get('http://localhost:6700/user/birthday'); // Replace with your API endpoint URL
      console.log(response.data, 'dataaaaaa');
      setUsers(response.data.todayBirthdays);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="m-5 p-2 bg-light">
      <h4>Today's Birthday</h4>
      {users.length > 0 ? (
        <div className="d-flex flex-row">
          {users.map((user) => (
            <div key={user.id} className="m-3">
              <img src={user.imageUrl? user.imageUrl : dummy} alt="User" className="user-image"
               />
              <p className="user-name">{user.name}</p>
              <p className="">{user.email}</p>
              <p className="">{user.department}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="no-birthdays-message">No birthdays today.</p>
      )}
    </div>
  );
};

export default TodayBirthday;
