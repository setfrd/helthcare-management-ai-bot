//src/pages/api/auth/register.js

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export default async function register(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return res.status(201).json({ message: 'User created', user });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
}
