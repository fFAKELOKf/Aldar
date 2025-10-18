import { motion } from "motion/react";
import { HiggsFieldLogo } from "./HiggsFieldLogo";

interface NavigationProps {
  currentPage: 'inspiration' | 'generator';
  onNavigate: (page: 'inspiration' | 'generator') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #333333',
      }}
    >
      <div className="container mx-auto max-w-[1200px] px-6 py-4">
        <div className="flex items-center justify-between">
          <HiggsFieldLogo />
          
          <div className="flex gap-8">
            <button
              onClick={() => onNavigate('inspiration')}
              className="relative transition-all duration-300"
              style={{
                color: currentPage === 'inspiration' ? '#FFFFFF' : '#A0A0A0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 500,
                padding: '8px 0',
              }}
            >
              Вдохновение
              {currentPage === 'inspiration' && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#8A2BE2' }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            
            <button
              onClick={() => onNavigate('generator')}
              className="relative transition-all duration-300"
              style={{
                color: currentPage === 'generator' ? '#FFFFFF' : '#A0A0A0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 500,
                padding: '8px 0',
              }}
            >
              Генератор
              {currentPage === 'generator' && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#8A2BE2' }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
