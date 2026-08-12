/**
 * Clínica em Foco — configuração central da landing page.
 *
 * Regras de linguagem do Instituto Blu: sem travessões (—) e sem emojis.
 * Pontos ainda dependentes de material do cliente estão marcados com  ⚠ TROCAR .
 */

export const evento = {
  organizador: "Instituto Blu",
  nome: "Clínica em Foco",
  subtitulo: "Psicopatologia na Prática Clínica",
  promessa: "Desenvolvendo o raciocínio clínico para a compreensão de casos complexos",
  // Ângulo de venda (frase-conceito do documento base):
  conceito: "O DSM te ensina os nomes. A clínica te cobra as decisões.",
  descricao:
    "Um encontro presencial e imersivo voltado ao desenvolvimento do raciocínio clínico, da observação e da tomada de decisão baseada em evidências diante de casos complexos.",

  data: "26 de setembro de 2026",
  diaSemana: "Sábado",
  horario: "9h às 17h",
  formato: "Presencial",

  local: {
    nome: "Instituto Blu",
    predio: "Empresarial RioMar Trade Center",
    endereco: "Av. República do Líbano, 251",
    complemento: "Torre 3 · Sala 915 · Pina",
    cidade: "Recife · PE",
    mapa: "https://www.google.com/maps/search/?api=1&query=RioMar+Recife+Trade+Center+Torre+3+Av+Rep%C3%BAblica+do+L%C3%ADbano+251+Pina+Recife",
  },

  selos: ["Vagas limitadas", "Certificado de participação"],
} as const;

/** Ação principal: leva ao Sympla (a inscrição acontece lá, não na página). */
export const cta = {
  href: "https://www.sympla.com.br/evento/clinica-em-foco/3525455",
  label: "Garantir minha vaga",
  labelCurto: "Inscrever-se",
};

/** Investimento — exibido na página (fonte: Sympla). */
export const investimento = {
  exibir: true,
  chamada: "Investimento",
  aVista: "R$ 468",
  parcelado: "ou 12x de R$ 48,40",
  observacao: "Inscrições pelo Sympla. Vagas limitadas.",
  incluso: [
    "Material de apoio",
    "Coffee break",
    "Certificado de participação",
  ],
  // Destaque de meia-entrada para estudantes de graduação.
  // ⚠ CONFIRMAR: hoje o Sympla só tem o ingresso "Profissional (R$ 468)".
  //   Definir o valor real da meia e como o estudante compra (ingresso próprio no Sympla?).
  meia: {
    exibir: false, // desligado a pedido; religar quando o lote de estudante existir no Sympla
    valor: "R$ 000",
    obs: "Estudantes de graduação, mediante comprovação de matrícula.",
    href: "",
  },
};

/** Facilitação — Kalina Santana (núcleo de autoridade da página). */
export const facilitadora = {
  exibir: true,
  nome: "Kalina Santana",
  titulo: "Psicóloga · Especialista em Psicopatologia",
  registro: "CRP 02/12687",
  quote:
    "Conhecer critérios diagnósticos é indispensável. Mas é o raciocínio clínico que transforma informação em decisão clínica segura.",
  stat: { num: "21+", label: "anos de prática clínica" },
  credenciais: [
    "Neuropsicologia",
    "TCC · DBT",
    "Treinadora em DBT",
    "Cofundadora do Instituto Blu",
  ],
  resumo:
    "Conduz casos clínicos complexos integrando psicopatologia, avaliação e raciocínio clínico. Neste encontro, ela não apresenta só teoria: mostra como pensa a clínica.",
};

/** Prova social — depoimentos de quem já foi orientado pela Kalina.
 *  ⚠ TROCAR pelos depoimentos reais (2 a 3), com nome e formação de quem fala. */
export const depoimentos = {
  exibir: false, // seção removida a pedido; religar quando houver depoimentos reais
  itens: [
    {
      texto:
        "Placeholder de depoimento. Substituir por um relato real de quem foi supervisionado ou formado pela Kalina, falando sobre o raciocínio clínico dela.",
      nome: "Nome do profissional",
      formacao: "Formação · registro",
    },
    {
      texto:
        "Placeholder de depoimento. Um segundo relato reforça a autoridade antes de a página pedir a inscrição.",
      nome: "Nome do profissional",
      formacao: "Formação · registro",
    },
    {
      texto:
        "Placeholder de depoimento. Um terceiro relato, se disponível, fecha a prova social com consistência.",
      nome: "Nome do profissional",
      formacao: "Formação · registro",
    },
  ],
};

