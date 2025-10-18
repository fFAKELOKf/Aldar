import { useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { DetailModal } from "./DetailModal";

interface ResultStateProps {
  scenario: string;
  onStartOver: () => void;
}

// Mock storyboard data with composite image and individual frames
const mockStoryboardData = {
  storyboardImage: "https://images.unsplash.com/photo-1747767899259-66b344c2c265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGx1c3RyYXRpb24lMjBzZXF1ZW5jZSUyMGFydHxlbnwxfHx8fDE3NjA3ODQ2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  frames: [
    {
      thumbnail: "https://images.unsplash.com/photo-1562236457-bdc2bec633cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1hcmtldCUyMGJhemFhcnxlbnwxfHx8fDE3NjA3ODMwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Алдар Косе приходит на оживленный восточный базар ранним утром",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1642520312867-3b13e53c9bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwb3J0cmFpdCUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NjA3ODM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Крупный план: Алдар Косе замечает жадного торговца",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1728300250509-f7b954491905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZSUyMGNvbnZlcnNhdGlvbnxlbnwxfHx8fDE3NjA3ODM1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Алдар Косе ведет умную беседу с торговцем, используя свою хитрость",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1679270107593-08c4c38f6fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNsb3RoaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNzgzNTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Торговец передает еду Алдару, думая, что совершил выгодную сделку",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1629818986721-23061616633f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3YWxraW5nJTIwYXdheSUyMHN1bnNldHxlbnwxfHx8fDE3NjA3ODM1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Алдар Косе уходит с базара с едой и широкой улыбкой",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1760420910499-f7e2bc16bd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHNjZW5lJTIwdmlsbGFnZXxlbnwxfHx8fDE3NjA3ODM1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Торговец остается в полном недоумении, осознав обман",
    },
  ],
};

export function ResultState({ scenario, onStartOver }: ResultStateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = mockStoryboardData.storyboardImage;
    link.download = 'storyboard.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const jsonData = {
      scenario: scenario,
      storyboard: mockStoryboardData.frames,
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'storyboard.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-24 px-6"
    >
      <div className="container mx-auto max-w-[1200px]">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2
            className="mb-6"
            style={{
              color: '#FFFFFF',
              fontSize: '28px',
              fontWeight: 500,
            }}
          >
            Готово! Ваша история ожила:
          </h2>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-4 mb-12">
            <motion.button
              onClick={handleDownloadImage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: '#8A2BE2',
                color: '#FFFFFF',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(138, 43, 226, 0.3)',
              }}
            >
              <Download className="w-5 h-5" />
              Скачать изображение
            </motion.button>

            <motion.button
              onClick={handleDownloadJson}
              whileHover={{ 
                backgroundColor: '#FF00FF',
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                padding: '12px 24px',
                border: '1px solid #FF00FF',
                cursor: 'pointer',
              }}
            >
              <Download className="w-5 h-5" />
              Скачать JSON
            </motion.button>

            <motion.button
              onClick={onStartOver}
              whileHover={{ color: '#8A2BE2' }}
              whileTap={{ scale: 0.98 }}
              className="transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: 'transparent',
                color: '#A0A0A0',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Начать заново
            </motion.button>
          </div>
        </motion.div>

        {/* Single Storyboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              borderColor: '#8A2BE2',
              boxShadow: '0 0 40px rgba(138, 43, 226, 0.4)',
            }}
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: '#1C1C1C',
              border: '2px solid #333333',
              maxWidth: '900px',
              width: '100%',
            }}
          >
            <img
              src={mockStoryboardData.storyboardImage}
              alt="Сгенерированная раскадровка"
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
          style={{
            color: '#A0A0A0',
            fontSize: '14px',
          }}
        >
          Нажмите на изображение, чтобы увидеть детали каждого кадра
        </motion.p>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        storyboardImage={mockStoryboardData.storyboardImage}
        prompt={scenario}
        frames={mockStoryboardData.frames}
        title="Детали раскадровки"
      />
    </motion.div>
  );
}
