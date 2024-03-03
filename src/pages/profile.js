// pages/profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    heartRate: '',
    vo2Max: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalConditions: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
  }, []);

    const profileFields = [
      { name: 'name', label: 'Name' },
      { name: 'age', label: 'Age' },
      { name: 'height', label: 'Height' },
      { name: 'weight', label: 'Weight' },
      { name: 'heartRate', label: 'Heart Rate' },
      { name: 'vo2Max', label: 'VO2 Max' },
      { name: 'bloodType', label: 'Blood Type' },
      { name: 'allergies', label: 'Allergies' },
      { name: 'medications', label: 'Medications' },
      { name: 'medicalConditions', label: 'Medical Conditions' },
    ];
  
  // Function to handle form submission
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditing(false); // Turn off editing mode after submission
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  if (isEditing) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <form onSubmit={handleUpdateProfile} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            {profileFields.map(({ name, label }) => (
              <div key={name} className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
                  {label}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={name}
                  type="text"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  name={name}
                  value={profile[name]}
                  onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
                />
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
         </div>
         </main>
         <Footer />
      </div>
    );
  }
  
  

  // Render the profile details
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <Header />
    <div className="flex-grow container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed view of personal information.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {/* Iterate over profile data to display each field */}
            {Object.entries(profile).map(([key, value]) => (
              <div key={key} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {value || 'Not specified'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <button 
      onClick={() => setIsEditing(true)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block mt-4"
      >
      Edit Profile
    </button>
            
    </div>
    <Footer />
    </div>
  );
};

export default ProfilePage;
