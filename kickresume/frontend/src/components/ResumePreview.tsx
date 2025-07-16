import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { Download, Eye, Sparkles } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useEffect } from 'react';


const ResumePreview: React.FC = () => {
  const { resumeData, selectedTemplate ,updateRecentResume} = useResume();
  useEffect(() => {
  if (!selectedTemplate) return;
  updateRecentResume("1", {
    title: resumeData.personalInfo.fullName + "'s Resume",
    updatedAt: new Date().toISOString(),
  });
}, [resumeData]);

  const handleDownload = () => {
  const element = document.getElementById('resume-download-target');
  if (!element) return;

  const options = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(options).from(element).save();
};

 const handlePrint = () => {
  const element = document.getElementById('resume-download-target');
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Clone the resume node
  const cloned = element.cloneNode(true) as HTMLElement;

  // Inline computed styles (force styles to be copied with colors)
  const applyStylesRecursively = (source: HTMLElement, target: HTMLElement) => {
    const computedStyle = getComputedStyle(source);
    for (let i = 0; i < computedStyle.length; i++) {
      const key = computedStyle[i];
      target.style.setProperty(key, computedStyle.getPropertyValue(key));
    }

    // Recurse for children
    const sourceChildren = Array.from(source.children) as HTMLElement[];
    const targetChildren = Array.from(target.children) as HTMLElement[];
    for (let i = 0; i < sourceChildren.length; i++) {
      applyStylesRecursively(sourceChildren[i], targetChildren[i]);
    }
  };

  applyStylesRecursively(element, cloned);

  // Write to new print window
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Resume</title>
        <style>
          @page { margin: 20mm; }
          body {
            font-family: 'Inter', sans-serif;
            padding: 20px;
            background: white;
            color: #212529;
          }
        </style>
      </head>
      <body>${cloned.outerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};


  if (!selectedTemplate) {
    return (
      <div className="bg-white h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Eye className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg text-[#6C757D]">Select a template to see your resume preview</p>
        </div>
        

      </div>
    );
  }

  const TemplateComponent = selectedTemplate.component;

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Enhanced Preview Header */}
      <div className="border-b border-[#E9ECEF] px-6 py-4 bg-gradient-to-r from-white to-[#F8F9FA]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#00C9A7]" />
            <div>
              <h2 className="text-xl font-bold text-[#2F3C7E]">Resume Preview</h2>
              <p className="text-sm text-[#6C757D]">Template: {selectedTemplate.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-[#6C757D] hover:text-[#2F3C7E] hover:bg-[#E9ECEF] rounded-lg transition-all duration-200 font-medium"
            >
              <Eye className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-[#E9ECEF]">
<div id="resume-download-target" className="bg-white p-6">
  <TemplateComponent data={resumeData} />
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;