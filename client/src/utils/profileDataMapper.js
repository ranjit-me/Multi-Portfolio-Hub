// Utility function for mapping MongoDB profile data to template variables
// This handles all possible field name variations from the database

export const mapProfileData = (profileData, userAuthData = null) => {
  if (!profileData) {
    return getDefaultProfileData();
  }

  console.log('=== PROFILE DATA MAPPER ===');
  console.log('Input profileData:', profileData);
  console.log('Input userAuthData:', userAuthData);

  const mapped = {
    // Basic personal information with multiple field fallbacks
    name: profileData.name || 
          profileData.fullName || 
          profileData.firstName || 
          profileData.personalInfo?.fullName ||
          userAuthData?.name || 
          'Your Name',
          
    email: profileData.email || 
           profileData.professionalEmail || 
           profileData.contactInfo?.email || 
           profileData.personalInfo?.email ||
           userAuthData?.email || 
           'contact@example.com',
           
    phone: profileData.phone || 
           profileData.phoneNumber || 
           profileData.contactInfo?.phone || 
           profileData.personalInfo?.phoneNumber || 
           '+1 (555) 123-4567',
           
    title: profileData.title || 
           profileData.professionalTitle || 
           profileData.jobTitle || 
           profileData.position || 
           profileData.personalInfo?.professionalTitle || 
           'Professional Title',
           
    bio: profileData.bio || 
         profileData.description || 
         profileData.summary || 
         profileData.aboutMe || 
         profileData.personalInfo?.bio || 
         'Professional biography goes here.',
         
    location: profileData.location || 
              profileData.city || 
              profileData.address?.city || 
              profileData.contactInfo?.location || 
              profileData.personalInfo?.location || 
              'Location',
              
    address: profileData.address || 
             profileData.practiceAddress || 
             profileData.fullAddress || 
             profileData.contactInfo?.address || 
             profileData.personalInfo?.address || 
             'Address',
             
    profilePhoto: profileData.profilePhoto || 
                  profileData.profileImage || 
                  profileData.avatar || 
                  profileData.photo || 
                  profileData.personalInfo?.profilePhoto || 
                  null,

    // Professional data arrays - handle different possible field names
    experience: profileData.experience || 
                profileData.workExperience || 
                profileData.professionalExperience || 
                profileData.jobHistory || 
                [],
                
    education: profileData.education || 
               profileData.academicBackground || 
               profileData.qualifications || 
               profileData.degrees || 
               [],
               
    skills: profileData.skills || 
            profileData.competencies || 
            profileData.technicalSkills || 
            profileData.expertise || 
            [],
            
    achievements: profileData.achievements || 
                  profileData.awards || 
                  profileData.honors || 
                  profileData.recognitions || 
                  [],
                  
    certifications: profileData.certifications || 
                    profileData.licenses || 
                    profileData.credentials || 
                    [],
                    
    projects: profileData.projects || 
              profileData.portfolio || 
              profileData.researchProjects || 
              profileData.publications || 
              [],
              
    services: profileData.services || 
              profileData.medicalServices || 
              profileData.offerings || 
              profileData.treatmentServices || 
              [],
              
    specializations: profileData.specializations || 
                     profileData.specialties || 
                     profileData.areasOfExpertise || 
                     profileData.expertise || 
                     [],

    // Additional fields that might exist
    languages: profileData.languages || [],
    interests: profileData.interests || [],
    publications: profileData.publications || [],
    conferences: profileData.conferences || [],
    memberships: profileData.memberships || [],
    
    // Social media and links
    website: profileData.website || profileData.personalWebsite || '',
    linkedin: profileData.linkedin || profileData.linkedinUrl || '',
    github: profileData.github || profileData.githubUrl || '',
    twitter: profileData.twitter || profileData.twitterUrl || '',
    
    // Raw data for custom access
    raw: profileData
  };

  console.log('=== MAPPED PROFILE DATA OUTPUT ===');
  console.log('Mapped data:', mapped);
  console.log('=== END MAPPER ===');

  return mapped;
};

export const getDefaultProfileData = () => ({
  name: 'Your Name',
  email: 'contact@example.com',
  phone: '+1 (555) 123-4567',
  title: 'Professional Title',
  bio: 'Professional biography goes here.',
  location: 'Location',
  address: 'Address',
  profilePhoto: null,
  experience: [],
  education: [],
  skills: [],
  achievements: [],
  certifications: [],
  projects: [],
  services: [],
  specializations: [],
  languages: [],
  interests: [],
  publications: [],
  conferences: [],
  memberships: [],
  website: '',
  linkedin: '',
  github: '',
  twitter: '',
  raw: null
});

// Template-specific data formatters
export const formatForMedicalTemplate = (mappedData) => ({
  personalInfo: {
    fullName: mappedData.name,
    professionalTitle: mappedData.title,
    professionalEmail: mappedData.email,
    phoneNumber: mappedData.phone,
    location: mappedData.location,
    address: mappedData.address,
    profilePhoto: mappedData.profilePhoto,
    bio: mappedData.bio
  },
  experience: mappedData.experience,
  education: mappedData.education,
  achievements: mappedData.achievements,
  services: mappedData.services,
  specializations: mappedData.specializations,
  certifications: mappedData.certifications
});

export const formatForDeveloperTemplate = (mappedData) => ({
  name: mappedData.name,
  title: mappedData.title,
  email: mappedData.email,
  phone: mappedData.phone,
  location: mappedData.location,
  profileImage: mappedData.profilePhoto,
  bio: mappedData.bio,
  experience: mappedData.experience,
  education: mappedData.education,
  skills: mappedData.skills,
  projects: mappedData.projects,
  achievements: mappedData.achievements,
  specializations: mappedData.specializations
});

export const formatForEngineeringTemplate = (mappedData) => ({
  name: mappedData.name,
  title: mappedData.title,
  email: mappedData.email,
  phone: mappedData.phone,
  location: mappedData.location,
  profileImage: mappedData.profilePhoto,
  bio: mappedData.bio,
  experience: mappedData.experience,
  education: mappedData.education,
  skills: mappedData.skills,
  projects: mappedData.projects,
  achievements: mappedData.achievements,
  specializations: mappedData.specializations,
  certifications: mappedData.certifications
});
