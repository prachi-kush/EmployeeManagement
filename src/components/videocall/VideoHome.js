import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../validations/AxiosInstance'
// import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

//   const handleJoinRoom = useCallback(() => {
//     navigate(`/videoRoom/${value}`);
//   }, [navigate, value]);

const handleJoinRoom = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/videoCall/join', { roomId: value });
    if (response.status === 200) {
        navigate(`/videoRoom/${value}`);
      } else {
        console.error('Failed to join video call:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error joining video call:', error);
    }
  }, [navigate, value]);

  return (
    <div className="container m-5 " style={{width:'50%', margin:'10%',alignSelf:'center' ,backgroundColor:'red'}}>
      <h1>Welcome to the Video Conference</h1>
      <div className="input-container">
        <label htmlFor="roomCode">Enter Room Code:</label>
        <input
          type="text"
          id="roomCode"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter code"
        />
        <button onClick={handleJoinRoom} className='bg-danger'>Join</button>
      </div>
    </div>
  );
};

export default Home;
