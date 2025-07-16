import React from 'react';
import type { Template } from '../types/resume';
import { useResume } from '../contexts/ResumeContext';
import { useNavigate } from 'react-router-dom';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { setSelectedTemplate } = useResume();
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    setSelectedTemplate(template);
    navigate('/editor');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:scale-105 border border-[#E9ECEF]">
      <div className="relative overflow-hidden h-98 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center p-2">
        <img 
          src={template.previewImg} 
          alt={template.name}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110 shadow-md rounded-lg"
          style={{ 
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            maxWidth: '90%',
            maxHeight: '90%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 bg-white">
        <h3 className="text-lg font-bold text-[#2F3C7E] mb-2 group-hover:text-[#00C9A7] transition-colors">{template.name}</h3>
        <p className="text-sm text-[#6C757D] mb-4 leading-relaxed">Professional resume template perfect for any industry</p>
        
        <button
          onClick={handleUseTemplate}
          className="w-full bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white py-3 px-4 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Use This Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;