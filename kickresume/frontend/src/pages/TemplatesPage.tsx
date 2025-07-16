import React from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '../data/template';
import {
  Sparkles,
  Star,
  Zap,
  FileText,
  Palette,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import TemplateCard from '../components/TemplateCard';

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E9ECEF] text-[#212529] overflow-hidden">
      
      {/* 🔙 Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#2F3C7E] hover:text-[#00C9A7] transition font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <span className="text-lg font-semibold text-[#2F3C7E]">Resume Templates</span>
        <div className="w-5 h-5" /> {/* Spacer to center the title */}
      </nav>

      {/* 🔷 Animated Background Icons */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Sparkles className="absolute text-[#00C9A7] opacity-10 w-16 h-16 top-20 left-10 animate-float" />
        <Star className="absolute text-[#FF6B6B] opacity-10 w-20 h-20 bottom-24 right-12 animate-float" />
        <FileText className="absolute text-[#2F3C7E] opacity-10 w-14 h-14 top-[35%] right-20 animate-float delay-1000" />
        <Palette className="absolute text-[#00C9A7] opacity-10 w-12 h-12 bottom-10 left-[30%] animate-float delay-2000" />
        <ShieldCheck className="absolute text-[#2F3C7E] opacity-10 w-16 h-16 top-[60%] left-16 animate-float delay-3000" />
      </div>

      {/* 🧊 Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto text-center py-24 px-6 space-y-6">
        <div className="flex justify-center items-center gap-3">
          <Sparkles className="w-7 h-7 text-[#00C9A7]" />
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-transparent bg-clip-text">
            Choose Your Resume Template
          </h1>
          <Star className="w-7 h-7 text-[#FF6B6B]" />
        </div>
        <p className="text-[#6C757D] max-w-2xl mx-auto text-lg">
          Professionally crafted, visually stunning resume templates that help you stand out and get hired faster.
        </p>
        <div className="flex justify-center items-center gap-2 text-sm text-[#6C757D]">
          <Zap className="w-4 h-4 text-[#00C9A7]" />
          <span>{templates.length} Premium Templates Available</span>
        </div>
      </section>

      {/* 🧱 Templates Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {templates.map((template) => (
            <div
              key={template.id}
              className="transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300 ease-in-out"
            >
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA Footer Section */}
      <section className="relative z-10 py-20 px-6 bg-white border-t border-[#E9ECEF] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2F3C7E]">Build Smarter, Not Harder</h2>
          <p className="text-[#6C757D] text-lg">
            Pick your favorite template, customize it in minutes, and land your dream job with confidence.
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] hover:from-[#1f2a59] hover:to-[#049c85] text-white text-sm px-6 py-3 rounded-lg shadow-md transition">
            <Zap className="w-4 h-4" />
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default TemplatesPage;
