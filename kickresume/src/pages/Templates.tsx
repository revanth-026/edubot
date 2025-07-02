import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Eye, Check, Star, Download, Sparkles, Palette, Grid, List, ChevronDown, TrendingUp, Award, Users, Zap, Target, Heart, Crown } from 'lucide-react';
import { templates, templateCategories, getTemplatesByCategory } from '../data/templates';
import type { TemplateInfo } from '../types/Resume';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { useToast } from '../contexts/ToastContext';

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const filteredTemplates = getTemplatesByCategory(selectedCategory).filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (template: TemplateInfo) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      navigate(`/editor?template=${selectedTemplate.id}`);
      showToast(`Using ${selectedTemplate.name} template`, 'success');
    }
  };

  const handlePreviewClose = () => {
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'modern': return <Zap size={16} />;
      case 'classic': return <Award size={16} />;
      case 'creative': return <Palette size={16} />;
      case 'minimal': return <Target size={16} />;
      case 'professional': return <Users size={16} />;
      case 'tech': return <TrendingUp size={16} />;
      default: return <Star size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'modern': '#2F3C7E',
      'classic': '#6C757D',
      'creative': '#FF6B6B',
      'minimal': '#00C9A7',
      'professional': '#2F3C7E',
      'tech': '#00C9A7',
      'executive': '#6C757D',
      'academic': '#2F3C7E',
      'designer': '#FF6B6B'
    };
    return colors[category.toLowerCase() as keyof typeof colors] || '#2F3C7E';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Toast />
      <Navbar />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F3C7E]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#00C9A7]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FF6B6B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/')}
                className="p-4 bg-white rounded-2xl shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] hover:shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] transition-all duration-300 transform hover:scale-110"
              >
                <ArrowLeft size={24} className="text-[#6C757D]" />
              </button>
              <div>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2F3C7E]/10 to-[#00C9A7]/10 px-6 py-3 rounded-full mb-4 border border-[#2F3C7E]/20">
                  <Sparkles size={20} className="text-[#2F3C7E]" />
                  <span className="text-[#2F3C7E] font-semibold">Professional Templates</span>
                </div>
                <h1 className="text-5xl font-black text-[#212529] mb-2 tracking-tight">
                  Choose Your <span className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] bg-clip-text text-transparent">Perfect</span> Template
                </h1>
                <p className="text-lg text-[#6C757D] font-medium">
                  Select from {templates.length} professionally designed resume templates
                </p>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-2xl shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] p-2 border border-white/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white shadow-lg' 
                      : 'text-[#6C757D] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white shadow-lg' 
                      : 'text-[#6C757D] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] p-8 border border-white/50">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6C757D]" size={20} />
                <input
                  type="text"
                  placeholder="Search templates by name or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#F8F9FA] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#2F3C7E] transition-all duration-300 shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] font-medium"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-[#F8F9FA] border-2 border-transparent rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-[#2F3C7E] transition-all duration-300 shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] font-semibold text-[#212529] min-w-[200px]"
                >
                  {templateCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6C757D] pointer-events-none" size={20} />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#F8F9FA] border-2 border-transparent rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-[#2F3C7E] transition-all duration-300 shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] font-semibold text-[#212529] min-w-[160px]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="category">By Category</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6C757D] pointer-events-none" size={20} />
              </div>
            </div>

            {/* Category Pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {templateCategories.slice(0, 8).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-semibold ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white shadow-lg transform scale-105'
                      : 'bg-[#F8F9FA] text-[#6C757D] hover:text-[#2F3C7E] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff]'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                  {category !== 'All' && (
                    <span className="text-xs opacity-75">
                      {getTemplatesByCategory(category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid/List */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTemplates.map((template, index) => (
                <div
                  key={template.id}
                  className={`group relative transition-all duration-500 delay-${index * 50}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="bg-white rounded-2xl shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] hover:shadow-[25px_25px_50px_#d1d9e6,-25px_-25px_50px_#ffffff] transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border border-white/50 overflow-hidden">
                    {/* Template Preview */}
                    <div className="relative h-64 bg-[#F8F9FA] overflow-hidden">
                      {template.preview ? (
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative">
                          <div className="w-32 h-40 bg-white rounded-lg shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] p-4 transform group-hover:scale-105 transition-transform duration-300">
                            <div className="space-y-2">
                              <div 
                                className="h-3 rounded w-3/4 shadow-sm"
                                style={{ backgroundColor: getCategoryColor(template.category) }}
                              ></div>
                              <div className="h-2 bg-[#E9ECEF] rounded w-1/2 shadow-sm"></div>
                              <div className="space-y-1.5 mt-4">
                                <div className="h-1.5 bg-[#E9ECEF] rounded w-full shadow-sm"></div>
                                <div className="h-1.5 bg-[#E9ECEF] rounded w-4/5 shadow-sm"></div>
                                <div className="h-1.5 bg-[#E9ECEF] rounded w-3/5 shadow-sm"></div>
                                <div className="h-1.5 bg-[#E9ECEF] rounded w-4/5 shadow-sm"></div>
                                <div className="h-1.5 bg-[#E9ECEF] rounded w-2/3 shadow-sm"></div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 text-xs text-[#6C757D] bg-white/80 px-2 py-1 rounded-full">
                            Preview
                          </div>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white rounded-full p-4 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye size={24} className="text-[#2F3C7E]" />
                        </div>
                      </div>

                      {/* Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF6B6B]/80 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center space-x-1">
                          <Crown size={12} />
                          <span>Premium</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <div 
                          className="text-xs font-bold px-3 py-1 rounded-full shadow-lg text-white"
                          style={{ backgroundColor: getCategoryColor(template.category) }}
                        >
                          {template.category}
                        </div>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-black text-[#212529] text-lg group-hover:text-[#2F3C7E] transition-colors duration-300">
                          {template.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm font-bold text-[#6C757D]">4.9</span>
                        </div>
                      </div>
                      
                      <p className="text-[#6C757D] text-sm mb-4 leading-relaxed font-medium line-clamp-2">
                        {template.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-[#6C757D]">
                          <Download size={12} />
                          <span className="font-semibold">2.5K+ downloads</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelect(template);
                          }}
                          className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-bold text-sm transform hover:scale-105"
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {filteredTemplates.map((template, index) => (
                <div
                  key={template.id}
                  className={`group bg-white rounded-2xl shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] hover:shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] transition-all duration-500 cursor-pointer border border-white/50 delay-${index * 50}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-center p-6">
                    {/* Template Preview */}
                    <div className="w-24 h-32 bg-[#F8F9FA] rounded-xl shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] p-3 flex-shrink-0 mr-6 group-hover:scale-105 transition-transform duration-300">
                      {template.preview ? (
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center relative overflow-hidden shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]">
                          <div className="w-16 h-24 p-2">
                            <div className="space-y-1">
                              <div 
                                className="h-2 rounded w-3/4 shadow-sm"
                                style={{ backgroundColor: getCategoryColor(template.category) }}
                              ></div>
                              <div className="h-1 bg-[#E9ECEF] rounded w-1/2 shadow-sm"></div>
                              <div className="space-y-0.5 mt-2">
                                <div className="h-0.5 bg-[#E9ECEF] rounded w-full shadow-sm"></div>
                                <div className="h-0.5 bg-[#E9ECEF] rounded w-4/5 shadow-sm"></div>
                                <div className="h-0.5 bg-[#E9ECEF] rounded w-3/5 shadow-sm"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-black text-[#212529] group-hover:text-[#2F3C7E] transition-colors duration-300">
                              {template.name}
                            </h3>
                            <div 
                              className="text-xs font-bold px-3 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${getCategoryColor(template.category)}15`,
                                color: getCategoryColor(template.category)
                              }}
                            >
                              {template.category}
                            </div>
                            {template.isPremium && (
                              <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF6B6B]/80 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center space-x-1">
                                <Crown size={10} />
                                <span>Premium</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[#6C757D] mb-3 leading-relaxed font-medium max-w-2xl">
                            {template.description}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-[#6C757D]">
                            <div className="flex items-center space-x-1">
                              <Star size={14} className="text-yellow-400 fill-current" />
                              <span className="font-bold">4.9</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download size={14} />
                              <span className="font-semibold">2.5K+ downloads</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart size={14} />
                              <span className="font-semibold">95% liked</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelect(template);
                          }}
                          className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-bold transform hover:scale-105"
                        >
                          Preview & Use
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-white rounded-full shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] flex items-center justify-center mx-auto mb-8">
                <Search size={48} className="text-[#6C757D]" />
              </div>
              <h3 className="text-2xl font-black text-[#212529] mb-3">No templates found</h3>
              <p className="text-[#6C757D] mb-8 text-lg">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-bold transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[30px_30px_80px_#000000/20]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-[#E9ECEF] bg-[#F8F9FA]">
              <div className="flex items-center space-x-4">
                <div 
                  className="p-3 rounded-2xl shadow-lg"
                  style={{ backgroundColor: `${getCategoryColor(selectedTemplate.category)}15` }}
                >
                  {getCategoryIcon(selectedTemplate.category)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#212529] mb-1">{selectedTemplate.name}</h2>
                  <p className="text-[#6C757D] font-medium">{selectedTemplate.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-[#6C757D]">4.9 (2.5K reviews)</span>
                    </div>
                    <div 
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${getCategoryColor(selectedTemplate.category)}15`,
                        color: getCategoryColor(selectedTemplate.category)
                      }}
                    >
                      {selectedTemplate.category}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleUseTemplate}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold transform hover:scale-105"
                >
                  <Check size={20} />
                  <span>Use This Template</span>
                </button>
                <button
                  onClick={handlePreviewClose}
                  className="p-3 bg-white rounded-2xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] text-[#6C757D] hover:text-[#212529] transition-all duration-300 transform hover:scale-110"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 overflow-auto max-h-[calc(90vh-140px)]">
              {selectedTemplate.preview ? (
                <div className="flex justify-center">
                  <img
                    src={selectedTemplate.preview}
                    alt={selectedTemplate.name}
                    className="max-w-full max-h-[600px] object-contain rounded-2xl shadow-2xl"
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-96 h-[500px] bg-[#F8F9FA] rounded-2xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] flex items-center justify-center border border-white/50">
                    <div className="text-center text-[#6C757D] p-8">
                      <div className="w-48 h-64 bg-white rounded-xl shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] p-6 mx-auto mb-6">
                        <div className="space-y-3">
                          <div 
                            className="h-4 rounded w-3/4 shadow-sm"
                            style={{ backgroundColor: getCategoryColor(selectedTemplate.category) }}
                          ></div>
                          <div className="h-3 bg-[#E9ECEF] rounded w-1/2 shadow-sm"></div>
                          <div className="space-y-2 mt-6">
                            <div className="h-2 bg-[#E9ECEF] rounded w-full shadow-sm"></div>
                            <div className="h-2 bg-[#E9ECEF] rounded w-4/5 shadow-sm"></div>
                            <div className="h-2 bg-[#E9ECEF] rounded w-3/5 shadow-sm"></div>
                            <div className="h-2 bg-[#E9ECEF] rounded w-4/5 shadow-sm"></div>
                            <div className="h-2 bg-[#E9ECEF] rounded w-2/3 shadow-sm"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold mb-2">{selectedTemplate.name}</div>
                      <div className="text-lg mb-4">{selectedTemplate.category} Template</div>
                      <div className="text-sm max-w-md mx-auto leading-relaxed">{selectedTemplate.description}</div>
                      <div className="mt-6 text-xs text-[#6C757D]">
                        Preview image will be available once you add your template images
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;