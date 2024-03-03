// src/pages/api/profile.js

import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Common method to extract and verify JWT token
  const verifyToken = (token) => {
    if (!token) {
      throw new Error("Unauthorized access");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  };

  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    switch (req.method) {
      case 'POST':
        return await createProfile(req, res, userId);
      case 'PUT':
        return await updateProfile(req, res, userId);
      case 'GET':
        return await getProfile(req, res, userId);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function createProfile(req, res, userId) {
  const {
    name,
    age,
    height,
    weight,
    heartRate,
    vo2Max,
    bloodType,
    allergies,
    medications,
    medicalConditions,
  } = req.body;

  const userProfile = await prisma.userProfile.create({
    data: {
      name,
      age: parseInt(age, 10),
      height,
      weight,
      heartRate,
      vo2Max,
      bloodType,
      allergies,
      medications,
      medicalConditions,
      user: { connect: { id: userId } },
    },
  });

  return res.status(200).json(userProfile);
}

async function updateProfile(req, res, userId) {
  const {
    name,
    age,
    height,
    weight,
    heartRate,
    vo2Max,
    bloodType,
    allergies,
    medications,
    medicalConditions,
  } = req.body;

  const updatedProfile = await prisma.userProfile.update({
    where: { userId: userId },
    data: {
      name,
      age,
      height,
      weight,
      heartRate,
      vo2Max,
      bloodType,
      allergies: { set: allergies }, // Update allergies as an array
      medications: { set: medications }, // Update medications as an array
      medicalConditions: { set: medicalConditions }, // Update medical conditions as an array
    },
  });

  return res.status(200).json(updatedProfile);
}

async function getProfile(req, res, userId) {
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: userId },
  });
  if (!userProfile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  return res.status(200).json(userProfile);
}
