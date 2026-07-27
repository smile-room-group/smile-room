/* サイト確認用コメント入力機能（一時的機能・撤去予定）
   設計書: docs/superpowers/specs/2026-07-27-review-comment-input-design.md */
(function () {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbyypmodCQiZm-Xo4wnP4YsWQ-ksNPamETWT6_KRTPaV5mQJSM5ZMnuUA8HKyt-K4F2M/exec';

  function currentPage() {
    return location.pathname;
  }

  function qsAll(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function formatTimestamp(value) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return escapeHtml(value);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function renderList(listEl, comments) {
    if (!comments.length) {
      listEl.innerHTML = '<p class="review-comment-empty">まだコメントはありません。</p>';
      return;
    }
    listEl.innerHTML = comments.map(c => `
      <div class="review-comment-item">
        <div class="review-comment-meta">
          <span class="review-comment-author">${escapeHtml(c.author)}</span>
          <span class="review-comment-time">${formatTimestamp(c.timestamp)}</span>
        </div>
        <p class="review-comment-body">${escapeHtml(c.comment)}</p>
      </div>
    `).join('');
  }

  function buildBlock(noteEl) {
    const wrap = document.createElement('div');
    wrap.className = 'review-comments';
    wrap.innerHTML = `
      <div class="review-comment-list" data-role="list"><p class="review-comment-loading">読み込み中...</p></div>
      <form class="review-comment-form" data-role="form">
        <input type="text" class="review-comment-input-author" data-role="author" placeholder="お名前" required>

        <textarea class="review-comment-textarea" data-role="comment" placeholder="コメントを入力してください" required></textarea>
        <button type="submit" class="review-comment-submit">送信</button>
        <p class="review-comment-error" data-role="error" hidden></p>
      </form>
    `;
    noteEl.insertAdjacentElement('afterend', wrap);
    return wrap;
  }

  function setError(block, message) {
    const errorEl = block.querySelector('[data-role="error"]');
    errorEl.hidden = !message;
    errorEl.textContent = message || '';
  }

  async function fetchAllComments() {
    const res = await fetch(GAS_URL, { method: 'GET' });
    if (!res.ok) throw new Error('network');
    return res.json();
  }

  function groupByReviewId(all) {
    const map = {};
    all.forEach(row => {
      const id = row.reviewId;
      if (!map[id]) map[id] = [];
      map[id].push(row);
    });
    return map;
  }

  async function refreshBlock(block, reviewId) {
    const listEl = block.querySelector('[data-role="list"]');
    try {
      const all = await fetchAllComments();
      renderList(listEl, groupByReviewId(all)[reviewId] || []);
    } catch (err) {
      listEl.innerHTML = '<p class="review-comment-error-inline">読み込みに失敗しました</p>';
    }
  }

  function bindForm(block, reviewId, excerpt, onSubmitted) {
    const form = block.querySelector('[data-role="form"]');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const authorEl = form.querySelector('[data-role="author"]');
      const commentEl = form.querySelector('[data-role="comment"]');
      const author = authorEl.value;
      const comment = commentEl.value.trim();
      if (!author || !comment) {
        setError(block, '入力者名とコメントの入力は必須です。');
        return;
      }
      setError(block, '');
      const submitBtn = form.querySelector('.review-comment-submit');
      submitBtn.disabled = true;
      try {
        // Content-Type: text/plain にすることでGAS WebアプリへのCORSプリフライトを回避する
        const res = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ reviewId, page: currentPage(), excerpt, author, comment }),
        });
        if (!res.ok) throw new Error('network');
        const json = await res.json();
        if (!json.ok) throw new Error('server');
        commentEl.value = '';
        authorEl.value = '';
        await refreshBlock(block, reviewId);
        if (onSubmitted) onSubmitted();
      } catch (err) {
        setError(block, '送信に失敗しました。もう一度お試しください。');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  function createProgressBadge() {
    const badge = document.createElement('div');
    badge.className = 'review-progress-badge';
    document.body.appendChild(badge);
    return badge;
  }

  function updateProgressBadge(badge, total, answered) {
    badge.textContent = `確認事項 ${answered} / ${total} 件 回答済み`;
  }

  async function init() {
    // 「その他、気づいたことがあれば」の自由記述欄は件数カウントの対象外とする
    const noteEls = qsAll('.review-note[data-review-id]:not(.review-note-freeform)');
    if (!noteEls.length) return;

    const badge = createProgressBadge();
    const answeredIds = new Set();
    const refreshBadge = () => updateProgressBadge(badge, noteEls.length, answeredIds.size);

    try {
      const all = await fetchAllComments();
      const grouped = groupByReviewId(all);
      noteEls.forEach(noteEl => {
        const reviewId = noteEl.dataset.reviewId;
        if (grouped[reviewId] && grouped[reviewId].length) {
          noteEl.classList.add('is-answered');
          answeredIds.add(reviewId);
        }
      });
    } catch (err) {
      // 集計に失敗しても各ボックス個別の読み込みは継続する
    }
    refreshBadge();

    qsAll('.review-note[data-review-id]').forEach(noteEl => {
      const reviewId = noteEl.dataset.reviewId;
      const pEl = noteEl.querySelector('p');
      const isFreeform = noteEl.classList.contains('review-note-freeform');
      const excerpt = isFreeform ? '' : (pEl ? pEl.textContent.trim() : '');
      const block = buildBlock(noteEl);
      bindForm(block, reviewId, excerpt, function () {
        if (!isFreeform && !answeredIds.has(reviewId)) {
          noteEl.classList.add('is-answered');
          answeredIds.add(reviewId);
          refreshBadge();
        }
      });
      refreshBlock(block, reviewId);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
