import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Twitter, 
  Facebook,
  ArrowRight, 
  Play, 
  Star, 
  Heart, 
  Shield, 
  Award,
  Calendar,
  User,
  Microscope,
  Pill,
  Stethoscope,
  Activity
} from 'lucide-react';

// Header Component
const Header = ({ profileData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-stone-100 text-stone-600 py-2 text-sm">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>{profileData?.address || profileData?.location || '[Your Address or Location]'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>{profileData?.phoneNumber || '[Your Contact Number]'}</span>
            </div>
            <div className="flex space-x-2">
              {profileData?.socialLinks?.instagram && (
                <a href={profileData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={16} className="cursor-pointer hover:text-lime-600" />
                </a>
              )}
              {profileData?.socialLinks?.twitter && (
                <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter size={16} className="cursor-pointer hover:text-lime-600" />
                </a>
              )}
              {profileData?.socialLinks?.facebook && (
                <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={16} className="cursor-pointer hover:text-lime-600" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div>
                <span className="text-2xl font-bold text-stone-700">
                  {profileData?.fullName || profileData?.name || '[Full Name]'}
                </span>
                <p className="text-sm text-stone-500">
                  @{profileData?.username || '[username]'} • {profileData?.professionalTitle || '[Professional Title]'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-stone-600 hover:text-lime-600 transition-colors cursor-pointer">About</a>
              <a href="#achievements" className="text-stone-600 hover:text-lime-600 transition-colors cursor-pointer">Achievements</a>
              <a href="#experience" className="text-stone-600 hover:text-lime-600 transition-colors cursor-pointer">Experience</a>
              <a href="#services" className="text-stone-600 hover:text-lime-600 transition-colors cursor-pointer">Services</a>
              <a href="#contact" className="text-stone-600 hover:text-lime-600 transition-colors cursor-pointer">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <a 
                href={`mailto:${profileData?.professionalEmail || profileData?.email || ''}`}
                className="bg-lime-600 text-white px-6 py-2 rounded hover:bg-lime-700 transition-colors"
              >
                CONTACT
              </a>
              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 border-t">
              <div className="flex flex-col space-y-2 pt-4">
                <a href="#about" className="text-stone-600 hover:text-lime-600 py-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#achievements" className="text-stone-600 hover:text-lime-600 py-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Achievements</a>
                <a href="#experience" className="text-stone-600 hover:text-lime-600 py-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Experience</a>
                <a href="#services" className="text-stone-600 hover:text-lime-600 py-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#contact" className="text-stone-600 hover:text-lime-600 py-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

const GynecologistProfessional = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
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
      let response;
      if (isAuthenticated && (isOwnProfile || targetUsername === user?.username)) {
        response = await profileAPI.getCurrentProfile();
      } else if (targetUsername) {
        response = await profileAPI.getProfileByUsername(targetUsername);
      } else {
        setLoading(false);
        return;
      }
      
      if (response.data) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Default services if none exist in database
  const defaultServices = [
    {
      icon: <Stethoscope className="text-pink-600" size={40} />,
      title: "Contraception Consultation",
      description: "Comprehensive consultation on various contraceptive methods to help you make informed decisions about family planning.",
      features: ["Birth control options", "Side effects discussion", "Personalized recommendations", "Follow-up care"]
    },
    {
      icon: <Heart className="text-red-600" size={40} />,
      title: "Endometriosis Treatment", 
      description: "Specialized care for endometriosis, including diagnosis, pain management, and fertility preservation options.",
      features: ["Diagnostic imaging", "Pain management", "Surgical options", "Fertility counseling"]
    },
    {
      icon: <User className="text-blue-600" size={40} />,
      title: "Gynecological Examination",
      description: "Regular health screenings and examinations to maintain your reproductive and overall health.",
      features: ["Routine screenings", "Pap smears", "Breast examinations", "Health consultations"]
    },
    {
      icon: <Microscope className="text-purple-600" size={40} />,
      title: "Gynecological Ultrasound",
      description: "Advanced imaging services for accurate diagnosis and monitoring of gynecological conditions.",
      features: ["Pelvic ultrasounds", "Pregnancy monitoring", "Ovarian assessment", "Detailed imaging"]
    },
    {
      icon: <Activity className="text-orange-600" size={40} />,
      title: "Menopausal Symptoms",
      description: "Comprehensive care and treatment options for managing menopausal symptoms and transitions.",
      features: ["Hormone therapy", "Symptom management", "Lifestyle counseling", "Long-term care"]
    },
    {
      icon: <Calendar className="text-green-600" size={40} />,
      title: "Menstrual Irregularities",
      description: "Diagnosis and treatment of various menstrual disorders and irregular bleeding patterns.",
      features: ["Cycle tracking", "Hormonal evaluation", "Treatment options", "Ongoing monitoring"]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-pink-600 text-lg">Loading professional profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(132, 204, 22, 0.3); }
          50% { box-shadow: 0 0 40px rgba(132, 204, 22, 0.6); }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
      `}</style>
      
      <Header profileData={profileData} />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-rose-800/60 to-pink-700/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-rose-400/20 to-rose-600/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl animate-slideInUp">
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-10 py-4 mb-10 animate-glow">
              <span className="text-sm font-medium tracking-widest uppercase text-white/90">
                Women's Health Professional
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
              {profileData?.fullName || profileData?.name || 'Dr. [Your Name]'}
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-10 text-white/90">
              {profileData?.professionalTitle || 'Gynecologist | Passionate About Women\'s Health'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
              <a 
                href={`mailto:${profileData?.professionalEmail || profileData?.email || ''}`}
                className="group bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-pink-500/25"
              >
                <span className="flex items-center gap-3">
                  CONTACT ME
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </a>
              <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-5 hover:bg-white/20 transition-all duration-300">
                <Phone size={24} className="mr-4" />
                <span className="text-xl font-medium">
                  {profileData?.professionalEmail || profileData?.email || 'your.email@example.com'}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="animate-bounce text-white/60">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
                  <path d="M7 13l3 3 3-3"/>
                  <path d="M7 6l3 3 3-3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-white via-stone-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e7e5e4' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 via-stone-700 to-pink-700 bg-clip-text text-transparent leading-tight">About Me</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mt-2"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="space-y-3">
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Full Name:</strong> 
                        <span className="ml-2 text-stone-700">{profileData?.fullName || profileData?.name || '[Full Name]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Username:</strong> 
                        <span className="ml-2 text-stone-700">@{profileData?.username || '[username]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Title:</strong> 
                        <span className="ml-2 text-stone-700">{profileData?.professionalTitle || '[Professional Title]'}</span>
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Position:</strong> 
                        <span className="ml-2 text-stone-700">{profileData?.position || '[Position]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">DOB:</strong> 
                        <span className="ml-2 text-stone-700">{profileData?.dob || '[Date of Birth]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Location:</strong> 
                        <span className="ml-2 text-stone-700">{profileData?.location || '[Location]'}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-stone-50 p-6 rounded-2xl border-l-4 border-pink-500 shadow-md">
                  <h3 className="text-xl font-semibold text-stone-800 mb-3 flex items-center">
                    <User className="mr-2 text-pink-600" size={24} />
                    Professional Bio
                  </h3>
                  <p className="text-lg text-stone-700 leading-relaxed">
                    {profileData?.about || 'Dedicated to providing comprehensive women\'s healthcare with compassion and expertise. Passionate about advancing women\'s health through evidence-based medicine and personalized care.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-pink-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative w-full max-w-md mx-auto">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  {profileData?.profilePhoto ? (
                    <img 
                      src={profileData.profilePhoto} 
                      alt="Professional Profile Photo" 
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-80 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${profileData?.profilePhoto ? 'hidden' : ''}`}>
                    <span className="text-6xl">👩‍⚕️</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Stethoscope className="text-white" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      {profileData?.education?.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-stone-50 via-white to-pink-50 relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-stone-200 rounded-full translate-x-20 translate-y-20 opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent mb-4">Education</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-xl text-stone-600 max-w-2xl mx-auto">My academic journey and qualifications in medicine and gynecology.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {profileData.education.map((edu, index) => (
                <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-100 hover:border-pink-200 transform hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Award className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-stone-800 mb-2 group-hover:text-pink-700 transition-colors">{edu.degree}</h3>
                      <p className="text-pink-600 font-semibold mb-1">{edu.university || edu.institute}</p>
                      <p className="text-stone-500 mb-3 text-sm">{edu.startDate} - {edu.endDate}</p>
                      {edu.description && <p className="text-stone-600 leading-relaxed">{edu.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Licenses & Certifications Section */}
      {profileData?.certifications?.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-white via-pink-50 to-stone-50 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-pink-200 to-transparent rounded-full -translate-x-32 opacity-30"></div>
          <div className="absolute top-1/4 right-0 w-48 h-48 bg-gradient-to-l from-stone-200 to-transparent rounded-full translate-x-24 opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent mb-4">Licenses & Certifications</h2>
                <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">Professional certifications and licenses in the medical field.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center border border-white/50 hover:border-pink-200 transform hover:-translate-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-pink-700 transition-colors">{cert.name}</h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto mb-4"></div>
                  <p className="text-pink-600 font-semibold mb-2">{cert.authority}</p>
                  {cert.issueDate && (
                    <p className="text-stone-500 text-sm mb-4 bg-stone-50 px-3 py-1 rounded-full inline-block">
                      {cert.issueDate} {cert.expiryDate && `- ${cert.expiryDate}`}
                    </p>
                  )}
                  {cert.description && <p className="text-stone-600 leading-relaxed">{cert.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Medical Experience Section */}
      {(profileData?.medicalExperience?.length > 0 || profileData?.experience?.length > 0) && (
        <section id="experience" className="py-20 bg-gradient-to-br from-stone-50 via-white to-pink-50 relative">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-100 to-transparent rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-stone-100 to-transparent rounded-full opacity-60"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent mb-4">Medical Experience</h2>
                <div className="h-1 w-28 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">Clinical experience and professional practice in women's healthcare.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Medical Experience */}
              {profileData?.medicalExperience?.map((exp, index) => (
                <div key={`medical-${index}`} className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/70 hover:border-pink-200 transform hover:-translate-y-2">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Stethoscope className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-pink-700 transition-colors">{exp.jobTitle}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="text-pink-600" size={16} />
                        <p className="text-pink-600 font-semibold">{exp.hospitalName}</p>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="text-stone-500" size={16} />
                        <p className="text-stone-500 bg-stone-50 px-3 py-1 rounded-full text-sm">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      </div>
                      {exp.description && <p className="text-stone-600 leading-relaxed">{exp.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Regular Experience */}
              {profileData?.experience?.map((exp, index) => (
                <div key={`exp-${index}`} className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/70 hover:border-pink-200 transform hover:-translate-y-2">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-stone-500 to-stone-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Activity className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-pink-700 transition-colors">{exp.position}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="text-pink-600" size={16} />
                        <p className="text-pink-600 font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="text-stone-500" size={16} />
                        <p className="text-stone-500 bg-stone-50 px-3 py-1 rounded-full text-sm">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      </div>
                      {exp.description && <p className="text-stone-600 leading-relaxed">{exp.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section with Photos */}
      {profileData?.achievements?.length > 0 && (
        <section id="achievements" className="py-20 bg-gradient-to-br from-white via-pink-50 to-stone-50 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-200 to-transparent rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-stone-200 to-transparent rounded-full opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent mb-4">Awards & Achievements</h2>
                <div className="h-1 w-36 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-xl text-stone-600 max-w-4xl mx-auto">Recognition and accomplishments in women's healthcare and medical practice.</p>
            </div>
            <div className="space-y-8">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">🏆</div>
                    {achievement.date && (
                      <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                  <p className="text-xl text-yellow-600 font-semibold mb-3">{achievement.associatedWith || achievement.issuer}</p>
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
                                alt={`${achievement.title} - Photo ${photoIndex + 1}`}
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  console.error('Failed to load achievement photo:', photoUrl);
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              {/* Fallback for broken images */}
                              <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                                <div className="text-center">
                                  <span className="text-4xl mb-2 block">🏆</span>
                                  <p className="text-yellow-600 text-sm">Photo unavailable</p>
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

      {/* Services Grid */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent mb-4">Our Services</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4"></div>
            </div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Comprehensive women's health services tailored to your individual needs.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {defaultServices.map((service, index) => (
              <div key={index} className="bg-stone-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-stone-800 mb-4">{service.title}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                          <span className="text-stone-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills, Languages & Interests Section */}
      {(profileData?.skills?.length > 0 || profileData?.languages?.length > 0 || profileData?.interests?.length > 0) && (
        <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-stone-800 mb-6">Skills, Languages & Interests</h2>
              <p className="text-lg text-stone-600">Professional skills, language proficiencies, and personal interests.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {profileData?.skills?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
                    <Activity className="text-pink-600 mr-2" size={24} />
                    Skills
                  </h3>
                  <div className="space-y-2">
                    {profileData.skills.map((skill, index) => (
                      <span key={index} className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {profileData?.languages?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
                    <User className="text-pink-600 mr-2" size={24} />
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {profileData.languages.map((language, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">{language}</span>
                    ))}
                  </div>
                </div>
              )}
              {profileData?.interests?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
                    <Heart className="text-pink-600 mr-2" size={24} />
                    Interests
                  </h3>
                  <div className="space-y-2">
                    {profileData.interests.map((interest, index) => (
                      <span key={index} className="inline-block bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Information Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-stone-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-pink-200 to-transparent rounded-full -translate-x-40 -translate-y-40 opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-stone-200 to-transparent rounded-full translate-x-48 translate-y-48 opacity-30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent leading-tight">Contact Information</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mt-2"></div>
              </div>
              <div className="space-y-6">
                <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-600 font-medium"><strong className="text-stone-800">Phone:</strong></p>
                    <p className="text-pink-600 font-semibold text-lg">{profileData?.phoneNumber || '[Phone Number]'}</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-600 font-medium"><strong className="text-stone-800">Professional Email:</strong></p>
                    <p className="text-blue-600 font-semibold text-lg">{profileData?.professionalEmail || profileData?.email || '[Professional Email]'}</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-600 font-medium"><strong className="text-stone-800">Address:</strong></p>
                    <p className="text-purple-600 font-semibold text-lg">{profileData?.address || '[Address]'}</p>
                  </div>
                </div>
                {profileData?.linkedInOrWebsite && (
                  <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-stone-600 font-medium"><strong className="text-stone-800">LinkedIn/Website:</strong></p>
                      <p className="text-indigo-600 font-semibold text-lg">{profileData.linkedInOrWebsite}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-stone-400 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-full max-w-md mx-auto">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  {profileData?.profilePhoto ? (
                    <img 
                      src={profileData.profilePhoto} 
                      alt="Professional Profile" 
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-80 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${profileData?.profilePhoto ? 'hidden' : ''}`}>
                    <span className="text-6xl">👩‍⚕️</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-stone-500 to-stone-600 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="text-white" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to start your healthcare journey?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your women's health needs and create a personalized care plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${profileData?.professionalEmail || profileData?.email || ''}`}
              className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-stone-100 transition-colors"
            >
              SCHEDULE CONSULTATION
            </a>
            <a 
              href={`tel:${profileData?.phoneNumber || ''}`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              CALL US TODAY
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GynecologistProfessional;
