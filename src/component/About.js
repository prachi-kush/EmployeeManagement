import React from 'react'
import beni1 from './images/benefit.png';
import beni2 from './images/beni2.webp';
import beni3 from './images/beni3.png';
import beni4 from './images/beni4.png';
import AboutText from './modules/AboutText';

const About = () => {

  return (
    <div>
      <AboutText/>
         <h3 className='text-center my-5 text-dark bg-secondary container'>Employee Benefits</h3>

      <div style={{alignItems:'center' ,marginLeft:'20%',marginTop:'5%'}}>
   <img src={beni4} alt='welcome image' 
   style={{height:'600px',width:'900px',alignSelf:"center",
      borderRadius:'200px',}}/>
      </div>
      <h3 className='text-center my-5 text-dark container'>Employee benefits are the perks, compensations, bonuses, etc. that employers provide to employees to 
         increase job satisfaction and reduce employee turnover. The most popular employee 
         benefits include private life insurance, travel allowances, paid time off, parental leave, etc.</h3>

{/* <h3 className='text-center my-5 text-dark'>Employee Benefits</h3> */}
      {/* <div style={{alignItems:'center' ,marginLeft:'20%',marginTop:'5%'}}>
   <img src={beni3} alt='welcome image' 
   style={{height:'600px',width:'900px',alignSelf:"center",
      borderRadius:'200px',}}/>
      </div> */}

      {/* <h3 className='text-center my-5 text-dark'>Employee Benefits</h3> */}
      <div style={{alignItems:'center' ,marginLeft:'20%',marginTop:'5%'}}>
   <img src={beni2} alt='welcome image' 
   style={{height:'600px',width:'900px',alignSelf:"center",
      borderRadius:'200px',}}/>
      </div>

      <h3 className='text-center my-5 text-dark'>What we are providing ?</h3>
      <div style={{alignItems:'center' ,marginLeft:'20%',marginTop:'5%'}}>
   <img src={beni1} alt='welcome image' 
   style={{height:'600px',width:'900px',alignSelf:"center",
      borderRadius:'200px',marginBottom:'10%'}}/>
      </div>
    </div>
  )
}

export default About
