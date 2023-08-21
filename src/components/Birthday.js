import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../validations/Header.css'

import TodayBirthday from './TodayBirthday';
import UpcomingBirthday from './UpcomingBirthday';
const Departments = () => {
    const [isOpen, setIsOpen] = useState(0);
   
    const SearchUser=()=>{
        console.log("search User")
    }

  return (
    <>
    <div style={{marginLeft:'20%'}}>
      <h1>Birthday This Month</h1>
      <h4 className='mx-5'>Search Here</h4>
      <div className='d-flex flex-row mx-5'>
<button 
onClick={()=>{setIsOpen(2)}}
className='btn btn-sm btn-primary'
>Today's</button>
<button
onClick={()=>{setIsOpen(1)}}
className='btn btn-sm btn-primary'

>This Month</button>

      </div>
   {isOpen===2 && <TodayBirthday/>}
   {isOpen===1 && <UpcomingBirthday/>}
   
    </div>
    </>
  )
}

export default Departments
