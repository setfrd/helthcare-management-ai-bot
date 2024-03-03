// pages/api/appointments.js

import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    // Extract and verify the JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if(!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (req.method === 'GET') {
      // Get appointments for the logged-in user
      const appointments = await prisma.appointment.findMany({
        where: { userId: parseInt(userId) },
      });
      res.status(200).json(appointments);
    } else if (req.method === 'POST') {
      // Add new appointment for the logged-in userr
      const { date, time, description } = req.body; 
      const dateAndTime = new Date(`${date} ${time}`);
      const appointment = await prisma.appointment.create({
        data: {
          userId: userId, // Use the userId from the token
          date: dateAndTime,
          description,
        },
      });
      res.status(200).json(appointment);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method Not Allowed`);
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Error in API:', error); // Will display more detailed error information
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
