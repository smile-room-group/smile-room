# スマイルームウェブサイト — Claude Code ガイド

## 概要

このフォルダは3案件を兼ねる：統合トップ（`index.html`）、スマイルームおゆみ野（`oyumino/`）、スマイルームちはら台（`chiharadai/`）。加えて新聞折込チラシ（`flyer.html`）も同居。静的HTML/CSS/JS、GitHub Pages にデプロイ。

## ディレクトリ構成

```
smile-room-website/
├── index.html          # 統合トップ（2施設案内）
├── flyer.html          # 折込チラシ（B4縦・印刷用）
├── privacy.html        # プライバシーポリシー
├── sitemap.xml
├── oyumino/             # おゆみ野特化ページ（index/facilities/pricing/lifestyle/access/flow/faq/news/contact/brochure/lp-chiba-senior）
├── chiharadai/          # ちはら台（おゆみ野と同構成、地域・料金が異なる）
│   └── shared-ch.js     # ちはら台専用の共通ナビ・フッター挿入JS
├── css/styles.css       # 全ページ共通スタイル（OKLch色空間）
├── js/shared.js         # おゆみ野・トップ用の共通ナビ・フッター動的挿入 + FAQ Bot
├── images/
└── .claude/launch.json  # 開発サーバー設定（python -m http.server 8000）
```

## デプロイ

- GitHub: `smile-room-group/smile-room`（Organization、旧`takaya5233/smile-room`から移管済み）
- 公開: GitHub Pages（`main` ブランチ push で自動反映）
- ビルド不要（静的ファイル直接配信）
- ブランチ `feature/website-brushup` が残存中。作業前に `git branch -a` で今どのブランチか確認すること

## デザインテーマ

- **カラー**: OKLch色空間で `css/styles.css` の `:root` に定義（`--pink-50〜600` 等のダスティローズ系、`--bg`/`--bg-warm`/`--ink`系）。テーマ切替は `data-theme="cream"` / `"sakura-leaf"` 属性
- **フォント**: Noto Sans JP（本文）+ Zen Maru Gothic（見出し）、Google Fonts、`font-feature-settings: "palt"` で和文詰め最適化
- 色・余白を変えるときは必ず `css/styles.css` の CSS変数を編集する（ページ内の直書きスタイルを増やさない）

## 共通ナビ・フッター

- `[data-site-header]` / `[data-site-footer]` のプレースホルダに、`js/shared.js`（おゆみ野・トップ）または `chiharadai/shared-ch.js`（ちはら台）が動的挿入する
- 現在ページは NAV 配列との照合で `.active` クラスが自動付与される
- ナビ項目を増減する場合は該当JSファイルのNAV配列を編集する（HTML側は直接いじらない）

## flyer.html（チラシ）印刷仕様

- `@page { size: 257mm 364mm; margin: 0; }` — **必ずmm指定**。`size: B4` はISO B4（250×353mm）になり寸法がズレるため使用禁止
- ブラウザ印刷時は「余白なし」「スケール100%」を必ず指定する

## ローカルプレビュー

- `.claude/launch.json` に `python -m http.server 8000` の設定あり（`preview_start` で起動可能）
- 手動なら `python -m http.server 8000` → `http://localhost:8000`

## 関連

- Obsidianノート: `Vault/Projects/smile-room-website.md` / `smile-room-oyumino.md` / `smile-room-chiharadai.md`
