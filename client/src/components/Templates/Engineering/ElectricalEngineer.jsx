import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const ElectricalEngineer = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  const fetchProfileData = async () => {
    try {
      if (user?.username) {
        const data = await profileAPI.getProfile(user.username);
        if (data) {
          setProfileData(prev => ({
            ...prev,
            ...data,
            specializations: data.specializations || ['Power Systems', 'Control Systems', 'Electronics', 'Renewable Energy'],
            skills: data.skills || [
              'Circuit Design & Analysis',
              'Power System Analysis',
              'PLC Programming',
              'MATLAB/Simulink',
              'AutoCAD Electrical',
              'SCADA Systems',
              'Motor Control Systems',
              'Power Electronics'
            ],
            projects: data.projects || [
              {
                name: 'Smart Grid Implementation',
                description: 'Designed and deployed smart grid infrastructure improving energy efficiency by 35%',
                technologies: ['SCADA', 'IoT Sensors', 'Data Analytics']
              },
              {
                name: 'Industrial Automation System',
                description: 'Developed automated manufacturing control system reducing downtime by 50%',
                technologies: ['PLC', 'HMI', 'Industrial Networks']
              },
              {
                name: 'Solar Power Plant Design',
                description: 'Engineered 50MW solar photovoltaic power generation facility',
                technologies: ['PVsyst', 'Grid Integration', 'Power Electronics']
              }
            ]
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-yellow-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-yellow-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-500 via-orange-600 to-amber-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-300 rounded-full mr-3 animate-pulse"></div>
                <span className="text-yellow-100 font-medium">Electrical & Power Systems Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                {profileData.name || 'David Kumar'}
              </h1>
              <p className="text-2xl text-yellow-100 mb-4">
                {profileData.title || 'Senior Electrical Engineer, PE'}
              </p>
              <p className="text-lg text-yellow-200 mb-8 leading-relaxed">
                {profileData.bio || 'Expert electrical engineer specializing in power systems, automation, and renewable energy solutions. Passionate about creating efficient electrical systems that power modern infrastructure and sustainable technology advancement.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300">
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
                    <span className="text-8xl">⚡</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-orange-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                Power Systems Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-300/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-orange-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Electrical Engineering Specializations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced expertise in electrical systems and power engineering
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '⚡'}
                    {index === 1 && '🎛️'}
                    {index === 2 && '🔌'}
                    {index === 3 && '☀️'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Advanced electrical engineering solutions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engineering Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative electrical systems powering modern infrastructure
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {profileData.projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🔌'}
                    {index === 1 && '🏭'}
                    {index === 2 && '☀️'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-yellow-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive electrical engineering skills and technologies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
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
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progressive career development in electrical engineering and power systems
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Principal Electrical Engineer',
                organization: 'PowerTech Solutions Inc.',
                duration: '2020 - Present',
                description: 'Leading electrical design teams for major infrastructure projects, specializing in smart grid technology and renewable energy integration'
              },
              {
                position: 'Senior Electrical Engineer',
                organization: 'Industrial Automation Corp',
                duration: '2017 - 2020',
                description: 'Designed control systems and power distribution networks for manufacturing facilities, managed project budgets exceeding $2M'
              },
              {
                position: 'Electrical Design Engineer',
                organization: 'Energy Systems Ltd.',
                duration: '2014 - 2017',
                description: 'Developed electrical schematics and conducted power system analysis for commercial and industrial clients'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🏢</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-orange-600 mb-3">{exp.organization}</h4>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Professional Credentials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Academic foundation and professional engineering qualifications
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(profileData.education.length > 0 ? profileData.education : [
              {
                degree: 'Master of Science in Electrical Engineering',
                institution: 'Georgia Institute of Technology',
                year: '2014',
                achievement: 'Specialization in Power Systems & Control'
              },
              {
                degree: 'Bachelor of Science in Electrical Engineering',
                institution: 'University of Illinois at Urbana-Champaign',
                year: '2012',
                achievement: 'Summa Cum Laude, IEEE Honor Society'
              },
              {
                degree: 'Professional Engineer (PE) License',
                institution: 'Texas State Board',
                year: '2018',
                achievement: 'Licensed Professional Engineer - Electrical'
              },
              {
                degree: 'PMP Certification',
                institution: 'Project Management Institute',
                year: '2020',
                achievement: 'Project Management Professional'
              }
            ]).map((edu, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-xl text-white">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-orange-600 font-semibold mb-1">{edu.institution}</p>
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

      {/* Services */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engineering Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive electrical engineering solutions for diverse applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Power System Design', icon: '⚡', description: 'Electrical distribution and power analysis' },
              { name: 'Control Systems', icon: '🎛️', description: 'Automation and process control solutions' },
              { name: 'Circuit Design', icon: '🔌', description: 'Electronic and electrical circuit development' },
              { name: 'Renewable Energy', icon: '☀️', description: 'Solar and wind power system integration' },
              { name: 'Motor Control', icon: '⚙️', description: 'Industrial motor drive systems' },
              { name: 'Testing & Commissioning', icon: '🔍', description: 'System validation and quality assurance' }
            ].map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl text-white">{service.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 via-orange-600 to-amber-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Power Your Next Project</h2>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Ready to deliver innovative electrical engineering solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-yellow-100">{profileData.email || 'david@electricaleng.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-yellow-100">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-yellow-100">{profileData.location || 'Houston, TX'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElectricalEngineer;
