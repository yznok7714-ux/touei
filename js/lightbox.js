/**
 * lightbox.js — 施工事例ページ専用JavaScript
 * 東栄建設株式会社
 *
 * このファイルには2つの機能が入っている:
 *   1. タブ切り替え（一般住宅・マンション・テナント・公共）
 *   2. ライトボックス（写真クリックで拡大表示するポップアップ）
 */


/* =============================================
   タブ切り替え
============================================= */

/**
 * 指定したタブのコンテンツを表示する
 * @param {string} id  - タブのID（例: 'juutaku', 'mansion'）
 * @param {HTMLElement} btn - クリックされたボタン要素
 *
 * HTML側から onclick="switchTab('juutaku', this)" のように呼び出す
 */
function switchTab(id, btn) {
  /* 1. すべてのタブパネルを非表示にする */
  document.querySelectorAll('.tab-panel').forEach(function(panel) {
    panel.classList.remove('active');
  });

  /* 2. すべてのタブボタンを非アクティブにする */
  document.querySelectorAll('.tab-btn').forEach(function(button) {
    button.classList.remove('active');
  });

  /* 3. 選択したパネルを表示する */
  document.getElementById('tab-' + id).classList.add('active');

  /* 4. クリックされたボタンをアクティブにする */
  if (btn) btn.classList.add('active');
}

/**
 * URLのハッシュ（例: #mansion）に応じてタブを切り替える
 * index.html の「施工事例を見る」ボタンから #juutaku などで飛んできたとき用
 */
window.addEventListener('load', function() {
  // location.hash = '#mansion' → hash = 'mansion'
  const hash = location.hash.replace('#', '');
  if (hash) {
    // ハッシュに対応するタブボタンを探す
    const btn = document.querySelector('[onclick*="' + hash + '"]');
    if (btn) switchTab(hash, btn);
  }
});


/* =============================================
   ライトボックス
   写真カードをクリックすると全画面で拡大表示する。
============================================= */

// 現在表示中のタブパネル内の全画像リスト
let lbImgs = []; // [{ src: '...', alt: '...' }, ...]

// 今表示している画像の番号（0始まり）
let lbIdx = 0;

/**
 * ライトボックスを開く
 * @param {HTMLElement} card - クリックされた .g-card 要素
 *
 * HTML側から onclick="openLb(this)" のように呼び出す
 */
function openLb(card) {
  // カードの中の <img> を取得
  const img = card.querySelector('img');

  // このカードが入っているタブパネルを探す
  // .closest() = 親要素をさかのぼって一致するものを返す
  const panel = card.closest('.tab-panel');

  // パネル内のすべての画像を配列に変換して保存
  lbImgs = Array.from(panel.querySelectorAll('.g-card img')).map(function(i) {
    return { src: i.src, alt: i.alt };
  });

  // クリックされた画像が配列の何番目かを探す
  lbIdx = lbImgs.findIndex(function(i) {
    return i.src === img.src;
  });

  // ライトボックスを表示する
  showLb();
}

/**
 * ライトボックスの中身を更新して表示する
 * （openLb と lbNav の両方から呼ばれる）
 */
function showLb() {
  const item = lbImgs[lbIdx];

  // 画像を差し替える
  document.getElementById('lbImg').src     = item.src;
  document.getElementById('lbImg').alt     = item.alt;

  // キャプションを更新（「施工名 (現在枚数 / 全枚数)」）
  document.getElementById('lbCaption').textContent =
    item.alt + ' (' + (lbIdx + 1) + ' / ' + lbImgs.length + ')';

  // lightbox に .open クラスを付けて表示する（CSSで display:flex になる）
  document.getElementById('lightbox').classList.add('open');
}

/**
 * ライトボックスで前後の画像に移動する
 * @param {number} dir - 方向（+1=次, -1=前）
 *
 * HTML側から onclick="lbNav(-1)" / onclick="lbNav(1)" で呼び出す
 */
function lbNav(dir) {
  // % で配列の端を超えたときに反対側に戻る（ループ）
  // 例: 5枚中最後(idx=4)で+1 → (4+1+5) % 5 = 0（最初に戻る）
  lbIdx = (lbIdx + dir + lbImgs.length) % lbImgs.length;
  showLb();
}

/**
 * ライトボックスの背景クリックで閉じる
 * @param {MouseEvent} e - クリックイベント
 *
 * HTML側から onclick="closeLb(event)" で呼び出す
 * e.target（実際にクリックされた要素）が lightbox 自身のときだけ閉じる。
 * 画像や矢印をクリックしても閉じないようにするため。
 */
function closeLb(e) {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.remove('open');
  }
}

/**
 * ✕ ボタンで閉じる
 *
 * HTML側から onclick="closeLbBtn()" で呼び出す
 */
function closeLbBtn() {
  document.getElementById('lightbox').classList.remove('open');
}

/**
 * キーボード操作のサポート
 *   ← キー: 前の画像
 *   → キー: 次の画像
 *   Escape : 閉じる
 */
document.addEventListener('keydown', function(e) {
  // ライトボックスが開いていないときは何もしない
  if (!document.getElementById('lightbox').classList.contains('open')) return;

  if (e.key === 'ArrowLeft')  lbNav(-1);                                               // ← 前の画像
  if (e.key === 'ArrowRight') lbNav(1);                                                // → 次の画像
  if (e.key === 'Escape')     document.getElementById('lightbox').classList.remove('open'); // ESC 閉じる
});
