import type { CallStatus } from "../data/convocation-players";

export type CoachMood = "happy" | "neutral" | "skeptical" | "angry";

export type MoodResult = {
  mood: CoachMood;
  score: number; // 0-100
  emoji: string;
  title: string;
  subtitle: string;
  barColor: string;
};

const STATUS_WEIGHTS: Record<CallStatus, number> = {
  frequent: 10,
  occasional: 4,
  surprise: -6,
};

export function calculateMood(selectedStatuses: CallStatus[]): MoodResult {
  if (selectedStatuses.length === 0) {
    return {
      mood: "neutral",
      score: 50,
      emoji: "😐",
      title: "Aguardando...",
      subtitle: "Convoque os 26 jogadores",
      barColor: "#94a3b8",
    };
  }

  const rawScore = selectedStatuses.reduce(
    (acc, status) => acc + STATUS_WEIGHTS[status],
    0
  );

  // Max possible: 26 × 10 = 260 | Min: 26 × -6 = -156
  const maxRaw = selectedStatuses.length * STATUS_WEIGHTS.frequent;
  const minRaw = selectedStatuses.length * STATUS_WEIGHTS.surprise;
  const range = maxRaw - minRaw;

  // Normalize to 0-100
  const normalized = range === 0 ? 50 : Math.round(((rawScore - minRaw) / range) * 100);
  const score = Math.max(0, Math.min(100, normalized));

  if (score >= 80) {
    return {
      mood: "happy",
      score,
      emoji: "😄",
      title: "Fenomenal!",
      subtitle: "O professor aprova cada escolha!",
      barColor: "#00d26a",
    };
  }
  if (score >= 60) {
    return {
      mood: "neutral",
      score,
      emoji: "🙂",
      title: "Bom time!",
      subtitle: "O professor está confiante",
      barColor: "#4ade80",
    };
  }
  if (score >= 40) {
    return {
      mood: "neutral",
      score,
      emoji: "😐",
      title: "Razoável",
      subtitle: "O professor ainda não se convenceu",
      barColor: "#ffd800",
    };
  }
  if (score >= 20) {
    return {
      mood: "skeptical",
      score,
      emoji: "🤨",
      title: "Preocupante!",
      subtitle: "O professor levanta a sobrancelha",
      barColor: "#f97316",
    };
  }
  return {
    mood: "angry",
    score,
    emoji: "😤",
    title: "Que escalação é essa?!",
    subtitle: "O professor não aprova de jeito nenhum",
    barColor: "#ef4444",
  };
}
