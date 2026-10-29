// Local-timezone YYYY-MM-DD (toISOString() would return the UTC date, which is wrong before 08:00 in UTC+8)
export const toLocalDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const toLocalTime = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
