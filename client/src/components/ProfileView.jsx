import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { profileAPI } from '../services/api';

const ProfileView = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profileAPI.getProfileByUsername(username);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Profile not found');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'This profile does not exist'}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isOwnProfile = isAuthenticated && user?.username === username;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {profile?.fullName || profile?.name || 'Professional Profile'}
              </h1>
            </div>
            
            {isOwnProfile && (
              <div className="flex items-center space-x-4">
                <Link 
                  to={`/${username}/edit`}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Edit Profile
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">
                {profile?.fullName || profile?.name || 'Professional Name'}
              </h2>
              <p className="text-xl mb-4 opacity-90">
                {profile?.profession || profile?.professionalTitle || 'Professional Title'}
              </p>
              <p className="text-lg mb-8 opacity-80">
                {profile?.bio || profile?.about || 'Professional biography and introduction will appear here. This is where you can describe your expertise, experience, and what makes you unique in your field.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                  Get In Touch
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                  View Services
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={profile?.profilePicture || profile?.profilePhoto || "/api/placeholder/320/320"} 
                  alt={profile?.fullName || profile?.name || "Professional"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-8">About Me</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {profile?.bio || profile?.about || 'Professional background and experience will be displayed here. This section provides an overview of qualifications, expertise, and professional journey.'}
              </p>
              
              {profile?.experience && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Experience</h4>
                  <p className="text-gray-600">{profile.experience}</p>
                </div>
              )}

              {profile?.education && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Education</h4>
                  <p className="text-gray-600">{profile.education}</p>
                </div>
              )}
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">Contact Info</h4>
              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Email: <strong>{profile.email}</strong></span>
                  </div>
                )}
                {profile?.phoneNumber && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Phone: <strong>{profile.phoneNumber}</strong></span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Location: <strong>{profile.location}</strong></span>
                  </div>
                )}
                {profile?.address && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Address: <strong>{profile.address}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 {profile?.fullName || profile?.name || 'Professional Name'}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfileView;
