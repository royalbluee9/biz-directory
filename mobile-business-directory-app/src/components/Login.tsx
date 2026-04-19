import React, { useState } from 'react';
import { User } from '../types/Business';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Demo users for testing
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@bizdirectory.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      // Sign up new user
      if (!name.trim() || !email.trim()) {
        setError('Please fill in all fields');
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      onLogin(newUser);
    } else {
      // Login existing user
      if (!email.trim()) {
        setError('Please enter your email');
        return;
      }

      const user = demoUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (user) {
        onLogin(user);
      } else {
        setError('User not found. Try signing up!');
      }
    }
  };

  const handleDemoLogin = (user: User) => {
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏢</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">BizDirectory</h1>
          <p className="text-gray-600">Your Mobile Business Directory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="text-center mb-6">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            className="text-blue-600 hover:underline text-sm"
          >
            {isSignup
              ? 'Already have an account? Login'
              : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts:</p>
          <div className="space-y-2">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleDemoLogin(user)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {user.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
