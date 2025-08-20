import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { profileAPI } from '../../services/api';

const DebugTemplate = ({ username = null }) => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDebugData = async () => {
      setLoading(true);
      try {
        let response;
        if (username) {
          response = await profileAPI.getProfileByUsername(username);
        } else if (isAuthenticated && user?.username) {
          response = await profileAPI.getCurrentProfile();
        } else {
          setLoading(false);
          return;
        }
        
        console.log('=== DEBUG TEMPLATE - FULL API RESPONSE ===');
        console.log('Response object:', response);
        console.log('Response.data:', response.data);
        
        if (response.data) {
          console.log('=== ALL AVAILABLE FIELDS IN DATABASE ===');
          const data = response.data;
          console.log('Object.keys(data):', Object.keys(data));
          
          // Log every field and its value
          Object.keys(data).forEach(key => {
            console.log(`${key}:`, data[key]);
          });
          
          setProfileData(data);
        }
      } catch (error) {
        console.error('Debug template error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDebugData();
  }, [username, isAuthenticated, user]);

  if (loading) {
    return <div className="p-8">Loading debug data...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🔍 Profile Data Debug Template</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Authentication Info</h2>
        <ul className="space-y-2">
          <li><strong>Username prop:</strong> {username || 'None'}</li>
          <li><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</li>
          <li><strong>Auth user:</strong> {user?.username || 'None'}</li>
          <li><strong>Error:</strong> {error || 'None'}</li>
        </ul>
      </div>

      {profileData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📊 Complete Database Profile Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(profileData, null, 2)}
          </pre>
          
          <h3 className="text-lg font-semibold mt-6 mb-4">🔑 Available Field Mappings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-700">Personal Info</h4>
              <ul className="text-sm space-y-1">
                <li>Name: {profileData.name || profileData.fullName || 'Not found'}</li>
                <li>Email: {profileData.email || profileData.professionalEmail || 'Not found'}</li>
                <li>Phone: {profileData.phone || profileData.phoneNumber || 'Not found'}</li>
                <li>Title: {profileData.title || profileData.professionalTitle || 'Not found'}</li>
                <li>Bio: {profileData.bio ? 'Available' : 'Not found'}</li>
                <li>Location: {profileData.location || 'Not found'}</li>
                <li>Profile Photo: {profileData.profilePhoto || profileData.profileImage || 'Not found'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700">Professional Data</h4>
              <ul className="text-sm space-y-1">
                <li>Experience: {profileData.experience?.length || 0} items</li>
                <li>Education: {profileData.education?.length || 0} items</li>
                <li>Skills: {profileData.skills?.length || 0} items</li>
                <li>Achievements: {profileData.achievements?.length || 0} items</li>
                <li>Certifications: {profileData.certifications?.length || 0} items</li>
                <li>Projects: {profileData.projects?.length || 0} items</li>
                <li>Services: {profileData.services?.length || 0} items</li>
                <li>Specializations: {profileData.specializations?.length || 0} items</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 p-6 rounded-lg">
          <p>No profile data found. This could mean:</p>
          <ul className="list-disc list-inside mt-2">
            <li>No user is logged in</li>
            <li>No profile exists for this user</li>
            <li>Database connection issues</li>
            <li>Authentication problems</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DebugTemplate;
