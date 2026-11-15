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
  selectionIndicator: false
});

viewer.scene.globe.depthTestAgainstTerrain = false;
viewer.scene.globe.enableLighting = false;

// 2. ピンアイコンの生成
function createPinCanvas(color) {
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

  return canvas;
}

// スマホ判定ヘルパー
function isMobileView() {
  return window.innerWidth <= 768;
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
          // スマホは指で押しやすいよう少し大きめに表示
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
          // 50種密集時に引いた画面で文字が重ならないよう、高度6000km以内でラベル表示
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
  // スマホの縦長画面では地球全体が左右に見切れないよう高度を高めに設定
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
    duration: 1.4
  });
}

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-45.0, -5.0, getOverviewAltitude())
});

// 5. ピンクリック・タップ・パネル制御
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

handler.setInputAction(function (movement) {
  const pickedObject = viewer.scene.pick(movement.endPosition);
  if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.fishData) {
    viewer.container.style.cursor = 'pointer';
  } else {
    viewer.container.style.cursor = 'default';
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

function selectFish(fish) {
  const mobile = isMobileView();
  // PC：右パネル避けのため少し東（+lng）へオフセット
  // スマホ：下半分パネル避けのため少し南（-lat）へオフセットし、上半分の中央にピンを配置
  const lngOffset = mobile ? 0 : 0.04;
  const latOffset = mobile ? -0.055 : 0;

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(fish.lng + lngOffset, fish.lat + latOffset, 35000),
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    },
    duration: 1.4
  });

  panelImg.src = fish.image;
  document.getElementById('panel-name').textContent = fish.name;
  document.getElementById('panel-sci').textContent = fish.scientificName;
  document.getElementById('panel-habitat').textContent = fish.habitat;
  document.getElementById('panel-temp').textContent = fish.temp;
  document.getElementById('panel-ph').textContent = fish.ph;
  document.getElementById('panel-hardness').textContent = fish.hardness;
  document.getElementById('panel-water-desc').textContent = fish.waterDesc;

  infoPanel.scrollTop = 0; // 別の魚を開いたときにパネルのスクロール位置を一番上に戻す
  infoPanel.classList.add('active');
}

closeBtn.addEventListener('click', () => {
  infoPanel.classList.remove('active');
});

resetBtn.addEventListener('click', () => {
  infoPanel.classList.remove('active');
  flyToOverview();
});
