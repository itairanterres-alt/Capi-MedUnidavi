// MED-UNIDAVI 2027 — Design System tokens & navigation
// Ported verbatim from the prototype's med-unidavi-components.jsx so the
// real app stays pixel-identical. Palette anchored in the official UNIDAVI
// brand (Pantone 7687C / 2995C) + terracota accent.

export const DS = {
  blue: '#023E88',       // Pantone 7687C — azul primário UNIDAVI oficial
  blueAcc: '#00ADEF',    // Pantone 2995C — azul secundário UNIDAVI oficial
  blueDark: '#012D65',
  blueLight: '#E6EDF8',
  blueMid: '#0353B0',
  terra: '#C4622D',
  terraLight: '#FDF0EA',
  green: '#2A8A5C',
  greenLight: '#E6F4ED',
  amber: '#B07A18',
  amberLight: '#FDF5E0',
  bg: '#F5F7FC',
  surface: '#FFFFFF',
  border: '#DDE3F0',
  borderLight: '#EEF1F8',
  text: '#1A2438',
  textSec: '#5A6480',
  textMuted: '#8E97B0',
  shadow: '0 1px 4px rgba(26,36,56,0.08)',
  shadowMd: '0 4px 16px rgba(26,36,56,0.10)',
  shadowLg: '0 8px 28px rgba(26,36,56,0.14)',
  radius: '10px',
  radiusLg: '14px',
  radiusMd: '10px',
  radiusSm: '6px',
  // Alias used throughout the Perfil/Coordenação prototype code (≡ text).
  textDark: '#1A2438',
};

export const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Início',                icon: 'home' },
  { id: 'biblioteca',    label: 'Biblioteca',            icon: 'book-open' },
  { id: 'capi-cards',    label: 'Capi-Cards',            icon: 'layers' },
  { id: 'ppc',           label: 'Meu Percurso',          icon: 'map' },
  { id: 'iesc',          label: 'IESC',                  icon: 'building-2' },
  { id: 'morfofuncional',label: 'Morfofuncional',        icon: 'microscope', fasesPermitidas: [1,2,3,4,5] },
  { id: 'questoes',      label: 'Meu Treino',            icon: 'clipboard-list' },
  { id: 'imagens',       label: 'Banco de Imagens',      icon: 'image' },
  { id: 'eventos',       label: 'Eventos',               icon: 'calendar' },
  { id: 'progresso',     label: 'Teste de Progresso',    icon: 'bar-chart-2' },
  { id: 'simdavi',       label: 'Consulta Virtual',      icon: 'stethoscope' },
  { id: 'pratica',       label: 'Prática Clínica',       icon: 'stethoscope' },
  { id: 'apcs',          label: 'Portfólio APCs',        icon: 'folder-check' },
  { id: 'reflexivo',     label: 'Portfólio Reflexivo',   icon: 'pen-line' },
  { id: 'ic',            label: 'Iniciação Científica',  icon: 'flask-conical' },
  { id: 'vitrine',       label: 'Vitrine Institucional', icon: 'globe' },
];

export const NAV_ITEMS_COORD = [
  { id: 'coordenacao',     label: 'Visão Geral',            icon: 'layout-dashboard' },
  { id: 'coord-fase',      label: 'Por Fase',               icon: 'list' },
  { id: 'coord-aluno',     label: 'Por Aluno',              icon: 'user' },
  { id: 'coord-comp',      label: 'Por Competência',        icon: 'target' },
  { id: 'coord-enamed',    label: 'ENAMED',                 icon: 'graduation-cap' },
  { id: 'coord-banco',     label: 'Saúde do Banco',         icon: 'archive' },
  { id: 'coord-treino',    label: 'Atividades de Treino',   icon: 'clipboard-list' },
  { id: 'coord-npcmed',    label: 'NPCMed',                 icon: 'flask-conical' },
  { id: 'coord-relat',     label: 'Relatórios NDE/CPA/MEC', icon: 'bar-chart-2' },
];

export const NAV_ITEMS_DOC = [
  { id: 'docente',         label: 'Meus Tutorados',                icon: 'users' },
  { id: 'doc-aval',        label: 'Avaliações Pendentes',          icon: 'check-circle' },
  { id: 'doc-matriz',      label: 'Matriz Competência',            icon: 'compass' },
  { id: 'doc-davi',        label: 'Conteúdo Pedagógico a Validar', icon: 'bot' },
  { id: 'doc-sim',         label: 'Casos de Simulação a Revisar',  icon: 'stethoscope' },
  { id: 'imagens',         label: 'Banco de Imagens',              icon: 'image' },
  { id: 'gerador',         label: 'Gerador Pedagógico',            icon: 'pen-line' },
];

export const PROFILE_THEME = {
  estudante:   { bg: DS.blueDark, accent: DS.blueAcc, label: null,                labelBg: null,       labelFg: null },
  coordenacao: { bg: '#091830',   accent: DS.blueAcc, label: 'VISÃO COORDENAÇÃO', labelBg: DS.blueAcc, labelFg: '#062046' },
  docente:     { bg: '#0E4A4A',   accent: '#5DD3D3',  label: 'VISÃO DOCENTE',     labelBg: '#5DD3D3',  labelFg: '#062828' },
};

export function profileFromScreen(screen) {
  if (screen === 'coordenacao' || (screen && screen.startsWith && screen.startsWith('coord-'))) return 'coordenacao';
  if (screen === 'docente' || (screen && screen.startsWith && screen.startsWith('doc-'))) return 'docente';
  return 'estudante';
}
