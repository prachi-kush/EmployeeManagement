import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../validations/Header.css'
import SearchDepartment from './SearchDepartment';
import Search from '../components/Search'
const Departments = () => {
    const [isOpen, setIsOpen] = useState(0);
   
    const SearchUser=()=>{
        console.log("search User")
    }
  return (
    <>
    <div style={{marginLeft:'20%'}}>
      <h1>All Department & Employee Details</h1>
      <h4 className='mx-5'>Search Here</h4>
      <div className='d-flex flex-row mx-5'>
<button 
onClick={()=>{setIsOpen(2)}}
className='btn btn-sm btn-primary'
>search by Name</button>
<button
onClick={()=>{setIsOpen(1)}}
className='btn btn-sm btn-primary'

>search by Department</button>

      </div>
   {isOpen===2 && <Search/>}
   {isOpen===1 && <SearchDepartment/>}
   
    </div>
    </>
  )
}

export default Departments
