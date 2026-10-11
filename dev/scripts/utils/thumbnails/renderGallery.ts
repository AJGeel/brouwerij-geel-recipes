import fs from "fs";

export type GalleryCard = {
  label: string;
  /** Smaller text under the image, e.g. where it is from */
  caption?: string;
  dataUrl: string;
  /** `site` shows the image on the site's amber background, like an ingredient thumbnail */
  background?: "white" | "site";
  /** Display size in px instead of filling the card */
  size?: number;
};

export type Gallery = {
  title: string;
  subtitle?: string;
  cards: GalleryCard[];
};

const fontFile = (fileName: string) =>
  `data:font/ttf;base64,${fs
    .readFileSync(`./src/app/recept/[slug]/fonts/${fileName}`)
    .toString("base64")}`;

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Colors and fonts mirror src/app/globals.css and the fonts in src/app/layout.tsx; keep in sync
const styles = () => `
@font-face { font-family: "Bricolage Grotesque"; font-weight: 700; src: url(${fontFile("BricolageGrotesque-Bold.ttf")}); }
@font-face { font-family: "DM Sans"; font-weight: 400; src: url(${fontFile("DMSans-Regular.ttf")}); }
:root { --surface: 255 255 255; --foreground: 0 0 0; --gray-500: 143 127 142; --gray-900: 32 1 31; --amber-100: 237 232 225; --amber-500: 160 127 77; }
@media (prefers-color-scheme: dark) {
  :root { --surface: 22 16 21; --foreground: 236 230 235; --gray-500: 172 158 171; --gray-900: 244 238 243; --amber-100: 43 33 38; --amber-500: 205 165 105; }
}
* { box-sizing: border-box }
body { margin: 0; padding: 2.5rem 1.5rem; background: rgb(var(--surface)); color: rgb(var(--foreground)); font: 16px/1.5 "DM Sans", system-ui, sans-serif; text-align: center }
h1, .label { font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 700; color: rgb(var(--gray-900)) }
h1 { margin: 0; font-size: 1.875rem; line-height: 1.2 }
.subtitle { margin: .5rem 0 2rem; color: rgb(var(--gray-500)) }
.grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; max-width: 960px; margin: 0 auto }
.card { width: 260px }
.frame { display: flex; align-items: center; justify-content: center; height: 260px; overflow: hidden; border-radius: .375rem; border: 1px solid rgb(var(--amber-100)); background: #fff }
.site .frame { background: rgb(var(--amber-100)) }
.frame img { max-width: 100%; max-height: 100%; object-fit: contain }
.label { margin-top: .75rem; font-size: 1.25rem; color: rgb(var(--amber-500)) }
.caption { margin-top: .125rem; font-size: .875rem; color: rgb(var(--gray-500)); overflow-wrap: anywhere }
`;

export const renderGallery = ({
  title,
  subtitle,
  cards,
}: Gallery) => `<!doctype html>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>${styles()}</style>
<h1>${escapeHtml(title)}</h1>
${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ""}
<div class="grid">${cards
  .map(
    ({ label, caption, dataUrl, background, size }) => `
  <div class="card ${background === "site" ? "site" : ""}">
    <div class="frame"><img src="${dataUrl}" alt=""${size ? ` style="width:${size}px;height:${size}px"` : ""}></div>
    <div class="label">${escapeHtml(label)}</div>
    ${caption ? `<div class="caption">${escapeHtml(caption)}</div>` : ""}
  </div>`,
  )
  .join("")}</div>`;