export const publicoAlvo = [
  { titulo: "Psicólogos", desc: "Que querem afiar a leitura clínica e a formulação de casos." },
  { titulo: "Psiquiatras", desc: "Buscando integrar psicopatologia e decisão baseada em evidências." },
  { titulo: "Profissionais da saúde", desc: "Interessados em saúde mental e no funcionamento psicológico." },
  { titulo: "Estudantes da saúde", desc: "De graduação, que querem começar com o raciocínio clínico certo." },
];

export const ganhos = [
  {
    titulo: "Raciocínio clínico",
    desc: "Reconheça as armadilhas e os vieses que distorcem a tomada de decisão.",
  },
  {
    titulo: "Observação precisa",
    desc: "Aprenda a enxergar além do sintoma, o que realmente importa no caso.",
  },
  {
    titulo: "Hipóteses e diagnóstico",
    desc: "Construa, teste e refine hipóteses com diagnóstico diferencial na prática.",
  },
  {
    titulo: "Decisão baseada em evidências",
    desc: "Conduza a investigação e decida com fundamento diante da complexidade.",
  },
];

export const programacao = {
  manha: [
    { hora: "09h00", titulo: "Abertura", itens: [] },
    {
      hora: "09h30 às 10h30",
      titulo: "Raciocínio Clínico",
      itens: [
        "As principais armadilhas do raciocínio clínico.",
        "Os vieses que influenciam a tomada de decisão.",
        "Como desenvolver uma observação clínica mais precisa.",
      ],
    },
    {
      hora: "10h30 às 11h30",
      titulo: "Compreendendo o Funcionamento Psicológico",
      itens: [
        "O que observar além dos sintomas.",
        "Como diferentes transtornos influenciam a forma de pensar, sentir e agir.",
        "Psicopatologia na prática clínica.",
        "Análise de caso clínico.",
      ],
    },
    {
      hora: "11h30 às 12h00",
      titulo: "Construindo Hipóteses Clínicas",
      itens: [
        "Como organizar as informações clínicas.",
        "Diagnóstico diferencial na prática.",
        "Exercício aplicado de raciocínio clínico.",
        "Quando fortalecer, revisar ou abandonar uma hipótese clínica.",
      ],
    },
    { hora: "12h00 às 13h30", titulo: "Intervalo para almoço", itens: [], pausa: true },
  ],
  tarde: [
    {
      hora: "13h30 às 15h00",
      titulo: "Integrando o Raciocínio Clínico",
      itens: [
        "Análise de caso complexo.",
        "Planejamento da investigação clínica.",
        "Tomada de decisão baseada em evidências.",
      ],
    },
    { hora: "15h00 às 15h30", titulo: "Coffee Break", itens: [], pausa: true },
    {
      hora: "15h30 às 16h30",
      titulo: "Formulação Clínica",
      itens: [
        "Refinamento das hipóteses clínicas.",
        "Debate sobre vieses e manejo clínico.",
      ],
    },
    {
      hora: "16h30 às 17h00",
      titulo: "Síntese Clínica",
      itens: [
        "Os princípios de um raciocínio clínico de qualidade.",
        "Aplicações para a prática clínica.",
        "Debate final.",
      ],
    },
  ],
};

export const contato = {
  whatsapp: "5581982279499",
  whatsappLabel: "(81) 98227-9499",
  whatsappMsg:
    "Olá! Tenho interesse no encontro Clínica em Foco (26/09). Pode me passar mais informações?",
  instagram: "institutoblu",
  instagramUrl: "https://instagram.com/institutoblu",
};

export const seo = {
  title: "Clínica em Foco · Psicopatologia na Prática Clínica | Instituto Blu",
  description:
    "Encontro presencial em Recife para desenvolver o raciocínio clínico, a observação e a decisão baseada em evidências diante de casos complexos. Com Kalina Santana. 26 de setembro, 9h às 17h. Vagas limitadas.",
  // Domínio de produção (sincronizado com astro.config.mjs).
  site: "https://clinicaemfoco.institutoblu.com.br",
  ogImage: "/og.jpg",
};

/**
 * Tracking (GTM + dataLayer). Ver TRACKING.md.
 * A página nunca chama fbq/gtag direto: só empurra dataLayer, o GTM decide o resto.
 * Com `gtmId` vazio nada é injetado (dev/preview limpos).
 */
export const tracking = {
  gtmId: "GTM-MZ685HWB",
  /** Percentuais de rolagem que geram evento `scroll_depth`. */
  scrollDepth: [25, 50, 75, 90],
};

export function whatsappLink() {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(contato.whatsappMsg)}`;
}
