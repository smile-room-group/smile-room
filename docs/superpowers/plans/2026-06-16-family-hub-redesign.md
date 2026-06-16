# ご家族ハブ戦略 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 入居者家族をメインターゲットとして、4つの不安を解消する「ご家族ハブ」構成にサイトをブラッシュアップする。

**Architecture:** 静的HTML/CSS/JSサイト（GitHub Pages）。サーバー不要。共通ナビ・フッター・CTAバーは `js/shared.js` / `chiharadai/shared-ch.js` で管理されており、ここに手を加えると全ページに自動反映される。CSS は `css/styles.css` に一元管理。

**Tech Stack:** Vanilla HTML / CSS / JavaScript（ライブラリなし）、GitHub Pages デプロイ

---

## ファイルマップ

| ファイル | 変更内容 |
|---|---|
| `oyumino/contact.html` | Googleフォーム埋め込みに差し替え |
| `chiharadai/contact.html` | Googleフォーム埋め込みに差し替え |
| `js/shared.js` | CTAバー強化・FAQ Bot追加 |
| `chiharadai/shared-ch.js` | CTAバー強化・FAQ Bot追加（ちはら台用） |
| `css/styles.css` | CTAバー・FAQ Bot用CSS追加 |
| `oyumino/index.html` | ご家族ハブセクション（4カード）追加 |
| `chiharadai/index.html` | ご家族ハブセクション（4カード）追加 |
| `oyumino/pricing.html` | 費用シミュレーターに介護度・自己負担割合を追加 |
| `chiharadai/pricing.html` | 費用シミュレーターに介護度・自己負担割合を追加 |

---

## Task 1: Googleフォーム差し替え（④）

> ⚠️ **前提作業**: 実装前にユーザーがGoogleフォームを2つ（おゆみ野・ちはら台）作成し、各フォームの埋め込みURLを取得する必要があります。
> 取得方法: Googleフォーム編集画面 → 送信 → `<>` アイコン → 埋め込みHTMLをコピー → `src="..."` のURLを取り出す

**Files:**
- Modify: `oyumino/contact.html`
- Modify: `chiharadai/contact.html`

### おゆみ野

- [ ] **Step 1: `oyumino/contact.html` を読んで現在のフォーム構造を確認**

  注目するのは `<form` タグから `</form>` タグまでの範囲。何行目にあるか確認する。

- [ ] **Step 2: フォームをGoogleフォーム埋め込みに差し替え**

  既存の `<form>...</form>` ブロック全体を以下に置き換える（`OYUMINO_FORM_URL` は実際のURLに変更）:

  ```html
  <!-- Googleフォーム -->
  <div class="gform-wrap">
    <iframe
      src="OYUMINO_FORM_URL"
      width="100%"
      height="900"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      title="おゆみ野 お問い合わせフォーム"
      loading="lazy"
    >読み込んでいます…</iframe>
  </div>
  ```

  また、`<style>` ブロックに以下を追加する:

  ```css
  .gform-wrap {
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--line-soft);
    background: var(--card);
  }
  .gform-wrap iframe {
    display: block;
    width: 100%;
    min-height: 900px;
  }
  ```

- [ ] **Step 3: ブラウザで動作確認**

  `oyumino/contact.html` をブラウザで開き、Googleフォームが表示されることを確認する。

- [ ] **Step 4: Commit**

  ```bash
  git add oyumino/contact.html
  git commit -m "feat: おゆみ野コンタクトページにGoogleフォームを埋め込み"
  ```

### ちはら台

- [ ] **Step 5: `chiharadai/contact.html` のフォームを同様にGoogleフォームに差し替え**

  Step 2と同じ要領で差し替える（`CHIHARADAI_FORM_URL` は実際のURLに変更）:

  ```html
  <div class="gform-wrap">
    <iframe
      src="CHIHARADAI_FORM_URL"
      width="100%"
      height="900"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      title="ちはら台 お問い合わせフォーム"
      loading="lazy"
    >読み込んでいます…</iframe>
  </div>
  ```

  CSSは `chiharadai/contact.html` の `<style>` ブロックにも同じく追加する。

- [ ] **Step 6: ブラウザで動作確認・Commit**

  ```bash
  git add chiharadai/contact.html
  git commit -m "feat: ちはら台コンタクトページにGoogleフォームを埋め込み"
  ```

