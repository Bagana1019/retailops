// Web Push on the client: service worker registration, permission, subscription.
// The subscription object is stored server-side (push_subscriptions) by the store.

export const pushSupported = () => typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || "";

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try { return await navigator.serviceWorker.register("/sw.js"); } catch { return null; }
}

const urlBase64ToUint8Array = (b64) => {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
};

// Returns { subscription } (plain JSON: endpoint + keys) or { error }.
export async function subscribeToPush() {
  if (!pushSupported()) return { error: "Энэ browser push мэдэгдэл дэмжихгүй байна" };
  if (!VAPID_PUBLIC_KEY) return { error: "VITE_VAPID_PUBLIC_KEY тохируулаагүй байна" };
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return { error: "Мэдэгдлийн зөвшөөрөл олгоогүй" };
  const reg = (await navigator.serviceWorker.getRegistration()) || (await registerServiceWorker());
  if (!reg) return { error: "Service worker бүртгэгдсэнгүй" };
  try {
    const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) }));
    return { subscription: sub.toJSON() };
  } catch (e) { return { error: e.message }; }
}

export async function unsubscribeFromPush() {
  const reg = await navigator.serviceWorker?.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  const endpoint = sub?.endpoint || null;
  if (sub) await sub.unsubscribe();
  return { endpoint };
}

export async function currentPushEndpoint() {
  try { const reg = await navigator.serviceWorker?.getRegistration(); const sub = await reg?.pushManager.getSubscription(); return sub?.endpoint || null; } catch { return null; }
}

// Foreground fallback: when the app is open and a new notification arrives via realtime,
// show it through the Notification API (no push server needed).
export function showLocalNotification(title, body, tag) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  navigator.serviceWorker?.getRegistration().then((reg) => {
    if (reg) reg.showNotification(title, { body, tag, icon: "/icons/icon-192.png" });
    else new Notification(title, { body, tag, icon: "/icons/icon-192.png" });
  }).catch(() => {});
}
