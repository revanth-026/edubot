import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ResumeData, Template } from '../types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    website: 'www.johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    nationality: undefined,
    address: undefined
  },
  summary: 'Experienced professional with a proven track record of delivering high-quality results in dynamic environments. Skilled in leadership, problem-solving, and strategic planning.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: '2024-01',
      current: false,
      description: 'Led development of scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver projects on time and within budget.',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2018-06',
      endDate: '2020-01',
      current: false,
      description: 'Built and maintained full-stack applications using modern technologies. Implemented CI/CD pipelines and improved development workflows.',
      location: 'Austin, TX'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      current: false,
      gpa: '3.8',
      location: ''
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert' },
    { id: '2', name: 'React', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Advanced' },
    { id: '5', name: 'AWS', level: 'Intermediate' }
  ],
  languages: ['English (Native)', 'Spanish (Conversational)'],
  certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce solution with payment integration and inventory management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      url: 'https://github.com/johndoe/ecommerce'
    }
  ]
};

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: Template | null;
  recentResumes: { id: string; title: string; updatedAt: string }[];  // <-- Add this
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateLanguages: (languages: string[]) => void;
  updateCertifications: (certifications: string[]) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  setSelectedTemplate: (template: Template) => void;
  updateRecentResume: (id: string, updatedFields: Partial<{ title: string; updatedAt: string }>) => void; // <-- Add this
}


const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [recentResumes, setRecentResumes] = useState<{ id: string; title: string; updatedAt: string }[]>([]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateExperience = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateLanguages = (languages: string[]) => {
    setResumeData(prev => ({ ...prev, languages }));
  };

  const updateCertifications = (certifications: string[]) => {
    setResumeData(prev => ({ ...prev, certifications }));
  };

  const updateProjects = (projects: ResumeData['projects']) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateRecentResume = (id: string, updatedFields: Partial<{ title: string; updatedAt: string }>) => {
    setRecentResumes(prev =>
      prev.map(resume =>
        resume.id === id ? { ...resume, ...updatedFields } : resume
      )
    );
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      selectedTemplate,
      recentResumes,
      setResumeData,
      updatePersonalInfo,
      updateSummary,
      updateExperience,
      updateEducation,
      updateSkills,
      updateLanguages,
      updateCertifications,
      updateProjects,
      setSelectedTemplate,
      updateRecentResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};