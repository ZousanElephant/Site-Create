// スマホ判定ヘルパー
function isMobileView() {
  return window.innerWidth <= 768;
}

// 1. Cesium Viewerの初期化
const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(
    Cesium.ArcGisMapServerImageryProvider.fromUrl(
      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    )
  ),
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  animation: false,
  timeline: false,
  fullscreenButton: false,
  infoBox: false,
  selectionIndicator: false,
  msaaSamples: 1,
  requestRenderMode: false
});

if (isMobileView()) {
  viewer.resolutionScale = 0.75;
}

viewer.scene.globe.depthTestAgainstTerrain = false;
viewer.scene.globe.enableLighting = false;
viewer.scene.skyAtmosphere.show = true;
viewer.scene.globe.maximumScreenSpaceError = isMobileView() ? 3.5 : 2.0;

const controller = viewer.scene.screenSpaceCameraController;
controller.inertiaSpin = 0.9;
controller.minimumZoomDistance = 5000;
controller.maximumZoomDistance = 30000000;

if (isMobileView()) {
  controller.enableZoom = false;
  controller.enableTilt = false;
}

// 2. ピンアイコンの生成（色ごとにキャッシュ）
const pinCanvasCache = {};
function createPinCanvas(color) {
  if (pinCanvasCache[color]) {
    return pinCanvasCache[color];
  }

  const canvas = document.createElement('canvas');
  canvas.width = 48;
  canvas.height = 60;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.ellipse(24, 55, 8, 3, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(24, 54);
  ctx.bezierCurveTo(24, 54, 6, 33, 6, 20);
  ctx.arc(24, 20, 18, Math.PI, 0, false);
  ctx.bezierCurveTo(42, 33, 24, 54, 24, 54);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(24, 20, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  pinCanvasCache[color] = canvas;
  return canvas;
}

// 3. 外部JSONから熱帯魚データを読み込んでピンを配置
async function loadFishData() {
  try {
    const response = await fetch('./data/fish.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fishHabitats = await response.json();

    fishHabitats.forEach(fish => {
      viewer.entities.add({
        id: fish.id,
        position: Cesium.Cartesian3.fromDegrees(fish.lng, fish.lat, 1000),
        billboard: {
          image: createPinCanvas(fish.pinColor),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: isMobileView() ? 0.95 : 0.85
        },
        label: {
          text: fish.name,
          font: 'bold 13px "Hiragino Sans", "Meiryo", sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 3,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          pixelOffset: new Cesium.Cartesian2(0, 6),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 6000000.0)
        },
        fishData: fish
      });
    });
  } catch (error) {
    console.error('熱帯魚データの読み込みに失敗しました:', error);
  }
}

loadFishData();

// 4. カメラ初期位置・リセット処理
function getOverviewAltitude() {
  return isMobileView() ? 24000000 : 16000000;
}

function flyToOverview() {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-45.0, -5.0, getOverviewAltitude()),
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    },
    duration: 1.2
  });
}

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-45.0, -5.0, getOverviewAltitude())
});

// 5. ピンクリック・タップ・超高速ピンチズーム・パネル制御
const infoPanel = document.getElementById('info-panel');
const closeBtn = document.getElementById('close-btn');
const resetBtn = document.getElementById('reset-btn');
const panelImg = document.getElementById('panel-img');

panelImg.addEventListener('error', () => {
  panelImg.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect fill="#1e293b" width="400" height="200"/><text fill="#64748b" font-family="sans-serif" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">No Image</text></svg>'
  );
});

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction(function (click) {
  const pickedObject = viewer.scene.pick(click.position);
  if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.fishData) {
    selectFish(pickedObject.id.fishData);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

handler.setInputAction(function () {
  if (isMobileView()) {
    controller.enableRotate = false;
  }
}, Cesium.ScreenSpaceEventType.PINCH_START);

handler.setInputAction(function (movement) {
  if (!isMobileView()) return;

  const startDist = Cesium.Cartesian2.magnitude(movement.distance.startPosition);
  const endDist = Cesium.Cartesian2.magnitude(movement.distance.endPosition);
  const delta = endDist - startDist;

  if (Math.abs(delta) < 0.5) return;

  const cartographic = viewer.camera.positionCartographic;
  const currentHeight = cartographic.height;

  const scaleFactor = 1.0 - (delta * 0.015);
  const clampedScale = Math.max(0.7, Math.min(1.3, scaleFactor));
  const newHeight = Math.max(5000, Math.min(30000000, currentHeight * clampedScale));

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      newHeight
    ),
    orientation: {
      heading: viewer.camera.heading,
      pitch: viewer.camera.pitch,
      roll: viewer.camera.roll
    }
  });
}, Cesium.ScreenSpaceEventType.PINCH_MOVE);