---

## Task 2: スマホ固定CTAバー強化（⑤）

**Files:**
- Modify: `js/shared.js`（`setupFloatingBar` 関数、行143〜158）
- Modify: `chiharadai/shared-ch.js`（同様の `setupFloatingBar` 関数）
- Modify: `css/styles.css`（`.floating-bar` 関連、行587〜634）

### shared.js の改修

- [ ] **Step 1: `js/shared.js` を読んで `setupFloatingBar` 関数を確認**

  行143〜158付近にある関数を把握する。

- [ ] **Step 2: `setupFloatingBar` 関数のHTMLを更新**

  `bar.innerHTML = \`...\`` の中身を以下に置き換える。
  施設ページ用（`shared.js` はおゆみ野で使用）:

  ```js
  bar.innerHTML = `
  <a href="tel:0433107467" class="fb-tel" aria-label="電話で問い合わせ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    電話する
  </a>
  <a href="contact.html" class="fb-cta" aria-label="見学を予約する">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    見学予約（無料）
  </a>
  `;
  ```

- [ ] **Step 3: `css/styles.css` の `.floating-bar` 関連CSSを更新**

  行587〜634 の `.floating-bar` ブロックを以下に置き換える:

  ```css
  /* ============= フローティング電話バー（スマホ用） ============= */
  .floating-bar {
    display: none;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 100;
    background: var(--card);
    border-top: 2px solid var(--pink-300);
    box-shadow: 0 -4px 16px oklch(0.7 0.06 20 / 0.12);
    padding: 10px 16px;
    padding-bottom: max(10px, env(safe-area-inset-bottom));
    gap: 10px;
  }
  @media (max-width: 880px) {
    .floating-bar { display: flex; }
  }
  .floating-bar .fb-tel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: var(--card);
    color: var(--pink-600);
    font-family: "Zen Maru Gothic", sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 3.6vw, 15px);
    white-space: nowrap;
    padding: 12px 8px;
    border-radius: 10px;
    text-decoration: none;
    border: 2px solid var(--pink-400);
  }
  .floating-bar .fb-cta {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: var(--pink-600);
    color: white;
    font-family: "Zen Maru Gothic", sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 3.4vw, 15px);
    white-space: nowrap;
    padding: 12px 8px;
    border-radius: 10px;
    text-decoration: none;
    border: 2px solid transparent;
  }
  /* FAQ Bot との重複回避：FAQ Botは bottom:72px に配置 */
  .faq-bot-btn { bottom: 72px !important; }
  ```

- [ ] **Step 4: トップページ（`index.html`）用に2施設並列表示バリアントを追加**

  `js/shared.js` の `setupFloatingBar` 関数内、`document.body.appendChild(bar)` の前に以下の分岐を追加する:

  ```js
  // トップページでは2施設の電話番号を並列表示
  const isTop = window.location.pathname.endsWith('/smile-room/') ||
                window.location.pathname.endsWith('/index.html') ||
                window.location.pathname === '/';
  if (isTop) {
    bar.innerHTML = `
    <div class="fb-top-label">施設を選んでお問い合わせ</div>
    <div class="fb-top-grid">
      <a href="tel:0433107467" class="fb-top-item fb-top-oyumino" aria-label="おゆみ野に電話">
        <span class="fb-top-name">おゆみ野</span>
        <span class="fb-top-tel">043-310-7467</span>
      </a>
      <a href="tel:0436633618" class="fb-top-item fb-top-chiharadai" aria-label="ちはら台に電話">
        <span class="fb-top-name">ちはら台</span>
        <span class="fb-top-tel">0436-63-3618</span>
      </a>
    </div>
    `;
  }
  ```

  また `css/styles.css` に追加:

  ```css
  /* トップページCTAバー */
  .fb-top-label {
    font-size: 11px;
    color: var(--ink-mute);
    text-align: center;
    width: 100%;
    margin-bottom: 4px;
  }
  .fb-top-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;
  }
  .fb-top-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 9px 8px;
    border-radius: 10px;
    text-decoration: none;
    gap: 2px;
  }
  .fb-top-name {
    font-size: 11px;
    font-weight: 700;
  }
  .fb-top-tel {
    font-size: 12px;
    font-weight: 700;
  }
  .fb-top-oyumino {
    background: var(--pink-50);
    border: 1.5px solid var(--pink-300);
    color: var(--pink-600);
  }
  .fb-top-chiharadai {
    background: oklch(0.95 0.03 240);
    border: 1.5px solid oklch(0.75 0.08 240);
    color: oklch(0.35 0.1 240);
  }
  /* トップページのfloating-barは縦積み */
  .floating-bar:has(.fb-top-label) {
    flex-direction: column;
    gap: 4px;
  }
  ```

