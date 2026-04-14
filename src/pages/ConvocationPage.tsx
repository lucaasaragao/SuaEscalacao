import { useState, useEffect, useCallback } from "react";
import { convocationPlayers } from "../data/convocation-players";
import type { ConvocationPlayer } from "../data/convocation-players";
import { calculateMood } from "../utils/moodCalculator";
import { getPlayerGroup, countByGroup, GROUP_QUOTAS, GROUP_META, GROUP_ORDER } from "../utils/positionGroups";
import type { ConvocationGroup } from "../utils/positionGroups";
import { CoachMood } from "../components/convocation/CoachMood";
import { PlayerCard } from "../components/convocation/PlayerCard";
import { SquadPanel } from "../components/convocation/SquadPanel";

const MAX_SQUAD = 26;
type FilterKey = "ALL" | ConvocationGroup;

type Props = {
  selected: ConvocationPlayer[];
  onSelectionChange: (players: ConvocationPlayer[]) => void;
  onGoToLineup: () => void;
};

export function ConvocationPage({ selected, onSelectionChange, onGoToLineup }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [search, setSearch] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);

  const selectedIds = new Set(selected.map((p) => p.id));
  const groupCounts = countByGroup(selected);

  const moodResult = calculateMood(selected.map((p) => p.callStatus));

  useEffect(() => {
    if (selected.length === MAX_SQUAD && !celebrationShown) {
      setCelebrationShown(true);
      triggerConfetti();
    }
    if (selected.length < MAX_SQUAD) setCelebrationShown(false);
  }, [selected.length, celebrationShown]);

  async function triggerConfetti() {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 180, spread: 80, origin: { y: 0.5 }, colors: ["#009C3B", "#FFDF00", "#002776", "#fff"] });
      setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ["#009C3B", "#FFDF00", "#002776"] });
        confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ["#009C3B", "#FFDF00", "#002776"] });
      }, 350);
    } catch {/* not available */}
  }

  const handleToggle = useCallback((player: ConvocationPlayer) => {
    const isIn = selected.some((p) => p.id === player.id);

    if (isIn) {
      // Remove player
      onSelectionChange(selected.filter((p) => p.id !== player.id));
      return;
    }

    // Guard: total limit
    if (selected.length >= MAX_SQUAD) return;

    // Guard: group quota
    const group = getPlayerGroup(player.position);
    if (groupCounts[group] >= GROUP_QUOTAS[group]) return;

    onSelectionChange([...selected, player]);
  }, [selected, groupCounts, onSelectionChange]);

  const handleRemove = useCallback((id: number) => {
    onSelectionChange(selected.filter((p) => p.id !== id));
  }, [selected, onSelectionChange]);

  // Filter players by PRIMARY group (prevents duplicates across filters)
  // + optional search
  const filteredPlayers = convocationPlayers.filter((p) => {
    const group = getPlayerGroup(p.position);
    const matchesGroup = activeFilter === "ALL" || group === activeFilter;
    const matchesSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.club && p.club.toLowerCase().includes(search.toLowerCase()));
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="conv-page">
      {/* TOP SECTION */}
      <div className="conv-top-section">
        <CoachMood moodResult={moodResult} selectedCount={selected.length} />
        <SquadPanel
          selected={selected}
          onRemove={handleRemove}
          isSharing={isSharing}
          setIsSharing={setIsSharing}
          groupCounts={groupCounts}
        />
      </div>

      {/* COMPLETE BANNER */}
      {selected.length === MAX_SQUAD && (
        <div className="conv-complete-banner">
          <span>🏆</span>
          <p><strong>Convocação completa!</strong> Sua seleção está pronta.</p>
          <button className="btn-go-lineup" onClick={onGoToLineup}>⚽ Ver no Campo →</button>
        </div>
      )}

      {/* FILTERS com cotas */}
      <div className="conv-filters">
        <div className="conv-filter-tabs">
          {/* ALL */}
          <button
            className={`conv-filter-btn ${activeFilter === "ALL" ? "conv-filter-active" : ""}`}
            onClick={() => { setActiveFilter("ALL"); setSearch(""); }}
          >
            Todos
            <span className="conv-filter-quota">{selected.length}/{MAX_SQUAD}</span>
          </button>

          {/* Per group */}
          {GROUP_ORDER.map((gKey) => {
            const meta = GROUP_META[gKey];
            const quota = GROUP_QUOTAS[gKey];
            const count = groupCounts[gKey];
            const full = count >= quota;
            return (
              <button
                key={gKey}
                className={`conv-filter-btn ${activeFilter === gKey ? "conv-filter-active" : ""} ${full ? "conv-filter-full" : ""}`}
                onClick={() => { setActiveFilter(gKey); setSearch(""); }}
              >
                {meta.icon} {meta.label}
                <span className={`conv-filter-quota ${full ? "quota-full" : ""}`}>
                  {count}/{quota}
                </span>
              </button>
            );
          })}
        </div>

        <input
          className="conv-search-input"
          type="search"
          placeholder="🔍 Buscar jogador ou clube..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); if (e.target.value) setActiveFilter("ALL"); }}
        />
      </div>

      {/* PLAYER GRID */}
      <div className="conv-player-grid">
        {filteredPlayers.length === 0 ? (
          <div className="conv-empty-state">Nenhum jogador encontrado</div>
        ) : (
          filteredPlayers.map((player) => {
            const isSelected = selectedIds.has(player.id);
            const group = getPlayerGroup(player.position);
            const groupFull = groupCounts[group] >= GROUP_QUOTAS[group];
            const isDisabled = !isSelected && (selected.length >= MAX_SQUAD || groupFull);
            return (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={isSelected}
                onToggle={handleToggle}
                disabled={isDisabled}
                groupFull={!isSelected && groupFull}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
