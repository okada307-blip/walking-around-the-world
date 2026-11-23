const STORAGE_KEY = "watw_state_v2";

// state構造:
//   baseSteps    : 昨日までの累積歩数
//   todaySteps   : 今日の歩数(HealthケアまたはManual)
//   totalSteps   : baseSteps + todaySteps
//   cityIndex    : 現在地インデックス
//   lastDate     : 最後に記録した日付(YYYY-MM-DD)
//   healthSynced : 今日ヘルスケア同期済みか

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadState() {
  const today = todayStr();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s.lastDate !== today) {
        // 日付をまたいだ → 昨日の歩数をbaseに積み上げ、今日をリセット
        s.baseSteps = (s.baseSteps || 0) + (s.todaySteps || 0);
        s.todaySteps = 0;
        s.lastDate = today;
        s.healthSynced = false;
      }
      return s;
    }
  } catch (_) {}
  return { baseSteps: 0, todaySteps: 0, totalSteps: 0, cityIndex: 0, lastDate: today, healthSynced: false, lap: 1 };
}

function saveState() {
  state.totalSteps = (state.baseSteps || 0) + (state.todaySteps || 0);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
state.lap = state.lap || 1;
state.totalSteps = (state.baseSteps || 0) + (state.todaySteps || 0);
let ROUTE = citiesForLap(state.lap);

// --- DOM refs ---
const els = {
  currentFlag: document.getElementById("current-flag"),
  currentCityName: document.getElementById("current-city-name"),
  currentCityCountry: document.getElementById("current-city-country"),
  nextCityLabel: document.getElementById("next-city-label"),
  progressNumbers: document.getElementById("progress-numbers"),
  progressFill: document.getElementById("progress-fill"),
  todaySteps: document.getElementById("today-steps"),
  totalSteps: document.getElementById("total-steps"),
  visitedList: document.getElementById("visited-list"),
  enableSensorBtn: document.getElementById("enable-sensor-btn"),
  manualStepBtn: document.getElementById("manual-step-btn"),
  sensorStatus: document.getElementById("sensor-status"),
  modal: document.getElementById("arrival-modal"),
  arrivalFlag: document.getElementById("arrival-flag"),
  arrivalCityName: document.getElementById("arrival-city-name"),
  arrivalCountry: document.getElementById("arrival-country"),
  arrivalInfo: document.getElementById("arrival-info"),
  lapBadge: document.getElementById("lap-badge"),
  nextLapBtn: document.getElementById("next-lap-btn"),
  closeModalBtn: document.getElementById("close-modal-btn"),
  syncBadge: document.getElementById("sync-badge"),
};

// 各都市の累積歩数しきい値を計算
function buildThresholds() {
  let sum = 0;
  return ROUTE.map((c, i) => {
    if (i === 0) return 0;
    sum += c.stepsToReach;
    return sum;
  });
}
let cumulativeThresholds = buildThresholds();

function cityIndexFromSteps(total) {
  let idx = 0;
  for (let i = 1; i < ROUTE.length; i++) {
    if (total >= cumulativeThresholds[i]) idx = i;
    else break;
  }
  return idx;
}

function render() {
  const idx = Math.min(state.cityIndex, ROUTE.length - 1);
  const current = ROUTE[idx];
  els.currentFlag.textContent = current.flag;
  els.currentCityName.textContent = current.name;
  els.currentCityCountry.textContent = current.country;
  els.todaySteps.textContent = state.todaySteps.toLocaleString();
  els.totalSteps.textContent = state.totalSteps.toLocaleString();

  if (els.syncBadge) {
    els.syncBadge.textContent = state.healthSynced ? "🍎 ヘルスケア同期済" : "📲 未同期(手動カウント中)";
    els.syncBadge.className = state.healthSynced ? "sync-badge synced" : "sync-badge";
  }

  els.lapBadge.textContent = `${state.lap}周目`;
  const finished = idx >= ROUTE.length - 1;
  els.nextLapBtn.hidden = !finished;
  els.nextLapBtn.textContent = `🌏 ${state.lap + 1}周目を始める`;

  if (finished) {
    els.nextCityLabel.textContent = `🎉 ${state.lap}周目の世界一周達成!宮崎に帰着しました`;
    els.progressNumbers.textContent = `合計 ${state.totalSteps.toLocaleString()} 歩`;
    els.progressFill.style.width = "100%";
  } else {
    const next = ROUTE[idx + 1];
    const fromThreshold = cumulativeThresholds[idx];
    const toThreshold = cumulativeThresholds[idx + 1];
    const span = toThreshold - fromThreshold;
    const progressed = Math.max(0, state.totalSteps - fromThreshold);
    const pct = Math.min(100, (progressed / span) * 100);
    els.nextCityLabel.textContent = `次の都市: ${next.name}まで`;
    els.progressNumbers.textContent = `${progressed.toLocaleString()} / ${span.toLocaleString()} 歩`;
    els.progressFill.style.width = pct + "%";
  }

  renderVisited(idx);
  buildMap(idx);
}

function renderVisited(idx) {
  els.visitedList.innerHTML = "";
  for (let i = idx; i >= 0; i--) {
    const c = ROUTE[i];
    const li = document.createElement("li");
    li.innerHTML = `<span class="flag">${c.flag}</span><span>${c.name}(${c.country})</span>`;
    li.classList.add("clickable");
    li.addEventListener("click", () => showArrivalModal(c));
    els.visitedList.appendChild(li);
  }
}

function showArrivalModal(city) {
  els.arrivalFlag.textContent = city.flag;
  els.arrivalCityName.textContent = city.name;
  els.arrivalCountry.textContent = city.country;
  els.arrivalInfo.innerHTML = cityInfoHtml(city);
  els.modal.classList.add("show");
}

els.closeModalBtn.addEventListener("click", () => {
  els.modal.classList.remove("show");
});

function applySteps() {
  const prevIdx = state.cityIndex;
  state.totalSteps = (state.baseSteps || 0) + (state.todaySteps || 0);
  state.cityIndex = cityIndexFromSteps(state.totalSteps);
  // 新たに到達した都市があれば順番に到着モーダルを表示
  if (state.cityIndex > prevIdx) {
    showArrivalModal(ROUTE[state.cityIndex]);
  }
  saveState();
  render();
}

function addSteps(amount) {
  state.todaySteps += amount;
  applySteps(state.totalSteps);
}

// --- ヘルスケア同期: URLパラメータ ?steps=N を受け取る ---
function checkHealthSync() {
  const params = new URLSearchParams(window.location.search);
  const healthSteps = parseInt(params.get("steps"), 10);
  if (!isNaN(healthSteps) && healthSteps >= 0) {
    state.todaySteps = healthSteps;
    state.healthSynced = true;
    // URLパラメータをブラウザ履歴から除去(再読み込みで二重適用しない)
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
    applySteps(state.totalSteps);
  }
}

checkHealthSync();

els.nextLapBtn.addEventListener("click", () => {
  const next = state.lap + 1;
  if (!confirm(`${next}周目を始めます。現在の歩数と訪問記録はリセットされます。よろしいですか?`)) return;
  state = { baseSteps: 0, todaySteps: 0, totalSteps: 0, cityIndex: 0, lastDate: todayStr(), healthSynced: false, lap: next };
  ROUTE = citiesForLap(next);
  cumulativeThresholds = buildThresholds();
  saveState();
  render();
});

// --- 進捗引き継ぎ ---
const migrateInput = document.getElementById("migrate-input");
const migrateBtn = document.getElementById("migrate-btn");

migrateBtn.addEventListener("click", () => {
  const val = parseInt(migrateInput.value, 10);
  if (isNaN(val) || val < 0) {
    migrateInput.style.borderColor = "#d96c4a";
    return;
  }
  if (!confirm(`累計歩数を ${val.toLocaleString()} 歩に設定します。現在のデータは上書きされます。よろしいですか?`)) return;
  migrateInput.style.borderColor = "";
  state.baseSteps = val;
  state.todaySteps = 0;
  state.totalSteps = val;
  state.cityIndex = cityIndexFromSteps(val);
  state.healthSynced = false;
  saveState();
  render();
  migrateInput.value = "";
  alert("引き継ぎ完了しました!");
});

// --- ヘルスケア手動入力 ---
const healthInput = document.getElementById("health-input");
const healthSubmitBtn = document.getElementById("health-submit-btn");

function applyHealthInput() {
  const val = parseInt(healthInput.value, 10);
  if (isNaN(val) || val < 0) {
    healthInput.style.borderColor = "#d96c4a";
    return;
  }
  healthInput.style.borderColor = "";
  state.todaySteps = val;
  state.healthSynced = true;
  applySteps(state.totalSteps);
  healthInput.value = "";
}

healthSubmitBtn.addEventListener("click", applyHealthInput);
healthInput.addEventListener("keydown", (e) => { if (e.key === "Enter") applyHealthInput(); });

els.manualStepBtn.addEventListener("click", () => addSteps(100));

// --- 歩数センサー(加速度計のピーク検出) ---
let lastPeakTime = 0;
let smoothed = 9.8;
const ACCEL_THRESHOLD = 1.3;
const MIN_STEP_INTERVAL_MS = 280;

function handleMotion(event) {
  const acc = event.accelerationIncludingGravity;
  if (!acc) return;
  const magnitude = Math.sqrt(
    (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
  );
  smoothed = smoothed * 0.9 + magnitude * 0.1;
  const deviation = magnitude - smoothed;
  const now = Date.now();
  if (deviation > ACCEL_THRESHOLD && now - lastPeakTime > MIN_STEP_INTERVAL_MS) {
    lastPeakTime = now;
    addSteps(1);
  }
}

async function enableSensor() {
  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
    try {
      const result = await DeviceMotionEvent.requestPermission();
      if (result !== "granted") {
        els.sensorStatus.textContent = "センサー: 許可されませんでした";
        return;
      }
    } catch (e) {
      els.sensorStatus.textContent = "センサー: 許可リクエストに失敗しました";
      return;
    }
  }
  if (typeof DeviceMotionEvent === "undefined") {
    els.sensorStatus.textContent = "センサー: この端末では利用できません";
    return;
  }
  window.addEventListener("devicemotion", handleMotion);
  els.sensorStatus.textContent = "センサー: 有効(歩くと自動で歩数が増えます)";
  els.enableSensorBtn.disabled = true;
  els.enableSensorBtn.textContent = "📡 センサー有効中";
}

els.enableSensorBtn.addEventListener("click", enableSensor);

applySteps();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
