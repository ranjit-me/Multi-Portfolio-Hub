import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileAPI } from '../../../services/api';

const Neurologist = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if this is the current user's own profile
  const isOwnProfile = isAuthenticated && user?.username === username;

  useEffect(() => {
    console.log('Neurologist template useEffect triggered');
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
      console.log('Fetching profile for Neurologist template:', targetUsername);
      
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
      
      console.log('Neurologist profile API response:', response);
      
      if (response.data) {
        setProfileData(response.data);
        console.log('Neurologist profile data set successfully');
      }
    } catch (error) {
      console.error('Error fetching profile for Neurologist template:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading neurologist profile...</p>
        </div>
      </div>
    );
  }

  // Get profile data with fallbacks
  const name = profileData?.name || user?.name || 'Dr. [Your Name]';
  const email = profileData?.email || user?.email || 'contact@example.com';
  const phone = profileData?.phone || '+1 (555) 123-4567';
  const title = profileData?.title || 'Neurologist & Brain Specialist';
  const bio = profileData?.bio || 'Expert in diagnosing and treating disorders of the brain, spinal cord, and nervous system, with advanced training in neurological conditions and cutting-edge treatment approaches.';
  const location = profileData?.location || 'Medical Center';
  const experience = profileData?.experience || [];
  const education = profileData?.education || [];
  const achievements = profileData?.achievements || [];
  const certifications = profileData?.certifications || [];
  const specializations = profileData?.specializations || ['Neurological Disorders', 'Brain Surgery', 'Epilepsy Treatment', 'Stroke Care', 'Neurodegenerative Diseases'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">🧠</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
              <p className="text-xl text-indigo-100 mb-4">{title}</p>
              <p className="text-lg text-indigo-200 max-w-2xl">
                {bio}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a 
                  href={`mailto:${email}`}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Me
                </a>
                <a
                  href={`tel:${phone}`}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Specializations */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Neurological Specializations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3">Brain Disorders</h3>
              <p className="text-gray-600">Comprehensive diagnosis and treatment of brain-related conditions and cognitive disorders.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Neurological Exams</h3>
              <p className="text-gray-600">Detailed neurological assessments, cognitive testing, and neurological function evaluation.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">EEG Studies</h3>
              <p className="text-gray-600">Electroencephalogram testing for seizure disorders and brain wave analysis.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3">Treatment Plans</h3>
              <p className="text-gray-600">Personalized treatment strategies for complex neurological conditions.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-3">Clinical Research</h3>
              <p className="text-gray-600">Participation in cutting-edge neurological research and clinical trials.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">💊</div>
              <h3 className="text-xl font-semibold mb-3">Medication Management</h3>
              <p className="text-gray-600">Expert management of neurological medications and treatment optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Treated */}
      <section className="py-16 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Neurological Conditions We Treat</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-indigo-800">Movement Disorders</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Parkinson's Disease</li>
                <li>• Essential Tremor</li>
                <li>• Dystonia</li>
                <li>• Huntington's Disease</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-purple-800">Seizure Disorders</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Epilepsy</li>
                <li>• Partial Seizures</li>
                <li>• Generalized Seizures</li>
                <li>• Status Epilepticus</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-indigo-800">Headache Disorders</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Migraines</li>
                <li>• Cluster Headaches</li>
                <li>• Tension Headaches</li>
                <li>• Chronic Daily Headache</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-purple-800">Neurodegenerative</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Alzheimer's Disease</li>
                <li>• Multiple Sclerosis</li>
                <li>• ALS (Lou Gehrig's)</li>
                <li>• Dementia</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-indigo-800">Stroke & Vascular</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Acute Stroke</li>
                <li>• TIA (Mini-strokes)</li>
                <li>• Cerebral Aneurysms</li>
                <li>• Vascular Dementia</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-purple-800">Peripheral Nervous</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Neuropathy</li>
                <li>• Carpal Tunnel</li>
                <li>• Guillain-Barré</li>
                <li>• Myasthenia Gravis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Tools */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Advanced Diagnostic Technology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="font-semibold mb-2">EEG</h3>
              <p className="text-sm text-gray-600">Brain wave monitoring</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl mb-2">🧲</div>
              <h3 className="font-semibold mb-2">MRI</h3>
              <p className="text-sm text-gray-600">Brain imaging</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">EMG</h3>
              <p className="text-sm text-gray-600">Nerve conduction</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg shadow text-center">
              <div className="text-2xl mb-2">🩻</div>
              <h3 className="font-semibold mb-2">CT Scan</h3>
              <p className="text-sm text-gray-600">Brain structure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Practice & Experience */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Medical Practice & Experience</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
              <img 
                src="/demo-images/profile-testdoc20250804023145.jpg" 
                alt="Neurologist Professional Profile"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-800">Professional Profile</h3>
                <p className="text-gray-600">Board-certified neurologist with extensive clinical experience</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
              <img 
                src="/demo-images/medical-experience-1.jpg" 
                alt="Medical Experience"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-800">Clinical Experience</h3>
                <p className="text-gray-600">Years of specialized experience in neurological care and treatment</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
              <img 
                src="/demo-images/medical-degree.jpg" 
                alt="Medical Degree & Certification"
                className="w-full h-48 object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-indigo-800">Medical Education</h3>
                <p className="text-gray-600">Advanced medical degree and specialized neurology certification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Neurology Consultation</h2>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl p-8">
            <p className="text-xl mb-6">Expert neurological care when you need it most</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="text-lg">
                📞 Neurology Clinic: [Phone Number]
              </div>
              <div className="text-lg">
                🧠 Stroke Hotline: [Emergency Number]
              </div>
            </div>
            <p className="mt-4 text-indigo-100">
              Urgent neurological consultations available
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Neurologist;
