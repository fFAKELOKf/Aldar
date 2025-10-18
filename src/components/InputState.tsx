import { useState } from "react";
import { motion } from "motion/react";
import { Textarea } from "./ui/textarea";

interface InputStateProps {
  onGenerate: (scenario: string) => void;
}

export function InputState({ onGenerate }: InputStateProps) {
  const [scenario, setScenario] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (scenario.trim()) {
      onGenerate(scenario);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen px-6"
    >
      <div className="w-full max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-4"
          style={{ 
            color: '#FFFFFF',
            fontSize: '36px',
            fontWeight: 500,
          }}
        >
          Машина историй Алдара Косе
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <label
              htmlFor="scenario-input"
              className="block text-center"
              style={{ color: '#A0A0A0' }}
            >
              Напишите короткий сценарий, и наш ИИ оживит его.
            </label>
            <div
              className="relative rounded-lg transition-all duration-300"
              style={{
                boxShadow: isFocused
                  ? '0 0 20px rgba(138, 43, 226, 0.5)'
                  : 'none',
              }}
            >
              <Textarea
                id="scenario-input"
                placeholder="Например: Алдар Косе приходит на базар. Он видит жадного торговца. Алдар использует свою хитрость, чтобы получить бесплатную еду. Торговец остается в недоумении."
                className="min-h-[200px] bg-[#222222] border-[#333333] text-white placeholder:text-[#666666] rounded-lg p-4 focus:border-[#8A2BE2] transition-all duration-300"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              />
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={!scenario.trim()}
            whileHover={scenario.trim() ? { scale: 1.05 } : {}}
            whileTap={scenario.trim() ? { scale: 0.98 } : {}}
            className="w-full rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
            style={{
              backgroundColor: scenario.trim() ? '#8A2BE2' : '#333333',
              color: scenario.trim() ? '#FFFFFF' : '#A0A0A0',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 500,
              border: 'none',
              cursor: scenario.trim() ? 'pointer' : 'not-allowed',
              boxShadow: scenario.trim()
                ? '0 0 30px rgba(255, 0, 255, 0.3)'
                : 'none',
            }}
          >
            Сгенерировать!
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
