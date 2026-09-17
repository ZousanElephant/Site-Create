const fishData = [
  // --- 南米（アマゾン・ネグロ・オリノコ・パンタナル水系） ---
  {
    name: "ネオンテトラ", latin: "Paracheirodon innesi",
    lat: -3.135, lng: -60.025, height: 180000,
    habitat: "アマゾン川水系・ネグロ川", temp: "24–28℃", ph: "4.0–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Paracheirodon_innesi.jpg",
    desc: "アマゾン川流域のブラックウォーターに生息する小型カラシン。青と赤のネオンラインが美しい定番種。"
  },
  {
    name: "カージナルテトラ", latin: "Paracheirodon axelrodi",
    lat: -0.416, lng: -65.016, height: 180000,
    habitat: "ネグロ川上流域・オリノコ川", temp: "25–30℃", ph: "4.0–6.0", hardness: "超軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Cheirodon_axelrodi_1.jpg",
    desc: "腹部全体に鮮やかな赤が走るテトラ。ネグロ川上流の強酸性・ブラックウォーター地帯に大群で棲息します。"
  },
  {
    name: "グリーンネオンテトラ", latin: "Paracheirodon simulans",
    lat: 0.125, lng: -66.980, height: 180000,
    habitat: "ネグロ川最上流域・オリノコ川", temp: "24–29℃", ph: "4.5–6.5", hardness: "超軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Paracheirodon_simulans.jpg",
    desc: "赤みが控えめで、緑がかった青いメタリックラインが全身を貫く涼しげな小型美魚。"
  },
  {
    name: "ラミーノーズテトラ", latin: "Hemigrammus rhodostomus",
    lat: -1.455, lng: -61.980, height: 180000,
    habitat: "ネグロ川・メタ川", temp: "24–28℃", ph: "5.5–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Hemigrammus_rhodostomus.jpg",
    desc: "酔っ払いの鼻のように真っ赤に染まる頭部と、白黒の縞尾鰭が特徴。群泳性が極めて高いテトラ。"
  },
  {
    name: "ブラックネオンテトラ", latin: "Hyphessobrycon herbertaxelrodi",
    lat: -16.270, lng: -56.630, height: 180000,
    habitat: "パラグアイ川水系・タパジョス川", temp: "23–27℃", ph: "5.5–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Hyphessobrycon_herbertaxelrodi.jpg",
    desc: "黒と銀緑色のラインが渋く輝く丈夫なテトラ。シックなレイアウトに映えます。"
  },
  {
    name: "インパイクティスケリー", latin: "Inpaichthys kerri",
    lat: -11.180, lng: -60.550, height: 180000,
    habitat: "マデイラ川水系・アリプアナ川", temp: "24–28℃", ph: "5.5–6.8", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Inpaichthys_kerri_01.jpg",
    desc: "オスの体色が深いロイヤルパープルに発色する美しいカラシン。"
  },
  {
    name: "ロベルティテトラ", latin: "Hyphessobrycon bentosi",
    lat: -3.850, lng: -62.300, height: 180000,
    habitat: "アマゾン川中流域", temp: "24–28℃", ph: "5.5–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Hyphessobrycon_bentosi.jpg",
    desc: "フィラメント状に長く伸びる背鰭と淡い赤銅色のボディが優雅なロージィテトラの仲間。"
  },
  {
    name: "シルバーハチェット", latin: "Gasteropelecus levis",
    lat: -1.455, lng: -48.490, height: 180000,
    habitat: "パラ州・トカンチンス川下流", temp: "23–28℃", ph: "5.8–7.2", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Gasteropelecus_sternicla_1.jpg",
    desc: "手斧のような胸部と発達した胸鰭で、水面を飛び跳ねて水棲昆虫を捕食する独特の魚。"
  },
  {
    name: "エンゼルフィッシュ", latin: "Pterophyllum scalare",
    lat: -2.430, lng: -55.000, height: 180000,
    habitat: "タパジョス川水系", temp: "24–30℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Pterophyllum_scalare.jpg",
    desc: "南米の穏やかな水域に生息。ひし形の美しいプロポーションで熱帯魚の代名詞的存在。"
  },
  {
    name: "アルタムエンゼル", latin: "Pterophyllum altum",
    lat: 5.650, lng: -67.620, height: 180000,
    habitat: "オリノコ川上流・アタバポ川", temp: "27–31℃", ph: "4.5–5.8", hardness: "極軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Pterophyllum_altum.jpg",
    desc: "エンゼルフィッシュの最高峰。急峻な額の窪みと大きく伸長する鰭を持つ大型野生種。"
  },
  {
    name: "ヘッケルディスカス", latin: "Symphysodon discus",
    lat: -1.950, lng: -61.250, height: 180000,
    habitat: "ネグロ川流域", temp: "28–32℃", ph: "4.5–6.0", hardness: "超軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Symphysodon_discus.jpg",
    desc: "「熱帯魚の王様」ディスカスの原種。中央の第5暗色バーが太く際立つのが特徴。"
  },
  {
    name: "アピストグラマ・アガシジィ", latin: "Apistogramma agassizii",
    lat: -3.760, lng: -73.250, height: 180000,
    habitat: "アマゾン川上流・ウカヤリ川", temp: "23–29℃", ph: "5.0–6.8", hardness: "超軟水〜軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Apistogramma_agassizii.jpg",
    desc: "オスはスペードテールと呼ばれる尖った尾鰭と極彩色のグラデーションを見せるドワーフシクリッド。"
  },
  {
    name: "アピストグラマ・カカトゥオイデス", latin: "Apistogramma cacatuoides",
    lat: -4.200, lng: -69.940, height: 180000,
    habitat: "アマゾン上流・ペルー国境周辺", temp: "24–28℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Apistogramma_cacatuoides_male.jpg",
    desc: "オウムのトサカのように前方に長く伸長する背鰭棘条を持つ迫力あるアピスト。"
  },
  {
    name: "ジャーマンラミレジィ", latin: "Mikrogeophagus ramirezi",
    lat: 7.900, lng: -67.450, height: 180000,
    habitat: "オリノコ水系・ロス・リャノス湿地", temp: "26–30℃", ph: "5.5–6.8", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mikrogeophagus_ramirezi.jpg",
    desc: "宝石のような青いラメと黄色・黒のコントラストが極めて美しい小型シクリッド。"
  },
  {
    name: "コリドラス・パンダ", latin: "Corydoras panda",
    lat: -9.280, lng: -75.980, height: 150000,
    habitat: "ペルー・ウカヤリ水系・パチテア川", temp: "20–25℃", ph: "6.0–7.2", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Corydoras_panda_1.jpg",
    desc: "目の周りと尾筒に黒い斑紋が入り、パンダのように見える大人気の底生ナマズ。"
  },
  {
    name: "コリドラス・ジュリー（トリリネアートゥス）", latin: "Corydoras trilineatus",
    lat: -4.450, lng: -73.500, height: 180000,
    habitat: "ペルー・アマゾン川上流域", temp: "22–26℃", ph: "6.0–7.4", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Corydoras_trilineatus_02.jpg",
    desc: "細かいネットワーク模様と白黒の斑点が頭部に入り、水槽底を愛らしく泳ぎ回ります。"
  },
  {
    name: "コリドラス・ステルバイ", latin: "Corydoras sterbai",
    lat: -12.400, lng: -63.500, height: 180000,
    habitat: "ブラジル・グアポレ川水系", temp: "24–28℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Corydoras_sterbai_02.jpg",
    desc: "黒地に白のドット模様と、鮮やかなオレンジ色に染まる胸鰭の対比が美しいコリドラス。"
  },
  {
    name: "コリドラス・アエネウス（白コリ・青コリ）", latin: "Corydoras aeneus",
    lat: 10.500, lng: -61.200, height: 180000,
    habitat: "トリニダード島・南米北東部", temp: "22–28℃", ph: "6.0–8.0", hardness: "軟水〜硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Corydoras_aeneus.jpg",
    desc: "赤コリとも呼ばれ、極めて頑健。環境適応力が高く長年親しまれている代表種。"
  },
  {
    name: "オトシンクルス", latin: "Macrotocinclus affinis",
    lat: -23.500, lng: -46.600, height: 150000,
    habitat: "ブラジル南東部河川", temp: "21–26℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Otocinclus_affinis_01.jpg",
    desc: "水草やガラス面のコケを吸盤状の口で一生懸命に削り取って食べるお掃除魚。"
  },
  {
    name: "ブッシープレコ", latin: "Ancistrus sp.",
    lat: -15.800, lng: -56.000, height: 180000,
    habitat: "パラグアイ川・アマゾン支流", temp: "22–27℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Ancistrus_dolichopterus.jpg",
    desc: "吻部に無数のヒゲ状突起が生える小型プレコ。水槽内のコケ取り役として定番。"
  },
  {
    name: "インペリアルゼブラプレコ", latin: "Hypancistrus zebra",
    lat: -3.220, lng: -52.200, height: 150000,
    habitat: "シングー川急流域（ベロ・モンテ周辺）", temp: "27–32℃", ph: "6.0–7.2", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Hypancistrus_zebra.jpg",
    desc: "純白と漆黒のストライプが際立つ小型プレコの至宝。急流の岩礁隙間に生息します。"
  },
  {
    name: "セルフィンプレコ", latin: "Pterygoplichthys gibbiceps",
    lat: -5.000, lng: -65.000, height: 250000,
    habitat: "アマゾン川本流・オリノコ川", temp: "23–28℃", ph: "6.5–7.8", hardness: "中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Pterygoplichthys_gibbiceps.jpg",
    desc: "帆船の帆のように巨大な背鰭を持つ大型プレコ。幼魚はコケ取りとして流通します。"
  },
  {
    name: "シルバーアロワナ", latin: "Osteoglossum bicirrhosum",
    lat: -2.900, lng: -58.400, height: 250000,
    habitat: "アマゾン川氾濫原水域", temp: "25–30℃", ph: "6.0–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/Osteoglossum_bicirrhosum1.jpg",
    desc: "銀色の鱗を輝かせて水面直下を優雅に泳ぎ、時には水上の獲物をジャンプして捕食する古代魚。"
  },
  {
    name: "ピラルク", latin: "Arapaima gigas",
    lat: -2.150, lng: -55.500, height: 250000,
    habitat: "アマゾン川・エセキボ川流域", temp: "25–30℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Arapaima_gigas_tennoji_2017-11-05.jpg",
    desc: "3m以上に達する世界最大級の淡水魚。真っ赤に染まる後部鱗と浮き袋を使った肺呼吸が特徴。"
  },
  {
    name: "ブラックゴースト", latin: "Apteronotus albifrons",
    lat: 8.200, lng: -63.500, height: 200000,
    habitat: "オリノコ川・アマゾン盆地", temp: "23–28℃", ph: "6.0–7.5", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Apteronotus_albifrons.jpg",
    desc: "下鰭を波打たせて前後自在にホバリングするナイフフィッシュ。微弱な電気を出して周囲を探知。"
  },
  {
    name: "オスカー（アストロノータス）", latin: "Astronotus ocellatus",
    lat: -3.460, lng: -62.210, height: 200000,
    habitat: "アマゾン川・パラナ川", temp: "23–28℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Astronotus_ocellatus.jpg",
    desc: "人によく馴れ、手からエサを食べる賢い大型アメリカンシクリッド。尾柄部の目玉模様が特徴。"
  },

  // --- 中米・カリブ海水系 ---
  {
    name: "グッピー", latin: "Poecilia reticulata",
    lat: 10.600, lng: -61.350, height: 150000,
    habitat: "トリニダード島・ベネズエラ沿岸", temp: "22–28℃", ph: "6.8–7.8", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Poecilia_reticulata.jpg",
    desc: "中南米原産の卵胎生メダカ。多彩な品種改良が行われ「ミリオンフィッシュ」とも称されます。"
  },
  {
    name: "プラティ", latin: "Xiphophorus maculatus",
    lat: 18.150, lng: -94.400, height: 180000,
    habitat: "メキシコ東南部・ベラクルス州", temp: "20–26℃", ph: "7.0–8.2", hardness: "中硬水〜硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Xiphophorus_maculatus.jpg",
    desc: "赤、青、黄色など豊かなバリエーションを持ち、温和で繁殖も容易な卵胎生メダカ。"
  },
  {
    name: "ソードテール", latin: "Xiphophorus hellerii",
    lat: 16.900, lng: -92.500, height: 180000,
    habitat: "メキシコ南部〜グアテマラの渓流", temp: "21–26℃", ph: "7.0–8.0", hardness: "中硬水〜硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Xiphophorus_helleri_male.jpg",
    desc: "オスの尾鰭下部が剣のように長く伸長するスマートな熱帯魚。活発に泳ぎ回ります。"
  },
  {
    name: "ブラックモーリー", latin: "Poecilia sphenops",
    lat: 15.500, lng: -88.000, height: 180000,
    habitat: "メキシコ〜ベネズエラ沿岸淡水・汽水域", temp: "22–28℃", ph: "7.0–8.5", hardness: "硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Black_Molly_Poecilia_sphenops.jpg",
    desc: "全身がマットブラックに覆われた卵胎生メダカ。油膜やアオミドロを食べる掃除役にも適します。"
  },

  // --- アフリカ（湖沼・コンゴ水系） ---
  {
    name: "フロントーサ", latin: "Cyphotilapia frontosa",
    lat: -4.880, lng: 29.800, height: 350000,
    habitat: "タンガニーカ湖（深場）", temp: "23–27℃", ph: "8.0–9.0", hardness: "硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Cyphotilapia_frontosa.jpg",
    desc: "青白い縞模様と成魚オスの発達したコブが荘厳なタンガニーカ湖の王様シクリッド。"
  },
  {
    name: "ネオランプロローグス・ブリチャージ", latin: "Neolamprologus brichardi",
    lat: -6.200, lng: 29.600, height: 250000,
    habitat: "タンガニーカ湖岩礁地帯", temp: "24–28℃", ph: "8.0–9.0", hardness: "硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Neolamprologus_brichardi.jpg",
    desc: "ライヤーテールと繊細なエメラルドグリーンの瞳が美しく、「ブルンジの妖精」と称えられます。"
  },
  {
    name: "アーリー（スキアエノクロミス・フライエリィ）", latin: "Sciaenochromis fryeri",
    lat: -12.100, lng: 34.300, height: 350000,
    habitat: "マラウィ湖全域", temp: "24–28℃", ph: "7.5–8.8", hardness: "硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Sciaenochromis_fryeri_male.jpg",
    desc: "オスの全身が電撃のようなメタリックエレクトリックブルーに輝くマラウィ湖シクリッド。"
  },
  {
    name: "イエローストライプシクリッド", latin: "Pseudotropheus johannii",
    lat: -13.600, lng: 34.900, height: 300000,
    habitat: "マラウィ湖東岸（ムベバ周辺）", temp: "23–28℃", ph: "7.8–8.6", hardness: "硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Pseudotropheus_johannii.jpg",
    desc: "ムブナと呼ばれる岩礁性シクリッド。メスは鮮やかな黄色、オスは濃紺に青縞へと劇的に変化。"
  },
  {
    name: "コンゴテトラ", latin: "Phenacogrammus interruptus",
    lat: -4.320, lng: 15.300, height: 200000,
    habitat: "コンゴ民主共和国・コンゴ川中央盆地", temp: "23–27℃", ph: "6.0–7.5", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Phenacogrammus_interruptus_male.jpg",
    desc: "虹色に輝く大型鱗と、オスの尾鰭中央が羽状に伸びるアフリカを代表する美形カラシン。"
  },
  {
    name: "ポリプテルス・セネガルス", latin: "Polypterus senegalus",
    lat: 12.000, lng: 15.000, height: 300000,
    habitat: "セネガル川・チャド湖・ナイル川上流", temp: "25–29℃", ph: "6.5–7.8", hardness: "中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Polypterus_senegalus_senegalus.jpg",
    desc: "背鰭に多数の小羽鰭を持ち、恐竜のような姿を現代に残す古代魚。極めて丈夫。"
  },
  {
    name: "ポリプテルス・エンドリケリー", latin: "Polypterus endlicheri",
    lat: 9.500, lng: 6.500, height: 250000,
    habitat: "ナイジェリア・ニジェール川水系", temp: "26–30℃", ph: "6.5–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Polypterus_endlicheri_01.jpg",
    desc: "扁平な下顎突出型の頭部と、褐色の虎縞模様が野性味溢れる大型ポリプテルス。"
  },
  {
    name: "バタフライフィッシュ", latin: "Pantodon buchholzi",
    lat: 4.050, lng: 9.700, height: 180000,
    habitat: "ナイジェリア・カメルーンの森林湿地", temp: "24–28℃", ph: "6.0–7.2", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Pantodon_buchholzi_1.jpg",
    desc: "蝶の羽のように大きく広がった胸鰭を持つ古代魚の生き残り。水面直下に定位します。"
  },
  {
    name: "アノマロクロミス・トーマシー", latin: "Anomalochromis thomasi",
    lat: 8.500, lng: -11.500, height: 180000,
    habitat: "シエラレオネ・リベリアの森林河川", temp: "23–27℃", ph: "6.0–7.2", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Anomalochromis_thomasi.jpg",
    desc: "青や黄色のラメが散りばめられた温和なアフリカン・ドワーフシクリッド。スネール駆除にも活躍。"
  },

  // --- 東南アジア・東アジア水系 ---
  {
    name: "ベタ（原種スプレンデンス）", latin: "Betta splendens",
    lat: 13.900, lng: 100.450, height: 180000,
    habitat: "タイ・チャオプラヤ川流域水田", temp: "24–30℃", ph: "6.0–8.0", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Betta_splendens.jpg",
    desc: "ラビリンス器官で空気呼吸ができる闘魚。水田や水たまりなど低酸素環境に適応。"
  },
  {
    name: "ラスボラ・ヘテロモルファ", latin: "Trigonostigma heteromorpha",
    lat: 3.140, lng: 101.690, height: 180000,
    habitat: "マレー半島・スマトラ島湿地林", temp: "23–27℃", ph: "5.0–6.8", hardness: "超軟水〜軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Trigonostigma_heteromorpha.jpg",
    desc: "体側に黒いバチ状の三角班が入る小型コイ科魚。水草レイアウト水槽の定番。"
  },
  {
    name: "ミクロラスボラ・ハナビ", latin: "Danio margaritatus",
    lat: 20.780, lng: 97.030, height: 150000,
    habitat: "ミャンマー・インレー湖東方高地", temp: "20–25℃", ph: "6.8–7.8", hardness: "中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Danio_margaritatus.jpg",
    desc: "濃紺のボディに花火が散ったような白金スポットと、朱色に染まる鰭を持つ小型美魚。"
  },
  {
    name: "スマトラ", latin: "Puntigrus tetrazona",
    lat: -0.500, lng: 101.400, height: 180000,
    habitat: "インドネシア・スマトラ島・ボルネオ島", temp: "23–27℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Puntigrus_tetrazona.jpg",
    desc: "黄色地に4本の黒バンドが目立つ元気なコイ科魚。やや気が強く他魚のヒレを突く習性があります。"
  },
  {
    name: "ゴールデンバルブ", latin: "Barbodes semifasciolatus var.",
    lat: 22.800, lng: 108.300, height: 180000,
    habitat: "中国南部〜ベトナム北部の水流", temp: "18–25℃", ph: "6.5–7.5", hardness: "中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Barbodes_semifasciolatus.jpg",
    desc: "黄金色に輝くウロコと黒いスポットが散る美しい小型バルブ。低水温にも強い。"
  },
  {
    name: "クラウンローチ", latin: "Chromobotia macracanthus",
    lat: -1.600, lng: 103.600, height: 200000,
    habitat: "スマトラ島・ボルネオ島水系", temp: "25–30℃", ph: "6.0–7.5", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Chromobotia_macracanthus.jpg",
    desc: "オレンジと黒の明瞭な縞模様を持つ大型ドジョウ。横になって眠るユニークな習性があります。"
  },
  {
    name: "クーリーローチ", latin: "Pangio kuhlii",
    lat: 2.100, lng: 102.500, height: 180000,
    habitat: "マレー半島・スンダ列島の泥底水域", temp: "24–29℃", ph: "5.5–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pangio_kuhlii.jpg",
    desc: "黄色と茶色のバンド模様をした細長いドジョウの仲間。砂に潜り残餌を掃除します。"
  },
  {
    name: "パールグラミー", latin: "Trichopodus leerii",
    lat: 2.750, lng: 101.700, height: 180000,
    habitat: "マレーシア・タイ・低湿地ブラックウォーター", temp: "24–28℃", ph: "5.5–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Trichopodus_leerii.jpg",
    desc: "真珠を散りばめたような全身の斑点と、喉元から胸にかけての鮮やかなオレンジが魅力のアナバス。"
  },
  {
    name: "ドワーフグラミー", latin: "Trichogaster lalius",
    lat: 25.500, lng: 85.000, height: 200000,
    habitat: "インド・ガンジス川・ブラマプトラ川流域", temp: "22–28℃", ph: "6.0–7.5", hardness: "軟水〜中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Colisa_lalia.jpg",
    desc: "メタリックブルーと赤のストライプが極めて華やかな小型グラミー。泡巣を作って産卵します。"
  },
  {
    name: "グラスキャット", latin: "Kryptopterus vitreolus",
    lat: 12.600, lng: 102.100, height: 150000,
    habitat: "タイ南東部・チャンタブリー県水系", temp: "22–27℃", ph: "6.0–7.2", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Kryptopterus_vitreolus.jpg",
    desc: "骨や内臓が完全に透けて見える透明なナマズ。水流に逆らって集団で漂うように泳ぎます。"
  },
  {
    name: "アジアアロワナ（紅龍）", latin: "Scleropages formosus",
    lat: 0.100, lng: 111.500, height: 200000,
    habitat: "カリマンタン島・カプアス川流域カプアス湖", temp: "26–30℃", ph: "6.0–7.0", hardness: "軟水",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Scleropages_formosus.jpg",
    desc: "深紅の巨大な鱗を持つアジア屈指の怪魚。風水でも富をもたらす龍魚として重宝されます。"
  },

  // --- オセアニア（オーストラリア・ニューギニア） ---
  {
    name: "ネオンドワーフレインボー", latin: "Melanotaenia praecox",
    lat: -2.500, lng: 138.500, height: 200000,
    habitat: "ニューギニア島・マンベラモ川水系", temp: "24–28℃", ph: "6.5–7.5", hardness: "中硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Melanotaenia_praecox_01.jpg",
    desc: "光の角度によってコバルトブルーに妖しく輝く小型レインボーフィッシュ。鰭の赤がアクセント。"
  },
  {
    name: "ポポンデッタ・フルカタ", latin: "Pseudomugil furcatus",
    lat: -8.760, lng: 148.240, height: 150000,
    habitat: "パプアニューギニア東部・ポポンデッタ周辺", temp: "24–28℃", ph: "7.0–8.0", hardness: "中硬水〜硬水",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Pseudomugil_furcatus_1.jpg",
    desc: "鮮やかな青い目と、黄色い羽のような胸鰭をパタパタと羽ばたかせて泳ぐ姿が可憐な小型魚。"
  }
];
