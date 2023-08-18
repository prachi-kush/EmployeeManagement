import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchDepartment from './SearchDepartment';

const Departments = () => {
 
return (
    <>
    <div style={{height:"20%",width:'50%',marginLeft:'10%'}}>

        <div className='divColor container mt-5'>
        <h4>Search Employee</h4>
        </div>
     <SearchDepartment/>
    </div>
    </>
  )
}

export default Departments
