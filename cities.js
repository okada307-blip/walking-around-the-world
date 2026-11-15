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
