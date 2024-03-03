import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProfileSidebar({ onLogout,  }) {
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
  const [editMode, setEditMode] = useState(false);

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

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data);
      setEditMode(false); // Turn off edit mode after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
  <div className="w-64 bg-blue-100 p-5 text-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full mb-3"></div>
          <div className="mb-2">
            {editMode ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-center border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <h2 className="font-bold">{profile.name}</h2>
            )}
          </div>
          <div className="mb-2">
            {editMode ? (
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="text-center border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <span>{profile.age} years old</span>
            )}
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {/* Height Field */}
          <div>
            {editMode ? (
              <input 
                type="text" 
                name="height" 
                placeholder="Height" 
                value={profile.height} 
                onChange={handleChange} 
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Height</span>
                <span>{profile.height} cm</span>
              </div>
            )}
          </div>
          {/* Weight Field */}
          <div>
            {editMode ? (
              <input 
                type="text" 
                name="weight" 
                placeholder="Weight" 
                value={profile.weight} 
                onChange={handleChange} 
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Weight</span>
                <span>{profile.weight} kg</span>
              </div>
            )}
          </div>
          {/* Heart Rate Field */}
          <div>
            {editMode ? (
              <input 
                type="text" 
                name="heartRate" 
                placeholder="Heart Rate" 
                value={profile.heartRate} 
                onChange={handleChange} 
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Heart Rate</span>
                <span>{profile.heartRate} bpm</span>
              </div>
            )}
          </div>
          {/* VO2 Max Field */}
          <div>
            {editMode ? (
              <input 
                type="text" 
                name="vo2Max" 
                placeholder="VO2 Max" 
                value={profile.vo2Max} 
                onChange={handleChange} 
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>VO2 Max</span>
                <span>{profile.vo2Max} ml/kg/min</span>
              </div>
            )}
          </div>
          <div>
            {editMode ? (
              <input
                type="text"
                name="bloodType"
                placeholder="Blood Type"
                value={profile.bloodType}
                onChange={handleChange}
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Blood Type</span>
                <span>{profile.bloodType}</span>
              </div>
            )}
          </div>
          {/* allergies */}
          <div>
            {editMode ? (
              <input
                type="text"
                name="allergies"
                placeholder="Allergies"
                value={profile.allergies}
                onChange={handleChange}
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Allergies</span>
                <span>{profile.allergies}</span>
              </div>
            )}
          </div>
          {/* medications */}
          <div>
            {editMode ? (
              <input
                type="text"
                name="medications"
                placeholder="Medications"
                value={profile.medications}
                onChange={handleChange}
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Medications</span>
                <span>{profile.medications}</span>
              </div>
            )}
            </div>
            {/* medicalConditions */}
            <div>
            {editMode ? (
              <input
                type="text"
                name="medicalConditions"
                placeholder="Medical Conditions"
                value={profile.medicalConditions}
                onChange={handleChange}
                className="border-2 border-blue-300 rounded p-2 w-full"
              />
            ) : (
              <div className="flex items-center justify-between">
                <span>Medical Conditions</span>
                <span>{profile.medicalConditions}</span>
              </div>
            )}
            </div>

        </div>
        <button 
          type="button" 
          onClick={handleEditToggle} 
          className="bg-blue-500 text-white p-2 rounded w-full mb-2"
        >
          {editMode ? 'Cancel Edit' : 'Edit Profile'}
        </button>
        {editMode && (
          <button 
            type="submit" 
            className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
          >
            Save Changes
          </button>
        )}
      </form>
      <button 
        onClick={onLogout}
        className="mt-2 bg-red-500 text-white p-2 rounded w-full"
      >
        Logout
      </button>

    </div>
  );
  
  
}