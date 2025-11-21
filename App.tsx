import React from 'react';
import Header from './components/Header';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4">
              AI-Powered Food Styling
            </h1>
            <p className="text-lg text-brand-700 max-w-2xl mx-auto font-light">
              Transform your simple sauce and chutney product photos into marketing masterpieces. 
              Just describe the scene, and let our AI handle the rest.
            </p>
          </div>

          <ImageEditor />
          
          <section className="mt-16 text-center border-t border-brand-200 pt-12">
             <h3 className="text-lg font-serif font-bold text-brand-800 mb-6">How it Works</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="p-4">
                   <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold font-serif">1</div>
                   <h4 className="font-bold text-brand-900 mb-2">Upload</h4>
                   <p className="text-sm text-brand-600">Take a clear photo of your bottle or jar against a simple background.</p>
                </div>
                <div className="p-4">
                   <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold font-serif">2</div>
                   <h4 className="font-bold text-brand-900 mb-2">Describe</h4>
                   <p className="text-sm text-brand-600">Tell the AI to add ingredients, change the background, or adjust lighting.</p>
                </div>
                <div className="p-4">
                   <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold font-serif">3</div>
                   <h4 className="font-bold text-brand-900 mb-2">Download</h4>
                   <p className="text-sm text-brand-600">Get a high-quality, styled image ready for your social media or website.</p>
                </div>
             </div>
          </section>

        </div>
      </main>

      <footer className="bg-brand-900 text-brand-200 py-8 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-light">&copy; {new Date().getFullYear()} Chanay Agriprocessors. All rights reserved.</p>
          <p className="text-xs text-brand-500 mt-2">Powered by Gemini 2.5 Flash Image</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
