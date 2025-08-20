import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { profileAPI, fileUploadAPI } from '../services/api';
import PhotoUpload from './PhotoUpload';

// Animation styles
const fadeInAnimation = {
  animation: 'fadeIn 0.6s ease-in-out'
};

const slideUpAnimation = {
  animation: 'slideUp 0.8s ease-out'
};

const ProfileEdit = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    // Profile Type Selection
    profileType: '', // "doctor" or "engineer"
    
    // Header Section
    fullName: '',
    username: '',
    professionalTitle: '',
    phoneNumber: '',
    professionalEmail: '',
    dob: '',
    location: '',
    position: '',
    profilePhoto: '',
    address: '',
    linkedInOrWebsite: '',
    
    // Medical Portfolio Sections
    certifications: [], // Array of Certification objects
    education: [], // Array of Education objects
    internships: [], // Array of Internship objects
    publications: [], // Array of Publication objects
    conferences: [], // Array of Conference objects
    skills: [], // Array of strings
    languages: [], // Array of strings
    achievements: [], // Array of Achievement objects
    medicalExperience: [], // Array of MedicalExperience objects
    professionalMemberships: [], // Array of strings
    engineeringExperiences: [], // Array of EngineeringExperience objects (optional)
    
    // Legacy fields for backward compatibility
    name: '',
    email: '',
    about: '',
    dateOfBirth: '',
    experience: [],
    interests: [],
    projects: [],
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    },
    featured: ''
  });

  console.log('Initial formData state:', {
    experience: formData.experience,
    interests: formData.interests,
    socialLinks: formData.socialLinks
  });

  // State to track which sections are minimized
  const [minimizedSections, setMinimizedSections] = useState({
    experience: {},        // { index: true/false }
    projects: {},          // { index: true/false }
    education: {},         // { index: true/false }
    achievements: {},      // { index: true/false }
    certifications: {},    // { index: true/false }
    internships: {},       // { index: true/false }
    research: {},          // { index: true/false }
    conferences: {},       // { index: true/false }
    medicalExperience: {}, // { index: true/false }
    // Removed skills, languages - using simple tag-based UI now
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Security check: Users can only edit their own profiles
    if (username && user?.username !== username) {
      setError(`You can only edit your own profile. Please log in as ${username} to edit this profile.`);
      setLoading(false);
      return;
    }
    
    // Set profile type from navigation state if available
    const profileTypeFromState = location.state?.profileType;
    if (profileTypeFromState && (profileTypeFromState === 'doctor' || profileTypeFromState === 'engineer')) {
      setFormData(prev => ({ ...prev, profileType: profileTypeFromState }));
    }
    
    fetchCurrentProfile();
  }, [isAuthenticated, navigate, location.state, username, user]);

  const fetchCurrentProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getCurrentProfile();
      
      // Debug: Log the response to see what we're getting
      console.log('=== FRONTEND PROFILE LOAD DEBUG ===');
      console.log('Full Profile response:', response.data);
      console.log('Experience data from backend:', response.data.experience);
      console.log('Interests data from backend:', response.data.interests);
      console.log('SocialLinks data from backend:', response.data.socialLinks);
      console.log('Education data from backend:', response.data.education);
      console.log('Projects data from backend:', response.data.projects);
      console.log('===================================');
      
      // Clean function to ensure we only get valid object arrays
      const cleanObjectArray = (arr, requiredFields) => {
        if (!Array.isArray(arr)) return [];
        return arr.filter(item => {
          if (typeof item !== 'object' || item === null) return false;
          // Check if the object has the required fields (not just any object)
          return requiredFields.some(field => item.hasOwnProperty(field));
        });
      };
      
      // Map backend response to frontend state - supporting both new and legacy fields
      const profileData = {
        // Profile Type
        profileType: response.data.profileType || '',
        
        // Header Section - use new fields if available, fallback to legacy
        fullName: response.data.fullName || response.data.name || '',
        username: response.data.username || user?.username || '',
        professionalTitle: response.data.professionalTitle || '',
        phoneNumber: response.data.phoneNumber || '',
        professionalEmail: response.data.professionalEmail || response.data.email || '',
        dob: response.data.dob || response.data.dateOfBirth || '',
        location: response.data.location || '',
        position: response.data.position || '',
        profilePhoto: response.data.profilePhoto || '',
        address: response.data.address || '',
        linkedInOrWebsite: response.data.linkedInOrWebsite || '',
        
        // Medical Portfolio Sections
        certifications: cleanObjectArray(response.data.certifications, ['name', 'authority']),
        education: cleanObjectArray(response.data.education, ['degree', 'university']),
        internships: cleanObjectArray(response.data.internships, ['hospitalName', 'department']),
        publications: cleanObjectArray(response.data.publications, ['title', 'publisher']),
        conferences: cleanObjectArray(response.data.conferences, ['name', 'role']),
        skills: response.data.skills || [],
        languages: response.data.languages || [],
        achievements: cleanObjectArray(response.data.achievements, ['title', 'associatedWith']).map(ach => ({
          ...ach,
          achievementPhotos: ach.achievementPhotos || []
        })),
        medicalExperience: cleanObjectArray(response.data.medicalExperience, ['jobTitle', 'hospitalName']),
        professionalMemberships: response.data.professionalMemberships || [],
        engineeringExperiences: cleanObjectArray(response.data.engineeringExperiences, ['projectName', 'description']),
        
        // Legacy fields for backward compatibility
        name: response.data.fullName || response.data.name || '',
        email: response.data.professionalEmail || response.data.email || '',
        about: response.data.about || '',
        dateOfBirth: response.data.dob || response.data.dateOfBirth || '',
        experience: cleanObjectArray(response.data.experience, ['company', 'position']),
        interests: response.data.interests || [],
        projects: cleanObjectArray(response.data.projects, ['projectName', 'description']),
        socialLinks: response.data.socialLinks || {
          linkedin: '',
          github: '',
          twitter: '',
          website: ''
        },
        featured: response.data.featured || false
      };
      
      // Debug: Log what we're actually setting in formData
      console.log('=== FRONTEND PROCESSED DATA ===');
      console.log('Processed experience:', profileData.experience);
      console.log('Processed interests:', profileData.interests);
      console.log('Processed socialLinks:', profileData.socialLinks);
      console.log('===============================');
      
      setFormData(profileData);
      
      // Auto-minimize all sections that have data
      const minimizedState = {
        experience: {},
        projects: {},
        education: {},
        achievements: {},
        certifications: {},
        internships: {},
        research: {},
        conferences: {},
        medicalExperience: {},
        skills: false,
        languages: false,
      };
      
      // Minimize sections that have data
      profileData.experience?.forEach((_, index) => {
        minimizedState.experience[index] = true;
      });
      
      profileData.projects?.forEach((_, index) => {
        minimizedState.projects[index] = true;
      });
      
      profileData.education?.forEach((_, index) => {
        minimizedState.education[index] = true;
      });
      
      profileData.achievements?.forEach((_, index) => {
        minimizedState.achievements[index] = true;
      });
      
      profileData.certifications?.forEach((_, index) => {
        minimizedState.certifications[index] = true;
      });
      
      profileData.internships?.forEach((_, index) => {
        minimizedState.internships[index] = true;
      });
      
      profileData.conferences?.forEach((_, index) => {
        minimizedState.conferences[index] = true;
      });
      
      profileData.medicalExperience?.forEach((_, index) => {
        minimizedState.medicalExperience[index] = true;
      });
      
      // Note: Skills, Languages, and Professional Memberships now use simple tag-based UI
      // No auto-minimization needed for these sections
      
      setMinimizedSections(minimizedState);
    } catch (error) {
      if (error.response?.status === 404) {
        // Profile doesn't exist yet, that's okay - use default values
        console.log('No existing profile found, will create new one');
        setFormData({
          // Profile Type
          profileType: '',
          
          // Header Section
          fullName: '',
          username: user?.username || '',
          professionalTitle: '',
          phoneNumber: '',
          professionalEmail: '',
          dob: '',
          location: '',
          position: '',
          profilePhoto: '',
          address: '',
          linkedInOrWebsite: '',
          
          // Medical Portfolio Sections
          certifications: [],
          education: [],
          internships: [],
          publications: [],
          conferences: [],
          skills: [],
          languages: [],
          achievements: [],
          medicalExperience: [],
          professionalMemberships: [],
          engineeringExperiences: [],
          
          // Legacy fields
          name: '',
          email: '',
          about: '',
          dateOfBirth: '',
          experience: [],
          interests: [],
          projects: [],
          socialLinks: {},
          featured: false
        });
      } else {
        setError('Error fetching profile: ' + (error.response?.data?.error || error.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    console.log(`Updating social link ${platform}:`, value);
    setFormData(prev => {
      const updated = {
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value
        }
      };
      console.log('Updated socialLinks:', updated.socialLinks);
      return updated;
    });
  };

  // Helper functions for managing nested objects
  const addExperience = () => {
    console.log('Adding new experience entry');
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    };
    console.log('New experience object:', newExperience);
    setFormData(prev => {
      const updated = {
        ...prev,
        experience: [...prev.experience, newExperience]
      };
      console.log('Updated formData experience:', updated.experience);
      return updated;
    });
  };

  const updateExperience = (index, field, value) => {
    console.log(`Updating experience ${index}, field: ${field}, value: ${value}`);
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    const newEducation = {
      institute: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    const newProject = {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      projectLink: '',
      photoUrls: []
    };
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = () => {
    const newAchievement = {
      title: '',
      description: '',
      date: '',
      issuer: '',
      imageUrl: '',
      achievementPhotos: []
    };
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));
  };

  const updateAchievement = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((ach, i) => 
        i === index ? { ...ach, [field]: value } : ach
      )
    }));
  };

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    const newCertification = {
      name: '',
      authority: '',
      dateIssued: '',
      certificateUrl: '',
      imageUrl: ''
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const updateCertification = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Section minimize/expand functionality
  const handleSaveSection = async (sectionType, index) => {
    console.log(`Save ${sectionType}`, index);
    
    try {
      // Save the entire profile data to backend
      await profileAPI.updateProfile(formData);
      setSuccess(`${sectionType} section saved successfully!`);
      
      // Minimize the section after successful save
      setMinimizedSections(prev => ({
        ...prev,
        [sectionType]: {
          ...prev[sectionType],
          [index]: true
        }
      }));
    } catch (error) {
      console.error(`Error saving ${sectionType} section:`, error);
      setError(`Failed to save ${sectionType} section: ` + (error.response?.data?.error || error.message));
    }
  };

  const handleEditSection = (sectionType, index) => {
    console.log(`Edit ${sectionType}`, index);
    // Expand the section for editing
    setMinimizedSections(prev => ({
      ...prev,
      [sectionType]: {
        ...prev[sectionType],
        [index]: false
      }
    }));
  };

  const handleDeleteSection = (sectionType, index, removeFunction) => {
    console.log(`Delete ${sectionType}`, index);
    // Call the appropriate remove function
    if (removeFunction) {
      removeFunction(index);
    } else if (sectionType === 'experience') {
      removeExperience(index);
    } else if (sectionType === 'projects') {
      removeProject(index);
    } else if (sectionType === 'education') {
      removeEducation(index);
    } else if (sectionType === 'achievements') {
      removeAchievement(index);
    } else if (sectionType === 'certifications') {
      removeCertification(index);
    } else if (sectionType === 'internships') {
      removeInternship(index);
    } else if (sectionType === 'research') {
      removeResearch(index);
    } else if (sectionType === 'conferences') {
      removeConference(index);
    } else if (sectionType === 'medicalExperience') {
      removeMedicalExperience(index);
    }
    
    // Clean up minimized state for this item
    setMinimizedSections(prev => {
      const newState = { ...prev };
      delete newState[sectionType][index];
      return newState;
    });
  };

  // Medical Portfolio Handler Functions
  
  // Internships
  const addInternship = () => {
    const newInternship = {
      hospitalName: '',
      department: '',
      duration: '',
      issueDate: '',
      keyLearnings: '',
      internshipPhotos: []
    };
    setFormData(prev => ({
      ...prev,
      internships: [...prev.internships, newInternship]
    }));
  };

  const updateInternship = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      internships: prev.internships.map((intern, i) => 
        i === index ? { ...intern, [field]: value } : intern
      )
    }));
  };

  const removeInternship = (index) => {
    setFormData(prev => ({
      ...prev,
      internships: prev.internships.filter((_, i) => i !== index)
    }));
  };

  // Publications
  const addPublication = () => {
    const newPublication = {
      title: '',
      publisher: '',
      publicationDate: '',
      author: '',
      publicationUrl: '',
      description: '',
      publicationPhotos: []
    };
    setFormData(prev => ({
      ...prev,
      publications: [...prev.publications, newPublication]
    }));
  };

  const updatePublication = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      publications: prev.publications.map((pub, i) => 
        i === index ? { ...pub, [field]: value } : pub
      )
    }));
  };

  const removePublication = (index) => {
    setFormData(prev => ({
      ...prev,
      publications: prev.publications.filter((_, i) => i !== index)
    }));
  };

  // Conferences
  const addConference = () => {
    const newConference = {
      name: '',
      role: '',
      date: '',
      conferencePhotos: []
    };
    setFormData(prev => ({
      ...prev,
      conferences: [...prev.conferences, newConference]
    }));
  };

  const updateConference = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      conferences: prev.conferences.map((conf, i) => 
        i === index ? { ...conf, [field]: value } : conf
      )
    }));
  };

  const removeConference = (index) => {
    setFormData(prev => ({
      ...prev,
      conferences: prev.conferences.filter((_, i) => i !== index)
    }));
  };

  // Medical Experience
  const addMedicalExperience = () => {
    const newMedicalExp = {
      jobTitle: '',
      hospitalName: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      medicalExpPhotos: []
    };
    setFormData(prev => ({
      ...prev,
      medicalExperience: [...prev.medicalExperience, newMedicalExp]
    }));
  };

  const updateMedicalExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medicalExperience: prev.medicalExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeMedicalExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      medicalExperience: prev.medicalExperience.filter((_, i) => i !== index)
    }));
  };

  // Engineering Experiences
  const addEngineeringExperience = () => {
    const newEngExp = {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      projectLink: '',
      enggExpPhotos: []
    };
    setFormData(prev => ({
      ...prev,
      engineeringExperiences: [...prev.engineeringExperiences, newEngExp]
    }));
  };

  const updateEngineeringExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      engineeringExperiences: prev.engineeringExperiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeEngineeringExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      engineeringExperiences: prev.engineeringExperiences.filter((_, i) => i !== index)
    }));
  };

  // Photo Upload Handler Functions
  
  // Profile photo handlers
  const handleProfilePhotoUpload = async (file) => {
    try {
      const response = await fileUploadAPI.uploadProfilePhoto(file);
      setFormData(prev => ({
        ...prev,
        profilePhoto: response.data.fileUrl
      }));
      setSuccess('Profile photo uploaded successfully!');
    } catch (error) {
      console.error('Profile photo upload error:', error);
      setError('Failed to upload profile photo: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleProfilePhotoDelete = async () => {
    try {
      if (formData.profilePhoto) {
        await fileUploadAPI.deleteFile(formData.profilePhoto);
        setFormData(prev => ({
          ...prev,
          profilePhoto: ''
        }));
        setSuccess('Profile photo deleted successfully!');
      }
    } catch (error) {
      console.error('Profile photo delete error:', error);
      setError('Failed to delete profile photo: ' + (error.response?.data?.error || error.message));
    }
  };

  // Medical portfolio photo handlers
  const handleMedicalPortfolioPhotoUpload = async (file, photoType, sectionIndex, photoIndex = null) => {
    const uploadKey = `${photoType}-${sectionIndex}-${file.name}-${file.size}`;
    
    // Prevent double uploads of the same file
    if (window.uploadingPhotos && window.uploadingPhotos.has(uploadKey)) {
      console.log('Upload already in progress for:', uploadKey);
      return;
    }
    
    if (!window.uploadingPhotos) {
      window.uploadingPhotos = new Set();
    }
    
    window.uploadingPhotos.add(uploadKey);
    
    try {
      console.log(`Starting upload for ${photoType} at section ${sectionIndex}, file: ${file.name}`);
      
      let response;
      
      // Call appropriate upload API based on photo type
      switch (photoType) {
        case 'certification':
          response = await fileUploadAPI.uploadCertificationPhoto(file);
          break;
        case 'education':
          response = await fileUploadAPI.uploadEducationPhoto(file);
          break;
        case 'internship':
          response = await fileUploadAPI.uploadInternshipPhoto(file);
          break;
        case 'project':
          response = await fileUploadAPI.uploadProjectPhoto(file);
          break;
        case 'publication':
          response = await fileUploadAPI.uploadPublicationPhoto(file);
          break;
        case 'conference':
          response = await fileUploadAPI.uploadConferencePhoto(file);
          break;
        case 'achievement':
          response = await fileUploadAPI.uploadAchievementPhoto(file);
          break;
        case 'medicalExperience':
          response = await fileUploadAPI.uploadMedicalExperiencePhoto(file);
          break;
        case 'engineeringExperience':
          response = await fileUploadAPI.uploadEngineeringExperiencePhoto(file);
          break;
        default:
          throw new Error('Invalid photo type: ' + photoType);
      }

      const fileUrl = response.data.fileUrl;
      
      console.log(`Photo upload successful for ${photoType} at section ${sectionIndex}:`, fileUrl);
      
      // Update the appropriate section with the photo URL
      setFormData(prev => {
        const newData = { ...prev };
        const sectionName = getSectionName(photoType);
        const photoArrayName = getPhotoArrayName(photoType);
        
        console.log(`Updating ${sectionName}[${sectionIndex}].${photoArrayName} with:`, fileUrl);
        
        if (newData[sectionName] && newData[sectionName][sectionIndex]) {
          if (!newData[sectionName][sectionIndex][photoArrayName]) {
            newData[sectionName][sectionIndex][photoArrayName] = [];
          }
          
          if (photoIndex !== null) {
            // Replace existing photo
            console.log(`Replacing photo at index ${photoIndex}`);
            newData[sectionName][sectionIndex][photoArrayName][photoIndex] = fileUrl;
          } else {
            // Check if photo already exists to prevent duplicates
            const existingPhotos = newData[sectionName][sectionIndex][photoArrayName];
            if (!existingPhotos.includes(fileUrl)) {
              // Add new photo only if it doesn't already exist
              console.log(`Adding new photo to array, current length: ${existingPhotos.length}`);
              existingPhotos.push(fileUrl);
            } else {
              console.log(`Photo already exists in array, skipping duplicate: ${fileUrl}`);
            }
          }
          
          console.log(`Final ${photoArrayName} array:`, newData[sectionName][sectionIndex][photoArrayName]);
        }
        
        return newData;
      });

      setSuccess(`${photoType} photo uploaded successfully!`);
    } catch (error) {
      console.error(`${photoType} photo upload error:`, error);
      setError(`Failed to upload ${photoType} photo: ` + (error.response?.data?.error || error.message));
    } finally {
      // Clean up upload tracking
      const uploadKey = `${photoType}-${sectionIndex}-${file.name}-${file.size}`;
      if (window.uploadingPhotos) {
        window.uploadingPhotos.delete(uploadKey);
      }
      console.log(`Finished upload for ${photoType} at section ${sectionIndex}`);
    }
  };

  const handleMedicalPortfolioPhotoDelete = async (photoType, sectionIndex, photoIndex) => {
    try {
      const sectionName = getSectionName(photoType);
      const photoArrayName = getPhotoArrayName(photoType);
      
      console.log(`Deleting photo ${photoType} at section ${sectionIndex}, photo index ${photoIndex}`);
      
      const photoUrl = formData[sectionName][sectionIndex][photoArrayName][photoIndex];
      console.log(`Photo URL to delete:`, photoUrl);
      
      if (photoUrl) {
        await fileUploadAPI.deleteFile(photoUrl);
        
        setFormData(prev => {
          const newData = { ...prev };
          if (newData[sectionName] && newData[sectionName][sectionIndex] && newData[sectionName][sectionIndex][photoArrayName]) {
            console.log(`Before delete - ${photoArrayName} array:`, newData[sectionName][sectionIndex][photoArrayName]);
            newData[sectionName][sectionIndex][photoArrayName].splice(photoIndex, 1);
            console.log(`After delete - ${photoArrayName} array:`, newData[sectionName][sectionIndex][photoArrayName]);
          }
          return newData;
        });

        setSuccess(`${photoType} photo deleted successfully!`);
      }
    } catch (error) {
      console.error(`${photoType} photo delete error:`, error);
      setError(`Failed to delete ${photoType} photo: ` + (error.response?.data?.error || error.message));
    }
  };

  // Helper functions to map photo types to section names and photo array names
  const getSectionName = (photoType) => {
    const mapping = {
      'certification': 'certifications',
      'education': 'education',
      'internship': 'internships',
      'project': 'projects',
      'publication': 'publications',
      'conference': 'conferences',
      'achievement': 'achievements',
      'medicalExperience': 'medicalExperience',
      'engineeringExperience': 'engineeringExperiences'
    };
    return mapping[photoType];
  };

  const getPhotoArrayName = (photoType) => {
    const mapping = {
      'certification': 'certPhotos',
      'education': 'eduPhotos',
      'internship': 'internshipPhotos',
      'project': 'projectPhotos',
      'publication': 'publicationPhotos',
      'conference': 'conferencePhotos',
      'achievement': 'achievementPhotos',
      'medicalExperience': 'medicalExperiencePhotos',
      'engineeringExperience': 'enggExpPhotos'
    };
    return mapping[photoType];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      console.log('Submitting profile data:', {
        experience: formData.experience,
        interests: formData.interests,
        socialLinks: formData.socialLinks
      });
      
      const response = await profileAPI.updateProfile(formData);
      console.log('Profile update response:', response.data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate(`/${user.username}`);
      }, 2000);
    } catch (error) {
      console.error('Profile update error:', error);
      setError('Error updating profile: ' + (error.response?.data?.error || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      {/* <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Profile Editor
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">Edit Your Profile</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Shape your professional story and showcase your unique talents to the world</p>
          </div>
        </div>
      </div> */}

      {/* Form */}
      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl mr-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Basic Information</h2>
                <p className="text-gray-600 mt-1">Tell us about yourself and your professional background</p>
              </div>
            </div>

            {/* Profile Type Selection */}
            {/* <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Choose Your Profile Type
              </h3>
              <p className="text-gray-600 mb-6">Select whether you're a doctor or engineer to customize your profile fields</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.profileType === 'doctor' 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, profileType: 'doctor' }))}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${formData.profileType === 'doctor' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-center text-gray-900 mb-2">Doctor / Medical Professional</h4>
                  <p className="text-sm text-gray-600 text-center">Showcase medical experience, certifications, publications, and clinical expertise</p>
                </div>
                
                <div 
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.profileType === 'engineer' 
                      ? 'border-green-500 bg-green-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, profileType: 'engineer' }))}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${formData.profileType === 'engineer' ? 'bg-green-500' : 'bg-gray-400'}`}>
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-center text-gray-900 mb-2">Engineer / Technical Professional</h4>
                  <p className="text-sm text-gray-600 text-center">Highlight engineering projects, technical skills, and professional development</p>
                </div>
              </div>
              
              {formData.profileType && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Selected:</span> {formData.profileType === 'doctor' ? 'Doctor / Medical Professional' : 'Engineer / Technical Professional'}
                  </p>
                </div>
              )}
            </div> */}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    name="professionalEmail"
                    value={formData.professionalEmail}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                    placeholder="your.email@hospital.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2z" />
                      </svg>
                      Professional Title
                    </span>
                  </label>
                  <input
                    type="text"
                    name="professionalTitle"
                    value={formData.professionalTitle}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                    placeholder="e.g., MD, Cardiologist, Surgeon"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Current Position
                    </span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                    placeholder="e.g., Chief of Cardiology, Senior Resident"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                    placeholder="City, Country"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0v6m6-6v6M6 21h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Date of Birth
                    </span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <PhotoUpload
                      currentPhotoUrl={formData.profilePhoto}
                      onPhotoUpload={handleProfilePhotoUpload}
                      onPhotoDelete={handleProfilePhotoDelete}
                      photoType="profile"
                      label=""
                      className="compact"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Medical Portfolio Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="group">
                <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                  placeholder="Full address (optional)"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    LinkedIn or Website
                  </span>
                </label>
                <input
                  type="url"
                  name="linkedInOrWebsite"
                  value={formData.linkedInOrWebsite}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-indigo-300"
                  placeholder="https://linkedin.com/in/yourprofile or your website"
                />
              </div>
            </div>

            <div className="mt-8 group">
              <label className="block text-sm font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  About Me
                </span>
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none group-hover:border-indigo-300"
                placeholder="Tell us about yourself, your passion, experience, and what makes you unique..."
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl mr-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Work Experience</h2>
                  <p className="text-gray-600 mt-1">Share your professional journey and achievements</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Experience
              </button>
            </div>
            
            {console.log('Rendering experience section, formData.experience:', formData.experience, 'type:', typeof formData.experience)}
            {formData.experience && Array.isArray(formData.experience) ? formData.experience.map((exp, index) => (
              <div key={index} className={`p-3 border border-gray-200 rounded-lg ${minimizedSections.experience[index] ? 'mb-2' : 'mb-6'}`}>
                {minimizedSections.experience[index] ? (
                  // Compact minimized view
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {exp.position} at {exp.company} 
                        <span className="text-gray-500 ml-2">({exp.startDate} - {exp.endDate})</span>
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() => handleEditSection('experience', index)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSection('experience', index, removeExperience)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full expanded view
                  <>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Experience {index + 1}</h3>
                    </div>
                    
                    {/* Show form fields only when not minimized */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Job Title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Present if current"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Describe your role and achievements..."
                    />
                  </div>
                </div>
                
                {/* Individual Action Buttons for expanded view */}
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleSaveSection('experience', index)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                </div>
                </>
                )}
              </div>
            )) : (
              <p className="text-gray-500 italic">No experience entries yet. Click "Add Experience" to get started.</p>
            )}
            
            <button
              type="button"
              onClick={addExperience}
              className="w-full py-3 px-4 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              + Add Experience
            </button>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Education
            </h2>
            
            {formData.education.map((edu, index) => (
              <div key={index} className={`p-3 border border-gray-200 rounded-lg ${minimizedSections.education[index] ? 'mb-2' : 'mb-6'}`}>
                {minimizedSections.education[index] ? (
                  // Compact minimized view
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {edu.degree} at {edu.institute}
                        <span className="text-gray-500 ml-2">({edu.startDate} - {edu.endDate})</span>
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() => handleEditSection('education', index)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSection('education', index, removeEducation)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full expanded view
                  <>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Education {index + 1}</h3>
                    </div>
                    
                    {/* Show form fields only when not minimized */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                    <input
                      type="text"
                      value={edu.institute}
                      onChange={(e) => updateEducation(index, 'institute', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="University/School Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={edu.description}
                      onChange={(e) => updateEducation(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Relevant coursework, achievements, etc..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Education Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {edu.eduPhotos && edu.eduPhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Education photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('education', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'education', index)}
                        onPhotoDelete={() => {}}
                        photoType="education"
                        label="Add Education Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Individual Action Buttons for expanded view */}
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleSaveSection('education', index)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                </div>
                </>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addEducation}
              className="w-full py-3 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              + Add Education
            </button>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Projects
            </h2>
            
            {formData.projects.map((project, index) => (
              <div key={index} className={`p-3 border border-gray-200 rounded-lg ${minimizedSections.projects[index] ? 'mb-2' : 'mb-6'}`}>
                {minimizedSections.projects[index] ? (
                  // Compact minimized view
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {project.projectName}
                        <span className="text-gray-500 ml-2">({project.startDate} - {project.endDate})</span>
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() => handleEditSection('projects', index)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSection('projects', index, removeProject)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full expanded view
                  <>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Project {index + 1}</h3>
                    </div>
                    
                    {/* Show form fields only when not minimized */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={project.projectName}
                      onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Project Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={project.location}
                      onChange={(e) => updateProject(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Project Location"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={project.endDate}
                      onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                    <input
                      type="url"
                      value={project.projectLink}
                      onChange={(e) => updateProject(index, 'projectLink', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Describe the project, your role, and key achievements..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Project Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {project.projectPhotos && project.projectPhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Project photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('project', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'project', index)}
                        onPhotoDelete={() => {}}
                        photoType="project"
                        label="Add Project Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Individual Action Buttons for expanded view */}
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleSaveSection('projects', index)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                </div>
                </>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addProject}
              className="w-full py-3 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors duration-200"
            >
              + Add Project
            </button>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Skills & Technologies
            </h2>

            {/* Add new skill input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type a skill and press Enter to add..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value && !formData.skills.includes(value)) {
                      setFormData(prev => ({
                        ...prev,
                        skills: [...(prev.skills || []), value]
                      }));
                      e.target.value = '';
                    }
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Display skills as compact list with delete buttons */}
            {formData.skills && formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  skill.trim() && (
                    <div key={index} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-purple-600 hover:text-purple-800 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          {/*                  */}

          {/* Education */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Education
            </h2>

            <div className="space-y-3">
              {(formData.education || []).map((education, index) => (
                <div key={index} className="flex gap-3">
                  <textarea
                    value={education}
                    onChange={(e) => handleArrayChange('education', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Bachelor of Computer Science from XYZ University (2016-2020)"
                    rows="2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('education', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('education')}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Education
              </button>
            </div>
          </div> */}

          {/* Projects */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Projects
            </h2>

            <div className="space-y-3">
              {(formData.projects || []).map((project, index) => (
                <div key={index} className="flex gap-3">
                  <textarea
                    value={project}
                    onChange={(e) => handleArrayChange('projects', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., E-commerce Website - Built a full-stack online store with React, Node.js, and MongoDB"
                    rows="2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('projects', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('projects')}
                className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Project
              </button>
            </div>
          </div> */}

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Interests & Hobbies
            </h2>

            {/* Add new interest input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type an interest/hobby and press Enter to add..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    console.log('Adding interest:', value);
                    if (value && !formData.interests.includes(value)) {
                      setFormData(prev => {
                        const updated = {
                          ...prev,
                          interests: [...(prev.interests || []), value]
                        };
                        console.log('Updated interests:', updated.interests);
                        return updated;
                      });
                      e.target.value = '';
                    }
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Display interests as compact list with delete buttons */}
            {formData.interests && formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  interest.trim() && (
                    <div key={index} className="inline-flex items-center bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          interests: prev.interests.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-pink-600 hover:text-pink-800 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Achievements */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Achievements & Awards
            </h2>

            <div className="space-y-3">
              {(formData.achievements || []).map((achievement, index) => (
                <div key={index} className="flex gap-3">
                  <textarea
                    value={achievement}
                    onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g., Winner of XYZ Hackathon 2023 - Built an AI-powered solution for sustainable agriculture"
                    rows="2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('achievements', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('achievements')}
                className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Achievement
              </button>
            </div>
          </div> */}

          {/* Certifications */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Certifications
            </h2>

            <div className="space-y-3">
              {(formData.certifications || []).map((certification, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={certification}
                    onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., AWS Certified Solutions Architect, Google Cloud Professional"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('certifications', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('certifications')}
                className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Certification
              </button>
            </div>
          </div> */}

          {/* Languages */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Languages
            </h2>

            {/* Add new language input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type a language and press Enter to add..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value && !formData.languages.includes(value)) {
                      setFormData(prev => ({
                        ...prev,
                        languages: [...(prev.languages || []), value]
                      }));
                      e.target.value = '';
                    }
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Display languages as compact list with delete buttons */}
            {formData.languages && formData.languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language, index) => (
                  language.trim() && (
                    <div key={index} className="inline-flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
                      <span>{language}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          languages: prev.languages.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-cyan-600 hover:text-cyan-800 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Professional Memberships */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Professional Memberships
            </h2>

            {/* Add new membership input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type a professional membership and press Enter to add..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value && !formData.professionalMemberships.includes(value)) {
                      setFormData(prev => ({
                        ...prev,
                        professionalMemberships: [...(prev.professionalMemberships || []), value]
                      }));
                      e.target.value = '';
                    }
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Display memberships as compact list with delete buttons */}
            {formData.professionalMemberships && formData.professionalMemberships.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.professionalMemberships.map((membership, index) => (
                  membership.trim() && (
                    <div key={index} className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      <span>{membership}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          professionalMemberships: prev.professionalMemberships.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-emerald-600 hover:text-emerald-800 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Achievements
            </h2>
            
            {formData.achievements.map((achievement, index) => (
              <div key={index} className={`p-3 border border-gray-200 rounded-lg ${minimizedSections.achievements[index] ? 'mb-2' : 'mb-6'}`}>
                {minimizedSections.achievements[index] ? (
                  // Compact minimized view
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {achievement.title} - {achievement.issuer}
                        <span className="text-gray-500 ml-2">({achievement.date})</span>
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() => handleEditSection('achievements', index)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSection('achievements', index, removeAchievement)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full expanded view
                  <>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Achievement {index + 1}</h3>
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Achievement Title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                    <input
                      type="text"
                      value={achievement.issuer}
                      onChange={(e) => updateAchievement(index, 'issuer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Issuing Organization"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={achievement.date}
                      onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={achievement.description}
                      onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Describe the achievement and its significance..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Achievement Photos</label>
                    <div className="space-y-3">
                      {/* Debug info */}
                      {console.log(`Achievement ${index} photos:`, achievement.achievementPhotos)}
                      
                      {/* Display existing photos */}
                      {achievement.achievementPhotos && achievement.achievementPhotos.map((photoUrl, photoIndex) => (
                        <div key={`${index}-${photoIndex}-${photoUrl.split('/').pop()}`} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Achievement photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('achievement', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'achievement', index)}
                        onPhotoDelete={() => {}}
                        photoType="achievement"
                        label="Add Achievement Photo"
                        className="mt-2"
                        compact={true}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Individual Action Buttons for each Achievement */}
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleSaveSection('achievements', index)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                </div>
                </>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addAchievement}
              className="w-full py-3 px-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
            >
              + Add Achievement
            </button>
          </div>

          {/* Certifications Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Certifications
            </h2>
            
            {formData.certifications.map((certification, index) => (
              <div key={index} className={`p-3 border border-gray-200 rounded-lg ${minimizedSections.certifications[index] ? 'mb-2' : 'mb-6'}`}>
                {minimizedSections.certifications[index] ? (
                  // Compact minimized view
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {certification.name} - {certification.authority}
                        <span className="text-gray-500 ml-2">({certification.dateIssued})</span>
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        type="button"
                        onClick={() => handleEditSection('certifications', index)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSection('certifications', index, removeCertification)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full expanded view
                  <>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Certification {index + 1}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={certification.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Certification Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Authority</label>
                    <input
                      type="text"
                      value={certification.authority}
                      onChange={(e) => updateCertification(index, 'authority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Issuing Organization"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
                    <input
                      type="date"
                      value={certification.dateIssued}
                      onChange={(e) => updateCertification(index, 'dateIssued', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL</label>
                    <input
                      type="url"
                      value={certification.certificateUrl}
                      onChange={(e) => updateCertification(index, 'certificateUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://verify.certification.com/..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Certification Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {certification.certPhotos && certification.certPhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Certification photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('certification', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'certification', index)}
                        onPhotoDelete={() => {}}
                        photoType="certification"
                        label="Add Certification Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Save button when expanded */}
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleSaveSection('certifications', index)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                </div>
                </>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addCertification}
              className="w-full py-3 px-4 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
            >
              + Add Certification
            </button>
          </div>

          {/* Featured Section */}
          
          {/* Medical Portfolio Sections */}
          {formData.profileType === 'doctor' && (
            <>
          
          {/* Internships / Residency / Fellowship */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Internships / Residency / Fellowship
            </h2>
            <p className="text-gray-600 mb-6">Add your medical training experiences</p>

            {formData.internships.map((internship, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Internship {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeInternship(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Institution Name</label>
                    <input
                      type="text"
                      value={internship.hospitalName}
                      onChange={(e) => updateInternship(index, 'hospitalName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Johns Hopkins Hospital"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department/Specialty</label>
                    <input
                      type="text"
                      value={internship.department}
                      onChange={(e) => updateInternship(index, 'department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Internal Medicine"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={internship.duration}
                      onChange={(e) => updateInternship(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 1 year"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={internship.issueDate}
                      onChange={(e) => updateInternship(index, 'issueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 2023-2024"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Learnings</label>
                    <textarea
                      value={internship.keyLearnings}
                      onChange={(e) => updateInternship(index, 'keyLearnings', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Describe your key learnings and experiences during this internship..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {internship.internshipPhotos && internship.internshipPhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Internship photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('internship', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'internship', index)}
                        onPhotoDelete={() => {}}
                        photoType="internship"
                        label="Add Internship Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addInternship}
              className="w-full py-3 px-4 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              + Add Internship
            </button>
          </div>

          {/* Publications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Research & Publications
            </h2>
            <p className="text-gray-600 mb-6">Add your research publications and academic work</p>

            {formData.publications.map((publication, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Publication {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removePublication(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={publication.title}
                      onChange={(e) => updatePublication(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Effects of Novel Treatment on Patient Outcomes"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publisher/Journal</label>
                    <input
                      type="text"
                      value={publication.publisher}
                      onChange={(e) => updatePublication(index, 'publisher', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Journal of Medicine"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                    <input
                      type="text"
                      value={publication.publicationDate}
                      onChange={(e) => updatePublication(index, 'publicationDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., March 2024"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author(s)</label>
                    <input
                      type="text"
                      value={publication.author}
                      onChange={(e) => updatePublication(index, 'author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Dr. Smith, Dr. Johnson"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publication URL</label>
                    <input
                      type="url"
                      value={publication.publicationUrl}
                      onChange={(e) => updatePublication(index, 'publicationUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://doi.org/..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={publication.description}
                      onChange={(e) => updatePublication(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the research and findings..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Publication Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {publication.publicationPhotos && publication.publicationPhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Publication photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('publication', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'publication', index)}
                        onPhotoDelete={() => {}}
                        photoType="publication"
                        label="Add Publication Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPublication}
              className="w-full py-3 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              + Add Publication
            </button>
          </div>

          {/* Conferences & CME */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Conferences & CME
            </h2>
            <p className="text-gray-600 mb-6">Add conferences you've attended or presented at</p>

            {formData.conferences.map((conference, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Conference {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeConference(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conference Name</label>
                    <input
                      type="text"
                      value={conference.name}
                      onChange={(e) => updateConference(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., American Medical Association Annual Meeting"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      value={conference.role}
                      onChange={(e) => updateConference(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Role</option>
                      <option value="Attended">Attended</option>
                      <option value="Presented">Presented</option>
                      <option value="Keynote Speaker">Keynote Speaker</option>
                      <option value="Workshop Leader">Workshop Leader</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={conference.date}
                      onChange={(e) => updateConference(index, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., March 2024"
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Conference Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {conference.conferencePhotos && conference.conferencePhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Conference photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('conference', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'conference', index)}
                        onPhotoDelete={() => {}}
                        photoType="conference"
                        label="Add Conference Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addConference}
              className="w-full py-3 px-4 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors duration-200"
            >
              + Add Conference
            </button>
          </div>

          {/* Medical Experience */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Medical Experience
            </h2>
            <p className="text-gray-600 mb-6">Add your professional medical work experience</p>

            {formData.medicalExperience.map((experience, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Medical Experience {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeMedicalExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={experience.jobTitle}
                      onChange={(e) => updateMedicalExperience(index, 'jobTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Resident Physician"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Institution</label>
                    <input
                      type="text"
                      value={experience.hospitalName}
                      onChange={(e) => updateMedicalExperience(index, 'hospitalName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Mayo Clinic"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={experience.startDate}
                      onChange={(e) => updateMedicalExperience(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., June 2022"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="text"
                      value={experience.endDate}
                      onChange={(e) => updateMedicalExperience(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Present or June 2024"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                    <textarea
                      value={experience.responsibilities}
                      onChange={(e) => updateMedicalExperience(index, 'responsibilities', e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      placeholder="Describe your key responsibilities and achievements in this role..."
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Medical Experience Photos</label>
                    <div className="space-y-3">
                      {/* Display existing photos */}
                      {experience.medicalExperiencePhotos && experience.medicalExperiencePhotos.map((photoUrl, photoIndex) => (
                        <div key={photoIndex} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img 
                            src={photoUrl} 
                            alt={`Medical experience photo ${photoIndex + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{photoUrl}</span>
                          <button
                            type="button"
                            onClick={() => handleMedicalPortfolioPhotoDelete('medicalExperience', index, photoIndex)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      
                      {/* Photo upload component */}
                      <PhotoUpload
                        currentPhotoUrl=""
                        onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'medicalExperience', index)}
                        onPhotoDelete={() => {}}
                        photoType="medicalExperience"
                        label="Add Medical Experience Photo"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addMedicalExperience}
              className="w-full py-3 px-4 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              + Add Medical Experience
            </button>
          </div>
          </>
          )}

          {/* Engineering Portfolio Sections */}
          {formData.profileType === 'engineer' && (
            <>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Engineering Experience & Projects
            </h2>
            <p className="text-gray-600 mb-6">Add your engineering and technical project experience</p>

            {formData.engineeringExperiences.map((experience, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Engineering Experience {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeEngineeringExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={experience.projectName || ''}
                      onChange={(e) => updateEngineeringExperience(index, 'projectName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Web Application Development"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={experience.location || ''}
                      onChange={(e) => updateEngineeringExperience(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={experience.startDate || ''}
                      onChange={(e) => updateEngineeringExperience(index, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={experience.endDate || ''}
                      onChange={(e) => updateEngineeringExperience(index, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                    <input
                      type="url"
                      value={experience.projectLink || ''}
                      onChange={(e) => updateEngineeringExperience(index, 'projectLink', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/yourproject or https://yourproject.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={experience.description || ''}
                      onChange={(e) => updateEngineeringExperience(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the project, technologies used, challenges solved, and your role..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Engineering Experience Photos</label>
                    
                    {/* Photo upload component */}
                    <PhotoUpload
                      currentPhotoUrl=""
                      onPhotoUpload={(file) => handleMedicalPortfolioPhotoUpload(file, 'engineeringExperience', index)}
                      onPhotoDelete={() => {}}
                      photoType="engineeringExperience"
                      label="Add Engineering Experience Photo"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addEngineeringExperience}
              className="w-full py-3 px-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              + Add Engineering Experience
            </button>
          </div>
            </>
          )}

          {/* Featured Profile Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Featured Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Content</label>
                <textarea
                  name="featured"
                  value={formData.featured}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Highlight your most important achievement, project, or message here..."
                />
                <p className="text-xs text-gray-500 mt-1">This content will be prominently displayed on your profile</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="mr-3 h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['linkedin', 'github', 'twitter', 'website'].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{platform}</label>
                  <input
                    type="url"
                    value={formData.socialLinks[platform] || ''}
                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`https://${platform === 'website' ? 'yourwebsite.com' : platform + '.com/yourprofile'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Update Your Profile?</h3>
              <p className="text-gray-600">Make sure all information is accurate and represents you professionally</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                type="button"
                onClick={() => navigate(`/${user.username}`)}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel Changes
                </span>
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Your Profile...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Profile
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
