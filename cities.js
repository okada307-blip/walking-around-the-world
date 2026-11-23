// 都市データ: 出発地から帰着地まで順番に並んでいる
// steps: その都市に到達するために必要な「直前都市からの累積追加歩数コスト」
const CITIES = [
  {
    name: "宮崎", country: "日本", flag: "🇯🇵", stepsToReach: 0, lat: 31.9, lng: 131.4,
    sights: ["青島神社", "サンメッセ日南"],
    food: ["チキン南蛮", "冷や汁"],
    phrase: { text: "おかえりなさい", reading: "Okaerinasai", meaning: "おかえりなさい(出発地/帰着地)" }
  },
  {
    name: "台北", country: "台湾", flag: "🇹🇼", stepsToReach: 8000, lat: 25.0, lng: 121.5,
    sights: ["台北101", "九份"],
    food: ["小籠包", "魯肉飯"],
    phrase: { text: "你好", reading: "ニーハオ", meaning: "こんにちは" }
  },
  {
    name: "ホーチミン", country: "ベトナム", flag: "🇻🇳", stepsToReach: 12000, lat: 10.8, lng: 106.7,
    sights: ["統一会堂", "ベンタイン市場"],
    food: ["フォー", "生春巻き"],
    phrase: { text: "Xin chào", reading: "シンチャオ", meaning: "こんにちは" }
  },
  {
    name: "ヤンゴン", country: "ミャンマー", flag: "🇲🇲", stepsToReach: 10000, lat: 16.8, lng: 96.2,
    sights: ["シュエダゴン・パゴダ", "カラウェイク宮殿"],
    food: ["モヒンガー", "ラペットゥ"],
    phrase: { text: "မင်္ဂလာပါ", reading: "ミンガラーバー", meaning: "こんにちは" }
  },
  {
    name: "ビシュケク", country: "キルギス", flag: "🇰🇬", stepsToReach: 18000, lat: 42.9, lng: 74.6,
    sights: ["アラトー広場", "オシュ・バザール"],
    food: ["ベシュバルマク", "プロフ"],
    phrase: { text: "Салам", reading: "サラーム", meaning: "こんにちは" }
  },
  {
    name: "テヘラン", country: "イラン", flag: "🇮🇷", stepsToReach: 16000, lat: 35.7, lng: 51.4,
    sights: ["ゴレスターン宮殿", "アーザーディー・タワー"],
    food: ["ケバブ", "ゲイメ"],
    phrase: { text: "سلام", reading: "サラーム", meaning: "こんにちは" }
  },
  {
    name: "ワルシャワ", country: "ポーランド", flag: "🇵🇱", stepsToReach: 20000, lat: 52.2, lng: 21.0,
    sights: ["旧市街広場", "ワジェンキ公園"],
    food: ["ピエロギ", "ビゴス"],
    phrase: { text: "Cześć", reading: "チェシチ", meaning: "やあ" }
  },
  {
    name: "キーウ", country: "ウクライナ", flag: "🇺🇦", stepsToReach: 9000, lat: 50.4, lng: 30.5,
    sights: ["聖ソフィア大聖堂", "独立広場"],
    food: ["ボルシチ", "ヴァレーニキ"],
    phrase: { text: "Привіт", reading: "プリヴィート", meaning: "やあ" }
  },
  {
    name: "リガ", country: "ラトビア", flag: "🇱🇻", stepsToReach: 9000, lat: 56.9, lng: 24.1,
    sights: ["リガ旧市街", "自由記念碑"],
    food: ["グレイ・ピーズ", "ライ麦パン"],
    phrase: { text: "Sveiki", reading: "スヴェイキ", meaning: "こんにちは" }
  },
  {
    name: "バルセロナ", country: "スペイン", flag: "🇪🇸", stepsToReach: 14000, lat: 41.4, lng: 2.2,
    sights: ["サグラダ・ファミリア", "グエル公園"],
    food: ["パエリア", "タパス"],
    phrase: { text: "Hola", reading: "オラ", meaning: "こんにちは" }
  },
  {
    name: "コペンハーゲン", country: "デンマーク", flag: "🇩🇰", stepsToReach: 16000, lat: 55.7, lng: 12.6,
    sights: ["人魚姫の像", "ニューハウン"],
    food: ["スモーブロー", "デニッシュ"],
    phrase: { text: "Hej", reading: "ハイ", meaning: "やあ" }
  },
  {
    name: "エディンバラ", country: "イギリス", flag: "🏴", stepsToReach: 9000, lat: 55.9, lng: -3.2,
    sights: ["エディンバラ城", "アーサーズ・シート"],
    food: ["ハギス", "ショートブレッド"],
    phrase: { text: "Hello", reading: "ハロー", meaning: "こんにちは" }
  },
  {
    name: "レイキャビク", country: "アイスランド", flag: "🇮🇸", stepsToReach: 12000, lat: 64.1, lng: -21.9,
    sights: ["ハットルグリムス教会", "ブルーラグーン"],
    food: ["ラム肉のスープ", "スキール"],
    phrase: { text: "Halló", reading: "ハロー", meaning: "こんにちは" }
  },
  {
    name: "バンクーバー", country: "カナダ", flag: "🇨🇦", stepsToReach: 30000, lat: 49.3, lng: -123.1,
    sights: ["スタンレー・パーク", "グランビル・アイランド"],
    food: ["プーティン", "サーモン"],
    phrase: { text: "Hello", reading: "ハロー", meaning: "こんにちは" }
  },
  {
    name: "ハバナ", country: "キューバ", flag: "🇨🇺", stepsToReach: 25000, lat: 23.1, lng: -82.4,
    sights: ["旧市街(ハバナ・ビエハ)", "マレコン通り"],
    food: ["モヒート", "ロパビエハ"],
    phrase: { text: "Hola", reading: "オラ", meaning: "こんにちは" }
  },
  {
    name: "宮崎", country: "日本", flag: "🇯🇵", stepsToReach: 28000, lat: 31.9, lng: 131.4,
    sights: ["青島神社", "サンメッセ日南"],
    food: ["チキン南蛮", "冷や汁"],
    phrase: { text: "おかえりなさい", reading: "Okaerinasai", meaning: "ただいま、世界一周達成!" }
  }
];

