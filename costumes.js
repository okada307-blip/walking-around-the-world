// 民族衣装を着た男女のSVGイラスト(国名で引く)

const SKIN = { a: "#f5d6b6", b: "#ebc39c", c: "#d9a77a", d: "#b98457", e: "#8d5a3b" };
const HAIR = { dark: "#2b211c", brown: "#5a3b24", blond: "#d9b35c", red: "#9a4a26" };

const COSTUMES = {
  "日本": {
    label: "着物・浴衣",
    m: { skin: SKIN.a, hair: HAIR.dark, body: "robe", sleeves: "wide", top: "#2e4a7d", topPattern: { type: "stripesV", color2: "#3d5f9c" },
         accents: [{ type: "vcollar", color: "#f5f1e6" }, { type: "obi", color: "#8a7a5a" }] },
    w: { skin: SKIN.a, hair: HAIR.dark, hairStyle: "bun", body: "robe", sleeves: "wide", top: "#d94f6a", topPattern: { type: "floral", color2: "#ffd1dc" },
         accents: [{ type: "vcollar", color: "#ffffff" }, { type: "obi", color: "#e8b84a" }], hat: { type: "kanzashi", color: "#e8b84a", color2: "#c8102e" } },
  },
  "台湾": {
    label: "長袍(チャンパオ)・旗袍(チーパオ)",
    m: { skin: SKIN.a, hair: HAIR.dark, body: "robe", top: "#1f3f6b",
         accents: [{ type: "vest", color: "#1b1b1b" }, { type: "collar", color: "#1b1b1b" }, { type: "buttons", color: "#e8b84a" }] },
    w: { skin: SKIN.a, hair: HAIR.dark, hairStyle: "bun", body: "robe", top: "#c8102e", topPattern: { type: "floral", color2: "#e8b84a" },
         accents: [{ type: "collar", color: "#a00d26" }, { type: "buttons", color: "#e8b84a" }], hat: { type: "flower", color: "#e8b84a" } },
  },
  "ベトナム": {
    label: "アオザイ",
    m: { skin: SKIN.b, hair: HAIR.dark, body: "tunicPants", top: "#1d4e89", topPattern: { type: "dots", color2: "#e8b84a" }, bottom: "#ffffff",
         accents: [{ type: "collar", color: "#1d4e89" }], hat: { type: "khanDong", color: "#18325a" } },
    w: { skin: SKIN.b, hair: HAIR.dark, hairStyle: "long", body: "tunicPants", top: "#ffffff", topPattern: { type: "floral", color2: "#f4a6b8" }, bottom: "#ffffff",
         accents: [{ type: "collar", color: "#ffffff" }], hat: { type: "nonla", color: "#e9d39a" } },
  },
  "ミャンマー": {
    label: "ロンジー・ガウンバウン",
    m: { skin: SKIN.c, hair: HAIR.dark, body: "wrap", top: "#ffffff", bottom: "#6b3f8a", bottomPattern: { type: "plaid", color2: "#3d2257" },
         accents: [{ type: "buttons", color: "#d4c9a8" }], hat: { type: "gaungbaung", color: "#f2a7c3" } },
    w: { skin: SKIN.c, hair: HAIR.dark, hairStyle: "bun", body: "wrap", top: "#fff3d6", bottom: "#b0244a", bottomPattern: { type: "floral", color2: "#e8b84a" },
         accents: [{ type: "shawl", color: "#f7e3b0" }], hat: { type: "flower", color: "#ff6f91" } },
  },
  "キルギス": {
    label: "カルパク・チャパン",
    m: { skin: SKIN.b, hair: HAIR.dark, body: "robe", top: "#1f5d4f",
         accents: [{ type: "trim", color: "#e8b84a" }, { type: "belt", color: "#5a3b24" }], hat: { type: "kalpak", color: "#f5f1e6", color2: "#1b1b1b" } },
    w: { skin: SKIN.b, hair: HAIR.dark, hairStyle: "long", body: "dress", top: "#b3202f", bottom: "#b3202f",
         accents: [{ type: "vest", color: "#1a2c5b" }, { type: "beads", color: "#e8b84a" }], hat: { type: "tebetei", color: "#b3202f", color2: "#5a3b24" } },
  },
  "イラン": {
    label: "カシュガイ族の伝統衣装",
    m: { skin: SKIN.b, hair: HAIR.dark, body: "robe", top: "#e9e2cf", topPattern: { type: "stripesV", color2: "#b9a77f" },
         accents: [{ type: "belt", color: "#5a3b24" }], hat: { type: "qashqaiHat", color: "#9a7b55", color2: "#7a5f3e" } },
    w: { skin: SKIN.b, hair: HAIR.dark, body: "dress", top: "#7a1f5c", bottom: "#2a6f97",
         accents: [{ type: "layers", colors: ["#e8b84a", "#c8102e", "#2a9d8f"] }, { type: "beads", color: "#e8b84a" }],
         hat: { type: "headscarf", color: "#e8b84a", pattern: { type: "floral", color2: "#c8102e" } } },
  },
  "ポーランド": {
    label: "クラクフの民族衣装",
    m: { skin: SKIN.a, hair: HAIR.brown, body: "shirtPants", top: "#ffffff", bottom: "#c8102e", bottomPattern: { type: "stripesV", color2: "#ffffff" },
         accents: [{ type: "vest", color: "#1d3f8a" }, { type: "belt", color: "#8a5a2b" }], hat: { type: "feather", color: "#c8102e" } },
    w: { skin: SKIN.a, hair: HAIR.blond, hairStyle: "long", body: "shirtSkirt", top: "#ffffff", bottom: "#c8102e", bottomPattern: { type: "floral", color2: "#f7d046" },
         accents: [{ type: "bodice", color: "#1b1b1b" }, { type: "apron", color: "#ffffff" }, { type: "beads", color: "#c8102e" }],
         hat: { type: "wreath", colors: ["#c8102e", "#f7d046", "#3a86ff", "#2a9d8f"] } },
  },
  "ウクライナ": {
    label: "ヴィシヴァンカ(刺繍シャツ)",
    m: { skin: SKIN.a, hair: HAIR.brown, body: "shirtPants", wide: true, top: "#ffffff", bottom: "#1d4e89",
         accents: [{ type: "embroidery", color: "#c8102e" }, { type: "sash", color: "#c8102e" }] },
    w: { skin: SKIN.a, hair: HAIR.brown, hairStyle: "long", body: "shirtSkirt", top: "#ffffff", bottom: "#7a1424", bottomPattern: { type: "check", color2: "#1b1b1b" },
         accents: [{ type: "embroidery", color: "#c8102e" }, { type: "vest", color: "#1b1b1b" }, { type: "beads", color: "#c8102e" }],
         hat: { type: "wreath", colors: ["#c8102e", "#f7d046", "#3a86ff", "#ff8fab"] } },
  },
  "ラトビア": {
    label: "タウタステールプス(民族衣装)",
    m: { skin: SKIN.a, hair: HAIR.blond, body: "coat", top: "#8c8c8c", bottom: "#e8e2d0",
         accents: [{ type: "sash", color: "#c8102e", pattern: { type: "stripesH", color2: "#ffffff" } }], hat: { type: "brimhat", color: "#2b2b2b", color2: "#c8102e" } },
    w: { skin: SKIN.a, hair: HAIR.blond, hairStyle: "long", body: "shirtSkirt", top: "#ffffff", bottom: "#3a5a40", bottomPattern: { type: "stripesV", color2: "#c8102e" },
         accents: [{ type: "embroidery", color: "#c8102e" }, { type: "shawl", color: "#e8e2d0" }], hat: { type: "crown", color: "#c8102e", color2: "#e8b84a" } },
  },
  "スペイン": {
    label: "カタルーニャの伝統衣装",
    m: { skin: SKIN.b, hair: HAIR.dark, body: "breeches", top: "#ffffff", bottom: "#2b2b2b", socks: "#ffffff",
         accents: [{ type: "vest", color: "#1b1b1b" }, { type: "sash", color: "#c8102e" }], hat: { type: "barretina", color: "#c8102e", color2: "#a00d26" } },
    w: { skin: SKIN.b, hair: HAIR.dark, hairStyle: "bun", body: "shirtSkirt", top: "#ffffff", bottom: "#2d3a6b",
         accents: [{ type: "shawl", color: "#c8102e", pattern: { type: "floral", color2: "#f7d046" } }, { type: "apron", color: "#f5f1e6" }], hat: { type: "lacecap", color: "#ffffff" } },
  },
  "デンマーク": {
    label: "デンマークの民族衣装",
    m: { skin: SKIN.a, hair: HAIR.blond, body: "breeches", top: "#ffffff", bottom: "#e8dcb5", socks: "#1d3f8a",
         accents: [{ type: "vest", color: "#c8102e" }, { type: "buttons", color: "#e8b84a" }], hat: { type: "stockingcap", color: "#c8102e", color2: "#a00d26" } },
    w: { skin: SKIN.a, hair: HAIR.blond, hairStyle: "long", body: "shirtSkirt", top: "#ffffff", bottom: "#1d3f8a",
         accents: [{ type: "bodice", color: "#c8102e" }, { type: "apron", color: "#ffffff" }, { type: "shawl", color: "#e8b84a" }], hat: { type: "bonnet", color: "#ffffff" } },
  },
  "イギリス": {
    label: "キルト(スコットランド)",
    m: { skin: SKIN.a, hair: HAIR.red, body: "kilt", top: "#ffffff", bottom: "#1f5d3a", bottomPattern: { type: "plaid", color2: "#c8102e" }, socks: "#e8e2d0",
         accents: [{ type: "vest", color: "#2b2b2b" }, { type: "sporran", color: "#5a3b24" }], hat: { type: "tam", color: "#1d3f8a", color2: "#1f5d3a" } },
    w: { skin: SKIN.a, hair: HAIR.red, hairStyle: "long", body: "shirtSkirt", top: "#ffffff", bottom: "#1f5d3a", bottomPattern: { type: "plaid", color2: "#c8102e" },
         accents: [{ type: "bodice", color: "#2b2b2b" }, { type: "tartanSash", color: "#1f5d3a", pattern: { type: "plaid", color2: "#c8102e" } }] },
  },
  "アイスランド": {
    label: "ロパペイサ・ペイスフォト",
    m: { skin: SKIN.a, hair: HAIR.blond, body: "shirtPants", top: "#e8e2d0", bottom: "#3a3a3a",
         accents: [{ type: "yoke", color: "#5a3b24" }] },
    w: { skin: SKIN.a, hair: HAIR.blond, hairStyle: "long", body: "dress", top: "#1b1b1b", bottom: "#1b1b1b",
         accents: [{ type: "bow", color: "#2a6f97" }], hat: { type: "skotthufa", color: "#1b1b1b", color2: "#e8b84a" } },
  },
  "カナダ": {
    label: "ケベックの伝統的な装い(ボヤジュール風)",
    m: { skin: SKIN.a, hair: HAIR.brown, body: "coat", top: "#f5f1e6", bottom: "#3a3a3a",
         accents: [{ type: "capoteStripes", colors: ["#c8102e", "#1d3f8a"] }, { type: "sash", color: "#c8102e", pattern: { type: "stripesV", color2: "#f7d046" } }],
         hat: { type: "tuque", color: "#c8102e", color2: "#f5f1e6" } },
    w: { skin: SKIN.b, hair: HAIR.brown, hairStyle: "long", body: "shirtSkirt", top: "#1d3f8a", bottom: "#5a3b24",
         accents: [{ type: "shawl", color: "#f5f1e6" }, { type: "sash", color: "#c8102e", pattern: { type: "stripesV", color2: "#f7d046" } }],
         hat: { type: "tuque", color: "#f5f1e6", color2: "#c8102e" } },
  },
  "キューバ": {
    label: "グアヤベラ・バタクバーナ",
    m: { skin: SKIN.d, hair: HAIR.dark, body: "shirtPants", top: "#ffffff", bottom: "#e8dcb5",
         accents: [{ type: "pleats", color: "#d9d3c7" }, { type: "buttons", color: "#cfcfcf" }], hat: { type: "strawhat", color: "#d8b56a" } },
    w: { skin: SKIN.e, hair: HAIR.dark, body: "dress", top: "#ffffff", bottom: "#ffffff",
         accents: [{ type: "ruffles", color: "#dcdcdc" }, { type: "beads", color: "#e8b84a" }], hat: { type: "headscarf", color: "#c8102e", knot: true } },
  },
};

