import { profileAPI } from './api';

/**
 * Template Data Service
 * Fetches user profile data from MongoDB Atlas and S3 files for template rendering
 */
export class TemplateDataService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get cached data or fetch from API
   */
  async getCachedData(key, fetchFunction) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const data = await fetchFunction();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return cached ? cached.data : null;
    }
  }

  /**
   * Fetch current user profile data
   */
  async getCurrentUserProfile() {
    return this.getCachedData('currentProfile', async () => {
      const response = await profileAPI.getCurrentProfile();
      return response.data;
    });
  }

  /**
   * Fetch profile by username (for public templates)
   */
  async getProfileByUsername(username) {
    return this.getCachedData(`profile_${username}`, async () => {
      const response = await profileAPI.getProfileByUsername(username);
      return response.data;
    });
  }

  /**
   * Get default template data structure for medical professionals
   */
  getDefaultMedicalTemplate() {
    return {
      personalInfo: {
        fullName: 'Dr. [Your Name]',
        professionalTitle: 'Medical Professional',
        profilePhoto: null,
        phoneNumber: '[Phone Number]',
        professionalEmail: '[Email Address]',
        location: '[City, State]',
        address: '[Practice Address]',
        linkedInOrWebsite: '[Website URL]'
      },
      specializations: {
        primary: 'General Medicine',
        secondary: [],
        boardCertifications: []
      },
      services: [
        {
          title: 'General Consultation',
          description: 'Comprehensive medical consultation and examination',
          icon: '🩺'
        },
        {
          title: 'Preventive Care',
          description: 'Regular check-ups and preventive health screenings',
          icon: '💊'
        },
        {
          title: 'Treatment Planning',
          description: 'Personalized treatment plans for optimal health outcomes',
          icon: '📋'
        }
      ],
      education: [],
      certifications: [],
      experience: [],
      achievements: [],
      publications: [],
      conferences: [],
      skills: [],
      languages: ['English'],
      professionalMemberships: []
    };
  }

  /**
   * Process profile data for template consumption
   */
  processProfileForTemplate(profile, templateType = 'medical') {
    if (!profile) {
      return this.getDefaultMedicalTemplate();
    }

    // Map profile data to template structure
    const templateData = {
      personalInfo: {
        fullName: profile.fullName || 'Dr. [Your Name]',
        professionalTitle: profile.professionalTitle || 'Medical Professional',
        profilePhoto: profile.profilePhoto,
        phoneNumber: profile.phoneNumber || '[Phone Number]',
        professionalEmail: profile.professionalEmail || '[Email Address]',
        location: profile.location || '[City, State]',
        address: profile.address || '[Practice Address]',
        linkedInOrWebsite: profile.linkedInOrWebsite || '[Website URL]'
      },
      specializations: {
        primary: this.extractPrimarySpecialization(profile),
        secondary: this.extractSecondarySpecializations(profile),
        boardCertifications: this.extractBoardCertifications(profile)
      },
      services: this.generateServicesFromProfile(profile, templateType),
      education: profile.education || [],
      certifications: profile.certifications || [],
      experience: profile.medicalExperience || [],
      achievements: profile.achievements || [],
      publications: profile.publications || [],
      conferences: profile.conferences || [],
      skills: profile.skills || [],
      languages: profile.languages || ['English'],
      professionalMemberships: profile.professionalMemberships || []
    };

    return templateData;
  }

  /**
   * Extract primary specialization from profile
   */
  extractPrimarySpecialization(profile) {
    if (profile.professionalTitle) {
      return profile.professionalTitle;
    }
    
    // Try to extract from certifications
    if (profile.certifications && profile.certifications.length > 0) {
      const medicalCerts = profile.certifications.filter(cert => 
        cert.name.toLowerCase().includes('medicine') || 
        cert.name.toLowerCase().includes('medical') ||
        cert.name.toLowerCase().includes('doctor')
      );
      if (medicalCerts.length > 0) {
        return medicalCerts[0].name;
      }
    }

    return 'General Medicine';
  }

  /**
   * Extract secondary specializations
   */
  extractSecondarySpecializations(profile) {
    const specializations = [];
    
    if (profile.certifications) {
      profile.certifications.forEach(cert => {
        if (cert.name.toLowerCase().includes('specialist') || 
            cert.name.toLowerCase().includes('fellowship')) {
          specializations.push(cert.name);
        }
      });
    }

    return specializations;
  }

  /**
   * Extract board certifications
   */
  extractBoardCertifications(profile) {
    if (!profile.certifications) return [];
    
    return profile.certifications
      .filter(cert => cert.name.toLowerCase().includes('board'))
      .map(cert => cert.name);
  }

  /**
   * Generate services based on profile and template type
   */
  generateServicesFromProfile(profile, templateType) {
    const baseServices = this.getDefaultMedicalTemplate().services;
    
    // Add specialty-specific services based on template type
    const specialtyServices = this.getSpecialtyServices(templateType);
    
    // Combine with any custom services from profile
    const profileServices = this.extractServicesFromExperience(profile);
    
    return [...baseServices, ...specialtyServices, ...profileServices];
  }

  /**
   * Get specialty-specific services
   */
  getSpecialtyServices(templateType) {
    const specialtyMap = {
      'cardiologist': [
        { title: 'Cardiac Consultation', description: 'Comprehensive heart health evaluation', icon: '❤️' },
        { title: 'EKG/ECG Testing', description: 'Electrocardiogram testing and analysis', icon: '📈' },
        { title: 'Stress Testing', description: 'Cardiac stress test evaluation', icon: '🏃' }
      ],
      'gynecologist': [
        { title: 'Women\'s Health Exam', description: 'Comprehensive gynecological examination', icon: '🌸' },
        { title: 'Prenatal Care', description: 'Complete pregnancy care and monitoring', icon: '🤱' },
        { title: 'Family Planning', description: 'Contraception and fertility counseling', icon: '👨‍👩‍👧' }
      ],
      'orthopedic-surgeon': [
        { title: 'Joint Surgery', description: 'Advanced joint replacement and repair', icon: '🦴' },
        { title: 'Sports Medicine', description: 'Athletic injury treatment and prevention', icon: '⚽' },
        { title: 'Fracture Care', description: 'Comprehensive fracture treatment', icon: '🏥' }
      ],
      'pediatrician': [
        { title: 'Child Wellness', description: 'Regular check-ups and vaccinations', icon: '👶' },
        { title: 'Growth Monitoring', description: 'Development tracking and assessment', icon: '📏' },
        { title: 'Behavioral Health', description: 'Child behavioral and developmental support', icon: '🧸' }
      ],
      'neurologist': [
        { title: 'Neurological Evaluation', description: 'Comprehensive brain and nervous system assessment', icon: '🧠' },
        { title: 'EEG Testing', description: 'Brain wave monitoring and analysis', icon: '⚡' },
        { title: 'Memory Assessment', description: 'Cognitive function evaluation', icon: '🧩' }
      ],
      'oncologist': [
        { title: 'Cancer Screening', description: 'Early detection and prevention programs', icon: '🔍' },
        { title: 'Chemotherapy', description: 'Advanced cancer treatment protocols', icon: '💊' },
        { title: 'Patient Support', description: 'Comprehensive cancer care support', icon: '🤝' }
      ],
      'dermatologist': [
        { title: 'Skin Cancer Screening', description: 'Comprehensive mole and skin examination', icon: '🔍' },
        { title: 'Cosmetic Procedures', description: 'Anti-aging and aesthetic treatments', icon: '✨' },
        { title: 'Acne Treatment', description: 'Advanced acne therapy and management', icon: '🌟' }
      ]
    };

    return specialtyServices[templateType] || [];
  }

  /**
   * Extract services from professional experience
   */
  extractServicesFromExperience(profile) {
    const services = [];
    
    if (profile.medicalExperience) {
      profile.medicalExperience.forEach(exp => {
        if (exp.description) {
          // Extract potential services from experience descriptions
          const serviceKeywords = ['treatment', 'consultation', 'procedure', 'therapy', 'care'];
          serviceKeywords.forEach(keyword => {
            if (exp.description.toLowerCase().includes(keyword)) {
              services.push({
                title: exp.title || 'Specialized Service',
                description: exp.description,
                icon: '🏥'
              });
            }
          });
        }
      });
    }

    return services.slice(0, 3); // Limit to 3 additional services
  }

  /**
   * Get template data for specific medical specialty
   */
  async getMedicalTemplateData(username = null, specialtyId = 'doctor-general') {
    try {
      let profile = null;
      
      // Try to fetch profile data, but don't fail if it doesn't work
      try {
        if (username) {
          profile = await this.getProfileByUsername(username);
        } else {
          profile = await this.getCurrentUserProfile();
        }
        console.log('Successfully fetched profile:', profile);
      } catch (profileError) {
        console.warn('Profile fetch failed, using default template:', profileError);
        // Continue with null profile - will use default template
      }

      return this.processProfileForTemplate(profile, specialtyId);
    } catch (error) {
      console.error('Error fetching template data:', error);
      return this.getDefaultMedicalTemplate();
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance
export const templateDataService = new TemplateDataService();

// Export individual functions for direct use
export const getTemplateData = (username, specialtyId) => 
  templateDataService.getMedicalTemplateData(username, specialtyId);

export const getDefaultTemplate = () => 
  templateDataService.getDefaultMedicalTemplate();
