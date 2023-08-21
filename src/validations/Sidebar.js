import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/admin/home" className={location.pathname === '/admin/home' ? 'active' : ''}>Dashboard</Link>
      <Link to="/admin/addemployee" className={location.pathname === '/admin/addemployee' ? 'active' : ''}>Add Employee</Link>
      <Link to="/admin/departments" className={location.pathname === '/admin/departments' ? 'active' : ''}>All Department</Link>
      <Link to="/admin/userApproval" className={location.pathname === '/admin/userApproval' ? 'active' : ''}>Verify Employee's</Link>
      <Link to="/admin/leave" className={location.pathname === '/admin/leave' ? 'active' : ''}>Employee's Leaves</Link>
      <Link to="/admin/shift" className={location.pathname === '/admin/shift' ? 'active' : ''}>Employee's Shift</Link>
      <Link to="/admin/feedback" className={location.pathname === '/admin/feedback' ? 'active' : ''}>Employee's Feedback</Link>
      <Link to="/admin/birthday" className={location.pathname === '/admin/birthday' ? 'active' : ''}>Employee's Birthday</Link>

    </div>
  );
};

export default Sidebar;
