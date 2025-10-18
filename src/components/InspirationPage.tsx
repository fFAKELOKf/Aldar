import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { DetailModal } from "./DetailModal";

const exampleStories = [
  {
    title: "Хитрый обман бая",
    prompt: "Алдар Косе приходит на базар и видит богатого бая, который хвастается своим богатством. Алдар предлагает баю выгодную сделку на его старого коня. Бай соглашается, думая, что обманывает хитреца. Алдар уезжает на лучшем коне бая, оставив его с дряхлой лошадью.",
    storyboardImage: "https://images.unsplash.com/photo-1626513507309-d67e162e0658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBzdG9yeWJvYXJkfGVufDF8fHx8MTc2MDc4NDY3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    frames: [
      {
        thumbnail: "https://images.unsplash.com/photo-1562236457-bdc2bec633cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1hcmtldCUyMGJhemFhcnxlbnwxfHx8fDE3NjA3ODMwNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Алдар Косе прибывает на оживленный базар, где богатый бай хвастается перед толпой.",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1669012520437-5102e3fd4589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXNlJTIwZWxkZXJseSUyMG1lcmNoYW50fGVufDF8fHx8MTc2MDc4NDAyMHww&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Бай с гордостью демонстрирует свое богатство и лучших коней.",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1728300250509-f7b954491905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZSUyMGNvbnZlcnNhdGlvbnxlbnwxfHx8fDE3NjA3ODM1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Алдар подходит к баю и предлагает сделку на своего старого коня.",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1629818986721-23061616633f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3YWxraW5nJTIwYXdheSUyMHN1bnNldHxlbnwxfHx8fDE3NjA3ODM1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Алдар уезжает на прекрасном коне бая на закате, оставив его с дряхлой лошадью.",
      },
    ],
  },
  {
    title: "Мудрость против жадности",
    prompt:
      "Торговец на рынке отказывается дать еду голодному путнику. Алдар Косе подходит и предлагает сделку — он расскажет три мудрости за обед. Торговец соглашается из любопытства. После еды Алдар рассказывает очевидные истины, и торговец понимает, что его перехитрили.",
    storyboardImage: "https://images.unsplash.com/photo-1760113671986-63ccb46ae202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwbm92ZWwlMjBwYW5lbHN8ZW58MXx8fHwxNzYwNzg0Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    frames: [
      {
        thumbnail: "https://images.unsplash.com/photo-1690323027409-ba9c96ae1c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwc3Rvcnl0ZWxsZXIlMjBiYXphYXJ8ZW58MXx8fHwxNzYwNzg0MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Голодный путник просит еды у жадного торговца на рынке.",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1642520312867-3b13e53c9bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwb3J0cmFpdCUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NjA3ODM1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Алдар Косе появляется и предлагает торговцу интересную сделку.",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1722252799903-797424adcd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMGZlYXN0JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzYwNzg0MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Торговец соглашается и накрывает щедрый обед.",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1760420910499-f7e2bc16bd2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHNjZW5lJTIwdmlsbGFnZXxlbnwxfHx8fDE3NjA3ODM1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        caption: "Алдар рассказывает очевидные истины, торговец осознает, что его обманули.",
      },
    ],
  },
];

export function InspirationPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<typeof exampleStories[0] | null>(null);

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
        {exampleStories.map((story, storyIndex) => (
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
          title={`Детали: ${selectedStory.title}`}
        />
      )}
    </div>
  );
}