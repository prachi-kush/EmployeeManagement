import React from 'react'
import './home.css'
import users from '../images/users.png';
import emp from '../images/employee.jpeg'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const auth = JSON.parse(localStorage.getItem('user'));

  return (
   <div className='bg-white'>
    <div className='d-flex flex-row'>
        <div className='col-6  align-items-center justify-content-center p-5'>
       <div style={{marginTop:'200px'}}>
       <h2 className='textColor'>Employee Management System</h2>
       </div>
{!auth ? 
       <>
       <div>
       <p>Log in to use TechWorks employee management system.</p>

       </div>
       <Link to="/login" className='btn btn-primary btn-rounded' >Login</Link>
       </>
:
<div>
       <p>Wel-Come to the TechWorks employee management system.</p>

       </div>
}

       <div style={{height:'300px',width:'300px',
             backgroundImage:`url(${emp})`,
            backgroundRepeat:'no-repeat',backgroundSize:'contain'}}></div>
     </div>
    
     <div 
    className='imagehome col-6'
    >
            <div style={{height:'1000px',width:'800px',
            backgroundImage:`url(${users})`,
            backgroundRepeat:'no-repeat',backgroundSize:'contain'}}></div>

     
    </div>
    </div>
    </div>
   
  )
}

export default Home
