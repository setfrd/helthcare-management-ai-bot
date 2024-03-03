import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import jwt from 'jsonwebtoken';

export default function CreateProfile() {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    heartRate: '',
    vo2Max: '',
    bloodType: '', // Add bloodType field
    allergies: '', // Add allergies field as an array
    medications: '', // Add medications field as an array
    medicalConditions: '', // Add medicalConditions field as an array
  });

  const router = useRouter();

  useEffect(() => {
    // Retrieve the user ID from the stored JWT token
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get the user ID
      const decoded = jwt.decode(token);
      setProfileData(prevData => ({ ...prevData, userId: decoded.userId }));
    } else {
      // Redirect to login if no token is found
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

      setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Profile created:', response.data);
      router.push('/chat');

    } catch (error) {
      console.error('Error creating profile:', error.response ? error.response.data : error.message);
      // Handle errors, such as displaying a notification to the user
    }
  };

  return (
    <div className="w-full h-screen bg-blue-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-5 text-sm rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full mb-3"></div>
          <input 
            type="text" 
            name="name" 
            placeholder="Name"
            value={profileData.name}
            onChange={handleChange}
            className="text-center border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="number" 
            name="age" 
            placeholder="Age"
            value={profileData.age}
            onChange={handleChange}
            className="text-center border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <input 
            type="text" 
            name="height" 
            placeholder="Height"
            value={profileData.height}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="text" 
            name="weight" 
            placeholder="Weight"
            value={profileData.weight}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="text" 
            name="heartRate" 
            placeholder="Heart Rate"
            value={profileData.heartRate}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
          <input 
            type="text" 
            name="vo2Max" 
            placeholder="VO2 Max"
            value={profileData.vo2Max}
            onChange={handleChange}
            className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
          />
           <input
          type="text"
          name="bloodType"
          placeholder="Blood Type"
          value={profileData.bloodType}
          onChange={handleChange}
          className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies (comma-separated)"
          value={profileData.allergies}
          onChange={handleChange}
          className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="medications"
          placeholder="Medications (comma-separated)"
          value={profileData.medications}
          onChange={handleChange}
          className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="medicalConditions"
          placeholder="Medical Conditions (comma-separated)"
          value={profileData.medicalConditions}
          onChange={handleChange}
          className="border-2 border-blue-300 rounded p-2 mb-2 w-full"
        />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Create Profile
        </button>
      </form>
    </div>
  );
}