function patternDef(id, color, pat) {
  const c2 = pat.color2;
  const body = {
    stripesV: `<rect width="6" height="6" fill="${color}"/><rect width="2" height="6" fill="${c2}"/>`,
    stripesH: `<rect width="6" height="6" fill="${color}"/><rect width="6" height="2" fill="${c2}"/>`,
    plaid: `<rect width="10" height="10" fill="${color}"/><rect width="3" height="10" fill="${c2}" opacity=".6"/><rect width="10" height="3" fill="${c2}" opacity=".6"/><rect x="6" width="1" height="10" fill="#fff" opacity=".35"/>`,
    check: `<rect width="8" height="8" fill="${color}"/><rect width="4" height="4" fill="${c2}"/><rect x="4" y="4" width="4" height="4" fill="${c2}"/>`,
    dots: `<rect width="8" height="8" fill="${color}"/><circle cx="4" cy="4" r="1.2" fill="${c2}"/>`,
    floral: `<rect width="12" height="12" fill="${color}"/><circle cx="3" cy="3" r="1.8" fill="${c2}"/><circle cx="9" cy="9" r="1.8" fill="${c2}"/><circle cx="3" cy="3" r=".7" fill="#fff"/>`,
  }[pat.type];
  const size = { stripesV: 6, stripesH: 6, plaid: 10, check: 8, dots: 8, floral: 12 }[pat.type];
  return `<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">${body}</pattern>`;
}