// 2周目のコンテンツ(CITIESと同じ順番)
const CITIES_LAP2 = [
  { sights: ["高千穂峡", "鵜戸神宮"], food: ["宮崎牛", "完熟マンゴー"],
    phrases: [["こんにちは", "Konnichiwa", "こんにちは"], ["ありがとね", "Arigatone", "ありがとう(宮崎弁)"], ["てげうまい", "Tege umai", "とてもおいしい(宮崎弁)"]],
    trivia: "宮崎県は日照時間・快晴日数が全国トップクラス。「日本のひなた」を名乗っています。" },
  { sights: ["国立故宮博物院", "龍山寺"], food: ["牛肉麺", "タピオカミルクティー"],
    phrases: [["你好", "ニーハオ", "こんにちは"], ["謝謝", "シエシエ", "ありがとう"], ["好吃", "ハオチー", "おいしい"]],
    trivia: "タピオカミルクティーは1980年代の台湾生まれ。故宮博物院には約70万点の収蔵品があります。" },
  { sights: ["サイゴン大教会", "サイゴン中央郵便局"], food: ["バインミー", "コムタム"],
    phrases: [["Xin chào", "シンチャオ", "こんにちは"], ["Cảm ơn", "カムオン", "ありがとう"], ["Ngon quá", "ンゴン クァー", "おいしい"]],
    trivia: "旧名はサイゴン。1976年にホーチミン市へ改名されました。中央郵便局はフランス統治時代の建築です。" },
  { sights: ["スーレー・パゴダ", "チャウッターヂー・パゴダ(寝仏)"], food: ["シャン・カウスエ(シャン麺)", "ミャンマーカレー(ヒン)"],
    phrases: [["မင်္ဂလာပါ", "ミンガラーバー", "こんにちは"], ["ကျေးဇူးတင်ပါတယ်", "チェーズーティンバーデー", "ありがとう"], ["စားလို့ကောင်းတယ်", "サーロ カウンデー", "おいしい"]],
    trivia: "2006年に首都がネピドーへ移るまで、ヤンゴンが首都でした。頬に塗る天然の化粧品「タナカ」が有名です。" },
  { sights: ["アラ・アルチャ国立公園", "勝利広場"], food: ["ラグマン", "マントゥ"],
    phrases: [["Саламатсызбы", "サラマトスズブ", "こんにちは"], ["Рахмат", "ラフマット", "ありがとう"], ["Даамдуу", "ダームドゥー", "おいしい"]],
    trivia: "「昔、日本人とキルギス人は兄弟で、魚好きが日本へ、肉好きがキルギスに残った」という言い伝えがあります。" },
  { sights: ["ミラード・タワー", "テヘラン・グランドバザール"], food: ["タフディーグ(おこげご飯)", "アーシュ・レシテ(麺入りスープ)"],
    phrases: [["سلام", "サラーム", "こんにちは"], ["مرسی", "メルスィー", "ありがとう"], ["خوشمزه است", "ホシュマゼ アスト", "おいしい"]],
    trivia: "イランの新年「ノウルーズ」は春分の日。3000年以上続くといわれる伝統行事です。" },
  { sights: ["ワルシャワ王宮", "文化科学宮殿"], food: ["ジュレック(ライ麦の酸味スープ)", "ポンチキ(揚げドーナツ)"],
    phrases: [["Dzień dobry", "ジェン ドブリ", "こんにちは"], ["Dziękuję", "ジェンクイェ", "ありがとう"], ["Pyszne", "ピシュネ", "おいしい"]],
    trivia: "旧市街は第二次世界大戦でほぼ破壊されましたが、市民の手で再建され世界遺産になりました。ショパンの心臓が聖十字架教会に眠っています。" },
  { sights: ["キーウ・ペチェールシク大修道院", "アンドリーイウスキー坂"], food: ["チキン・キーウ", "サーロ(豚の脂身の塩漬け)"],
    phrases: [["Добрий день", "ドーブルィ デーニ", "こんにちは"], ["Дякую", "ジャークユ", "ありがとう"], ["Смачно", "スマーチノ", "おいしい"]],
    trivia: "地下鉄アルセナーリナ駅は地下約105m。世界でも有数の深い駅です。" },
  { sights: ["リガ中央市場", "アール・ヌーヴォー建築群"], food: ["ピーラーギ(ベーコン入りパン)", "リガ・ブラック・バルサム"],
    phrases: [["Labdien", "ラブディエン", "こんにちは"], ["Paldies", "パルディエス", "ありがとう"], ["Garšīgi", "ガルシーギ", "おいしい"]],
    trivia: "中心部の建物の約3分の1がアール・ヌーヴォー様式。1510年に世界で初めてクリスマスツリーが飾られたという説もあります。" },
  { sights: ["カサ・ミラ", "ボケリア市場"], food: ["パン・コン・トマテ", "クレマ・カタラナ"],
    phrases: [["Bon dia", "ボン ディア", "こんにちは(カタルーニャ語)"], ["Gràcies", "グラシエス", "ありがとう"], ["Boníssim", "ボニッシム", "とてもおいしい"]],
    trivia: "バルセロナではスペイン語に加えてカタルーニャ語が話されます。サグラダ・ファミリアは1882年に着工しました。" },
  { sights: ["チボリ公園", "ローゼンボー城"], food: ["フリカデラ(ミートボール)", "ポルサ(ホットドッグ)"],
    phrases: [["Goddag", "ゴデー", "こんにちは"], ["Tak", "ターク", "ありがとう"], ["Lækkert", "レッカート", "おいしい"]],
    trivia: "チボリ公園は1843年開園の世界有数の古い遊園地。ウォルト・ディズニーも参考にしたといわれます。" },
  { sights: ["ロイヤル・マイル", "カールトン・ヒル"], food: ["カレン・スキンク(燻製タラのスープ)", "クラナカン(デザート)"],
    phrases: [["Halò", "ハロー", "こんにちは(ゲール語)"], ["Tapadh leat", "タパ レト", "ありがとう"], ["Blasta", "ブラスタ", "おいしい"]],
    trivia: "毎年8月のエディンバラ・フェスティバル・フリンジは世界最大級の芸術祭。『ハリー・ポッター』の一部はこの街のカフェで書かれました。" },
  { sights: ["ハルパ・コンサートホール", "サン・ヴォイジャー(太陽の航海者)"], food: ["アイスランド風ホットドッグ", "ラングスティーヌ(手長エビ)のスープ"],
    phrases: [["Halló", "ハロー", "こんにちは"], ["Takk fyrir", "タック フィリル", "ありがとう"], ["Ljúffengt", "リューフェンクト", "おいしい"]],
    trivia: "レイキャビクは世界最北の首都。家庭の暖房やお湯の多くが地熱でまかなわれています。" },
  { sights: ["キャピラノ吊り橋", "ガスタウンの蒸気時計"], food: ["ナナイモ・バー", "BCロール(焼き鮭皮の巻き寿司)"],
    phrases: [["Hello / Bonjour", "ハロー / ボンジュール", "こんにちは(英語/フランス語)"], ["Thank you / Merci", "サンキュー / メルシー", "ありがとう"], ["Delicious / Délicieux", "デリシャス / デリシュー", "おいしい"]],
    trivia: "カナダの公用語は英語とフランス語。カリフォルニアロールはバンクーバーの日本人シェフが考案したという説があります。" },
  { sights: ["カピトリオ(旧国会議事堂)", "モロ要塞"], food: ["キューバ・サンド", "ユカ・フリタ(キャッサバのフライ)"],
    phrases: [["Hola", "オラ", "こんにちは"], ["Gracias", "グラシアス", "ありがとう"], ["¡Qué rico!", "ケ リコ", "おいしい!"]],
    trivia: "1950年代のアメリカ製クラシックカーが今も現役で街を走っています。" },
  { sights: ["西都原古墳群", "綾の照葉樹林"], food: ["地鶏の炭火焼き", "肉巻きおにぎり"],
    phrases: [["こんにちは", "Konnichiwa", "こんにちは"], ["ありがとね", "Arigatone", "ありがとう(宮崎弁)"], ["てげうまい", "Tege umai", "とてもおいしい(宮崎弁)"]],
    trivia: "西都原古墳群には300基以上の古墳があります。2周目の世界一周、おめでとうございます!" },
];

