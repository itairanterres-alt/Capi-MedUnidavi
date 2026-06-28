// Capi mascot system — single conversational persona modulated by context.
// Ported from the prototype (BLOCO 0, rev. mai/2026). Sprites resolved from
// /public/uploads via resolveAsset.
import React from 'react';
import { DS } from '../lib/ds.js';
import { resolveAsset } from '../lib/assets.js';

function _PersonaImg({ src, alt, size, pos = 'top center' }) {
  return (
    <img src={resolveAsset(src)} alt={alt}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover',
               objectPosition: pos, flexShrink: 0, display: 'block' }} />
  );
}

const _CAPI_SRC = {
  treino:  'uploads/Dr capivara.png',
  clinico: 'uploads/Dr Capi.png',
};

export function CapivaraDecorativa({ size = 80, modo = 'treino' }) {
  const src = _CAPI_SRC[modo] || _CAPI_SRC.treino;
  return <_PersonaImg src={src} alt="" size={size} pos="top center" />;
}

const _CAPI_POSES = {
  atencao:     { src: 'uploads/capi-atencao.png',     r: 819/1024, clipTop: 0 },
  ola:         { src: 'uploads/capi-ola.png',         r: 819/1024, clipTop: 0 },
  duvida:      { src: 'uploads/capi-duvida.png',      r: 819/1024, clipTop: 0 },
  pensativo:   { src: 'uploads/capi-pensativo.png',   r: 819/1024, clipTop: 0 },
  farmaco:     { src: 'uploads/capi-farmaco.png',     r: 195/252,  clipTop: 0 },
  dica:        { src: 'uploads/capi-dica.png',        r: 258/245,  clipTop: 0 },
  neutro:      { src: 'uploads/capi-neutro.png',      r: 258/245,  clipTop: 0 },
  clinico:     { src: 'uploads/capi-clinico.png',     r: 258/245,  clipTop: 0 },
  aprovacao:   { src: 'uploads/capi-aprovacao.png',   r: 195/192,  clipTop: 0 },
  anotando:    { src: 'uploads/capi-anotando.png',    r: 195/192,  clipTop: 0 },
  escrita:     { src: 'uploads/capi-escrita.png',     r: 195/192,  clipTop: 0 },
  esperando:   { src: 'uploads/capi-esperando.png',   r: 195/192,  clipTop: 0 },
  serio:       { src: 'uploads/capi-serio.png',       r: 195/242,  clipTop: 0 },
  concentrado: { src: 'uploads/capi-concentrado.png', r: 195/242,  clipTop: 0 },
  consultando: { src: 'uploads/capi-consultando.png', r: 195/242,  clipTop: 0 },
  documento:   { src: 'uploads/capi-documento.png',   r: 195/242,  clipTop: 0 },
};

export const CAPI_POSE_BY_SCREEN = {
  dashboard: 'ola', 'capi-cards': 'anotando', pilulas: 'dica',
  questoes: 'pensativo', morfofuncional: 'concentrado',
  ic: 'escrita', reflexivo: 'pensativo', iesc: 'dica',
  pratica: 'clinico', simdavi: 'atencao', apcs: 'documento',
  progresso: 'aprovacao', missao: 'ola', notas: 'escrita',
  simulado: 'atencao', forum: 'duvida',
};

export function CapiSprite({ pose = 'neutro', height = 120, radius = 10, animated = false }) {
  const p = _CAPI_POSES[pose] || _CAPI_POSES.neutro;
  const clipTop = p.clipTop || 0;
  const w = Math.round(height * p.r);
  const imgH = height + clipTop;
  return (
    <div style={{
      width: w, height, borderRadius: radius, overflow: 'hidden',
      flexShrink: 0, background: '#EDE4D8',
      animation: animated ? 'capiBob 4s ease-in-out infinite' : 'none',
    }}>
      <img src={resolveAsset(p.src)} alt="Capi" style={{
        width: '100%', height: imgH,
        objectFit: 'cover', objectPosition: 'top center',
        display: 'block', marginTop: -clipTop,
      }} />
    </div>
  );
}

