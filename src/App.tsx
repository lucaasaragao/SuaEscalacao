import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

type Player = {
  id: number;
  name: string;
  position: string;
  photo?: string;
};

const players: Player[] = [
  // GOLEIROS
  { id: 1, name: "Alisson", position: "GK", photo: "https://www.ogol.com.br/img/jogadores/14/95614_med_alisson_becker.png" },
  { id: 2, name: "Ederson", position: "GK", photo: "https://www.ogol.com.br/img/jogadores/16/210516_med_ederson_moraes.png" },
  { id: 3, name: "Bento", position: "GK", photo: "https://www.ogol.com.br/img/jogadores/73/743273_med_bento.png" },
  { id: 32, name: "Hugo Souza", position: "GK", photo: "https://www.ogol.com.br/img/jogadores/74/630374_med_hugo_souza.png" },

  // ZAGUEIROS
  { id: 4, name: "Marquinhos", position: "CB", photo: "https://www.ogol.com.br/img/jogadores/67/184167_med_marquinhos.png" },
  { id: 5, name: "Militão", position: "CB", photo: "https://www.ogol.com.br/img/jogadores/55/456955_med_eder_militao.png" },
  { id: 6, name: "Gabriel Magalhães", position: "CB", photo: "https://www.ogol.com.br/img/jogadores/22/491122_med_gabriel_magalhaes.png" },
  { id: 7, name: "Bremer", position: "CB", photo: "https://www.ogol.com.br/img/jogadores/28/563428_med_bremer.png" },
  { id: 34, name: "Fabrício Bruno", position: "CB", photo: "https://www.ogol.com.br/img/jogadores/07/439707_med_fabricio_bruno.png" },

  // LATERAIS
  { id: 8, name: "Danilo", position: "RB", photo: "https://www.ogol.com.br/img/jogadores/84/101484_med_danilo.png" },
  { id: 9, name: "Vanderson", position: "RB", photo: "https://www.ogol.com.br/img/jogadores/85/842185_med_vanderson.png" },
  { id: 11, name: "Guilherme Arana", position: "LB", photo: "https://www.ogol.com.br/img/jogadores/22/313322_med_guilherme_arana.png" },

  // MEIO-CAMPO
  { id: 12, name: "Casemiro", position: "CM", photo: "https://www.ogol.com.br/img/jogadores/94/133194_med_casemiro.png" },
  { id: 13, name: "Bruno Guimarães", position: "CM", photo: "https://www.ogol.com.br/img/jogadores/26/563826_med_bruno_guimaraes.png" },
  { id: 16, name: "Lucas Paquetá", position: "CAM", photo: "https://www.ogol.com.br/img/jogadores/74/451474_med_lucas_paqueta.png" },
  { id: 17, name: "Raphael Veiga", position: "CAM", photo: "https://www.ogol.com.br/img/jogadores/24/311924_med_raphael_veiga.png" },
  { id: 45, name: "Andreas Pereira", position: "CM", photo: "https://www.ogol.com.br/img/jogadores/80/282380_med_andreas_pereira.png" },

  // ATACANTES
  { id: 18, name: "Neymar", position: "LW", photo: "https://www.ogol.com.br/img/jogadores/51/66051_med_neymar.png" },
  { id: 19, name: "Vinicius Jr", position: "LW", photo: "https://www.ogol.com.br/img/jogadores/37/547737_med_vinicius_junior.png" },
  { id: 20, name: "Rodrygo", position: "RW", photo: "https://www.ogol.com.br/img/jogadores/32/581232_med_rodrygo.png" },
  { id: 21, name: "Raphinha", position: "RW", photo: "https://www.ogol.com.br/img/jogadores/92/481192_med_raphinha.png" },
  { id: 24, name: "Endrick", position: "ST", photo: "https://www.ogol.com.br/img/jogadores/33/829333_med_endrick.png" },
  { id: 27, name: "Gabriel Martinelli", position: "LW", photo: "https://www.ogol.com.br/img/jogadores/85/634485_med_gabriel_martinelli.png" },
  { id: 43, name: "Luiz Henrique", position: "RW", photo: "https://www.ogol.com.br/img/jogadores/06/748706_med_luiz_henrique.png" },
  { id: 44, name: "Igor Jesus", position: "ST", photo: "https://www.ogol.com.br/img/jogadores/70/650970_med_igor_jesus.png" },
  { id: 35, name: "Estêvão", position: "RW", photo: "https://www.ogol.com.br/img/jogadores/62/1004462_med_estevao.png" }
];

