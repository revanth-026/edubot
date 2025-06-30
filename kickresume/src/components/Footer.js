import React from 'react';
import { Mail, FileText, BookOpen, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#212529] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About This Platform */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">📢 About This Platform</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              We're on a mission to make professional resume creation free, simple, and effective. Whether you're a fresher, job seeker, or working professional, our resume builder helps you showcase your skills without spending a rupee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">📬 Footer Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/resume"
                  className="text-gray-300 hover:text-[#00C9A7] transition-colors duration-200 flex items-center"
                >
                  <FileText size={16} className="mr-2 text-[#00C9A7]" />
                  Resume Templates
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-gray-300 hover:text-[#00C9A7] transition flex items-center"
                >
                  <FileText size={16} className="mr-2 text-[#00C9A7]" />
                  Cover Letter
                </button>
                <span className="text-xs bg-[#00C9A7] text-white px-2 py-1 rounded-full">Coming Soon</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-gray-300 hover:text-[#00C9A7] transition flex items-center"
                >
                  <BookOpen size={16} className="mr-2 text-[#00C9A7]" />
                  Resume Tips
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-gray-300 hover:text-[#00C9A7] transition flex items-center"
                >
                  <MessageCircle size={16} className="mr-2 text-[#00C9A7]" />
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">📞 Contact</h3>
            <div className="flex items-center mb-4">
              <Mail size={20} className="text-[#00C9A7] mr-3" />
              <span className="text-gray-300 text-sm">support@yourdomain.com</span>
            </div>

            <h4 className="text-lg font-semibold text-white mb-4">📰 Newsletter</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Stay updated with career tips and new templates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#6C757D]/20 border border-[#6C757D]/30 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00C9A7]"
              />
              <button className="bg-[#00C9A7] px-6 py-3 rounded-r-lg hover:bg-[#2F3C7E] transition-colors duration-200 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#6C757D]/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 ResumeBuilder. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => {}}
              className="text-gray-300 hover:text-[#00C9A7] text-sm transition-colors duration-200 mt-4 md:mt-0"
            >
              🔒 Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;