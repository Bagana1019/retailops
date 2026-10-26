import { useState, useEffect } from "react";

// ─── LOCAL PERSISTENCE ────────────────────────────────────────────────────────
// Bump the version whenever the stored data shape changes so stale data is ignored.
export const STORAGE_PREFIX = "btech:v2:";
export const loadStored = (key, fallback) => {
  try { const raw = localStorage.getItem(STORAGE_PREFIX + key); return raw === null ? fallback : JSON.parse(raw); }
  catch { return fallback; }
};
export const usePersistedState = (key, initial) => {
  const [value, setValue] = useState(() => loadStored(key, initial));
  useEffect(() => { try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch { /* storage unavailable: keep in-memory only */ } }, [key, value]);
  return [value, setValue];
};
export const clearStoredData = () => {
  try { Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX)).forEach(k => localStorage.removeItem(k)); } catch { /* ignore */ }
};
