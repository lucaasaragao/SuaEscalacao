import { useState } from "react";
import "./App.css";

type Player = {
  id: number;
  name: string;
  position: string;
};

const players: Player[] = [
  // GOLEIROS
  { id: 1, name: "Alisson", position: "GK" },
  { id: 2, name: "Ederson", position: "GK" },
  { id: 3, name: "Bento", position: "GK" },

  // ZAGUEIROS
  { id: 4, name: "Marquinhos", position: "CB" },
  { id: 5, name: "Militão", position: "CB" },
  { id: 6, name: "Gabriel Magalhães", position: "CB" },
  { id: 7, name: "Bremer", position: "CB" },

  // LATERAIS
  { id: 8, name: "Danilo", position: "RB" },
  { id: 9, name: "Vanderson", position: "RB" },
  { id: 10, name: "Renan Lodi", position: "LB" },
  { id: 11, name: "Guilherme Arana", position: "LB" },

  // MEIO-CAMPO
  { id: 12, name: "Casemiro", position: "CM" },
  { id: 13, name: "Bruno Guimarães", position: "CM" },
  { id: 14, name: "Douglas Luiz", position: "CM" },
  { id: 15, name: "Joelinton", position: "CM" },
  { id: 16, name: "Lucas Paquetá", position: "CAM" },
  { id: 17, name: "Raphael Veiga", position: "CAM" },

  // ATACANTES
  { id: 18, name: "Neymar", position: "LW" },
  { id: 19, name: "Vinicius Jr", position: "LW" },
  { id: 20, name: "Rodrygo", position: "RW" },
  { id: 21, name: "Raphinha", position: "RW" },
  { id: 22, name: "Richarlison", position: "ST" },
  { id: 23, name: "Gabriel Jesus", position: "ST" },
  { id: 24, name: "Endrick", position: "ST" },

  // ADICIONADOS A PARTIR DO RESUMO (novidades e convocações recentes)
  { id: 25, name: "Léo Pereira", position: "CB" },
  { id: 26, name: "Gabriel Sara", position: "CM" },
  { id: 27, name: "Gabriel Martinelli", position: "LW" },
  { id: 28, name: "João Pedro", position: "ST" },
  { id: 29, name: "Matheus Cunha", position: "ST" },
  { id: 30, name: "Igor Thiago", position: "ST" },
  { id: 31, name: "Rayan", position: "RW" },

  // nomes frequentemente mencionados / convocações anteriores
  { id: 32, name: "Hugo Souza", position: "GK" },
  { id: 33, name: "Caio Henrique", position: "LB" },
  { id: 34, name: "Fabrício Bruno", position: "CB" },
  { id: 35, name: "Estêvão", position: "LW" },
  { id: 36, name: "Savinho", position: "RW" },
  { id: 37, name: "Vitor Roque", position: "ST" },
  { id: 38, name: "Kaio Jorge", position: "ST" },
  { id: 39, name: "Rafael Pires", position: "GK" },
  { id: 40, name: "Léo Jardim", position: "GK" },
];

type Lineup = {
  [key: string]: Player | null;
};

const initialLineup: Lineup = {
  GK: null,
  LB: null,
  CB1: null,
  CB2: null,
  RB: null,
  CM1: null,
  CM2: null,
  CAM: null,
  LW: null,
  ST: null,
  RW: null,
};

