import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const Cardiologist = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('Cardiologist template useEffect triggered');
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
      console.log('Fetching profile for Cardiologist template:', targetUsername);
      
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
      
      console.log('Cardiologist profile API response:', response);
      
      if (response.data) {
        setProfileData(response.data);
        console.log('Cardiologist profile data set successfully');
      } else {
        console.log('No profile data in response');
        setError('No profile data received from server');
      }
    } catch (error) {
      console.error('Error fetching cardiologist profile:', error);
      
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
      professionalTitle: 'Cardiologist & Heart Specialist',
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
      professionalTitle: profileData?.professionalTitle || 'Cardiologist & Heart Specialist',
      profilePhoto: profileData?.profilePhoto || null,
      phoneNumber: profileData?.phoneNumber || defaultData.personalInfo.phoneNumber,
      professionalEmail: profileData?.professionalEmail || profileData?.email || defaultData.personalInfo.professionalEmail,
      location: profileData?.location || defaultData.personalInfo.location,
      address: profileData?.address || defaultData.personalInfo.address
    }
  };

  const services = [
    {
      title: 'Cardiac Consultation',
      description: 'Comprehensive heart health evaluation and cardiovascular risk assessment.',
      icon: '❤️'
    },
    {
      title: 'EKG/ECG Testing',
      description: 'Electrocardiogram testing to monitor heart rhythm and detect abnormalities.',
      icon: '📈'
    },
    {
      title: 'Stress Testing',
      description: 'Exercise stress tests to evaluate heart function under physical stress.',
      icon: '🏃'
    },
    {
      title: 'Echocardiogram',
      description: 'Ultrasound imaging of the heart to assess structure and function.',
      icon: '🔊'
    },
    {
      title: 'Heart Disease Prevention',
      description: 'Preventive cardiology focusing on reducing cardiovascular risk factors.',
      icon: '🛡️'
    },
    {
      title: 'Cardiac Rehabilitation',
      description: 'Post-treatment rehabilitation programs for optimal heart health recovery.',
      icon: '💪'
    }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-red-200 border-t-red-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-rose-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-4 animate-pulse">
            <p className="text-2xl font-bold text-gray-700">Loading Cardiology Profile...</p>
            <p className="text-lg text-gray-500">Please wait while we fetch the data</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state - Only show errors for actual failures, not auth issues
  if (error && !error.includes('Authentication') && !error.includes('Network')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-3xl mx-auto border border-red-100">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Cardiology Profile</h3>
            <p className="text-red-600 text-xl mb-10 font-medium">{error}</p>
            <button
              onClick={() => fetchProfile()}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-2xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span className="mr-2">🔄</span>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-rose-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              {data.personalInfo.profilePhoto ? (
                <img 
                  src={data.personalInfo.profilePhoto} 
                  alt={`${data.personalInfo.fullName} - Cardiologist`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${data.personalInfo.profilePhoto ? 'hidden' : ''}`}>
                <span className="text-6xl">❤️</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
              <p className="text-xl text-red-100 mb-4">{data.personalInfo.professionalTitle}</p>
              <p className="text-lg text-red-200 max-w-2xl">
                {profileData?.about || `Expert in cardiovascular medicine, specializing in the diagnosis, treatment, and prevention 
                of heart diseases and conditions affecting the cardiovascular system.`}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300">
                  Preview
                </button>
              </div>
              {data.personalInfo.location && (
                <p className="text-red-200 mt-2">📍 {data.personalInfo.location}</p>
              )}
              {profileData && (
                <div className="mt-4 text-red-100">
                  <p className="text-sm">
                    ✅ Profile data loaded from {isOwnProfile ? 'your' : username ? `${username}'s` : 'demo'} database
                  </p>
                  <details className="mt-2">
                    <summary className="text-xs cursor-pointer hover:text-red-50">View loaded data summary</summary>
                    <div className="text-xs mt-2 bg-white/10 rounded p-2">
                      <p>📊 Data Summary:</p>
                      <p>• Education: {profileData?.education?.length || 0}</p>
                      <p>• Medical Experience: {profileData?.medicalExperience?.length || 0}</p>
                      <p>• Regular Experience: {profileData?.experience?.length || 0}</p>
                      <p>• Certifications: {profileData?.certifications?.length || 0}</p>
                      <p>• Publications: {profileData?.publications?.length || 0}</p>
                      <p>• Conferences: {profileData?.conferences?.length || 0}</p>
                      <p>• Internships: {profileData?.internships?.length || 0}</p>
                      <p>• Achievements: {profileData?.achievements?.length || 0}</p>
                      <p>• Skills: {profileData?.skills?.length || 0}</p>
                      <p>• Languages: {profileData?.languages?.length || 0}</p>
                      <p>• Interests: {profileData?.interests?.length || 0}</p>
                      <p>• Professional Memberships: {profileData?.professionalMemberships?.length || 0}</p>
                      <p>• Social Links: {profileData?.socialLinks ? Object.keys(profileData.socialLinks).filter(key => profileData.socialLinks[key]).length : 0}</p>
                    </div>
                  </details>
                </div>
              )}
              {!profileData && username && (
                <div className="mt-4 text-red-100">
                  <p className="text-sm">
                    📋 Demo mode - Template preview for {username}
                  </p>
                </div>
              )}
              {!profileData && !username && (
                <div className="mt-4 text-red-100">
                  <p className="text-sm">
                    🎭 Demo mode - Template preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Professional Summary */}
      {profileData && (
        <section className="py-16 bg-white/70">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold">{profileData?.experience?.length || profileData?.medicalExperience?.length || 0}</div>
                <div className="text-red-100 text-sm uppercase tracking-wide">Medical Experience</div>
              </div>
              <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold">{profileData?.education?.length || 0}</div>
                <div className="text-rose-100 text-sm uppercase tracking-wide">Education</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold">{profileData?.certifications?.length || 0}</div>
                <div className="text-pink-100 text-sm uppercase tracking-wide">Certifications</div>
              </div>
              <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold">{profileData?.publications?.length || 0}</div>
                <div className="text-red-100 text-sm uppercase tracking-wide">Publications</div>
              </div>
            </div>
            
            {/* About Section */}
            {profileData?.about && (
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">👨‍⚕️</span>
                  About Dr. {profileData.fullName || profileData.name}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">{profileData.about}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Cardiology Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-red-500">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      {profileData?.education?.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-rose-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Education</h2>
            <div className="space-y-6">
              {profileData.education.map((edu, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-xl text-red-600 font-semibold">{edu.university || edu.institute}</p>
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

      {/* Medical Experience Section */}
      {(profileData?.medicalExperience?.length > 0 || profileData?.experience?.length > 0) && (
        <section className="py-16 bg-white/50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Experience</h2>
            <div className="space-y-6">
              {/* Medical Experience */}
              {profileData?.medicalExperience?.map((exp, index) => (
                <div key={`medical-${index}`} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-xl text-red-600 font-semibold">{exp.hospitalName}</p>
                      {exp.department && <p className="text-gray-600 text-lg">{exp.department}</p>}
                    </div>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                      <p className="text-lg font-medium">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">{exp.description}</p>
                  )}
                </div>
              ))}
              
              {/* Regular Experience */}
              {profileData?.experience?.map((exp, index) => (
                <div key={`exp-${index}`} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-rose-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-xl text-rose-600 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                      <p className="text-lg font-medium">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {profileData?.certifications?.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl mb-3">📜</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-red-600 font-semibold mb-2 text-lg">{cert.authority}</p>
                  {cert.dateIssued && (
                    <p className="text-gray-500 text-sm mb-2">Issued: {cert.dateIssued}</p>
                  )}
                  {cert.expiryDate && (
                    <p className="text-gray-500 text-sm mb-2">Expires: {cert.expiryDate}</p>
                  )}
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-red-700 hover:text-red-800 text-sm underline inline-flex items-center mt-2">
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

      {/* Internships Section */}
      {profileData?.internships?.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Internships</h2>
            <div className="space-y-6">
              {profileData.internships.map((internship, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-rose-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{internship.hospitalName}</h3>
                      <p className="text-xl text-rose-600 font-semibold">{internship.department}</p>
                      {internship.position && <p className="text-gray-600 text-lg">{internship.position}</p>}
                    </div>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                      <p className="text-lg font-medium">{internship.startDate} - {internship.endDate}</p>
                      {internship.location && <p>{internship.location}</p>}
                    </div>
                  </div>
                  {internship.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">{internship.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications Section */}
      {profileData?.publications?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Research Publications</h2>
            <div className="space-y-6">
              {profileData.publications.map((pub, index) => (
                <div key={index} className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl shadow-lg p-8 border-l-4 border-red-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl">📚</div>
                    {pub.publicationUrl && (
                      <a href={pub.publicationUrl} target="_blank" rel="noopener noreferrer" 
                         className="text-red-700 hover:text-red-800 underline inline-flex items-center">
                        <span className="mr-1">🔗</span>
                        View Publication
                      </a>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{pub.title}</h3>
                  <p className="text-xl text-red-600 font-semibold mb-2">{pub.publisher}</p>
                  {pub.authors && <p className="text-gray-600 mb-2 text-lg">Authors: {pub.authors}</p>}
                  {pub.datePublished && <p className="text-gray-500 text-sm mb-3">Published: {pub.datePublished}</p>}
                  {pub.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">{pub.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conferences Section */}
      {profileData?.conferences?.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-pink-50 to-red-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Conferences</h2>
            <div className="space-y-6">
              {profileData.conferences.map((conf, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-pink-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🎤</span>
                        <h3 className="text-2xl font-bold text-gray-900">{conf.name}</h3>
                      </div>
                      <p className="text-xl text-pink-600 font-semibold">{conf.role}</p>
                      {conf.organizer && <p className="text-gray-600 text-lg">Organized by: {conf.organizer}</p>}
                    </div>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                      {conf.date && <p className="text-lg font-medium">{conf.date}</p>}
                      {conf.location && <p>{conf.location}</p>}
                    </div>
                  </div>
                  {conf.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">{conf.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {profileData?.achievements?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Achievements & Awards</h2>
            <div className="space-y-6">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">🏆</div>
                    {achievement.date && (
                      <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                  <p className="text-xl text-yellow-600 font-semibold mb-3">{achievement.associatedWith || achievement.issuer}</p>
                  {achievement.description && (
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">{achievement.description}</p>
                  )}
                  
                  {/* Achievement Photos */}
                  {achievement.achievementPhotos && achievement.achievementPhotos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">📸</span>
                        Achievement Photos
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {achievement.achievementPhotos.map((photoUrl, photoIndex) => (
                          <div key={`achievement-${index}-photo-${photoIndex}`} className="relative group">
                            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                              <img 
                                src={photoUrl} 
                                alt={`${achievement.title} - Photo ${photoIndex + 1}`}
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  console.error('Failed to load achievement photo:', photoUrl);
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              {/* Fallback for broken images */}
                              <div 
                                className="w-full h-48 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center"
                                style={{ display: 'none' }}
                              >
                                <div className="text-center">
                                  <span className="text-4xl mb-2 block">🏆</span>
                                  <p className="text-yellow-600 text-sm">Photo unavailable</p>
                                </div>
                              </div>
                            </div>
                            {/* Photo overlay with title */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white text-sm font-medium">Photo {photoIndex + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Professional Memberships */}
      {profileData?.professionalMemberships?.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-rose-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Memberships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.professionalMemberships.map((membership, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-red-200 text-center hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl mb-4">🏛️</div>
                  <p className="text-red-800 font-semibold text-lg">
                    {typeof membership === 'string' ? membership : membership?.name || 'Unknown Membership'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills & Specializations */}
      {profileData?.skills?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Skills & Specializations</h2>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Languages */}
      {profileData?.languages?.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {profileData.languages.map((language, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-lg text-center border border-rose-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl mb-2">🌍</div>
                  <p className="text-rose-800 font-semibold">{language}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Heart Conditions */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Heart Conditions We Treat</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-red-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-red-800">Coronary Artery Disease</h3>
              <p className="text-sm text-gray-600">Blocked heart arteries</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-rose-800">Heart Failure</h3>
              <p className="text-sm text-gray-600">Weakened heart muscle</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-pink-800">Arrhythmias</h3>
              <p className="text-sm text-gray-600">Irregular heartbeat</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow text-center">
              <h3 className="font-semibold mb-2 text-red-900">Hypertension</h3>
              <p className="text-sm text-gray-600">High blood pressure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      {profileData?.interests?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Interests & Hobbies</h2>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {profileData.interests.map((interest, index) => (
                  <span key={index} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Links */}
      {profileData?.socialLinks && Object.keys(profileData.socialLinks).some(key => profileData.socialLinks[key]) && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-rose-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Connect With Dr. {profileData.fullName || profileData.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {profileData.socialLinks.linkedin && (
                <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg">
                  <span className="mr-3 text-2xl">💼</span>
                  LinkedIn
                </a>
              )}
              {profileData.socialLinks.github && (
                <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg">
                  <span className="mr-3 text-2xl">🐙</span>
                  GitHub
                </a>
              )}
              {profileData.socialLinks.twitter && (
                <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-6 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg">
                  <span className="mr-3 text-2xl">🐦</span>
                  Twitter
                </a>
              )}
              {profileData.socialLinks.website && (
                <a href={profileData.socialLinks.website} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg">
                  <span className="mr-3 text-2xl">🌐</span>
                  Website
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Heart Health Consultation</h2>
          <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Your heart health is our priority</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Cardiology Clinic: {data.personalInfo.phoneNumber}
              </div>
              <div className="text-lg">
                📧 Email: {data.personalInfo.professionalEmail}
              </div>
            </div>
            {data.personalInfo.address && (
              <div className="text-lg mt-4">
                🏥 Address: {data.personalInfo.address}
              </div>
            )}
            {profileData && (
              <div className="mt-6 pt-6 border-t border-red-500/30">
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

export default Cardiologist;
