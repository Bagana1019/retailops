// Tiny external store: holds a state object, notifies subscribers on change.
// Both the local (demo) store and the Supabase store are built on it, so screens
// never need to know which backend is active.
export function makeEmitter(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set: (patch) => {
      state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
      listeners.forEach((l) => l(state));
    },
    subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },
  };
}
