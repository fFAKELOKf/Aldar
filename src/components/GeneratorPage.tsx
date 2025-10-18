import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { InputState } from "./InputState";
import { LoadingState } from "./LoadingState";
import { ResultState } from "./ResultState";
import { generateStoryboard } from "../utils/generateStoryboard";
import type { GeneratedStoryboard } from "../types/story";

type GeneratorState = 'input' | 'loading' | 'result';

export function GeneratorPage() {
  const [generatorState, setGeneratorState] = useState<GeneratorState>('input');
  const [scenario, setScenario] = useState("");
  const [generatedStory, setGeneratedStory] = useState<GeneratedStoryboard | null>(null);

  const handleGenerate = (newScenario: string) => {
    const trimmedScenario = newScenario.trim();

    if (!trimmedScenario) {
      return;
    }

    setScenario(trimmedScenario);
    setGeneratedStory(null);
    setGeneratorState('loading');

    // Simulate AI generation delay
    setTimeout(() => {
      const story = generateStoryboard(trimmedScenario);
      setGeneratedStory(story);
      setGeneratorState('result');
    }, 2200);
  };

  const handleStartOver = () => {
    setScenario("");
    setGeneratedStory(null);
    setGeneratorState('input');
  };

  return (
    <div className="pt-20">
      <AnimatePresence mode="wait">
        {generatorState === 'input' && (
          <InputState key="input" onGenerate={handleGenerate} />
        )}
        
        {generatorState === 'loading' && (
          <LoadingState key="loading" scenario={scenario} />
        )}

        {generatorState === 'result' && generatedStory && (
          <ResultState key="result" story={generatedStory} onStartOver={handleStartOver} />
        )}
      </AnimatePresence>
    </div>
  );
}
