import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const FullStackDeveloper = () => {
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
            specializations: data.specializations || ['Frontend Development', 'Backend Development', 'Database Design', 'DevOps & Cloud'],
            skills: data.skills || [
              'React.js & Next.js',
              'Node.js & Express.js',
              'Python & Django',
              'PostgreSQL & MongoDB',
              'AWS & Azure Cloud',
              'Docker & Kubernetes',
              'GraphQL & REST APIs',
              'TypeScript & JavaScript'
            ],
            projects: data.projects || [
              {
                name: 'E-Learning Platform',
                description: 'Complete learning management system with video streaming, progress tracking, and payment integration',
                technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
                scale: '10,000+ students, 500+ courses'
              },
              {
                name: 'Real-Time Chat Application',
                description: 'WebSocket-based messaging platform with file sharing and group chat functionality',
                technologies: ['Vue.js', 'Socket.io', 'Express', 'Redis'],
                scale: '50k+ concurrent users'
              },
              {
                name: 'Task Management System',
                description: 'Collaborative project management tool with real-time updates and team collaboration features',
                technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Docker'],
                scale: '1,000+ teams using daily'
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-green-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-100 font-medium">End-to-End Development Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                {profileData.name || 'Michael Chen'}
              </h1>
              <p className="text-2xl text-green-100 mb-4">
                {profileData.title || 'Full Stack Developer'}
              </p>
              <p className="text-lg text-green-200 mb-8 leading-relaxed">
                {profileData.bio || 'Versatile full-stack developer with expertise across the entire web development stack. From designing intuitive user interfaces to building scalable backend systems and managing cloud infrastructure - delivering complete web solutions.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
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
                    <span className="text-8xl">🌐</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-green-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                Full Stack Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-green-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Stack Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Full Stack Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete web development stack from frontend to backend and deployment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '⚛️'}
                    {index === 1 && '🔧'}
                    {index === 2 && '🗄️'}
                    {index === 3 && '☁️'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">End-to-end development</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Stack */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Frontend, Backend, Database, and DevOps technologies
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frontend</h3>
              <div className="space-y-3">
                {['React.js & Next.js', 'Vue.js & Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Redux/Zustand'].map((tech, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Backend</h3>
              <div className="space-y-3">
                {['Node.js & Express', 'Python & Django', 'Java & Spring', 'GraphQL & REST', 'Authentication'].map((tech, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps & Cloud */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">☁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">DevOps & Cloud</h3>
              <div className="space-y-3">
                {['AWS & Azure', 'Docker & Kubernetes', 'PostgreSQL & MongoDB', 'CI/CD Pipelines', 'Monitoring'].map((tech, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Full Stack Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete web applications built from concept to deployment
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {profileData.projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🎓'}
                    {index === 1 && '💬'}
                    {index === 2 && '📋'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                  📊 {project.scale}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Full Stack Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive approach to building complete web applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Planning', description: 'Requirements analysis and system design', icon: '📋' },
              { step: '2', title: 'Frontend', description: 'User interface and experience design', icon: '🎨' },
              { step: '3', title: 'Backend', description: 'API development and business logic', icon: '⚙️' },
              { step: '4', title: 'Database', description: 'Data modeling and optimization', icon: '🗄️' },
              { step: '5', title: 'Deploy', description: 'Cloud deployment and monitoring', icon: '🚀' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">{process.icon}</span>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive skill set across the full development stack
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
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
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Full stack development career progression and achievements
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Lead Full Stack Developer',
                organization: 'TechInnovate Solutions',
                duration: '2022 - Present',
                description: 'Leading development of enterprise web applications, architecting scalable solutions, and mentoring a team of 10 developers across frontend and backend technologies'
              },
              {
                position: 'Senior Full Stack Developer',
                organization: 'WebSolutions Inc.',
                duration: '2019 - 2022',
                description: 'Built complete web applications using React, Node.js, and cloud technologies. Delivered 15+ projects with 99.9% uptime and improved performance by 50%'
              },
              {
                position: 'Full Stack Developer',
                organization: 'StartupHub Technologies',
                duration: '2017 - 2019',
                description: 'Developed MVP applications using modern web technologies, integrated third-party APIs, and implemented responsive designs for mobile-first experiences'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🌐</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-green-600 mb-3">{exp.organization}</h4>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Build Complete Web Solutions</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Ready to develop your next full-stack application from concept to deployment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-green-100">{profileData.email || 'michael@fullstackdev.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-green-100">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-green-100">{profileData.location || 'Austin, TX'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullStackDeveloper;
