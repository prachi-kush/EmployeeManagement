import React from 'react'
import './index.css'
import users from '../images/users.png';
import emp from '../images/employee.jpeg'
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const auth = JSON.parse(localStorage.getItem('admin'));

  return (
   <>
    <div className='d-flex flex-row'>
        <div className='col-6  align-items-center justify-content-center p-5'>
       <div style={{marginTop:'200px'}}>
       <h2 className='text-primary'>Admin Panel</h2>

       <h2 className='textColor'>Employee Management System</h2>
       </div>
{!auth ? 
       <>
       <div>
       <p>Log in to use TechWorks employee management system.</p>

       </div>
       <Link to="/admin/login" className='btn btn-primary btn-rounded' >Login</Link>
       </>
:
<div>
       <p>Wel-Come to the TechWorks employee management system.</p>

<div>
       <Link to='/admin/home' className='btn btn-primary'><h5>Dashboard</h5></Link>
</div>
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
    </>
   
  )
}

export default Index
