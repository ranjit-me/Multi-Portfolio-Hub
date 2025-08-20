import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const MechanicalEngineer = ({ username = null }) => {
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
    console.log('MechanicalEngineer template useEffect triggered');
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
      console.log('Fetching profile for MechanicalEngineer template:', targetUsername);
      
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
      
      console.log('MechanicalEngineer profile API response:', response);
      
      if (response.data) {
        setProfileData(prev => ({
          ...prev,
          ...response.data,
          specializations: response.data.specializations || ['Product Design', 'Manufacturing', 'CAD/CAM', 'Automation'],
          skills: response.data.skills || [
            'SolidWorks & AutoCAD',
            'Product Design & Development',
            'Manufacturing Processes',
            'Quality Control',
            'Project Management',
            'Technical Documentation'
          ]
        }));
        console.log('MechanicalEngineer profile data set successfully');
      }
    } catch (error) {
      console.error('Error fetching profile for MechanicalEngineer template:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-600 via-slate-700 to-zinc-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-200 font-medium">Mechanical Engineering Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                {profileData.name || 'Alex Rodriguez'}
              </h1>
              <p className="text-2xl text-gray-100 mb-4">
                {profileData.title || 'Senior Mechanical Engineer'}
              </p>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                {profileData.bio || 'Innovative mechanical engineer with expertise in design, manufacturing, and automation. Passionate about creating efficient solutions that improve industrial processes and product performance through advanced engineering principles.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-700 transition-all duration-300">
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
                    <span className="text-8xl">⚙️</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 px-6 py-2 rounded-full font-semibold shadow-lg">
                Design Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-orange-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-gray-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engineering Specializations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced mechanical engineering expertise across multiple domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🔧'}
                    {index === 1 && '🏭'}
                    {index === 2 && '🌡️'}
                    {index === 3 && '🤖'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Expert-level engineering solutions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative engineering solutions that deliver real-world impact
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {profileData.projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '⚙️'}
                    {index === 1 && '🔥'}
                    {index === 2 && '🤖'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Practice Images */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engineering Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional engineering practice and project achievements
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <img 
                src="/demo-images/engineering-project.jpg" 
                alt="Engineering Project"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Project Design</h3>
                <p className="text-gray-600">Advanced mechanical engineering project development and implementation</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <img 
                src="/demo-images/profile.jpg" 
                alt="Professional Engineer"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Profile</h3>
                <p className="text-gray-600">Experienced mechanical engineer with proven track record</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <img 
                src="/demo-images/achievement-award.jpg" 
                alt="Engineering Achievement"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Recognition</h3>
                <p className="text-gray-600">Industry recognition for engineering excellence and innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive engineering skillset with industry-standard tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-slate-700 rounded-lg flex items-center justify-center mr-4">
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

      {/* Experience Timeline */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progressive career growth in mechanical engineering
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Senior Mechanical Engineer',
                organization: 'Advanced Manufacturing Solutions',
                duration: '2020 - Present',
                description: 'Lead design and development of automated manufacturing systems, manage cross-functional teams, and drive process optimization initiatives'
              },
              {
                position: 'Mechanical Design Engineer',
                organization: 'Innovation Dynamics Corp',
                duration: '2017 - 2020',
                description: 'Designed mechanical components and systems, conducted FEA analysis, and collaborated with manufacturing teams'
              },
              {
                position: 'Junior Mechanical Engineer',
                organization: 'TechStart Engineering',
                duration: '2015 - 2017',
                description: 'Assisted in product development, performed engineering calculations, and supported senior engineers in project delivery'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🏢</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-gray-600 font-semibold bg-gray-50 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-600 mb-3">{exp.organization}</h4>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Academic foundation and professional credentials
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(profileData.education.length > 0 ? profileData.education : [
              {
                degree: 'Master of Science in Mechanical Engineering',
                institution: 'Stanford University',
                year: '2015',
                achievement: 'Specialization in Robotics and Control Systems'
              },
              {
                degree: 'Bachelor of Science in Mechanical Engineering',
                institution: 'University of California, Berkeley',
                year: '2013',
                achievement: 'Magna Cum Laude, Dean\'s List'
              },
              {
                degree: 'Professional Engineer (PE) License',
                institution: 'California State Board',
                year: '2018',
                achievement: 'Licensed Professional Engineer'
              },
              {
                degree: 'Project Management Professional (PMP)',
                institution: 'Project Management Institute',
                year: '2019',
                achievement: 'Certified Project Manager'
              }
            ]).map((edu, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-700 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-xl text-white">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-gray-600 font-semibold mb-1">{edu.institution}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{edu.year}</span>
                      <span className="mx-2">•</span>
                      <span className="text-green-600 font-medium">{edu.achievement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-gray-600 via-slate-700 to-zinc-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Engineer Solutions Together</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to tackle your next mechanical engineering challenge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-gray-200">{profileData.email || 'alex@mechanicaleng.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-gray-200">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-gray-200">{profileData.location || 'San Francisco, CA'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start a Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MechanicalEngineer;
