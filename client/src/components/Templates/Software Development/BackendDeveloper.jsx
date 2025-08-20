import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const BackendDeveloper = () => {
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
            specializations: data.specializations || ['API Development', 'Database Design', 'Cloud Architecture', 'Microservices'],
            skills: data.skills || [
              'Node.js & Express.js',
              'Python & Django/Flask',
              'Java & Spring Boot',
              'Database Design (SQL/NoSQL)',
              'REST & GraphQL APIs',
              'Cloud Services (AWS, Azure)',
              'Docker & Kubernetes',
              'System Architecture Design'
            ],
            projects: data.projects || [
              {
                name: 'E-Commerce API Platform',
                description: 'Scalable REST API serving 1M+ requests daily with microservices architecture',
                technologies: ['Node.js', 'MongoDB', 'Redis', 'AWS'],
                metrics: '99.9% uptime, <200ms response time'
              },
              {
                name: 'Real-Time Analytics System',
                description: 'High-performance data processing pipeline handling 10GB+ daily data streams',
                technologies: ['Python', 'Apache Kafka', 'PostgreSQL', 'Docker'],
                metrics: '10x performance improvement'
              },
              {
                name: 'Authentication Microservice',
                description: 'JWT-based authentication system with OAuth integration for enterprise clients',
                technologies: ['Java', 'Spring Security', 'MySQL', 'Kubernetes'],
                metrics: 'Serving 50+ applications'
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-indigo-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-indigo-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-indigo-100 font-medium">Server-Side Architecture Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                {profileData.name || 'James Mitchell'}
              </h1>
              <p className="text-2xl text-indigo-100 mb-4">
                {profileData.title || 'Senior Backend Developer'}
              </p>
              <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
                {profileData.bio || 'Expert backend developer specializing in scalable server architectures, API design, and cloud infrastructure. Passionate about building robust systems that power modern applications with high performance and reliability.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300">
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
                    <span className="text-8xl">🔧</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                System Architecture Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-indigo-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Backend Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Backend Development Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive server-side development and system architecture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🔌'}
                    {index === 1 && '🗄️'}
                    {index === 2 && '☁️'}
                    {index === 3 && '⚙️'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Scalable backend solutions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Backend Systems & APIs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-performance backend solutions powering modern applications
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {profileData.projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🛒'}
                    {index === 1 && '📊'}
                    {index === 2 && '🔐'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                  📈 {project.metrics}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern backend technologies and frameworks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
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

      {/* Architecture Principles */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Design Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building robust, scalable, and maintainable backend systems
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Scalability', description: 'Horizontal and vertical scaling strategies', icon: '📈' },
              { title: 'Security', description: 'Authentication, authorization, and data protection', icon: '🔒' },
              { title: 'Performance', description: 'Optimized queries and caching strategies', icon: '⚡' },
              { title: 'Reliability', description: 'Error handling and fault tolerance', icon: '🛡️' },
              { title: 'Monitoring', description: 'Logging, metrics, and health checks', icon: '📊' },
              { title: 'Documentation', description: 'API documentation and code comments', icon: '📚' }
            ].map((principle, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl text-white">{principle.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Backend development career progression and achievements
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Principal Backend Engineer',
                organization: 'CloudScale Technologies',
                duration: '2022 - Present',
                description: 'Architecting microservices infrastructure, leading backend team of 8 developers, and driving technical decisions for enterprise-scale applications'
              },
              {
                position: 'Senior Backend Developer',
                organization: 'DataFlow Systems',
                duration: '2019 - 2022',
                description: 'Designed and implemented high-performance APIs, optimized database queries reducing response time by 60%, and mentored junior developers'
              },
              {
                position: 'Backend Developer',
                organization: 'StartupVenture Inc.',
                duration: '2017 - 2019',
                description: 'Built RESTful APIs using Node.js and MongoDB, implemented authentication systems, and deployed applications on AWS cloud infrastructure'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg border border-indigo-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🏢</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-indigo-600 mb-3">{exp.organization}</h4>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Build Scalable Backend Solutions</h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Ready to architect and develop high-performance backend systems
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-indigo-100">{profileData.email || 'james@backenddev.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-indigo-100">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-indigo-100">{profileData.location || 'San Francisco, CA'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackendDeveloper;
