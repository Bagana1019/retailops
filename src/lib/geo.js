// Geolocation helpers for GPS-verified clock-in.

// Great-circle distance in metres between two lat/lng points.
export const distanceM = (lat1, lng1, lat2, lng2) => {
  const R = 6371000, toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
};

// Resolves { lat, lng, accuracy } or { error } (never throws).
export const getPosition = (timeoutMs = 15000) =>
  new Promise((resolve) => {
    if (!("geolocation" in navigator)) return resolve({ error: "Энэ төхөөрөмж байршил тогтоох боломжгүй" });
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: Math.round(p.coords.accuracy) }),
      (e) => resolve({ error: e.code === 1 ? "Байршлын зөвшөөрөл олгоогүй байна. Browser-ийн тохиргооноос зөвшөөрнө үү." : "Байршил тогтоож чадсангүй. GPS-ээ асааж дахин оролдоно уу." }),
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 0 },
    );
  });

export const storeLocationSet = (s) => Number.isFinite(Number(s?.storeLat)) && Number.isFinite(Number(s?.storeLng)) && s.storeLat !== "" && s.storeLng !== "" && s.storeLat !== null && s.storeLng !== null;

// Checks a position against the store. GPS accuracy is forgiven: you are "inside"
// if the distance minus the reported accuracy is within the radius.
export const checkLocation = (pos, settings) => {
  const d = distanceM(pos.lat, pos.lng, Number(settings.storeLat), Number(settings.storeLng));
  const radius = Number(settings.geoRadiusM) || 150;
  return { distance: d, ok: d - (pos.accuracy || 0) <= radius, radius };
};
