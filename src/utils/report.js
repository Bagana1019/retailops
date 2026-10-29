// Report export without extra dependencies:
//  - CSV with a UTF-8 BOM, which Excel opens with Cyrillic intact
//  - PDF via the browser's print dialog ("Save as PDF"), which renders Mongolian text
//    correctly, unlike client-side PDF libraries that need an embedded font.

const csvCell = (v) => { const s = v == null ? "" : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };

export const toCsv = (headers, rows) => "﻿" + [headers, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");

export const downloadFile = (filename, content, type = "text/csv;charset=utf-8") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
};

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// sections: [{ title, headers, rows }]; opens a print-ready page and triggers print.
export const printReport = ({ title, subtitle, sections }) => {
  const html = `<!doctype html><html lang="mn"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#111827;margin:24px;font-size:12px}
  h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:22px 0 8px}.sub{color:#6B7280;margin-bottom:8px}
  table{border-collapse:collapse;width:100%}th,td{border:1px solid #D1D5DB;padding:5px 8px;text-align:left}
  th{background:#F3F4F6;font-weight:600}tr:nth-child(even) td{background:#FAFAFA}
  @media print{body{margin:0}@page{margin:14mm}}
</style></head><body>
<h1>${esc(title)}</h1><div class="sub">${esc(subtitle)}</div>
${sections.map((s) => `<h2>${esc(s.title)}</h2><table><thead><tr>${s.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
<tbody>${s.rows.length ? s.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${s.headers.length}">—</td></tr>`}</tbody></table>`).join("")}
<script>window.onload=function(){setTimeout(function(){window.print()},150)}</script></body></html>`;
  const w = window.open("", "_blank");
  if (!w) return { error: "Popup хаагдсан байна. Browser-ийн popup зөвшөөрлийг нээнэ үү." };
  w.document.open(); w.document.write(html); w.document.close();
  return {};
};