function drawPerson(p, cx, fill) {
  const X = (d) => (cx + d).toFixed(1);
  const o = [];
  const top = fill(p.top, p.topPattern);
  const bottom = p.bottom ? fill(p.bottom, p.bottomPattern) : top;
  const hat = p.hat ? HATS[p.hat.type] : null;

  if (p.hairStyle === "long") o.push(`<path d="M${X(-15)},34 L${X(-16)},76 Q${cx},82 ${X(16)},76 L${X(15)},34 Z" fill="${p.hair}"/>`);
  if (hat && hat.back) o.push(hat.back(X, cx, p.hat, fill));

  const legs = (color, wide) => wide
    ? `<path d="M${X(-13)},86 L${X(0)},86 L${X(-3)},146 L${X(-10)},146 Z M${X(0)},86 L${X(13)},86 L${X(10)},146 L${X(3)},146 Z" fill="${color}"/>`
    : `<path d="M${X(-11)},86 L${X(-1)},86 L${X(-2)},146 L${X(-10)},146 Z M${X(1)},86 L${X(11)},86 L${X(10)},146 L${X(2)},146 Z" fill="${color}"/>`;
  const torso = `<path d="M${X(-16)},54 L${X(16)},54 L${X(12)},88 L${X(-12)},88 Z" fill="${top}"/>`;
  const skirt = (w) => `<path d="M${X(-12)},86 L${X(12)},86 L${X(w)},146 L${X(-w)},146 Z" fill="${bottom}"/>`;

  o.push(`<ellipse cx="${X(-6)}" cy="147" rx="5" ry="2.5" fill="#3a2a20"/><ellipse cx="${X(6)}" cy="147" rx="5" ry="2.5" fill="#3a2a20"/>`);
  o.push(`<rect x="${X(-3)}" y="46" width="6" height="10" fill="${p.skin}"/>`);

  switch (p.body) {
    case "robe":
      o.push(`<path d="M${X(-16)},54 L${X(16)},54 L${X(14)},88 L${X(17)},146 L${X(-17)},146 L${X(-14)},88 Z" fill="${top}"/>`);
      break;
    case "dress":
      o.push(skirt(24), torso);
      break;
    case "shirtSkirt":
      o.push(skirt(22), torso);
      break;
    case "wrap":
      o.push(`<path d="M${X(-13)},86 L${X(13)},86 L${X(15)},146 L${X(-15)},146 Z" fill="${bottom}"/>`, torso);
      break;
    case "tunicPants":
      o.push(legs(bottom), `<path d="M${X(-14)},86 L${X(14)},86 L${X(15)},130 L${X(-15)},130 Z" fill="${top}"/>`, torso);
      break;
    case "shirtPants":
      o.push(legs(bottom, p.wide), torso);
      break;
    case "kilt":
      o.push(`<path d="M${X(-10)},112 L${X(-2)},112 L${X(-2)},146 L${X(-10)},146 Z M${X(2)},112 L${X(10)},112 L${X(10)},146 L${X(2)},146 Z" fill="${p.skin}"/>`);
      o.push(`<path d="M${X(-10)},126 L${X(-2)},126 L${X(-2)},146 L${X(-10)},146 Z M${X(2)},126 L${X(10)},126 L${X(10)},146 L${X(2)},146 Z" fill="${p.socks}"/>`);
      o.push(`<path d="M${X(-13)},86 L${X(13)},86 L${X(16)},120 L${X(-16)},120 Z" fill="${bottom}"/>`, torso);
      break;
    case "breeches":
      o.push(legs(p.socks));
      o.push(`<path d="M${X(-12)},86 L${X(12)},86 L${X(12)},118 L${X(1)},118 L${X(0)},100 L${X(-1)},118 L${X(-12)},118 Z" fill="${bottom}"/>`, torso);
      break;
    case "coat":
      o.push(legs(bottom));
      o.push(`<path d="M${X(-16)},54 L${X(16)},54 L${X(14)},88 L${X(18)},126 L${X(-18)},126 L${X(-14)},88 Z" fill="${top}"/>`);
      o.push(`<line x1="${cx}" y1="58" x2="${cx}" y2="126" stroke="#000" stroke-opacity=".15"/>`);
      break;
  }

  (p.accents || []).forEach((a) => { const f = ACCENTS[a.type]; if (f) o.push(f(X, cx, a, fill)); });

  if (p.sleeves === "wide") {
    o.push(`<path d="M${X(-16)},54 L${X(-27)},62 L${X(-27)},94 L${X(-14)},90 Z M${X(16)},54 L${X(27)},62 L${X(27)},94 L${X(14)},90 Z" fill="${top}"/>`);
    o.push(`<circle cx="${X(-20)}" cy="92" r="4" fill="${p.skin}"/><circle cx="${X(20)}" cy="92" r="4" fill="${p.skin}"/>`);
  } else {
    o.push(`<path d="M${X(-16)},55 L${X(-11)},60 L${X(-15)},92 L${X(-22)},90 Z M${X(16)},55 L${X(11)},60 L${X(15)},92 L${X(22)},90 Z" fill="${top}"/>`);
    o.push(`<circle cx="${X(-19)}" cy="94" r="4" fill="${p.skin}"/><circle cx="${X(19)}" cy="94" r="4" fill="${p.skin}"/>`);
  }

  o.push(`<circle cx="${cx}" cy="34" r="15" fill="${p.skin}"/>`);
  o.push(`<circle cx="${X(-5)}" cy="36" r="1.7" fill="#333"/><circle cx="${X(5)}" cy="36" r="1.7" fill="#333"/>`);
  o.push(`<path d="M${X(-4)},42 Q${cx},45.5 ${X(4)},42" stroke="#a0524a" stroke-width="1.3" fill="none" stroke-linecap="round"/>`);
  o.push(`<circle cx="${X(-9)}" cy="40" r="2.5" fill="#ff8fa3" opacity=".35"/><circle cx="${X(9)}" cy="40" r="2.5" fill="#ff8fa3" opacity=".35"/>`);
  o.push(`<path d="M${X(-15.5)},37 A15.5,15.5 0 0 1 ${X(15.5)},37 Q${X(10)},24 ${cx},25 Q${X(-10)},24 ${X(-15.5)},37 Z" fill="${p.hair}"/>`);
  if (p.hairStyle === "bun") o.push(`<circle cx="${cx}" cy="17" r="7" fill="${p.hair}"/>`);
  if (hat && hat.front) o.push(hat.front(X, cx, p.hat, fill));
  return o.join("");
}

