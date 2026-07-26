/* スマイルームちはら台 - 共通ヘッダー/フッター + Tweaks */

(function () {
  const NAV = [
    { href: "index.html", label: "ちはら台ホーム" },
    { href: "facilities.html", label: "施設・設備" },
    { href: "pricing.html", label: "料金プラン" },
    { href: "lifestyle.html", label: "一日の暮らし" },
    { href: "access.html", label: "アクセス・周辺" },
    { href: "flow.html", label: "入居の流れ" },
    { href: "faq.html", label: "よくある質問" },
    { href: "news.html", label: "お知らせ" },
    { href: "contact.html", label: "お問い合わせ" },
  ];

  function currentPage() {
    const path = location.pathname.split("/").pop() || "index.html";
    return path;
  }

  function renderHeader() {
    const cur = currentPage();
    const navHtml = NAV.map(n =>
      `<a href="${n.href}" class="${n.href === cur ? 'active' : ''}">${n.label}</a>`
    ).join("");
    const headerEl = document.querySelector("[data-site-header]");
    if (!headerEl) return;
    headerEl.innerHTML = `
    <header class="site-header">
      <div class="container">
        <a href="index.html" class="brand" aria-label="スマイルームちはら台 トップへ">
          <img src="../images/logo-chiharadai.jpg" alt="スマイルームちはら台" class="brand-logo" style="height:64px;width:139px;display:block;object-fit:contain;flex-shrink:0;">
        </a>
        <nav class="site-nav" aria-label="メインナビゲーション">${navHtml}</nav>
        <div class="header-right">
          <a href="tel:0436633618" class="header-tel" aria-label="電話で問い合わせ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            0436-63-3618
          </a>
          <a href="contact.html" class="btn btn-primary header-reserve">見学予約</a>
          <button class="nav-toggle" aria-label="メニューを開く" onclick="document.body.classList.toggle('nav-open')">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;
  }

  function renderFooter() {
    const footerEl = document.querySelector("[data-site-footer]");
    if (!footerEl) return;
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="footer-brand">
                <a href="index.html" class="footer-logo-wrap" aria-label="スマイルームちはら台 トップへ">
                  <img src="../images/logo-chiharadai.jpg" alt="スマイルームちはら台" class="brand-logo" style="height:64px;width:139px;display:block;object-fit:contain;flex-shrink:0;">
                </a>
              </div>
              <p style="color:oklch(0.8 0.01 225);margin:6px 0;">自分らしく暮らせる、<br>あたらしい住まいのかたち。</p>
              <p style="font-size:12.5px;color:oklch(0.7 0.01 225);margin:0;">〒290-0141<br>千葉県市原市ちはら台東八丁目19番地7</p>
              <div class="footer-tel">0436-63-3618</div>
              <small style="color:oklch(0.7 0.01 225);">受付時間 9:00 - 18:00（年中無休）</small>
            </div>
            <div>
              <h4>施設について</h4>
              <ul>
                <li><a href="facilities.html">施設・設備</a></li>
                <li><a href="pricing.html">料金プラン</a></li>
                <li><a href="lifestyle.html">一日の暮らし</a></li>
                <li><a href="access.html">アクセス・周辺</a></li>
              </ul>
            </div>
            <div>
              <h4>はじめての方へ</h4>
              <ul>
                <li><a href="flow.html">入居までの流れ</a></li>
                <li><a href="faq.html">よくある質問</a></li>
                <li><a href="contact.html">見学のご予約</a></li>
                <li><a href="brochure.html">資料ダウンロード</a></li>
              </ul>
            </div>
            <div>
              <h4>運営会社</h4>
              <ul>
                <li>株式会社 カイゴマン</li>
                <li><a href="news.html">お知らせ・ブログ</a></li>
                <li><a href="../privacy.html">プライバシーポリシー</a></li>
              </ul>
              <div class="review-note" data-review-id="shared-ch-01"><span class="review-note-icon">⚠</span><p>運営会社「株式会社カイゴマン」の表記（空白の有無など正式表記）が登記上の正式名称と一致しているか念のため確認したい（Excel No.37）</p></div>
              <div class="review-note" data-review-id="shared-ch-02"><span class="review-note-icon">⚠</span><p>電話番号「0436-63-3618」・受付時間「9:00〜18:00・年中無休」が現在も正しい連絡先・受付時間か再確認したい（みんなの介護掲載の050番号とは別の直通番号）（Excel No.38）</p></div>
            </div>
            <div>
              <h4>2施設</h4>
              <ul>
                <li><a href="../">スマイルームトップ</a></li>
                <li><a href="../oyumino/">スマイルームおゆみ野</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 株式会社カイゴマン All Rights Reserved.</span>
            <span>スマイルームちはら台</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* ===== reveal on scroll ===== */
  function setupReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) * 120 : 0;
          setTimeout(() => e.target.classList.add("in"), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  /* ===== floating bar ===== */
  function setupFloatingBar() {
    const bar = document.createElement("div");
    bar.className = "floating-bar";
    bar.innerHTML = `
<a href="tel:0436633618" class="fb-tel" aria-label="電話で問い合わせ">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  電話する
</a>
<a href="contact.html" class="fb-cta" aria-label="見学を予約する">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  見学予約（無料）
</a>
`;
    document.body.appendChild(bar);
  }

  /* ===== breadcrumb ===== */
  function setupBreadcrumb() {
    const raw = document.body.dataset.breadcrumb;
    if (!raw) return;
    let items;
    try { items = JSON.parse(raw); } catch (e) { return; }
    const crumbs = [{ label: "ホーム", href: "index.html" }];
    items.forEach(item => { crumbs.push({ label: item, href: null }); });
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "パンくずリスト");
    nav.className = "breadcrumb container";
    nav.innerHTML = crumbs.map((c, i) => {
      const isLast = i === crumbs.length - 1;
      const sep = i > 0 ? `<span class="sep" aria-hidden="true">›</span>` : "";
      const label = isLast
        ? `<span aria-current="page">${c.label}</span>`
        : `<a href="${c.href}">${c.label}</a>`;
      return sep + label;
    }).join("");
    const header = document.querySelector(".site-header");
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    }

    const ldItems = crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.label,
      ...(c.href ? { "item": new URL(c.href, location.href).href } : {})
    }));
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ldItems
    });
    document.head.appendChild(ld);
  }

  /* ===== anchor menu ===== */
  function setupAnchorMenu() {
    const anchors = document.querySelectorAll(".anchor-menu a");
    if (!anchors.length) return;
    const sections = Array.from(anchors)
      .map(a => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anchors.forEach(a => a.classList.remove("active"));
          const active = document.querySelector(`.anchor-menu a[href="#${e.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => io.observe(s));
  }

  /* ===== init ===== */
  function init() {
    renderHeader();
    renderFooter();
    setupReveal();
    setupFloatingBar();
    setupBreadcrumb();
    setupAnchorMenu();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ===== FAQ Bot ===== */
const FAQ_DATA_CHIHARADAI = [
  {
    cat: "費用・料金について",
    items: [
      { q: "月額はいくらですか？", a: "月額103,300円（食費・管理費・共益費・ごみ処分料込み）です。入居一時金は50,000円（一回のみ）です。" },
      { q: "介護費用は別途かかりますか？", a: "はい。介護サービスは外部の介護事業者をご自由に選んでご利用いただけます。費用は介護度・ご利用頻度・自己負担割合によって異なります。料金ページのシミュレーターでおおよその目安をご確認いただけます。" },
      { q: "年金だけで支払えますか？", a: "月額10万円台で住居費・食費・管理費・共益費がすべて含まれています。年金の金額やご状況によって異なりますが、比較的ご利用いただきやすい価格帯です。詳しくはお気軽にご相談ください。" },
    ]
  },
  {
    cat: "緊急時・夜間の対応",
    items: [
      { q: "夜間スタッフは常駐していますか？", a: "はい。24時間スタッフが常駐しています。夜間も定期的に巡回し、緊急時はすぐに対応します。" },
      { q: "夜中に転んだらどうなりますか？", a: "全室に緊急呼出ボタンを設置しています。ボタンを押すと担当スタッフがすぐに駆けつけます。夜間も巡回していますので、気づいた場合は即対応します。" },
      { q: "救急車を呼ぶ判断は誰がしますか？", a: "スタッフが状況を確認し、必要と判断した場合はすぐに119番通報します。また、あらかじめご家族に緊急連絡先をご登録いただいており、重要な場面では速やかにご連絡します。" },
    ]
  },
  {
    cat: "👴 入居の条件・手続き",
    items: [
      { q: "入居条件を教えてください。", a: "ちはら台は自立〜要介護5の幅広い方を対象としています。認知症の方もご相談ください。まずはお電話かフォームでご相談いただき、見学・面談を経て入居審査を行います。" },
      { q: "見学は家族だけでもできますか？", a: "はい、ご家族だけでのご見学・ご相談も大歓迎です。ご本人のご都合に合わせて、後日ご一緒にお越しいただくことも可能です。" },
      // review-note: 入居までの所要期間が「見学から最短2週間程度」（flow.html）と「通常2〜4週間程度」（本FAQボット）で不一致。正しい目安期間に統一する必要あり（Excel No.11）
      { q: "入居までどのくらい時間がかかりますか？", a: "見学→面談→入居審査→契約→入居という流れで、通常2〜4週間程度です。お急ぎのご事情がある場合はご相談ください。" },
    ]
  },
  {
    cat: "🏥 介護が重くなったら",
    items: [
      { q: "要介護度が上がっても住み続けられますか？", a: "はい。自立〜要介護5まで対応しています。介護度が上がった場合も、外部の介護事業者と連携しながら同じ住まいで暮らし続けていただけます。" },
      { q: "認知症になったら退去しなければなりませんか？", a: "認知症の程度によってはご相談の上、対応可能です。まずはお気軽にご相談ください。" },
      { q: "医療処置が必要になったらどうなりますか？", a: "施設ではなく賃貸住宅のため、医療行為はスタッフが行うことはできません。ただし近隣医療機関との連携をサポートします。" },
    ]
  },
  {
    cat: "🍱 食事・生活について",
    items: [
      { q: "食事はどのようなものですか？", a: "栄養士監修の3食を食堂でご提供しています。食費は月額に含まれており、別途追加料金はかかりません。体調に合わせた対応も可能です。" },
      { q: "家族はいつでも面会できますか？", a: "はい。時間の制限はなく、自由にお越しいただけます。ご家族と一緒に食堂でお食事したり、お部屋でゆっくり過ごすこともできます。" },
      { q: "ペットは飼えますか？", a: "申し訳ありませんが、現在ペットの飼育はお断りしております。" },
    ]
  },
];

function setupFaqBotCh(faqData, telHref, telLabel, ctaHref) {
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

// ちはら台用で初期化
setupFaqBotCh(FAQ_DATA_CHIHARADAI, "tel:0436633618", "電話する", "contact.html");
