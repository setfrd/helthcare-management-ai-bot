// src/components/AppointmentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Function to generate time slots between 9 AM and 5 PM in 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    // If the hour is 17 (5 PM), only add the 00 minutes slot
    const maxMinutes = hour === 17 ? 0 : 30;
    for (let minutes = 0; minutes <= maxMinutes; minutes += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

const AppointmentForm = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('09:00');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // New state for doctors
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    // Fetch doctors when the component mounts
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/doctors', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDoctors(response.data);
        if (response.data.length > 0) {
          setSelectedDoctor(response.data[0].id); // Default to the first doctor
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to an API or state management
    console.log('Form submitted:', appointmentDate, appointmentTime, description);

    // Post request to create appointment
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post('/api/appointments', {
      date: appointmentDate,
      time: appointmentTime,
      description: description
    }, config)
      .then(response => {
        console.log('Appointment created:', response.data);
        setSuccessMessage('Appointment created successfully!');
        
        // Reset form fields
        setAppointmentDate('');
        setAppointmentTime('09:00');
        setDescription('');
      })
      .catch(error => {
        console.error('Error creating appointment:', error);
      });

  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
      <fieldset>
        <legend className="text-xl font-bold text-gray-900 mb-6">Schedule New Appointment</legend>
  
        <div className="mb-4">
          <label htmlFor="appointment-date" className="text-gray-700 block mb-2">Appointment Date</label>
          <input
            type="date"
            id="appointment-date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="doctor" className="text-gray-700 block mb-2">Doctor</label>
          <select
            id="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          >
            {doctors.map(doctor => (
              <option value={doctor.id} key={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="time-slot" className="text-gray-700 block mb-2">Time Slot</label>
          <select
            id="time-slot"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          >
            {timeSlots.map(slot => (
              <option value={slot} key={slot}>{slot}</option>
            ))}
          </select>
        </div>
  
        <div className="mb-6">
          <label htmlFor="description" className="text-gray-700 block mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
  
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Schedule Appointment
          </button>
        </div>
  
        {successMessage && (
          <div className="mt-3 text-green-600 text-center">
            {successMessage}
          </div>
        )}
      </fieldset>
    </form>
  );
  
  
};

export default AppointmentForm;