const players2: Player[] = [
  // GOLEIROS
  { id: 1, name: "Alisson", position: "GK", photo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Alisson_Becker_%281%29_%28cropped%29.jpg" },
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
  { id: 16, name: "Lucas Paquetá", position: "CAM", photo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Lucas_Paquet%C3%A1_2023.jpg" },
  { id: 17, name: "Raphael Veiga", position: "CAM" },

  // ATACANTES
  { id: 18, name: "Neymar", position: "LW", photo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_PSG_2_%28cropped%29.jpg" },
  { id: 19, name: "Vinicius Jr", position: "LW", photo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Vin%C3%ADcius_J%C3%BAnior_2023.jpg" },
  { id: 20, name: "Rodrygo", position: "RW" },
  { id: 21, name: "Raphinha", position: "RW" },
  { id: 22, name: "Richarlison", position: "ST" },
  { id: 23, name: "Gabriel Jesus", position: "ST" },
  { id: 24, name: "Endrick", position: "ST" },

  // ADICIONADOS A PARTIR DO RESUMO
  { id: 25, name: "Léo Pereira", position: "CB" },
  { id: 26, name: "Gabriel Sara", position: "CM" },
  { id: 27, name: "Gabriel Martinelli", position: "LW" },
  { id: 28, name: "João Pedro", position: "ST" },
  { id: 29, name: "Matheus Cunha", position: "ST" },
  { id: 30, name: "Igor Thiago", position: "ST" },
  { id: 31, name: "Rayan", position: "RW" },

  // CONVOCAÇÕES ANTERIORES
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

function getPlayerPhoto(player: Player) {
  if (player.photo) return player.photo;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    player.name
  )}&background=222831&color=00d26a&size=128&bold=true`;
}

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

  const fieldRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare() {
    if (!fieldRef.current) return;
    setIsSharing(true);
    try {
      const canvas = await html2canvas(fieldRef.current, {
        backgroundColor: "#09101c",
        scale: 2, // Maior qualidade
        useCORS: true, // Permite carregar as imagens externas da Wikipedia e ui-avatars
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "minha-escalacao-copa.png";
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      alert("Não foi possível gerar a imagem para compartilhamento.");
    } finally {
      setIsSharing(false);
    }
  }

  function assignPlayer(position: string) {
    if (selectedPlayer) {
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

    setFilterPosition(null);
    setSelectedPlayer(null);
  }

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

  function handleAddButtonClick(slotKey: string) {
    const occupied = (lineup as any)[slotKey];
    if (occupied) {
      setLineup((prev) => ({
        ...prev,
        [slotKey]: null,
      }));
      return;
    }
    const pos = mapSlotToPosition(slotKey);
    if (pos) setFilterPosition(pos);
  }

  // Componente interno para não repetir a renderização de cada slot
  const renderSlot = (slotKey: string, extraClasses: string) => {
    const player = (lineup as any)[slotKey] as Player | null;

    return (
      <div
        className={`player-slot ${extraClasses} ${player ? "assigned" : "empty"}`}
        onClick={() => handleSlotClick(slotKey)}
      >
        {player ? (
          <>
            <img
              src={getPlayerPhoto(player)}
              alt={player.name}
              className="slot-photo"
              crossOrigin="anonymous"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  player.name
                )}&background=222831&color=00d26a&size=128&bold=true`;
              }}
            />
            <span className="slot-name-bg">{player.name}</span>
          </>
        ) : (
          ""
        )}
        {!isSharing && (
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAddButtonClick(slotKey);
            }}
            aria-label={player ? `Remover ${player.name}` : `Adicionar jogador ${slotKey}`}
          >
            {player ? "×" : "+"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="app-header">
        <h1>Sua escalação</h1>
        <div className="header-controls">
          <label htmlFor="formation" style={{ marginRight: 8, display: "none" }}>
            Formação
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
          <button
            onClick={handleShare}
            className="btn-share"
            disabled={isSharing}
          >
            {isSharing ? "Gerando..." : "Compartilhar Escalação"}
          </button>
        </div>
      </div>

      <div className="content">
        {/* CAMPO */}
        <div className={`field formation-${formation}`} ref={fieldRef}>
          <div className="pitch-area-top" />
          <div className="pitch-circle" />
          <div className="pitch-area-bottom" />
          <div className="pitch">
            <div className="row attack">
              {renderSlot("LW", "lw")}
              {renderSlot("ST", "st")}
              {renderSlot("RW", "rw")}
            </div>

            <div className="row midfield">
              {renderSlot("CM1", "cm1")}
              {renderSlot("CAM", "cam")}
              {renderSlot("CM2", "cm2")}
            </div>

            <div className="row defense">
              {renderSlot("LB", "lb")}
              {renderSlot("CB1", "cb1")}
              {renderSlot("CB2", "cb2")}
              {renderSlot("RB", "rb")}
            </div>

            <div className="row goal">
              {renderSlot("GK", "gk")}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="panel">
            <h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Posições
            </h2>
            <div className="positions-list">
              {(() => {
                const positions = [
                  { key: "GK", label: "Goleiro" },
                  { key: "CB", label: "Zagueiro" },
                  { key: "LB", label: "Lateral Esquerdo" },
                  { key: "RB", label: "Lateral Direito" },
                  { key: "CM", label: "Meio-campo" },
                  { key: "CAM", label: "Meio Ofensivo" },
                  { key: "LW", label: "Ponta Esquerda" },
                  { key: "RW", label: "Ponta Direita" },
                  { key: "ST", label: "Atacante" },
                ];

                return positions.map((pos) => (
                  <div
                    key={pos.key}
                    className={`list-item ${filterPosition === pos.key ? "selected" : ""}`}
                    onClick={() => setFilterPosition(filterPosition === pos.key ? null : pos.key)}
                  >
                    {pos.label}
                    {filterPosition === pos.key && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </div>
                ));
              })()}
            </div>

            <div className={`players-panel ${filterPosition ? "open" : ""}`}>
              <div className="players-panel-header">
                <h2>
                  {(() => {
                    const dict: Record<string, string> = {
                      GK: "Goleiros", CB: "Zagueiros", LB: "Laterais Esq.", RB: "Laterais Dir.",
                      CM: "Meio-campo", CAM: "Meias Of.", LW: "Pontas Esq.", RW: "Pontas Dir.", ST: "Atacantes"
                    };
                    return filterPosition ? dict[filterPosition] : "Jogadores";
                  })()}
                </h2>
                <button
                  className="btn-close"
                  onClick={() => setFilterPosition(null)}
                  aria-label="Fechar opções de jogadores"
                >
                  ×
                </button>
              </div>

              <div className="player-list">
                {players
                  .filter((p) => filterPosition ? p.position === filterPosition : false)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="player-card"
                      onClick={() => autoAssignPlayer(p)}
                    >
                      <img
                        src={getPlayerPhoto(p)}
                        alt={p.name}
                        className="list-player-photo"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            p.name
                          )}&background=222831&color=00d26a&size=128&bold=true`;
                        }}
                      />
                      <div className="player-card-info">
                        <strong>{p.name}</strong>
                        <span>{p.position}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;