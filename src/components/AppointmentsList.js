import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppointmentsList({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`/api/appointments`, config);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (appointments.length === 0) {
    return <div>No appointments scheduled.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
      <ul className="list-disc list-inside">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="mb-2">
            <span className="font-semibold">{new Date(appointment.date).toLocaleString()}:</span>
            <span className="ml-2">{appointment.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
