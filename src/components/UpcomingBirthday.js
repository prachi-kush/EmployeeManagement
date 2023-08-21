import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dummy from '../images/dummyUser.png';
import axiosInstance from '../validations/AxiosInstance'

const UpcomingBirthday = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUpcomingBirthdays();
  }, []);

  const fetchUpcomingBirthdays = async () => {
    try {
      const response = await axiosInstance.get('/user/birthday'); // Replace with your API endpoint URL
      setUsers(response.data.upcomingBdays);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const month = parsedDate.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  const tableStyle = {
    width: '100%',
    border: '1px solid #ccc',
    borderCollapse: 'collapse',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
  };

  const thStyle = {
    padding: '12px 20px',
    border: '1px solid #ccc',
    backgroundColor: 'rgb(95, 28, 28)',
    background: 'linear-gradient(rgb(92, 58, 58), rgb(230, 84, 22))',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '12px 20px',
    border: '1px solid #ccc',
    textAlign: 'left',
  };

  const trHoverStyle = {
    ':hover': {
      backgroundColor: '#d2a8a8',
      cursor: 'pointer',
    },
  };

  const noBirthdaysMessageStyle = {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '20px',
  };

  return (
    <div style={{ maxWidth: '100%', margin: '0', padding: '20px' }}>
      <h4 style={{ textAlign: 'left', fontSize: '24px', marginBottom: '20px' }}>
        Birthdays This Month
      </h4>
      {users.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Profile</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Date of Birth</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={trHoverStyle}>
                <td>
                  <img
                    src={user.imageUrl ? user.imageUrl : dummy}
                    alt="Profile"
                    style={{ height: '70px', width: '70px', borderRadius: '35px' }}
                  />
                </td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{formatDate(user.dob)}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={noBirthdaysMessageStyle}>No upcoming birthdays this month.</p>
      )}
    </div>
  );
};

export default UpcomingBirthday;
