// Sistema de grupos de convocação com cotas fixas

export type ConvocationGroup = "GK" | "CB" | "LAT" | "MID" | "ATK";

/** Cota máxima por grupo — soma = 26 */
export const GROUP_QUOTAS: Record<ConvocationGroup, number> = {
  GK:  3,  // Goleiros
  CB:  6,  // Zagueiros
  LAT: 4,  // Laterais (LB + RB)
  MID: 8,  // Meio-campo (CM + CAM)
  ATK: 5,  // Atacantes (LW + RW + ST)
};

export const GROUP_META: Record<ConvocationGroup, { label: string; icon: string; positions: string[] }> = {
  GK:  { label: "Goleiros",   icon: "🧤", positions: ["GK"] },
  CB:  { label: "Zagueiros",  icon: "🛡️", positions: ["CB"] },
  LAT: { label: "Laterais",   icon: "🏃", positions: ["LB", "RB"] },
  MID: { label: "Meio-campo", icon: "🎯", positions: ["CM", "CAM"] },
  ATK: { label: "Atacantes",  icon: "⚽", positions: ["LW", "RW", "ST"] },
};

export const GROUP_ORDER: ConvocationGroup[] = ["GK", "CB", "LAT", "MID", "ATK"];

/**
 * Retorna o grupo de convocação pelo qual o jogador será classificado.
 * Usa SEMPRE a posição primária (primeiro item) para evitar duplicatas.
 */
export function getPlayerGroup(position: string | string[]): ConvocationGroup {
  const primary = Array.isArray(position) ? position[0] : position;
  if (primary === "GK") return "GK";
  if (primary === "CB") return "CB";
  if (primary === "LB" || primary === "RB") return "LAT";
  if (primary === "CM" || primary === "CAM") return "MID";
  return "ATK"; // LW, RW, ST
}

/** Conta convocados por grupo a partir da lista de selecionados */
export function countByGroup(
  selected: { position: string | string[] }[]
): Record<ConvocationGroup, number> {
  const counts = { GK: 0, CB: 0, LAT: 0, MID: 0, ATK: 0 };
  for (const p of selected) {
    counts[getPlayerGroup(p.position)]++;
  }
  return counts;
}
