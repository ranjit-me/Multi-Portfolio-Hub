import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams, Link } from 'react-router-dom';
import { profileAPI } from '../../services/api';
import '../../styles/dashboard-animations.css';

const DefaultTemplate = ({ username: propUsername = null }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { username: routeUsername } = useParams();
  const username = propUsername || routeUsername;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('DefaultTemplate useEffect triggered');
    console.log('Username from URL:', username);
    console.log('User from auth:', user);
    console.log('IsAuthenticated:', isAuthenticated);
    console.log('IsOwnProfile:', isOwnProfile);
    
    if (username) {
      fetchProfile();
    } else {
      console.log('No username provided, skipping profile fetch');
      setLoading(false);
    }
  }, [username, isAuthenticated, user]);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching profile for username:', username);
      console.log('Is own profile:', isOwnProfile);
      console.log('Is authenticated:', isAuthenticated);
      console.log('User object:', user);
      
      // Test basic connectivity first
      console.log('Testing API connectivity...');
      const testUrl = isOwnProfile 
        ? '/api/profile' 
        : `/api/profile/user/${username}`;
      console.log('API URL:', testUrl);
      
      let response;
      if (isOwnProfile) {
        console.log('Fetching own profile (authenticated)');
        response = await profileAPI.getCurrentProfile();
      } else {
        console.log('Fetching public profile for:', username);
        response = await profileAPI.getProfileByUsername(username);
      }
      console.log('Profile API response:', response);
      console.log('Profile data received:', response.data);
      
      if (response.data) {
        setProfileData(response.data);
        console.log('Profile data set successfully');
      } else {
        console.log('No profile data in response');
        setError('No profile data received from server');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      console.error('Error message:', error.message);
      
      if (error.response?.status === 404) {
        setError(`No profile found for ${username}.`);
      } else if (error.response?.status === 401) {
        setError('Authentication required. Please log in again.');
      } else if (error.response) {
        setError(`Server error (${error.response.status}): ${error.response.data?.error || error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        setError('Network error: Unable to connect to server. Please check if the backend is running.');
      } else {
        setError('Error fetching profile: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'medical', label: 'Medical Portfolio', icon: '🏥' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '💡' }
  ];

  // Helper function to get profile type specific title
  const getProfileTypeTitle = () => {
    if (profileData?.profileType === 'doctor') {
      return profileData?.professionalTitle || 'Medical Professional';
    } else if (profileData?.profileType === 'engineer') {
      return profileData?.professionalTitle || 'Engineering Professional';
    }
    return profileData?.professionalTitle || profileData?.position || 'Professional';
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Personal Information Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <span className="mr-3">👤</span>
            Personal Information
          </h3>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
              <p className="text-xl font-semibold text-gray-900">{profileData?.fullName || profileData?.name || 'Not provided'}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Username</label>
              <p className="text-xl font-semibold text-gray-900">{profileData?.username || username}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Professional Title</label>
              <p className="text-xl font-semibold text-gray-900">{getProfileTypeTitle()}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email</label>
              <p className="text-xl font-semibold text-gray-900">{profileData?.professionalEmail || profileData?.email || 'Not provided'}</p>
            </div>
            {profileData?.phoneNumber && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Phone</label>
                <p className="text-xl font-semibold text-gray-900">{profileData.phoneNumber}</p>
              </div>
            )}
            {profileData?.location && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Location</label>
                <p className="text-xl font-semibold text-gray-900">{profileData.location}</p>
              </div>
            )}
            {profileData?.dob && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Date of Birth</label>
                <p className="text-xl font-semibold text-gray-900">{new Date(profileData.dob).toLocaleDateString()}</p>
              </div>
            )}
            {profileData?.address && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Address</label>
                <p className="text-xl font-semibold text-gray-900">{profileData.address}</p>
              </div>
            )}
            {profileData?.linkedInOrWebsite && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">LinkedIn/Website</label>
                <a href={profileData.linkedInOrWebsite} target="_blank" rel="noopener noreferrer" 
                   className="text-xl font-semibold text-blue-600 hover:text-blue-700 break-all">
                  {profileData.linkedInOrWebsite}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      {profileData?.about && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">📝</span>
              About Me
            </h3>
          </div>
          <div className="p-8">
            <p className="text-gray-700 leading-relaxed text-lg">{profileData.about}</p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold">{profileData?.experience?.length || 0}</div>
          <div className="text-blue-100 text-sm uppercase tracking-wide">Work Experience</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold">{profileData?.education?.length || 0}</div>
          <div className="text-green-100 text-sm uppercase tracking-wide">Education</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold">{profileData?.certifications?.length || 0}</div>
          <div className="text-purple-100 text-sm uppercase tracking-wide">Certifications</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold">{profileData?.projects?.length || 0}</div>
          <div className="text-orange-100 text-sm uppercase tracking-wide">Projects</div>
        </div>
      </div>
    </div>
  );

  const renderExperienceTab = () => (
    <div className="space-y-8">
      {/* Work Experience */}
      {profileData?.experience?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">💼</span>
              Work Experience
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{exp.position}</h4>
                    <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medical Experience */}
      {profileData?.medicalExperience?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🏥</span>
              Medical Experience
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.medicalExperience.map((exp, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h4>
                    <p className="text-lg text-red-600 font-semibold">{exp.hospitalName}</p>
                    {exp.department && <p className="text-gray-600">{exp.department}</p>}
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engineering Experience */}
      {profileData?.engineeringExperiences?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">⚙️</span>
              Engineering Experience
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.engineeringExperiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{exp.projectName}</h4>
                    {exp.company && <p className="text-lg text-gray-600 font-semibold">{exp.company}</p>}
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    {exp.startDate && <p>{exp.startDate} - {exp.endDate || 'Present'}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderEducationTab = () => (
    <div className="space-y-8">
      {profileData?.education?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🎓</span>
              Education
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-lg text-indigo-600 font-semibold">{edu.university || edu.institute}</p>
                    {edu.fieldOfStudy && <p className="text-gray-600">Field: {edu.fieldOfStudy}</p>}
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{edu.startDate} - {edu.endDate}</p>
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
      )}
    </div>
  );

  const renderMedicalTab = () => (
    <div className="space-y-8">
      {/* Certifications */}
      {profileData?.certifications?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">📜</span>
              Certifications
            </h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData.certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-green-600 font-semibold mb-2">{cert.authority}</p>
                {cert.dateIssued && (
                  <p className="text-gray-500 text-sm mb-2">Issued: {cert.dateIssued}</p>
                )}
                {cert.expiryDate && (
                  <p className="text-gray-500 text-sm mb-2">Expires: {cert.expiryDate}</p>
                )}
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-green-700 hover:text-green-800 text-sm underline">
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internships */}
      {profileData?.internships?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🩺</span>
              Internships
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.internships.map((internship, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{internship.hospitalName}</h4>
                    <p className="text-lg text-blue-600 font-semibold">{internship.department}</p>
                    {internship.position && <p className="text-gray-600">{internship.position}</p>}
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{internship.startDate} - {internship.endDate}</p>
                    {internship.location && <p>{internship.location}</p>}
                  </div>
                </div>
                {internship.description && (
                  <p className="text-gray-700 leading-relaxed">{internship.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {profileData?.publications?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">📚</span>
              Publications
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.publications.map((pub, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-6 pb-6 last:pb-0">
                <div className="mb-3">
                  <h4 className="text-xl font-bold text-gray-900">{pub.title}</h4>
                  <p className="text-lg text-purple-600 font-semibold">{pub.publisher}</p>
                  {pub.authors && <p className="text-gray-600">Authors: {pub.authors}</p>}
                  {pub.datePublished && <p className="text-gray-500 text-sm">Published: {pub.datePublished}</p>}
                </div>
                {pub.description && (
                  <p className="text-gray-700 leading-relaxed">{pub.description}</p>
                )}
                {pub.publicationUrl && (
                  <a href={pub.publicationUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-purple-700 hover:text-purple-800 text-sm underline mt-2 inline-block">
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conferences */}
      {profileData?.conferences?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🎤</span>
              Conferences
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.conferences.map((conf, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{conf.name}</h4>
                    <p className="text-lg text-orange-600 font-semibold">{conf.role}</p>
                    {conf.organizer && <p className="text-gray-600">Organized by: {conf.organizer}</p>}
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    {conf.date && <p>{conf.date}</p>}
                    {conf.location && <p>{conf.location}</p>}
                  </div>
                </div>
                {conf.description && (
                  <p className="text-gray-700 leading-relaxed">{conf.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Memberships */}
      {profileData?.professionalMemberships?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🏛️</span>
              Professional Memberships
            </h3>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileData.professionalMemberships.map((membership, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200 text-center">
                  <p className="text-teal-800 font-semibold">
                    {typeof membership === 'string' ? membership : membership?.name || 'Unknown Membership'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-8">
      {profileData?.achievements?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🏆</span>
              Achievements & Awards
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="border-l-4 border-yellow-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{achievement.title}</h4>
                    <p className="text-lg text-yellow-600 font-semibold">{achievement.associatedWith || achievement.issuer}</p>
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    {achievement.date && <p>{achievement.date}</p>}
                  </div>
                </div>
                {achievement.description && (
                  <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-8">
      {profileData?.projects?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🚀</span>
              Projects
            </h3>
          </div>
          <div className="p-8 space-y-6">
            {profileData.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-6 pb-6 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{project.projectName}</h4>
                    {project.company && <p className="text-lg text-indigo-600 font-semibold">{project.company}</p>}
                    {project.location && <p className="text-gray-600">{project.location}</p>}
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <p>{project.startDate} - {project.endDate || 'Ongoing'}</p>
                    {project.projectLink && (
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" 
                         className="text-indigo-600 hover:text-indigo-700 underline">
                        View Project
                      </a>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                )}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(',').filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-8">
      {/* Skills */}
      {profileData?.skills?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">💡</span>
              Skills & Technologies
            </h3>
          </div>
          <div className="p-8">
            <div className="flex flex-wrap gap-3">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      {profileData?.languages?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-teal-600 to-green-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🌍</span>
              Languages
            </h3>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileData.languages.map((language, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 border border-teal-200 text-center">
                  <p className="text-teal-800 font-semibold text-lg">{language}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interests */}
      {profileData?.interests?.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🎯</span>
              Interests
            </h3>
          </div>
          <div className="p-8">
            <div className="flex flex-wrap gap-3">
              {profileData.interests.map((interest, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Social Links */}
      {profileData?.socialLinks && Object.keys(profileData.socialLinks).some(key => profileData.socialLinks[key]) && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🔗</span>
              Connect With Me
            </h3>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {profileData.socialLinks.linkedin && (
                <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span className="mr-2">💼</span>
                  LinkedIn
                </a>
              )}
              {profileData.socialLinks.github && (
                <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span className="mr-2">🐙</span>
                  GitHub
                </a>
              )}
              {profileData.socialLinks.twitter && (
                <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-4 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span className="mr-2">🐦</span>
                  Twitter
                </a>
              )}
              {profileData.socialLinks.website && (
                <a href={profileData.socialLinks.website} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center p-4 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span className="mr-2">🌐</span>
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative w-full px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-left lg:flex-1 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isOwnProfile ? (
                    <>Welcome, <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent animate-pulse drop-shadow-lg">{user?.username}</span>!</>
                  ) : (
                    <>{username}'s <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">Portfolio</span></>
                  )}
                </h1>
                <p className="text-xl sm:text-2xl text-indigo-100 mb-6 opacity-90 font-light leading-relaxed">
                  {profileData ? getProfileTypeTitle() : (isOwnProfile ? 'Your professional portfolio dashboard' : 'Professional portfolio')}
                </p>
                {profileData?.profileType && (
                  <div className="mb-8">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      profileData.profileType === 'doctor' 
                        ? 'bg-red-100 text-red-800 border border-red-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {profileData.profileType === 'doctor' ? '🩺 Medical Professional' : '⚙️ Engineering Professional'}
                    </span>
                  </div>
                )}
                {isOwnProfile && (
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up">
                    <Link
                      to={`/${user?.username}/edit`}
                      className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                    >
                      <span className="mr-2">✏️</span>
                      Edit Profile
                    </Link>
                    <button
                      onClick={fetchProfile}
                      className="group inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg border border-white/20"
                    >
                      <span className="mr-2">🔄</span>
                      Refresh
                    </button>
                    <button
                      onClick={handleLogout}
                      className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-bold rounded-xl hover:from-red-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                    >
                      <span className="mr-2">🚪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-8 lg:mt-0 lg:flex-1 lg:ml-12 animate-fade-in-right">
                <div className="relative group">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 opacity-30 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-30 animate-spin-slow blur-sm"></div>
                      <div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-lg"></div>
                      
                      {profileData?.profilePhoto ? (
                        <>
                          <img
                            src={profileData.profilePhoto}
                            alt={`${username}'s profile photo`}
                            className="relative z-10 w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className="hidden relative z-10 w-full h-full items-center justify-center">
                            <span className="text-6xl">{profileData?.profileType === 'doctor' ? '👨‍⚕️' : profileData?.profileType === 'engineer' ? '👨‍💻' : '👤'}</span>
                          </div>
                        </>
                      ) : (
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                          <span className="text-6xl">{profileData?.profileType === 'doctor' ? '👨‍⚕️' : profileData?.profileType === 'engineer' ? '👨‍💻' : '👤'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full px-6 py-16 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-24">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-24 w-24 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4 animate-pulse">
                <p className="text-2xl font-bold text-gray-700">Loading profile...</p>
                <p className="text-lg text-gray-500">Please wait while we fetch the data</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-24 animate-fade-in">
              <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-3xl mx-auto border border-red-100">
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Profile Information</h3>
                <p className="text-red-600 text-xl mb-10 font-medium">{error}</p>
                {isOwnProfile && (
                  <button
                    onClick={fetchProfile}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <span className="mr-2">🔄</span>
                    Try Again
                  </button>
                )}
              </div>
            </div>
          ) : profileData ? (
            <>
              {/* Navigation Tabs */}
              <div className="mb-12">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50 p-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <span className="mr-2 text-lg">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="animate-fade-in-up">
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'experience' && renderExperienceTab()}
                {activeTab === 'education' && renderEducationTab()}
                {activeTab === 'medical' && renderMedicalTab()}
                {activeTab === 'achievements' && renderAchievementsTab()}
                {activeTab === 'projects' && renderProjectsTab()}
                {activeTab === 'skills' && renderSkillsTab()}
              </div>
            </>
          ) : (
            <div className="text-center py-24 animate-fade-in">
              <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-3xl mx-auto border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-4xl">👤</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {isOwnProfile ? 'Welcome to Your Dashboard' : `${username}'s Portfolio`}
                </h2>
                <p className="text-xl text-gray-600 mb-10 font-light">
                  {isOwnProfile ? 'No profile data available yet' : 'This user has not set up their profile yet.'}
                </p>
                {isOwnProfile && (
                  <Link
                    to={`/${user?.username}/edit`}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <span className="mr-2">✏️</span>
                    Create Profile
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultTemplate;
