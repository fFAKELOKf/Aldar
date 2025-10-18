import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { InputState } from "./InputState";
import { LoadingState } from "./LoadingState";
import { ResultState } from "./ResultState";

type GeneratorState = 'input' | 'loading' | 'result';

export function GeneratorPage() {
  const [generatorState, setGeneratorState] = useState<GeneratorState>('input');
  const [scenario, setScenario] = useState("");

  const handleGenerate = (newScenario: string) => {
    setScenario(newScenario);
    setGeneratorState('loading');
    
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratorState('result');
    }, 3000);
  };

  const handleStartOver = () => {
    setScenario("");
    setGeneratorState('input');
  };

  return (
    <div className="pt-20">
      <AnimatePresence mode="wait">
        {generatorState === 'input' && (
          <InputState key="input" onGenerate={handleGenerate} />
        )}
        
        {generatorState === 'loading' && (
          <LoadingState key="loading" />
        )}
        
        {generatorState === 'result' && (
          <ResultState 
            key="result"
            scenario={scenario} 
            onStartOver={handleStartOver} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
