import React, { useEffect, useState } from 'react';
import dummyUser from '../images/dummyUser.png';
import axios from 'axios';

const UploadImage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageUrl: null,
    skills: '',
  });
  const currentUser = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const email=currentUser.email;
    console.log("emaillllllllll",email)
    try {
      const response = await axios.get(`http://localhost:6700/user/getuser/${email}`);
      setFormData(response.data[0]);
      console.log('formData', formData);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const handleImageUpload = async (event) => {
    const email=currentUser.email;
    console.log('currentUser', email);
    // Check if a file is selected
    const fileInput = event.target;
    if (fileInput.files.length === 0) {
      alert('Please select an image first.');
      return;
    }

    const file = fileInput.files[0];
    const imageFormData = new FormData();
    imageFormData.append('image', file);
    try {
      const response = await axios.post(`http://localhost:6700/uploadsImage/${email}`, imageFormData);
      console.log('Image uploaded successfully', response.data);
  
      // Update the form data with the new image URL received from the backend
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl: response.data.imageUrl,
      }));
      alert('Image uploaded successfully');
      getData();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error.message);
    }
  };
  return (
    <>
      <div>
        <form className="col" encType="multipart/form-data">
          <h2>My Profile Picture</h2>
          <div className="card" style={{ width: '300px' }}>
            {formData.imageUrl == null || formData.imageUrl == undefined ? (
              <img
                className="card-img-top"
                src={dummyUser}
                alt="Card image"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
            ) : (
              <img
                className="card-img-top"
                src={formData.imageUrl}
                alt="Card image"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body" style={{ textAlign: 'center' }}>
              <label htmlFor="fileInput" className="btn btn-primary">
                Update Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="fileInput"
                style={{ display: 'none' }} // Hide the file input but keep the label
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadImage;
