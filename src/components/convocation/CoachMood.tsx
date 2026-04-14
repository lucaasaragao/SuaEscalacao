import { useMemo } from "react";
import type { MoodResult } from "../../utils/moodCalculator";

type Props = {
  moodResult: MoodResult;
  selectedCount: number;
};

export function CoachMood({ moodResult, selectedCount }: Props) {
  const { emoji, title, subtitle, score, barColor } = moodResult;

  const coachEmoji = useMemo(() => {
    if (score >= 80) return "🤩";
    if (score >= 60) return "😄";
    if (score >= 40) return "😐";
    if (score >= 20) return "🤨";
    return "😤";
  }, [score]);

  return (
    <div className="coach-mood-card">
      <div className="coach-avatar-wrapper">
        <div
          className={`coach-emoji-face mood-${moodResult.mood}`}
          key={moodResult.mood} // force re-mount animation on mood change
        >
          {coachEmoji}
        </div>
        <div className="coach-title-badge">O Professor</div>
      </div>

      <div className="coach-mood-info">
        <div className="mood-header">
          <span className="mood-emoji-small">{emoji}</span>
          <span className="mood-title">{title}</span>
        </div>
        <p className="mood-subtitle">{subtitle}</p>

        <div className="mood-bar-wrapper">
          <div className="mood-bar-labels">
            <span>😤 Bravo</span>
            <span>😄 Feliz</span>
          </div>
          <div className="mood-bar-track">
            <div
              className="mood-bar-fill"
              style={{
                width: `${score}%`,
                background: `linear-gradient(90deg, #ef4444, ${barColor})`,
              }}
            />
            <div
              className="mood-bar-thumb"
              style={{ left: `calc(${score}% - 10px)` }}
            />
          </div>
          <div className="mood-score-label">{score}/100</div>
        </div>

        <div className="squad-count-badge">
          <span className={`count-number ${selectedCount === 26 ? "count-complete" : ""}`}>
            {selectedCount}
          </span>
          <span className="count-slash">/26</span>
          <span className="count-label">convocados</span>
          {selectedCount === 26 && <span className="count-trophy">🏆</span>}
        </div>
      </div>
    </div>
  );
}
