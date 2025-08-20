import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';
import { mapProfileData, formatForMedicalTemplate } from '../../../utils/profileDataMapper';

const Gynecologist = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('Gynecologist template useEffect triggered');
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
      console.log('Fetching profile for Gynecologist template:', targetUsername);
      
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
      
      console.log('Gynecologist profile API response:', response);
      
      if (response.data) {
        console.log('=== GYNECOLOGIST TEMPLATE - Full Profile Data ===');
        console.log('Response data keys:', Object.keys(response.data));
        console.log('Full response.data:', response.data);
        console.log('=== Individual Fields ===');
        console.log('name:', response.data.name);
        console.log('fullName:', response.data.fullName);
        console.log('email:', response.data.email);
        console.log('professionalEmail:', response.data.professionalEmail);
        console.log('phone:', response.data.phone);
        console.log('phoneNumber:', response.data.phoneNumber);
        console.log('title:', response.data.title);
        console.log('professionalTitle:', response.data.professionalTitle);
        console.log('bio:', response.data.bio);
        console.log('description:', response.data.description);
        console.log('location:', response.data.location);
        console.log('address:', response.data.address);
        console.log('profilePhoto:', response.data.profilePhoto);
        console.log('profileImage:', response.data.profileImage);
        console.log('experience:', response.data.experience);
        console.log('education:', response.data.education);
        console.log('achievements:', response.data.achievements);
        console.log('services:', response.data.services);
        console.log('specializations:', response.data.specializations);
        console.log('skills:', response.data.skills);
        console.log('certifications:', response.data.certifications);
        console.log('projects:', response.data.projects);
        console.log('=== End Profile Data Debug ===');
        
        setProfileData(response.data);
        console.log('Gynecologist profile data set successfully');
      }
    } catch (error) {
      console.error('Error fetching profile for Gynecologist template:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-pink-600 text-lg">Loading gynecologist profile...</p>
        </div>
      </div>
    );
  }

  // Use the comprehensive profile data mapper
  const mappedData = mapProfileData(profileData, user);
  const data = formatForMedicalTemplate(mappedData);

  // Add default services if none exist in database
  const defaultServices = [
    {
      title: 'Women\'s Health Exam',
      description: 'Comprehensive gynecological examinations and preventive care.',
      icon: '🌸'
    },
    {
      title: 'Prenatal Care',
      description: 'Complete pregnancy care from conception through delivery.',
      icon: '🤱'
    },
    {
      title: 'Family Planning',
      description: 'Contraception counseling and fertility management.',
      icon: '👨‍👩‍👧'
    },
    {
      title: 'Reproductive Health',
      description: 'Treatment of reproductive system disorders and conditions.',
      icon: '💕'
    },
    {
      title: 'Menopause Management',
      description: 'Hormone therapy and menopause transition support.',
      icon: '🌺'
    },
    {
      title: 'Gynecologic Surgery',
      description: 'Minimally invasive surgical procedures and treatments.',
      icon: '🏥'
    }
  ];

  // Use fetched services or default services as fallback
  const displayServices = data.services && data.services.length > 0 ? data.services : defaultServices;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-red-100 border-2 border-red-300 p-4 m-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-2">🔍 Debug Info (Development Mode)</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Data Status:</strong><br/>
              • ProfileData exists: {profileData ? '✅ Yes' : '❌ No'}<br/>
              • Username prop: {username || 'None'}<br/>
              • Auth user: {user?.username || 'None'}<br/>
              • Loading: {loading ? 'Yes' : 'No'}<br/>
              • Error: {error || 'None'}
            </div>
            <div>
              <strong>Mapped Values:</strong><br/>
              • Name: {data.personalInfo.fullName}<br/>
              • Email: {data.personalInfo.professionalEmail}<br/>
              • Title: {data.personalInfo.professionalTitle}<br/>
              • Experience: {data.experience.length} items<br/>
              • Services: {data.services.length} items<br/>
              • Raw profileData keys: {profileData ? Object.keys(profileData).join(', ') : 'None'}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-rose-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              {data.personalInfo.profilePhoto ? (
                <img 
                  src={data.personalInfo.profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl">👩‍⚕️</span>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
              <p className="text-xl text-pink-100 mb-4">{data.personalInfo.professionalTitle}</p>
              <p className="text-lg text-pink-200 max-w-2xl">
                {data.personalInfo.bio}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a 
                  href={`mailto:${data.personalInfo.professionalEmail}`}
                  className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Me
                </a>
                <a 
                  href={`tel:${data.personalInfo.phoneNumber}`}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300"
                >
                  Call Now
                </a>
              </div>
              <p className="text-pink-200 mt-2">📍 {data.personalInfo.location}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Women's Health Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-pink-500">
                <div className="text-3xl mb-4">{service.icon || '🌸'}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Medical Practice Images Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Medical Practice</h2>
          
          {/* Main Practice Showcase */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/demo-images/profile.jpg" 
                  alt="Professional Medical Profile"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {e.target.style.display = 'none';}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold">Professional Excellence</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Professional Care</h3>
                <p className="text-gray-600">Experienced gynecologist providing compassionate women's healthcare with personalized attention.</p>
                <div className="mt-4 flex items-center text-pink-600 text-sm">
                  <span className="mr-2">👩‍⚕️</span>
                  <span>Expert Medical Care</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/demo-images/clinic1.jpg" 
                  alt="Modern Medical Facility"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {e.target.style.display = 'none';}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold">Modern Facilities</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Modern Facility</h3>
                <p className="text-gray-600">State-of-the-art clinic with latest medical equipment and comfortable patient environment.</p>
                <div className="mt-4 flex items-center text-pink-600 text-sm">
                  <span className="mr-2">🏥</span>
                  <span>Advanced Equipment</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img 
                  src="/demo-images/medical-experience-1.jpg" 
                  alt="Medical Experience"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {e.target.style.display = 'none';}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold">Years of Experience</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Expert Experience</h3>
                <p className="text-gray-600">Years of specialized experience in women's health, reproductive medicine, and surgical procedures.</p>
                <div className="mt-4 flex items-center text-pink-600 text-sm">
                  <span className="mr-2">⭐</span>
                  <span>Specialized Expertise</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Medical Photos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="/demo-images/surgery1.jpg" 
                alt="Surgical Procedures"
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex';}}
              />
              <div className="w-full h-40 bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🔬</span>
                  <p className="text-pink-700 text-sm font-semibold">Surgical Excellence</p>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Surgical Procedures</h4>
                <p className="text-gray-600 text-sm">Advanced minimally invasive techniques</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="/demo-images/conference1.jpg" 
                alt="Medical Conference"
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex';}}
              />
              <div className="w-full h-40 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🎤</span>
                  <p className="text-purple-700 text-sm font-semibold">Professional Speaking</p>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Conference Speaking</h4>
                <p className="text-gray-600 text-sm">Medical education and research</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="/demo-images/internship-hospital.jpg" 
                alt="Hospital Experience"
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex';}}
              />
              <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-pink-200 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🏥</span>
                  <p className="text-blue-700 text-sm font-semibold">Hospital Experience</p>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Hospital Experience</h4>
                <p className="text-gray-600 text-sm">Comprehensive medical training</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-40 bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="text-4xl mb-2 block">💖</span>
                  <p className="text-sm font-semibold">Patient Care</p>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Compassionate Care</h4>
                <p className="text-gray-600 text-sm">Patient-centered approach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Areas of Expertise</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.specializations && data.specializations.length > 0 ? (
              data.specializations.map((spec, index) => (
                <div key={index} className="bg-pink-50 p-4 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2 text-pink-800">{spec.name || spec}</h3>
                  {spec.description && <p className="text-sm text-gray-600">{spec.description}</p>}
                </div>
              ))
            ) : (
              <>
                <div className="bg-pink-50 p-4 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2 text-pink-800">Pregnancy Care</h3>
                  <p className="text-sm text-gray-600">Prenatal through postpartum</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2 text-rose-800">Reproductive Health</h3>
                  <p className="text-sm text-gray-600">Fertility and hormonal care</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2 text-red-800">Menopause Care</h3>
                  <p className="text-sm text-gray-600">Hormone therapy management</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg shadow text-center">
                  <h3 className="font-semibold mb-2 text-purple-800">Gynecologic Surgery</h3>
                  <p className="text-sm text-gray-600">Minimally invasive procedures</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section - Display fetched data */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.position || exp.title}</h3>
                    <span className="text-pink-600 font-medium">{exp.duration || exp.period}</span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{exp.company || exp.organization}</p>
                  {exp.description && <p className="text-gray-600">{exp.description}</p>}
                  {exp.location && <p className="text-gray-500 text-sm mt-2">📍 {exp.location}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section - Display fetched data */}
      {data.education && data.education.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-pink-100 to-rose-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Education & Training</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      🎓
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{edu.degree || edu.title}</h3>
                      <p className="text-pink-600 font-medium mb-2">{edu.institution || edu.school}</p>
                      {edu.year && <p className="text-gray-500 text-sm">{edu.year}</p>}
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                      {edu.description && <p className="text-gray-600 text-sm mt-2">{edu.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section - Display fetched data */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.certifications.map((cert, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg p-6 border border-pink-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">📜</div>
                    {cert.expiryDate && (
                      <span className="text-gray-500 text-xs bg-white px-2 py-1 rounded-full">
                        Expires: {cert.expiryDate}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title || cert.name}</h3>
                  <p className="text-pink-600 font-semibold mb-2">{cert.issuingOrganization || cert.issuer || cert.organization}</p>
                  
                  {cert.issueDate && (
                    <p className="text-gray-500 text-sm mb-2">Issued: {cert.issueDate}</p>
                  )}
                  
                  {cert.credentialId && (
                    <p className="text-gray-500 text-sm mb-2">ID: {cert.credentialId}</p>
                  )}
                  
                  {cert.description && (
                    <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
                  )}
                  
                  {/* Certification Photos */}
                  {cert.certificationPhotos && cert.certificationPhotos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="mr-2">📸</span>
                        Certificate Images
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {cert.certificationPhotos.map((photoUrl, photoIndex) => (
                          <div key={`cert-${index}-photo-${photoIndex}`} className="relative group">
                            <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                              <img 
                                src={photoUrl} 
                                alt={`${cert.title || cert.name} - Certificate ${photoIndex + 1}`}
                                className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  console.error('Failed to load certification photo:', photoUrl);
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              {/* Fallback for broken images */}
                              <div className="w-full h-32 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                                <div className="text-center">
                                  <span className="text-2xl mb-1 block">📜</span>
                                  <p className="text-pink-600 text-xs">Certificate image unavailable</p>
                                </div>
                              </div>
                            </div>
                            {/* Photo overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white text-xs font-medium">Certificate {photoIndex + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {cert.verificationUrl && (
                    <div className="mt-4">
                      <a 
                        href={cert.verificationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-pink-600 hover:text-pink-700 text-sm font-medium"
                      >
                        <span className="mr-1">🔗</span>
                        Verify Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills & Expertise Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-pink-100 to-rose-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      🩺
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{skill.name || skill}</h3>
                      {skill.level && (
                        <p className="text-pink-600 text-sm font-medium">{skill.level}</p>
                      )}
                    </div>
                  </div>
                  
                  {skill.proficiency && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Proficiency</span>
                        <span className="text-sm text-gray-600">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {skill.description && (
                    <p className="text-gray-600 text-sm">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Medical Portfolio/Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Portfolio & Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg p-8 border border-pink-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">🩺</div>
                    {project.date && (
                      <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full">
                        {project.date}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title || project.name}</h3>
                  
                  {project.type && (
                    <p className="text-pink-600 font-semibold mb-2">{project.type}</p>
                  )}
                  
                  {project.description && (
                    <p className="text-gray-700 mb-4">{project.description}</p>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies/Methods:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Project Photos */}
                  {project.projectPhotos && project.projectPhotos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">📸</span>
                        Project Images
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.projectPhotos.map((photoUrl, photoIndex) => (
                          <div key={`project-${index}-photo-${photoIndex}`} className="relative group">
                            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                              <img 
                                src={photoUrl} 
                                alt={`${project.title || project.name} - Photo ${photoIndex + 1}`}
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  console.error('Failed to load project photo:', photoUrl);
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              {/* Fallback for broken images */}
                              <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                                <div className="text-center">
                                  <span className="text-4xl mb-2 block">🩺</span>
                                  <p className="text-pink-600 text-sm">Photo unavailable</p>
                                </div>
                              </div>
                            </div>
                            {/* Photo overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white text-sm font-medium">Photo {photoIndex + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.url && (
                    <div className="mt-4">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
                      >
                        <span className="mr-2">🔗</span>
                        View Project Details
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section - Display fetched data */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Awards & Achievements</h2>
            <div className="space-y-6">
              {data.achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg p-8 border-l-4 border-pink-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">🏆</div>
                    {achievement.date && (
                      <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{achievement.title || achievement.name}</h3>
                  <p className="text-xl text-pink-600 font-semibold mb-3">{achievement.associatedWith || achievement.issuer || achievement.organization}</p>
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
                                alt={`${achievement.title || achievement.name} - Photo ${photoIndex + 1}`}
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  console.error('Failed to load achievement photo:', photoUrl);
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              {/* Fallback for broken images */}
                              <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                                <div className="text-center">
                                  <span className="text-4xl mb-2 block">🏆</span>
                                  <p className="text-pink-600 text-sm">Photo unavailable</p>
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

      {/* Professional Medical Gallery */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Practice Gallery</h2>
          
          {/* Profile and Professional Photos */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700">Professional Profile</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Profile Photo Display */}
              {data.personalInfo.profilePhoto && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={data.personalInfo.profilePhoto} 
                    alt="Professional Profile"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">Dr. {data.personalInfo.fullName}</h4>
                    <p className="text-pink-600 text-sm">{data.personalInfo.professionalTitle}</p>
                  </div>
                </div>
              )}
              
              {/* Demo Medical Practice Images */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/demo-images/clinic1.jpg" 
                  alt="Modern Medical Clinic"
                  className="w-full h-64 object-cover"
                  onError={(e) => {e.target.style.display = 'none'; e.target.parentElement.style.display = 'none';}}
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">Modern Clinic</h4>
                  <p className="text-gray-600 text-sm">State-of-the-art medical facility</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/demo-images/surgery1.jpg" 
                  alt="Surgical Procedures"
                  className="w-full h-64 object-cover"
                  onError={(e) => {e.target.style.display = 'none'; e.target.parentElement.style.display = 'none';}}
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">Surgical Excellence</h4>
                  <p className="text-gray-600 text-sm">Advanced surgical procedures</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src="/demo-images/medical-experience-1.jpg" 
                  alt="Medical Experience"
                  className="w-full h-64 object-cover"
                  onError={(e) => {e.target.style.display = 'none'; e.target.parentElement.style.display = 'none';}}
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">Patient Care</h4>
                  <p className="text-gray-600 text-sm">Compassionate healthcare delivery</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medical Equipment and Facility Photos */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-700">Medical Facilities & Equipment</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="/demo-images/internship-hospital.jpg" 
                    alt="Hospital Experience"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {e.target.style.display = 'none'; e.target.parentElement.style.display = 'none';}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Hospital Facilities</h4>
                  <p className="text-gray-600">Advanced hospital infrastructure and medical technology</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src="/demo-images/emergency-dept-testdoc20250804023145.jpg" 
                    alt="Emergency Department"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {e.target.style.display = 'none'; e.target.parentElement.style.display = 'none';}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Emergency Care</h4>
                  <p className="text-gray-600">24/7 emergency medical services and critical care</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">🩺</span>
                      <p className="text-pink-700 font-semibold">Medical Equipment</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Latest Technology</h4>
                  <p className="text-gray-600">Cutting-edge medical equipment and diagnostic tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Videos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Professional Videos & Presentations</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Educational Video Placeholder */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center group cursor-pointer">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                      <span className="text-2xl">▶️</span>
                    </div>
                    <p className="font-semibold">Women's Health Education</p>
                    <p className="text-sm opacity-90">Patient Education Video</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Health Education Series</h4>
                <p className="text-gray-600 mb-4">Comprehensive videos on women's health topics, preventive care, and wellness tips.</p>
                <div className="flex items-center text-pink-600 text-sm">
                  <span className="mr-2">🎥</span>
                  <span>Educational Content</span>
                </div>
              </div>
            </div>
            
            {/* Procedure Demonstration Video */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center group cursor-pointer">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-colors">
                      <span className="text-2xl">▶️</span>
                    </div>
                    <p className="font-semibold">Procedure Overview</p>
                    <p className="text-sm opacity-90">Medical Procedures</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Procedure Demonstrations</h4>
                <p className="text-gray-600 mb-4">Educational videos explaining common gynecological procedures and treatments.</p>
                <div className="flex items-center text-pink-600 text-sm">
                  <span className="mr-2">🔬</span>
                  <span>Medical Procedures</span>
                </div>
              </div>
            </div>
            
            {/* Conference Presentation */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="/demo-images/conference-photo.jpg" 
                  alt="Medical Conference"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-48 bg-gradient-to-br from-purple-300 to-pink-400 flex items-center justify-center" style={{ display: 'none' }}>
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <p className="font-semibold">Conference Talk</p>
                    <p className="text-sm opacity-90">Medical Presentation</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">▶️</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Conference Presentations</h4>
                <p className="text-gray-600 mb-4">Medical conference talks and professional presentations on gynecological advances.</p>
                <div className="flex items-center text-pink-600 text-sm">
                  <span className="mr-2">🎤</span>
                  <span>Professional Speaking</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Integration Note */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Video Content</h3>
              <p className="text-gray-600 mb-4">
                Educational videos, procedure demonstrations, and conference presentations are available for viewing. 
                These resources help patients understand treatments and showcase professional expertise.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full">🎥 Patient Education</span>
                <span className="bg-rose-200 text-rose-800 px-3 py-1 rounded-full">🔬 Procedure Demos</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full">🎤 Conference Talks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Women's Health Consultation</h2>
          <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Empowering women through comprehensive healthcare</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Women's Clinic: {data.personalInfo.phoneNumber}
              </div>
              <div className="text-lg">
                📧 Email: {data.personalInfo.professionalEmail}
              </div>
            </div>
            {data.personalInfo.address && data.personalInfo.address !== '[Practice Address]' && (
              <div className="text-lg mt-4">
                🏥 Address: {data.personalInfo.address}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gynecologist;
