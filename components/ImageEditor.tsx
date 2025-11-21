import React, { useState, useRef } from 'react';
import { ImageUploadState } from '../types';
import { editImage } from '../services/geminiService';
import { Button } from './Button';

const EXAMPLE_PROMPTS = [
  "Make the background a rustic wooden table",
  "Add steam rising from the sauce",
  "Give it a vintage 1950s advertisement look",
  "Add fresh chili peppers and garlic around the jar",
  "Change the lighting to sunset golden hour"
];

const ImageEditor: React.FC = () => {
  const [uploadState, setUploadState] = useState<ImageUploadState>({
    file: null,
    previewUrl: null,
    base64Data: null,
    mimeType: null
  });
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.type.startsWith('image/')) {
        setError("Please upload a valid image file.");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError("File size too large. Please upload an image under 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // Extract raw base64 (remove data:image/xyz;base64,)
        const base64Data = result.split(',')[1];
        
        setUploadState({
          file,
          previewUrl: result,
          base64Data,
          mimeType: file.type
        });
        setResultImage(null); // Reset previous result
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadState.base64Data || !uploadState.mimeType) {
      setError("Please upload an image first.");
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a description for the edit.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImageUri = await editImage(
        uploadState.base64Data,
        uploadState.mimeType,
        prompt
      );
      setResultImage(generatedImageUri);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  const handleReset = () => {
    setUploadState({
      file: null,
      previewUrl: null,
      base64Data: null,
      mimeType: null
    });
    setPrompt('');
    setResultImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-100">
      
      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 bg-brand-50 p-6 flex flex-col border-r border-brand-100">
          <h2 className="text-xl font-serif font-bold text-brand-900 mb-6">Edit Configuration</h2>
          
          {/* Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-brand-800 mb-2">
              1. Upload Product Photo
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-brand-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-brand-200 file:text-brand-800
                hover:file:bg-brand-300
                cursor-pointer"
            />
            {!uploadState.file && (
               <p className="mt-2 text-xs text-brand-400">Recommended: Clear photo of jar or bottle on plain background.</p>
            )}
          </div>

          {/* Prompt Section */}
          <div className="mb-8 flex-grow">
            <label className="block text-sm font-medium text-brand-800 mb-2">
              2. Describe the Changes
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Place this jar on a marble counter with fresh basil leaves."
              className="w-full p-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white resize-none h-32 text-brand-900 placeholder-brand-300"
            />
            
            {/* Example Prompts */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-brand-600 mb-2 uppercase tracking-wider">Quick Ideas</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(p)}
                    className="text-xs bg-white border border-brand-200 hover:border-brand-400 text-brand-700 px-2 py-1 rounded-md transition-colors text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-3">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100 mb-4">
                {error}
              </div>
            )}
            <Button 
              onClick={handleGenerate} 
              isLoading={isGenerating} 
              className="w-full shadow-lg"
              disabled={!uploadState.file || !prompt}
            >
              {isGenerating ? 'Processing...' : 'Generate Transformation'}
            </Button>
            <Button 
              onClick={handleReset} 
              variant="secondary" 
              className="w-full"
              disabled={isGenerating}
            >
              Start Over
            </Button>
          </div>
        </div>

        {/* Right Panel: Visualization */}
        <div className="lg:col-span-8 bg-white p-6 lg:p-10 flex flex-col">
           <h2 className="text-xl font-serif font-bold text-brand-900 mb-6">Preview Studio</h2>
           
           <div className="flex-grow flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-brand-100 rounded-2xl bg-brand-50/30 relative overflow-hidden">
              
              {/* Empty State */}
              {!uploadState.previewUrl && (
                <div className="text-center p-8">
                  <div className="mx-auto h-16 w-16 text-brand-200 mb-4">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-brand-400 text-lg font-medium">Upload an image to begin editing</p>
                </div>
              )}

              {/* Comparison View */}
              {uploadState.previewUrl && (
                <div className="w-full h-full flex flex-col lg:flex-row gap-4 p-4 items-center justify-center">
                  
                  {/* Original */}
                  <div className={`relative group transition-all duration-500 ${resultImage ? 'lg:w-1/2' : 'lg:w-full max-w-lg'}`}>
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">
                      Original
                    </div>
                    <img 
                      src={uploadState.previewUrl} 
                      alt="Original upload" 
                      className="w-full h-auto rounded-lg shadow-md object-contain max-h-[500px]" 
                    />
                  </div>

                  {/* Result */}
                  {resultImage && (
                    <>
                      <div className="hidden lg:block text-brand-300">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                         </svg>
                      </div>
                      <div className="lg:hidden text-brand-300 rotate-90">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                         </svg>
                      </div>

                      <div className="relative group lg:w-1/2">
                        <div className="absolute top-2 left-2 bg-brand-600 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0 1 10 4v12a1 1 0 0 1-1.707.707L4.586 13H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.586l3.707-3.707a1 1 0 0 1 1.09-.217Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M14.657 2.929a1 1 0 0 1 1.414 0A9.972 9.972 0 0 1 19 10a9.972 9.972 0 0 1-2.929 7.071 1 1 0 0 1-1.414-1.414A7.971 7.971 0 0 0 17 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                          </svg>
                          AI Edited
                        </div>
                        <img 
                          src={resultImage} 
                          alt="AI Generated result" 
                          className="w-full h-auto rounded-lg shadow-lg border-2 border-brand-500 object-contain max-h-[500px]" 
                        />
                        <a 
                          href={resultImage} 
                          download={`chanay-edit-${Date.now()}.png`}
                          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-brand-900 text-xs px-3 py-2 rounded shadow transition-all opacity-0 group-hover:opacity-100 font-medium flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          Download
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Loading Overlay */}
              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
                   <p className="text-brand-800 font-medium animate-pulse">Chefs are cooking...</p>
                   <p className="text-brand-500 text-sm mt-2">Applying "{prompt}"</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
