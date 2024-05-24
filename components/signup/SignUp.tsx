"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/signup`, {
        name,
        email,
        password,
      });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Signup</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          name='name'
          onChange={(e) => setName(e.target.value)}
          className="block border border-gray-300 p-2 mb-4 w-full"
        />
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
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          className="block border border-gray-300 p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Signup
        </button>
      </form>
    </div>
  );
}
