import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Palette, Download, Trash2, TrendingUp, Award, ChevronLeft, ChevronRight, Lightbulb, Target, Zap, CheckCircle, Star, Clock, ArrowUpRight, Sparkles, Rocket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

interface Resume {
  id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  color: string;
  rating: number;
  downloads: string;
}

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean design perfect for corporate roles and business professionals',
      image: 'https://theartofresume.com/cdn/shop/files/1_resume_template_design_8_62828444-e448-486b-9381-407ac69a929d.png?v=1707449553&width=713',
      category: 'Professional',
      color: '#2F3C7E',
      rating: 4.9,
      downloads: '15K+'
    },
    {
      id: 'creative',
      name: 'Creative Edge',
      description: 'Bold design for creative professionals and designers',
      image: 'https://cdn-blog.novoresume.com/articles/creative-resume-templates/creative-resume-example-1.webp',
      category: 'Creative',
      color: '#00C9A7',
      rating: 4.8,
      downloads: '12K+'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple elegance that highlights your content beautifully',
      image: 'https://i.etsystatic.com/20769234/r/il/faf394/2004290491/il_fullxfull.2004290491_530n.jpg',
      category: 'Minimal',
      color: '#FF6B6B',
      rating: 4.9,
      downloads: '18K+'
    },
    {
      id: 'tech',
      name: 'Tech Specialist',
      description: 'Perfect for developers and IT professionals',
      image: 'https://marketplace.canva.com/EAFRuCp3DcY/3/0/1131w/canva-black-white-minimalist-cv-resume-fbJ3nW9XufE.jpg',
      category: 'Technical',
      color: '#2F3C7E',
      rating: 4.7,
      downloads: '9K+'
    }
  ];

  const resumeTips = [
    {
      icon: Target,
      title: 'Use Quantified Achievements',
      description: 'Include numbers and percentages to show impact (e.g., "Increased sales by 25%")',
      color: '#2F3C7E'
    },
    {
      icon: Zap,
      title: 'Tailor Resume to Job',
      description: 'Customize your resume for each application using relevant keywords',
      color: '#00C9A7'
    },
    {
      icon: TrendingUp,
      title: 'Start with Action Verbs',
      description: 'Use powerful verbs like "Led", "Built", "Improved", "Achieved"',
      color: '#FF6B6B'
    },
    {
      icon: FileText,
      title: 'Keep it One Page',
      description: 'Unless you have 10+ years experience, stick to one page',
      color: '#2F3C7E'
    },
    {
      icon: CheckCircle,
      title: 'Use Clean Formatting',
      description: 'Consistent fonts, spacing, and bullet points for readability',
      color: '#00C9A7'
    },
    {
      icon: Award,
      title: 'Highlight Key Skills',
      description: 'Place your most relevant skills prominently at the top',
      color: '#FF6B6B'
    }
  ];

  useEffect(() => {
    const savedResumes = localStorage.getItem('resumes');
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
    
    // Trigger animations
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const createNewResume = () => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: 'Untitled Resume',
      template: 'modern',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedResumes = [...resumes, newResume];
    setResumes(updatedResumes);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    navigate(`/editor/${newResume.id}`);
    showToast('New resume created successfully!', 'success');
  };

  const deleteResume = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const updatedResumes = resumes.filter(resume => resume.id !== id);
      setResumes(updatedResumes);
      localStorage.setItem('resumes', JSON.stringify(updatedResumes));
      showToast('Resume deleted successfully!', 'success');
    }
  };

  const useTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    const newResume: Resume = {
      id: Date.now().toString(),
      title: `New ${template?.name} Resume`,
      template: templateId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedResumes = [...resumes, newResume];
    setResumes(updatedResumes);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    navigate(`/editor/${newResume.id}`);
    showToast('Template applied successfully!', 'success');
  };

  const nextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  const recentResumes = resumes.slice(-3).reverse();
  const stats = {
    resumesCreated: resumes.length,
    templatesUsed: new Set(resumes.map(r => r.template)).size,
    pdfDownloads: Math.floor(resumes.length * 1.5) // Mock data
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Toast />
      <Navbar />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F3C7E]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FF6B6B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Header with Left-Right Layout */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            {/* Left Side - Hello Message */}
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2F3C7E]/10 to-[#00C9A7]/10 px-6 py-3 rounded-full mb-6 border border-[#2F3C7E]/20">
                <Sparkles size={20} className="text-[#2F3C7E]" />
                <span className="text-[#2F3C7E] font-semibold">Welcome to your workspace</span>
              </div>
              <h1 className="text-5xl font-black text-[#212529] mb-4 tracking-tight">
                Hello, <span className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] bg-clip-text text-transparent">{user?.name}</span>! 👋
              </h1>
              <p className="text-lg text-[#6C757D] max-w-xl leading-relaxed">
                Ready to craft your next career-defining resume? Let's build something amazing together.
              </p>
            </div>

            {/* Right Side - Launch Career CTA */}
            <div className="flex-1 flex justify-end">
              <div className="relative max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-3xl transform rotate-1"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-white transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-2xl">
                        <Rocket size={24} className="text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#212529]">Launch Career</h2>
                    </div>
                    <p className="text-[#6C757D] mb-6 leading-relaxed">
                      Create a professional resume that stands out and lands interviews.
                    </p>
                    <button
                      onClick={createNewResume}
                      className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                      <span>Create Resume</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Neumorphism */}
        <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative">
            <div className="bg-[#FAFBFC] p-8 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] hover:shadow-[25px_25px_70px_#d1d9e6,-25px_-25px_70px_#ffffff] transition-all duration-500 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#2F3C7E]/10 to-[#2F3C7E]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]">
                  <FileText size={32} className="text-[#2F3C7E]" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#2F3C7E] mb-1">{stats.resumesCreated}</div>
                  <div className="text-[#6C757D] text-sm font-semibold uppercase tracking-wider">Created</div>
                </div>
              </div>
              <div className="border-t border-[#E9ECEF] pt-4">
                <p className="text-[#212529] font-bold mb-2">Resumes Built</p>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-green-600 text-sm font-semibold">Active & Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-[#FAFBFC] p-8 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] hover:shadow-[25px_25px_70px_#d1d9e6,-25px_-25px_70px_#ffffff] transition-all duration-500 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#00C9A7]/10 to-[#00C9A7]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]">
                  <Palette size={32} className="text-[#00C9A7]" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#00C9A7] mb-1">{stats.templatesUsed}</div>
                  <div className="text-[#6C757D] text-sm font-semibold uppercase tracking-wider">Styles</div>
                </div>
              </div>
              <div className="border-t border-[#E9ECEF] pt-4">
                <p className="text-[#212529] font-bold mb-2">Templates Used</p>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-2 fill-current" />
                  <span className="text-yellow-600 text-sm font-semibold">Exploring Variety</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-[#FAFBFC] p-8 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] hover:shadow-[25px_25px_70px_#d1d9e6,-25px_-25px_70px_#ffffff] transition-all duration-500 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]">
                  <Download size={32} className="text-[#FF6B6B]" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#FF6B6B] mb-1">{stats.pdfDownloads}</div>
                  <div className="text-[#6C757D] text-sm font-semibold uppercase tracking-wider">Downloads</div>
                </div>
              </div>
              <div className="border-t border-[#E9ECEF] pt-4">
                <p className="text-[#212529] font-bold mb-2">PDF Exports</p>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-green-600 text-sm font-semibold">Job Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Recent Resumes with Card Stack Effect */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] p-10 border border-white/50">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-[#212529] mb-2">Recent Work</h2>
                    <p className="text-[#6C757D] font-medium">Your latest resume projects</p>
                  </div>
                  <Link
                    to="/templates"
                    className="group flex items-center space-x-2 text-[#2F3C7E] hover:text-[#00C9A7] font-bold transition-all duration-300 bg-[#2F3C7E]/5 hover:bg-[#00C9A7]/10 px-6 py-3 rounded-2xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff]"
                  >
                    <span>View All</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Link>
                </div>

                {recentResumes.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-[#FAFBFC] rounded-full shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] flex items-center justify-center mx-auto">
                        <FileText size={48} className="text-[#2F3C7E]" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#212529] mb-3">No resumes yet</h3>
                    <p className="text-[#6C757D] mb-8 text-lg">Create your first professional resume to get started</p>
                    <button
                      onClick={createNewResume}
                      className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 font-bold text-lg transform hover:scale-105"
                    >
                      Create Your First Resume
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentResumes.map((resume, index) => (
                      <div key={resume.id} className={`group relative transition-all duration-500 delay-${index * 100}`}>
                        <div className="bg-white rounded-2xl p-6 shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] hover:shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] transition-all duration-500 transform hover:-translate-y-2 border border-white/50">
                          <div className="h-40 bg-[#FAFBFC] rounded-xl mb-6 p-4 relative overflow-hidden shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]">
                            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                            <div className="space-y-3">
                              <div className="h-4 bg-gradient-to-r from-[#2F3C7E] to-[#2F3C7E]/80 rounded w-3/4 shadow-sm"></div>
                              <div className="h-2 bg-[#E9ECEF] rounded w-1/2 shadow-sm"></div>
                              <div className="space-y-2 mt-4">
                                <div className="h-2 bg-[#E9ECEF] rounded w-full shadow-sm"></div>
                                <div className="h-2 bg-[#E9ECEF] rounded w-4/5 shadow-sm"></div>
                                <div className="h-2 bg-[#E9ECEF] rounded w-3/5 shadow-sm"></div>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-[#212529] mb-3 truncate text-lg">{resume.title}</h3>
                          <div className="flex items-center text-sm text-[#6C757D] mb-4">
                            <Clock size={14} className="mr-2" />
                            <span>{getTimeAgo(resume.updatedAt)}</span>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Link
                              to={`/editor/${resume.id}`}
                              className="flex-1 bg-gradient-to-r from-[#2F3C7E] to-[#2F3C7E]/90 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 text-center font-bold transform hover:scale-105"
                            >
                              Edit
                            </Link>
                            <Link
                              to={`/preview/${resume.id}`}
                              className="flex-1 bg-[#FAFBFC] text-[#2F3C7E] py-3 px-4 rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] transition-all duration-300 text-center font-bold transform hover:scale-105"
                            >
                              Preview
                            </Link>
                            <button
                              onClick={() => deleteResume(resume.id)}
                              className="flex-1 bg-[#FF6B6B] text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 text-center font-bold transform hover:scale-105 flex items-center justify-center"
                              title="Delete Resume"
                            >
                              <Trash2 size={18} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Template Carousel with Floating Cards */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] p-10 border border-white/50">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-[#212529] mb-2">Featured Templates</h2>
                    <p className="text-[#6C757D] font-medium">Professional designs for every industry</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={prevTemplate}
                      className="p-3 bg-[#FAFBFC] rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronLeft size={20} className="text-[#6C757D]" />
                    </button>
                    <button
                      onClick={nextTemplate}
                      className="p-3 bg-[#FAFBFC] rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronRight size={20} className="text-[#6C757D]" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentTemplateIndex * 100}%)` }}
                  >
                    {templates.map((template) => (
                      <div key={template.id} className="w-full flex-shrink-0 px-3">
                        <div className="bg-[#FAFBFC] rounded-2xl p-8 shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] hover:shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] transition-all duration-500 border border-white/50 group">
                          <div className="flex items-center space-x-6">
                            <div className="w-32 h-40 bg-white rounded-xl shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] p-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                              <div className="w-full h-full bg-[#FAFBFC] rounded-lg flex items-center justify-center relative overflow-hidden shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]">
                                <div 
                                  className="w-20 h-28 rounded shadow-lg p-3 bg-white border-2"
                                  style={{ borderColor: `${template.color}20` }}
                                >
                                  <div className="space-y-1.5">
                                    <div 
                                      className="h-2.5 rounded w-3/4 shadow-sm"
                                      style={{ backgroundColor: template.color }}
                                    ></div>
                                    <div className="h-1.5 bg-gray-200 rounded w-1/2 shadow-sm"></div>
                                    <div className="space-y-1 mt-3">
                                      <div className="h-1 bg-gray-200 rounded w-full shadow-sm"></div>
                                      <div className="h-1 bg-gray-200 rounded w-4/5 shadow-sm"></div>
                                      <div className="h-1 bg-gray-200 rounded w-3/5 shadow-sm"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-2xl font-black text-[#212529]">{template.name}</h3>
                                <div className="flex items-center space-x-1">
                                  <Star size={16} className="text-yellow-400 fill-current" />
                                  <span className="text-sm font-bold text-[#6C757D]">{template.rating}</span>
                                </div>
                              </div>
                              <p className="text-[#6C757D] mb-4 leading-relaxed font-medium">{template.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span 
                                    className="text-xs font-bold px-3 py-2 rounded-full shadow-sm"
                                    style={{ 
                                      backgroundColor: `${template.color}15`,
                                      color: template.color 
                                    }}
                                  >
                                    {template.category}
                                  </span>
                                  <span className="text-xs text-[#6C757D] font-semibold">{template.downloads} downloads</span>
                                </div>
                                <button
                                  onClick={() => useTemplate(template.id)}
                                  className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-bold transform hover:scale-105"
                                >
                                  Use Template
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-8 space-x-3">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTemplateIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${
                        index === currentTemplateIndex 
                          ? 'bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] scale-125 shadow-lg' 
                          : 'bg-[#E9ECEF] hover:bg-[#2F3C7E]/30 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tips with Floating Effect */}
          <div className="lg:col-span-1">
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] p-8 sticky top-24 border border-white/50">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-[#00C9A7]/10 to-[#00C9A7]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]">
                    <Lightbulb size={24} className="text-[#00C9A7]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#212529]">Pro Tips</h2>
                    <p className="text-[#6C757D] text-sm font-semibold">Expert advice</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {resumeTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="group relative">
                        <div className="p-5 bg-[#FAFBFC] rounded-xl shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] hover:shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] transition-all duration-300 border border-white/50">
                          <div className="flex items-start space-x-4">
                            <div 
                              className="p-3 rounded-xl shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: `${tip.color}15` }}
                            >
                              <Icon size={18} style={{ color: tip.color }} />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#212529] mb-2">{tip.title}</h3>
                              <p className="text-[#6C757D] text-sm leading-relaxed">{tip.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-[#FAFBFC] rounded-2xl shadow-[inset_15px_15px_30px_#d1d9e6,inset_-15px_-15px_30px_#ffffff] border border-white/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-lg shadow-lg">
                      <Star size={16} className="text-white" />
                    </div>
                    <h3 className="font-black text-[#212529]">💡 Pro Tip</h3>
                  </div>
                  <p className="text-[#6C757D] leading-relaxed font-medium">
                    Customize your resume for each job application. Use keywords from the job description to increase your chances of passing ATS systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;