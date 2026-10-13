const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "assets");
fs.mkdirSync(OUT, { recursive: true });

/* ---------- colour systems (muted, photographic) ---------- */

const SCHEMES = [
  {
    id: "charcoal",
    sky: ["#9fb4c9", "#cfdbe4", "#e8eef2"],
    roof: "#3f464d", roofLit: "#59626a", roofDark: "#2b3037",
    wall: "#e9e6e0", wallShade: "#cdc9c2", wallSide: "#b9b5ae",
    trim: "#ffffff", door: "#2f3438", glass: "#8ba3b8", glassLit: "#cfe0ee",
    lawn: ["#6f8a56", "#5c7648", "#4a6139"],
    drive: "#c9c6c0", driveShade: "#aeaba5",
    fence: "#d9d5cd", shrub: "#4f6b40", tree: "#40613a",
  },
  {
    id: "sage",
    sky: ["#a8bcc6", "#d2dee3", "#eaf0f1"],
    roof: "#7d9080", roofLit: "#94a697", roofDark: "#5f7060",
    wall: "#f0ede6", wallShade: "#d6d2ca", wallSide: "#c0bcb4",
    trim: "#ffffff", door: "#3a4a3f", glass: "#93aab9", glassLit: "#d6e4ee",
    lawn: ["#78904f", "#657c43", "#516535"],
    drive: "#cbc8c2", driveShade: "#b0ada7",
    fence: "#dcd8d0", shrub: "#587245", tree: "#48693e",
  },
  {
    id: "sand",
    sky: ["#b4bcc6", "#dbdde0", "#f0eeeb"],
    roof: "#6b6257", roofLit: "#827a6d", roofDark: "#4c463d",
    wall: "#efe9dd", wallShade: "#d4cdbf", wallSide: "#bdb5a6",
    trim: "#ffffff", door: "#5a4a38", glass: "#93a2ad", glassLit: "#d4dfe8",
    lawn: ["#82915a", "#6e7d4b", "#5a683e"],
    drive: "#cfcbc4", driveShade: "#b3afa8",
    fence: "#e0dacd", shrub: "#63794a", tree: "#55703f",
  },
  {
    id: "slate",
    sky: ["#9aa9bb", "#c6d2de", "#e4eaf0"],
    roof: "#2f353c", roofLit: "#464e57", roofDark: "#1f242a",
    wall: "#dfdcd6", wallShade: "#c3c0ba", wallSide: "#a9a6a0",
    trim: "#f5f5f5", door: "#242a30", glass: "#7e97ae", glassLit: "#c2d5e6",
    lawn: ["#6d8754", "#5a7345", "#485e37"],
    drive: "#c4c1bb", driveShade: "#a8a5a0",
    fence: "#d5d1c9", shrub: "#4d6a3e", tree: "#3f6038",
  },
  {
    id: "brick",
    sky: ["#a9bcc9", "#d3dde4", "#e9eff2"],
    roof: "#4a4f55", roofLit: "#646a71", roofDark: "#33373c",
    wall: "#c8ab90", wallShade: "#ab8e75", wallSide: "#967a63",
    trim: "#f7f4ef", door: "#2b3a3f", glass: "#8ba0ae", glassLit: "#cfe0ec",
    lawn: ["#779053", "#648044", "#506a37"],
    drive: "#cbc7c0", driveShade: "#b0aca6",
    fence: "#cfc3b0", shrub: "#55713f", tree: "#47683b",
  },
];

/* ---------- helpers ---------- */

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

const r2 = (n) => Math.round(n * 100) / 100;

function poly(points, fill, extra = "") {
  return `<polygon points="${points.map((p) => `${r2(p[0])},${r2(p[1])}`).join(" ")}" fill="${fill}" ${extra}/>`;
}

function rect(x, y, w, h, fill, extra = "") {
  return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" fill="${fill}" ${extra}/>`;
}