function App() {
  const [lineup, setLineup] = useState<Lineup>(initialLineup);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [formation, setFormation] = useState<string>("433");

  function assignPlayer(position: string) {
    // Se houver um jogador selecionado -> atribui normalmente
    if (selectedPlayer) {
      // validação simples
      if (
        (position === "GK" && selectedPlayer.position !== "GK") ||
        (position === "ST" && selectedPlayer.position !== "ST")
      ) {
        alert("Posição inválida!");
        return;
      }

      setLineup((prev) => ({
        ...prev,
        [position]: selectedPlayer,
      }));

      setSelectedPlayer(null);
      return;
    }
  }

  // tenta atribuir o jogador automaticamente à primeira vaga vazia correspondente
  function autoAssignPlayer(player: Player) {
    const pos = player.position;

    const slotOrder: Record<string, string[]> = {
      GK: ["GK"],
      CB: ["CB1", "CB2"],
      LB: ["LB"],
      RB: ["RB"],
      CM: ["CM1", "CM2"],
      CAM: ["CAM"],
      LW: ["LW"],
      RW: ["RW"],
      ST: ["ST"],
    };

    const candidates = slotOrder[pos] || [];

    setLineup((prev) => {
      const slot = candidates.find((k) => !prev[k]);
      if (!slot) {
        window.alert(`Nenhuma vaga disponível para ${pos}`);
        return prev;
      }
      return {
        ...prev,
        [slot]: player,
      };
    });

    // fecha o painel de posições e limpa seleção
    setFilterPosition(null);
    setSelectedPlayer(null);
  }

  // mapeia chaves de slot (CB1, CM2, etc) para a posição usada no filtro (CB, CM, CAM...)
  function mapSlotToPosition(slot: string) {
    if (slot.startsWith("CB")) return "CB";
    if (slot.startsWith("CM")) return "CM";
    if (slot === "GK") return "GK";
    if (slot === "LB") return "LB";
    if (slot === "RB") return "RB";
    if (slot === "CAM") return "CAM";
    if (slot === "LW") return "LW";
    if (slot === "RW") return "RW";
    if (slot === "ST") return "ST";
    return "";
  }

  // chama quando o usuário clica em um slot do campo
  function handleSlotClick(slotKey: string) {
    if (selectedPlayer) {
      assignPlayer(slotKey);
      return;
    }
    const pos = mapSlotToPosition(slotKey);
    if (pos) {
      setFilterPosition((prev) => (prev === pos ? null : pos));
    }
  }

  // chama quando o usuário clica no botão dentro do slot (add/remove)
  function handleAddButtonClick(slotKey: string) {
    const occupied = (lineup as any)[slotKey];
    if (occupied) {
      // remove jogador da vaga
      setLineup((prev) => ({
        ...prev,
        [slotKey]: null,
      }));
      return;
    }
    // se vazio, abre painel filtrado pela posição
    const pos = mapSlotToPosition(slotKey);
    if (pos) setFilterPosition(pos);
  }

  return (
    <div className="container">
      <div className="app-header">
        <h1>Sua escalação</h1>
        <div className="header-controls">
          <label htmlFor="formation" style={{ marginRight: 8 }}>
            Esquema tático
          </label>
          <select
            id="formation"
            value={formation}
            onChange={(e) => setFormation(e.target.value)}
          >
            <option value="433">4-3-3</option>
            <option value="4231">4-2-3-1</option>
            <option value="442">4-4-2</option>
          </select>
        </div>
      </div>

      <div className="content">
        {/* CAMPO */}
        <div className={`field formation-${formation}`}>
          <div className="pitch">
            {/* attack row */}
            <div className="row attack">
              <div className={`player-slot lw ${lineup.LW ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("LW")}>
                {lineup.LW ? lineup.LW.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("LW"); }} aria-label={lineup.LW ? `Remover ${lineup.LW.name}` : "Adicionar jogador LW"}>{lineup.LW ? '×' : '+'}</button>
              </div>
              <div className={`player-slot st ${lineup.ST ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("ST")}>
                {lineup.ST ? lineup.ST.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("ST"); }} aria-label={lineup.ST ? `Remover ${lineup.ST.name}` : "Adicionar jogador ST"}>{lineup.ST ? '×' : '+'}</button>
              </div>
              <div className={`player-slot rw ${lineup.RW ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("RW")}>
                {lineup.RW ? lineup.RW.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("RW"); }} aria-label={lineup.RW ? `Remover ${lineup.RW.name}` : "Adicionar jogador RW"}>{lineup.RW ? '×' : '+'}</button>
              </div>
            </div>

            {/* midfield row */}
            <div className="row midfield">
              <div className={`player-slot cm1 ${lineup.CM1 ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("CM1")}>
                {lineup.CM1 ? lineup.CM1.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("CM1"); }} aria-label={lineup.CM1 ? `Remover ${lineup.CM1.name}` : "Adicionar jogador CM1"}>{lineup.CM1 ? '×' : '+'}</button>
              </div>
              <div className={`player-slot cam ${lineup.CAM ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("CAM")}>
                {lineup.CAM ? lineup.CAM.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("CAM"); }} aria-label={lineup.CAM ? `Remover ${lineup.CAM.name}` : "Adicionar jogador CAM"}>{lineup.CAM ? '×' : '+'}</button>
              </div>
              <div className={`player-slot cm2 ${lineup.CM2 ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("CM2")}>
                {lineup.CM2 ? lineup.CM2.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("CM2"); }} aria-label={lineup.CM2 ? `Remover ${lineup.CM2.name}` : "Adicionar jogador CM2"}>{lineup.CM2 ? '×' : '+'}</button>
              </div>
            </div>

            {/* defense row */}
            <div className="row defense">
              <div className={`player-slot lb ${lineup.LB ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("LB")}>
                {lineup.LB ? lineup.LB.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("LB"); }} aria-label={lineup.LB ? `Remover ${lineup.LB.name}` : "Adicionar jogador LB"}>{lineup.LB ? '×' : '+'}</button>
              </div>
              <div className={`player-slot cb1 ${lineup.CB1 ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("CB1")}>
                {lineup.CB1 ? lineup.CB1.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("CB1"); }} aria-label={lineup.CB1 ? `Remover ${lineup.CB1.name}` : "Adicionar jogador CB1"}>{lineup.CB1 ? '×' : '+'}</button>
              </div>
              <div className={`player-slot cb2 ${lineup.CB2 ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("CB2")}>
                {lineup.CB2 ? lineup.CB2.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("CB2"); }} aria-label={lineup.CB2 ? `Remover ${lineup.CB2.name}` : "Adicionar jogador CB2"}>{lineup.CB2 ? '×' : '+'}</button>
              </div>
              <div className={`player-slot rb ${lineup.RB ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("RB")}>
                {lineup.RB ? lineup.RB.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("RB"); }} aria-label={lineup.RB ? `Remover ${lineup.RB.name}` : "Adicionar jogador RB"}>{lineup.RB ? '×' : '+'}</button>
              </div>
            </div>

            {/* goalkeeper row */}
            <div className="row goal">
              <div className={`player-slot gk ${lineup.GK ? 'assigned' : 'empty'}`} onClick={() => handleSlotClick("GK")}>
                {lineup.GK ? lineup.GK.name : ""}
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddButtonClick("GK"); }} aria-label={lineup.GK ? `Remover ${lineup.GK.name}` : "Adicionar jogador GK"}>{lineup.GK ? '×' : '+'}</button>
              </div>
            </div>
          </div>
        </div>

        {/* POSIÇÕES e JOGADORES FILTRADOS */}
        <div
          className="players"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            position: "relative",
            minHeight: 1,
          }}
        >
          {/* coluna esquerda: posições */}
          <div style={{ width: 240 }}>
            <h2>Posições</h2>
            {/* lista de posições que o usuário pode filtrar */}
            {(() => {
              const positions = [
                { key: "GK", label: "Goleiro" },
                { key: "CB", label: "Zagueiro" },
                { key: "LB", label: "Lateral Esquerdo" },
                { key: "RB", label: "Lateral Direito" },
                { key: "CM", label: "Meio-campo" },
                { key: "CAM", label: "Meia (CAM)" },
                { key: "LW", label: "Ponta Esquerda (LW)" },
                { key: "RW", label: "Ponta Direita (RW)" },
                { key: "ST", label: "Atacante (ST)" },
              ];

              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {positions.map((pos) => (
                    <div
                      key={pos.key}
                      className={`player-card ${
                        filterPosition === pos.key ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFilterPosition(
                          filterPosition === pos.key ? null : pos.key
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {pos.label}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* coluna direita: jogadores filtrados */}
          {filterPosition && (
            <div
              style={{
                position: "absolute",
                left: 260,
                top: 0,
                width: 360,
              }}
            >
              <h2>Jogadores</h2>
              <div>
                <h3>
                  {(() => {
                    const positions = [
                      { key: "GK", label: "Goleiro" },
                      { key: "CB", label: "Zagueiro" },
                      { key: "LB", label: "Lateral Esquerdo" },
                      { key: "RB", label: "Lateral Direito" },
                      { key: "CM", label: "Meio-campo" },
                      { key: "CAM", label: "Meia (CAM)" },
                      { key: "LW", label: "Ponta Esquerda (LW)" },
                      { key: "RW", label: "Ponta Direita (RW)" },
                      { key: "ST", label: "Atacante (ST)" },
                    ];
                    return positions.find((p) => p.key === filterPosition)
                      ?.label;
                  })()}
                </h3>

                <div className="player-list">
                  {players
                    .filter((p) => p.position === filterPosition)
                    .map((p) => (
                      <div
                        key={p.id}
                        className={`player-card ${
                          selectedPlayer?.id === p.id ? "selected" : ""
                        }`}
                        onClick={() => autoAssignPlayer(p)}
                      >
                        <strong>{p.name}</strong>
                        <span>{p.position}</span>
                      </div>
                    ))}
                </div>

                <div style={{ marginTop: 8 }}>
                  <button
                    className="btn-close"
                    onClick={() => setFilterPosition(null)}
                    aria-label="Fechar opções de jogadores"
                  >
                    × Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;