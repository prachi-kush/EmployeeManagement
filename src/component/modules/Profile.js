import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProfile.css'; // Import your custom CSS file
import axios from 'axios';
import UploadImage from './UploadImage';
import axiosInstance from '../validation/AxiosInstance'; // Import your Axios instance

const Profile = () => {
  const [show, setShow] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const id = currentUser._id

  const [formData, setFormData] = useState({
    name: '',
    middlename: '',
    lastname: '',
    department: '',
    education: '',
    course: '',
    gender: 'Male',
    countryCode: '+91',
    number: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    imageUrl: null,
    skills: '',
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const email = currentUser.email;
    try {
      const response = await axiosInstance.get(`/user/getuser/${email}`);
      setFormData(response.data[0]);
      console.log("formData===============", formData)
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    const validationErrors = {};

    if (name === 'name') {
      if (value.trim().length < 4) {
        validationErrors[name] = 'Name must be at least 4 characters long';
      } else {
        validationErrors[name] = '';
      }
    } else if (name === 'number') {
      if (!value.match(/^\d{10}$/)) {
        validationErrors[name] = 'Invalid phone number';
      } else {
        validationErrors[name] = '';
      }
    } else if (name === 'email') {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        validationErrors[name] = 'Invalid email address';
      } else {
        validationErrors[name] = '';
      }
    } else if (name === 'dob') {
      const dob = new Date(value);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate - dob;
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);

      if (ageInYears < 18) {
        validationErrors[name] = 'You must be at least 18 years old';
      } else {
        validationErrors[name] = '';
      }
    } else if (name === 'education') {

      if (value == '') {
        validationErrors[name] = 'please select you degree';
      } else {
        validationErrors[name] = '';
      }
    } else if (name === 'department') {

      if (value == '') {
        validationErrors[name] = 'please select you department';
      } else {
        validationErrors[name] = '';
      }
    } else if (name === 'gender') {

      if (value == '') {
        validationErrors[name] = 'please select you gender';
      } else {
        validationErrors[name] = '';
      }
    }

    setErrors({ ...errors, ...validationErrors });
  };

  const updateProfile = async (event, email) => {
    event.preventDefault();  
    try {
      const response = await axiosInstance.put(`/user/updateprofile/${formData.email}`, { ...formData, });
      console.log('Profile updated successfully!', response.data);
      alert('Profile updated successfully!')
      setShow(false)
      navigate('/profile')
    } catch (err) {
      alert(err);
      console.log('Error:', err);
    }
  };

  return (
    <>
      <div className='d-flex flex-row container row m-3'>
        <div className="col-6">
          <UploadImage />
          <div className="leave-card border border-dark p-2 mt-5">
            <div className="user-details d-flex flex-row justify-content-between">

              <div className="user-info " >
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Mobile:</strong> {formData.number}</p>
              </div>
            </div>
            <div className='d-flex flex-row  '>
              <p><strong>Mother Name:</strong> {formData.motherName}</p>
              <p className='mx-3 '><strong>Father Name:</strong> {formData.fatherName}</p>
            </div>
            <div className='d-flex flex-row  '>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p className='mx-3 '><strong>Joining Date:</strong> {formData.joiningDate}</p>
            </div>

            <div className='d-flex flex-row  '>
              <p className=''><strong>Department:</strong> {formData.department}</p>

              <p className='mx-3'><strong>Education:</strong> {formData.education}</p>

              <p className='mx-3 '><strong>Skills:</strong> {formData.skills}</p>
            </div>

            <button className='btn btn-primary' onClick={(e) => { setShow(true) }}>Update Profile</button>

          </div>

        </div>

        {show &&
          <div className="col-6">
            <form

              className="registration-form">
              <h1>Update Profile</h1>
              <hr />
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-warning">{errors.name}</p>}

              <label>Phone:</label>
              <div className="phone-input">
                <input
                  className="countryCode"
                  type="text"
                  name="countryCode"
                  placeholder="Country Code"
                  value={`+91`}
                  readOnly
                />
                <input
                  className="phoneNumber"
                  type="text"
                  name="number"
                  placeholder="Phone no."
                  required
                  value={formData.number}
                  onChange={handleInputChange}
                />
              </div>
              {errors.number && <p className="text-warning">{errors.number}</p>}

              <label>Email:</label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                readOnly
              />
              {errors.email && <p className="text-warning">{errors.email}</p>}
              <label>Father's Name</label>
              <input
                type="text"
                name="fatherName"
                placeholder="Father's Name"
                required
                value={formData.fatherName}
                onChange={handleInputChange}
              />
              <label>Mother's Name:</label>
              <input
                type="text"
                name="motherName"
                placeholder="Mother's Name"
                required
                value={formData.motherName}
                onChange={handleInputChange}
              />
              <label>Highest Education </label>
              <select name="education" value={formData.education} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="B.Tech">B.Tech</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Com">B.com</option>
              </select>
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="HR Department">HR Department</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="IT Department">IT Department</option>
                <option value="Software development">Software development</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>

              </select>
              <label>Gender:</label>
              <div className="radio-group">
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  checked={formData.gender === 'Male'}
                  onChange={handleInputChange}
                />
                Male
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  checked={formData.gender === 'Female'}
                  onChange={handleInputChange}
                />
                Female
                <input
                  type="radio"
                  value="Other"
                  name="gender"
                  checked={formData.gender === 'Other'}
                  onChange={handleInputChange}
                />
                Other
              </div>

              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && <p className="text-warning">{errors.dob}</p>}

              <label>Current Address:</label>
              <textarea
                rows="4"
                placeholder="Current Address"
                value={formData.address}
                name="address"
                required
                onChange={handleInputChange}
              />

              <label>Joining Date:</label>
              <input
                type="date"
                name="joiningDate"
                required
                value={formData.joiningDate}
                onChange={handleInputChange}
              />

              <label
                className='skillsText'
              >Enter your skills :</label>
              <textarea
                rows="4"
                placeholder="Enter skills"
                value={formData.skills}
                name="skills"
                required
                onChange={handleInputChange}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ alignSelf: 'center' }} type="submit" className="register-btn"
                  onClick={(e) => updateProfile(e, formData.email)}
                >  Update Profile
                </button>
              </div>
            </form>
          </div>
        }


      </div>
    </>
  );
};

export default Profile;
