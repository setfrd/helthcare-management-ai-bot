// pages/make-appointment.js

import React from 'react';
import AppointmentForm from '../components/AppointmentForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MakeAppointmentPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AppointmentForm />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MakeAppointmentPage;