function linear(id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) {
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a]) => `<stop offset="${o}%" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ""}/>`)
    .join("")}</linearGradient>`;
}

/* ---------- scene renderer ---------- */

function houseScene(W, H, scheme, seed, opts = {}) {
  const R = rng(seed);
  const c = scheme;
  const wide = W / H > 1.35;
  const horizon = H * (opts.horizon || (wide ? 0.76 : 0.7));
  const vx = W * (0.58 + R() * 0.22);
  const depthK = 0.34 + R() * 0.12;

  const defs = [];
  const body = [];

  const uid = `s${seed}`;
  defs.push(linear(`sky${uid}`, [[0, c.sky[0]], [58, c.sky[1]], [100, c.sky[2]]]));
  defs.push(linear(`lawn${uid}`, [[0, c.lawn[0]], [55, c.lawn[1]], [100, c.lawn[2]]]));
  defs.push(linear(`roofG${uid}`, [[0, c.roofLit], [60, c.roof], [100, c.roofDark]]));
  defs.push(linear(`glassG${uid}`, [[0, c.glassLit], [55, c.glass], [100, c.wallShade]]));
  defs.push(linear(`haze${uid}`, [[0, c.sky[2], 0.55], [100, c.sky[2], 0]], 0, 0, 0, 1));
  defs.push(
    `<radialGradient id="sun${uid}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fff8e8" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#fff8e8" stop-opacity="0"/>
    </radialGradient>`
  );

  /* sky + sun + clouds */
  body.push(rect(0, 0, W, H, `url(#sky${uid})`));
  const sunX = W * (0.15 + R() * 0.7);
  const sunY = H * (0.1 + R() * 0.18);
  body.push(`<circle cx="${r2(sunX)}" cy="${r2(sunY)}" r="${r2(H * 0.3)}" fill="url(#sun${uid})"/>`);
  for (let i = 0; i < 6; i++) {
    const cy = H * (0.06 + R() * 0.4);
    const cx = W * R();
    const rx = W * (0.05 + R() * 0.08);
    body.push(`<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(rx)}" ry="${r2(rx * 0.2)}" fill="#ffffff" opacity="${r2(0.1 + R() * 0.14)}"/>`);
  }

  /* distant treeline */
  for (let i = 0; i < 16; i++) {
    const tx = (W / 15) * i + R() * (W / 15);
    const th = H * (0.03 + R() * 0.045);
    body.push(`<ellipse cx="${r2(tx)}" cy="${r2(horizon - th * 0.4)}" rx="${r2(th * 1.1)}" ry="${r2(th)}" fill="${c.tree}" opacity="0.28"/>`);
  }

  /* ground */
  body.push(rect(0, horizon, W, H - horizon, `url(#lawn${uid})`));

  /* front plane geometry */
  const showSide = opts.side === true && !opts.center;
  const sideSign = R() > 0.5 ? 1 : -1;
  const faceW = W * (opts.faceW || (wide ? 0.46 + R() * 0.08 : 0.44 + R() * 0.12));
  const faceH = H * (opts.faceH || (wide ? 0.3 + R() * 0.06 : 0.2 + R() * 0.07));
  const storeys = opts.storeys || (R() > 0.72 ? 2 : 1);

  let fx;
  if (opts.center) {
    fx = (W - faceW) / 2;
  } else if (showSide) {
    fx = sideSign > 0 ? W * (0.08 + R() * 0.08) : W * (0.92 - R() * 0.08) - faceW;
  } else {
    fx = (W - faceW) / 2;
  }
  const fy = horizon - faceH;
  const fx1 = fx + faceW;

  const proj = (x, d) => r2(vx + (x - vx) * Math.pow(depthK, d));

  /* side wall */
  if (showSide) {
    const a = sideSign > 0 ? fx1 : fx;
    const b = sideSign > 0 ? fx : fx1;
    const a2 = proj(a, 1);
    const b2 = proj(b, 1);
    body.push(
      poly([[a, fy], [b, fy], [b2, fy - faceH * 0.1], [a2, fy - faceH * 0.1]], c.wallSide)
    );
    body.push(
      poly([[a, horizon], [b, horizon], [b2, horizon - faceH * 0.08], [a2, horizon - faceH * 0.08]], c.wallShade, 'opacity="0.5"')
    );
    const sw = Math.abs(b2 - a2);
    const step = sw / 5;
    for (let i = 1; i < 5; i++) {
      const wx = a2 + step * i * (sideSign > 0 ? 1 : -1);
      if (wx > Math.min(a2, b2) && wx < Math.max(a2, b2)) {
        body.push(rect(wx, fy - faceH * 0.1 + faceH * 0.3, sw * 0.1, faceH * 0.34, c.glass, 'opacity="0.75"'));
      }
    }
    body.push(
      poly([[a2, fy - faceH * 0.1], [b2, fy - faceH * 0.1], [b2, fy - faceH * 0.13], [a2, fy - faceH * 0.13]], c.roofDark)
    );
  }

  /* front facade */
  body.push(rect(fx, fy, faceW, faceH, c.wall));

  /* brick/texture banding on facade */
  const bands = Math.floor(faceH / (H * 0.02));
  for (let i = 1; i < bands; i++) {
    body.push(rect(fx, fy + (faceH / bands) * i, faceW, 1, c.wallShade, 'opacity="0.35"'));
  }

  /* floor split for two storeys */
  if (storeys === 2) {
    body.push(rect(fx, fy + faceH * 0.5, faceW, 2, c.wallShade, 'opacity="0.7"'));
  }

  /* roof */
  const eaves = faceH * 0.075;
  const pitch = faceH * (0.2 + R() * 0.07);
  const ridgeShift = (R() - 0.5) * faceW * 0.25;
  const ridgeX = fx + faceW / 2 + ridgeShift;

  if (opts.flatRoof) {
    body.push(rect(fx - eaves, fy - eaves, faceW + eaves * 2, eaves, c.roof));
    body.push(rect(fx - eaves, fy - eaves * 0.45, faceW + eaves * 2, eaves * 0.3, c.roofLit, 'opacity="0.7"'));
    body.push(rect(fx - eaves, fy - 3, faceW + eaves * 2, 5, c.roofDark, 'opacity="0.45"'));
  } else {
    body.push(
      poly(
        [
          [fx - eaves, fy],
          [ridgeX, fy - pitch],
          [fx1 + eaves, fy],
        ],
        `url(#roofG${uid})`
      )
    );
    body.push(
      poly(
        [
          [fx - eaves, fy],
          [fx - eaves, fy + eaves * 0.32],
          [ridgeX, fy - pitch + eaves * 0.32],
          [ridgeX, fy - pitch],
        ],
        c.roofDark
      )
    );
    body.push(
      poly(
        [
          [ridgeX, fy - pitch],
          [ridgeX, fy - pitch + eaves * 0.32],
          [fx1 + eaves, fy + eaves * 0.32],
          [fx1 + eaves, fy],
        ],
        c.roofLit,
        'opacity="0.55"'
      )
    );
    /* corrugation */
    const ribs = Math.floor(faceW / (W * 0.018));
    for (let i = 1; i < ribs; i++) {
      const t = i / ribs;
      const x0 = fx - eaves + (ridgeX - (fx - eaves)) * t;
      const x1 = fx1 + eaves - (fx1 + eaves - ridgeX) * t;
      body.push(`<line x1="${r2(x0)}" y1="${r2(fy - pitch * (1 - Math.abs(t - 0.5) * 2))}" x2="${r2(x0)}" y2="${r2(fy)}" stroke="${c.roofDark}" stroke-width="1" opacity="0.22"/>`);
      if (Math.abs(x1 - x0) > 2) {
        body.push(`<line x1="${r2(x1)}" y1="${r2(fy - pitch * (1 - Math.abs(t - 0.5) * 2))}" x2="${r2(x1)}" y2="${r2(fy)}" stroke="${c.roofDark}" stroke-width="1" opacity="0.22"/>`);
      }
    }
  }

  /* shadow under eaves */
  body.push(rect(fx, fy, faceW, eaves * 0.5, c.roofDark, 'opacity="0.32"'));

  /* windows */
  const floors = storeys === 2 ? [0.22, 0.62] : [0.34];
  floors.forEach((fyFrac, fi) => {
    const winH = faceH * 0.24;
    const count = 3 + Math.floor(R() * 2);
    const gap = faceW / (count + 1);
    for (let i = 1; i <= count; i++) {
      if (fi === 0 && i === Math.ceil(count / 2) && storeys === 1 && R() > 0.55) continue;
      const wW = gap * (0.5 + R() * 0.22);
      const wx = fx + gap * i - wW / 2;
      const wy = fy + faceH * fyFrac;
      body.push(rect(wx - 2, wy - 2, wW + 4, winH + 4, c.trim));
      body.push(rect(wx, wy, wW, winH, `url(#glassG${uid})`));
      body.push(rect(wx + wW / 2 - 1, wy, 2, winH, c.trim, 'opacity="0.9"'));
      body.push(rect(wx, wy + winH / 2 - 1, wW, 2, c.trim, 'opacity="0.75"'));
      body.push(rect(wx - 3, wy + winH + 2, wW + 6, 3, c.wallShade, 'opacity="0.8"'));
      body.push(
        poly([[wx, wy + winH], [wx + wW * 0.42, wy], [wx + wW * 0.6, wy], [wx + wW * 0.18, wy + winH]], "#ffffff", 'opacity="0.22"')
      );
    }
  });

  /* garage */
  if (R() > 0.25) {
    const gW = faceW * (0.24 + R() * 0.1);
    const gH = faceH * 0.34;
    const gx = R() > 0.5 ? fx + faceW * 0.06 : fx1 - gW - faceW * 0.06;
    body.push(rect(gx - 3, fy + faceH * 0.5 - 3, gW + 6, gH + 3, c.trim));
    body.push(rect(gx, fy + faceH * 0.5, gW, gH, c.wallShade));
    const panels = 4;
    for (let i = 1; i < panels; i++) {
      body.push(rect(gx, fy + faceH * 0.5 + (gH / panels) * i, gW, 1.6, c.wallSide, 'opacity="0.8"'));
    }
    body.push(rect(gx, fy + faceH * 0.5, gW, 2, c.trim, 'opacity="0.7"'));
  }

  /* front door + portico */
  const dW = faceW * 0.075;
  const dH = faceH * 0.34;
  const dX = fx + faceW * (0.42 + R() * 0.16);
  const dY = horizon - dH;
  body.push(rect(dX - 3, dY - 3, dW + 6, dH + 3, c.trim));
  body.push(rect(dX, dY, dW, dH, c.door));
  body.push(rect(dX + dW * 0.12, dY + dH * 0.16, dW * 0.76, dH * 0.3, c.glassLit, 'opacity="0.5"'));
  body.push(`<circle cx="${r2(dX + dW * 0.82)}" cy="${r2(dY + dH * 0.52)}" r="${r2(dW * 0.07)}" fill="${c.trim}"/>`);
  /* steps */
  body.push(rect(dX - dW * 0.5, horizon - dH * 0.06, dW * 2, dH * 0.06, c.driveShade));

  /* alfresco / pergola */
  if (R() > 0.45) {
    const pW = faceW * 0.3;
    const pX = dX + dW * 1.2;
    if (pX + pW < fx1) {
      const pY = fy + faceH * 0.5;
      body.push(rect(pX, pY, pW, 5, c.trim));
      const slats = Math.floor(pW / (W * 0.016));
      for (let i = 1; i < slats; i++) {
        body.push(rect(pX + (pW / slats) * i, pY, 2.5, 5, c.wallShade, 'opacity="0.5"'));
      }
      body.push(rect(pX + 3, pY, 4, horizon - pY, c.trim, 'opacity="0.9"'));
      body.push(rect(pX + pW - 7, pY, 4, horizon - pY, c.trim, 'opacity="0.9"'));
    }
  }

  /* ground shadow */
  body.push(
    `<ellipse cx="${r2(fx + faceW / 2)}" cy="${r2(horizon + faceH * 0.06)}" rx="${r2(faceW * 0.62)}" ry="${r2(faceH * 0.1)}" fill="#000000" opacity="0.2"/>`
  );

  /* driveway */
  const driveX = R() > 0.5 ? fx1 + faceW * 0.05 : fx - faceW * 0.42;
  const dvw = faceW * 0.34;
  if (driveX > 0 && driveX + dvw < W) {
    body.push(
      poly(
        [
          [driveX, horizon],
          [driveX + dvw, horizon],
          [driveX + dvw * 1.5, H],
          [driveX - dvw * 0.12, H],
        ],
        c.drive,
        'opacity="0.95"'
      )
    );
    const jx = driveX + dvw * 0.42;
    body.push(`<line x1="${r2(jx)}" y1="${r2(horizon)}" x2="${r2(driveX - dvw * 0.12 + dvw * 0.81)}" y2="${r2(H)}" stroke="${c.driveShade}" stroke-width="1.6" opacity="0.6"/>`);
    body.push(`<line x1="${r2(driveX + dvw * 0.08)}" y1="${r2(horizon)}" x2="${r2(driveX - dvw * 0.12 + dvw * 0.3)}" y2="${r2(H)}" stroke="${c.driveShade}" stroke-width="1.2" opacity="0.4"/>`);
  }

  /* path */
  body.push(
    poly(
      [
        [dX, horizon],
        [dX + dW, horizon],
        [dX + dW * 2.6, H * 0.99],
        [dX - dW * 1.1, H * 0.99],
      ],
      c.driveShade,
      'opacity="0.55"'
    )
  );

  /* boundary fence */
  const fenceTop = horizon - faceH * 0.06;
  body.push(rect(0, fenceTop, fx - faceW * 0.02, horizon - fenceTop, c.fence, 'opacity="0.92"'));
  body.push(rect(fx1 + faceW * 0.02, fenceTop, W - (fx1 + faceW * 0.02), horizon - fenceTop, c.fence, 'opacity="0.92"'));
  body.push(rect(0, fenceTop, W, 3, c.trim, 'opacity="0.7"'));

  /* shrubs along facade */
  for (let i = 0; i < 9; i++) {
    const sx = fx + (faceW / 9) * i + R() * (faceW / 18);
    if (Math.abs(sx - (dX + dW / 2)) < dW * 1.4) continue;
    const sh = faceH * (0.08 + R() * 0.08);
    body.push(`<ellipse cx="${r2(sx)}" cy="${r2(horizon - sh * 0.4)}" rx="${r2(sh * 0.85)}" ry="${r2(sh)}" fill="${c.shrub}" opacity="0.92"/>`);
    body.push(`<ellipse cx="${r2(sx - sh * 0.22)}" cy="${r2(horizon - sh * 0.55)}" rx="${r2(sh * 0.45)}" ry="${r2(sh * 0.55)}" fill="${c.tree}" opacity="0.5"/>`);
  }

  /* trees */
  const treeCount = 1 + Math.floor(R() * 2);
  for (let i = 0; i < treeCount; i++) {
    const tx = R() > 0.5 ? W * (0.02 + R() * 0.14) : W * (0.84 + R() * 0.14);
    const th = H * (0.2 + R() * 0.14);
    body.push(rect(tx - W * 0.005, horizon - th * 0.55, W * 0.01, th * 0.55, "#4a3f33", 'opacity="0.85"'));
    for (let k = 0; k < 5; k++) {
      const bx = tx + (R() - 0.5) * th * 0.7;
      const by = horizon - th * 0.55 - R() * th * 0.42;
      const br = th * (0.2 + R() * 0.16);
      body.push(`<circle cx="${r2(bx)}" cy="${r2(by)}" r="${r2(br)}" fill="${c.tree}" opacity="${r2(0.6 + R() * 0.35)}"/>`);
    }
  }

  /* lawn detail */
  for (let i = 0; i < 60; i++) {
    const gx = R() * W;
    const gy = horizon + R() * (H - horizon);
    const gl = H * (0.006 + R() * 0.012);
    body.push(`<line x1="${r2(gx)}" y1="${r2(gy)}" x2="${r2(gx + (R() - 0.5) * gl * 0.6)}" y2="${r2(gy - gl)}" stroke="${c.lawn[2]}" stroke-width="1.3" opacity="0.35"/>`);
  }

  /* atmospheric haze near horizon */
  body.push(rect(0, horizon - H * 0.16, W, H * 0.16, `url(#haze${uid})`));

  return {
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated placeholder of a modern Australian home">` +
      `<defs>${defs.join("")}</defs>` +
      body.join("") +
      `</svg>`,
  };
}