- [ ] **Step 5: `chiharadai/shared-ch.js` にも同様の改修を適用**

  `js/shared.js` と同じ `setupFloatingBar` 関数を確認し、電話番号をちはら台（0436-63-3618）に変更して同様に更新する。

- [ ] **Step 6: ブラウザで確認**

  スマホ幅（390px）でトップページ・おゆみ野・ちはら台を開き、CTAバーが正しく表示されることを確認する。

- [ ] **Step 7: Commit**

  ```bash
  git add js/shared.js chiharadai/shared-ch.js css/styles.css
  git commit -m "feat: スマホCTAバーを強化（見学予約ボタン追加・トップページ2施設並列）"
  ```

---

## Task 3: ご家族ハブセクション（③）

**Files:**
- Modify: `oyumino/index.html`（CTA セクション直前、行1308付近）
- Modify: `chiharadai/index.html`（CTAセクション直前）

### おゆみ野

- [ ] **Step 1: 挿入位置を確認**

  `oyumino/index.html` を開き、`<!-- ========== CTA ==========` コメント（行1308付近）を見つける。この直前に新セクションを挿入する。

- [ ] **Step 2: ご家族ハブセクションを挿入**

  `<!-- ========== CTA ==========` の直前に以下を挿入する:

  ```html
  <!-- ========== ご家族の方へ（ハブ） ========== -->
  <section class="section" id="for-family" style="background:var(--bg-warm);">
    <div class="container">
      <div style="text-align:center;margin-bottom:40px;">
        <span class="eyebrow">ご家族の方へ</span>
        <h2 class="section-title">「ここで大丈夫？」の<br>不安にお答えします</h2>
        <p class="section-lede">入居をご検討のご家族からよくいただく4つのご心配にお答えします。</p>
      </div>
      <div class="family-hub-grid">
        <!-- カード① 費用 -->
        <div class="family-hub-card" style="--hub-color: var(--pink-600); --hub-bg: var(--pink-50); --hub-border: var(--pink-200);">
          <div class="hub-icon">💰</div>
          <div class="hub-badge">不安①</div>
          <h3 class="hub-title">費用が実際<br>いくらかかるか分からない</h3>
          <p class="hub-body">住居費・食費・介護費をすべて含めた月額の目安を、介護度や自己負担割合に合わせてその場でシミュレーションできます。</p>
          <a class="hub-link" href="pricing.html#simulator">料金シミュレーターを使う →</a>
        </div>
        <!-- カード② 緊急時 -->
        <div class="family-hub-card" style="--hub-color: oklch(0.38 0.1 240); --hub-bg: oklch(0.97 0.02 240); --hub-border: oklch(0.82 0.06 240);">
          <div class="hub-icon">🚨</div>
          <div class="hub-badge">不安②</div>
          <h3 class="hub-title">夜中や緊急時の<br>対応が心配</h3>
          <p class="hub-body">24時間スタッフ常駐・全室緊急呼出ボタン完備。夜間も定期巡回を行っています。何かあればすぐに対応します。</p>
          <a class="hub-link" href="faq.html">緊急時の対応を詳しく見る →</a>
        </div>
        <!-- カード③ 本人意思 -->
        <div class="family-hub-card" style="--hub-color: oklch(0.38 0.12 145); --hub-bg: oklch(0.97 0.02 145); --hub-border: oklch(0.82 0.07 145);">
          <div class="hub-icon">😊</div>
          <div class="hub-badge">不安③</div>
          <h3 class="hub-title">親が施設を<br>嫌がるかもしれない</h3>
          <p class="hub-body">ここは「施設」ではなく「賃貸住宅」です。自分のペースで暮らし、好きな介護サービスを選べます。入居者の一日をご覧ください。</p>
          <a class="hub-link" href="lifestyle.html">入居者の暮らしを見る →</a>
        </div>
        <!-- カード④ 介護進行 -->
        <div class="family-hub-card" style="--hub-color: oklch(0.45 0.12 50); --hub-bg: oklch(0.97 0.03 70); --hub-border: oklch(0.85 0.07 60);">
          <div class="hub-icon">🏥</div>
          <div class="hub-badge">不安④</div>
          <h3 class="hub-title">介護が重くなったら<br>追い出される？</h3>
          <p class="hub-body">自立〜要介護5まで対応しています。介護度が上がっても、外部の介護事業者と連携しながら同じ住まいで暮らし続けられます。</p>
          <a class="hub-link" href="faq.html">入居条件・継続について →</a>
        </div>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 3: `oyumino/index.html` の `<style>` ブロックにCSS追加**

  `</style>` の直前に追加する:

  ```css
  /* ===== ご家族ハブ ===== */
  .family-hub-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: 600px) {
    .family-hub-grid { grid-template-columns: 1fr; }
  }
  .family-hub-card {
    background: var(--hub-bg);
    border: 1.5px solid var(--hub-border);
    border-left: 4px solid var(--hub-color);
    border-radius: var(--radius);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .hub-icon { font-size: 28px; line-height: 1; }
  .hub-badge {
    font-size: 10px;
    font-weight: 700;
    color: var(--hub-color);
    letter-spacing: .07em;
  }
  .hub-title {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
    margin: 0;
  }
  .hub-body {
    font-size: 13px;
    color: var(--ink-soft);
    line-height: 1.7;
    margin: 0;
    flex: 1;
  }
  .hub-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--hub-color);
    text-decoration: none;
    margin-top: 4px;
  }
  .hub-link:hover { text-decoration: underline; }
  ```

- [ ] **Step 4: ブラウザで確認**

  `oyumino/index.html` をブラウザで開き、CTAセクションの直前に4カードが表示されることを確認する。スマホ幅（390px）で1列になることも確認する。

- [ ] **Step 5: Commit**

  ```bash
  git add oyumino/index.html
  git commit -m "feat: おゆみ野トップにご家族ハブセクション（4カード）を追加"
  ```

### ちはら台

- [ ] **Step 6: `chiharadai/index.html` のCTAセクション直前に同じセクションを挿入**

  電話番号・リンクパスは変更しない（相対パスのまま）。CSSも同様に `<style>` ブロックへ追加。

- [ ] **Step 7: Commit**

  ```bash
  git add chiharadai/index.html
  git commit -m "feat: ちはら台トップにご家族ハブセクション（4カード）を追加"
  ```

---

## Task 4: 費用シミュレーター 家族向け強化（①）

**Files:**
- Modify: `oyumino/pricing.html`（既存シミュレーター `id="simulator"` 内、行248〜306）
- Modify: `chiharadai/pricing.html`（既存シミュレーター内）

### おゆみ野

- [ ] **Step 1: 既存シミュレーターの構造を確認**

  `oyumino/pricing.html` の `id="simulator"` ブロック（行248〜306）を読む。現在は「部屋タイプ・食事プラン・介護サービス（週の回数）」の3段階。

- [ ] **Step 2: 介護度選択と自己負担割合選択を追加**

  既存の「Step 3 介護サービスの目安」ブロック（`name="sim-care"` のラジオ群）を以下に置き換える：

  ```html
  <div>
    <div class="sim-step-label"><span class="step-num">3</span> 介護度</div>
    <div class="sim-options">
      <label class="sim-option">
        <input type="radio" name="sim-care-level" value="0" checked> 自立・要支援（介護サービスなし）
      </label>
      <label class="sim-option">
        <input type="radio" name="sim-care-level" value="1"> 要介護1（目安：週2〜3回）
      </label>
      <label class="sim-option">
        <input type="radio" name="sim-care-level" value="2"> 要介護2（目安：週3〜4回）
      </label>
      <label class="sim-option">
        <input type="radio" name="sim-care-level" value="3"> 要介護3（目安：ほぼ毎日）
      </label>
      <label class="sim-option">
        <input type="radio" name="sim-care-level" value="4"> 要介護4〜5（目安：毎日複数回）
      </label>
    </div>
  </div>
  <div>
    <div class="sim-step-label"><span class="step-num">4</span> 介護保険の自己負担割合</div>
    <div class="sim-options">
      <label class="sim-option">
        <input type="radio" name="sim-burden" value="1" checked> 1割（多くの方はこちら）
      </label>
      <label class="sim-option">
        <input type="radio" name="sim-burden" value="2"> 2割
      </label>
      <label class="sim-option">
        <input type="radio" name="sim-burden" value="3"> 3割
      </label>
    </div>
  </div>
  ```

  また結果表示部分で `id="sim-row-care"` の行ラベルを「介護サービス目安」のまま残し、合計に反映させる。

- [ ] **Step 3: シミュレーター用JSロジックを更新**

  `oyumino/pricing.html` 内の `<script>` ブロックを読み、シミュレーター計算関数を特定する。その関数を以下に置き換える：

  ```js
  // 介護度別・自己負担割合別の月額目安（円）
  // 根拠: 区分支給限度基準額の60〜80%利用を想定
  const CARE_COST = {
    0: 0,       // 自立・要支援
    1: 25000,   // 要介護1：限度額167,650円 → 1割 16,765円 → 実態に近い目安25,000円/月（区分外サービス含む）
    2: 33000,   // 要介護2：197,050円 → 目安33,000円
    3: 45000,   // 要介護3：270,480円 → 目安45,000円
    4: 60000,   // 要介護4〜5：309,380〜360,650円 → 目安60,000円
  };

  function calcSim() {
    const room = Number(document.querySelector('[name="sim-room"]:checked')?.value || 102000);
    const meal = Number(document.querySelector('[name="sim-meal"]:checked')?.value || 0);
    const careLevel = Number(document.querySelector('[name="sim-care-level"]:checked')?.value || 0);
    const burden = Number(document.querySelector('[name="sim-burden"]:checked')?.value || 1);

    const careBase = CARE_COST[careLevel] || 0;
    const care = Math.round(careBase * burden / 1);  // 1割基準×負担割合係数
    // 実際は1割基準で計算し負担割合で乗算
    const careActual = careLevel === 0 ? 0 : Math.round(CARE_COST[careLevel] * burden);

    const total = room + meal + careActual;

    document.getElementById('sim-val-room').textContent = room.toLocaleString() + '円';
    const mealRow = document.getElementById('sim-row-meal');
    const careRow = document.getElementById('sim-row-care');
    if (meal > 0) {
      mealRow.style.display = '';
      document.getElementById('sim-val-meal').textContent = meal.toLocaleString() + '円';
    } else {
      mealRow.style.display = 'none';
    }
    if (careActual > 0) {
      careRow.style.display = '';
      document.getElementById('sim-val-care').textContent = '約' + careActual.toLocaleString() + '円';
    } else {
      careRow.style.display = 'none';
    }
    document.getElementById('sim-total').innerHTML = total.toLocaleString() + '<span>円／月〜</span>';
  }

  document.querySelectorAll('[name="sim-room"],[name="sim-meal"],[name="sim-care-level"],[name="sim-burden"]')
    .forEach(el => el.addEventListener('change', calcSim));
  calcSim();
  ```

- [ ] **Step 4: ブラウザで動作確認**

  `oyumino/pricing.html` を開き、介護度・自己負担割合を変えると合計金額が変わることを確認する。

- [ ] **Step 5: Commit**

  ```bash
  git add oyumino/pricing.html
  git commit -m "feat: おゆみ野料金ページのシミュレーターに介護度・自己負担割合を追加"
  ```

### ちはら台

- [ ] **Step 6: `chiharadai/pricing.html` の既存シミュレーターを同様に更新**

  ちはら台は月額固定（103,000円）。「部屋タイプ」選択は不要。介護度・自己負担割合のみで計算する。

  ラジオボタン `name="sim-room"` は削除し、CARE_COST と calcSim の構造はおゆみ野と同じ。`room` は `103000` 固定とする。

- [ ] **Step 7: Commit**

  ```bash
  git add chiharadai/pricing.html
  git commit -m "feat: ちはら台料金ページのシミュレーターに介護度・自己負担割合を追加"
  ```

---

## Task 5: FAQ Bot（②）

**Files:**
- Modify: `js/shared.js`（末尾に追加）
- Modify: `chiharadai/shared-ch.js`（末尾に追加、Q&Aデータをちはら台用に調整）
- Modify: `css/styles.css`（FAQ Bot用CSS追加）

- [ ] **Step 1: `css/styles.css` にFAQ Bot用CSSを追加**

  ファイル末尾に追加:

  ```css
  /* ============= FAQ Bot ============= */
  .faq-bot-btn {
    position: fixed;
    bottom: 72px;
    right: 16px;
    z-index: 99;
    background: var(--pink-600);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 18px;
    font-size: 13px;
    font-weight: 700;
    font-family: "Zen Maru Gothic", sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 16px oklch(0.56 0.15 25 / 0.4);
    display: flex;
    align-items: center;
    gap: 7px;
    transition: transform .15s, box-shadow .15s;
  }
  .faq-bot-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px oklch(0.56 0.15 25 / 0.5); }
  @media (min-width: 881px) {
    /* PCでは floating-bar が非表示なので bot を下に */
    .faq-bot-btn { bottom: 24px; }
  }
  .faq-bot-panel {
    position: fixed;
    bottom: 72px;
    right: 16px;
    z-index: 200;
    width: min(340px, calc(100vw - 32px));
    background: var(--card);
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,.18);
    overflow: hidden;
    display: none;
    flex-direction: column;
    max-height: 70vh;
  }
  .faq-bot-panel.open { display: flex; }
  @media (min-width: 881px) {
    .faq-bot-panel { bottom: 76px; }
  }
  .faq-bot-head {
    background: var(--pink-600);
    color: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-family: "Zen Maru Gothic", sans-serif;
    font-size: 14px;
    flex-shrink: 0;
  }
  .faq-bot-close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    opacity: .8;
    line-height: 1;
  }
  .faq-bot-body {
    padding: 8px;
    overflow-y: auto;
    flex: 1;
  }
  .faq-bot-hint {
    font-size: 12px;
    color: var(--ink-mute);
    padding: 8px 10px;
    background: var(--bg-warm);
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .faq-bot-cat, .faq-bot-q {
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px 14px;
    border: 1.5px solid var(--pink-200);
    border-radius: 8px;
    background: var(--card);
    font-size: 13px;
    cursor: pointer;
    margin-bottom: 6px;
    font-family: "Noto Sans JP", sans-serif;
    color: var(--ink);
    transition: background .1s;
  }
  .faq-bot-cat:hover, .faq-bot-q:hover { background: var(--pink-50); }
  .faq-bot-answer {
    background: var(--pink-50);
    border: 1.5px solid var(--pink-200);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 8px;
  }
  .faq-bot-answer .faq-q-text {
    font-weight: 700;
    font-size: 13px;
    margin-bottom: 8px;
    color: var(--pink-700, var(--pink-600));
  }
  .faq-bot-answer .faq-a-text {
    font-size: 13px;
    line-height: 1.7;
    color: var(--ink);
  }
  .faq-bot-back {
    background: none;
    border: none;
    font-size: 12px;
    color: var(--ink-mute);
    cursor: pointer;
    padding: 4px 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: "Noto Sans JP", sans-serif;
  }
  .faq-bot-footer {
    border-top: 1px solid var(--line-soft);
    padding: 10px 12px;
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }
  .faq-bot-footer a {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 9px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    font-family: "Zen Maru Gothic", sans-serif;
  }
  .faq-footer-tel {
    background: var(--pink-50);
    border: 1.5px solid var(--pink-300);
    color: var(--pink-600);
  }
  .faq-footer-cta {
    background: var(--pink-600);
    color: white;
  }
  ```

- [ ] **Step 2: `js/shared.js` にFAQ Bot初期化コードを追加**

  `js/shared.js` の末尾（`setupFloatingBar` や他の関数が呼ばれているブロックの後）に追加:

  ```js
  /* ===== FAQ Bot ===== */
  const FAQ_DATA_OYUMINO = [
    {
      cat: "💰 費用・料金について",
      items: [
        { q: "月額はいくらですか？", a: "Aタイプ（スタンダード）102,000円、Bタイプ（ゆったり）105,000円です。食費・管理費込みの金額です。入居一時金は50,000円（一回のみ）です。" },
        { q: "介護費用は別途かかりますか？", a: "はい。介護サービスは外部の介護事業者をご自由に選んでご利用いただけます。費用は介護度・ご利用頻度・自己負担割合によって異なります。料金ページのシミュレーターでおおよその目安をご確認いただけます。" },
        { q: "年金だけで支払えますか？", a: "月額10万円台で住居費・食費・管理費がすべて含まれています。年金の金額やご状況によって異なりますが、比較的ご利用いただきやすい価格帯です。詳しくはお気軽にご相談ください。" },
      ]
    },
    {
      cat: "🚨 緊急時・夜間の対応",
      items: [
        { q: "夜間スタッフは常駐していますか？", a: "はい。24時間スタッフが常駐しています。夜間も定期的に巡回し、緊急時はすぐに対応します。" },
        { q: "夜中に転んだらどうなりますか？", a: "全室に緊急呼出ボタンを設置しています。ボタンを押すと担当スタッフがすぐに駆けつけます。夜間も巡回していますので、気づいた場合は即対応します。" },
        { q: "救急車を呼ぶ判断は誰がしますか？", a: "スタッフが状況を確認し、必要と判断した場合はすぐに119番通報します。また、あらかじめご家族に緊急連絡先をご登録いただいており、重要な場面では速やかにご連絡します。" },
      ]
    },
    {
      cat: "👴 入居の条件・手続き",
      items: [
        { q: "入居条件を教えてください。", a: "おゆみ野は要介護1〜4の方を主な対象としています。認知症の方もご相談ください。まずはお電話かフォームでご相談いただき、見学・面談を経て入居審査を行います。" },
        { q: "見学は家族だけでもできますか？", a: "はい、ご家族だけでのご見学・ご相談も大歓迎です。ご本人のご都合に合わせて、後日ご一緒にお越しいただくことも可能です。" },
        { q: "入居までどのくらい時間がかかりますか？", a: "見学→面談→入居審査→契約→入居という流れで、通常2〜4週間程度です。お急ぎのご事情がある場合はご相談ください。" },
      ]
    },
    {
      cat: "🏥 介護が重くなったら",
      items: [
        { q: "要介護度が上がっても住み続けられますか？", a: "はい。自立〜要介護5まで対応しています。介護度が上がった場合も、外部の介護事業者と連携しながら同じ住まいで暮らし続けていただけます。" },
        { q: "認知症になったら退去しなければなりませんか？", a: "認知症の程度によってはご相談の上、対応可能です。まずはお気軽にご相談ください。" },
        { q: "医療処置が必要になったらどうなりますか？", a: "施設ではなく賃貸住宅のため、医療行為はスタッフが行うことはできません。ただし近隣医療機関（車で5〜8分圏内に3病院）との連携をサポートします。" },
      ]
    },
    {
      cat: "🍱 食事・生活について",
      items: [
        { q: "食事はどのようなものですか？", a: "栄養士監修の朝・昼・夕食を食堂でご提供しています（食事プランご利用の方）。体調に合わせた対応も可能です。食事プランは月+45,000円（1日3食）または+32,000円（昼・夕のみ）です。" },
        { q: "家族はいつでも面会できますか？", a: "はい。時間の制限はなく、自由にお越しいただけます。ご家族と一緒に食堂でお食事したり、お部屋でゆっくり過ごすこともできます。" },
        { q: "ペットは飼えますか？", a: "申し訳ありませんが、現在ペットの飼育はお断りしております。" },
      ]
    },
  ];

  function setupFaqBot(faqData, telHref, telLabel, ctaHref) {
    const btn = document.createElement("button");
    btn.className = "faq-bot-btn";
    btn.setAttribute("aria-label", "よくある質問を開く");
    btn.innerHTML = `<span>💬</span> よくある質問`;

    const panel = document.createElement("div");
    panel.className = "faq-bot-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "よくある質問");

    function renderCats() {
      panel.innerHTML = `
        <div class="faq-bot-head">
          <span>💬 よくある質問</span>
          <button class="faq-bot-close" aria-label="閉じる">✕</button>
        </div>
        <div class="faq-bot-body">
          <div class="faq-bot-hint">カテゴリを選んでください</div>
          ${faqData.map((c, i) => `<button class="faq-bot-cat" data-cat="${i}">${c.cat}</button>`).join('')}
        </div>
        <div class="faq-bot-footer">
          <a href="${telHref}" class="faq-footer-tel">📞 ${telLabel}</a>
          <a href="${ctaHref}" class="faq-footer-cta">📅 見学予約</a>
        </div>
      `;
      panel.querySelector(".faq-bot-close").addEventListener("click", closeBot);
      panel.querySelectorAll(".faq-bot-cat").forEach(b => {
        b.addEventListener("click", () => renderQuestions(Number(b.dataset.cat)));
      });
    }

    function renderQuestions(catIdx) {
      const cat = faqData[catIdx];
      panel.querySelector(".faq-bot-body").innerHTML = `
        <button class="faq-bot-back">← 戻る</button>
        <div class="faq-bot-hint">${cat.cat}</div>
        ${cat.items.map((item, i) => `<button class="faq-bot-q" data-cat="${catIdx}" data-q="${i}">${item.q}</button>`).join('')}
      `;
      panel.querySelector(".faq-bot-back").addEventListener("click", renderCats);
      panel.querySelectorAll(".faq-bot-q").forEach(b => {
        b.addEventListener("click", () => renderAnswer(Number(b.dataset.cat), Number(b.dataset.q)));
      });
    }

    function renderAnswer(catIdx, qIdx) {
      const item = faqData[catIdx].items[qIdx];
      panel.querySelector(".faq-bot-body").innerHTML = `
        <button class="faq-bot-back">← 戻る</button>
        <div class="faq-bot-answer">
          <div class="faq-q-text">Q. ${item.q}</div>
          <div class="faq-a-text">${item.a}</div>
        </div>
      `;
      panel.querySelector(".faq-bot-back").addEventListener("click", () => renderQuestions(catIdx));
    }

    function openBot() {
      renderCats();
      panel.classList.add("open");
      btn.style.display = "none";
    }
    function closeBot() {
      panel.classList.remove("open");
      btn.style.display = "";
    }

    btn.addEventListener("click", openBot);
    document.body.appendChild(btn);
    document.body.appendChild(panel);
  }

  // おゆみ野用で初期化
  setupFaqBot(FAQ_DATA_OYUMINO, "tel:0433107467", "電話する", "contact.html");
  ```

- [ ] **Step 3: `chiharadai/shared-ch.js` に同様のFAQ Botコードを追加**

  Step 2と同じ `FAQ_DATA` 定数をコピーし、以下の点を変更する:
  - 定数名: `FAQ_DATA_CHIHARADAI`
  - 入居条件のQ&Aでは「要介護1〜5、自立〜要介護5」という表現に変更（ちはら台の条件）
  - `setupFaqBot` 呼び出しの電話番号: `tel:0436633618`・ラベル: `"電話する"`

- [ ] **Step 4: ブラウザで動作確認**

  おゆみ野施設ページを開き、右下の「💬 よくある質問」ボタンをタップ → カテゴリ → 質問 → 回答 の動作を確認する。CTAバーと重ならないことも確認する。

- [ ] **Step 5: Commit**

  ```bash
  git add js/shared.js chiharadai/shared-ch.js css/styles.css
  git commit -m "feat: FAQ Botをサイト全体に追加（5カテゴリ・全ページ共通）"
  ```

---

## 最終確認・デプロイ

- [ ] **スマホ幅（390px）でトップ・おゆみ野・ちはら台の全ページを目視確認**
  - CTAバーが固定表示されているか
  - FAQ Botボタンがバーと重なっていないか
  - ご家族ハブセクションが正しく表示されるか
  - シミュレーターが動作するか

- [ ] **PC幅（1280px）でもレイアウト崩れがないか確認**

- [ ] **git push → GitHub Pages にデプロイ**

  ```bash
  git push
  ```

---

## 将来検討事項（このプランのスコープ外）

- 見学日時その場で仮予約（Googleカレンダー Appointment Scheduling 埋め込み）
- LINEで問い合わせ（LINE公式アカウント開設後）
- 空室リアルタイム表示（スプレッドシート連携）
- og:image を2施設並びの画像に変更（写真素材が揃い次第）
