import { motion } from "motion/react";
import { Download, Copy, Check, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

interface Frame {
  thumbnail: string;
  caption: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyboardImage: string;
  prompt: string;
  frames: Frame[];
  title: string;
}

export function DetailModal({
  isOpen,
  onClose,
  storyboardImage,
  prompt,
  frames,
  title,
}: DetailModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyPrompt = () => {
    const textArea = document.createElement('textarea');
    textArea.value = prompt;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
    
    document.body.removeChild(textArea);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = storyboardImage;
    link.download = 'storyboard.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[1400px] max-h-[90vh] overflow-hidden p-0 bg-[#1C1C1C] border-[#333333]"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          Детальный просмотр раскадровки с покадровым разбором
        </DialogDescription>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-lg p-2 transition-all duration-300 hover:bg-[#333333]"
          style={{ color: '#A0A0A0' }}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column - Visualization */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#111111',
                border: '1px solid #333333',
              }}
            >
              <img
                src={storyboardImage}
                alt="Раскадровка"
                className="w-full h-auto"
              />
            </motion.div>
          </div>

          {/* Right Column - Information and Actions */}
          <div className="flex flex-col gap-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(90vh - 4rem)' }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2
                className="mb-6"
                style={{
                  color: '#FFFFFF',
                  fontSize: '28px',
                  fontWeight: 500,
                }}
              >
                Детали вашей истории
              </h2>

              {/* Prompt Card */}
              <div className="mb-6">
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
                  Промпт:
                </p>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: '#111111',
                    border: '1px solid #333333',
                  }}
                >
                  <p
                    style={{
                      color: '#FFFFFF',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {prompt}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                  onClick={handleCopyPrompt}
                  whileHover={{ 
                    backgroundColor: isCopied ? '#8A2BE2' : '#FF00FF',
                    boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: isCopied ? '#8A2BE2' : 'transparent',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    border: `1px solid ${isCopied ? '#8A2BE2' : '#FF00FF'}`,
                    cursor: 'pointer',
                  }}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Копировать промпт
                    </>
                  )}
                </motion.button>
              </div>

              {/* Frame-by-Frame Breakdown */}
              <div>
                <h3
                  className="mb-4"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 500,
                  }}
                >
                  Разбор по кадрам
                </h3>

                <div className="flex flex-col gap-4">
                  {frames.map((frame, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      className="rounded-xl overflow-hidden"
                      style={{
                        backgroundColor: '#111111',
                        border: '1px solid #333333',
                      }}
                    >
                      <div className="flex gap-4 p-4">
                        {/* Thumbnail */}
                        <div 
                          className="flex-shrink-0 rounded-lg overflow-hidden"
                          style={{
                            width: '120px',
                            height: '120px',
                            backgroundColor: '#1C1C1C',
                          }}
                        >
                          <img
                            src={frame.thumbnail}
                            alt={`Кадр ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Caption */}
                        <div className="flex-1 flex flex-col justify-center">
                          <p
                            className="mb-1"
                            style={{
                              color: '#8A2BE2',
                              fontSize: '12px',
                              fontWeight: 500,
                            }}
                          >
                            Кадр {index + 1}
                          </p>
                          <p
                            style={{
                              color: '#FFFFFF',
                              fontSize: '14px',
                              lineHeight: '1.5',
                            }}
                          >
                            {frame.caption}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
