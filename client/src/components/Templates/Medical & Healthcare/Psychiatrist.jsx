import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const Psychiatrist = () => {
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
    publications: [],
    achievements: [],
    services: [],
    researchAreas: [],
    treatmentApproaches: []
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
            specializations: data.specializations || ['General Psychiatry', 'Mood Disorders', 'Anxiety Disorders'],
            services: data.services || [
              'Psychiatric Evaluation',
              'Medication Management',
              'Psychotherapy',
              'Crisis Intervention',
              'Family Therapy'
            ],
            researchAreas: data.researchAreas || [
              'Depression and Anxiety',
              'Bipolar Disorder',
              'Schizophrenia',
              'PTSD Treatment',
              'Adolescent Mental Health'
            ],
            treatmentApproaches: data.treatmentApproaches || [
              'Cognitive Behavioral Therapy (CBT)',
              'Dialectical Behavior Therapy (DBT)',
              'Psychodynamic Therapy',
              'Medication-Assisted Treatment',
              'Mindfulness-Based Interventions'
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
      <section className="relative bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-teal-100 font-medium">Mental Health Specialist</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                {profileData.name || 'Dr. Sarah Johnson'}
              </h1>
              <p className="text-2xl text-teal-100 mb-4">
                {profileData.title || 'Board-Certified Psychiatrist'}
              </p>
              <p className="text-lg text-teal-200 mb-8 leading-relaxed">
                {profileData.bio || 'Dedicated to improving mental health through comprehensive psychiatric care, evidence-based treatments, and compassionate patient support. Specializing in mood disorders, anxiety, and trauma-informed care.'}
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
                    <span className="text-8xl">🧘‍♂️</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-teal-600 px-6 py-2 rounded-full font-semibold shadow-lg">
                Mental Health Expert
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-teal-300/30 rounded-full animate-bounce delay-300"></div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Areas of Specialization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive psychiatric care across multiple mental health conditions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.specializations.map((specialization, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl border border-teal-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{specialization}</h3>
                <p className="text-gray-600">Comprehensive treatment and management strategies</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Clinical Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mental health services tailored to individual needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profileData.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-xl text-white">
                      {index === 0 && '📋'}
                      {index === 1 && '💊'}
                      {index === 2 && '🗣️'}
                      {index === 3 && '🚨'}
                      {index === 4 && '👨‍👩‍👧‍👦'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service}</h3>
                    <p className="text-gray-600">
                      Professional psychiatric care with evidence-based treatment approaches
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Approaches */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Treatment Approaches</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based therapeutic methodologies for optimal patient outcomes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.treatmentApproaches.map((approach, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-xl border border-teal-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{approach}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Specialized therapeutic intervention</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Years of dedicated service in mental health care
            </p>
          </div>
          <div className="space-y-8">
            {(profileData.experience.length > 0 ? profileData.experience : [
              {
                position: 'Senior Psychiatrist',
                organization: 'Metropolitan Mental Health Center',
                duration: '2018 - Present',
                description: 'Leading psychiatric care for complex cases, supervising residents, and conducting clinical research'
              },
              {
                position: 'Staff Psychiatrist',
                organization: 'City General Hospital',
                duration: '2014 - 2018',
                description: 'Providing comprehensive psychiatric services in both inpatient and outpatient settings'
              },
              {
                position: 'Psychiatric Resident',
                organization: 'University Medical Center',
                duration: '2010 - 2014',
                description: 'Completed psychiatry residency training with rotations in all major psychiatric subspecialties'
              }
            ]).map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl text-white">🏥</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-teal-600 font-semibold bg-teal-50 px-3 py-1 rounded-full text-sm">
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

      {/* Research Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Interests</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contributing to the advancement of psychiatric knowledge and treatment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.researchAreas.map((area, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-teal-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl text-white">🔬</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area}</h3>
                  <p className="text-gray-600">Active research and clinical investigation</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Publications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contributing to psychiatric literature and evidence-based practice
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(profileData.publications.length > 0 ? profileData.publications : [
              {
                title: 'Novel Approaches to Treatment-Resistant Depression',
                journal: 'Journal of Clinical Psychiatry',
                year: '2024',
                citation: 'Impact factor: 4.5'
              },
              {
                title: 'Trauma-Informed Care in Psychiatric Settings',
                journal: 'American Journal of Psychiatry',
                year: '2023',
                citation: 'Impact factor: 18.1'
              },
              {
                title: 'Digital Mental Health Interventions: A Meta-Analysis',
                journal: 'Psychiatric Services',
                year: '2023',
                citation: 'Impact factor: 3.9'
              },
              {
                title: 'Adolescent Mental Health: Early Intervention Strategies',
                journal: 'Journal of the American Academy of Child & Adolescent Psychiatry',
                year: '2022',
                citation: 'Impact factor: 9.1'
              }
            ]).map((pub, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-xl text-white">📄</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                    <p className="text-teal-600 font-semibold mb-1">{pub.journal}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{pub.year}</span>
                      <span className="mx-2">•</span>
                      <span>{pub.citation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get Mental Health Support</h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Professional psychiatric care with compassionate, evidence-based treatment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-teal-100">{profileData.email || 'contact@psychiatrist.com'}</p>
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
              <p className="text-teal-100">{profileData.location || 'New York, NY'}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Psychiatrist;
