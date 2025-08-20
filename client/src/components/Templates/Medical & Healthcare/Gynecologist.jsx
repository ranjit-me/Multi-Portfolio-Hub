import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';
import { mapProfileData, formatForMedicalTemplate } from '../../../utils/profileDataMapper';
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

// Import video from assets
import feminaHealthVideo from './assets/Home Three – Femina Health Main.mp4';
import feminaImage1 from './assets/51-home-3-2.webp';
import feminaImage2 from './assets/51-home-3-3-tablet-1024x694.webp';
import gynoContactBg from './assets/gyno-contact.jpg';

// Contact Form Section Component
const ContactFormSection = ({ isVisible, doctorData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Get doctor's phone number from database
      const doctorPhone = doctorData?.personalInfo?.phoneNumber || doctorData?.personalInfo?.phone || '';
      
      if (!doctorPhone) {
        throw new Error('Doctor contact information not available');
      }

      // Prepare WhatsApp message
      const message = `Hello Dr. ${doctorData?.personalInfo?.name || doctorData?.name || 'Doctor'},

New Contact Form Submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject || 'Contact Request'}

Message:
${formData.message}

Best regards,
${formData.name}`;

      // Create WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${doctorPhone.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      setSubmitMessage('Redirecting to WhatsApp...');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Always show the contact form (removed visibility condition)

  return (
    <section 
      id="contact-form-section" 
      className="relative py-20 bg-gradient-to-br from-pink-50 via-white to-pink-50"
      style={{
        backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.1), rgba(255, 255, 255, 0.9)), url(${gynoContactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-800 mb-4">Contact Me</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Ready to take the next step in your healthcare journey? Get in touch with me today.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Contact Form - Now on Left Side */}
            <div className="p-8 lg:p-12 order-1 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="Enter subject (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none"
                    placeholder="Tell me how I can help you..."
                  />
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg text-center font-medium ${
                    submitMessage.includes('error') || submitMessage.includes('Failed') 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information - Now on Right Side */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 lg:p-12 text-white order-2 lg:order-2">
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin size={24} className="text-pink-200 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-pink-100">{doctorData?.personalInfo?.address || doctorData?.personalInfo?.location || 'Brooklyn, NY 10036, United States'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone size={24} className="text-pink-200 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-pink-100">{doctorData?.personalInfo?.phoneNumber || doctorData?.personalInfo?.phone || '1-800-123-1234'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock size={24} className="text-pink-200 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <p className="text-pink-100">Mon – Fri: 8:30 am – 5:00 pm</p>
                    <p className="text-pink-100">Sat – Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Header Component
const Header = ({ data, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    onContactClick();
    // Scroll to contact form
    setTimeout(() => {
      const contactSection = document.getElementById('contact-form-section');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-stone-800 text-white py-2 text-xs mt-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-pink-300 transition-colors">
              <MapPin size={12} className="text-pink-300" />
              <span className="font-medium">{data?.personalInfo?.address || data?.personalInfo?.location || 'Brooklyn, NY 10036, United States'}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-pink-300 transition-colors">
              <Clock size={12} className="text-pink-300" />
              <span className="font-medium">Mon – Fri: 8:30 am – 5:00 pm</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-pink-300 transition-colors">
              <Phone size={12} className="text-pink-300" />
              <span className="font-medium">{data?.personalInfo?.phoneNumber || '1-800-123-1234'}</span>
            </div>
            <div className="flex space-x-3">
              {data?.personalInfo?.socialLinks?.instagram && (
                <a href={data.personalInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={12} className="cursor-pointer hover:text-pink-300 transition-colors" />
                </a>
              )}
              {data?.personalInfo?.socialLinks?.twitter && (
                <a href={data.personalInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter size={12} className="cursor-pointer hover:text-pink-300 transition-colors" />
                </a>
              )}
              {data?.personalInfo?.socialLinks?.facebook && (
                <a href={data.personalInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={12} className="cursor-pointer hover:text-pink-300 transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Brand Section */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Stethoscope size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {data?.personalInfo?.fullName?.toUpperCase() || 'ANUSHKA SEN'}
                </h1>
                <p className="text-sm text-pink-600 font-semibold flex items-center space-x-1">
                  <Heart size={12} className="text-pink-500" />
                  <span>GYNECOLOGIST & FERTILITY SPECIALIST</span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors cursor-pointer font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#services" className="text-gray-700 hover:text-pink-600 transition-colors cursor-pointer font-medium relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#achievements" className="text-gray-700 hover:text-pink-600 transition-colors cursor-pointer font-medium relative group">
                Achievements
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#experience" className="text-gray-700 hover:text-pink-600 transition-colors cursor-pointer font-medium relative group">
                Experience
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors cursor-pointer font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleContactClick}
                className="hidden md:inline-flex bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                CONTACT ME
              </button>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden bg-pink-50 hover:bg-pink-100 p-2 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} className="text-pink-600" /> : <Menu size={24} className="text-pink-600" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-pink-100 shadow-xl">
              <nav className="container mx-auto px-4 py-6">
                <div className="flex flex-col space-y-4">
                  <a href="#about" className="text-stone-700 hover:text-pink-600 py-3 cursor-pointer font-medium border-b border-stone-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    About Us
                  </a>
                  <a href="#services" className="text-stone-700 hover:text-pink-600 py-3 cursor-pointer font-medium border-b border-stone-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Our Services
                  </a>
                  <a href="#achievements" className="text-stone-700 hover:text-pink-600 py-3 cursor-pointer font-medium border-b border-stone-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Achievements
                  </a>
                  <a href="#experience" className="text-stone-700 hover:text-pink-600 py-3 cursor-pointer font-medium border-b border-stone-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Experience
                  </a>
                  <a href="#contact" className="text-stone-700 hover:text-pink-600 py-3 cursor-pointer font-medium border-b border-stone-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </a>
                  <div className="pt-4">
                    <button 
                      onClick={handleContactClick}
                      className="inline-flex bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 w-full justify-center"
                    >
                      CONTACT ME
                    </button>
                  </div>
                </div>
              </nav>
            </div>
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
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('GynecologistProfessional template useEffect triggered');
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
      console.log('Fetching profile for GynecologistProfessional template:', targetUsername);
      
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
      
      console.log('GynecologistProfessional profile API response:', response);
      
      if (response.data) {
        console.log('=== GYNECOLOGIST PROFESSIONAL TEMPLATE - Full Profile Data ===');
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
        console.log('GynecologistProfessional profile data set successfully');
      }
    } catch (error) {
      console.error('Error fetching profile for GynecologistProfessional template:', error);
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

  // Use the comprehensive profile data mapper
  const mappedData = mapProfileData(profileData, user);
  const data = formatForMedicalTemplate(mappedData);

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3); }
          50% { text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.6); }
        }
        @keyframes slideInUp {
          from { transform: translateY(80px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInScale {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-textGlow { animation: textGlow 3s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-fadeInScale { animation: fadeInScale 0.6s ease-out; }
        .animate-pulse-gentle { animation: pulse 4s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
        
        /* Custom backdrop blur for older browsers */
        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        /* Video responsive */
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #ec4899, #f97316, #eab308, #10b981, #3b82f6, #8b5cf6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 8s ease infinite;
        }
      `}</style>
      
      <Header data={data} onContactClick={() => setShowContactForm(true)} />
      
      {/* Main Content with Top Margin */}
      <div className="mt-8">
        {/* Hero Section with Background Video */}
        <section className="relative h-screen overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={feminaHealthVideo} type="video/mp4" />
            {/* Fallback background for when video fails to load */}
          </video>
        </div>
        
        {/* Elegant Geometric Elements */}
        <div className="absolute top-16 left-8 w-1 h-24 bg-gradient-to-b from-white/30 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-1 h-32 bg-gradient-to-t from-pink-300/40 to-transparent transform -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-5xl animate-slideInUp" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            <div className="inline-block bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl px-12 py-5 mb-12 shadow-2xl">
              <span className="text-base font-semibold tracking-widest uppercase text-white flex items-center justify-center gap-2">
                <Stethoscope size={20} className="text-pink-200" />
                Women's Health Professional
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white font-black relative">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent blur-sm">
                  {data?.personalInfo?.fullName || 'Dr. [Your Name]'}
                </span>
                <span className="relative text-white">
                  {data?.personalInfo?.fullName || 'Dr. [Your Name]'}
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl font-light mb-6 text-white/95 max-w-4xl mx-auto leading-relaxed">
              {data?.personalInfo?.professionalTitle || 'Expert Gynecologist'}
            </p>
            
            <p className="text-lg md:text-xl mb-12 text-pink-200 max-w-3xl mx-auto leading-relaxed">
              Your journey to optimal women's health starts here - Expert care, compassionate service, innovative treatments
            </p>
            
            <div className="flex justify-center">
              <div className="animate-bounce text-white/70">
                <ArrowRight size={32} className="rotate-90 animate-pulse" />
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
                        <span className="ml-2 text-stone-700">{data?.personalInfo?.fullName || '[Full Name]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Username:</strong> 
                        <span className="ml-2 text-stone-700">@{data?.personalInfo?.username || '[username]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Title:</strong> 
                        <span className="ml-2 text-stone-700">{data?.personalInfo?.professionalTitle || '[Professional Title]'}</span>
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Position:</strong> 
                        <span className="ml-2 text-stone-700">{data?.personalInfo?.position || '[Position]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">DOB:</strong> 
                        <span className="ml-2 text-stone-700">{data?.personalInfo?.dob || '[Date of Birth]'}</span>
                      </p>
                      <p className="flex items-center text-stone-600">
                        <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                        <strong className="text-stone-800">Location:</strong> 
                        <span className="ml-2 text-stone-700">{data?.personalInfo?.location || '[Location]'}</span>
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
                    {data?.personalInfo?.bio || 'Dedicated to providing comprehensive women\'s healthcare with compassion and expertise. Passionate about advancing women\'s health through evidence-based medicine and personalized care.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-pink-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative w-full max-w-md mx-auto">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  {data?.personalInfo?.profilePhoto ? (
                    <img 
                      src={data.personalInfo.profilePhoto} 
                      alt="Professional Profile Photo" 
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-80 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${data?.personalInfo?.profilePhoto ? 'hidden' : ''}`}>
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
      {data?.education && data.education.length > 0 && (
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
              {data.education.map((edu, index) => (
                <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-100 hover:border-pink-200 transform hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Award className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-stone-800 mb-2 group-hover:text-pink-700 transition-colors">{edu.degree || edu.title}</h3>
                      <p className="text-pink-600 font-semibold mb-1">{edu.institution || edu.university || edu.school}</p>
                      <p className="text-stone-500 mb-3 text-sm">{edu.year || `${edu.startDate} - ${edu.endDate}`}</p>
                      {edu.description && <p className="text-stone-600 leading-relaxed">{edu.description}</p>}
                      {edu.gpa && <p className="text-stone-600 text-sm mt-2">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Licenses & Certifications Section */}
      {data?.certifications && data.certifications.length > 0 && (
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.certifications.map((cert, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-pink-200 transform hover:-translate-y-3">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Award className="text-white" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-pink-700 transition-colors">{cert.title || cert.name}</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto mb-4"></div>
                    <p className="text-pink-600 font-semibold mb-2">{cert.issuingOrganization || cert.issuer || cert.authority}</p>
                    {cert.issueDate && (
                      <p className="text-stone-500 text-sm mb-4 bg-stone-50 px-3 py-1 rounded-full inline-block">
                        {cert.issueDate} {cert.expiryDate && `- ${cert.expiryDate}`}
                      </p>
                    )}
                    {cert.description && <p className="text-stone-600 leading-relaxed mb-4">{cert.description}</p>}
                  </div>
                  {/* Certification Photos from S3 */}
                  {cert.certificationPhotos && cert.certificationPhotos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-center">
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
                                className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => { setModalImageUrl(photoUrl); setShowPhotoModal(true); }}
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
                    <div className="mt-4 text-center">
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

      {/* Medical Experience Section */}
      {(data?.experience && data.experience.length > 0) && (
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
              {data.experience.map((exp, index) => (
                <div key={index} className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/70 hover:border-pink-200 transform hover:-translate-y-2">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Stethoscope className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-pink-700 transition-colors">{exp.position || exp.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="text-pink-600" size={16} />
                        <p className="text-pink-600 font-semibold">{exp.company || exp.organization}</p>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="text-stone-500" size={16} />
                        <p className="text-stone-500 bg-stone-50 px-3 py-1 rounded-full text-sm">{exp.duration || exp.period || `${exp.startDate} - ${exp.endDate || 'Present'}`}</p>
                      </div>
                      {exp.description && <p className="text-stone-600 leading-relaxed">{exp.description}</p>}
                      {exp.location && <p className="text-stone-500 text-sm mt-2">📍 {exp.location}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section with Photos */}
      {data?.achievements && data.achievements.length > 0 && (
        <section id="achievements" className="py-20 bg-gradient-to-br from-white via-pink-50 to-stone-50 relative overflow-hidden">
          <style jsx>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both; }
            .glow-trophy {
              filter: drop-shadow(0 0 16px #fbbf24) drop-shadow(0 0 32px #f59e42);
              animation: pulseGlow 2s infinite alternate;
            }
            @keyframes pulseGlow {
              0% { filter: drop-shadow(0 0 8px #fbbf24) drop-shadow(0 0 16px #f59e42); }
              100% { filter: drop-shadow(0 0 24px #fbbf24) drop-shadow(0 0 48px #f59e42); }
            }
            .gradient-border {
              position: relative;
              z-index: 0;
            }
            .gradient-border::before {
              content: '';
              position: absolute;
              inset: -3px;
              z-index: -1;
              border-radius: 1.5rem;
              background: linear-gradient(120deg, #fbbf24, #f472b6, #a78bfa, #fbbf24 90%);
              background-size: 200% 200%;
              animation: gradientShift 6s ease-in-out infinite;
              filter: blur(2px);
            }
          `}</style>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-200 to-transparent rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-stone-200 to-transparent rounded-full opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-textGlow">Awards & Achievements</h2>
                <div className="h-1 w-36 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full mx-auto mb-4 animate-gradient"></div>
              </div>
              <p className="text-xl text-stone-600 max-w-4xl mx-auto animate-fadeInUp">Recognition and accomplishments in women's healthcare and medical practice.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="relative bg-white/90 gradient-border rounded-2xl shadow-2xl p-8 transition-transform duration-500 hover:scale-105 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl glow-trophy">🏆</div>
                    {achievement.date && (
                      <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2 gradient-text animate-gradient">
                    {achievement.title || achievement.name}
                  </h3>
                  <p className="text-lg text-pink-600 font-semibold mb-2 animate-fadeInUp">
                    {achievement.associatedWith || achievement.issuer || achievement.organization}
                  </p>
                  {achievement.description && (
                    <p className="text-stone-700 leading-relaxed text-base mb-4 animate-fadeInUp">{achievement.description}</p>
                  )}
                  {/* Achievement Photos from S3 */}
                  {achievement.achievementPhotos && achievement.achievementPhotos.length > 0 && (
                    <div className="mt-6 animate-fadeInUp">
                      <h4 className="text-base font-semibold text-gray-700 mb-3 flex items-center justify-center">
                        <span className="mr-2">📸</span>
                        Achievement Photos
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {achievement.achievementPhotos.map((photoUrl, photoIndex) => (
                          <div key={`achievement-${index}-photo-${photoIndex}`} className="relative group">
                            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                              <img
                                src={photoUrl}
                                alt={`${achievement.title || achievement.name} - Photo ${photoIndex + 1}`}
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
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


      {/* Statistics Section with Video Background */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={feminaHealthVideo} type="video/mp4" />
          </video>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
            <span className="text-pink-300 font-semibold tracking-widest uppercase text-sm mb-4 block">SUCCESS STATISTICS</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Over 21,000 babies born and counting
            </h2>
            <div className="w-24 h-1 bg-pink-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Live Birth Rate for PGS */}
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-6xl md:text-8xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">87%</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live birth rate for PGS treatment</h3>
              <p className="text-pink-200">all ages average</p>
            </div>
            
            {/* Live Birth Rate for IVF */}
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-6xl md:text-8xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">92%</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live birth rates for IVF/IMSI/ICSI/PIMSI treatment</h3>
              <p className="text-pink-200">all ages average</p>
            </div>
            
            {/* Egg Recipient Treatment */}
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-6xl md:text-8xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">95%</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live birth rates for egg recipient treatment</h3>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-pink-200 mt-4">
                <span className="bg-white/10 px-2 py-1 rounded">&lt;35: 87%</span>
                <span className="bg-white/10 px-2 py-1 rounded">35-37: 60%</span>
                <span className="bg-white/10 px-2 py-1 rounded">38-39: 50%</span>
                <span className="bg-white/10 px-2 py-1 rounded">40-42: 40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Knowledge Section with Videos */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full -translate-y-48 translate-x-48 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100 rounded-full translate-y-40 -translate-x-40 opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-pink-600 font-semibold tracking-widest uppercase text-sm mb-4 block">EXPERT KNOWLEDGE</span>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-stone-800 to-pink-700 bg-clip-text text-transparent mb-6">
              Expert knowledge
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              For more information on fertility tests and treatments, watch these videos from our experts.
            </p>
          </div>
          
          {/* Video Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Fertility Treatment Overview",
                thumbnail: feminaImage1,
                duration: "5:23"
              },
              {
                title: "Understanding IVF Process",
                thumbnail: feminaImage2,
                duration: "7:45"
              },
              {
                title: "Women's Health Essentials",
                thumbnail: feminaImage1,
                duration: "4:12"
              }
            ].map((video, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280" font-family="Arial, sans-serif" font-size="18">Video Thumbnail</text></svg>`)}`;
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={32} className="text-pink-600 ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold text-stone-800 group-hover:text-pink-700 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Expert Knowledge Content */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Immune Testing */}
            <div className="bg-gradient-to-br from-pink-50 to-stone-50 rounded-3xl p-8 border border-pink-100">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                  <Microscope className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">
                  Thorough immune testing for individuals and couples
                </h3>
              </div>
              <p className="text-stone-700 leading-relaxed mb-6">
                We believe we can offer patients with a history of recurrent IVF failure or multiple miscarriages a better chance of success by studying the role of their immune system in pregnancy. We provide immune therapy tailored to your individual situation.
              </p>
              <p className="text-stone-700 leading-relaxed mb-8">
                To establish any issues that may be preventing a successful IVF treatment, we carry out a comprehensive series of tests which check different aspects of your immune system.
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                FIND OUT MORE
              </button>
            </div>
            
            {/* Fertility Preservation */}
            <div className="bg-gradient-to-br from-blue-50 to-stone-50 rounded-3xl p-8 border border-blue-100">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">
                  Comprehensive fertility preservation services
                </h3>
              </div>
              <p className="text-stone-700 leading-relaxed mb-6">
                Not ready to start a family yet? You're not alone. A growing number of individuals and couples are choosing to freeze their eggs and sperm to delay starting a family.
              </p>
              <p className="text-stone-700 leading-relaxed mb-8">
                Whether you're undergoing medical treatment, haven't found the right partner yet, or just want to preserve your fertility, speak to us today about egg freezing and sperm freezing to find out how we can help you.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                FIND OUT MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {(data?.skills?.length > 0 || data?.languages?.length > 0 || data?.interests?.length > 0) && (
        <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-stone-800 mb-6">Skills, Languages & Interests</h2>
              <p className="text-lg text-stone-600">Professional skills, language proficiencies, and personal interests.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {data?.skills?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
                    <Activity className="text-pink-600 mr-2" size={24} />
                    Skills
                  </h3>
                  <div className="space-y-2">
                    {data.skills.map((skill, index) => (
                      <span key={index} className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {skill.name || skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data?.languages?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
                    <User className="text-pink-600 mr-2" size={24} />
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {data.languages.map((language, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {language.name || language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data?.interests?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
                    <Heart className="text-pink-600 mr-2" size={24} />
                    Interests
                  </h3>
                  <div className="space-y-2">
                    {data.interests.map((interest, index) => (
                      <span key={index} className="inline-block bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {interest.name || interest}
                      </span>
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
                    <p className="text-pink-600 font-semibold text-lg">{data?.personalInfo?.phoneNumber || '[Phone Number]'}</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-600 font-medium"><strong className="text-stone-800">Professional Email:</strong></p>
                    <p className="text-blue-600 font-semibold text-lg">{data?.personalInfo?.professionalEmail || data?.personalInfo?.email || '[Professional Email]'}</p>
                  </div>
                </div>
                <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-600 font-medium"><strong className="text-stone-800">Address:</strong></p>
                    <p className="text-purple-600 font-semibold text-lg">{data?.personalInfo?.address || data?.personalInfo?.location || '[Address]'}</p>
                  </div>
                </div>
                {data?.personalInfo?.linkedInOrWebsite && (
                  <div className="group flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-stone-600 font-medium"><strong className="text-stone-800">LinkedIn/Website:</strong></p>
                      <p className="text-indigo-600 font-semibold text-lg">{data.personalInfo.linkedInOrWebsite}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-stone-400 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-full max-w-md mx-auto">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  {data?.personalInfo?.profilePhoto ? (
                    <img 
                      src={data.personalInfo.profilePhoto} 
                      alt="Professional Profile" 
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      onClick={() => { setModalImageUrl(null); setShowPhotoModal(true); }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-80 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${data?.personalInfo?.profilePhoto ? 'hidden' : ''}`}> 
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
      </div> {/* End of main content div */}
      
      {/* Photo Modal (for profile and certificate images) */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm" onClick={() => { setShowPhotoModal(false); setModalImageUrl(null); }}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img
              src={modalImageUrl || data.personalInfo.profilePhoto}
              alt="Full Size Photo"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white"
              style={{ background: '#f3f4f6' }}
            />
            <button
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-pink-600 rounded-full p-2 shadow-lg focus:outline-none"
              onClick={() => { setShowPhotoModal(false); setModalImageUrl(null); }}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Contact Form Section - Always Visible */}
      <ContactFormSection doctorData={data} />
    </div>
  );
};

export default GynecologistProfessional;
