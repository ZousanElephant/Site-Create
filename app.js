// エラーハンドリング
window.addEventListener("error", function (e) {
  const el = document.getElementById("status");
  if (el) {
    el.textContent = "JavaScriptエラー: " + (e.message || "unknown error");
    el.style.color = "#ff8080";
  }
  console.error(e.error || e.message);
});

// ステータスメッセージ表示補助
function setStatus(message, isError = false) {
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "#ff8080" : "#b8c7d9";
}

Cesium.Ion.defaultAccessToken = "";

let viewer;

try {
  setStatus("Cesium読み込み完了。地球を初期化中…");

  viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    selectionIndicator: false,
    baseLayer: false
  });

  setStatus("地球の初期化OK。衛星写真と日本語地名を読み込み中…");

  // 1. 高精細衛星写真
  const satelliteImagery = new Cesium.UrlTemplateImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maximumLevel: 19
  });
  viewer.imageryLayers.add(new Cesium.ImageryLayer(satelliteImagery));

  // 2. 日本語対応地名・国名ラベル
  const labelImagery = new Cesium.UrlTemplateImageryProvider({
    url: "https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
    maximumLevel: 19,
    subdomains: ["a", "b", "c", "d"]
  });
  viewer.imageryLayers.add(new Cesium.ImageryLayer(labelImagery));

  setStatus("マップ準備OK。魚のピンを配置中…");
} catch (e) {
  console.error(e);
  setStatus("初期化エラー: " + (e && e.message ? e.message : e), true);
  throw e;
}

// 描画設定（地球の裏側のピンを隠す）
viewer.scene.globe.show = true;
viewer.scene.globe.enableLighting = false;
viewer.scene.globe.showGroundAtmosphere = false;
viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.scene.backgroundColor = Cesium.Color.BLACK;

// ピン用Canvas画像
function makePinCanvas() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(32, 32, 3, 32, 32, 31);
  g.addColorStop(0, "white");
  g.addColorStop(0.12, "#16c8ff");
  g.addColorStop(0.35, "rgba(22,200,255,.8)");
  g.addColorStop(1, "rgba(22,200,255,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  x.beginPath();
  x.arc(32, 32, 8, 0, Math.PI * 2);
  x.fillStyle = "#fff";
  x.fill();
  return c.toDataURL();
}

// 50種のピンを配置
fishData.forEach((f) => {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(f.lng, f.lat, 50000),
    name: f.name,
    billboard: {
      image: makePinCanvas(),
      width: 34,
      height: 34,
      verticalOrigin: Cesium.VerticalOrigin.CENTER
    },
    label: {
      text: f.name,
      font: "bold 13px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, 25)
    }
  });
});

// リストボタン作成
const buttons = document.getElementById("buttons");
fishData.forEach((f) => {
  const b = document.createElement("button");
  b.className = "fishBtn";
  b.textContent = "📍 " + f.name;
  b.onclick = () => selectFish(f);
  buttons.appendChild(b);
});
setStatus("起動完了。地球をドラッグして回転できます。");

let cardTimer = null;

// 魚選択時の処理（ズーム完了後に詳細カード表示）
function selectFish(f) {
  if (!f) return;

  if (cardTimer) clearTimeout(cardTimer);
  document.getElementById("info").style.display = "none";

  document.getElementById("fishName").textContent = f.name;
  document.getElementById("latin").textContent = f.latin;
  document.getElementById("habitat").textContent = f.habitat;
  document.getElementById("temp").textContent = f.temp;
  document.getElementById("ph").textContent = f.ph;
  document.getElementById("hardness").textContent = f.hardness;
  document.getElementById("desc").textContent = f.desc;

  const imgEl = document.getElementById("fishImage");
  imgEl.src = f.image;
  imgEl.alt = f.name;

  const currentHeight = viewer.camera.positionCartographic.height;
  let flyDuration = 2.2;
  if (currentHeight > 10000000) {
    flyDuration = 3.2;
  } else if (currentHeight < 1000000) {
    flyDuration = 1.0;
  }

  const currentHeading = viewer.camera.heading;
  const destination = Cesium.Cartesian3.fromDegrees(f.lng, f.lat, f.height);

  viewer.camera.flyTo({
    destination: destination,
    orientation: {
      heading: currentHeading,
      pitch: Cesium.Math.toRadians(-89.9),
      roll: 0
    },
    duration: flyDuration
  });

  // ズーム着地直後にカードを開く
  cardTimer = setTimeout(() => {
    document.getElementById("info").style.display = "flex";
  }, (flyDuration * 1000) + 200);
}

// クリックイベント判定
viewer.screenSpaceEventHandler.setInputAction(function (click) {
  const picked = viewer.scene.pick(click.position);
  viewer.selectedEntity = undefined;

  if (Cesium.defined(picked) && picked.id && picked.id.name) {
    const targetFish = fishData.find((f) => f.name === picked.id.name);
    if (targetFish) {
      selectFish(targetFish);
    }
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// モーダル閉じる
document.getElementById("close").onclick = () => {
  if (cardTimer) clearTimeout(cardTimer);
  document.getElementById("info").style.display = "none";
};

document.getElementById("info").addEventListener("click", (e) => {
  if (e.target.id === "info") {
    if (cardTimer) clearTimeout(cardTimer);
    e.currentTarget.style.display = "none";
  }
});

// 初期カメラ位置
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-45, 0, 17500000),
  orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 }
});
