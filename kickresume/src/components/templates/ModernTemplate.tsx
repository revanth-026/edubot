import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from 'lucide-react';
import type { ResumeData } from '../../types/Resume';
import { getTemplateById } from '../../data/templates';

interface ModernTemplateProps {
  data: ResumeData;
  templateId?: string;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, templateId }) => {
  const templateInfo = templateId ? getTemplateById(templateId) : null;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Color schemes based on template ID
  const getColorScheme = () => {
    if (!templateId) return { primary: 'blue-600', secondary: 'blue-100', accent: 'blue-500' };
    
    if (templateId.includes('emerald')) return { primary: 'emerald-600', secondary: 'emerald-100', accent: 'emerald-500' };
    if (templateId.includes('crimson') || templateId.includes('red')) return { primary: 'red-600', secondary: 'red-100', accent: 'red-500' };
    if (templateId.includes('violet') || templateId.includes('purple')) return { primary: 'violet-600', secondary: 'violet-100', accent: 'violet-500' };
    if (templateId.includes('orange')) return { primary: 'orange-600', secondary: 'orange-100', accent: 'orange-500' };
    if (templateId.includes('teal')) return { primary: 'teal-600', secondary: 'teal-100', accent: 'teal-500' };
    if (templateId.includes('rose')) return { primary: 'rose-600', secondary: 'rose-100', accent: 'rose-500' };
    if (templateId.includes('indigo')) return { primary: 'indigo-600', secondary: 'indigo-100', accent: 'indigo-500' };
    if (templateId.includes('green')) return { primary: 'green-600', secondary: 'green-100', accent: 'green-500' };
    if (templateId.includes('yellow') || templateId.includes('amber')) return { primary: 'amber-600', secondary: 'amber-100', accent: 'amber-500' };
    if (templateId.includes('cyan')) return { primary: 'cyan-600', secondary: 'cyan-100', accent: 'cyan-500' };
    if (templateId.includes('gray') || templateId.includes('steel')) return { primary: 'gray-600', secondary: 'gray-100', accent: 'gray-500' };
    
    return { primary: 'blue-600', secondary: 'blue-100', accent: 'blue-500' };
  };

  const colors = getColorScheme();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r from-${colors.primary} to-${colors.accent} text-white p-8`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
            <p className={`text-${colors.secondary} text-lg`}>{data.personalInfo.summary || 'Professional summary will appear here'}</p>
          </div>
        </div>
        
        <div className={`flex flex-wrap gap-4 mt-4 pt-4 border-t border-${colors.accent}`}>
          {data.personalInfo.email && (
            <div className={`flex items-center text-${colors.secondary}`}>
              <Mail size={16} className="mr-2" />
              <span className="text-sm">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className={`flex items-center text-${colors.secondary}`}>
              <Phone size={16} className="mr-2" />
              <span className="text-sm">{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className={`flex items-center text-${colors.secondary}`}>
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className={`flex items-center text-${colors.secondary}`}>
              <Globe size={16} className="mr-2" />
              <span className="text-sm">{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className={`flex items-center text-${colors.secondary}`}>
              <Linkedin size={16} className="mr-2" />
              <span className="text-sm">LinkedIn</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 border-b-2 border-${colors.primary} pb-2`}>
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className={`relative pl-6 border-l-2 border-${colors.secondary}`}>
                  <div className={`absolute w-3 h-3 bg-${colors.primary} rounded-full -left-2 top-2`}></div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className={`text-${colors.primary} font-medium`}>{exp.company}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 border-b-2 border-${colors.primary} pb-2`}>
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className={`bg-${colors.secondary} rounded-lg p-4`}>
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className={`text-${colors.primary} font-medium`}>{edu.institution}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600">{edu.field}</span>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 border-b-2 border-${colors.primary} pb-2`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 bg-${colors.secondary} text-${colors.primary} rounded-full text-sm font-medium`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;