/* ---------- portrait renderer ---------- */

function portraitScene(W, H, scheme, seed) {
  const R = rng(seed);
  const c = scheme;
  const defs = [];
  defs.push(linear(`pb${seed}`, [[0, c.wall], [100, c.wallShade]]));
  defs.push(linear(`pk${seed}`, [[0, c.wallShade], [100, c.wallSide]]));

  const cx = W * (0.38 + R() * 0.24);
  const headR = W * 0.17;
  const headY = H * 0.35;
  const shoulderY = headY + headR * 1.55;

  const skin = ["#e8c39e", "#d9a878", "#c08d63", "#8d6547", "#f0d3b4"][Math.floor(R() * 5)];
  const hair = ["#2e2620", "#4b3728", "#6b5340", "#1f1a16", "#8a6f52"][Math.floor(R() * 5)];
  const shirt = ["#3a4a55", "#5a4a44", "#445a48", "#6b5a4a", "#4a4a52"][Math.floor(R() * 5)];

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated placeholder portrait">` +
    `<defs>${defs.join("")}</defs>` +
    rect(0, 0, W, H, `url(#pb${seed})`) +
    `<circle cx="${r2(cx)}" cy="${r2(headY)}" r="${r2(headR * 2.3)}" fill="#ffffff" opacity="0.2"/>` +
    poly(
      [
        [cx - W * 0.38, H],
        [cx - W * 0.3, shoulderY],
        [cx, shoulderY - headR * 0.35],
        [cx + W * 0.3, shoulderY],
        [cx + W * 0.38, H],
      ],
      shirt
    ) +
    `<rect x="${r2(cx - headR * 0.22)}" y="${r2(shoulderY - headR * 0.2)}" width="${r2(headR * 0.44)}" height="${r2(H * 0.2)}" fill="${skin}"/>` +
    `<ellipse cx="${r2(cx)}" cy="${r2(headY)}" rx="${r2(headR * 0.86)}" ry="${r2(headR)}" fill="${skin}"/>` +
    `<path d="M${r2(cx - headR * 0.9)} ${r2(headY - headR * 0.25)} Q${r2(cx)} ${r2(headY - headR * 1.35)} ${r2(cx + headR * 0.9)} ${r2(headY - headR * 0.25)} Q${r2(cx)} ${r2(headY - headR * 0.85)} ${r2(cx - headR * 0.9)} ${r2(headY - headR * 0.25)} Z" fill="${hair}"/>` +
    `<circle cx="${r2(cx - headR * 0.3)}" cy="${r2(headY - headR * 0.05)}" r="${r2(headR * 0.07)}" fill="#2b2b2b"/>` +
    `<circle cx="${r2(cx + headR * 0.3)}" cy="${r2(headY - headR * 0.05)}" r="${r2(headR * 0.07)}" fill="#2b2b2b"/>` +
    `<path d="M${r2(cx - headR * 0.22)} ${r2(headY + headR * 0.42)} Q${r2(cx)} ${r2(headY + headR * 0.6)} ${r2(cx + headR * 0.22)} ${r2(headY + headR * 0.42)}" stroke="#8a5f4a" stroke-width="${r2(headR * 0.09)}" fill="none" stroke-linecap="round"/>` +
    `</svg>`
  );
}

