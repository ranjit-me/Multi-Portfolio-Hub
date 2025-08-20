import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams, useParams } from 'react-router-dom';
import { profileAPI } from '../services/api';
import DefaultTemplate from './templates/DefaultTemplate';

// Debug Template
import DebugTemplate from './Templates/DebugTemplate';

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
  Dentist
} from './Templates/Medical & Healthcare';

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
} from './Templates/Engineering';

// Software Development Templates
import {
  MobileDeveloper,
  BackendDeveloper,
  FrontendDeveloper,
  FullStackDeveloper
} from './Templates/Software Development';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const { username: routeUsername } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [loading, setLoading] = useState(true);

  // Get template from URL parameters, user profile, or localStorage
  useEffect(() => {
    const getTemplatePreference = async () => {
      setLoading(true);
      
      const urlTemplate = searchParams.get('template');
      
      // If URL has template parameter, use it and store it
      if (urlTemplate) {
        console.log('Dashboard: Using URL template:', urlTemplate);
        setSelectedTemplate(urlTemplate);
        // Store with username if available
        if (routeUsername || user?.username) {
          localStorage.setItem(`selectedTemplate_${routeUsername || user.username}`, urlTemplate);
        } else {
          localStorage.setItem('selectedTemplate', urlTemplate);
        }
        setLoading(false);
        return;
      }

      // For public profile routes (/:username), get user-specific template preference
      if (routeUsername) {
        // First check localStorage for immediate loading
        const userTemplate = localStorage.getItem(`selectedTemplate_${routeUsername}`);
        console.log(`Dashboard: Looking for template for user '${routeUsername}' in localStorage:`, userTemplate);
        
        // Try to get from backend database for public users
        try {
          console.log(`Dashboard: Fetching profile from backend for user '${routeUsername}'`);
          const response = await profileAPI.getProfileByUsername(routeUsername);
          if (response.data && response.data.selectedTemplate) {
            console.log('Dashboard: Found template in backend for user', routeUsername, ':', response.data.selectedTemplate);
            setSelectedTemplate(response.data.selectedTemplate);
            // Also store in localStorage for future quick access
            localStorage.setItem(`selectedTemplate_${routeUsername}`, response.data.selectedTemplate);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log('Dashboard: Could not fetch template from backend for user', routeUsername, ':', error);
        }
        
        // Fallback to localStorage if backend failed
        if (userTemplate) {
          console.log('Dashboard: Using localStorage template for user', routeUsername, ':', userTemplate);
          setSelectedTemplate(userTemplate);
          setLoading(false);
          return;
        }
      }

      // For authenticated users accessing their own profile
      if (isAuthenticated && user?.username && (!routeUsername || routeUsername === user.username)) {
        // First try localStorage for immediate response
        const userTemplate = localStorage.getItem(`selectedTemplate_${user.username}`);
        console.log(`Dashboard: Looking for template for authenticated user '${user.username}' in localStorage:`, userTemplate);
        
        // Try to get from backend database
        try {
          console.log(`Dashboard: Fetching profile from backend for authenticated user '${user.username}'`);
          const response = await profileAPI.getCurrentProfile();
          if (response.data && response.data.selectedTemplate) {
            console.log('Dashboard: Found template in backend for authenticated user:', response.data.selectedTemplate);
            setSelectedTemplate(response.data.selectedTemplate);
            // Also store in localStorage for future quick access
            localStorage.setItem(`selectedTemplate_${user.username}`, response.data.selectedTemplate);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log('Dashboard: Could not fetch template from backend for authenticated user:', error);
        }
        
        // Fallback to localStorage if backend failed
        if (userTemplate) {
          console.log('Dashboard: Using localStorage template for authenticated user:', userTemplate);
          setSelectedTemplate(userTemplate);
          setLoading(false);
          return;
        }
      }

      // Fallback to general stored template
      const storedTemplate = localStorage.getItem('selectedTemplate');
      console.log('Dashboard: Using fallback template:', storedTemplate);
      if (storedTemplate) {
        setSelectedTemplate(storedTemplate);
      } else {
        setSelectedTemplate('default');
      }
      
      setLoading(false);
    };

    getTemplatePreference();
  }, [searchParams, routeUsername, isAuthenticated, user]);

  // Listen for template changes from other components
  useEffect(() => {
    const handleStorageChange = (e) => {
      console.log('Dashboard: localStorage change detected:', e.key, '=', e.newValue);
      // Check for both user-specific and general template changes
      if (e.key === 'selectedTemplate' || 
          (routeUsername && e.key === `selectedTemplate_${routeUsername}`) || 
          (user?.username && e.key === `selectedTemplate_${user.username}`)) {
        const newTemplate = e.newValue || 'default';
        console.log('Dashboard: Setting template from localStorage change:', newTemplate);
        setSelectedTemplate(newTemplate);
      }
    };

    // Listen for localStorage changes from other tabs/components
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for same-page template changes
    const handleTemplateChange = (e) => {
      console.log('Dashboard: Template change event received:', e.detail);
      setSelectedTemplate(e.detail);
      // Also update localStorage for the current user
      if (user?.username) {
        const key = `selectedTemplate_${user.username}`;
        console.log('Dashboard: Storing template for user:', key, '=', e.detail);
        localStorage.setItem(key, e.detail);
      }
    };
    
    window.addEventListener('templateChanged', handleTemplateChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('templateChanged', handleTemplateChange);
    };
  }, [routeUsername, user]);

  // Render the selected template
  const renderTemplate = () => {
    const username = routeUsername || user?.username;

    console.log('Dashboard: Rendering template:', selectedTemplate, 'for username:', username);

    // Show loading if we're still determining template
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading template...</p>
          </div>
        </div>
      );
    }

    switch (selectedTemplate) {
      // Debug template for testing
      case 'debug':
        console.log('Dashboard: Rendering Debug template');
        return <DebugTemplate username={username} />;
      
      // Medical & Healthcare Templates
      case 'doctor-general':
        console.log('Dashboard: Rendering DoctorGeneral template');
        return <DoctorGeneral username={username} />;
      case 'cardiologist':
        console.log('Dashboard: Rendering Cardiologist template');
        return <Cardiologist username={username} />;
      case 'gynecologist':
        console.log('Dashboard: Rendering Gynecologist template');
        return <Gynecologist username={username} />;
      case 'orthopedic-surgeon':
        console.log('Dashboard: Rendering OrthopedicSurgeon template');
        return <OrthopedicSurgeon username={username} />;
      case 'pediatrician':
        console.log('Dashboard: Rendering Pediatrician template');
        return <Pediatrician username={username} />;
      case 'emergency-medicine':
        console.log('Dashboard: Rendering EmergencyMedicine template');
        return <EmergencyMedicine username={username} />;
      case 'neurologist':
        console.log('Dashboard: Rendering Neurologist template');
        return <Neurologist username={username} />;
      case 'oncologist':
        console.log('Dashboard: Rendering Oncologist template');
        return <Oncologist username={username} />;
      case 'dermatologist':
        console.log('Dashboard: Rendering Dermatologist template');
        return <Dermatologist username={username} />;
      case 'psychologist':
        console.log('Dashboard: Rendering Psychologist template');
        return <Psychologist username={username} />;
      case 'psychiatrist':
        console.log('Dashboard: Rendering Psychiatrist template');
        return <Psychiatrist username={username} />;
      case 'dentist':
        console.log('Dashboard: Rendering Dentist template');
        return <Dentist username={username} />;

      // Engineering Templates
      case 'software-engineer':
      case 'computer-science-engineer':
        console.log('Dashboard: Rendering ComputerScienceEngineer template');
        return <ComputerScienceEngineer username={username} />;
      case 'mechanical-engineer':
        console.log('Dashboard: Rendering MechanicalEngineer template');
        return <MechanicalEngineer username={username} />;
      case 'civil-engineer':
        console.log('Dashboard: Rendering CivilEngineer template');
        return <CivilEngineer username={username} />;
      case 'electrical-engineer':
        console.log('Dashboard: Rendering ElectricalEngineer template');
        return <ElectricalEngineer username={username} />;
      case 'information-technology-engineer':
        console.log('Dashboard: Rendering InformationTechnologyEngineer template');
        return <InformationTechnologyEngineer username={username} />;
      case 'instrumentation-engineer':
        console.log('Dashboard: Rendering InstrumentationEngineer template');
        return <InstrumentationEngineer username={username} />;
      case 'chemical-engineer':
        console.log('Dashboard: Rendering ChemicalEngineer template');
        return <ChemicalEngineer username={username} />;
      case 'petroleum-engineer':
        console.log('Dashboard: Rendering PetroleumEngineer template');
        return <PetroleumEngineer username={username} />;

      // Software Development Templates
      case 'full-stack-developer':
        console.log('Dashboard: Rendering FullStackDeveloper template');
        return <FullStackDeveloper username={username} />;
      case 'frontend-developer':
        console.log('Dashboard: Rendering FrontendDeveloper template');
        return <FrontendDeveloper username={username} />;
      case 'backend-developer':
        console.log('Dashboard: Rendering BackendDeveloper template');
        return <BackendDeveloper username={username} />;
      case 'mobile-developer':
        console.log('Dashboard: Rendering MobileDeveloper template');
        return <MobileDeveloper username={username} />;

      // Default template for any unrecognized or default selection
      default:
        console.log('Dashboard: Rendering Default template');
        return <DefaultTemplate username={username} />;
    }
  };

  return renderTemplate();
};

export default Dashboard;
