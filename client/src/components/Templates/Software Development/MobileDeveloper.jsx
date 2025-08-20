import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const MobileDeveloper = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    profileImage: '',
    bio: '',
    specializations: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    skills: [],
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('MobileDeveloper template useEffect triggered');
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
      console.log('Fetching profile for MobileDeveloper template:', targetUsername);
      
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
      
      console.log('MobileDeveloper profile API response:', response);
      
      if (response.data) {
        console.log('=== MOBILE DEVELOPER TEMPLATE - Full Profile Data ===');
        console.log('Response data keys:', Object.keys(response.data));
        console.log('Full response.data:', response.data);
        console.log('Available fields:', {
          name: response.data.name,
          email: response.data.email,
          title: response.data.title,
          bio: response.data.bio,
          location: response.data.location,
          profileImage: response.data.profileImage,
          experience: response.data.experience,
          education: response.data.education,
          skills: response.data.skills,
          projects: response.data.projects
        });
        console.log('=== End Mobile Developer Profile Data Debug ===');
        
        setProfileData(prev => ({
          ...prev,
          ...response.data,
          specializations: response.data.specializations || ['iOS Development', 'Android Development', 'Cross-Platform', 'React Native'],
          skills: response.data.skills || [
            'Swift & iOS Development',
            'Kotlin & Android Development',
            'React Native',
            'Flutter',
            'JavaScript/TypeScript',
            'Mobile UI/UX Design',
            'App Store Optimization',
            'Mobile Testing & Debugging'
          ],
          projects: response.data.projects || [
            {
              name: 'HealthTrack Mobile App',
              description: 'Cross-platform health tracking app with 100K+ downloads on both iOS and Android',
              technologies: ['React Native', 'Firebase', 'Redux'],
              platforms: ['iOS', 'Android']
            },
            {
              name: 'E-Commerce Shopping App',
              description: 'Native iOS and Android e-commerce platform with payment gateway integration',
              technologies: ['Swift', 'Kotlin', 'Stripe API'],
              platforms: ['iOS', 'Android']
            },
            {
              name: 'Social Media Dashboard',
              description: 'Flutter-based social media management app with real-time analytics',
              technologies: ['Flutter', 'Dart', 'REST APIs'],
              platforms: ['iOS', 'Android']
            }
          ]
        }));
        console.log('MobileDeveloper profile data set successfully');
      }
    } catch (error) {
      console.error('Error fetching profile for MobileDeveloper template:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-teal-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-teal-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 via-green-600 to-emerald-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-teal-100 font-medium">Mobile Application Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                {profileData.name || 'Emma Johnson'}
              </h1>
              <p className="text-2xl text-teal-100 mb-4">
                {profileData.title || 'Senior Mobile Developer'}
              </p>
              <p className="text-lg text-teal-200 mb-8 leading-relaxed">
                {profileData.bio || 'Passionate mobile developer with expertise in creating intuitive, high-performance iOS and Android applications. Specialized in cross-platform development and modern mobile technologies that deliver exceptional user experiences.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300">
                  Preview
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-96 h-96 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center mx-auto">
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt={profileData.name}
                    className="w-80 h-80 rounded-full object-cover border-4 border-white/30"
                  />
                ) : (
                  <div className="w-80 h-80 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center">
                    <span className="text-8xl">📱</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-teal-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                App Development Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-teal-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Platform Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mobile Platform Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mobile development across all major platforms
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl border border-teal-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🍎'}
                    {index === 1 && '🤖'}
                    {index === 2 && '🌐'}
                    {index === 3 && '⚛️'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Native & cross-platform solutions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Mobile Apps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative mobile applications that solve real-world problems
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {profileData.projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '💊'}
                    {index === 1 && '🛒'}
                    {index === 2 && '📊'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.platforms.map((platform, platformIndex) => (
                    <span key={platformIndex} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mobile development technologies and frameworks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-xl border border-teal-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{skill}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to mobile app development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Discovery & Planning', description: 'Understanding requirements and user needs', icon: '🎯' },
              { step: '2', title: 'Design & Prototype', description: 'Creating intuitive UI/UX designs', icon: '🎨' },
              { step: '3', title: 'Development & Testing', description: 'Building and testing the application', icon: '⚙️' },
              { step: '4', title: 'Launch & Support', description: 'App store deployment and maintenance', icon: '🚀' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">{process.icon}</span>
                </div>
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Portfolio Images */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing mobile development expertise and achievements
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100">
              <img 
                src="/demo-images/profile.jpg" 
                alt="Mobile Developer Profile"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-teal-800">Professional Developer</h3>
                <p className="text-gray-600">Senior mobile developer with expertise across iOS and Android platforms</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100">
              <img 
                src="/demo-images/engineering-project.jpg" 
                alt="Mobile App Development"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-teal-800">App Development</h3>
                <p className="text-gray-600">Creating innovative mobile applications with cutting-edge technology</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100">
              <img 
                src="/demo-images/achievement-award.jpg" 
                alt="Development Achievement"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-teal-800">Recognition</h3>
                <p className="text-gray-600">Industry recognition for mobile development excellence and innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mobile development career progression and achievements
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Senior Mobile Developer',
                organization: 'TechVision Solutions',
                duration: '2021 - Present',
                description: 'Leading mobile development team, architecting cross-platform solutions, and mentoring junior developers across iOS and Android projects'
              },
              {
                position: 'iOS Developer',
                organization: 'AppCraft Studio',
                duration: '2019 - 2021',
                description: 'Developed native iOS applications using Swift, integrated complex APIs, and optimized app performance for App Store success'
              },
              {
                position: 'Mobile Developer Intern',
                organization: 'StartupHub Inc.',
                duration: '2018 - 2019',
                description: 'Built React Native applications, participated in agile development cycles, and learned mobile development best practices'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl shadow-lg border border-teal-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">📱</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-teal-600 font-semibold bg-teal-100 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-teal-600 mb-3">{exp.organization}</h4>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Medical Templates */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Medical & Healthcare Templates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional portfolio templates for medical professionals - Coming Soon
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              'General Practitioner',
              'Surgeon Portfolio',
              'Medical Specialist',
              'Ophthalmologist',
              'Anesthesiologist',
              'Radiologist',
              'Urologist',
              'Endocrinologist',
              'Pulmonologist',
              'Gastroenterologist',
              'Nurse Practitioner',
              'Pharmacist'
            ].map((specialty, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 opacity-75 cursor-not-allowed">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🏥</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{specialty}</h3>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 via-green-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Build Amazing Mobile Apps</h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Ready to transform your mobile app idea into reality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-teal-100">{profileData.email || 'emma@mobiledev.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-teal-100">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-teal-100">{profileData.location || 'Seattle, WA'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileDeveloper;
