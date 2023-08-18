import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ap2 from '../images/ap2.avif';

const Approval = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isApproved, setisApproved] = useState(false);

  useEffect(() => {
    gateData();
  }, []);

  const gateData = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('currentUser: ', currentUser);
    const email = currentUser[0].email;
    console.log('currentUser.email: ', currentUser[0].email);
    try {
      const result = await axios.get(`http://localhost:6700/user/searchuser/${email}`)
      // .then(res=>{
      //   console.log(res.data,"data")
      // });
      console.log('result.data.isApproved',result.data[0].isApproved)
    const verifyUser=result.data[0].isApproved;
    console.log('verifyUser: ', verifyUser);
    localStorage.setItem('user', JSON.stringify(result.data[0]));
      setData(result.data);
      if (!result.data) {
        alert('You are not approved by Admin, Try Again');
        localStorage.clear();
        navigate('/');
      } else {
        setisApproved(verifyUser);
      }
    } catch (err) {
      alert('Something went wrong');
      // localStorage.clear();
      navigate('/approval');
    }
  };

  // Redirect to the appropriate page when isApproved changes
  useEffect(() => {
    if (isApproved) {
      alert('You are successfully approved by admin');
      navigate('/dashboard');
    }
  }, [isApproved]);

  return (
    <div style={{ justifyContent: 'center', marginLeft: '25%', marginTop: '5%' }}>
      <div>
        <h1>You have to wait for Admin Approval........</h1>
      </div>
      <div
        style={{
          height: '900px',
          width: '900px',
          backgroundImage: `url(${ap2})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      ></div>
    </div>
  );
};

export default Approval;
