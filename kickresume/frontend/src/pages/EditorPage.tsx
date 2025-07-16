// src/pages/EditorPage.tsx
import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Edit3, Save } from 'lucide-react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const EditorPage: React.FC = () => {
  const { selectedTemplate } = useResume();
  const navigate = useNavigate();

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e2f7f1] relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2F3C7E] opacity-20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#00C9A7] opacity-30 rounded-full blur-2xl animate-float-reverse" />
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-[#E9ECEF] z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Edit3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#2F3C7E] mb-4">No Template Selected</h1>
          <p className="text-[#6C757D] mb-8 max-w-md mx-auto">Please select a template to start editing your resume.</p>
          <button
            onClick={() => navigate('/templates')}
            className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg"
          >
            Choose Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#eafcf8] relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 animate-spin-slow" />
            <h1 className="text-xl font-semibold tracking-wide">KickResume</h1>
          </div>

          <button
            onClick={() => navigate('/finalpreview')}
            className="flex items-center gap-2 bg-white text-[#2F3C7E] px-4 py-2 rounded-full hover:bg-[#F8F9FA] transition font-semibold shadow"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex h-[calc(100vh-65px)] overflow-hidden relative">
        <div className="absolute left-10 top-10 w-24 h-24 bg-[#2F3C7E] opacity-10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute right-10 bottom-10 w-28 h-28 bg-[#00C9A7] opacity-10 rounded-full blur-2xl animate-float-reverse"></div>

        {/* Form Section */}
        <div className="w-1/2 overflow-y-auto custom-scroll px-6 py-8 pb-12 bg-white">
          <div className="bg-white border border-[#E9ECEF] rounded-xl shadow-md p-5 mb-8">
            <h2 className="text-lg font-semibold text-[#2F3C7E] mb-6">📝 Resume Details</h2>
            <ResumeForm />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 overflow-y-auto custom-scroll px-6 py-8 pb-12 bg-[#f1f5f9]">
          <div className="bg-white border border-[#dbeafe] rounded-xl shadow-xl p-5 mb-8 overflow-hidden">
            <h2 className="text-lg font-semibold text-[#2F3C7E] mb-6">📄 Live Preview</h2>
            <div
              id="resume-preview"
              className="hide-scrollbar"
              style={{
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  transform: 'scale(0.9)',
                  transformOrigin: 'top left',
                  width: '111%',
                }}
              >
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #2F3C7E transparent;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 2px;
          height: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #2F3C7E;
          border-radius: 8px;
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 5s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EditorPage;
