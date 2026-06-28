// Thin fetch client for the MED-UNIDAVI backend (Express + SQLite).
// In dev, Vite proxies /api → http://localhost:4000 (see vite.config.js).
const BASE = import.meta.env.VITE_API_URL || '';

export async function apiGet(path) {
  const res = await fetch(`${BASE}/api${path}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GET ${path} → ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json();
}

export async function apiPost(path, payload) {
  const res = await fetch(`${BASE}/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}`);
  return res.json();
}

// React hook: fetch once on mount, expose { data, error, loading }.
import { useState, useEffect } from 'react';
export function useApi(path, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    let alive = true;
    setState(s => ({ ...s, loading: true, error: null }));
    apiGet(path)
      .then(data => { if (alive) setState({ data, error: null, loading: false }); })
      .catch(error => { if (alive) setState({ data: null, error, loading: false }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
