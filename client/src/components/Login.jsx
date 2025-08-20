import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedProfileType, setSelectedProfileType] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Get profile type from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const type = urlParams.get('type');
    if (type === 'doctor' || type === 'engineer') {
      setSelectedProfileType(type);
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isRegistering) {
        // Validate email for registration
        if (!formData.email.trim()) {
          setError('Email is required for registration');
          return;
        }
        // Register user with email
        await authAPI.register(formData.username, formData.email, formData.password);
        setIsRegistering(false);
        setError('Registration successful! Please login.');
      } else {
        // Login user
        const response = await authAPI.login(formData.username, formData.password);
        login(response.data);
        
        // Navigate to profile edit with selected profile type if available
        if (selectedProfileType) {
          navigate('/profile/edit', { 
            replace: true, 
            state: { profileType: selectedProfileType } 
          });
        } else {
          navigate(`/${formData.username}`, { replace: true });
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300">
                Portfolio Hub
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-500 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-indigo-50"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-500 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-indigo-50"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Login Page */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400/60 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-pink-400/50 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400/70 rounded-full animate-bounce delay-1200"></div>
          <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-green-400/40 rounded-full animate-pulse delay-300"></div>
        </div>
        {/* Enhanced Login Form Container */}
        <div className="relative max-w-md w-full space-y-8 z-10">
          {/* Glass Morphism Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isRegistering ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  )}
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600 font-light">
                {isRegistering ? 'Join our community today' : 'Sign in to your portfolio'}
              </p>
              
              {/* Profile Type Indicator */}
              {selectedProfileType && (
                <div className={`mt-4 p-3 rounded-xl border-2 ${
                  selectedProfileType === 'doctor' 
                    ? 'bg-red-50 border-red-200 text-red-700' 
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {selectedProfileType === 'doctor' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      )}
                    </svg>
                    <span className="font-medium">
                      Creating {selectedProfileType === 'doctor' ? 'Medical Professional' : 'Engineering Professional'} Profile
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Enhanced Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Username Field */}
                <div className="group">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-indigo-300 backdrop-blur-sm"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Email Field (for registration) */}
                {isRegistering && (
                  <div className="group animate-fade-in">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required={isRegistering}
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-300 backdrop-blur-sm"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                )}
                
                {/* Password Field */}
                <div className="group">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-300 backdrop-blur-sm"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center py-3 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isRegistering ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        )}
                      </svg>
                      {isRegistering ? 'Create Account' : 'Sign In'}
                    </>
                  )}
                </button>
              </div>

              {/* Switch Mode Button */}
              <div className="text-center pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                    setFormData({
                      username: '',
                      email: '',
                      password: ''
                    });
                  }}
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300 hover:underline"
                >
                  {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
