import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import "./App.css";

type Player = {
  id: number;
  name: string;
  position: string | string[];
  photo?: string;
};

const players: Player[] = [
  // GOLEIROS
  { id: 1, name: "Alisson", position: "GK", photo: "/jogadores/95614_alisson_becker_20250815201322.png" },
  { id: 2, name: "Ederson", position: "GK", photo: "/jogadores/136885_ederson_moraes_20250618210458.png" },
  { id: 3, name: "Bento", position: "GK", photo: "/jogadores/548364_bento_20251228003543.png" },
  { id: 32, name: "Hugo Souza", position: "GK", photo: "/jogadores/569633_hugo_souza_20260327122905.jpg" },

  // ZAGUEIROS
  { id: 4, name: "Marquinhos", position: "CB", photo: "/jogadores/187757_marquinhos_20250326082619.png" },
  { id: 5, name: "Militão", position: ["CB", "RB"], photo: "/jogadores/484829_eder_militao_20240809095340.png" },
  { id: 6, name: "Gabriel Magalhães", position: "CB", photo: "/jogadores/499852_gabriel_magalhaes_20250928235227.png" },
  { id: 7, name: "Bremer", position: "CB", photo: "/jogadores/478428_bremer_20260104223359.png" },
  { id: 34, name: "Fabrício Bruno", position: "CB", photo: "/jogadores/494798_fabricio_bruno_20250828015118.jpg" },
  { id: 36, name: "Léo Ortiz", position: "CB", photo: "/jogadores/548794_leo_ortiz_20250617101351.png" },
  { id: 37, name: "Léo Pereira", position: "CB", photo: "/jogadores/375084_leo_pereira_20250330143245.png" },

  // LATERAIS
  { id: 8, name: "Danilo", position: ["RB", "CB"], photo: "/jogadores/91587_danilo_20250620224019.png" },
  { id: 9, name: "Wesley", position: "RB", photo: "/jogadores/742671_wesley_franca_20250905235600.png" },
  { id: 10, name: "Vanderson", position: "RB", photo: "/jogadores/725828_vanderson_20250817133649.png" },
  { id: 39, name: "Vitinho", position: "RB", photo: "/jogadores/547784_vitinho_20241201093508.jpg" },
  { id: 40, name: "Paulo Henrique", position: "RB", photo: "/jogadores/446961_paulo_henrique_20250530170507.png" },
  { id: 11, name: "Guilherme Arana", position: "LB", photo: "/jogadores/1431982_guilherme_arana_20260203104906.png" },
  { id: 41, name: "Alex Sandro", position: "LB", photo: "/jogadores/76601_alex_sandro_20250326083053.jpg" },
  { id: 42, name: "Douglas Santos", position: "LB", photo: "/jogadores/252432_douglas_santos_20260327120411.jpg" },
  { id: 46, name: "Caio Henrique", position: "LB", photo: "/jogadores/500317_caio_henrique_20250817132442.png" },
  { id: 38, name: "Luciano Juba", position: "LB", photo: "/jogadores/luciano_juba_site-1.png" },

  // MEIO-CAMPO
  { id: 12, name: "Casemiro", position: "CM", photo: "/jogadores/95621_casemiro_20250920212010.png" },
  { id: 13, name: "Bruno Guimarães", position: "CM", photo: "/jogadores/463478_bruno_guimaraes_20251021194446.png" },
  { id: 16, name: "Lucas Paquetá", position: "CAM", photo: "/jogadores/477793_lucas_paqueta_20251103170148.png" },
  { id: 17, name: "Raphael Veiga", position: "CAM", photo: "/jogadores/470615_raphael_veiga_20240426201221.png" },
  { id: 45, name: "Andreas Pereira", position: "CM", photo: "/jogadores/370888_andreas_pereira_20240816193756.png" },
  { id: 47, name: "Andrey Santos", position: "CM", photo: "/jogadores/653753_andrey_santos_20250922181643.png" },
  { id: 48, name: "Danilo dos Santos", position: "CM", photo: "/jogadores/685910_danilo_20260327121809.jpg" },
  { id: 49, name: "Fabinho", position: "CM", photo: "/jogadores/267677_fabinho_20251228011021.png" },
  { id: 50, name: "Gabriel Sara", position: "CAM", photo: "/jogadores/584242_gabriel_sara_20250919162737.png" },

  // Adicionar ao setor correspondente
  { id: 58, name: "Rodrygo", position: "ST", photo: "/jogadores/rodrygo.png" },
  { id: 59, name: "Beraldo", position: "CB", photo: "/jogadores/beraldo.png" },
  { id: 60, name: "João Gomes", position: "CM", photo: "/jogadores/joao_gomes.png" },
  { id: 61, name: "Savinho", position: "RW", photo: "/jogadores/savinho.png" },
  { id: 62, name: "Gerson", position: "CM", photo: "/jogadores/gerson.png" },
  { id: 63, name: "Abner", position: "LB", photo: "/jogadores/abner.png" },
  { id: 64, name: "Yan Couto", position: "RB", photo: "/jogadores/yan_couto.png" },

  // ATACANTES
  { id: 18, name: "Neymar", position: ["CAM", "LW", "ST"], photo: "/jogadores/53174188191_42d4c831ae_o.jpg" },
  { id: 19, name: "Vinicius Jr", position: ["LW", "ST", "CAM"], photo: "/jogadores/547737_vinicius_junior_20250923225603.png" },
  { id: 21, name: "Raphinha", position: ["RW", "ST", "CAM"], photo: "/jogadores/491013_raphinha_20251203082154.png" },
  { id: 22, name: "Rayan", position: "RW", photo: "/jogadores/620082_rayan_20260207204616.png" },
  { id: 24, name: "Endrick", position: ["ST", "RW"], photo: "/jogadores/829333_endrick_20260313120646.png" },
  { id: 27, name: "Gabriel Martinelli", position: "LW", photo: "/jogadores/619681_gabriel_martinelli_20251030125918.png" },
  { id: 43, name: "Luiz Henrique", position: "RW", photo: "/jogadores/564328_luiz_henrique_20250218163216.jpg" },
  { id: 44, name: "Igor Jesus", position: "ST", photo: "/jogadores/646916_igor_jesus_20260227124627.png" },
  { id: 51, name: "Pedro", position: "ST", photo: "/jogadores/481359_pedro_20250617101858.png" },
  { id: 52, name: "Matheus Cunha", position: "ST", photo: "/jogadores/549637_matheus_cunha_20251025173306.png" },
  { id: 53, name: "Evanilson", position: "ST", photo: "/jogadores/513007_evanilson_20251213143033.png" },
  { id: 54, name: "João Pedro", position: "ST", photo: "/jogadores/663256_joao_pedro_20250922180953.png" },
  { id: 55, name: "Gabriel Barbosa", position: "ST", photo: "/jogadores/75171_gabriel_barbosa_20250330021018.png" },
  { id: 56, name: "Igor Thiago", position: "ST", photo: "/jogadores/656216_igor_thiago_20251026001039.png" },
  { id: 57, name: "Vitor Roque", position: "ST", photo: "/jogadores/836402_vitor_roque_20250615225512.png" },
  { id: 35, name: "Estêvão", position: "RW", photo: "/jogadores/975614_estevao_20250922180758.png" }
];