const ACCENTS = {
  obi: (X, cx, a) => `<rect x="${X(-15)}" y="78" width="30" height="12" fill="${a.color}"/>`,
  vcollar: (X, cx, a) => `<path d="M${X(-7)},54 L${cx},72 L${X(7)},54" stroke="${a.color}" stroke-width="2.5" fill="none"/>`,
  collar: (X, cx, a) => `<rect x="${X(-6)}" y="49" width="12" height="7" rx="1.5" fill="${a.color}"/>`,
  buttons: (X, cx, a) => [62, 70, 78].map((y) => `<circle cx="${cx}" cy="${y}" r="1.6" fill="${a.color}"/>`).join(""),
  vest: (X, cx, a, fill) => `<path d="M${X(-16)},54 L${X(-5)},54 L${X(-4)},88 L${X(-12.5)},88 Z M${X(16)},54 L${X(5)},54 L${X(4)},88 L${X(12.5)},88 Z" fill="${fill(a.color, a.pattern)}"/>`,
  trim: (X, cx, a) => `<path d="M${cx},56 L${cx},146 M${X(-17)},143 L${X(17)},143" stroke="${a.color}" stroke-width="2.5"/>`,
  belt: (X, cx, a) => `<rect x="${X(-13)}" y="85" width="26" height="4" fill="${a.color}"/>`,
  sash: (X, cx, a, fill) => `<rect x="${X(-13)}" y="83" width="26" height="7" fill="${fill(a.color, a.pattern)}"/><rect x="${X(7)}" y="88" width="5" height="22" fill="${fill(a.color, a.pattern)}"/>`,
  bodice: (X, cx, a) => `<path d="M${X(-14)},66 L${X(14)},66 L${X(12)},88 L${X(-12)},88 Z" fill="${a.color}"/><path d="M${X(-2)},68 L${X(2)},72 M${X(2)},68 L${X(-2)},72 M${X(-2)},76 L${X(2)},80 M${X(2)},76 L${X(-2)},80" stroke="#e8b84a" stroke-width=".8"/>`,
  apron: (X, cx, a, fill) => `<rect x="${X(-10)}" y="89" width="20" height="50" rx="3" fill="${fill(a.color, a.pattern)}" stroke="#000" stroke-opacity=".08"/>`,
  embroidery: (X, cx, a) => `<rect x="${X(-2.5)}" y="55" width="5" height="24" fill="${a.color}"/>` +
    [-7, -4, 4, 7].map((d) => `<circle cx="${X(d)}" cy="57" r="1.2" fill="${a.color}"/>`).join("") +
    `<path d="M${X(-21)},86 L${X(-15)},88 M${X(21)},86 L${X(15)},88" stroke="${a.color}" stroke-width="2.5"/>`,
  shawl: (X, cx, a, fill) => `<path d="M${X(-17)},54 L${X(17)},54 L${X(4)},80 L${cx},83 L${X(-4)},80 Z" fill="${fill(a.color, a.pattern)}"/>`,
  tartanSash: (X, cx, a, fill) => `<path d="M${X(-16)},54 L${X(-8)},54 L${X(14)},88 L${X(6)},90 Z" fill="${fill(a.color, a.pattern)}"/>`,
  pleats: (X, cx, a) => [-9, -5, 5, 9].map((d) => `<line x1="${X(d)}" y1="58" x2="${X(d * 0.8)}" y2="86" stroke="${a.color}" stroke-width="1.2"/>`).join(""),
  sporran: (X, cx, a) => `<rect x="${X(-4)}" y="90" width="8" height="12" rx="2" fill="${a.color}"/><circle cx="${cx}" cy="96" r="1.5" fill="#e8e2d0"/>`,
  yoke: (X, cx, a) => `<path d="M${X(-16)},58 Q${cx},76 ${X(16)},58" stroke="${a.color}" stroke-width="6" fill="none" stroke-dasharray="3 2"/><path d="M${X(-15)},64 Q${cx},80 ${X(15)},64" stroke="${a.color}" stroke-width="1.5" fill="none"/>`,
  beads: (X, cx, a) => [0, 1, 2, 3, 4, 5, 6].map((t) => `<circle cx="${X((t - 3) * 3.2)}" cy="${(56 + (9 - (t - 3) ** 2) * 0.6).toFixed(1)}" r="1.6" fill="${a.color}"/>`).join(""),
  layers: (X, cx, a) => [110, 124, 138].map((y, i) => { const w = 12 + ((y - 86) / 60) * 12; return `<rect x="${X(-w)}" y="${y}" width="${(2 * w).toFixed(1)}" height="4" fill="${a.colors[i]}"/>`; }).join(""),
  ruffles: (X, cx, a) => [104, 118, 132, 144].map((y) => { const w = 12 + ((y - 86) / 60) * 12; let d = `M${X(-w)},${y}`; for (let x = -w; x < w; x += 4) d += ` q2,3 4,0`; return `<path d="${d}" stroke="${a.color}" stroke-width="1.5" fill="none"/>`; }).join(""),
  capoteStripes: (X, cx, a) => `<rect x="${X(-17.5)}" y="110" width="35" height="5" fill="${a.colors[0]}"/><rect x="${X(-17.8)}" y="117" width="35.6" height="3" fill="${a.colors[1]}"/>`,
  bow: (X, cx, a) => `<path d="M${cx},57 L${X(-6)},53 L${X(-6)},61 Z M${cx},57 L${X(6)},53 L${X(6)},61 Z" fill="${a.color}"/>`,
};

