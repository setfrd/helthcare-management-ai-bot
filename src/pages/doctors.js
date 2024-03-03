// pages/doctors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/doctors', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/doctors', newDoctor, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDoctors(); // Refresh the list
            setNewDoctor({ name: '', specialty: '' });
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/api/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Doctor deleted:', response);
            fetchDoctors(); // Refresh the list
            setNewDoctor({ name: '', specialty: '' });
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
    
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4 text-center">My Doctors</h1>
    
                <form onSubmit={handleAddDoctor} className="mb-6 flex flex-col items-center">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                name="name"
                                placeholder="Doctor's Name"
                                value={newDoctor.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="w-full px-3">
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                name="specialty"
                                placeholder="Specialty"
                                value={newDoctor.specialty}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Add Doctor
                    </button>
                </form>
    
                <div>
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="flex items-center justify-between mb-2 p-2 border-b border-gray-300">
                            <span>{doctor.name} - {doctor.specialty}</span>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteDoctor(doctor.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </main>
    
            <Footer />
        </div>
    );
};

export default DoctorsPage;
