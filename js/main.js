/**
 * main.js — 全ページ共通のJavaScript
 * 東栄建設株式会社
 *
 * このファイルには「全ページで使う処理」を書く。
 * ページ固有の処理は hero.js / works.js に書く。
 *
 * 担当:
 *   - ハンバーガーメニュー（スマホメニューの開閉）
 *   - スクロールアニメーション（画面に入ったら要素をフェードイン）
 */


/* =============================================
   ハンバーガーメニュー
   スマホでナビのボタンを押したとき、全画面メニューを開閉する
============================================= */

/**
 * メニューの開閉を切り替える関数
 * HTML側から onclick="toggleMenu()" で呼び出す
 */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');

  // classList.toggle() は：
  //   クラスがなければ追加、あれば削除、を自動でやってくれる
  menu.classList.toggle('open');
}


/* =============================================
   スクロールアニメーション
   .reveal クラスが付いた要素が画面に入ったとき、
   .visible クラスを追加してフェードインさせる

   使用API: IntersectionObserver
   「要素が画面内に入ったか」を監視する機能
============================================= */

/**
 * IntersectionObserver の設定
 *
 * threshold: 0.1 → 要素の10%が見えたら発火
 * rootMargin: '0px 0px -40px 0px' → 画面下端より40px手前で発火
 *   （少し早めにアニメーションを始めることで自然に見える）
 */
const revealObserver = new IntersectionObserver(
  function(entries) {
    // entries = 監視している要素の配列
    entries.forEach(function(entry) {
      // entry.isIntersecting = 要素が画面内に入っているか（true/false）
      if (entry.isIntersecting) {
        // 画面内に入ったら .visible クラスを追加（CSSでフェードイン）
        entry.target.classList.add('visible');

        // 一度表示したら監視を停止（パフォーマンス対策）
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  }
);

// ページ内のすべての .reveal 要素を監視対象に登録
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(function(el) {
  revealObserver.observe(el);
});
