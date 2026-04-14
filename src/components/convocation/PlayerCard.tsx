import type { ConvocationPlayer } from "../../data/convocation-players";
import { callStatusLabels } from "../../data/convocation-players";
import { getPlayerGroup, GROUP_META, GROUP_QUOTAS } from "../../utils/positionGroups";

type Props = {
  player: ConvocationPlayer;
  isSelected: boolean;
  onToggle: (player: ConvocationPlayer) => void;
  disabled: boolean;
  groupFull: boolean;
};

function getFallbackAvatar(name: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() || "??";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128"><rect width="128" height="128" fill="#16a34a"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="50" font-family="sans-serif" font-weight="bold">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function PlayerCard({ player, isSelected, onToggle, disabled, groupFull }: Props) {
  const status = callStatusLabels[player.callStatus];
  const group = getPlayerGroup(player.position);
  const groupMeta = GROUP_META[group];
  const groupQuota = GROUP_QUOTAS[group];

  return (
    <div
      className={`conv-player-card ${isSelected ? "conv-selected" : ""} ${disabled ? "conv-disabled" : ""}`}
      onClick={() => !disabled && onToggle(player)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => e.key === "Enter" && !disabled && onToggle(player)}
      aria-label={`${isSelected ? "Dispensar" : "Convocar"} ${player.name}`}
      aria-pressed={isSelected}
    >
      <div className="conv-card-photo-wrap">
        <img
          src={player.photo || getFallbackAvatar(player.name)}
          alt={player.name}
          className="conv-card-photo"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getFallbackAvatar(player.name);
          }}
        />
        {isSelected && (
          <div className="conv-card-selected-overlay">✓</div>
        )}
      </div>

      <div className="conv-card-info">
        <strong className="conv-card-name">{player.name}</strong>
        <span className="conv-card-position">
          {groupMeta.icon} {groupMeta.label}
        </span>
        {player.club && <span className="conv-card-club">{player.club}</span>}
      </div>

      <div className="conv-card-right">
        <span className="conv-status-badge" style={{ color: status.color }}>
          {status.emoji} {status.label}
        </span>

        {groupFull && !isSelected ? (
          <span className="conv-quota-full-msg">
            Cota cheia ({groupQuota}/{groupQuota})
          </span>
        ) : (
          <button
            className={`conv-action-btn ${isSelected ? "btn-dismiss" : "btn-call"}`}
            onClick={(e) => { e.stopPropagation(); !disabled && onToggle(player); }}
            disabled={disabled}
            tabIndex={-1}
          >
            {isSelected ? "Dispensar" : "Convocar"}
          </button>
        )}
      </div>
    </div>
  );
}