const KM_TO_STEPS_LAP2 = 5;

function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function citiesForLap(lap) {
  if (lap < 2) return CITIES;
  return CITIES.map((base, i) => ({
    ...base,
    ...CITIES_LAP2[i],
    stepsToReach: i === 0 ? 0 : Math.round(distanceKm(CITIES[i - 1], base) * KM_TO_STEPS_LAP2),
  }));
}

function cityInfoHtml(city) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const phrases = city.phrases
    ? city.phrases.map(([t, r, m]) => `<li><b>${esc(t)}</b>(${esc(r)})— ${esc(m)}</li>`).join("")
    : `<li><b>${esc(city.phrase.text)}</b>(${esc(city.phrase.reading)})— ${esc(city.phrase.meaning)}</li>`;
  let html = `
    <div class="info-block"><h3>🏛 観光地</h3><p>${esc(city.sights.join(" / "))}</p></div>
    <div class="info-block"><h3>🍽 名物料理</h3><p>${esc(city.food.join(" / "))}</p></div>
    <div class="info-block"><h3>💬 現地の言葉</h3><ul class="phrase-list">${phrases}</ul></div>`;
  if (city.trivia) html += `<div class="info-block"><h3>📖 豆知識</h3><p>${esc(city.trivia)}</p></div>`;
  return html;
}
