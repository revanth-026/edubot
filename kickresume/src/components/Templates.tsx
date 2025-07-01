import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, Star, Briefcase, Palette, Minimize, Code } from 'lucide-react';

const Templates: React.FC = () => {
  const [visibleTemplates, setVisibleTemplates] = useState<number[]>([]);
  const templatesRef = useRef<HTMLDivElement>(null);

  const templates = [
    {
      name: 'Executive Pro',
      category: 'Formal & Corporate',
      rating: 4.9,
      downloads: '15,000+',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#2F3C7E',
      icon: Briefcase,
      emoji: '📁'
    },
    {
      name: 'Creative Edge',
      category: 'Bold & Visual',
      rating: 4.8,
      downloads: '12,000+',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#00C9A7',
      icon: Palette,
      emoji: '🎨'
    },
    {
      name: 'Modern Minimal',
      category: 'Simple & Sleek',
      rating: 4.9,
      downloads: '18,000+',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#FF6B6B',
      icon: Minimize,
      emoji: '✏️'
    },
    {
      name: 'Tech Specialist',
      category: 'Developer & IT Friendly',
      rating: 4.7,
      downloads: '9,000+',
      image: 'https://images.pexels.com/photos/590024/pexels-photo-590024.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#2F3C7E',
      icon: Code,
      emoji: '👨‍💻'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleTemplates(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = templatesRef.current?.querySelectorAll('.template-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="templates" ref={templatesRef} className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212529] mb-4">
            🖼️ Professional Resume Templates
          </h2>
          <p className="text-xl text-[#6C757D] max-w-3xl mx-auto">
            Each of our templates is designed to highlight your skills with clarity, elegance, and professionalism.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => {
            const isVisible = visibleTemplates.includes(index);
            const Icon = template.icon;
            
            return (
              <div
                key={index}
                data-index={index}
                className={`template-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Eye size={20} className="text-white" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Download size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{template.emoji}</span>
                      <h3 className="text-lg font-semibold text-[#212529]">
                        {template.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-[#6C757D]">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#6C757D] mb-3">
                    Style: {template.category}
                  </p>
                  
                  <p className="text-sm font-medium text-[#2F3C7E]">
                    ⭐ {template.rating} • {template.downloads} Downloads
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register"
            className="bg-[#2F3C7E] text-white px-8 py-4 rounded-lg hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Templates;