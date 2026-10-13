const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT = path.join(__dirname, "assets");
const KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY not set");
  process.exit(1);
}

const SLOTS = [
  { file: "hero", w: 1920, h: 1080, q: ["modern house exterior architecture", "contemporary home exterior", "modern house"] },
  { file: "cta-banner", w: 1920, h: 720, q: ["luxury home exterior", "modern villa exterior", "modern house exterior"] },
  { file: "split-1", w: 1000, h: 1200, q: ["house facade modern", "house entrance", "modern architecture facade"] },
  { file: "split-2", w: 1400, h: 900, q: ["suburban home exterior", "modern home exterior", "new house"] },
  { file: "design-1", w: 900, h: 640, q: ["modern bungalow", "single storey house", "modern home exterior"] },
  { file: "design-2", w: 900, h: 640, q: ["house driveway", "suburban house exterior", "family home exterior"] },
  { file: "design-3", w: 900, h: 640, q: ["two storey house", "modern villa", "large modern house"] },
  { file: "design-4", w: 900, h: 640, q: ["white house exterior", "minimal modern house", "white modern home"] },
  { file: "design-5", w: 900, h: 640, q: ["modern house garden", "house exterior lawn", "suburban home garden"] },
  { file: "design-6", w: 900, h: 640, q: ["contemporary house", "modern house design", "modern architecture home"] },
  { file: "design-7", w: 900, h: 640, q: ["modern townhouse", "terraced houses modern", "modern residential"] },
  { file: "design-8", w: 900, h: 640, q: ["house exterior evening", "modern house night", "lit house exterior"] },
  { file: "display-1", w: 900, h: 640, q: ["show home", "model home exterior", "display home"] },
  { file: "display-2", w: 900, h: 640, q: ["housing estate", "new suburban street", "residential street houses"] },
  { file: "display-3", w: 900, h: 640, q: ["modern villa pool", "luxury villa", "modern house exterior"] },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const used = new Set();
const credits = [];

async function search(q) {
  const url =
    "https://api.unsplash.com/search/photos" +
    `?query=${encodeURIComponent(q)}&per_page=12&orientation=landscape&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" } });
  if (res.status === 403) throw new Error("403 - bad key or rate limited");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const d = await res.json();
  return (d.results || []).map((r) => ({
    id: r.id,
    url: r.urls?.raw || r.urls?.regular,
    thumb: r.urls?.regular,
    title: r.alt_description || r.description || "untitled",
    creator: r.user?.name || "unknown",
    creatorUrl: r.user?.links?.html || "",
    page: r.links?.html || "",
    w: r.width,
    h: r.height,
  }));
}

async function grab(slot, hit) {
  const src = hit.url ? `${hit.url}&fm=jpg&q=90&w=${Math.max(slot.w, slot.h) * 2}` : hit.thumb;
  const res = await fetch(src, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error(`dl ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 40000) throw new Error("too small");
  const out = path.join(OUT, `${slot.file}.jpg`);
  await sharp(buf)
    .resize(slot.w, slot.h, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  used.add(hit.id);
  credits.push({ slot: slot.file, ...hit, kb: Math.round(fs.statSync(out).size / 1024) });
  return out;
}

(async () => {
  const failed = [];
  for (const slot of SLOTS) {
    let done = false;
    for (const q of slot.q) {
      if (done) break;
      try {
        const hits = await search(q);
        for (const h of hits) {
          if (!h.url || used.has(h.id)) continue;
          try {
            await grab(slot, h);
            console.log(`${slot.file.padEnd(12)} ${String(credits.at(-1).kb).padStart(4)}kb  ${h.title.slice(0, 42)}`);
            done = true;
            break;
          } catch (e) {
            await sleep(200);
          }
        }
      } catch (e) {
        console.log(`${slot.file} q="${q}" -> ${e.message}`);
        if (e.message.includes("403")) break;
      }
      await sleep(250);
    }
    if (!done) failed.push(slot.file);
  }

  const lines = [
    "# Photo credits",
    "",
    "Photographs from Unsplash, used under the Unsplash License.",
    "Unsplash requires visible attribution to the photographer:",
    "",
  ];
  for (const c of credits) {
    lines.push(`- ${c.slot}.jpg — ${c.creator} — ${c.page}`);
  }
  lines.push("");
  fs.writeFileSync(path.join(__dirname, "CREDITS.md"), lines.join("\n"), "utf8");

  console.log(`\nOK ${credits.length}/${SLOTS.length}`);
  if (failed.length) console.log("FAILED: " + failed.join(", "));
})();
