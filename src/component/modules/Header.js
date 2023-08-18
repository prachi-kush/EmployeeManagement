import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const auth = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    checkApprovalStatus();
  }, [auth]); // Call this effect whenever the auth variable changes (when the user logs in or out)

  const checkApprovalStatus = () => {
    // If user is logged in, check their approval status
    if (auth) {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      console.log("currentUser",currentUser)
      setisApproved(currentUser.isApproved)
      // console.log('currentUser.isApproved: ', currentUser.isApproved);
    }
  };


  const logout = () => {
    alert('You are redirecting to the login page.');
    localStorage.clear();
    navigate('/login');
  };


  const handleDepartmentMouseEnter = () => {
    setIsDepartmentOpen(true);
  };

  const handleDepartmentMouseLeave = () => {
    setIsDepartmentOpen(false);
  };

  const handleLeaveMouseEnter = () => {
    setIsLeaveOpen(true);
  };

  const handleLeaveMouseLeave = () => {
    setIsLeaveOpen(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <Link className="navbar-brand" to="/">
          WorkFlow!!
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            {auth &&

            <>
            {isApproved==true && auth ? ( // Display these links only if user isApproved
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li
                  className={`nav-item dropdown ${isDepartmentOpen ? 'show' : ''}`}
                  onMouseEnter={handleDepartmentMouseEnter}
                  onMouseLeave={handleDepartmentMouseLeave}
                >
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isDepartmentOpen ? 'true' : 'false'}
                  >
                    Department
                  </Link>
                  <div className={`dropdown-menu ${isDepartmentOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to="/department">
                      Search Employee
                    </Link>
                    <Link className="dropdown-item" to="/birthday">
                      Birthday This Month
                    </Link>
                   
                  </div>
                </li>
                <li
                  className={`nav-item dropdown ${isLeaveOpen ? 'show' : ''}`}
                  onMouseEnter={handleLeaveMouseEnter}
                  onMouseLeave={handleLeaveMouseLeave}
                >
                  <Link
                    className="nav-link dropdown-toggle"
                    
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isLeaveOpen ? 'true' : 'false'}
                  >
                    Leave and Attendance
                  </Link>
                  <div className={`dropdown-menu ${isLeaveOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to="/leave">
                      Leave
                    </Link>
                    <Link className="dropdown-item" to="/attandance">
                      Attendance
                    </Link>
                    <Link className="dropdown-item" to="/shift">
                      Shifts
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <button className="nav-item btn btn-sm bg-warning">
                  <Link className="nav-link" onClick={() => logout()} to="/">
                    Logout
                  </Link>
                </button>
              </>
            )
          :
          <>
           <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/approval">
                    Approval
                  </Link>
                </li>
                <button className="nav-item btn btn-sm bg-warning">
                  <Link className="nav-link" onClick={() => logout()} to="/">
                    Logout
                  </Link>
                </button>
          </>
          }
            </>

            }
            {!auth && (
              <>
              <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
