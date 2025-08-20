import { useState, useEffect } from 'react';
import { templateDataService } from '../services/templateDataService';

/**
 * Custom hook for fetching and managing template data
 */
export const useTemplateData = (username = null, specialtyId = 'doctor-general') => {
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For now, always use default data to avoid API issues
        console.log('Fetching template data for:', specialtyId, username);
        
        let data;
        try {
          data = await templateDataService.getMedicalTemplateData(username, specialtyId);
        } catch (apiError) {
          console.warn('API fetch failed, using default template:', apiError);
          data = templateDataService.getDefaultMedicalTemplate();
        }
        
        setTemplateData(data);
      } catch (err) {
        console.error('Error in useTemplateData:', err);
        setError(err.message || 'Failed to fetch template data');
        
        // Fallback to default template
        const defaultData = templateDataService.getDefaultMedicalTemplate();
        setTemplateData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [username, specialtyId]);

  const refreshData = async () => {
    templateDataService.clearCache();
    setLoading(true);
    
    try {
      const data = await templateDataService.getMedicalTemplateData(username, specialtyId);
      setTemplateData(data);
    } catch (err) {
      const defaultData = templateDataService.getDefaultMedicalTemplate();
      setTemplateData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  return {
    templateData,
    loading,
    error,
    refreshData
  };
};

/**
 * Hook for user profile data
 */
export const useUserProfile = (username = null) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let profileData;
        if (username) {
          profileData = await templateDataService.getProfileByUsername(username);
        } else {
          profileData = await templateDataService.getCurrentUserProfile();
        }
        
        setProfile(profileData);
      } catch (err) {
        console.error('Error in useUserProfile:', err);
        setError(err.message || 'Failed to fetch profile data');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return {
    profile,
    loading,
    error
  };
};
