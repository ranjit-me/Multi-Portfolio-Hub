import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { profileAPI } from '../services/api';

// Medical & Healthcare Templates
import {
  DoctorGeneral,
  Cardiologist,
  Gynecologist,
  OrthopedicSurgeon,
  Pediatrician,
  EmergencyMedicine,
  Neurologist,
  Oncologist,
  Dermatologist,
  Psychologist,
  Psychiatrist,
  Dentist,
  TestTemplate
} from '../components/Templates/Medical & Healthcare';

// Engineering Templates
import {
  ComputerScienceEngineer,
  InformationTechnologyEngineer,
  InstrumentationEngineer,
  ChemicalEngineer,
  PetroleumEngineer,
  MechanicalEngineer,
  CivilEngineer,
  ElectricalEngineer
} from '../components/Templates/Engineering';

// Software Development Templates
import {
  MobileDeveloper,
  BackendDeveloper,
  FrontendDeveloper,
  FullStackDeveloper
} from '../components/Templates/Software Development';

// Debug Template
import DebugTemplate from '../components/Templates/DebugTemplate';

// Import the simple version for testing
import GynecologistSimple from '../components/Templates/Medical & Healthcare/GynecologistSimple';

const TemplateDemo = () => {
  const { templateId } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Function to change template and redirect
  const changeTemplate = async (templateId) => {
    console.log('TemplateDemo: Changing template to:', templateId);
    console.log('TemplateDemo: Current user:', user?.username);
    
    try {
      // Store template preference with username (localStorage for immediate feedback)
      if (user?.username) {
        const key = `selectedTemplate_${user.username}`;
        console.log('TemplateDemo: Storing user-specific template:', key, '=', templateId);
        localStorage.setItem(key, templateId);
      }
      // Also store general fallback
      console.log('TemplateDemo: Storing general template:', templateId);
      localStorage.setItem('selectedTemplate', templateId);
      
      // Save to backend database for persistent storage
      if (isAuthenticated && user?.username) {
        console.log('TemplateDemo: Saving template to backend database');
        await profileAPI.updateSelectedTemplate(templateId);
        console.log('TemplateDemo: Successfully saved to backend');
      }
      
      // Dispatch custom event to notify Dashboard component
      console.log('TemplateDemo: Dispatching templateChanged event:', templateId);
      window.dispatchEvent(new CustomEvent('templateChanged', { detail: templateId }));
      
      // Get template name for notification
      const templateName = templateId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
      notification.textContent = `✅ Template changed to ${templateName}! Redirecting to profile...`;
      document.body.appendChild(notification);
      
      // Redirect to user profile after 1.5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        navigate(`/${user?.username || 'dashboard'}`);
      }, 1500);
      
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

  // Map template IDs to their corresponding components
  const templateComponents = {
    // Medical & Healthcare Templates - Available
    'doctor-general': DoctorGeneral,
    'cardiologist': Cardiologist,
    'gynecologist-simple': GynecologistSimple,
    'gynecologist': Gynecologist,
    'orthopedic-surgeon': OrthopedicSurgeon,
    'pediatrician': Pediatrician,
    'emergency-medicine': EmergencyMedicine,
    'neurologist': Neurologist,
    'oncologist': Oncologist,
    'dermatologist': Dermatologist,
    'psychologist': Psychologist,
    'psychiatrist': Psychiatrist,
    'dentist': Dentist,
    'test': TestTemplate,
    
    // Engineering Templates - Available
    'software-engineer': ComputerScienceEngineer, // Maps software-engineer to ComputerScienceEngineer
    'mechanical-engineer': MechanicalEngineer,
    'civil-engineer': CivilEngineer,
    'electrical-engineer': ElectricalEngineer,
    'computer-science-engineer': ComputerScienceEngineer,
    'information-technology-engineer': InformationTechnologyEngineer,
    'instrumentation-engineer': InstrumentationEngineer,
    'chemical-engineer': ChemicalEngineer,
    'petroleum-engineer': PetroleumEngineer,
    
    // Software Development Templates - Available
    'full-stack-developer': FullStackDeveloper,
    'frontend-developer': FrontendDeveloper,
    'backend-developer': BackendDeveloper,
    'mobile-developer': MobileDeveloper,
    
    // Debug template for testing data fetching
    'debug': DebugTemplate,
    
    // Note: Templates without components will automatically show "Coming Soon"
    // Medical templates not yet implemented:
    // - doctor-surgeon, doctor-specialist, ophthalmologist, anesthesiologist
    // - radiologist, urologist, endocrinologist, pulmonologist
    // - gastroenterologist, nurse-practitioner, pharmacist
    
    // Business & Creative templates not yet implemented:
    // - business-executive, entrepreneur, designer, photographer
    
    // Academic templates not yet implemented:
    // - researcher, professor
  };

  const TemplateComponent = templateComponents[templateId];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-8xl mb-6 animate-bounce">🚧</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Template Preview Coming Soon</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The <strong>"{templateId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}"</strong> template is under development and will be available soon.
          </p>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-gray-100/50">
            <p className="text-gray-600 mb-4">🚀 We're working hard to bring you this template!</p>
            <p className="text-sm text-gray-500">
              In the meantime, check out our available templates or come back later.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ← Back to Templates
            </button>
            <button
              onClick={() => window.location.href = '/templates'}
              className="bg-white/70 backdrop-blur-lg text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 border border-indigo-200"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Preview Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>←</span>
              <span>Back to Templates</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Preview Mode</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Template: {templateId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            {!isAuthenticated ? (
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                Login to Use
              </button>
            ) : (
              <button
                onClick={() => changeTemplate(templateId)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                Use This Template
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Template Content */}
      <div className="pt-16">
        <TemplateComponent />
      </div>
    </div>
  );
};

export default TemplateDemo;
