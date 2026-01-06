import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: ''
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const generatePassword = () => {
    const chars = 'qwertyuiopasdfghjklzxcvbnm1234567890@#$&_.';
    let pass = '';
    for (let i = 0; i < 8; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setFormData({ ...formData, password: pass });
    setPasswordVisible(true); // Show the generated password
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful');
        navigate('/login');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">BizPilot</h1>
        <p className="text-center text-gray-600 mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Signup as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role</option>
              <option value="owner">Owner</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? '🙈' : '👁️'}
                </button>
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="px-3 py-2 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition"
              >
                Generate
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-800 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
