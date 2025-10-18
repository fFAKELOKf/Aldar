import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { InspirationPage } from "./components/InspirationPage";
import { GeneratorPage } from "./components/GeneratorPage";

type PageType = 'inspiration' | 'generator';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('inspiration');

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundColor: '#111111',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8A2BE2 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF00FF 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {currentPage === 'inspiration' && <InspirationPage />}
        {currentPage === 'generator' && <GeneratorPage />}
      </div>
    </div>
  );
}
