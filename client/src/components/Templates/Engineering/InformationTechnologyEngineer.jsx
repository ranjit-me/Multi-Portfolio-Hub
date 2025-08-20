import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const InformationTechnologyEngineer = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('InformationTechnologyEngineer template useEffect triggered');
    console.log('Username from props:', username);
    console.log('User from auth:', user);
    
    if (username) {
      fetchProfile();
    } else if (isAuthenticated && user?.username) {
      fetchProfile(user.username);
    } else {
      console.log('No username provided or not authenticated, using default data');
      setLoading(false);
    }
  }, [username, isAuthenticated, user]);

  const fetchProfile = async (targetUsername = username) => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching profile for InformationTechnologyEngineer template:', targetUsername);
      
      let response;
      if (isAuthenticated && (isOwnProfile || targetUsername === user?.username)) {
        console.log('Fetching own profile (authenticated)');
        response = await profileAPI.getCurrentProfile();
      } else if (targetUsername) {
        console.log('Fetching public profile for:', targetUsername);
        response = await profileAPI.getProfileByUsername(targetUsername);
      } else {
        console.log('No authentication or username, using demo mode');
        setLoading(false);
        return;
      }
      
      console.log('InformationTechnologyEngineer profile API response:', response);
      
      if (response.data) {
        setProfileData(response.data);
        console.log('InformationTechnologyEngineer profile data set successfully');
      } else {
        console.log('No profile data in response');
        setError('No profile data received from server');
      }
    } catch (error) {
      console.error('Error fetching IT engineer profile:', error);
      
      if (error.response?.status === 404) {
        setError(`No profile found for ${targetUsername}.`);
      } else if (error.response?.status === 401) {
        console.log('Authentication required, using demo mode');
        setError('');
      } else if (error.response) {
        setError(`Server error (${error.response.status}): ${error.response.data?.error || error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        console.log('Network error, using demo mode');
        setError('');
      } else {
        setError('Error fetching profile: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Default data structure for fallback
  const defaultData = {
    personalInfo: {
      fullName: 'Eng. [Your Name]',
      professionalTitle: 'Information Technology Engineer & System Administrator',
      profilePhoto: null,
      phoneNumber: '[Phone Number]',
      professionalEmail: '[Email Address]',
      location: '[City, State]',
      address: '[Office Address]'
    }
  };

  // Use profile data or fall back to default
  const data = {
    personalInfo: {
      fullName: profileData?.fullName || profileData?.name || defaultData.personalInfo.fullName,
      professionalTitle: profileData?.professionalTitle || 'Information Technology Engineer & System Administrator',
      profilePhoto: profileData?.profilePhoto || null,
      phoneNumber: profileData?.phoneNumber || defaultData.personalInfo.phoneNumber,
      professionalEmail: profileData?.professionalEmail || profileData?.email || defaultData.personalInfo.professionalEmail,
      location: profileData?.location || defaultData.personalInfo.location,
      address: profileData?.address || defaultData.personalInfo.address
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-lg text-cyan-700">Loading IT Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">🌐</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-cyan-100">Information Technology</h2>
                  <p className="text-sm text-white/80">Network & Systems Administration</p>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{data.personalInfo.fullName}</h1>
              <p className="text-2xl text-cyan-100 mb-8">{data.personalInfo.professionalTitle}</p>
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
                  <span className="font-semibold">Network Administration</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Cybersecurity</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Cloud Infrastructure</span>
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
                  <span className="text-8xl">🌐</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About {data.personalInfo.fullName?.split(' ')[0] || 'Engineer'}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                As an Information Technology Engineer, I specialize in designing, implementing, and maintaining robust IT infrastructure. 
                With expertise in network administration, cybersecurity, and cloud technologies, I ensure seamless operations and security for organizations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My focus is on leveraging cutting-edge technologies to optimize IT systems, enhance security posture, and drive digital transformation initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">IT Services & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🖧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Network Administration</h3>
              <p className="text-gray-600">
                Design, configure, and manage enterprise networks for optimal performance and reliability.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cybersecurity</h3>
              <p className="text-gray-600">
                Implement comprehensive security measures to protect against cyber threats and vulnerabilities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cloud Infrastructure</h3>
              <p className="text-gray-600">
                Migrate and manage cloud infrastructure on AWS, Azure, and Google Cloud platforms.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">System Management</h3>
              <p className="text-gray-600">
                Maintain and optimize servers, databases, and enterprise applications for peak performance.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">IT Support</h3>
              <p className="text-gray-600">
                Provide technical support and troubleshooting for hardware, software, and network issues.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Digital Transformation</h3>
              <p className="text-gray-600">
                Lead digital transformation initiatives to modernize IT infrastructure and processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-cyan-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">IT Consultation & Support</h2>
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Optimize your IT infrastructure today</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 IT Office: {data.personalInfo.phoneNumber}
              </div>
              <div className="text-lg">
                📧 Email: {data.personalInfo.professionalEmail}
              </div>
            </div>
            {data.personalInfo.address && (
              <div className="text-lg mt-4">
                🏢 Office: {data.personalInfo.address}
              </div>
            )}
            <p className="mt-4 text-cyan-200">
              24/7 emergency support available for critical systems
            </p>
            {profileData && (
              <div className="mt-6 pt-6 border-t border-cyan-500/30">
                <button
                  onClick={() => fetchProfile()}
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20"
                >
                  <span className="mr-2">🔄</span>
                  Refresh Profile Data
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformationTechnologyEngineer;
