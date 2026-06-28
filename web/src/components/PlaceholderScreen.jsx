// Placeholder for sidebar destinations outside this delivery's scope
// (only the 5 key screens are fully implemented in this round).
import React from 'react';
import { DS } from '../lib/ds.js';
import { CapivaraDecorativa } from './Capi.jsx';
import { StatusFlag } from './ui.jsx';

export default function PlaceholderScreen({ title = 'Tela', isMobile }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', background: DS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <CapivaraDecorativa size={72} />
        <h2 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 700, color: DS.text }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 13, color: DS.textSec, lineHeight: 1.6 }}>
          Esta tela faz parte do protótipo MED-UNIDAVI, mas está fora do escopo desta entrega inicial
          (Login · Dashboard · Perfil do Aluno · Painel do Tutor · Coordenação). Estrutura de navegação preservada.
        </p>
        <StatusFlag kind="flag" criterio="próximo ciclo de implementação" />
      </div>
    </div>
  );
}
