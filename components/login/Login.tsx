"use client"
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token" ,response.data.token)
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          className="block border border-gray-300 p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="block border border-gray-300 p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
