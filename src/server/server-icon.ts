import type { Icon } from "@modelcontextprotocol/server";

// Inlined as a data URI, so hosts can show the icon without fetching a file or URL.
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7dd3fc"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#sky)"/>
  <circle cx="25" cy="25" r="11" fill="#fde047"/>
  <path d="M22 48a9 9 0 0 1 1-18 12 12 0 0 1 22 4 7 7 0 0 1 0 14z" fill="#ffffff"/>
</svg>`;

export const SERVER_ICON: Icon = {
  src: `data:image/svg+xml;base64,${Buffer.from(ICON_SVG).toString("base64")}`,
  mimeType: "image/svg+xml",
  sizes: ["any"],
};