/* ---------- logo ---------- */

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" role="img" aria-label="Logo mark">
<path d="M24 5 L42 22 H35 V41 H27 V29 H21 V41 H13 V22 H6 Z" fill="currentColor"/>
</svg>`;

/* ---------- build ---------- */

const jobs = [
  ["hero", 1920, 1080, 0, 4101, { center: true, storeys: 1, faceW: 0.58, faceH: 0.44, horizon: 0.84 }],
  ["cta-banner", 1920, 720, 2, 5501, { center: true, storeys: 1, faceW: 0.5, faceH: 0.46, horizon: 0.86 }],
  ["split-2", 1400, 900, 3, 9191, { center: true, storeys: 2, faceW: 0.5, faceH: 0.42, horizon: 0.78 }],
  ["design-1", 900, 640, 0, 1101, { side: false }],
  ["design-2", 900, 640, 1, 2202, { side: true }],
  ["design-3", 900, 640, 4, 3303, { side: false, storeys: 2 }],
  ["design-4", 900, 640, 3, 4404, { side: true }],
  ["design-5", 900, 640, 2, 5505, { side: false }],
  ["design-6", 900, 640, 1, 6606, { side: true, storeys: 2 }],
  ["design-7", 900, 640, 0, 7707, { side: false }],
  ["design-8", 900, 640, 4, 8808, { side: true }],
  ["display-1", 900, 640, 0, 7701, { side: true }],
  ["display-2", 900, 640, 2, 7702, { side: false, storeys: 2 }],
  ["display-3", 900, 640, 1, 7703, { side: true }],
  ["split-1", 1000, 1200, 3, 9091, { side: false, storeys: 2 }],
];

for (const [name, w, h, schemeIdx, seed, opts] of jobs) {
  const { svg } = houseScene(w, h, SCHEMES[schemeIdx % SCHEMES.length], seed, opts);
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
}

const portraits = [
  ["portrait-1", 400, 400, 2, 1001],
  ["portrait-2", 400, 400, 0, 1002],
  ["portrait-3", 400, 400, 3, 1003],
];
for (const [name, w, h, schemeIdx, seed] of portraits) {
  fs.writeFileSync(path.join(OUT, `${name}.svg`), portraitScene(w, h, SCHEMES[schemeIdx % SCHEMES.length], seed));
}

fs.writeFileSync(path.join(OUT, "logo-mark.svg"), logoMark);

console.log(`generated ${fs.readdirSync(OUT).length} files in ${OUT}`);
