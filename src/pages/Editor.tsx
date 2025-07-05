import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Briefcase, GraduationCap, Award, FileText, Eye, CheckCircle, Circle, Plus, Trash2, Calendar, MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import type { ResumeData, Experience, Education } from '../types/Resume';
import { v4 as uuidv4 } from 'uuid';

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  required: boolean;
}

const Editor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template');
  const { user } = useAuth();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    id: id || uuidv4(),
    title: 'Untitled Resume',
    template: templateParam || 'modern-1',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      website: '',
      linkedin: '',
      github: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'contact',
      title: 'Contact Info',
      subtitle: 'Personal details and contact information',
      icon: User,
      completed: false,
      required: true
    },
    {
      id: 'experience',
      title: 'Experience',
      subtitle: 'Work history and achievements',
      icon: Briefcase,
      completed: false,
      required: false
    },
    {
      id: 'education',
      title: 'Education',
      subtitle: 'Academic background and qualifications',
      icon: GraduationCap,
      completed: false,
      required: false
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Technical and soft skills',
      icon: Award,
      completed: false,
      required: false
    },
    {
      id: 'summary',
      title: 'Summary',
      subtitle: 'Professional summary and objectives',
      icon: FileText,
      completed: false,
      required: false
    },
    {
      id: 'review',
      title: 'Final Review',
      subtitle: 'Review and finalize your resume',
      icon: Eye,
      completed: false,
      required: false
    }
  ]);

  useEffect(() => {
    // Load existing resume if editing
    if (id) {
      const savedResumes = localStorage.getItem('resumes');
      if (savedResumes) {
        const resumes = JSON.parse(savedResumes);
        const existingResume = resumes.find((r: ResumeData) => r.id === id);
        if (existingResume) {
          setResumeData(existingResume);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    // Update step completion status
    const updatedSteps = steps.map(step => {
      switch (step.id) {
        case 'contact':
          return {
            ...step,
            completed: !!(resumeData.personalInfo.fullName && resumeData.personalInfo.email)
          };
        case 'experience':
          return {
            ...step,
            completed: resumeData.experience.length > 0
          };
        case 'education':
          return {
            ...step,
            completed: resumeData.education.length > 0
          };
        case 'skills':
          return {
            ...step,
            completed: resumeData.skills.length > 0
          };
        case 'summary':
          return {
            ...step,
            completed: !!resumeData.personalInfo.summary
          };
        case 'review':
          return {
            ...step,
            completed: false
          };
        default:
          return step;
      }
    });
    setSteps(updatedSteps);
  }, [resumeData]);

  const saveResume = () => {
    const savedResumes = localStorage.getItem('resumes');
    const resumes = savedResumes ? JSON.parse(savedResumes) : [];
    
    const updatedResume = {
      ...resumeData,
      updatedAt: new Date().toISOString()
    };

    const existingIndex = resumes.findIndex((r: ResumeData) => r.id === resumeData.id);
    if (existingIndex >= 0) {
      resumes[existingIndex] = updatedResume;
    } else {
      resumes.push(updatedResume);
    }

    localStorage.setItem('resumes', JSON.stringify(resumes));
    setResumeData(updatedResume);
    showToast('Resume saved successfully!', 'success');
  };

  const canProceedToNext = () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData.required) return true;
    
    switch (currentStepData.id) {
      case 'contact':
        return !!(resumeData.personalInfo.fullName && resumeData.personalInfo.email);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      saveResume();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to any step if current step requirements are met or going backwards
    if (stepIndex <= currentStep || canProceedToNext()) {
      setCurrentStep(stepIndex);
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, '']
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({
      ...resumeData,
      skills: newSkills
    });
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  const renderTemplate = () => {
    const templateId = resumeData.template;
    
    if (templateId.startsWith('modern')) {
      return <ModernTemplate data={resumeData} templateId={templateId} />;
    } else if (templateId.startsWith('classic')) {
      return <ClassicTemplate data={resumeData} templateId={templateId} />;
    } else if (templateId.startsWith('creative')) {
      return <CreativeTemplate data={resumeData} templateId={templateId} />;
    } else if (templateId.startsWith('minimal')) {
      return <MinimalTemplate data={resumeData} templateId={templateId} />;
    }
    
    return <ModernTemplate data={resumeData} templateId={templateId} />;
  };

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];

    switch (currentStepData.id) {
      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, fullName: e.target.value }
                  })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                  })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                  })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                  })}
                  placeholder="City, State/Country"
                  className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                  })}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#212529] mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[#6C757D]">Add your work experience, starting with your most recent job.</p>
              <button
                onClick={addExperience}
                className="flex items-center space-x-2 bg-[#2F3C7E] text-white px-4 py-2 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
              >
                <Plus size={16} />
                <span>Add Experience</span>
              </button>
            </div>

            {resumeData.experience.length === 0 ? (
              <div className="text-center py-12 bg-[#F8F9FA] rounded-xl border-2 border-dashed border-[#E9ECEF]">
                <Briefcase size={48} className="text-[#6C757D] mx-auto mb-4" />
                <p className="text-[#6C757D] mb-4">No work experience added yet</p>
                <button
                  onClick={addExperience}
                  className="bg-[#2F3C7E] text-white px-6 py-3 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
                >
                  Add Your First Job
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E9ECEF]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#212529]">Experience {index + 1}</h3>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Job Title</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          placeholder="e.g. Software Engineer"
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Google"
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Start Date</label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">End Date</label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200 disabled:bg-[#F8F9FA] disabled:text-[#6C757D]"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="w-4 h-4 text-[#2F3C7E] border-2 border-[#E9ECEF] rounded focus:ring-[#2F3C7E]"
                        />
                        <span className="text-sm font-medium text-[#212529]">I currently work here</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#212529] mb-2">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[#6C757D]">Add your educational background and qualifications.</p>
              <button
                onClick={addEducation}
                className="flex items-center space-x-2 bg-[#2F3C7E] text-white px-4 py-2 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
              >
                <Plus size={16} />
                <span>Add Education</span>
              </button>
            </div>

            {resumeData.education.length === 0 ? (
              <div className="text-center py-12 bg-[#F8F9FA] rounded-xl border-2 border-dashed border-[#E9ECEF]">
                <GraduationCap size={48} className="text-[#6C757D] mx-auto mb-4" />
                <p className="text-[#6C757D] mb-4">No education added yet</p>
                <button
                  onClick={addEducation}
                  className="bg-[#2F3C7E] text-white px-6 py-3 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
                >
                  Add Education
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E9ECEF]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#212529]">Education {index + 1}</h3>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="e.g. Bachelor of Science"
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="e.g. Stanford University"
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="e.g. Computer Science"
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">GPA (Optional)</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          placeholder="e.g. 3.8/4.0"
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">Start Date</label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#212529] mb-2">End Date</label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[#6C757D]">Add your technical and soft skills.</p>
              <button
                onClick={addSkill}
                className="flex items-center space-x-2 bg-[#2F3C7E] text-white px-4 py-2 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            </div>

            {resumeData.skills.length === 0 ? (
              <div className="text-center py-12 bg-[#F8F9FA] rounded-xl border-2 border-dashed border-[#E9ECEF]">
                <Award size={48} className="text-[#6C757D] mx-auto mb-4" />
                <p className="text-[#6C757D] mb-4">No skills added yet</p>
                <button
                  onClick={addSkill}
                  className="bg-[#2F3C7E] text-white px-6 py-3 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
                >
                  Add Your First Skill
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder="e.g. JavaScript, Leadership, etc."
                      className="flex-1 px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 transition-colors duration-200 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6">
            <p className="text-[#6C757D]">Write a compelling professional summary that highlights your key qualifications and career objectives.</p>
            
            <div>
              <label className="block text-sm font-semibold text-[#212529] mb-2">
                Professional Summary
              </label>
              <textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                })}
                placeholder="Write a brief summary of your professional background, key skills, and career goals. Keep it concise and impactful (2-3 sentences)."
                rows={6}
                className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-xl focus:border-[#2F3C7E] focus:outline-none transition-colors duration-200 resize-none"
              />
              <div className="mt-2 text-sm text-[#6C757D]">
                {resumeData.personalInfo.summary.length}/500 characters
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E9ECEF]">
              <h3 className="text-lg font-semibold text-[#212529] mb-3">💡 Tips for a Great Summary</h3>
              <ul className="space-y-2 text-[#6C757D]">
                <li>• Start with your professional title and years of experience</li>
                <li>• Highlight your most relevant skills and achievements</li>
                <li>• Mention the value you bring to employers</li>
                <li>• Keep it concise - aim for 2-3 sentences</li>
                <li>• Use action words and quantify achievements when possible</li>
              </ul>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E9ECEF]">
              <h3 className="text-lg font-semibold text-[#212529] mb-4">Resume Completeness</h3>
              <div className="space-y-3">
                {steps.slice(0, -1).map((step, index) => (
                  <div key={step.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {step.completed ? (
                        <CheckCircle size={20} className="text-[#00C9A7]" />
                      ) : (
                        <Circle size={20} className="text-[#6C757D]" />
                      )}
                      <span className={`font-medium ${step.completed ? 'text-[#212529]' : 'text-[#6C757D]'}`}>
                        {step.title}
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentStep(index)}
                      className="text-[#2F3C7E] hover:text-[#00C9A7] font-medium text-sm transition-colors duration-200"
                    >
                      {step.completed ? 'Edit' : 'Complete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E9ECEF]">
              <h3 className="text-lg font-semibold text-[#212529] mb-4">Final Steps</h3>
              <div className="space-y-4">
                <button
                  onClick={saveResume}
                  className="w-full bg-[#2F3C7E] text-white py-3 rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
                >
                  Save Resume
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-white border-2 border-[#2F3C7E] text-[#2F3C7E] py-3 rounded-xl hover:bg-[#2F3C7E] hover:text-white transition-colors duration-200 font-semibold"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Toast />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <ArrowLeft size={20} className="text-[#6C757D]" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#212529]">Resume Builder</h1>
              <p className="text-[#6C757D]">Complete each section to build your professional resume</p>
            </div>
          </div>
          <button
            onClick={saveResume}
            className="flex items-center space-x-2 bg-[#00C9A7] text-white px-6 py-3 rounded-xl hover:bg-[#2F3C7E] transition-colors duration-200 font-semibold shadow-lg"
          >
            <Save size={18} />
            <span>Save</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#212529] mb-6">Resume Builder</h2>
              <p className="text-sm text-[#6C757D] mb-6">Complete each section to build your professional resume</p>
              
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isAccessible = index <= currentStep || canProceedToNext();
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(index)}
                      disabled={!isAccessible}
                      className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left ${
                        isActive
                          ? 'bg-[#2F3C7E] text-white shadow-lg'
                          : step.completed
                          ? 'bg-[#00C9A7]/10 text-[#00C9A7] hover:bg-[#00C9A7]/20'
                          : isAccessible
                          ? 'bg-[#F8F9FA] text-[#6C757D] hover:bg-[#E9ECEF]'
                          : 'bg-[#F8F9FA] text-[#ADB5BD] cursor-not-allowed'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Icon size={20} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{step.title}</div>
                        <div className={`text-xs truncate ${
                          isActive ? 'text-white/80' : step.completed ? 'text-[#00C9A7]/80' : 'text-[#6C757D]'
                        }`}>
                          {step.subtitle}
                        </div>
                      </div>
                      {step.required && !step.completed && (
                        <div className="w-2 h-2 bg-[#FF6B6B] rounded-full flex-shrink-0"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#212529] mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-[#6C757D]">{steps[currentStep].subtitle}</p>
              </div>

              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[#E9ECEF]">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-6 py-3 border-2 border-[#E9ECEF] text-[#6C757D] rounded-xl hover:border-[#2F3C7E] hover:text-[#2F3C7E] transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1 || !canProceedToNext()}
                  className="px-6 py-3 bg-[#2F3C7E] text-white rounded-xl hover:bg-[#00C9A7] transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#212529]">Live Preview</h3>
                <div className="text-sm text-[#6C757D]">See how your resume looks as you build it</div>
              </div>
              
              <div className="border border-[#E9ECEF] rounded-xl overflow-hidden">
                <div className="transform scale-50 origin-top-left w-[200%] h-[600px] overflow-hidden">
                  {renderTemplate()}
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => window.open(`/preview/${resumeData.id}`, '_blank')}
                  className="text-[#2F3C7E] hover:text-[#00C9A7] font-medium text-sm transition-colors duration-200"
                >
                  View Full Preview →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;