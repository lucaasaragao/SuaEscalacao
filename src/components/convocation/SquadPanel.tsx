import type { ConvocationPlayer } from "../../data/convocation-players";
import { getPlayerGroup, GROUP_QUOTAS, GROUP_META, GROUP_ORDER } from "../../utils/positionGroups";
import type { ConvocationGroup } from "../../utils/positionGroups";
import html2canvas from "html2canvas";
import { useRef } from "react";

type Props = {
  selected: ConvocationPlayer[];
  onRemove: (id: number) => void;
  isSharing: boolean;
  setIsSharing: (v: boolean) => void;
  groupCounts: Record<ConvocationGroup, number>;
};

function getFallbackAvatar(name: string) {
  const initials = name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() || "??";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128"><rect width="128" height="128" fill="#16a34a"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="50" font-family="sans-serif" font-weight="bold">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function SquadPanel({ selected, onRemove, isSharing, setIsSharing, groupCounts }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Group players by their PRIMARY group (no duplicates)
  const grouped = GROUP_ORDER.reduce<Record<string, ConvocationPlayer[]>>((acc, g) => {
    acc[g] = selected.filter((p) => getPlayerGroup(p.position) === g);
    return acc;
  }, {});

  async function handleDownload() {
    if (!panelRef.current) return;
    setIsSharing(true);
    try {
      const canvas = await html2canvas(panelRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "minha-convocacao-copa.png";
      link.click();
    } catch {
      alert("Não foi possível gerar a imagem.");
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div className="squad-panel">
      <div className="squad-panel-header">
        <h2>🇧🇷 Minha Convocação</h2>
        <div className="squad-panel-count">
          <span className={selected.length === 26 ? "count-full" : ""}>{selected.length}/26</span>
        </div>
        <button className="btn-share" onClick={handleDownload} disabled={isSharing || selected.length === 0}>
          {isSharing ? "Gerando..." : "⬇ Baixar"}
        </button>
      </div>

      <div className="squad-panel-body" ref={panelRef}>
        {selected.length === 0 ? (
          <div className="squad-empty">
            <span>👆</span>
            <p>Convoque seus jogadores acima</p>
          </div>
        ) : (
          <div className="squad-groups">
            {GROUP_ORDER.map((gKey) => {
              const players = grouped[gKey];
              if (!players || players.length === 0) return null;
              const meta = GROUP_META[gKey];
              const quota = GROUP_QUOTAS[gKey];
              const count = groupCounts[gKey];
              return (
                <div key={gKey} className="squad-group">
                  <div className="squad-group-header">
                    <span className="squad-group-label">
                      {meta.icon} {meta.label}
                    </span>
                    <span className={`squad-group-count ${count >= quota ? "group-count-full" : ""}`}>
                      {count}/{quota}
                    </span>
                  </div>
                  <div className="squad-group-players">
                    {players.map((p) => (
                      <div key={p.id} className="squad-mini-card" title={p.name}>
                        <img
                          src={p.photo || getFallbackAvatar(p.name)}
                          alt={p.name}
                          className="squad-mini-photo"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getFallbackAvatar(p.name);
                          }}
                        />
                        <span className="squad-mini-name">{p.name.split(" ")[0]}</span>
                        {!isSharing && (
                          <button className="squad-mini-remove" onClick={() => onRemove(p.id)} aria-label={`Remover ${p.name}`}>
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {/* Empty slots */}
                    {!isSharing && Array.from({ length: quota - count }).map((_, i) => (
                      <div key={`empty-${i}`} className="squad-mini-card squad-mini-empty">
                        <div className="squad-mini-photo squad-mini-placeholder" />
                        <span className="squad-mini-name" style={{ color: "#cbd5e1" }}>—</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
