import { T } from "./i18n";

// ─── STYLES ───────────────────────────────────────────────────────────────────
export const S = {
  bg: "#F4F6FA", bgCard: "#FFFFFF", bgInput: "#F0F2F7",
  accent: "#2563EB", success: "#059669", successBg: "rgba(5,150,105,0.10)",
  warning: "#D97706", warningBg: "rgba(217,119,6,0.10)",
  danger: "#DC2626", dangerBg: "rgba(220,38,38,0.08)",
  text: "#111827", textMuted: "#6B7280", textDim: "#4B5563",
  border: "rgba(0,0,0,0.09)",
  director: "#7C3AED", manager: "#2563EB", employee: "#059669",
};

export const roleColor = (r) => r === "Director" ? S.director : r === "Manager" ? S.manager : S.employee;
export const roleLabel = (r) => T[r] || r;
export const statusColor = (s) => s === "Дууссан" ? S.success : s === "Хийгдэж байна" ? S.accent : s === "Хүлээгдэж байна" ? S.warning : S.textMuted;
export const priorityColor = (p) => p === "Өндөр" ? S.danger : p === "Дунд" ? S.warning : S.textMuted;
