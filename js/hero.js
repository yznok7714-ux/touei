/**
 * hero.js — ヒーロースライドショー
 * 東栄建設株式会社
 *
 * トップページのヒーロー画像を自動で切り替える処理。
 * 5秒ごとに次のスライドに切り替わる。
 * 下部のドットをクリックしても切り替えられる。
 */


/* =============================================
   スライドショーの状態管理
============================================= */

// 現在表示中のスライドの番号（0始まり）
let currentSlide = 0;

// スライド要素（.hero-slide）をすべて取得
const slides = document.querySelectorAll('.hero-slide');

// ドット要素（.dot）をすべて取得
const dots = document.querySelectorAll('.dot');


/* =============================================
   スライドを切り替える関数
============================================= */

/**
 * 指定した番号のスライドに切り替える
 * @param {number} nextIndex - 表示したいスライドの番号（0始まり）
 *
 * HTML側から onclick="goSlide(0)" のように呼び出す
 */
function goSlide(nextIndex) {
  // 現在のスライドとドットから .active クラスを外す（非表示にする）
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  // 現在のスライド番号を更新
  currentSlide = nextIndex;

  // 新しいスライドとドットに .active クラスを付ける（表示する）
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}


/* =============================================
   自動スライドショーの設定
============================================= */

/**
 * 5000ミリ秒（5秒）ごとに次のスライドへ進む
 *
 * setInterval(関数, 間隔ms) → 一定間隔で関数を繰り返し実行する
 *
 * (currentSlide + 1) % slides.length の意味:
 *   最後のスライドの次は最初に戻る（ループ）
 *   例: スライドが5枚の場合
 *     0→1→2→3→4→0→1→... と繰り返す
 */
setInterval(function() {
  const nextIndex = (currentSlide + 1) % slides.length;
  goSlide(nextIndex);
}, 5000);
