import React, { useEffect, useState } from 'react';
import './MyProfile.css'; // Import your custom CSS file
import dummyUser from '../images/dummyUser.png';
// import axios from 'axios';
import axios from '../validations/AxiosInstance'


const UploadImage = () => {
    
   

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        imageUrl: null,
        skills: '',
    });

    useEffect(() => {
        getData();
       }, [])

    const getData = async () => {
        const email = JSON.parse(localStorage.getItem("admin"));
       try {
            const response = await axios.get(`/user/getuser/${email}`);
            setFormData(response.data[0]);
            console.log("formData", formData)
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleImageUpload = async () => {
        const email = JSON.parse(localStorage.getItem("user"));
        console.log("currentUser", email)
        // Check if a file is selected
        const fileInput = document.getElementById("fileInput");
        if (fileInput.files.length === 0) {
            alert("Please select an image first.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post(`http://localhost:6700/uploadsImage/${email}`, formData);
            console.log('Image uploaded successfully',response.data);
            // Update the form data with the new image URL
            setFormData({ ...formData, imageUrl: response.data.imageUrl });
            alert(response.data)
            getData();
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(error);
        }
    };

    return (
        <>
            <div >
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
        onChange={(event) => handleImageUpload(event, formData.email)} // Pass event and email
      />
    </div>
  </div>
</form>

                <div className="col"></div>

            </div>
        </>
    );
};

export default UploadImage;
