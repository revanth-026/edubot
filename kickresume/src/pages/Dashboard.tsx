import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Palette, Download, Edit, Eye, Trash2, Calendar, TrendingUp, Users, Award, ChevronLeft, ChevronRight, Lightbulb, Target, Zap, CheckCircle } from 'lucide-react';
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
}

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean design perfect for corporate roles',
      image: 'https://theartofresume.com/cdn/shop/files/1_resume_template_design_8_62828444-e448-486b-9381-407ac69a929d.png?v=1707449553&width=713',
      category: 'Professional',
      color: '#2F3C7E'
    },
    {
      id: 'creative',
      name: 'Creative Edge',
      description: 'Bold design for creative professionals',
      image: 'https://cdn-blog.novoresume.com/articles/creative-resume-templates/creative-resume-example-1.webp',
      category: 'Creative',
      color: '#00C9A7'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple elegance that highlights content',
      image: 'https://i.etsystatic.com/20769234/r/il/faf394/2004290491/il_fullxfull.2004290491_530n.jpg',
      category: 'Minimal',
      color: '#FF6B6B'
    },
    {
      id: 'tech',
      name: 'Tech Specialist',
      description: 'Perfect for developers and IT professionals',
      image: 'https://marketplace.canva.com/EAFRuCp3DcY/3/0/1131w/canva-black-white-minimalist-cv-resume-fbJ3nW9XufE.jpg',
      category: 'Technical',
      color: '#2F3C7E'
    }
  ];

  const resumeTips = [
    {
      icon: Target,
      title: 'Use Quantified Achievements',
      description: 'Include numbers and percentages to show impact (e.g., "Increased sales by 25%")'
    },
    {
      icon: Zap,
      title: 'Tailor Resume to Job',
      description: 'Customize your resume for each application using relevant keywords'
    },
    {
      icon: TrendingUp,
      title: 'Start with Action Verbs',
      description: 'Use powerful verbs like "Led", "Built", "Improved", "Achieved"'
    },
    {
      icon: FileText,
      title: 'Keep it One Page',
      description: 'Unless you have 10+ years experience, stick to one page'
    },
    {
      icon: CheckCircle,
      title: 'Use Clean Formatting',
      description: 'Consistent fonts, spacing, and bullet points for readability'
    },
    {
      icon: Award,
      title: 'Highlight Key Skills',
      description: 'Place your most relevant skills prominently at the top'
    }
  ];

  useEffect(() => {
    const savedResumes = localStorage.getItem('resumes');
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
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
    const newResume: Resume = {
      id: Date.now().toString(),
      title: `New ${templates.find(t => t.id === templateId)?.name} Resume`,
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

  const recentResumes = resumes.slice(-3).reverse();
  const stats = {
    resumesCreated: resumes.length,
    templatesUsed: new Set(resumes.map(r => r.template)).size,
    pdfDownloads: Math.floor(resumes.length * 1.5) // Mock data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-white">
      <Toast />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#212529] mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-[#6C757D] text-xl">
            Ready to create your next professional resume?
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="mb-12">
          <button
            onClick={createNewResume}
            className="w-full sm:w-auto bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 group transform hover:scale-105"
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Create Your Resume</span>
          </button>
        </div>

        {/* Stats Panel */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#2F3C7E]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6C757D] text-sm font-medium">Resumes Created</p>
                <p className="text-3xl font-bold text-[#2F3C7E]">{stats.resumesCreated}</p>
              </div>
              <div className="p-3 bg-[#2F3C7E]/10 rounded-full">
                <FileText size={24} className="text-[#2F3C7E]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#00C9A7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6C757D] text-sm font-medium">Templates Tried</p>
                <p className="text-3xl font-bold text-[#00C9A7]">{stats.templatesUsed}</p>
              </div>
              <div className="p-3 bg-[#00C9A7]/10 rounded-full">
                <Palette size={24} className="text-[#00C9A7]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#FF6B6B]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#6C757D] text-sm font-medium">PDF Downloads</p>
                <p className="text-3xl font-bold text-[#FF6B6B]">{stats.pdfDownloads}</p>
              </div>
              <div className="p-3 bg-[#FF6B6B]/10 rounded-full">
                <Download size={24} className="text-[#FF6B6B]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Resumes */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#212529]">Recent Resumes</h2>
                <Link
                  to="/templates"
                  className="text-[#2F3C7E] hover:text-[#00C9A7] font-medium transition-colors duration-200"
                >
                  View All →
                </Link>
              </div>

              {recentResumes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#E9ECEF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-[#6C757D]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#212529] mb-2">No resumes yet</h3>
                  <p className="text-[#6C757D] mb-4">Create your first professional resume to get started</p>
                  <button
                    onClick={createNewResume}
                    className="bg-[#2F3C7E] text-white px-6 py-3 rounded-lg hover:bg-[#00C9A7] transition-all duration-200 font-semibold"
                  >
                    Create Your First Resume
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentResumes.map((resume) => (
                    <div key={resume.id} className="bg-[#F8F9FA] rounded-xl p-4 hover:shadow-md transition-all duration-200 group">
                      <div className="h-32 bg-white rounded-lg mb-4 p-3 shadow-sm">
                        <div className="space-y-2">
                          <div className="h-3 bg-[#2F3C7E] rounded w-3/4"></div>
                          <div className="h-2 bg-[#E9ECEF] rounded w-1/2"></div>
                          <div className="space-y-1 mt-3">
                            <div className="h-2 bg-[#E9ECEF] rounded w-full"></div>
                            <div className="h-2 bg-[#E9ECEF] rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-[#212529] mb-2 truncate">{resume.title}</h3>
                      <div className="flex items-center text-sm text-[#6C757D] mb-3">
                        <Calendar size={14} className="mr-1" />
                        <span>Updated {formatDate(resume.updatedAt)}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/editor/${resume.id}`}
                          className="flex-1 bg-[#2F3C7E] text-white py-2 px-3 rounded-lg hover:bg-[#00C9A7] transition-all duration-200 text-center text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/preview/${resume.id}`}
                          className="flex-1 border border-[#2F3C7E] text-[#2F3C7E] py-2 px-3 rounded-lg hover:bg-[#2F3C7E] hover:text-white transition-all duration-200 text-center text-sm font-medium"
                        >
                          Preview
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Template Recommendation Carousel */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#212529]">Recommended Templates</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={prevTemplate}
                    className="p-2 bg-[#F8F9FA] rounded-full hover:bg-[#E9ECEF] transition-colors duration-200"
                  >
                    <ChevronLeft size={20} className="text-[#6C757D]" />
                  </button>
                  <button
                    onClick={nextTemplate}
                    className="p-2 bg-[#F8F9FA] rounded-full hover:bg-[#E9ECEF] transition-colors duration-200"
                  >
                    <ChevronRight size={20} className="text-[#6C757D]" />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentTemplateIndex * 100}%)` }}
                >
                  {templates.map((template, index) => (
                    <div key={template.id} className="w-full flex-shrink-0 px-2">
                      <div className="bg-[#F8F9FA] rounded-xl p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-24 h-32 bg-white rounded-lg shadow-sm p-2 flex-shrink-0">
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                              <div 
                                className="w-16 h-20 rounded shadow-sm p-2"
                                style={{ backgroundColor: 'white', border: `2px solid ${template.color}20` }}
                              >
                                <div className="space-y-1">
                                  <div 
                                    className="h-2 rounded w-3/4"
                                    style={{ backgroundColor: template.color }}
                                  ></div>
                                  <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                                  <div className="space-y-0.5 mt-2">
                                    <div className="h-1 bg-gray-200 rounded w-full"></div>
                                    <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#212529] mb-2">{template.name}</h3>
                            <p className="text-[#6C757D] text-sm mb-3">{template.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-[#2F3C7E]/10 text-[#2F3C7E] px-2 py-1 rounded-full">
                                {template.category}
                              </span>
                              <button
                                onClick={() => useTemplate(template.id)}
                                className="bg-[#2F3C7E] text-white px-4 py-2 rounded-lg hover:bg-[#00C9A7] transition-all duration-200 text-sm font-medium"
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

              <div className="flex justify-center mt-4 space-x-2">
                {templates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTemplateIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTemplateIndex ? 'bg-[#2F3C7E]' : 'bg-[#E9ECEF]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Resume Tips */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-[#00C9A7]/10 rounded-full">
                  <Lightbulb size={20} className="text-[#00C9A7]" />
                </div>
                <h2 className="text-xl font-bold text-[#212529]">Smart Resume Tips</h2>
              </div>

              <div className="space-y-4">
                {resumeTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#E9ECEF] transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                          <Icon size={16} className="text-[#2F3C7E]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#212529] text-sm mb-1">{tip.title}</h3>
                          <p className="text-[#6C757D] text-xs leading-relaxed">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#2F3C7E]/10 to-[#00C9A7]/10 rounded-xl">
                <h3 className="font-semibold text-[#212529] mb-2">💡 Pro Tip</h3>
                <p className="text-[#6C757D] text-sm">
                  Customize your resume for each job application. Use keywords from the job description to increase your chances of passing ATS systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;