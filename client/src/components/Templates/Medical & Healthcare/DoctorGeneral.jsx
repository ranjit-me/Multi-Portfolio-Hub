import React from 'react';
// Temporarily disable data fetching to fix white screen issues
// import { useTemplateData } from '../../../hooks/useTemplateData';

const DoctorGeneral = ({ username = null }) => {
  // Temporarily comment out data fetching
  // const { templateData, loading, error } = useTemplateData(username, 'doctor-general');

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
  //         <p className="text-emerald-600 text-lg">Loading template data...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   console.warn('Template data error:', error);
  // }

  const data = {
    personalInfo: {
      fullName: 'Dr. [Your Name]',
      professionalTitle: 'General Practitioner',
      profilePhoto: null,
      phoneNumber: '[Phone Number]',
      professionalEmail: '[Email Address]',
      location: '[City, State]',
      address: '[Practice Address]'
    },
    services: []
  };

  const defaultServices = [
    {
      title: 'General Consultation',
      description: 'Comprehensive medical examinations and health assessments for all ages.',
      icon: '🩺'
    },
    {
      title: 'Preventive Care',
      description: 'Regular check-ups, vaccinations, and health screenings to prevent illness.',
      icon: '💊'
    },
    {
      title: 'Chronic Disease Management',
      description: 'Ongoing care and management of chronic conditions like diabetes and hypertension.',
      icon: '📋'
    }
  ];

  const services = defaultServices;
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
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
                <span className="text-6xl">👨‍⚕️</span>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
              <p className="text-xl text-emerald-100 mb-4">{data.personalInfo.professionalTitle}</p>
              <p className="text-lg text-emerald-200 max-w-2xl">
                Dedicated to providing comprehensive primary healthcare services with a focus on preventive care, 
                patient education, and building lasting doctor-patient relationships.
              </p>
              {data.personalInfo.location && (
                <p className="text-emerald-200 mt-2">📍 {data.personalInfo.location}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white/70">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">About Dr. [Your Name]</h2>
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              With over [X] years of experience in general practice, I am committed to providing exceptional 
              healthcare services to patients of all ages. My approach focuses on understanding each patient's 
              unique needs and developing personalized treatment plans.
            </p>
            <p>
              I believe in the importance of preventive care and patient education, working closely with my 
              patients to help them maintain optimal health and wellbeing throughout their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Schedule an Appointment</h2>
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Ready to take charge of your health?</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Phone: {data.personalInfo.phoneNumber}
              </div>
              <div className="text-lg">
                📧 Email: {data.personalInfo.professionalEmail}
              </div>
            </div>
            {data.personalInfo.address && (
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

export default DoctorGeneral;
