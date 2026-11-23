// SVG世界地図の描画 + 訪問都市ピン表示
// メルカトル投影で緯度経度をSVG座標に変換

const MAP_W = 1000;
const MAP_H = 500;

function lngToX(lng) {
  return ((lng + 180) / 360) * MAP_W;
}
function latToY(lat) {
  const rad = (lat * Math.PI) / 180;
  const merc = Math.log(Math.tan(Math.PI / 4 + rad / 2));
  return MAP_H / 2 - (merc / Math.PI) * MAP_H * 0.78;
}

function buildMap(visitedCount) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("world-map-svg");
  if (!svg) return;
  svg.innerHTML = "";
  svg.setAttribute("viewBox", `0 0 ${MAP_W} ${MAP_H}`);

  // 海背景
  const bg = document.createElementNS(svgNS, "rect");
  bg.setAttribute("width", MAP_W);
  bg.setAttribute("height", MAP_H);
  bg.setAttribute("fill", "#b8d8e8");
  svg.appendChild(bg);

  // 大陸パス(簡略SVGパス)
  const landPaths = getLandPaths();
  landPaths.forEach(d => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "#e9dcc4");
    path.setAttribute("stroke", "#c9a86a");
    path.setAttribute("stroke-width", "1");
    svg.appendChild(path);
  });

  // ルートライン(訪問済み都市間)
  for (let i = 0; i < visitedCount - 1; i++) {
    const a = ROUTE[i], b = ROUTE[i + 1];
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", lngToX(a.lng));
    line.setAttribute("y1", latToY(a.lat));
    line.setAttribute("x2", lngToX(b.lng));
    line.setAttribute("y2", latToY(b.lat));
    line.setAttribute("stroke", "#d96c4a");
    line.setAttribute("stroke-width", "1.5");
    line.setAttribute("stroke-dasharray", "4,3");
    line.setAttribute("opacity", "0.7");
    svg.appendChild(line);
  }

  // ピン表示(訪問済み都市)
  for (let i = 0; i <= Math.min(visitedCount, ROUTE.length - 1); i++) {
    const city = ROUTE[i];
    const cx = lngToX(city.lng);
    const cy = latToY(city.lat);
    const isLast = i === visitedCount;

    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "city-pin");
    g.style.cursor = "pointer";
    g.addEventListener("click", () => showCityPopup(city, cx, cy));

    // ピン円
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", isLast ? "8" : "6");
    circle.setAttribute("fill", isLast ? "#d96c4a" : "#2b5d6b");
    circle.setAttribute("stroke", "#fff");
    circle.setAttribute("stroke-width", "2");
    g.appendChild(circle);

    // 現在地は点滅リング
    if (isLast) {
      const ring = document.createElementNS(svgNS, "circle");
      ring.setAttribute("cx", cx);
      ring.setAttribute("cy", cy);
      ring.setAttribute("r", "12");
      ring.setAttribute("fill", "none");
      ring.setAttribute("stroke", "#d96c4a");
      ring.setAttribute("stroke-width", "2");
      ring.setAttribute("opacity", "0.5");
      ring.innerHTML = `<animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>`;
      g.appendChild(ring);
    }

    svg.appendChild(g);
  }
}

// ポップアップ表示
function showCityPopup(city, px, py) {
  const popup = document.getElementById("map-popup");
  const mapContainer = document.getElementById("map-container");
  if (!popup || !mapContainer) return;

  document.getElementById("popup-flag").textContent = city.flag;
  document.getElementById("popup-name").textContent = city.name;
  document.getElementById("popup-country").textContent = city.country;
  document.getElementById("popup-info").innerHTML = cityInfoHtml(city);

  popup.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("popup-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", () => {
    document.getElementById("map-popup").classList.remove("show");
  });
});

