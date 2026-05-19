/**
 * works.js — 施工事例タブ切り替え
 * 東栄建設株式会社
 *
 * 「一般住宅 / マンション / テナントビル / 公共事業」のタブを
 * クリックしたとき、対応するコンテンツを表示する。
 */


/* =============================================
   タブを切り替える関数
============================================= */

/**
 * 指定したタブのコンテンツを表示する
 * @param {string} tabId - タブのID（例: 'juutaku', 'mansion'）
 * @param {HTMLElement} clickedButton - クリックされたボタン要素
 *
 * HTML側から onclick="switchTab('juutaku', this)" のように呼び出す
 */
function switchTab(tabId, clickedButton) {
  /* --- 1. すべてのタブパネルを非表示にする --- */
  // querySelectorAll で .tab-panel クラスの要素をすべて取得
  const allPanels = document.querySelectorAll('.tab-panel');
  allPanels.forEach(function(panel) {
    panel.classList.remove('active'); // .active を外す → display:none になる
  });

  /* --- 2. すべてのタブボタンを非アクティブにする --- */
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach(function(button) {
    button.classList.remove('active');
  });

  /* --- 3. 選択したタブパネルを表示する --- */
  // 'tab-juutaku', 'tab-mansion' ... のようにIDを組み立てて取得
  const targetPanel = document.getElementById('tab-' + tabId);
  targetPanel.classList.add('active'); // .active を付ける → display:block になる

  /* --- 4. クリックされたボタンをアクティブにする --- */
  clickedButton.classList.add('active');

  /* --- 5. 新しいタブ内の .reveal 要素をアニメーション表示 --- */
  // タブを切り替えたとき、まだ表示されていない要素をフェードインさせる
  const revealItems = targetPanel.querySelectorAll('.reveal');
  revealItems.forEach(function(el) {
    // まだ .visible が付いていない要素だけ処理する
    if (!el.classList.contains('visible')) {
      // 少し遅らせてから .visible を追加（自然なアニメーションのため）
      setTimeout(function() {
        el.classList.add('visible');
      }, 80);
    }
  });
}