export function CapiPortrait({ height = 100, modo = 'treino', radius = 10, animated = false, mood = 'neutro' }) {
  const src = _CAPI_SRC[modo] || _CAPI_SRC.treino;
  const w = Math.round(height * 0.8);
  const moodOverlay = {
    animado:    { emoji: '⚡', bg: '#FFF3CC' },
    celebracao: { emoji: '🎉', bg: '#E8F5E9' },
    pensativo:  { emoji: '💭', bg: '#EEF1F8' },
    neutro:     null,
  }[mood];
  const animation = animated
    ? (mood === 'celebracao' ? 'capiBreath 2s ease-in-out infinite'
     : mood === 'pensativo'  ? 'capiBreath 5s ease-in-out infinite'
     : 'capiBob 4s ease-in-out infinite')
    : 'none';
  return (
    <div style={{ position: 'relative', flexShrink: 0, display: 'inline-block' }}>
      <div style={{ width: w, height, borderRadius: radius, overflow: 'hidden', background: '#EDE4D8', animation }}>
        <img src={resolveAsset(src)} alt="Capi" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
        }} />
      </div>
      {moodOverlay && (
        <div style={{
          position: 'absolute', top: -8, right: -8,
          width: Math.max(20, height * 0.22), height: Math.max(20, height * 0.22),
          borderRadius: '50%', background: moodOverlay.bg, border: '2px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: Math.max(10, height * 0.13), boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          animation: 'capiBubbleIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>{moodOverlay.emoji}</div>
      )}
    </div>
  );
}

const _CAPI_FRASES = {
  dashboard:    ['Sua missão do dia está esperando!', 'Você está em sequência há 12 dias. Continue assim!', '8 flashcards de Farmacologia antes do TBL — consigo.'],
  'capi-cards': ['Revisão espaçada é mais eficiente que maratona.', 'FSRS escolheu o que você mais precisa ver hoje.', 'Cada card revisado é um ponto de ancoragem clínica.'],
  pilulas:      ['Ideal pra intervalo entre tarefas.', 'Um macete por vez. Vai fundo.'],
  questoes:     ['Raciocine antes de marcar — o processo é o aprendizado.', 'Cada erro virou critério de revisão no FSRS.'],
  morfofuncional: ['Estrutura + função: o par inseparável da clínica.'],
  ic:           ['Metodologia sólida antes de conclusões, sempre.'],
  reflexivo:    ['Reflexão estruturada é evidência de aprendizagem.'],
  default:      ['Como posso ajudar?', 'Estou aqui quando precisar.'],
};

export function CapiBubble({ tela = 'default', side = 'left', style: extra = {} }) {
  const frases = _CAPI_FRASES[tela] || _CAPI_FRASES.default;
  const idx = Math.floor(Date.now() / (1000 * 60 * 60)) % frases.length;
  const frase = frases[idx];
  const tailLeft  = side === 'left'  ? { borderRadius: '10px 10px 10px 2px' } : {};
  const tailRight = side === 'right' ? { borderRadius: '10px 10px 2px 10px' } : {};
  return (
    <div style={{
      background: DS.surface, border: `1px solid ${DS.border}`,
      borderRadius: '10px 10px 10px 2px', padding: '9px 13px',
      fontSize: 12, color: DS.textSec, lineHeight: 1.55, maxWidth: 190,
      boxShadow: DS.shadow, animation: 'capiBubbleIn 0.45s cubic-bezier(0.16,1,0.3,1)',
      ...tailLeft, ...tailRight, ...extra,
    }}>{frase}</div>
  );
}

export function CapivaraIcon({ size = 36, modo }) { return <CapivaraDecorativa size={size} modo={modo} />; }
export function CapiAvatar({ size = 36, modo }) { return <CapivaraDecorativa size={size} modo={modo} />; }
