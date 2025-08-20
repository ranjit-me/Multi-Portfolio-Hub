import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const Dentist = () => {
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
    services: [],
    procedures: [],
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
            specializations: data.specializations || ['General Dentistry', 'Cosmetic Dentistry', 'Oral Surgery'],
            services: data.services || [
              'Dental Examinations',
              'Teeth Cleaning',
              'Dental Fillings',
              'Root Canal Therapy',
              'Dental Implants',
              'Teeth Whitening'
            ],
            procedures: data.procedures || [
              'Preventive Care',
              'Restorative Dentistry',
              'Cosmetic Procedures',
              'Oral Surgery',
              'Orthodontics',
              'Periodontal Treatment'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-teal-600 to-cyan-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-blue-100 font-medium">Dental Care Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {profileData.name || 'Dr. Michael Chen'}
              </h1>
              <p className="text-2xl text-blue-100 mb-4">
                {profileData.title || 'Doctor of Dental Surgery (DDS)'}
              </p>
              <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                {profileData.bio || 'Providing comprehensive dental care with the latest technology and techniques. Committed to helping patients achieve optimal oral health and beautiful smiles through personalized treatment plans.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
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
                    <span className="text-8xl">🦷</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                Oral Health Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dental Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dental care for all your oral health needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">
                    {index === 0 && '🔍'}
                    {index === 1 && '✨'}
                    {index === 2 && '🦷'}
                    {index === 3 && '🔧'}
                    {index === 4 && '⚙️'}
                    {index === 5 && '💫'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service}</h3>
                <p className="text-gray-600">Professional dental care with modern techniques</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized dental care across multiple disciplines
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">🦷</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Advanced treatment techniques and procedures</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Treatment Procedures</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern dental procedures for optimal oral health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profileData.procedures.map((procedure, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-xl text-white">
                      {index === 0 && '🛡️'}
                      {index === 1 && '🔧'}
                      {index === 2 && '✨'}
                      {index === 3 && '⚕️'}
                      {index === 4 && '📐'}
                      {index === 5 && '🦷'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{procedure}</h3>
                    <p className="text-gray-600">
                      State-of-the-art dental procedures with patient comfort in mind
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Years of dedicated service in dental care
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Senior Dentist & Practice Owner',
                organization: 'Bright Smile Dental Clinic',
                duration: '2018 - Present',
                description: 'Leading comprehensive dental care services, managing clinic operations, and mentoring junior dentists'
              },
              {
                position: 'Associate Dentist',
                organization: 'Metro Dental Group',
                duration: '2014 - 2018',
                description: 'Provided general and cosmetic dental services, specialized in restorative procedures'
              },
              {
                position: 'Dental Resident',
                organization: 'University Dental Hospital',
                duration: '2012 - 2014',
                description: 'Completed advanced training in oral surgery, endodontics, and prosthodontics'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🏥</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">{exp.organization}</h4>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Training</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Academic foundation and professional development
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(profileData.education.length > 0 ? profileData.education : [
              {
                degree: 'Doctor of Dental Surgery (DDS)',
                institution: 'Harvard School of Dental Medicine',
                year: '2012',
                achievement: 'Summa Cum Laude'
              },
              {
                degree: 'Bachelor of Science in Biology',
                institution: 'Massachusetts Institute of Technology',
                year: '2008',
                achievement: 'Magna Cum Laude'
              },
              {
                degree: 'Advanced Certificate in Oral Surgery',
                institution: 'Johns Hopkins University',
                year: '2014',
                achievement: 'Board Certified'
              },
              {
                degree: 'Certificate in Cosmetic Dentistry',
                institution: 'American Academy of Cosmetic Dentistry',
                year: '2016',
                achievement: 'Accredited Member'
              }
            ]).map((edu, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-xl text-white">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{edu.institution}</p>
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

      {/* Technology & Equipment */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art dental equipment for superior patient care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Digital X-Rays', icon: '📡', description: 'Low-radiation digital imaging' },
              { name: 'Laser Dentistry', icon: '💡', description: 'Minimally invasive procedures' },
              { name: '3D Imaging', icon: '📷', description: 'Precise treatment planning' },
              { name: 'Intraoral Cameras', icon: '🔍', description: 'Enhanced diagnosis' },
              { name: 'CAD/CAM Technology', icon: '⚙️', description: 'Same-day restorations' },
              { name: 'Air Purification', icon: '💨', description: 'Clean, safe environment' }
            ].map((tech, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl text-white">{tech.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{tech.name}</h3>
                  <p className="text-gray-600 text-sm">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Schedule Your Visit</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience exceptional dental care in a comfortable, modern environment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-blue-100">{profileData.email || 'contact@brightsmile.com'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-blue-100">{profileData.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-blue-100">{profileData.location || 'San Francisco, CA'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
              Book Appointment Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dentist;
