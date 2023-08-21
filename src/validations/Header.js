import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';


const Header = () => {
  const auth = JSON.parse(localStorage.getItem('admin'));
  const isApproved = auth && auth.isApproved; 
  const navigate = useNavigate();
  const logout = () => {
    alert('You are redirecting to the login page.');
    localStorage.clear();
    navigate('/admin/index');
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="justify-content-between flex-row d-flex">
          {auth ? (
            <div className="justify-content-start">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/home">
                        WorkFlow!!
                      </Link>
                    </li>
                    {auth && ( // Display these links only if user isApproved
                      <>
                      <h3 className='text-center' >Admin Portal</h3>
                      <div className="user-panel">
                          <Link className="admin-panel-button" onClick={() => logout()} to="/">
                            Logout
                          </Link>
                        </div>
                      </>
                    )}
                  </ul>
                </>
              </div>
            </div>
          ) : (
            <div className="justify-content-start">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li>
                      <Link className="nav-link text-white">
                        WorkFlow!!
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/admin/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/admin/signup">
                        Signup
                      </Link>
                    </li>
                  </ul>
                </>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
