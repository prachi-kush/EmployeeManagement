import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../validation/AxiosInstance';
import './videoHome.css'; // Import your CSS file here if needed

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleJoinRoom = useCallback(() => {
    navigate(`/videoRoom/${value}`);
  }, [navigate, value]);

  return (
    <div className="home-container1">
      {/* Content for your Home page */}
      <h1>Welcome to the Video Conference</h1>
      <div className="input-container1">
        <label htmlFor="roomCode">Enter the code to Join Meeting Room:</label>
        <input
          type="text"
          id="roomCode"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter code"
          required
        />
        <button onClick={handleJoinRoom} className='bg-danger mt-3'>Join Room</button>
      </div>
    </div>
  );
};

export default Home;