handler.setInputAction(function () {
  if (isMobileView()) {
    controller.enableRotate = true;
  }
}, Cesium.ScreenSpaceEventType.PINCH_END);

if (!isMobileView()) {
  handler.setInputAction(function (movement) {
    const pickedObject = viewer.scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.fishData) {
      viewer.container.style.cursor = 'pointer';
    } else {
      viewer.container.style.cursor = 'default';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

function closeInfoPanel() {
  infoPanel.style.transform = '';
  infoPanel.style.transition = '';
  infoPanel.classList.remove('active');
}

function selectFish(fish) {
  const mobile = isMobileView();
  const lngOffset = mobile ? 0 : 0.04;
  const latOffset = mobile ? -0.055 : 0;

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(fish.lng + lngOffset, fish.lat + latOffset, 35000),
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    },
    duration: 1.2
  });

  panelImg.src = fish.image;
  document.getElementById('panel-name').textContent = fish.name;
  document.getElementById('panel-sci').textContent = fish.scientificName;
  document.getElementById('panel-habitat').textContent = fish.habitat;
  document.getElementById('panel-temp').textContent = fish.temp;
  document.getElementById('panel-ph').textContent = fish.ph;
  document.getElementById('panel-hardness').textContent = fish.hardness;
  document.getElementById('panel-water-desc').textContent = fish.waterDesc;

  infoPanel.style.transform = '';
  infoPanel.style.transition = '';
  infoPanel.scrollTop = 0;
  infoPanel.classList.add('active');
}

closeBtn.addEventListener('click', closeInfoPanel);

resetBtn.addEventListener('click', () => {
  closeInfoPanel();
  flyToOverview();
});

// 6. スマホ用：ボトムシートの下スワイプで閉じる処理
let touchStartY = 0;
let currentDeltaY = 0;
let isDraggingPanel = false;

infoPanel.addEventListener('touchstart', (e) => {
  if (!isMobileView() || !infoPanel.classList.contains('active')) return;

  // スクロール位置が一番上（0以下）のときだけ引き下げジェスチャーを開始可能にする
  if (infoPanel.scrollTop <= 0) {
    touchStartY = e.touches[0].clientY;
    currentDeltaY = 0;
    isDraggingPanel = true;
  } else {
    isDraggingPanel = false;
  }
}, { passive: true });

infoPanel.addEventListener('touchmove', (e) => {
  if (!isDraggingPanel) return;

  // 途中で中身が下方向にスクロールされた場合は引き下げ判定を解除
  if (infoPanel.scrollTop > 0) {
    isDraggingPanel = false;
    infoPanel.style.transform = '';
    infoPanel.style.transition = '';
    return;
  }

  const touchY = e.touches[0].clientY;
  const deltaY = touchY - touchStartY;

  // 下方向（deltaY > 0）に引っ張っているときだけ指に追従してパネルを移動
  if (deltaY > 0) {
    // ブラウザのオーバースクロール（引っ張り更新など）を防止
    if (e.cancelable) {
      e.preventDefault();
    }
    currentDeltaY = deltaY;
    infoPanel.style.transition = 'none'; // 指の動きに遅延なく追従させる
    infoPanel.style.transform = `translateY(${deltaY}px)`;
  }
}, { passive: false });

infoPanel.addEventListener('touchend', () => {
  if (!isDraggingPanel) return;
  isDraggingPanel = false;

  // アニメーションを元に戻す
  infoPanel.style.transition = '';

  // 80px以上下にスワイプされていたらパネルを閉じる
  if (currentDeltaY > 80) {
    closeInfoPanel();
  } else {
    // 80px未満なら元の開いた位置にスッと戻る
    infoPanel.style.transform = '';
  }
  currentDeltaY = 0;
}, { passive: true });
