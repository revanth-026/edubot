import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from 'lucide-react';
import type { ResumeData } from '../../types/Resume';

interface CreativeTemplateProps {
  data: ResumeData;
  templateId?: string;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, templateId }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Creative color schemes
  const getColorScheme = () => {
    if (!templateId) return { 
      gradient: 'from-purple-600 via-pink-600 to-red-500',
      primary: 'purple-600',
      secondary: 'pink-600',
      accent: 'red-500'
    };
    
    if (templateId.includes('rainbow')) return { 
      gradient: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
      primary: 'purple-600',
      secondary: 'pink-600',
      accent: 'blue-500'
    };
    if (templateId.includes('neon')) return { 
      gradient: 'from-cyan-400 via-purple-500 to-pink-500',
      primary: 'cyan-600',
      secondary: 'purple-600',
      accent: 'pink-500'
    };
    if (templateId.includes('artistic')) return { 
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      primary: 'purple-600',
      secondary: 'pink-600',
      accent: 'red-500'
    };
    if (templateId.includes('designer')) return { 
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      primary: 'orange-600',
      secondary: 'yellow-600',
      accent: 'red-500'
    };
    if (templateId.includes('geometric')) return { 
      gradient: 'from-teal-400 via-blue-500 to-purple-600',
      primary: 'teal-600',
      secondary: 'blue-600',
      accent: 'purple-500'
    };
    
    return { 
      gradient: 'from-purple-600 via-pink-600 to-red-500',
      primary: 'purple-600',
      secondary: 'pink-600',
      accent: 'red-500'
    };
  };

  const colors = getColorScheme();

  return (
    <div className="bg-white shadow-lg max-w-4xl mx-auto overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} text-white p-8 relative`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-pink-100 text-lg mb-4">{data.personalInfo.summary || 'Professional summary will appear here'}</p>
          
          <div className="flex flex-wrap gap-4">
            {data.personalInfo.email && (
              <div className="flex items-center text-pink-100">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center text-pink-100">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center text-pink-100">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center text-pink-100">
                <Globe size={16} className="mr-2" />
                <span className="text-sm">{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center text-pink-100">
                <Linkedin size={16} className="mr-2" />
                <span className="text-sm">LinkedIn</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              <span className={`bg-gradient-to-r from-${colors.primary} to-${colors.secondary} bg-clip-text text-transparent`}>
                Experience
              </span>
              <div className={`absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-${colors.primary} to-${colors.secondary} rounded`}></div>
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className={`bg-gradient-to-r from-${colors.primary}-50 to-${colors.secondary}-50 rounded-lg p-6 shadow-sm`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <p className={`text-${colors.primary} font-semibold`}>{exp.company}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
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
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
                <span className={`bg-gradient-to-r from-${colors.primary} to-${colors.secondary} bg-clip-text text-transparent`}>
                  Education
                </span>
                <div className={`absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-${colors.primary} to-${colors.secondary} rounded`}></div>
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className={`bg-gray-50 rounded-lg p-4 border-l-4 border-${colors.primary}`}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className={`text-${colors.primary} font-medium`}>{edu.institution}</p>
                    <div className="text-gray-600 text-sm mt-1">{edu.field}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
                <span className={`bg-gradient-to-r from-${colors.primary} to-${colors.secondary} bg-clip-text text-transparent`}>
                  Skills
                </span>
                <div className={`absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-${colors.primary} to-${colors.secondary} rounded`}></div>
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index % 3 === 0 
                        ? `bg-${colors.primary}-100 text-${colors.primary}-800`
                        : index % 3 === 1
                        ? `bg-${colors.secondary}-100 text-${colors.secondary}-800`
                        : `bg-${colors.accent}-100 text-${colors.accent}-800`
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;