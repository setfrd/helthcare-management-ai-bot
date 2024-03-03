import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        // Redirect to login page or home page
        window.location.href = '/'; // Use the appropriate route for your login page
    };

    return (
        <header className="bg-blue-500 text-white body-font shadow w-full h-16">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Healthcare Management AI-Bot</span>
                </a>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <Link legacyBehavior href="/chat">
                  <a className="mr-5 hover:text-gray-300">Chat</a>
                </Link>
                {/* add doctors */}
                <Link legacyBehavior href="/doctors">
                  <a className="mr-5 hover:text-gray-300">Doctors</a>
                </Link>
                <div className="relative mr-4">
                    <button onClick={toggleDropdown} className="text-white focus:outline-none">
                        Appointments
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                            <Link legacyBehavior href="/make-appointment">
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Make Appointment</a>
                            </Link>
                            <Link  legacyBehavior href="/list-appointments">
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">List Appointments</a>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="relative">
                        <button onClick={toggleProfileDropdown} className="text-white focus:outline-none">
                            Profile
                        </button>
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                <Link legacyBehavior href="/profile">
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Profile</a>
                                </Link>
                                <Link legacyBehavior href="/settings">
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                </Link>
                            {/* handle log-out */}
                                <div className="border-t border-gray-100"></div>
                                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                            </div>
                        )}
                    </div>
              </nav>
            </div>

        </header>
    );
};

export default Header;