// 簡略化された大陸アウトライン(メルカトル座標で描画)
function getLandPaths() {
  function p(coords) {
    return coords.map(([lng, lat], i) =>
      `${i === 0 ? "M" : "L"}${lngToX(lng).toFixed(1)},${latToY(lat).toFixed(1)}`
    ).join(" ") + " Z";
  }

  return [
    // 北アメリカ
    p([[-168,72],[-140,72],[-95,75],[-65,83],[-20,83],[-15,70],[-60,65],[-65,47],[-55,47],[-52,47],[-65,44],[-70,42],[-75,35],[-80,25],[-87,16],[-85,10],[-77,8],[-80,0],[-75,0],[-70,12],[-65,18],[-60,20],[-80,25],[-85,30],[-90,30],[-90,35],[-100,37],[-110,32],[-117,32],[-122,37],[-124,45],[-130,55],[-140,58],[-150,60],[-155,58],[-160,55],[-168,55],[-168,72]]),
    // 南アメリカ
    p([[-80,10],[-65,12],[-60,8],[-50,2],[-35,-5],[-35,-10],[-38,-15],[-40,-22],[-45,-23],[-48,-28],[-52,-33],[-58,-38],[-65,-42],[-68,-55],[-70,-55],[-72,-50],[-75,-45],[-70,-40],[-65,-35],[-60,-30],[-55,-25],[-52,-20],[-48,-15],[-48,-10],[-50,-5],[-60,0],[-65,0],[-70,5],[-75,8],[-80,10]]),
    // ヨーロッパ
    p([[-10,36],[0,36],[5,43],[10,44],[15,47],[20,48],[25,47],[30,46],[35,42],[28,41],[26,38],[23,38],[22,42],[18,40],[15,38],[12,38],[8,44],[3,46],[0,51],[-5,48],[-8,44],[-10,36]]),
    // スカンジナビア
    p([[5,58],[8,58],[12,56],[18,58],[22,60],[25,65],[28,70],[25,72],[20,70],[15,70],[10,63],[5,58]]),
    // アフリカ
    p([[-5,36],[10,37],[15,37],[35,32],[37,25],[40,15],[43,12],[42,2],[40,-5],[35,-20],[32,-25],[30,-30],[28,-35],[18,-35],[15,-30],[12,-20],[10,-5],[8,5],[0,5],[-5,5],[-8,15],[-12,20],[-15,25],[-15,30],[-5,36]]),
    // アジア(簡略)
    p([[35,42],[40,38],[45,38],[50,30],[55,25],[60,22],[65,22],[70,20],[75,15],[80,10],[85,22],[90,22],[95,22],[100,5],[105,2],[110,0],[115,2],[120,22],[125,30],[128,35],[130,32],[135,35],[140,38],[142,45],[145,45],[140,50],[135,55],[130,60],[120,65],[110,68],[95,72],[70,72],[60,68],[55,65],[50,60],[45,55],[38,47],[35,45],[35,42]]),
    // 日本
    p([[130,31],[131,33],[132,34],[134,34],[135,35],[136,37],[137,37],[136,36],[134,33],[132,32],[130,31]]),
    p([[141,42],[143,44],[145,44],[145,42],[143,41],[141,42]]),
    // オーストラリア
    p([[115,-22],[120,-20],[125,-15],[130,-12],[135,-12],[138,-15],[140,-18],[142,-18],[148,-20],[152,-24],[152,-28],[148,-38],[145,-38],[143,-38],[138,-36],[135,-35],[130,-33],[125,-32],[118,-28],[115,-25],[115,-22]]),
    // イギリス・アイルランド
    p([[-5,50],[-3,51],[0,52],[2,52],[2,53],[0,54],[-2,54],[-4,53],[-5,50]]),
    p([[-5,51],[-8,52],[-10,53],[-10,54],[-6,55],[-5,54],[-5,51]]),
    // アイスランド
    p([[-24,64],[-18,63],[-14,64],[-13,65],[-18,66],[-24,66],[-24,64]]),
    // 台湾
    p([[120,22],[121,23],[122,25],[121,25],[120,24],[120,22]]),
  ];
}
