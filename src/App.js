import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './validations/Header';
import AllEmployee from './components/AllEmployee';
import LeaveApproval from './components/LeaveApproval';
import ShiftApproval from './components/ShiftApproval';
import UserApproval from './components/userApprove/UserApproval';
import Login from './validations/Login';
import Signup from './validations/Signup';
import Sidebar from '../src/validations/Sidebar';
import Home from './validations/Home';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import Feedback from './components/Feedback';
import Birthday from './components/Birthday';
import AddEmployee from './components/AddEmployee';
import Index from '../src/validations/Index';
import VideoHome from '../src/components/videocall/VideoHome';
import VideoRoom from '../src/components/videocall/VideoRoom'

import PrivateComponent from './validations/PrivateComponent';
import PrivatePageWrapper from './validations/PrivatePageWrapper';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('isLoggedIn: ', isLoggedIn);

  return (
    <div className="App">
      <BrowserRouter>
         <Header />
        <ToastContainer />

        {isLoggedIn && <Sidebar />}

        <Routes>
          <Route path="/admin/login" element={<Login/>} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/" element={<Index />} />
         

          <Route
            element={
              <PrivatePageWrapper>
                <PrivateComponent />
              </PrivatePageWrapper>
            }
          >
            <Route path="admin/home" element={<Home />} />
            <Route path="admin/leave" element={<LeaveApproval />} />
            <Route path="admin/shift" element={<ShiftApproval />} />
            <Route path="admin/contact" element={<AllEmployee />} />
            <Route path="admin/userApproval" element={<UserApproval />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/departments" element={<Departments />} />
            <Route path="admin/feedback" element={<Feedback />} />
            <Route path="admin/birthday" element={<Birthday />} />
            <Route path="admin/addemployee" element={<AddEmployee />} />
            <Route path='/videoHome' element={<VideoHome/>}/>
           <Route path='/videoRoom/:roomId' element={<VideoRoom/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;