import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import type { ResumeData } from '../../types/Resume';

interface MinimalTemplateProps {
  data: ResumeData;
  templateId?: string;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, templateId }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Minimal color schemes
  const getColorScheme = () => {
    if (!templateId) return { accent: 'gray-600' };
    
    if (templateId.includes('zen')) return { accent: 'green-600' };
    if (templateId.includes('elegant')) return { accent: 'blue-600' };
    if (templateId.includes('clean')) return { accent: 'indigo-600' };
    if (templateId.includes('monochrome')) return { accent: 'gray-800' };
    if (templateId.includes('subtle')) return { accent: 'slate-600' };
    if (templateId.includes('quiet')) return { accent: 'neutral-600' };
    if (templateId.includes('essential')) return { accent: 'zinc-600' };
    
    return { accent: 'gray-600' };
  };

  const colors = getColorScheme();

  return (
    <div className="bg-white max-w-4xl mx-auto p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex justify-center items-center space-x-8 text-gray-600 mb-6">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={18} className="mr-2" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center space-x-6 text-gray-600">
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

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-12 text-center">
          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
            EXPERIENCE
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.position}</h3>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
            EDUCATION
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500">{edu.field}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
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
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">
            SKILLS
          </h2>
          <div className="text-center">
            <div className="inline-flex flex-wrap justify-center gap-4">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;