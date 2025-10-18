import { useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { DetailModal } from "./DetailModal";
import type { GeneratedStoryboard } from "../types/story";

interface ResultStateProps {
  story: GeneratedStoryboard;
  onStartOver: () => void;
}

const confidenceLabel: Record<GeneratedStoryboard['matchConfidence'], string> = {
  high: 'высокая',
  medium: 'средняя',
  low: 'базовая',
};

const confidenceAccent: Record<GeneratedStoryboard['matchConfidence'], string> = {
  high: '#22C55E',
  medium: '#F97316',
  low: '#8A2BE2',
};

export function ResultState({ story, onStartOver }: ResultStateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = story.storyboardImage;
    link.download = 'storyboard.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const jsonData = {
      title: story.title,
      scenario: story.scenario,
      summary: story.summary,
      storyboard: story.frames,
      matchedKeywords: story.matchedKeywords,
      matchConfidence: story.matchConfidence,
      generatedAt: story.generatedAt,
    };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'storyboard.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generatedAtDate = new Date(story.generatedAt);
  const formattedGeneratedAt = Number.isNaN(generatedAtDate.getTime())
    ? null
    : generatedAtDate.toLocaleString('ru-RU', {
        dateStyle: 'long',
        timeStyle: 'short',
      });

  const hasKeywords = story.matchedKeywords.length > 0;

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
            className="mb-4"
            style={{
              color: '#FFFFFF',
              fontSize: '32px',
              fontWeight: 500,
            }}
          >
            Готово! {story.title}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              color: '#A0A0A0',
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '20px',
              maxWidth: '860px',
            }}
          >
            {story.summary}
          </motion.p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              style={{
                color: '#A0A0A0',
                fontSize: '14px',
              }}
            >
              Уверенность подбора:{' '}
              <span style={{ color: confidenceAccent[story.matchConfidence], fontWeight: 500 }}>
                {confidenceLabel[story.matchConfidence]}
              </span>
            </span>
            {formattedGeneratedAt && (
              <span
                style={{
                  color: '#A0A0A0',
                  fontSize: '14px',
                }}
              >
                Сгенерировано: {formattedGeneratedAt}
              </span>
            )}
          </div>

          {hasKeywords ? (
            <div className="flex flex-wrap gap-2 mb-8">
              {story.matchedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '1px solid #333333',
                    color: '#FFFFFF',
                    letterSpacing: '0.03em',
                  }}
                >
                  #{keyword}
                </span>
              ))}
            </div>
          ) : (
            <p
              style={{
                color: '#A0A0A0',
                fontSize: '14px',
                marginBottom: '24px',
              }}
            >
              Мы не нашли конкретных ключевых слов, поэтому адаптировали раскадровку под общий тон вашего промпта.
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10 rounded-2xl"
            style={{
              backgroundColor: '#111111',
              border: '1px solid #333333',
            }}
          >
            <div className="px-6 py-5 space-y-2">
              <p
                style={{
                  color: '#8A2BE2',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Ваш промпт
              </p>
              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                {story.scenario}
              </p>
            </div>
          </motion.div>

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
              src={story.storyboardImage}
              alt={`Сгенерированная раскадровка: ${story.title}`}
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
        storyboardImage={story.storyboardImage}
        prompt={story.scenario}
        frames={story.frames}
        summary={story.summary}
        title={`Детали раскадровки: ${story.title}`}
      />
    </motion.div>
  );
}
