import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const ChemicalEngineer = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    if (username) {
      fetchProfile();
    } else if (isAuthenticated && user?.username) {
      fetchProfile(user.username);
    } else {
      setLoading(false);
    }
  }, [username, isAuthenticated, user]);

  const fetchProfile = async (targetUsername = username) => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (isAuthenticated && (isOwnProfile || targetUsername === user?.username)) {
        response = await profileAPI.getCurrentProfile();
      } else if (targetUsername) {
        response = await profileAPI.getProfileByUsername(targetUsername);
      } else {
        setLoading(false);
        return;
      }
      
      if (response.data) {
        setProfileData(response.data);
      } else {
        setError('No profile data received from server');
      }
    } catch (error) {
      console.error('Error fetching chemical engineer profile:', error);
      if (error.response?.status === 404) {
        setError(`No profile found for ${targetUsername}.`);
      } else if (error.response?.status === 401) {
        setError('');
      } else {
        setError('Error fetching profile: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    personalInfo: {
      fullName: 'Eng. [Your Name]',
      professionalTitle: 'Chemical Engineer & Process Design Specialist',
      profilePhoto: null,
      phoneNumber: '[Phone Number]',
      professionalEmail: '[Email Address]',
      location: '[City, State]',
      address: '[Office Address]'
    }
  };

  const data = {
    personalInfo: {
      fullName: profileData?.fullName || profileData?.name || defaultData.personalInfo.fullName,
      professionalTitle: profileData?.professionalTitle || 'Chemical Engineer & Process Design Specialist',
      profilePhoto: profileData?.profilePhoto || null,
      phoneNumber: profileData?.phoneNumber || defaultData.personalInfo.phoneNumber,
      professionalEmail: profileData?.professionalEmail || profileData?.email || defaultData.personalInfo.professionalEmail,
      location: profileData?.location || defaultData.personalInfo.location,
      address: profileData?.address || defaultData.personalInfo.address
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-green-700">Loading Chemical Engineering Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">🧪</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-green-100">Chemical Engineering</h2>
                  <p className="text-sm text-white/80">Process Design & Manufacturing</p>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{data.personalInfo.fullName}</h1>
              <p className="text-2xl text-green-100 mb-8">{data.personalInfo.professionalTitle}</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <span className="mr-3 text-xl">📞</span>
                  <span className="text-lg">{data.personalInfo.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-xl">📧</span>
                  <span className="text-lg">{data.personalInfo.professionalEmail}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-xl">📍</span>
                  <span className="text-lg">{data.personalInfo.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Process Design</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Chemical Manufacturing</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Quality Control</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              {data.personalInfo.profilePhoto ? (
                <img 
                  src={data.personalInfo.profilePhoto} 
                  alt={data.personalInfo.fullName}
                  className="w-80 h-80 rounded-full object-cover mx-auto border-8 border-white/30 shadow-2xl"
                />
              ) : (
                <div className="w-80 h-80 rounded-full bg-white/20 backdrop-blur-sm border-8 border-white/30 flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-8xl">🧪</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Chemical Engineering Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚗️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Process Design</h3>
              <p className="text-gray-600">
                Design efficient chemical processes for manufacturing and production operations.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Plant Operations</h3>
              <p className="text-gray-600">
                Optimize plant operations for maximum efficiency and safety compliance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Safety Protocols</h3>
              <p className="text-gray-600">
                Develop and implement comprehensive safety protocols for chemical processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-green-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Chemical Engineering Consultation</h2>
          <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Optimize your chemical processes today</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Engineering Office: {data.personalInfo.phoneNumber}
              </div>
              <div className="text-lg">
                📧 Email: {data.personalInfo.professionalEmail}
              </div>
            </div>
            <p className="mt-4 text-green-200">
              Available for process design and optimization projects
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChemicalEngineer;
