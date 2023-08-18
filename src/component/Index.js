import React, { useState } from 'react'
import LoginForm from './validation/Login'
import SignupForm from './validation/Signup'
import Login from './validation/Login'
// import './background.css';

const Index = () => {
    const [show,setShow]=useState(0)
  return (
    <div className='bg-white mt-5'>
<div className='flex d-flex flex-row '>
<h1>Welcome to our Website</h1>

</div>

<Login/>
    </div>

    
  )
}

export default Index
