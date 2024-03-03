// login.js
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      // Handle the response, such as storing the JWT token or redirecting
      console.log('Login successful:', response.data);
      // Store the JWT token securely (e.g., in localStorage)
      localStorage.setItem('token', response.data.token);
      // Redirect the user to the chat page
      router.push('/chat');

    } catch (error) {
      setError('Login error: Invalid credentials or server error');
      console.error('Login error:', error.response ? error.response.data : error.message);
      // Handle errors, such as displaying a notification to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Log In</button>
      </form>
    </div>
  );
}
