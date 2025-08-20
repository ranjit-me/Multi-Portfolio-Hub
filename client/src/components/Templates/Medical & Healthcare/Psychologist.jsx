import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const Psychologist = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('Psychologist template useEffect triggered');
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
      console.log('Fetching profile for Psychologist template:', targetUsername);
      
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
      
      console.log('Psychologist profile API response:', response);
      
      if (response.data) {
        setProfileData(response.data);
        console.log('Psychologist profile data set successfully');
      } else {
        console.log('No profile data in response');
        setError('No profile data received from server');
      }
    } catch (error) {
      console.error('Error fetching psychologist profile:', error);
      
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
      fullName: 'Dr. [Your Name]',
      professionalTitle: 'Clinical Psychologist & Mental Health Specialist',
      profilePhoto: null,
      phoneNumber: '[Phone Number]',
      professionalEmail: '[Email Address]',
      location: '[City, State]',
      address: '[Practice Address]'
    }
  };

  // Use profile data or fall back to default
  const data = {
    personalInfo: {
      fullName: profileData?.fullName || profileData?.name || defaultData.personalInfo.fullName,
      professionalTitle: profileData?.professionalTitle || 'Clinical Psychologist & Mental Health Specialist',
      profilePhoto: profileData?.profilePhoto || null,
      phoneNumber: profileData?.phoneNumber || defaultData.personalInfo.phoneNumber,
      professionalEmail: profileData?.professionalEmail || profileData?.email || defaultData.personalInfo.professionalEmail,
      location: profileData?.location || defaultData.personalInfo.location,
      address: profileData?.address || defaultData.personalInfo.address
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-lg text-teal-700">Loading Psychology Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-green-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">🧠</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-teal-100">Clinical Psychology</h2>
                  <p className="text-sm text-white/80">Mental Health & Wellness</p>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{data.personalInfo.fullName}</h1>
              <p className="text-2xl text-teal-100 mb-8">{data.personalInfo.professionalTitle}</p>
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
                  <span className="font-semibold">Individual Therapy</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Group Counseling</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">Psychological Assessment</span>
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
                  <span className="text-8xl">🧠</span>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Dr. {data.personalInfo.fullName?.split(' ')[1] || 'Smith'}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                As a dedicated clinical psychologist, I am committed to helping individuals navigate life's challenges and achieve mental wellness. 
                With specialized training in various therapeutic approaches, I provide compassionate and evidence-based care tailored to each client's unique needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My practice focuses on creating a safe, supportive environment where clients can explore their thoughts, feelings, and behaviors 
                to develop healthy coping strategies and achieve personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Psychological Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Individual Therapy</h3>
              <p className="text-gray-600">
                One-on-one sessions focused on personal challenges, anxiety, depression, and life transitions.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Group Therapy</h3>
              <p className="text-gray-600">
                Supportive group sessions for shared experiences and peer support in a therapeutic setting.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Psychological Assessment</h3>
              <p className="text-gray-600">
                Comprehensive evaluations for diagnosis, treatment planning, and understanding mental health conditions.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💑</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Couples Counseling</h3>
              <p className="text-gray-600">
                Relationship therapy to improve communication, resolve conflicts, and strengthen bonds.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Family Therapy</h3>
              <p className="text-gray-600">
                Family-focused sessions to address family dynamics and improve relationships.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🧘‍♀️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mindfulness Training</h3>
              <p className="text-gray-600">
                Teaching mindfulness techniques for stress reduction and emotional regulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - if data available */}
      {profileData?.education?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Education & Training</h2>
            <div className="space-y-6">
              {profileData.education.map((edu, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-teal-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-xl text-teal-600 font-semibold">{edu.university || edu.institute}</p>
                      {edu.fieldOfStudy && <p className="text-gray-600 text-lg">Field: {edu.fieldOfStudy}</p>}
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                      <p className="text-lg font-medium">{edu.startDate} - {edu.endDate}</p>
                      {edu.location && <p>{edu.location}</p>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section - if data available */}
      {profileData?.certifications?.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-teal-50 to-green-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl mb-3">📜</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-teal-600 font-semibold mb-2 text-lg">{cert.authority}</p>
                  {cert.dateIssued && (
                    <p className="text-gray-500 text-sm mb-2">Issued: {cert.dateIssued}</p>
                  )}
                  {cert.expiryDate && (
                    <p className="text-gray-500 text-sm mb-2">Expires: {cert.expiryDate}</p>
                  )}
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-teal-700 hover:text-teal-800 text-sm underline inline-flex items-center mt-2">
                      <span className="mr-1">🔗</span>
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-16 bg-teal-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Schedule a Consultation</h2>
          <div className="bg-gradient-to-r from-teal-600 to-green-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Take the first step towards mental wellness</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Psychology Practice: {data.personalInfo.phoneNumber}
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
            <p className="mt-4 text-teal-200">
              Evening and weekend appointments available
            </p>
            {profileData && (
              <div className="mt-6 pt-6 border-t border-teal-500/30">
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

export default Psychologist;
