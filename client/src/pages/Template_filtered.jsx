import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { profileAPI } from '../services/api';

const Template = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Template categories and data - Filtered to show only requested templates
  const templates = [
    // Medical/Doctor Templates - Only requested ones
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
      id: 'dermatologist',
      title: 'Dermatologist',
      category: 'medical',
      description: 'Skin specialist template focusing on dermatological conditions and cosmetic procedures.',
      image: '/demo-images/clinic1.jpg',
      features: ['Skin Treatments', 'Cosmetic Procedures', 'Dermatology Research', 'Patient Education', 'Skin Cancer Screening'],
      color: 'from-orange-500 to-amber-600',
      icon: '🫸',
      demoUrl: '/templates/demo/dermatologist',
      tags: ['dermatologist', 'skin', 'cosmetic', 'specialist']
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
      id: 'psychologist',
      title: 'Psychologist',
      category: 'medical',
      description: 'Clinical psychology template focusing on therapy, counseling, and mental health assessment.',
      image: '/demo-images/conference1.jpg',
      features: ['Therapy Sessions', 'Psychological Assessment', 'Counseling Services', 'Treatment Plans', 'Mental Health Research'],
      color: 'from-teal-500 to-green-600',
      icon: '🧠',
      demoUrl: '/templates/demo/psychologist',
      tags: ['psychologist', 'therapy', 'counseling', 'mental health']
    },

    // Engineering Templates - Only requested ones
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
    {
      id: 'computer-science-engineer',
      title: 'Computer Science Engineer',
      category: 'engineering',
      description: 'Template for computer science engineers showcasing software projects and system design.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Software Development', 'System Design', 'Algorithms', 'Database Management', 'AI/ML Projects'],
      color: 'from-blue-600 to-indigo-700',
      icon: '💻',
      demoUrl: '/templates/demo/computer-science-engineer',
      tags: ['computer science', 'engineer', 'software', 'programming']
    },
    {
      id: 'information-technology-engineer',
      title: 'Information Technology Engineer',
      category: 'engineering',
      description: 'Template for IT engineers focusing on network administration and system management.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Network Administration', 'System Management', 'Cybersecurity', 'Cloud Infrastructure', 'IT Support'],
      color: 'from-cyan-600 to-blue-700',
      icon: '🌐',
      demoUrl: '/templates/demo/information-technology-engineer',
      tags: ['IT', 'engineer', 'network', 'systems']
    },
    {
      id: 'instrumentation-engineer',
      title: 'Instrumentation Engineer',
      category: 'engineering',
      description: 'Template for instrumentation engineers specializing in control systems and automation.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Control Systems', 'Process Automation', 'Sensor Technology', 'SCADA Systems', 'Industrial Automation'],
      color: 'from-purple-600 to-pink-700',
      icon: '⚙️',
      demoUrl: '/templates/demo/instrumentation-engineer',
      tags: ['instrumentation', 'engineer', 'automation', 'control']
    },
    {
      id: 'chemical-engineer',
      title: 'Chemical Engineer',
      category: 'engineering',
      description: 'Template for chemical engineers focusing on process design and chemical manufacturing.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Process Design', 'Chemical Manufacturing', 'Plant Operations', 'Safety Protocols', 'Quality Control'],
      color: 'from-green-600 to-teal-700',
      icon: '🧪',
      demoUrl: '/templates/demo/chemical-engineer',
      tags: ['chemical', 'engineer', 'process', 'manufacturing']
    },
    {
      id: 'petroleum-engineer',
      title: 'Petroleum Engineer',
      category: 'engineering',
      description: 'Template for petroleum engineers specializing in oil and gas exploration and production.',
      image: '/demo-images/engineering-project.jpg',
      features: ['Oil & Gas Exploration', 'Drilling Operations', 'Reservoir Engineering', 'Production Optimization', 'Environmental Safety'],
      color: 'from-amber-600 to-orange-700',
      icon: '🛢️',
      demoUrl: '/templates/demo/petroleum-engineer',
      tags: ['petroleum', 'engineer', 'oil', 'gas']
    },

    // Developer Templates - Only requested ones
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
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: '🌟' },
    { id: 'medical', name: 'Medical & Healthcare', icon: '🏥' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'development', name: 'Software Development', icon: '💻' }
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

  // Function to change template without navigation
  const changeTemplate = async (templateId) => {
    console.log('Template: Changing template to:', templateId);
    console.log('Template: Current user:', user?.username);
    
    try {
      // Store template preference with username (localStorage for immediate feedback)
      if (user?.username) {
        const key = `selectedTemplate_${user.username}`;
        console.log('Template: Storing user-specific template:', key, '=', templateId);
        localStorage.setItem(key, templateId);
      }
      // Also store general fallback
      console.log('Template: Storing general template:', templateId);
      localStorage.setItem('selectedTemplate', templateId);
      
      // Save to backend database for persistent storage
      if (isAuthenticated && user?.username) {
        console.log('Template: Saving template to backend database');
        await profileAPI.updateSelectedTemplate(templateId);
        console.log('Template: Successfully saved to backend');
      }
      
      // Dispatch custom event to notify Dashboard component
      console.log('Template: Dispatching templateChanged event:', templateId);
      window.dispatchEvent(new CustomEvent('templateChanged', { detail: templateId }));
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
      notification.textContent = `✅ Template changed to ${templateId === 'cardiologist' ? 'Cardiologist' : templateId === 'orthopedic-surgeon' ? 'Orthopedic Surgeon' : 'Default'}`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error saving template preference:', error);
      // Show error notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = '❌ Failed to save template preference';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
    }
  };

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
                    {!isAuthenticated ? (
                      <Link
                        to="/login"
                        className={`flex-1 text-center bg-gradient-to-r ${template.color} text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                      >
                        Login to Use
                      </Link>
                    ) : (
                      <button
                        onClick={() => changeTemplate(template.id)}
                        className={`flex-1 text-center bg-gradient-to-r ${template.color} text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                      >
                        Use Template
                      </button>
                    )}
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
