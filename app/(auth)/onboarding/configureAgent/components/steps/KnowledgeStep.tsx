'use client';

import { useSearchParams } from 'next/navigation';
import { FileText, Link as LinkIcon, Upload, Book, FileQuestion, Trash2, Globe, Plus } from 'lucide-react';
import { useState, useRef, ChangeEvent } from 'react';

// Specific configuration for each agent type
const AGENT_KNOWLEDGE_CONFIG = {
  '1': { // Triage Agent
    focus: 'Organizational Structure',
    description: 'Provide documents that help the agent understand your teams, departments, and priority levels.',
    uploadLabel: 'Department Directories & Priority Matrices',
  },
  '2': { // Dispatch Agent
    focus: 'Routing & Auth Protocols',
    description: 'Upload authentication scripts and detailed routing directories for call handling.',
    uploadLabel: 'Phone Directories & Auth Scripts',
  },
  '3': { // L1 Agent
    focus: 'Technical Documentation',
    description: 'Feed your agent troubleshooting guides, FAQs, and Standard Operating Procedures (SOPs).',
    uploadLabel: 'SOPs, Runbooks & FAQs',
  },
};

export default function KnowledgeStep() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agent') ?? '1';
  
  const config = AGENT_KNOWLEDGE_CONFIG[agentId as keyof typeof AGENT_KNOWLEDGE_CONFIG] || AGENT_KNOWLEDGE_CONFIG['1'];

  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  
  // --- FILE STATE ---
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // --- URL STATE ---
  const [urls, setUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    
    // Simple validation to ensure it looks like a URL
    let formattedUrl = urlInput.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
    }

    setUrls((prev) => [...prev, formattedUrl]);
    setUrlInput(''); // Clear input
  };

  const removeUrl = (indexToRemove: number) => {
    setUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddUrl();
    }
  };

  return (
    <div className="animate-in fade-in max-w-2xl">
      <h1 className="text-2xl text-[rgba(11,6,26,1)] font-semibold flex items-center gap-3">
        Knowledge Base
        <span className="text-sm font-normal px-3 py-1 bg-[rgba(209,213,219,1)] text-[rgba(18,18,18,0.6)] rounded-full border border-purple-100">
          {config.focus}
        </span>
      </h1>
      <p className="text-sm text-[rgba(113,113,122,1)] mb-8 mt-2">
        {config.description}
      </p>

      <div className="space-y-6">
        
        {/* 1. Knowledge Source Selector */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${activeTab === 'upload' ? 'bg-gray-50 text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <Upload size={16} />
              Upload Files
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${activeTab === 'url' ? 'bg-gray-50 text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <LinkIcon size={16} />
              Add Website / URL
            </button>
          </div>

          <div className="p-6 bg-gray-50 min-h-[240px] flex flex-col items-center">
            {activeTab === 'upload' ? (
              <div className="w-full flex flex-col items-center">
                
                {files.length === 0 && (
                  <div className="text-center mt-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 mx-auto">
                      <FileText className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{config.uploadLabel}</h3>
                    <p className="text-xs text-gray-500 mb-6 max-w-xs mx-auto">
                      Supported formats: PDF, DOCX, TXT, CSV (Max 20MB)
                    </p>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="w-full space-y-2 mb-6 max-h-[180px] overflow-y-auto pr-1">
                    {files.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`} 
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg group hover:border-purple-200 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded flex items-center justify-center flex-shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px] sm:max-w-[280px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFile(index)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  {files.length > 0 ? 'Add more files' : 'Choose Files'}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt,.csv"
                  />
                </label>
              </div>
            ) : (
              // --- URL TAB CONTENT ---
              <div className="w-full flex flex-col items-center">
                
                {urls.length === 0 && (
                  <div className="text-center mt-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 mx-auto">
                      <LinkIcon className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Crawl a Help Center</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      We will scrape the text content from the URL provided to train the agent.
                    </p>
                  </div>
                )}

                {/* URL List */}
                {urls.length > 0 && (
                  <div className="w-full space-y-2 mb-6 max-h-[180px] overflow-y-auto pr-1">
                    {urls.map((url, index) => (
                      <div 
                        key={`${url}-${index}`} 
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg group hover:border-purple-200 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center flex-shrink-0">
                            <Globe size={16} />
                          </div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[200px] sm:max-w-[300px]">
                            {url}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeUrl(index)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* URL Input Area */}
                <div className="flex w-full max-w-md gap-2">
                   <input 
                      type="url" 
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="https://docs.yourcompany.com" 
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                   />
                   <button 
                     onClick={handleAddUrl}
                     disabled={!urlInput.trim()}
                     className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                   >
                     <Plus size={16} />
                     Add
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. FAQ / Quick Answers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileQuestion size={18} className="text-amber-500" />
            <label className="block text-base font-medium text-[rgba(21,32,43,1)]">
              Critical Knowledge (FAQs)
            </label>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-3">
             <p className="text-xs text-amber-800 flex gap-2">
               <Book size={14} className="mt-0.5" />
               <strong>Tip:</strong> Add questions that customers ask 80% of the time. The agent will prioritize these answers over general documents.
             </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Q: What are your operating hours?"
              className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[rgba(21,32,43,1)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
             <textarea
              rows={2}
              placeholder="A: We are open Monday to Friday, 9am to 5pm EST."
              className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[rgba(21,32,43,1)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
}