import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { DetailModal } from "./DetailModal";
import { storyBlueprints } from "../data/storyBlueprints";
import type { StoryBlueprint } from "../types/story";

export function InspirationPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryBlueprint | null>(null);

  const handleCopy = (text: string, index: number) => {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 2000);
        })
        .catch(() => {
          // Fallback to traditional method
          fallbackCopy(text, index);
        });
    } else {
      // Use fallback directly if Clipboard API not available
      fallbackCopy(text, index);
    }
  };

  const fallbackCopy = (text: string, index: number) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-[1200px]">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1
            className="mb-6"
            style={{
              color: '#FFFFFF',
              fontSize: '36px',
              fontWeight: 500,
              lineHeight: '1.3',
            }}
          >
            Узнайте, на что способен наш ИИ
          </h1>
          <p
            style={{
              color: '#A0A0A0',
              fontSize: '16px',
              lineHeight: '1.6',
              maxWidth: '800px',
            }}
          >
            Посмотрите примеры историй, созданных нейросетью. Скопируйте промпт, который вам понравился, или переходите в генератор, чтобы создать свою уникальную раскадровку.
          </p>
        </motion.div>

        {/* Example Showcase Sections */}
        {storyBlueprints.map((story, storyIndex) => (
          <motion.section
            key={storyIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + storyIndex * 0.2 }}
            className="mb-12"
            style={{ marginTop: '48px' }}
          >
            <h2
              className="mb-8"
              style={{
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: 500,
              }}
            >
              Пример: {story.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Prompt */}
              <div>
                <p
                  className="mb-3"
                  style={{
                    color: '#8A2BE2',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Промпт, который был использован:
                </p>
                <p
                  style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                  }}
                >
                  {story.summary}
                </p>
                <div
                  className="relative rounded-2xl p-6"
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '1px solid #333333',
                  }}
                >
                  <p
                    className="mb-4"
                    style={{
                      color: '#FFFFFF',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {story.prompt}
                  </p>
                  
                  <motion.button
                    onClick={() => handleCopy(story.prompt, storyIndex)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300"
                    style={{
                      backgroundColor: copiedIndex === storyIndex ? '#8A2BE2' : 'transparent',
                      border: `1px solid ${copiedIndex === storyIndex ? '#8A2BE2' : '#FF00FF'}`,
                      color: '#FFFFFF',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedIndex === storyIndex ? (
                      <>
                        <Check className="w-4 h-4" />
                        Скопировано!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Копировать
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Right Column - Result (Single Storyboard) */}
              <div>
                <p
                  className="mb-3"
                  style={{
                    color: '#8A2BE2',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Полученный результат:
                </p>
                
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: '#8A2BE2',
                    boxShadow: '0 0 30px rgba(138, 43, 226, 0.3)',
                  }}
                  onClick={() => setSelectedStory(story)}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '2px solid #333333',
                  }}
                >
                  <img
                    src={story.storyboardImage}
                    alt={`Раскадровка: ${story.title}`}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedStory && (
        <DetailModal
          isOpen={!!selectedStory}
          onClose={() => setSelectedStory(null)}
          storyboardImage={selectedStory.storyboardImage}
          prompt={selectedStory.prompt}
          frames={selectedStory.frames}
          summary={selectedStory.summary}
          title={`Детали: ${selectedStory.title}`}
        />
      )}
    </div>
  );
}