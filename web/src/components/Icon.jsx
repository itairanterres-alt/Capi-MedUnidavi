// Inline Lucide-compatible SVG icons (zero CDN). Ported from the prototype.
const _IP = {
  'home':            ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'],
  'book-open':       ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  'layers':          ['M12 2 2 7l10 5 10-5-10-5z','M2 17l10 5 10-5','M2 12l10 5 10-5'],
  'map':             ['M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z','M8 2v16','M16 6v16'],
  'building-2':      ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z','M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2','M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2','M10 6h4','M10 10h4','M10 14h4','M10 18h4'],
  'microscope':      ['M6 18h8','M3 22h18','M14 22a7 7 0 1 0 0-14h-1','M9 14h2','M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z','M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3'],
  'clipboard-list':  ['M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2','M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2','M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2','M9 12h6','M9 16h6'],
  'image':           ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z','M10 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z','M21 15l-5-5L5 21'],
  'calendar':        ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z','M8 2v4','M16 2v4','M3 10h18'],
  'bar-chart-2':     ['M18 20V10','M12 20V4','M6 20v-6'],
  'stethoscope':     ['M4 5v6a6 6 0 0 0 12 0V5','M8 5V3','M16 5V3','M20 19a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z','M15 17h-4a1 1 0 0 1-1-1v-1'],
  'folder-check':    ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z','M9 14l2 2 4-4'],
  'pen-line':        ['M12 20h9','M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 13.5-13.5z'],
  'flask-conical':   ['M9 2h6','M9 2L7 8H5l-1 5h16l-1-5h-2L15 2','M8 12h8'],
  'globe':           ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M2 12h20','M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z'],
  'layout-dashboard':['M4 3h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z','M14 3h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z','M14 12h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z','M4 16h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z'],
  'list':            ['M8 6h13','M8 12h13','M8 18h13','M3 6h.01','M3 12h.01','M3 18h.01'],
  'user':            ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2','M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  'target':          ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z','M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'],
  'graduation-cap':  ['M22 10v6','M2 10l10-5 10 5-10 5z','M6 12v5c3 3 9 3 12 0v-5'],
  'archive':         ['M21 8v13H3V8','M1 3h22v5H1z','M10 12h4'],
  'users':           ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z','M23 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'],
  'check-circle':    ['M22 11.08V12a10 10 0 1 1-5.93-9.14','M22 4 12 14.01l-3-3'],
  'compass':         ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'],
  'bot':             ['M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z','M8 9V7a4 4 0 0 1 8 0v2','M3 13h3','M18 13h3','M9 13h.01','M15 13h.01'],
};

export function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.75 }) {
  const paths = _IP[name];
  if (!paths) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
