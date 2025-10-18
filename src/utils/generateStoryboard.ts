import { storyBlueprints } from "../data/storyBlueprints";
import type {
  GeneratedStoryboard,
  MatchConfidence,
  StoryBlueprint,
} from "../types/story";

const confidenceLabelMap: Record<number, MatchConfidence> = {
  0: "low",
  1: "low",
  2: "medium",
};

const getConfidence = (matchCount: number): MatchConfidence => {
  if (matchCount >= 3) {
    return "high";
  }

  return confidenceLabelMap[matchCount] ?? "low";
};

const buildSummary = (
  blueprint: StoryBlueprint,
  scenario: string,
  matchedKeywords: string[],
): string => {
  const trimmedScenario = scenario.trim();

  if (!trimmedScenario) {
    return blueprint.summary;
  }

  const intro = blueprint.summary;
  const scenarioLine = `Ваш промпт: "${trimmedScenario}".`;

  if (matchedKeywords.length === 0) {
    return `${intro} Мы адаптировали сюжет под вашу идею. ${scenarioLine}`;
  }

  return `${intro} Ключевые темы вашего промпта (${matchedKeywords.join(", ")}) помогли уточнить акценты истории. ${scenarioLine}`;
};

export const generateStoryboard = (scenario: string): GeneratedStoryboard => {
  const normalizedScenario = scenario.toLowerCase();

  const scoredBlueprints = storyBlueprints.map((blueprint) => {
    const matchedKeywords = blueprint.themeKeywords.filter((keyword) =>
      normalizedScenario.includes(keyword.toLowerCase()),
    );

    return {
      blueprint,
      matchedKeywords,
    };
  });

  const bestMatch = scoredBlueprints.reduce((best, current) => {
    if (!best) {
      return current;
    }

    if (current.matchedKeywords.length > best.matchedKeywords.length) {
      return current;
    }

    return best;
  }, scoredBlueprints[0]);

  const hasStrongMatch = bestMatch.matchedKeywords.length > 0;
  const chosenBlueprint = hasStrongMatch
    ? bestMatch.blueprint
    : storyBlueprints[Math.floor(Math.random() * storyBlueprints.length)];

  const matchedKeywords = hasStrongMatch ? bestMatch.matchedKeywords : [];
  const matchConfidence = getConfidence(matchedKeywords.length);

  return {
    blueprintId: chosenBlueprint.id,
    title: chosenBlueprint.title,
    scenario,
    summary: buildSummary(chosenBlueprint, scenario, matchedKeywords),
    storyboardImage: chosenBlueprint.storyboardImage,
    frames: chosenBlueprint.frames.map((frame) => ({ ...frame })),
    matchedKeywords,
    matchConfidence,
    generatedAt: new Date().toISOString(),
  };
};
