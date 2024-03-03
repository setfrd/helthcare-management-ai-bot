// pages/list-appointments.js

import React, { useState, useEffect } from 'react';
import AppointmentsList from '../components/AppointmentsList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ListAppointmentsPage = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch the token from local storage or your state management solution
    const storedToken = localStorage.getItem('token');
    console.log("Stored token:", 1 + storedToken)
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">List of Appointments</h1>
          {token ? (
            <AppointmentsList token={token} />
          ) : (
            <p>Please log in to view your appointments.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListAppointmentsPage;
