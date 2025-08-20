import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const FrontendDeveloper = () => {
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
            specializations: data.specializations || ['React Development', 'UI/UX Design', 'Responsive Web', 'Performance Optimization'],
            skills: data.skills || [
              'React.js & Next.js',
              'Vue.js & Nuxt.js',
              'TypeScript & JavaScript',
              'HTML5 & CSS3',
              'Tailwind CSS & Styled Components',
              'Redux & Zustand',
              'Webpack & Vite',
              'Web Performance Optimization'
            ],
            projects: data.projects || [
              {
                name: 'E-Commerce Dashboard',
                description: 'Modern React-based admin dashboard with real-time analytics and responsive design',
                technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
                metrics: '98% Lighthouse Score'
              },
              {
                name: 'Social Media App',
                description: 'Progressive Web App with offline functionality and push notifications',
                technologies: ['Vue.js', 'PWA', 'Service Workers', 'Vuex'],
                metrics: '100k+ active users'
              },
              {
                name: 'Design System Library',
                description: 'Reusable component library with Storybook documentation and automated testing',
                technologies: ['React', 'Storybook', 'Jest', 'Chromatic'],
                metrics: 'Used by 15+ teams'
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-pink-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-pink-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-pink-100 font-medium">User Experience & Interface Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                {profileData.name || 'Sarah Williams'}
              </h1>
              <p className="text-2xl text-pink-100 mb-4">
                {profileData.title || 'Senior Frontend Developer'}
              </p>
              <p className="text-lg text-pink-200 mb-8 leading-relaxed">
                {profileData.bio || 'Creative frontend developer with expertise in modern JavaScript frameworks and responsive design. Passionate about crafting beautiful, intuitive user interfaces that provide exceptional user experiences across all devices.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
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
                    <span className="text-8xl">🎨</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-pink-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                UI/UX Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-pink-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Frontend Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frontend Development Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive frontend development and user experience design
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-pink-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '⚛️'}
                    {index === 1 && '🎨'}
                    {index === 2 && '📱'}
                    {index === 3 && '⚡'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Modern frontend solutions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Web Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beautiful, responsive, and performant user interfaces
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {profileData.projects.map((project, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '📊'}
                    {index === 1 && '📱'}
                    {index === 2 && '🔧'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                  🏆 {project.metrics}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frontend Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern frontend frameworks, libraries, and tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
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

      {/* Design Process */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Design & Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              User-centered approach to frontend development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Research & Analysis', description: 'Understanding user needs and business goals', icon: '🔍' },
              { step: '2', title: 'Design & Prototype', description: 'Creating wireframes and interactive prototypes', icon: '✏️' },
              { step: '3', title: 'Development & Testing', description: 'Building responsive and accessible interfaces', icon: '💻' },
              { step: '4', title: 'Launch & Optimize', description: 'Deployment and performance optimization', icon: '🚀' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">{process.icon}</span>
                </div>
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core principles that guide frontend development decisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'User-Centered', description: 'Designing with users first in mind', icon: '👥' },
              { title: 'Responsive', description: 'Seamless experience across all devices', icon: '📱' },
              { title: 'Accessible', description: 'Inclusive design for all users', icon: '♿' },
              { title: 'Performance', description: 'Fast loading and smooth interactions', icon: '⚡' },
              { title: 'Maintainable', description: 'Clean, organized, and scalable code', icon: '🔧' },
              { title: 'Modern', description: 'Latest technologies and best practices', icon: '✨' }
            ].map((principle, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
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
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Frontend development career progression and achievements
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Senior Frontend Developer',
                organization: 'DesignTech Solutions',
                duration: '2021 - Present',
                description: 'Leading frontend team of 6 developers, architecting component libraries, and driving UI/UX improvements that increased user engagement by 40%'
              },
              {
                position: 'Frontend Developer',
                organization: 'Creative Digital Agency',
                duration: '2019 - 2021',
                description: 'Developed responsive web applications using React and Vue.js, collaborated with designers to implement pixel-perfect interfaces, and optimized performance'
              },
              {
                position: 'Junior Frontend Developer',
                organization: 'WebCraft Studio',
                duration: '2017 - 2019',
                description: 'Built interactive websites with HTML, CSS, and JavaScript, learned modern frameworks, and contributed to improving development workflows'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🎨</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-pink-600 font-semibold bg-pink-100 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-pink-600 mb-3">{exp.organization}</h4>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Create Beautiful User Experiences</h2>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto">
              Ready to bring your design vision to life with modern frontend technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-pink-100">{profileData.email || 'sarah@frontenddev.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-pink-100">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-pink-100">{profileData.location || 'New York, NY'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontendDeveloper;