function getFallbackAvatar(name: string) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "??";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <rect width="128" height="128" fill="#222831"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#00d26a" font-size="50" font-family="sans-serif" font-weight="bold">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getPlayerPhoto(player: Player) {
  if (player.photo) return player.photo;
  return getFallbackAvatar(player.name);
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
  const [selectedSlotKey, setSelectedSlotKey] = useState<string | null>(null);
  const [formation, setFormation] = useState<string>("433");

  const fieldRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    const isDuplicate = Object.values(lineup).some(p => p?.id === player.id);
    if (isDuplicate) {
      alert(`O jogador ${player.name} já foi adicionado na sua escalação!`);
      return;
    }

    setLineup((prev) => {
      if (selectedSlotKey) {
        return {
          ...prev,
          [selectedSlotKey]: player,
        };
      }

      const posArray = Array.isArray(player.position) ? player.position : [player.position];
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

      let slot: string | undefined;
      for (const pos of posArray) {
        const candidates = slotOrder[pos] || [];
        slot = candidates.find((k) => !prev[k]);
        if (slot) break;
      }

      if (!slot) {
        window.alert(`Nenhuma vaga livre encontrada para ${posArray.join(" / ")}`);
        return prev;
      }
      return {
        ...prev,
        [slot]: player,
      };
    });

    setFilterPosition(null);
    setSelectedSlotKey(null);
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

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.crossOrigin = "anonymous";
      img.src = src;
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      const playersInLineup = Object.values(lineup).filter(player => player !== null) as Player[];
      const imagePromises = playersInLineup
        .map(player => getPlayerPhoto(player))
        .filter(src => src && !src.startsWith("data:image")) // Não carregar avatares gerados
        .map(src => loadImage(src));

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.warn("Algumas imagens falharam ao carregar, mas continuando:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [lineup]);

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
                e.currentTarget.onerror = null;
                e.currentTarget.src = getFallbackAvatar(player.name);
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
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
          Carregando imagens...
        </div>
      ) : (
        <>
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
                      .filter((p) => {
                        if (!filterPosition) return false;
                        return Array.isArray(p.position)
                          ? p.position.includes(filterPosition)
                          : p.position === filterPosition;
                      })
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
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getFallbackAvatar(p.name);
                            }}
                          />
                          <div className="player-card-info">
                            <strong>{p.name}</strong>
                            <span>{Array.isArray(p.position) ? p.position.join(", ") : p.position}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="app-footer">
            <div className="footer-content">
              <div className="footer-copyright">
                © Copyright 2026 Lucas Aragão
              </div>
              <div className="footer-links">
                <a href="#" className="footer-link">Termos de uso</a>
                <span className="footer-separator">•</span>
                <a href="#" className="footer-link">Política de cookies</a>
                <span className="footer-separator">•</span>
                <a href="#" className="footer-link">Política de privacidade</a>
                <span className="footer-separator">•</span>
                <a href="#" className="footer-link">Declaração da Lei de Transparência</a>
              </div>
              <div className="footer-disclaimer">
                Não é permitido o uso de serviços automáticos (robôs, rastreadores, indexação etc.) bem como outros métodos para uso sistemático ou regular.
              </div>
              <div className="footer-social">
                <span>Siga-me:</span>
                <a href="https://www.instagram.com/lucaasaragao1/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/lucas-aragao-magno/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>)}
    </div>
  );
}

export default App;