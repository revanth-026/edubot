export interface TemplateInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  isPremium?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages?: string[];
  certifications?: string[];
  createdAt: string;
  updatedAt: string;
}
