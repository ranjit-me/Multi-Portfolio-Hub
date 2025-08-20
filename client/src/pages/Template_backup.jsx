import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Template = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Template categories and data
  const templates = [
    // Medical/Doctor Templates - General to Specialized
    {
      id: 'doctor-general',
      title: 'General Practitioner',
      category: 'medical',
      description: 'Clean template for general practitioners focusing on patient care and medical services.',
      image: '/demo-images/medical-degree.jpg',
      features: ['Patient Care', 'Medical Services', 'Clinic Information', 'Appointments', 'Health Tips'],
      color: 'from-emerald-500 to-teal-600',
      icon: '👨‍⚕️',
      demoUrl: '/templates/demo/doctor-general',
      tags: ['doctor', 'gp', 'medical', 'primary care']
    },
    {
      id: 'doctor-surgeon',
      title: 'Surgeon Portfolio',
      category: 'medical',
      description: 'Professional template for surgeons with emphasis on medical experience, certifications, and procedures.',
      image: '/demo-images/profile-photo.jpg',
      features: ['Medical Experience', 'Certifications', 'Publications', 'Procedures', 'Patient Testimonials'],
      color: 'from-red-500 to-pink-600',
      icon: '🏥',
      demoUrl: '/templates/demo/doctor-surgeon',
      tags: ['doctor', 'surgeon', 'medical', 'healthcare']
    },
    {
      id: 'doctor-specialist',
      title: 'Medical Specialist',
      category: 'medical',
      description: 'Specialized template for medical specialists with research and publication focus.',
      image: '/demo-images/research-presentation-testdoc20250804023145.jpg',
      features: ['Specialization', 'Research Papers', 'Conference Talks', 'Awards', 'Case Studies'],
      color: 'from-blue-500 to-indigo-600',
      icon: '🔬',
      demoUrl: '/templates/demo/doctor-specialist',
      tags: ['specialist', 'research', 'medical', 'academic']
    },
    {
      id: 'cardiologist',
      title: 'Cardiologist',
      category: 'medical',
      description: 'Specialized template for heart specialists focusing on cardiovascular diseases and treatments.',
      image: '/demo-images/medical-degree.jpg',
      features: ['Heart Surgery', 'Cardiac Procedures', 'ECG Analysis', 'Patient Consultations', 'Research'],
      color: 'from-red-600 to-rose-700',
      icon: '❤️',
      demoUrl: '/templates/demo/cardiologist',
      tags: ['cardiologist', 'heart', 'cardiovascular', 'specialist']
    },
    {
      id: 'gynecologist',
      title: 'Gynecologist',
      category: 'medical',
      description: 'Women\'s health specialist template for reproductive health and gynecological care.',
      image: '/demo-images/clinic1.jpg',
      features: ['Women\'s Health', 'Reproductive Care', 'Prenatal Care', 'Gynecological Surgery', 'Health Screenings'],
      color: 'from-pink-600 to-rose-700',
      icon: '👩‍⚕️',
      demoUrl: '/templates/demo/gynecologist',
      tags: ['gynecologist', 'women health', 'reproductive', 'prenatal']
    },
    {
      id: 'orthopedic-surgeon',
      title: 'Orthopedic Surgeon',
      category: 'medical',
      description: 'Template for bone and joint specialists focusing on musculoskeletal system treatments.',
      image: '/demo-images/surgery1.jpg',
      features: ['Joint Surgery', 'Bone Repair', 'Sports Medicine', 'Rehabilitation', 'Surgical Procedures'],
      color: 'from-slate-600 to-gray-700',
      icon: '🦴',
      demoUrl: '/templates/demo/orthopedic-surgeon',
      tags: ['orthopedic', 'surgeon', 'bones', 'joints']
    },
    {
      id: 'emergency-medicine',
      title: 'Emergency Medicine Doctor',
      category: 'medical',
      description: 'Template for emergency room doctors specializing in urgent and critical care.',
      image: '/demo-images/emergency-dept-testdoc20250804023145.jpg',
      features: ['Emergency Care', 'Trauma Treatment', 'Critical Decisions', 'Life Support', 'Emergency Procedures'],
      color: 'from-red-500 to-red-700',
      icon: '�',
      demoUrl: '/templates/demo/emergency-medicine',
      tags: ['emergency', 'trauma', 'critical care', 'urgent']
    },
    {
      id: 'pediatrician',
      title: 'Pediatrician',
      category: 'medical',
      description: 'Child-focused template for pediatric doctors specializing in infant, child, and adolescent care.',
      image: '/demo-images/medical-experience-1.jpg',
      features: ['Child Development', 'Pediatric Care', 'Vaccinations', 'Growth Monitoring', 'Family Counseling'],
      color: 'from-pink-500 to-rose-600',
      icon: '👶',
      demoUrl: '/templates/demo/pediatrician',
      tags: ['pediatrician', 'children', 'pediatric', 'family']
    },
    {
      id: 'neurologist',
      title: 'Neurologist',
      category: 'medical',
      description: 'Template for brain and nervous system specialists with emphasis on neurological disorders.',
      image: '/demo-images/research-presentation-testdoc20250804023145.jpg',
      features: ['Brain Disorders', 'Neurological Exams', 'EEG Studies', 'Treatment Plans', 'Clinical Research'],
      color: 'from-indigo-600 to-purple-700',
      icon: '🧠',
      demoUrl: '/templates/demo/neurologist',
      tags: ['neurologist', 'brain', 'nervous system', 'specialist']
    },
    {
      id: 'oncologist',
      title: 'Oncologist',
      category: 'medical',
      description: 'Cancer specialist template focusing on oncology treatments and patient care.',
      image: '/demo-images/medical-experience-1.jpg',
      features: ['Cancer Treatment', 'Chemotherapy', 'Radiation Therapy', 'Patient Support', 'Clinical Trials'],
      color: 'from-purple-600 to-indigo-700',
      icon: '🎗️',
      demoUrl: '/templates/demo/oncologist',
      tags: ['oncologist', 'cancer', 'chemotherapy', 'treatment']
    },
    {
      id: 'gynecologist',
      title: 'Gynecologist',
      category: 'medical',
      description: 'Women\'s health specialist template for reproductive health and gynecological care.',
      image: '/demo-images/clinic1.jpg',
      features: ['Women\'s Health', 'Reproductive Care', 'Prenatal Care', 'Gynecological Surgery', 'Health Screenings'],
      color: 'from-pink-600 to-rose-700',
      icon: '�',
      demoUrl: '/templates/demo/gynecologist',
      tags: ['gynecologist', 'women health', 'reproductive', 'prenatal']
    },
    {
      id: 'dermatologist',
      title: 'Dermatologist',
      category: 'medical',
      description: 'Skin specialist template focusing on dermatological conditions and cosmetic procedures.',
      image: '/demo-images/clinic1.jpg',
      features: ['Skin Treatments', 'Cosmetic Procedures', 'Dermatology Research', 'Patient Education', 'Skin Cancer Screening'],
      color: 'from-orange-500 to-amber-600',
      icon: '�',
      demoUrl: '/templates/demo/dermatologist',
      tags: ['dermatologist', 'skin', 'cosmetic', 'specialist']
    },
    {
      id: 'ophthalmologist',
      title: 'Ophthalmologist',
      category: 'medical',
      description: 'Eye specialist template for vision care, eye diseases, and surgical procedures.',
      image: '/demo-images/medical-degree.jpg',
      features: ['Eye Surgery', 'Vision Correction', 'Eye Diseases', 'Laser Treatments', 'Patient Consultations'],
      color: 'from-cyan-600 to-blue-700',
      icon: '👁️',
      demoUrl: '/templates/demo/ophthalmologist',
      tags: ['ophthalmologist', 'eye', 'vision', 'specialist']
    },
    {
      id: 'psychiatrist',
      title: 'Psychiatrist',
      category: 'medical',
      description: 'Mental health specialist template focusing on psychological disorders and treatments.',
      image: '/demo-images/conference1.jpg',
      features: ['Mental Health', 'Therapy Sessions', 'Psychiatric Evaluations', 'Treatment Plans', 'Research'],
      color: 'from-teal-600 to-green-700',
      icon: '🧘‍♂️',
      demoUrl: '/templates/demo/psychiatrist',
      tags: ['psychiatrist', 'mental health', 'therapy', 'psychology']
    },
    {
      id: 'dentist',
      title: 'Dentist',
      category: 'medical',
      description: 'Dental care template for general dentistry, oral health, and dental procedures.',
      image: '/demo-images/clinic1.jpg',
      features: ['Dental Care', 'Oral Surgery', 'Preventive Care', 'Cosmetic Dentistry', 'Patient Education'],
      color: 'from-blue-500 to-teal-600',
      icon: '🦷',
      demoUrl: '/templates/demo/dentist',
      tags: ['dentist', 'dental', 'oral health', 'teeth']
    },
    {
      id: 'anesthesiologist',
      title: 'Anesthesiologist',
      category: 'medical',
      description: 'Anesthesia specialist template for perioperative care and pain management.',
      image: '/demo-images/surgery1.jpg',
      features: ['Anesthesia Administration', 'Pain Management', 'Perioperative Care', 'Patient Monitoring', 'Safety Protocols'],
      color: 'from-blue-600 to-indigo-700',
      icon: '💉',
      demoUrl: '/templates/demo/anesthesiologist',
      tags: ['anesthesiologist', 'anesthesia', 'pain management', 'surgery']
    },
    {
      id: 'radiologist',
      title: 'Radiologist',
      category: 'medical',
      description: 'Medical imaging specialist template for diagnostic radiology and image interpretation.',
      image: '/demo-images/research-presentation-testdoc20250804023145.jpg',
      features: ['Medical Imaging', 'X-Ray Analysis', 'MRI/CT Scans', 'Diagnostic Reports', 'Image Interpretation'],
      color: 'from-gray-600 to-slate-700',
      icon: '📡',
      demoUrl: '/templates/demo/radiologist',
      tags: ['radiologist', 'imaging', 'xray', 'mri', 'ct scan']
    },
    {
      id: 'urologist',
      title: 'Urologist',
      category: 'medical',
      description: 'Urinary system specialist template for kidney, bladder, and urological treatments.',
      image: '/demo-images/medical-degree.jpg',
      features: ['Urological Surgery', 'Kidney Treatments', 'Bladder Care', 'Men\'s Health', 'Minimally Invasive Procedures'],
      color: 'from-blue-500 to-cyan-600',
      icon: '🫘',
      demoUrl: '/templates/demo/urologist',
      tags: ['urologist', 'kidney', 'bladder', 'mens health']
    },
    {
      id: 'endocrinologist',
      title: 'Endocrinologist',
      category: 'medical',
      description: 'Hormone specialist template for diabetes, thyroid, and endocrine system disorders.',
      image: '/demo-images/research-presentation-testdoc20250804023145.jpg',
      features: ['Diabetes Care', 'Thyroid Treatment', 'Hormone Therapy', 'Metabolic Disorders', 'Patient Education'],
      color: 'from-green-600 to-emerald-700',
      icon: '⚖️',
      demoUrl: '/templates/demo/endocrinologist',
      tags: ['endocrinologist', 'diabetes', 'thyroid', 'hormones']
    },
    {
      id: 'pulmonologist',
      title: 'Pulmonologist',
      category: 'medical',
      description: 'Lung specialist template for respiratory diseases and pulmonary treatments.',
      image: '/demo-images/medical-experience-1.jpg',
      features: ['Lung Diseases', 'Respiratory Care', 'Sleep Studies', 'Pulmonary Function Tests', 'Critical Care'],
      color: 'from-sky-600 to-blue-700',
      icon: '🫁',
      demoUrl: '/templates/demo/pulmonologist',
      tags: ['pulmonologist', 'lung', 'respiratory', 'breathing']
    },
    {
      id: 'gastroenterologist',
      title: 'Gastroenterologist',
      category: 'medical',
      description: 'Digestive system specialist template for GI disorders and procedures.',
      image: '/demo-images/clinic1.jpg',
      features: ['Digestive Health', 'Endoscopic Procedures', 'Liver Diseases', 'Colonoscopy', 'GI Treatments'],
      color: 'from-amber-600 to-orange-700',
      icon: '🔬',
      demoUrl: '/templates/demo/gastroenterologist',
      tags: ['gastroenterologist', 'digestive', 'gi', 'liver']
    },
    {
      id: 'nurse-practitioner',
      title: 'Nurse Practitioner',
      category: 'medical',
      description: 'Professional template for nurse practitioners highlighting care experience and certifications.',
      image: '/demo-images/cert-emergency-med-testdoc20250804023145.jpg',
      features: ['Nursing Experience', 'Patient Care', 'Certifications', 'Continuing Education', 'Community Service'],
      color: 'from-purple-500 to-pink-600',
      icon: '👩‍⚕️',
      demoUrl: '/templates/demo/nurse-practitioner',
      tags: ['nurse', 'practitioner', 'healthcare', 'care']
    },
    {
      id: 'pharmacist',
      title: 'Pharmacist',
      category: 'medical',
      description: 'Pharmacy professional template for medication management and pharmaceutical care.',
      image: '/demo-images/medical-degree.jpg',
      features: ['Medication Management', 'Drug Interactions', 'Patient Counseling', 'Prescription Review', 'Health Screenings'],
      color: 'from-emerald-600 to-green-700',
      icon: '💊',
      demoUrl: '/templates/demo/pharmacist',
      tags: ['pharmacist', 'pharmacy', 'medication', 'drugs']
    },

    // Engineering Templates
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      category: 'engineering',
      description: 'Modern template for software engineers showcasing projects, skills, and technical expertise.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Code Projects', 'Technical Skills', 'GitHub Integration', 'Open Source', 'Tech Stack'],
      color: 'from-blue-600 to-purple-700',
      icon: '💻',
      demoUrl: '/templates/demo/software-engineer',
      tags: ['software', 'engineer', 'coding', 'programming']
    },
    {
      id: 'mechanical-engineer',
      title: 'Mechanical Engineer',
      category: 'engineering',
      description: 'Professional template for mechanical engineers with project portfolios and CAD showcase.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Engineering Projects', 'CAD Designs', 'Technical Drawings', 'Manufacturing', 'Innovation'],
      color: 'from-gray-600 to-gray-800',
      icon: '⚙️',
      demoUrl: '/templates/demo/mechanical-engineer',
      tags: ['mechanical', 'engineer', 'design', 'manufacturing']
    },
    {
      id: 'civil-engineer',
      title: 'Civil Engineer',
      category: 'engineering',
      description: 'Template for civil engineers highlighting infrastructure projects and construction expertise.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Infrastructure Projects', 'Construction Management', 'Structural Design', 'Site Planning', 'Safety'],
      color: 'from-orange-500 to-red-600',
      icon: '🏗️',
      demoUrl: '/templates/demo/civil-engineer',
      tags: ['civil', 'engineer', 'construction', 'infrastructure']
    },
    {
      id: 'electrical-engineer',
      title: 'Electrical Engineer',
      category: 'engineering',
      description: 'Template for electrical engineers showcasing circuit designs and electrical systems.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Circuit Design', 'Power Systems', 'Electronics', 'Automation', 'Testing'],
      color: 'from-yellow-500 to-orange-600',
      icon: '⚡',
      demoUrl: '/templates/demo/electrical-engineer',
      tags: ['electrical', 'engineer', 'circuits', 'power']
    },

    // Developer Templates
    {
      id: 'full-stack-developer',
      title: 'Full Stack Developer',
      category: 'development',
      description: 'Comprehensive template for full-stack developers with frontend and backend project showcase.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Web Applications', 'Frontend/Backend', 'Database Design', 'API Development', 'DevOps'],
      color: 'from-green-500 to-blue-600',
      icon: '🌐',
      demoUrl: '/templates/demo/full-stack-developer',
      tags: ['fullstack', 'developer', 'web', 'applications']
    },
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      category: 'development',
      description: 'UI/UX focused template for frontend developers showcasing responsive designs and user interfaces.',
      image: '/demo-images/engineering-project.jpg',
      features: ['UI/UX Design', 'Responsive Web', 'JavaScript Frameworks', 'Mobile First', 'Performance'],
      color: 'from-pink-500 to-purple-600',
      icon: '🎨',
      demoUrl: '/templates/demo/frontend-developer',
      tags: ['frontend', 'developer', 'ui', 'ux']
    },
    {
      id: 'backend-developer',
      title: 'Backend Developer',
      category: 'development',
      description: 'Server-side focused template for backend developers highlighting APIs and system architecture.',
      image: '/demo-images/engineering-project.jpg',
      features: ['API Development', 'Database Design', 'Server Architecture', 'Cloud Services', 'Microservices'],
      color: 'from-indigo-500 to-blue-700',
      icon: '🔧',
      demoUrl: '/templates/demo/backend-developer',
      tags: ['backend', 'developer', 'api', 'server']
    },
    {
      id: 'mobile-developer',
      title: 'Mobile Developer',
      category: 'development',
      description: 'Template for mobile app developers showcasing iOS and Android applications.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Mobile Apps', 'iOS/Android', 'App Store', 'User Experience', 'Cross Platform'],
      color: 'from-teal-500 to-green-600',
      icon: '📱',
      demoUrl: '/templates/demo/mobile-developer',
      tags: ['mobile', 'developer', 'ios', 'android']
    },

    // Business Templates
    {
      id: 'business-executive',
      title: 'Business Executive',
      category: 'business',
      description: 'Executive template highlighting leadership experience and business achievements.',
      image: '/demo-images/profile-photo.jpg',
      features: ['Leadership', 'Strategic Planning', 'Team Management', 'Business Growth', 'Industry Awards'],
      color: 'from-slate-600 to-gray-800',
      icon: '💼',
      demoUrl: '/templates/demo/business-executive',
      tags: ['business', 'executive', 'leadership', 'management']
    },
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      category: 'business',
      description: 'Template for entrepreneurs showcasing startups, innovations, and business ventures.',
      image: '/demo-images/profile-photo.jpg',
      features: ['Startups', 'Innovation', 'Business Ventures', 'Funding', 'Success Stories'],
      color: 'from-orange-600 to-red-700',
      icon: '🚀',
      demoUrl: '/templates/demo/entrepreneur',
      tags: ['entrepreneur', 'startup', 'business', 'innovation']
    },

    // Creative Templates
    {
      id: 'designer',
      title: 'Creative Designer',
      category: 'creative',
      description: 'Visual template for designers showcasing creative work and design portfolios.',
      image: '/demo-images/profile-photo.jpg',
      features: ['Design Portfolio', 'Creative Projects', 'Brand Identity', 'Visual Arts', 'Client Work'],
      color: 'from-purple-600 to-pink-700',
      icon: '🎭',
      demoUrl: '/templates/demo/designer',
      tags: ['designer', 'creative', 'portfolio', 'visual']
    },
    {
      id: 'photographer',
      title: 'Photographer',
      category: 'creative',
      description: 'Gallery-focused template for photographers with image showcase and booking features.',
      image: '/demo-images/profile-photo.jpg',
      features: ['Photo Gallery', 'Portfolio Showcase', 'Booking System', 'Client Testimonials', 'Services'],
      color: 'from-indigo-600 to-purple-700',
      icon: '📸',
      demoUrl: '/templates/demo/photographer',
      tags: ['photographer', 'portfolio', 'gallery', 'creative']
    },

    // Academic Templates
    {
      id: 'researcher',
      title: 'Academic Researcher',
      category: 'academic',
      description: 'Academic template for researchers highlighting publications, grants, and academic achievements.',
      image: '/demo-images/research-presentation-testdoc20250804023145.jpg',
      features: ['Research Publications', 'Academic Grants', 'Conference Papers', 'Peer Reviews', 'Citations'],
      color: 'from-blue-700 to-indigo-800',
      icon: '🔬',
      demoUrl: '/templates/demo/researcher',
      tags: ['researcher', 'academic', 'publications', 'science']
    },
    {
      id: 'professor',
      title: 'University Professor',
      category: 'academic',
      description: 'Template for professors showcasing teaching, research, and academic contributions.',
      image: '/demo-images/harvard-diploma-testdoc20250804023145.jpg',
      features: ['Teaching Experience', 'Research Work', 'Student Mentoring', 'Academic Publications', 'Courses'],
      color: 'from-green-700 to-teal-800',
      icon: '👨‍🏫',
      demoUrl: '/templates/demo/professor',
      tags: ['professor', 'academic', 'teaching', 'research']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: '🌟' },
    { id: 'medical', name: 'Medical & Healthcare', icon: '🏥' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'development', name: 'Software Development', icon: '💻' },
    { id: 'business', name: 'Business & Leadership', icon: '💼' },
    { id: 'creative', name: 'Creative & Design', icon: '🎨' },
    { id: 'academic', name: 'Academic & Research', icon: '🎓' }
  ];

  // Filter templates based on category and search
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
            Professional Portfolio Templates
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
            Choose from our collection of professionally designed templates tailored for different industries and roles
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-full border-0 shadow-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400 text-xl">🔍</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold">{templates.length}+</div>
              <div className="text-indigo-100">Professional Templates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold">{categories.length - 1}</div>
              <div className="text-indigo-100">Industry Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-indigo-100">Customizable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50 p-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedCategory === 'all' ? 'All Templates' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-gray-600">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                {/* Template Preview */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-90`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{template.icon}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{template.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={template.demoUrl}
                      className="flex-1 text-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
                    >
                      Preview
                    </Link>
                    <Link
                      to="/register"
                      className={`flex-1 text-center bg-gradient-to-r ${template.color} text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Professional Portfolio?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who have built their online presence with our templates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
