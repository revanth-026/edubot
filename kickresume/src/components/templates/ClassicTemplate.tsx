import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from 'lucide-react';
import type { ResumeData } from '../../types/Resume';

interface ClassicTemplateProps {
  data: ResumeData;
  templateId?: string;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, templateId }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Color schemes for classic templates
  const getColorScheme = () => {
    if (!templateId) return { border: 'gray-800', accent: 'gray-600' };
    
    if (templateId.includes('executive')) return { border: 'slate-800', accent: 'slate-600' };
    if (templateId.includes('corporate')) return { border: 'zinc-800', accent: 'zinc-600' };
    if (templateId.includes('business')) return { border: 'neutral-800', accent: 'neutral-600' };
    if (templateId.includes('professional')) return { border: 'stone-800', accent: 'stone-600' };
    if (templateId.includes('vintage')) return { border: 'amber-800', accent: 'amber-600' };
    if (templateId.includes('heritage')) return { border: 'brown-800', accent: 'brown-600' };
    if (templateId.includes('formal')) return { border: 'indigo-800', accent: 'indigo-600' };
    
    return { border: 'gray-800', accent: 'gray-600' };
  };

  const colors = getColorScheme();

  return (
    <div className="bg-white shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className={`border-b-4 border-${colors.border} p-8`}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        
        <div className="flex flex-wrap gap-6 text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <Globe size={16} className="mr-2" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin size={16} className="mr-2" />
              <span>LinkedIn</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-semibold">{exp.company}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed ml-4">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 font-semibold">{edu.institution}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{edu.field}</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {data.skills.map((skill) => (
                <div key={skill} className="text-gray-700">
                  • {skill}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;