export const categories = [
  { label: "Ferramentas", value: "FERRAMENTAS", description: "Para cada etapa do trabalho" },
  { label: "Elétrica", value: "ELÉTRICA", description: "Instalação e manutenção" },
  { label: "Hidráulica", value: "HIDRÁULICA", description: "Conexões e soluções" },
  { label: "Iluminação", value: "ILUMINAÇÃO", description: "Luz para seus projetos" },
  { label: "Ferragens", value: "FERRAGENS", description: "Resistência no dia a dia" },
  { label: "Pintura", value: "PINTURA", description: "Tudo para acabamento" },
  { label: "EPI", value: "EPI", description: "Proteção para sua equipe" },
  { label: "Utilidades", value: "UTILIDADES", description: "Praticidade para o negócio" },
  { label: "Agro", value: "AGRO", description: "Soluções para o campo" },
] as const;

export function categoryHref(value: string) {
  return "/produtos?categoria=" + encodeURIComponent(value);
}
