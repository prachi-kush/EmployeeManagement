import React from 'react'
import Sidebar from '../validations/Sidebar'
import AddEmployee from './AddEmployee'

const Dashboard = () => {
  return (
    <div>
 <Sidebar/>
      {/* <div className='d-flex flex-row'>
        <div className='col-4'>
        <Sidebar/>
        </div>
        <div className='col-8 bg-danger m-5'>
        <AddEmployee/>
        </div>
      </div> */}
     
    </div>
  )
}

export default Dashboard