const capShape = (X, h, tip) => `<path d="M${X(-15)},28 Q${X(-14)},10 ${X(2)},8 Q${X(20)},6 ${X(26)},18 Q${X(22)},22 ${X(14)},19 L${X(15)},28 Z" fill="${h.color}"/><rect x="${X(-16)}" y="24" width="32" height="5" rx="2" fill="${h.color2}"/>${tip}`;

const HATS = {
  nonla: { front: (X, cx, h) => `<polygon points="${X(-28)},31 ${cx},3 ${X(28)},31" fill="${h.color}" stroke="#b89c5a"/><path d="M${X(-14)},17 L${X(14)},17 M${X(-21)},24 L${X(21)},24" stroke="#b89c5a" stroke-width=".7"/>` },
  kalpak: { front: (X, cx, h) => `<path d="M${X(-15)},28 Q${X(-14)},3 ${cx},1 Q${X(14)},3 ${X(15)},28 Z" fill="${h.color}" stroke="#cfc8b5" stroke-width=".8"/><path d="M${X(-16)},29 L${X(16)},29 L${X(15)},22 L${X(-15)},22 Z" fill="${h.color2}"/><path d="M${X(-6)},18 Q${cx},8 ${X(6)},18" stroke="${h.color2}" fill="none"/>` },
  barretina: { front: (X, cx, h) => capShape(X, h, "") },
  stockingcap: { front: (X, cx, h) => capShape(X, h, `<path d="M${X(26)},18 L${X(29)},26" stroke="${h.color2}" stroke-width="2"/>`) },
  tuque: { front: (X, cx, h) => capShape(X, h, `<circle cx="${X(26)}" cy="18" r="4" fill="${h.color2}"/>`) },
  wreath: {
    back: (X, cx, h) => h.colors.map((c, i) => `<rect x="${X(-9 + i * 5)}" y="34" width="4" height="62" fill="${c}"/>`).join(""),
    front: (X, cx, h) => [[-15, 27], [-10, 20], [-3, 17], [4, 17], [11, 20], [16, 27]]
      .map(([dx, y], i) => `<circle cx="${X(dx)}" cy="${y}" r="4.5" fill="${h.colors[i % h.colors.length]}"/><circle cx="${X(dx)}" cy="${y}" r="1.5" fill="#ffe066"/>`).join(""),
  },
  crown: { front: (X, cx, h) => `<path d="M${X(-15)},27 L${X(-15)},15 L${X(15)},15 L${X(15)},27 Q${cx},23 ${X(-15)},27 Z" fill="${h.color}"/>` + [-12, -6, 0, 6, 12].map((d) => `<rect x="${X(d - 1.5)}" y="18" width="3" height="4" fill="${h.color2}"/>`).join("") },
  feather: { front: (X, cx, h) => `<rect x="${X(-14)}" y="12" width="28" height="14" rx="2" fill="${h.color}"/><rect x="${X(-15)}" y="23" width="30" height="5" rx="2" fill="#1b1b1b"/><path d="M${X(8)},14 Q${X(14)},-4 ${X(21)},0 Q${X(17)},8 ${X(10)},14 Z" fill="#2a9d8f"/><circle cx="${X(16)}" cy="3" r="2.5" fill="#1d3f8a"/>` },
  gaungbaung: { front: (X, cx, h) => `<path d="M${X(-16)},31 Q${X(-16)},16 ${cx},16 Q${X(16)},16 ${X(16)},31 Q${cx},24 ${X(-16)},31 Z" fill="${h.color}"/><ellipse cx="${X(15)}" cy="22" rx="6" ry="4" fill="${h.color}" stroke="#000" stroke-opacity=".1"/>` },
  khanDong: { front: (X, cx, h) => `<path d="M${X(-16)},31 Q${X(-16)},16 ${cx},16 Q${X(16)},16 ${X(16)},31 Q${cx},24 ${X(-16)},31 Z" fill="${h.color}"/><path d="M${X(-14)},24 Q${cx},19 ${X(14)},24" stroke="#fff" stroke-opacity=".25" fill="none"/>` },
  tam: { front: (X, cx, h) => `<ellipse cx="${cx}" cy="20" rx="20" ry="7" fill="${h.color}"/><rect x="${X(-14)}" y="22" width="28" height="5" rx="2" fill="${h.color2}"/><circle cx="${cx}" cy="13" r="3.5" fill="#c8102e"/>` },
  skotthufa: { front: (X, cx, h) => `<ellipse cx="${X(3)}" cy="21" rx="11" ry="5" fill="${h.color}"/><path d="M${X(12)},22 Q${X(21)},34 ${X(19)},58" stroke="${h.color}" stroke-width="2.5" fill="none"/><rect x="${X(16)}" y="36" width="6" height="7" fill="${h.color2}"/>` },
  headscarf: {
    back: (X, cx, h, fill) => `<path d="M${X(-18)},36 Q${X(-21)},62 ${X(-14)},64 L${X(14)},64 Q${X(21)},62 ${X(18)},36 Z" fill="${fill(h.color, h.pattern)}"/>`,
    front: (X, cx, h, fill) => `<path d="M${X(-17)},40 Q${X(-18)},13 ${cx},13 Q${X(18)},13 ${X(17)},40 Q${X(13)},24 ${cx},24 Q${X(-13)},24 ${X(-17)},40 Z" fill="${fill(h.color, h.pattern)}"/>` +
      (h.knot ? `<ellipse cx="${X(9)}" cy="13" rx="6" ry="4" fill="${h.color}"/><ellipse cx="${X(15)}" cy="11" rx="4" ry="3" fill="${h.color}"/>` : ""),
  },
  tebetei: { front: (X, cx, h) => `<path d="M${X(-14)},24 Q${X(-12)},5 ${cx},5 Q${X(12)},5 ${X(14)},24 Z" fill="${h.color}"/><rect x="${X(-17)}" y="20" width="34" height="9" rx="4.5" fill="${h.color2}"/><circle cx="${cx}" cy="5" r="2" fill="#e8b84a"/>` },
  qashqaiHat: { front: (X, cx, h) => `<path d="M${X(-13)},25 Q${X(-12)},7 ${cx},7 Q${X(12)},7 ${X(13)},25 Z" fill="${h.color}"/><path d="M${X(-14)},25 L${X(-21)},13 L${X(-11)},18 Z M${X(14)},25 L${X(21)},13 L${X(11)},18 Z" fill="${h.color2}"/>` },
  bonnet: { front: (X, cx, h) => `<path d="M${X(-17)},38 Q${X(-18)},13 ${cx},12 Q${X(18)},13 ${X(17)},38 Q${X(14)},25 ${cx},25 Q${X(-14)},25 ${X(-17)},38 Z" fill="${h.color}" stroke="#d9d3c7"/>` + [-12, -6, 0, 6, 12].map((d) => `<circle cx="${X(d)}" cy="${25 + Math.abs(d) * 0.6}" r="1.6" fill="${h.color}" stroke="#d9d3c7" stroke-width=".6"/>`).join("") },
  lacecap: {
    back: (X, cx, h) => `<path d="M${X(-16)},28 Q${X(-24)},60 ${X(-18)},70 L${X(18)},70 Q${X(24)},60 ${X(16)},28 Z" fill="${h.color}" opacity=".75"/>`,
    front: (X, cx, h) => [-14, -9, -4, 1, 6, 11, 15].map((d) => `<circle cx="${X(d)}" cy="${(22 - Math.cos((d / 16) * 1.4) * 4).toFixed(1)}" r="2.6" fill="${h.color}" stroke="#ddd" stroke-width=".5"/>`).join(""),
  },
  strawhat: { front: (X, cx, h) => `<ellipse cx="${cx}" cy="24" rx="27" ry="6" fill="${h.color}" stroke="#b8954a" stroke-width=".7"/><path d="M${X(-13)},24 Q${X(-12)},7 ${cx},7 Q${X(12)},7 ${X(13)},24 Z" fill="${h.color}" stroke="#b8954a" stroke-width=".7"/><rect x="${X(-13)}" y="18" width="26" height="4" fill="#5a3b24"/>` },
  brimhat: { front: (X, cx, h) => `<ellipse cx="${cx}" cy="24" rx="22" ry="5" fill="${h.color}"/><path d="M${X(-12)},24 Q${X(-11)},8 ${cx},8 Q${X(11)},8 ${X(12)},24 Z" fill="${h.color}"/><rect x="${X(-12)}" y="19" width="24" height="3" fill="${h.color2}"/>` },
  kanzashi: { front: (X, cx, h) => `<line x1="${X(2)}" y1="21" x2="${X(14)}" y2="11" stroke="${h.color}" stroke-width="1.6"/><circle cx="${X(11)}" cy="14" r="3.2" fill="${h.color2}"/><circle cx="${X(11)}" cy="14" r="1.2" fill="#fff"/>` },
  flower: { front: (X, cx, h) => [[0, -3], [3, 0], [0, 3], [-3, 0]].map(([dx, dy]) => `<circle cx="${X(13 + dx)}" cy="${26 + dy}" r="2.6" fill="${h.color}"/>`).join("") + `<circle cx="${X(13)}" cy="26" r="1.6" fill="#ffe066"/>` },
};

let costumeSeq = 0;
function costumeHtml(country) {
  const spec = COSTUMES[country];
  if (!spec) return "";
  const uid = `cs${costumeSeq++}`;
  const defs = [];
  let n = 0;
  const fill = (color, pat) => {
    if (!pat) return color;
    const id = `${uid}p${n++}`;
    defs.push(patternDef(id, color, pat));
    return `url(#${id})`;
  };
  const man = drawPerson(spec.m, 52, fill);
  const woman = drawPerson(spec.w, 128, fill);
  return `<figure class="costume">
    <svg viewBox="0 0 180 156" role="img" aria-label="${spec.label}を着た男女のイラスト"><defs>${defs.join("")}</defs>
      <ellipse cx="90" cy="148" rx="78" ry="6" fill="#000" opacity=".08"/>${man}${woman}</svg>
    <figcaption>民族衣装: ${spec.label}</figcaption>
  </figure>`;
}
