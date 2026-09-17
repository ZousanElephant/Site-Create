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
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),
    baseLayer: false,
    skyBox: false,
    skyAtmosphere: false
  });

  setStatus("地球の初期化OK。地図タイルを読み込み中…");

  const earthImagery = new Cesium.OpenStreetMapImageryProvider({
    url: "https://tile.openstreetmap.org/"
  });
  viewer.imageryLayers.add(new Cesium.ImageryLayer(earthImagery));

  setStatus("地図タイルOK。魚のピンを配置中…");
} catch (e) {
  console.error(e);
  setStatus("初期化エラー: " + (e && e.message ? e.message : e), true);
  throw e;
}

viewer.scene.globe.show = true;
viewer.scene.globe.enableLighting = true;
viewer.scene.globe.showGroundAtmosphere = true;
viewer.scene.backgroundColor = Cesium.Color.BLACK;

const pinEntities = [];

// ピン生成用のCanvas画像作成
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

// 魚の生息地にピンを配置
function makePin(f) {
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(f.lng, f.lat, 100),
    name: f.name,
    billboard: {
      image: makePinCanvas(),
      width: 34,
      height: 34,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    label: {
      text: f.name,
      font: "bold 13px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, 25),
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  });
  entity.fish = f;
  pinEntities.push(entity);
}

// ボタン一覧の生成
fishData.forEach(makePin);

const buttons = document.getElementById("buttons");
fishData.forEach((f) => {
  const b = document.createElement("button");
  b.className = "fishBtn";
  b.textContent = "📍 " + f.name;
  b.onclick = () => flyToFish(f);
  buttons.appendChild(b);
});
setStatus("起動完了。地球をドラッグして回転できます。");

let flying = false;

// カメラ移動
function flyToFish(f) {
  flying = true;
  document.getElementById("info").style.display = "none";

  const destination = Cesium.Cartesian3.fromDegrees(f.lng, f.lat, f.height);

  viewer.camera.flyTo({
    destination,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-55),
      roll: 0
    },
    duration: 4.5,
    complete: () => {
      flying = false;
      setTimeout(() => showFish(f), 500);
    }
  });
}

// モーダル表示
function showFish(f) {
  document.getElementById("fishName").textContent = f.name;
  document.getElementById("latin").textContent = f.latin;
  document.getElementById("habitat").textContent = f.habitat;
  document.getElementById("temp").textContent = f.temp;
  document.getElementById("ph").textContent = f.ph;
  document.getElementById("hardness").textContent = f.hardness;
  document.getElementById("desc").textContent = f.desc;
  document.getElementById("fishImage").src = f.image;
  document.getElementById("fishImage").alt = f.name;
  document.getElementById("info").style.display = "flex";
}

// クリックイベント
viewer.screenSpaceEventHandler.setInputAction(function (click) {
  const picked = viewer.scene.pick(click.position);
  if (Cesium.defined(picked) && picked.id && picked.id.fish) {
    flyToFish(picked.id.fish);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// モーダルを閉じる処理
document.getElementById("close").onclick = () => {
  document.getElementById("info").style.display = "none";
};

document.getElementById("info").addEventListener("click", (e) => {
  if (e.target.id === "info") e.currentTarget.style.display = "none";
});

// 初期カメラ位置の設定
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-45, 0, 17500000),
  orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 }
});