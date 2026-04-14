export type CallStatus = "frequent" | "occasional" | "surprise";

export type ConvocationPlayer = {
  id: number;
  name: string;
  position: string | string[];
  club?: string;
  photo?: string;
  callStatus: CallStatus;
};

export const convocationPlayers: ConvocationPlayer[] = [
  // GOLEIROS
  { id: 1, name: "Alisson", position: "GK", club: "Liverpool", photo: "/jogadores/95614_alisson_becker_20250815201322.png", callStatus: "frequent" },
  { id: 2, name: "Ederson", position: "GK", club: "Man City", photo: "/jogadores/136885_ederson_moraes_20250618210458.png", callStatus: "frequent" },
  { id: 3, name: "Bento", position: "GK", club: "Al-Qadsiah", photo: "/jogadores/548364_bento_20251228003543.png", callStatus: "frequent" },
  { id: 32, name: "Hugo Souza", position: "GK", club: "Corinthians", photo: "/jogadores/569633_hugo_souza_20260327122905.jpg", callStatus: "occasional" },

  // ZAGUEIROS
  { id: 4, name: "Marquinhos", position: "CB", club: "PSG", photo: "/jogadores/187757_marquinhos_20250326082619.png", callStatus: "frequent" },
  { id: 5, name: "Militão", position: ["CB", "RB"], club: "Real Madrid", photo: "/jogadores/484829_eder_militao_20240809095340.png", callStatus: "frequent" },
  { id: 6, name: "Gabriel Magalhães", position: "CB", club: "Arsenal", photo: "/jogadores/499852_gabriel_magalhaes_20250928235227.png", callStatus: "frequent" },
  { id: 7, name: "Bremer", position: "CB", club: "Juventus", photo: "/jogadores/478428_bremer_20260104223359.png", callStatus: "frequent" },
  { id: 34, name: "Fabrício Bruno", position: "CB", club: "Cruzeiro", photo: "/jogadores/494798_fabricio_bruno_20250828015118.jpg", callStatus: "occasional" },
  { id: 36, name: "Léo Ortiz", position: "CB", club: "Flamengo", photo: "/jogadores/548794_leo_ortiz_20250617101351.png", callStatus: "occasional" },
  { id: 37, name: "Léo Pereira", position: "CB", club: "Flamengo", photo: "/jogadores/375084_leo_pereira_20250330143245.png", callStatus: "occasional" },
  { id: 59, name: "Beraldo", position: "CB", club: "PSG", photo: "/jogadores/beraldo.png", callStatus: "surprise" },

  // LATERAIS DIREITOS
  { id: 9, name: "Wesley", position: "RB", club: "Flamengo", photo: "/jogadores/742671_wesley_franca_20250905235600.png", callStatus: "frequent" },
  { id: 10, name: "Vanderson", position: "RB", club: "Monaco", photo: "/jogadores/725828_vanderson_20250817133649.png", callStatus: "frequent" },
  { id: 64, name: "Yan Couto", position: "RB", club: "Man City", photo: "/jogadores/yan_couto.png", callStatus: "occasional" },
  { id: 39, name: "Vitinho", position: "RB", club: "Sp. Braga", photo: "/jogadores/547784_vitinho_20241201093508.jpg", callStatus: "occasional" },
  { id: 40, name: "Paulo Henrique", position: "RB", club: "Girona", photo: "/jogadores/446961_paulo_henrique_20250530170507.png", callStatus: "occasional" },

  // LATERAIS ESQUERDOS
  { id: 11, name: "Guilherme Arana", position: "LB", club: "Atlético-MG", photo: "/jogadores/1431982_guilherme_arana_20260203104906.png", callStatus: "frequent" },
  { id: 46, name: "Caio Henrique", position: "LB", club: "Monaco", photo: "/jogadores/500317_caio_henrique_20250817132442.png", callStatus: "frequent" },
  { id: 42, name: "Douglas Santos", position: "LB", club: "Zenit", photo: "/jogadores/252432_douglas_santos_20260327120411.jpg", callStatus: "occasional" },
  { id: 63, name: "Abner", position: "LB", club: "Lyon", photo: "/jogadores/abner.png", callStatus: "surprise" },
  { id: 38, name: "Luciano Juba", position: "LB", club: "Bahia", photo: "/jogadores/luciano_juba_site-1.png", callStatus: "surprise" },

  // MEIO-CAMPO
  { id: 13, name: "Bruno Guimarães", position: "CM", club: "Newcastle", photo: "/jogadores/463478_bruno_guimaraes_20251021194446.png", callStatus: "frequent" },
  { id: 12, name: "Casemiro", position: "CM", club: "Man Utd", photo: "/jogadores/95621_casemiro_20250920212010.png", callStatus: "frequent" },
  { id: 16, name: "Lucas Paquetá", position: "CAM", club: "West Ham", photo: "/jogadores/477793_lucas_paqueta_20251103170148.png", callStatus: "frequent" },
  { id: 60, name: "João Gomes", position: "CM", club: "Wolverhampton", photo: "/jogadores/joao_gomes.png", callStatus: "frequent" },
  { id: 17, name: "Raphael Veiga", position: "CAM", club: "Palmeiras", photo: "/jogadores/470615_raphael_veiga_20240426201221.png", callStatus: "occasional" },
  { id: 45, name: "Andreas Pereira", position: "CM", club: "Fulham", photo: "/jogadores/370888_andreas_pereira_20240816193756.png", callStatus: "occasional" },
  { id: 62, name: "Gerson", position: "CM", club: "Flamengo", photo: "/jogadores/gerson.png", callStatus: "occasional" },
  { id: 47, name: "Andrey Santos", position: "CM", club: "Chelsea", photo: "/jogadores/653753_andrey_santos_20250922181643.png", callStatus: "occasional" },
  { id: 50, name: "Gabriel Sara", position: "CAM", club: "Galatasaray", photo: "/jogadores/584242_gabriel_sara_20250919162737.png", callStatus: "occasional" },
  { id: 49, name: "Fabinho", position: "CM", club: "Al-Ittihad", photo: "/jogadores/267677_fabinho_20251228011021.png", callStatus: "occasional" },
  { id: 48, name: "Danilo dos Santos", position: "CM", club: "Nottm Forest", photo: "/jogadores/685910_danilo_20260327121809.jpg", callStatus: "surprise" },

  // ATACANTES / PONTAS
  { id: 19, name: "Vinicius Jr", position: ["LW", "ST"], club: "Real Madrid", photo: "/jogadores/547737_vinicius_junior_20250923225603.png", callStatus: "frequent" },
  { id: 21, name: "Raphinha", position: ["RW", "CAM"], club: "Barcelona", photo: "/jogadores/491013_raphinha_20251203082154.png", callStatus: "frequent" },
  { id: 35, name: "Estêvão", position: "RW", club: "Chelsea", photo: "/jogadores/975614_estevao_20250922180758.png", callStatus: "frequent" },
  { id: 27, name: "Gabriel Martinelli", position: "LW", club: "Arsenal", photo: "/jogadores/619681_gabriel_martinelli_20251030125918.png", callStatus: "frequent" },
  { id: 24, name: "Endrick", position: ["ST", "RW"], club: "Real Madrid", photo: "/jogadores/829333_endrick_20260313120646.png", callStatus: "frequent" },
  { id: 61, name: "Savinho", position: "RW", club: "Man City", photo: "/jogadores/savinho.png", callStatus: "frequent" },
  { id: 58, name: "Rodrygo", position: ["RW", "LW", "ST"], club: "Real Madrid", photo: "/jogadores/rodrygo.png", callStatus: "frequent" },
  { id: 22, name: "Rayan", position: "RW", club: "Flamengo", photo: "/jogadores/620082_rayan_20260207204616.png", callStatus: "surprise" },
  { id: 43, name: "Luiz Henrique", position: ["RW", "LW"], club: "Botafogo", photo: "/jogadores/564328_luiz_henrique_20250218163216.jpg", callStatus: "occasional" },
  { id: 18, name: "Neymar", position: ["LW", "CAM"], club: "Santos", photo: "/jogadores/53174188191_42d4c831ae_o.jpg", callStatus: "surprise" },

  // CENTROAVANTES
  { id: 44, name: "Igor Jesus", position: "ST", club: "Al-Qadsiah", photo: "/jogadores/646916_igor_jesus_20260227124627.png", callStatus: "frequent" },
  { id: 51, name: "Pedro", position: "ST", club: "Flamengo", photo: "/jogadores/481359_pedro_20250617101858.png", callStatus: "frequent" },
  { id: 52, name: "Matheus Cunha", position: "ST", club: "Man Utd", photo: "/jogadores/549637_matheus_cunha_20251025173306.png", callStatus: "frequent" },
  { id: 53, name: "Evanilson", position: "ST", club: "Porto", photo: "/jogadores/513007_evanilson_20251213143033.png", callStatus: "occasional" },
  { id: 54, name: "João Pedro", position: "ST", club: "Brighton", photo: "/jogadores/663256_joao_pedro_20250922180953.png", callStatus: "occasional" },
  { id: 55, name: "Gabriel Barbosa", position: "ST", club: "Flamengo", photo: "/jogadores/75171_gabriel_barbosa_20250330021018.png", callStatus: "occasional" },
  { id: 56, name: "Igor Thiago", position: "ST", club: "Brugge", photo: "/jogadores/656216_igor_thiago_20251026001039.png", callStatus: "occasional" },
  { id: 57, name: "Vitor Roque", position: "ST", club: "Real Betis", photo: "/jogadores/836402_vitor_roque_20250615225512.png", callStatus: "surprise" },
];

export const positionGroups: Record<string, string> = {
  GK: "Goleiros",
  RB: "Lat. Direito",
  CB: "Zagueiros",
  LB: "Lat. Esquerdo",
  CM: "Meio-Campo",
  CAM: "Meia Ofensivo",
  LW: "Ponta Esquerda",
  RW: "Ponta Direita",
  ST: "Atacante",
};

export const positionOrder = ["GK", "CB", "RB", "LB", "CM", "CAM", "LW", "RW", "ST"];

export const callStatusLabels: Record<CallStatus, { label: string; emoji: string; color: string }> = {
  frequent: { label: "Titular", emoji: "🟢", color: "#00d26a" },
  occasional: { label: "Eventual", emoji: "🟡", color: "#ffd800" },
  surprise: { label: "Surpresa", emoji: "🔴", color: "#ef4444" },
};
