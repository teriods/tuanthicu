/* Giao diện ứng dụng: trang chủ, danh sách đề, làm bài (lưu tạm), kết quả & nhận xét, lịch sử. */
(function () {
  'use strict';
  const LT = window.LT, U = LT.U, Store = LT.Store;
  const app = document.getElementById('app');
  const L = 'ABCD';
  const TAB = Math.random().toString(36).slice(2);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (x) => U.num(x, 2);
  const pad = (n) => String(n).padStart(2, '0');
  const clock = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return pad(Math.floor(s / 60)) + ':' + pad(s % 60); };
  const timeStr = (t) => { const d = new Date(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); };
  const dateStr = (t) => { const d = new Date(t); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); };
  const scoreCls = (s) => (s >= 8 ? '' : s >= 5 ? 'mid' : 'lo');
  let cleanup = null;

  /* ---------------- Toast & Modal ---------------- */
  function toast(msg, kind, ms) {
    const el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.innerHTML = msg;
    const box = document.getElementById('toasts');
    box.appendChild(el);
    while (box.children.length > 2) box.firstChild.remove();
    setTimeout(() => el.remove(), ms || 4000);
  }
  function modal(o) {
    const root = document.getElementById('modal-root');
    const back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><h3>${o.title}</h3><div class="mb">${o.body || ''}</div><div class="actions"></div></div>`;
    const close = () => { back.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape' && o.dismiss !== false) close(); };
    (o.actions || [{ label: 'Đóng' }]).forEach((a) => {
      const b = document.createElement('button');
      b.className = 'btn ' + (a.kind || '');
      b.textContent = a.label;
      b.onclick = () => { if (a.keep !== true) close(); a.onClick && a.onClick(back); };
      back.querySelector('.actions').appendChild(b);
    });
    if (o.dismiss !== false) back.addEventListener('click', (e) => { if (e.target === back) close(); });
    document.addEventListener('keydown', onKey);
    root.appendChild(back);
    const first = back.querySelector('.actions .primary') || back.querySelector('.actions button');
    first && first.focus();
    return { el: back, close };
  }

  /* ---------------- Mạng ---------------- */
  function netBadge() {
    const el = document.getElementById('net');
    const on = navigator.onLine;
    el.className = 'net ' + (on ? 'on' : 'off');
    el.textContent = on ? 'Trực tuyến' : '⚠ Ngoại tuyến';
  }
  window.addEventListener('online', () => { netBadge(); toast('Đã có kết nối mạng trở lại.'); });
  window.addEventListener('offline', () => { netBadge(); toast('Mất kết nối mạng. Không sao cả – bài làm được lưu ngay trên máy, bạn cứ tiếp tục làm bài.', 'warn', 6000); });

  /* ---------------- Dữ liệu tổng hợp ---------------- */
  function bestByExam(subj) {
    const m = {};
    Store.attempts().forEach((a) => {
      if (a.subj !== subj) return;
      const x = (m[a.no] = m[a.no] || { best: -1, n: 0, last: null });
      x.n++; x.best = Math.max(x.best, a.score); x.last = a;
    });
    return m;
  }
  function subjStats(subj) {
    const m = bestByExam(subj);
    const done = Object.keys(m).length;
    const atts = Store.attempts().filter((a) => a.subj === subj);
    const avg = atts.length ? atts.reduce((s, a) => s + a.score, 0) / atts.length : null;
    const recent = atts.slice(-5);
    const ravg = recent.length ? recent.reduce((s, a) => s + a.score, 0) / recent.length : null;
    return { done, avg, ravg, n: atts.length, map: m };
  }

  /* ---------------- Router ---------------- */
  function route() {
    if (cleanup) { try { cleanup(); } catch (e) { /* */ } cleanup = null; }
    document.body.classList.remove('in-exam');
    const h = location.hash.replace(/^#\/?/, '').split('/');
    document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === (h[0] || 'home')));
    window.scrollTo(0, 0);
    if (h[0] === 's' && LT.SUBJECTS[h[1]]) return viewSubject(h[1]);
    if (h[0] === 'exam' && LT.SUBJECTS[h[1]]) return viewExam(h[1], clampNo(h[2]));
    if (h[0] === 'result') return viewResult(h[1]);
    if (h[0] === 'history') return viewHistory();
    if (h[0] === 'hoc' && LT.SUBJECTS[h[1]]) return viewHandbook(h[1], h[2] ? decodeURIComponent(h[2]) : null);
    return viewHome();
  }
  const clampNo = (n) => Math.min(LT.EXAMS_PER_SUBJECT, Math.max(1, parseInt(n, 10) || 1));
  const go = (h) => { if (location.hash === h) route(); else location.hash = h; };

  /* ---------------- Trang chủ ---------------- */
  function resumeCard() {
    const list = Store.listActive().filter((a) => LT.SUBJECTS[a.subj]);
    if (!list.length) return '';
    return list.map((a) => {
      const S = LT.SUBJECTS[a.subj];
      const ex = LT.getExam(a.subj, a.no);
      const n = countAnswered(ex, a.answers);
      return `<div class="card resume" style="margin-top:12px">
        <h3>⏸ ${S.name} – Đề số ${a.no} đang làm dở</h3>
        <p class="small" style="margin:4px 0 10px">Đã làm ${n}/${ex.questions.length} câu · ${a.mode === 'strict' ? 'thi thật' : 'còn ' + clock(a.remainingMs)} · lưu lúc ${timeStr(a.updatedAt).slice(0, 5)}</p>
        <div class="row"><a class="btn primary" href="#/exam/${a.subj}/${a.no}">Làm tiếp</a><button class="btn ghost danger" data-discard="${a.subj}">Bỏ bài này</button></div>
      </div>`;
    }).join('');
  }
  function bindDiscard() {
    app.querySelectorAll('[data-discard]').forEach((b) => (b.onclick = () => confirmDiscard(b.dataset.discard, () => route())));
  }
  function learnStreak() {
    const days = new Set(Store.attempts().map((a) => new Date(a.date).toDateString()));
    let n = 0; const d = new Date();
    if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
    while (days.has(d.toDateString())) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function viewHome() {
    const atts = Store.attempts();
    const cards = Object.values(LT.SUBJECTS).map((S) => {
      const st = subjStats(S.key);
      const act = Store.getActive(S.key);
      const rec = LT.recommend(S.key, atts);
      const p = (st.done / LT.EXAMS_PER_SUBJECT) * 100;
      return `<div class="card subject ${S.color}">
        <div class="row"><span class="ic">${S.icon}</span><div><h3 style="margin:0">${S.name}</h3><span class="muted small">${S.minutes} phút · đã làm ${st.done}/${LT.EXAMS_PER_SUBJECT} đề${st.ravg == null ? '' : ' · TB gần đây <b>' + fmt(st.ravg) + '</b>'}</span></div></div>
        <div class="bar"><i style="width:${p}%"></i></div>
        <button class="btn primary big" data-go="${S.key}">${act ? `▶ Làm tiếp Đề ${act.no}` : `▶ Vào thi ngay · Đề ${rec.no}`}</button>
        <span class="small muted">${act ? 'Bài làm dở được giữ nguyên.' : '🎯 ' + rec.why}</span>
        <div class="row small"><a href="#/s/${S.key}">Chọn đề khác</a><span class="muted">·</span><a href="#/hoc/${S.key}">Sổ tay kiến thức</a></div>
      </div>`;
    }).join('');
    const set = Store.settings();
    const streak = learnStreak();
    const cheer = LT.pickCheer(LT.CHEER.daily, Math.floor(Date.now() / 86400000));
    app.innerHTML = `
      <section class="hero">
        <h1>Luyện đề thi tốt nghiệp THPT 2027 – Khối A</h1>
        <p class="cheer">💬 ${cheer}</p>
        ${streak ? `<p class="small" style="margin-top:6px">🔥 Bạn đã luyện <b>${streak} ngày liên tiếp</b>. Đừng để chuỗi bị đứt nhé!</p>` : ''}
      </section>
      ${resumeCard()}
      <h2>Chọn môn và vào thi</h2>
      <div class="grid c3">${cards}</div>
      <div class="card small" style="margin-top:16px">
        <label class="switch"><input type="checkbox" id="opt-instant" ${set.instant ? 'checked' : ''}><span>Hiện đáp án và lời giải ngay sau mỗi câu</span></label>
        <label class="switch"><input type="checkbox" id="opt-strict" ${set.strict ? 'checked' : ''}><span>Tính giờ như thi thật (không dừng đồng hồ khi rời trang)</span></label>
      </div>
      <details class="card small" style="margin-top:16px"><summary>Định hướng đề thi 2027 (cập nhật theo đề chính thức 2025–2026)</summary>
        <ul class="notes" style="margin-top:8px">
          <li>Đề 2026 giữ nguyên cấu trúc, định dạng năm 2025; đến nay Bộ GD&ĐT chưa công bố thay đổi cho kì thi 2027. Bám sát Chương trình GDPT 2018.</li>
          <li><b>Toán:</b> trọng tâm lớp 12, có thống kê, xác suất, cấp số… của lớp 10–11. Xác suất – tổ hợp, hình không gian, thể tích tròn xoay và bài toán tối ưu là nhóm câu phân loại.</li>
          <li><b>Vật lí:</b> tập trung kiến thức lớp 12 (vật lí nhiệt, khí lí tưởng, từ trường, vật lí hạt nhân).</li>
          <li><b>Hoá học:</b> trải rộng lớp 10–12, nhiều câu gắn thực tiễn và thí nghiệm.</li>
          <li>Tỉ lệ mức độ định hướng: khoảng 40% nhận biết – 30% thông hiểu – 30% vận dụng.</li>
        </ul>
      </details>
      <details class="card small" style="margin-top:16px"><summary>Cấu trúc đề & cách tính điểm</summary>
        <table class="tbl" style="display:table;width:100%;margin-top:10px">
          <tr><th></th><th>Toán (90 phút)</th><th>Vật lí / Hoá học (50 phút)</th></tr>
          <tr><th>Phần I – nhiều lựa chọn</th><td>12 câu × 0,25 đ</td><td>18 câu × 0,25 đ</td></tr>
          <tr><th>Phần II – đúng/sai</th><td colspan="2">4 câu, mỗi câu 4 ý: đúng 1 ý 0,1 đ · 2 ý 0,25 đ · 3 ý 0,5 đ · 4 ý 1 đ</td></tr>
          <tr><th>Phần III – trả lời ngắn</th><td>6 câu × 0,5 đ</td><td>6 câu × 0,25 đ</td></tr>
        </table>
        <p class="muted">Mỗi môn ${LT.EXAMS_PER_SUBJECT} đề bám sát các dạng bài trong đề thi 2020–2026 (Chương trình GDPT 2018). Bài làm tự lưu trên máy, mất mạng hay có cuộc gọi vẫn không mất bài.</p>
      </details>
      <footer class="foot">Dữ liệu học tập chỉ lưu trên thiết bị của bạn. Có thể sao lưu ở mục <a href="#/history">Lịch sử</a>.</footer>`;
    bindDiscard();
    app.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => quickStart(b.dataset.go)));
    const saveOpt = () => { Store.saveSettings(Object.assign(Store.settings(), { instant: document.getElementById('opt-instant').checked, strict: document.getElementById('opt-strict').checked })); toast('Đã lưu cài đặt – áp dụng cho bài thi mới.'); };
    document.getElementById('opt-instant').onchange = saveOpt;
    document.getElementById('opt-strict').onchange = saveOpt;
  }
  function confirmDiscard(subj, after) {
    modal({
      title: 'Bỏ bài đang làm?', body: '<p>Bài làm dở sẽ bị xoá và không được chấm điểm.</p>',
      actions: [{ label: 'Không' }, { label: 'Bỏ bài', kind: 'danger', onClick: () => { Store.clearActive(subj); after && after(); } }],
    });
  }

  /* ---------------- Danh sách đề ---------------- */
  function viewSubject(subj) {
    const S = LT.SUBJECTS[subj];
    const st = subjStats(subj);
    const active = Store.getActive(subj);
    const rec = LT.recommend(subj, Store.attempts());
    let filter = sessionStorage.getItem('lt-filter-' + subj) || 'all';
    const draw = () => {
      const tiles = [];
      for (let no = 1; no <= LT.EXAMS_PER_SUBJECT; no++) {
        const lv = LT.level(no), m = st.map[no];
        const doing = active && active.no === no;
        if (filter === 'todo' && m) continue;
        if (filter === 'done' && !m) continue;
        if (/^l\d$/.test(filter) && 'l' + lv.k !== filter) continue;
        tiles.push(`<button class="exam-tile ${m ? 'done' : ''} ${doing ? 'doing' : ''}" data-no="${no}">
          <span class="n">Đề số ${no}${no === rec.no && !m ? ' <span title="Đề gợi ý">🎯</span>' : ''}</span><span class="tag l${lv.k}">${lv.name}</span>
          <span class="sc">${doing ? '⏸ Đang làm dở' : m ? `Cao nhất <span class="score-chip ${scoreCls(m.best)}">${fmt(m.best)}</span> · ${m.n} lần` : 'Chưa làm'}</span>
        </button>`);
      }
      app.querySelector('.exam-grid').innerHTML = tiles.join('') || '<div class="empty">Không có đề nào.</div>';
      app.querySelectorAll('.pill-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.f === filter));
    };
    // chủ đề yếu tích luỹ
    const agg = {};
    Store.attempts().filter((a) => a.subj === subj && a.topics).forEach((a) => {
      Object.entries(a.topics).forEach(([t, v]) => { const x = (agg[t] = agg[t] || { got: 0, max: 0 }); x.got += v[0]; x.max += v[1]; });
    });
    const weak = Object.entries(agg).filter(([, v]) => v.max > 0).map(([t, v]) => ({ t, p: v.got / v.max })).sort((a, b) => a.p - b.p).slice(0, 3);
    app.innerHTML = `
      <p class="small"><a href="#/">← Trang chủ</a></p>
      <h1>${S.icon} ${S.name} – ${LT.EXAMS_PER_SUBJECT} đề luyện tập</h1>
      <div class="stats" style="margin-bottom:8px"><span>Thời gian <b>${S.minutes} phút</b></span><span>${S.parts.mc} câu nhiều lựa chọn · ${S.parts.tf} câu đúng/sai · ${S.parts.sa} câu trả lời ngắn</span></div>
      <div class="stats"><span>Đã làm <b>${st.done}</b>/${LT.EXAMS_PER_SUBJECT} đề</span><span>Số lượt <b>${st.n}</b></span><span>Điểm TB <b>${st.avg == null ? '–' : fmt(st.avg)}</b></span></div>
      <div class="card rec" style="margin-top:12px"><div class="row"><div style="flex:1;min-width:200px"><b>🎯 Đề gợi ý cho bạn: Đề số ${rec.no}</b> <span class="tag l${rec.level}">${rec.levelName}</span><br><span class="small muted">${rec.why}</span></div><button class="btn primary" data-rec="${rec.no}">${active ? 'Làm tiếp Đề ' + active.no : 'Vào thi'}</button></div></div>
      <p class="small"><a href="#/hoc/${subj}">📚 Sổ tay kiến thức ${S.name}</a></p>
      ${weak.length ? `<div class="card small" style="margin-top:12px">📌 Chủ đề cần ôn thêm (tích luỹ qua các lần làm): ${weak.map((w) => `<b>${esc(w.t)}</b> (${Math.round(w.p * 100)}%)`).join(' · ')}</div>` : ''}
      <div class="pill-tabs">
        <button data-f="all">Tất cả</button><button data-f="todo">Chưa làm</button><button data-f="done">Đã làm</button>
        <button data-f="l1">Cơ bản (1–40)</button><button data-f="l2">Trung bình (41–80)</button><button data-f="l3">Vận dụng (81–120)</button>
      </div>
      <div class="exam-grid"></div>`;
    app.querySelector('[data-rec]').onclick = () => quickStart(subj);
    app.querySelector('.pill-tabs').onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      filter = b.dataset.f; sessionStorage.setItem('lt-filter-' + subj, filter); draw();
    };
    app.querySelector('.exam-grid').onclick = (e) => {
      const b = e.target.closest('[data-no]'); if (!b) return;
      requestStart(subj, +b.dataset.no);
    };
    draw();
  }

  /* ---------------- Bắt đầu bài thi (không hỏi gì thêm) ---------------- */
  function quickStart(subj) {
    const a = Store.getActive(subj);
    if (a) return go(`#/exam/${subj}/${a.no}`);
    startNow(subj, LT.recommend(subj, Store.attempts()).no);
  }
  function requestStart(subj, no) {
    const a = Store.getActive(subj);
    if (a && a.no === no) return go(`#/exam/${subj}/${no}`);
    if (a) {
      return modal({
        title: `Đề số ${a.no} đang làm dở`,
        body: `<p>Bạn muốn làm tiếp Đề ${a.no} hay bỏ bài đó để làm Đề ${no}?</p>`,
        actions: [
          { label: `Bỏ, làm Đề ${no}`, onClick: () => { Store.clearActive(subj); startNow(subj, no); } },
          { label: `Làm tiếp Đề ${a.no}`, kind: 'primary', onClick: () => go(`#/exam/${subj}/${a.no}`) },
        ],
      });
    }
    startNow(subj, no);
  }
  function startNow(subj, no) {
    const S = LT.SUBJECTS[subj];
    const set = Store.settings();
    const mode = set.strict ? 'strict' : set.instant ? 'learn' : 'practice';
    const now = Date.now(), total = S.minutes * 60000;
    Store.setActive({ id: 's' + now.toString(36), subj, no, version: LT.getExam(subj, no).version, mode, totalMs: total, remainingMs: total, deadline: now + total, startedAt: now, updatedAt: now, answers: [], flags: [], checked: [], warned: [], fresh: true, away: { n: 0, ms: 0 }, tab: TAB });
    go(`#/exam/${subj}/${no}`);
  }

  function countAnswered(ex, answers) {
    return ex.questions.reduce((n, q, i) => n + (isAnswered(q, (answers || [])[i]) ? 1 : 0), 0);
  }
  function isAnswered(q, a) {
    if (q.part === 'mc') return a != null && a !== '';
    if (q.part === 'tf') return Array.isArray(a) && a.some((x) => x != null);
    return a != null && String(a).trim() !== '';
  }

  /* ---------------- Hiển thị một câu hỏi ---------------- */
  /* review: xem lại sau khi nộp. learn: chế độ chấm ngay – {checked} cho câu trả lời ngắn. */
  function renderQ(q, i, ans, review, flagged, res, learn) {
    const num = `<span class="q-num">Câu ${i + 1}.</span>`;
    let body = '';
    let verdict = '';
    let full = !!review; // đã lộ đáp án toàn câu
    if (!res && learn) res = gradeOne(q, ans);
    if (q.part === 'mc') {
      const rv = review || (learn && ans != null);
      full = rv;
      const short = q.opts.every((o) => o.replace(/<[^>]+>/g, '').length < 38);
      body = `<div class="opts ${short ? 'short' : ''}">` + q.opts.map((o, j) => {
        let cls = '';
        if (rv) { if (j === q.ans) cls = 'right'; else if (ans === j) cls = 'wrong'; }
        else if (ans === j) cls = 'sel';
        return `<button class="opt ${cls}" data-q="${i}" data-o="${j}" ${rv ? 'disabled' : ''}><span class="L">${L[j]}</span><span>${o}</span></button>`;
      }).join('') + '</div>';
      if (rv) verdict = ans == null ? 'blank' : ans === q.ans ? 'ok' : 'no';
    } else if (q.part === 'tf') {
      const arr = Array.isArray(ans) ? ans : [];
      if (learn && arr.length === 4 && arr.every((x) => x != null)) full = true;
      body = q.items.map((it, j) => {
        const rv = review || (learn && arr[j] != null);
        const b = (val, label) => {
          let cls = '';
          if (rv) { if (it.v === val) cls = 'right'; else if (arr[j] === val) cls = 'wrong'; }
          else if (arr[j] === val) cls = 'sel';
          return `<button class="${cls}" data-q="${i}" data-t="${j}" data-v="${val ? 1 : 0}" ${rv ? 'disabled' : ''} aria-pressed="${arr[j] === val}">${label}</button>`;
        };
        const mark = rv ? (arr[j] == null ? ' <span class="verdict blank">bỏ trống</span>' : arr[j] === it.v ? ' <span class="verdict ok">✓ đúng</span>' : ' <span class="verdict no">✗ sai</span>') : '';
        return `<div class="tf-row"><div class="s"><b>${'abcd'[j]})</b>${it.s}${mark}${rv ? `<div class="tf-sol">→ Mệnh đề ${it.v ? '<b>Đúng</b>' : '<b>Sai</b>'}. ${it.sol || ''}</div>` : ''}</div><div class="tf-btns">${b(true, 'Đúng')}${b(false, 'Sai')}</div></div>`;
      }).join('');
      if (full) { const c = res && res.detail ? res.detail.filter(Boolean).length : 0; verdict = !arr.some((x) => x != null) ? 'blank' : c === 4 ? 'ok' : c === 0 ? 'no' : 'part'; }
    } else {
      const v = ans == null ? '' : String(ans);
      const rv = review || (learn && learn.checked);
      full = rv;
      if (rv) {
        body = `<div class="sa-input"><span>Bạn trả lời: <b>${v ? esc(v) : '<i class="muted">bỏ trống</i>'}</b></span><span>Đáp án: <b style="color:var(--ok)">${U.numF(q.ans, q.dp)}</b></span></div>`;
        verdict = !v ? 'blank' : LT.shortCorrect(q, v) ? 'ok' : 'no';
      } else {
        body = `<div class="sa-input"><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" maxlength="10" data-q="${i}" value="${esc(v)}" placeholder="Đáp số" aria-label="Đáp số câu ${i + 1}"><button class="btn sm ghost" data-sign="${i}" title="Đổi dấu âm/dương">±</button>${learn ? `<button class="btn sm primary" data-check="${i}">Kiểm tra</button>` : ''}<span class="small muted">Dùng dấu phẩy cho số thập phân (vd: 2,5).</span></div>`;
      }
    }
    const vt = { ok: 'Đúng', no: 'Sai', part: res && res.detail ? `Đúng ${res.detail.filter(Boolean).length}/4 ý` : '', blank: 'Bỏ trống' };
    const pts = full && res ? ` <span class="small muted">(${fmt(res.pts)}/${fmt(res.max)} đ)</span>` : '';
    const badge = q.classic ? '<span class="tag classic" title="Dạng bài xuất hiện nhiều lần trong đề thi 2020–2026">Dạng đề các năm</span>' : '';
    const flagBtn = review ? '' : `<button class="flag ${flagged ? 'on' : ''}" data-flag="${i}">${flagged ? '★ Đã đánh dấu' : '☆ Đánh dấu'}</button>`;
    return `<article class="card q ${full && !review ? 'done-' + verdict : ''}" id="q${i}">
      <div class="q-head">${num}<span class="q-topic">${esc(q.topic)}</span>${badge}${full ? `<span class="verdict ${verdict}">${vt[verdict]}</span>${pts}` : ''}${flagBtn}</div>
      <div class="q-text">${q.q}</div>
      ${body}
      ${full ? `<details ${verdict !== 'ok' || learn ? 'open' : ''}><summary>Giải thích chi tiết</summary>${explainHTML(q, ans)}</details>` : ''}
    </article>`;
  }
  /* Tách lời giải thành các bước */
  function solSteps(sol) {
    if (!sol) return [];
    return sol.split(/\.\s+(?=[A-ZĐÂĂÊÔƠƯÁÀẢÃẠÉÈÍÓÒÚÙÝ(Δ∫√]|[a-z]\)|Với|Từ|Vì|Ta|Áp|Bảo|Hàm)/).map((x) => x.trim()).filter(Boolean).map((x) => (/[.!?]$/.test(x) ? x : x + '.'));
  }
  function explainHTML(q, ans) {
    const g = ((LT.GUIDE || {})[q.subj] || {})[q.topic];
    let key = '';
    if (q.part === 'mc') {
      key = `<div class="ex-key">✅ Đáp án đúng: <b>${L[q.ans]}.</b> ${q.opts[q.ans]}</div>`;
      if (ans != null && ans !== q.ans) key += `<div class="ex-mine">❌ Bạn chọn <b>${L[ans]}.</b> ${q.opts[ans]} – phương án này là “bẫy” thường gặp${g && g.t.length ? ', xem mục Lỗi thường gặp bên dưới' : ''}.</div>`;
    } else if (q.part === 'sa') {
      key = `<div class="ex-key">✅ Đáp số: <b>${U.numF(q.ans, q.dp)}</b>${q.dp ? ` (làm tròn đến ${['hàng đơn vị', 'hàng phần mười', 'hàng phần trăm', 'hàng phần nghìn'][q.dp]})` : ''}</div>`;
    } else {
      key = `<div class="ex-key">✅ Đáp án: ${q.items.map((it, j) => `${'abcd'[j]}) <b>${it.v ? 'Đúng' : 'Sai'}</b>`).join(' · ')}</div>`;
    }
    const steps = q.part === 'tf' ? q.items.map((it, j) => `<b>Ý ${'abcd'[j]}</b> (${it.v ? 'Đúng' : 'Sai'}): ${it.sol || ''}`) : solSteps(q.sol);
    const links = LT.learnLinks ? LT.learnLinks(q.subj, q.topic) : [];
    return `<div class="explain">
      ${key}
      ${q.kn ? `<div class="ex-sec k"><h4>📘 Kiến thức cần nhớ</h4>${q.kn}</div>` : ''}
      ${g ? `<div class="ex-sec"><h4>🧭 Phương pháp giải</h4><ol>${g.m.map((x) => `<li>${x}</li>`).join('')}</ol></div>` : ''}
      <div class="ex-sec"><h4>✍ Lời giải chi tiết</h4><ol class="steps">${steps.map((x) => `<li>${x}</li>`).join('')}</ol></div>
      ${g && g.t.length ? `<div class="ex-sec warn"><h4>⚠ Lỗi thường gặp</h4><ul>${g.t.map((x) => `<li>${x}</li>`).join('')}</ul></div>` : ''}
      <div class="ex-sec links"><h4>🔗 Học thêm: ${esc(q.topic)}</h4>${links.map((l) => `<a href="${l.u}" target="_blank" rel="noopener">${l.t}</a>`).join('')}<a href="#/hoc/${q.subj}">📚 Sổ tay trong ứng dụng</a></div>
    </div>`;
  }
  function feedbackBuzz(ok) { try { navigator.vibrate && navigator.vibrate(ok ? 30 : [60, 50, 60]); } catch (e) { /* */ } }
  /* Chấm một câu (dùng cho chế độ chấm ngay) */
  function gradeOne(q, a) {
    const S = LT.SUBJECTS[q.subj] || { pts: { mc: 0.25, sa: 0.25 } };
    if (q.part === 'mc') { const ok = a != null && a === q.ans; return { ok, pts: ok ? S.pts.mc : 0, max: S.pts.mc }; }
    if (q.part === 'tf') { const arr = Array.isArray(a) ? a : []; const detail = q.items.map((it, j) => arr[j] != null && arr[j] === it.v); const c = detail.filter(Boolean).length; return { ok: c === 4, detail, pts: LT.TF_PTS[c], max: 1 }; }
    const ok = a != null && String(a).trim() !== '' && LT.shortCorrect(q, a); return { ok, pts: ok ? S.pts.sa : 0, max: S.pts.sa };
  }
  function partHeader(part, S) {
    const desc = {
      mc: `Mỗi câu chỉ chọn một phương án. Mỗi câu đúng ${fmt(S.pts.mc)} điểm.`,
      tf: 'Mỗi ý a), b), c), d) chọn Đúng hoặc Sai. Đúng 1 ý: 0,1 đ; 2 ý: 0,25 đ; 3 ý: 0,5 đ; 4 ý: 1 đ.',
      sa: `Ghi đáp số vào ô trả lời. Mỗi câu đúng ${fmt(S.pts.sa)} điểm.`,
    }[part];
    return `<div class="part-title">${LT.PART_NAMES[part]}<small>${desc}</small></div>`;
  }

  /* ---------------- Làm bài ---------------- */
  function viewExam(subj, no) {
    const S = LT.SUBJECTS[subj];
    const ex = LT.getExam(subj, no);
    let sess = Store.getActive(subj);
    if (!sess || sess.no !== no) {
      app.innerHTML = `<p class="small"><a href="#/s/${subj}">← ${S.name}</a></p><div class="empty">Chưa bắt đầu đề này.</div>`;
      return requestStart(subj, no);
    }
    if (sess.version && sess.version !== ex.version) {
      Store.clearActive(subj);
      toast('Ngân hàng đề vừa được cập nhật nên bài làm dở của phiên bản cũ không thể tiếp tục. Mời bạn bắt đầu lại.', 'warn', 7000);
      return requestStart(subj, no);
    }
    // chế độ thi thật: thời gian trôi cả khi đóng trang
    if (sess.mode === 'strict' && Date.now() >= sess.deadline) {
      toast('Đã hết giờ làm bài trong lúc bạn rời đi. Bài làm đã lưu được nộp tự động.', 'warn', 6000);
      return submitSession(sess, 'timeout');
    }
    document.body.classList.add('in-exam');
    sess.tab = TAB;
    const qs = ex.questions;
    sess.warned = sess.warned || [];
    sess.checked = sess.checked || [];
    const learn = sess.mode === 'learn';
    const lopt = (i) => (learn ? { checked: !!sess.checked[i] } : null);
    let html = `<div class="exam-head">
        <a class="btn sm ghost back" href="#/s/${subj}" title="Thoát (bài vẫn được lưu)" aria-label="Thoát">←</a>
        <div class="ttl">${S.name} · Đề ${no}<small class="sub"><span id="cnt"></span><span class="save-state" id="save">Đã lưu</span></small></div>
        <span class="spacer"></span>
        <div class="timer" id="timer" role="timer" aria-live="off"><span class="tl">${sess.mode === 'strict' ? 'Thi thật · còn lại' : learn ? 'Chấm ngay · còn lại' : 'Thời gian còn lại'}</span><b id="tval">--:--</b><span class="tsub" id="tsub"></span></div>
        ${sess.mode === 'strict' ? '' : '<button class="btn sm icon" id="pause" title="Tạm dừng đồng hồ" aria-label="Tạm dừng"><span class="pz"></span></button>'}
        <button class="btn sm primary hide-m" id="submit">Nộp bài</button>
        <div class="tbar"><i id="tbar"></i></div>
      </div>`;
    let lastPart = null;
    qs.forEach((q, i) => {
      if (q.part !== lastPart) { html += partHeader(q.part, S); lastPart = q.part; }
      html += renderQ(q, i, sess.answers[i], false, sess.flags[i], null, lopt(i));
    });
    html += `<div class="row" style="justify-content:center;margin-top:24px"><button class="btn primary" id="submit2">Nộp bài</button></div>
      <nav class="dock" aria-label="Điều hướng câu hỏi">
        <button class="btn icon" id="prev" aria-label="Câu trước">‹</button>
        <button class="btn grow" id="palette"><span>☰ Câu <b id="cur">1</b>/${qs.length}</span><small id="cnt2"></small></button>
        <button class="btn icon" id="next" aria-label="Câu sau">›</button>
        <button class="btn primary" id="submit3">Nộp bài</button>
      </nav>`;
    app.innerHTML = html;

    const $timer = document.getElementById('timer'), $tval = document.getElementById('tval'), $tsub = document.getElementById('tsub'), $tbar = document.getElementById('tbar');
    const $save = document.getElementById('save'), $cnt = document.getElementById('cnt'), $cnt2 = document.getElementById('cnt2'), $cur = document.getElementById('cur');
    let cur = 0;
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { cur = +en.target.id.slice(1); $cur.textContent = cur + 1; } });
    }, { rootMargin: '-45% 0px -50% 0px' }) : null;
    io && app.querySelectorAll('article.q').forEach((el) => io.observe(el));
    const goQ = (i) => { i = Math.max(0, Math.min(qs.length - 1, i)); cur = i; $cur.textContent = i + 1; const el = document.getElementById('q' + i); const y = el.getBoundingClientRect().top + window.scrollY - (document.querySelector('.exam-head').offsetHeight + 8); window.scrollTo({ top: y, behavior: 'smooth' }); };
    let cdCleanup = null, manualPause = false, hiddenAt = null, last = Date.now(), lastSaveTick = Date.now(), cover = null, ended = false;

    function save(silent) {
      if (ended) return; // đã nộp bài: không ghi lại bài làm dở
      sess.updatedAt = Date.now();
      const ok = Store.setActive(sess);
      if (!silent || !ok) {
        $save.className = 'save-state ' + (ok ? '' : 'err');
        $save.textContent = ok ? 'Đã lưu ' + timeStr(sess.updatedAt).slice(0, 5) : 'Không lưu được!';
      }
      if (!ok && !Store.persistent) $save.title = 'Trình duyệt chặn bộ nhớ (chế độ ẩn danh?). Không nên tải lại trang.';
    }
    function updCount() {
      const n = countAnswered(ex, sess.answers);
      $cnt.textContent = `${n}/${qs.length} câu`;
      if (!learn) { $cnt2.textContent = `đã làm ${n}`; return; }
      let pts = 0, right = 0;
      qs.forEach((q, i) => { if (q.part === 'sa' && !sess.checked[i]) return; const g = gradeOne(q, sess.answers[i]); pts += g.pts; if (g.ok) right++; });
      $cnt2.textContent = `đúng ${right} · ${fmt(pts)} điểm`;
    }
    let streakN = 0, nAns = 0;
    function cheerOn(ok) {
      feedbackBuzz(ok); nAns++;
      if (ok) {
        streakN++;
        const msg = LT.CHEER.streak[streakN];
        toast(msg || LT.pickCheer(LT.CHEER.right, nAns), msg ? 'good' : 'good mini', msg ? 3000 : 1300);
      } else { streakN = 0; toast(LT.pickCheer(LT.CHEER.wrong, nAns), 'mini', 2200); }
    }
    function rerender(i) {
      const el = document.getElementById('q' + i); if (!el) return;
      const tmp = document.createElement('div');
      tmp.innerHTML = renderQ(qs[i], i, sess.answers[i], false, sess.flags[i], null, lopt(i));
      const nu = tmp.firstElementChild; el.replaceWith(nu);
      io && io.observe(nu);
    }
    function setAns(i, v) { sess.answers[i] = v; save(); updCount(); }

    function tick() {
      if (ended) return;
      const now = Date.now();
      if (sess.mode === 'strict') sess.remainingMs = sess.deadline - now;
      else if (!manualPause && document.visibilityState === 'visible') sess.remainingMs -= Math.min(now - last, 3000);
      last = now;
      const rem = sess.remainingMs;
      $tval.textContent = clock(rem);
      $timer.className = 'timer' + (rem <= 60000 ? ' crit' : rem < 5 * 60000 ? ' low' : rem < 15 * 60000 ? ' warn' : '') + (manualPause ? ' paused' : '');
      const frac = Math.max(0, Math.min(1, rem / sess.totalMs));
      $tbar.style.width = frac * 100 + '%';
      $tbar.className = rem <= 5 * 60000 ? 'lo' : rem < 15 * 60000 ? 'mid' : '';
      $tsub.textContent = manualPause ? 'Đang tạm dừng' : sess.mode === 'strict' ? 'Nộp lúc ' + timeStr(sess.deadline).slice(0, 5) : 'Đã làm ' + Math.floor((sess.totalMs - rem) / 60000) + ' phút';
      // Cảnh báo thời gian như giám thị nhắc
      const due = [1, 5, 15].filter((m) => rem <= m * 60000 && rem > 0 && sess.warned.indexOf(m) < 0 && sess.totalMs > m * 60000);
      due.slice(0, 1).forEach((m) => {
        {
          due.forEach((x) => sess.warned.push(x));
          toast(`⏰ Còn <b>${m} phút</b> làm bài${m === 1 ? ' – hãy kiểm tra lại các câu đã tô!' : m === 5 ? ' – chuẩn bị nộp bài.' : '.'}`, 'warn', 6000);
          try { navigator.vibrate && navigator.vibrate(m === 1 ? [200, 100, 200, 100, 200] : [250, 120, 250]); } catch (e) { /* */ }
        }
      });
      if (now - lastSaveTick > 5000) { lastSaveTick = now; save(true); }
      if (sess.remainingMs <= 0) {
        sess.remainingMs = 0;
        save(true);
        ended = true;
        modal({ title: '⏰ Hết giờ làm bài', body: '<p>Bài làm của bạn được nộp tự động.</p>', dismiss: false, actions: [{ label: 'Xem kết quả', kind: 'primary', onClick: () => submitSession(sess, 'timeout') }] });
      }
    }
    const iv = setInterval(tick, 1000);
    if (sess.fresh) {
      // Đếm ngược 3-2-1 trước khi tính giờ, như hiệu lệnh bắt đầu làm bài
      manualPause = true;
      const cd = document.createElement('div');
      cd.className = 'pause-cover countdown';
      cd.innerHTML = `<div><p class="muted">${S.name} · Đề số ${no} · ${S.minutes} phút</p><div class="cd-num">3</div><p>Chuẩn bị tính giờ làm bài…</p></div>`;
      document.body.appendChild(cd);
      let k = 3;
      const ci = setInterval(() => {
        k--;
        if (k > 0) { cd.querySelector('.cd-num').textContent = k; return; }
        clearInterval(ci); cd.remove();
        const now = Date.now();
        sess.fresh = false; sess.startedAt = now; sess.deadline = now + sess.totalMs; sess.remainingMs = sess.totalMs;
        manualPause = false; last = now; save(); tick();
        toast('Bắt đầu tính giờ. Chúc bạn làm bài tốt!');
      }, 900);
      cdCleanup = () => { clearInterval(ci); cd.remove(); };
    }
    tick(); updCount(); save();

    function onVis() {
      if (document.visibilityState === 'hidden') { hiddenAt = Date.now(); save(); return; }
      const away = hiddenAt ? Date.now() - hiddenAt : 0;
      hiddenAt = null; last = Date.now();
      if (away > 1500) {
        sess.away.n++; sess.away.ms += away; save(true);
        toast(sess.mode === 'strict'
          ? `Bạn đã rời trang ${Math.round(away / 1000)} giây. Ở chế độ thi thật, đồng hồ vẫn chạy. Bài làm được giữ nguyên.`
          : `Chào mừng quay lại! Đồng hồ đã dừng trong ${Math.round(away / 1000)} giây bạn rời trang. Bài làm được giữ nguyên.`, '', 5000);
      }
    }
    const onHide = () => save(true);
    const onNet = () => save(true);
    const onStorage = (e) => {
      if (e.key !== 'ltA26:active.' + subj || !e.newValue) return;
      try { const o = JSON.parse(e.newValue); if (o.id === sess.id && o.tab !== TAB) toast('Bài thi này đang được mở ở một tab khác. Hãy chỉ làm ở một tab để tránh ghi đè.', 'warn', 6000); } catch (x) { /* */ }
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', onHide);
    window.addEventListener('beforeunload', onHide);
    window.addEventListener('blur', onHide);
    window.addEventListener('online', onNet);
    window.addEventListener('offline', onNet);
    window.addEventListener('storage', onStorage);
    cleanup = () => {
      clearInterval(iv); save(true); io && io.disconnect(); cdCleanup && cdCleanup();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('beforeunload', onHide);
      window.removeEventListener('blur', onHide);
      window.removeEventListener('online', onNet);
      window.removeEventListener('offline', onNet);
      window.removeEventListener('storage', onStorage);
      if (cover) cover.remove();
    };

    // Sự kiện chọn đáp án
    app.addEventListener('click', onClick);
    const prevCleanup = cleanup;
    cleanup = () => { app.removeEventListener('click', onClick); app.removeEventListener('input', onInput); prevCleanup(); };
    function onClick(e) {
      const t = e.target.closest('button');
      if (!t || ended) return;
      if (t.dataset.o != null) {
        const i = +t.dataset.q, j = +t.dataset.o;
        const v = !learn && sess.answers[i] === j ? null : j;
        t.parentElement.querySelectorAll('.opt').forEach((b, k) => b.classList.toggle('sel', k === v));
        setAns(i, v);
        if (learn) { rerender(i); cheerOn(qs[i].ans === v); }
      } else if (t.dataset.t != null) {
        const i = +t.dataset.q, j = +t.dataset.t, val = t.dataset.v === '1';
        const arr = Array.isArray(sess.answers[i]) ? sess.answers[i].slice() : [null, null, null, null];
        arr[j] = !learn && arr[j] === val ? null : val;
        t.parentElement.querySelectorAll('button').forEach((b) => { const on = arr[j] === (b.dataset.v === '1'); b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); });
        setAns(i, arr);
        if (learn) { rerender(i); cheerOn(qs[i].items[j].v === val); }
      } else if (t.dataset.flag != null) {
        const i = +t.dataset.flag;
        sess.flags[i] = !sess.flags[i];
        t.classList.toggle('on', sess.flags[i]);
        t.textContent = sess.flags[i] ? '★ Đã đánh dấu' : '☆ Đánh dấu';
        save();
      } else if (t.dataset.check != null) {
        const i = +t.dataset.check;
        const inp = app.querySelector(`input[data-q="${i}"]`);
        if (!inp.value.trim()) { toast('Hãy nhập đáp số trước khi kiểm tra.'); inp.focus(); return; }
        if (isNaN(LT.parseShort(inp.value))) { toast('Đáp số chưa đúng định dạng số (ví dụ: 12 hoặc −2,5).', 'warn'); inp.focus(); return; }
        sess.answers[i] = inp.value; sess.checked[i] = true; save(); updCount();
        rerender(i); cheerOn(LT.shortCorrect(qs[i], inp.value));
      } else if (t.dataset.sign != null) {
        const i = +t.dataset.sign;
        const inp = app.querySelector(`input[data-q="${i}"]`);
        let v = inp.value.trim();
        v = /^[-−]/.test(v) ? v.replace(/^[-−]/, '') : '-' + v;
        inp.value = v; setAns(i, v); inp.focus();
      } else if (t.id === 'submit' || t.id === 'submit2' || t.id === 'submit3') confirmSubmit();
      else if (t.id === 'prev') goQ(cur - 1);
      else if (t.id === 'next') goQ(cur + 1);
      else if (t.id === 'palette') showPalette();
      else if (t.id === 'pause') pause();
    }
    let inTimer = null;
    function onInput(e) {
      const inp = e.target;
      if (inp.dataset.q == null) return;
      inp.value = inp.value.replace(/[^0-9,.\-−]/g, '');
      $save.className = 'save-state pending'; $save.textContent = 'Đang lưu…';
      clearTimeout(inTimer);
      const i = +inp.dataset.q;
      sess.answers[i] = inp.value;
      inTimer = setTimeout(() => setAns(i, inp.value), 250);
    }
    app.addEventListener('input', onInput);

    function pause() {
      manualPause = true; tick(); save();
      cover = document.createElement('div');
      cover.className = 'pause-cover';
      cover.innerHTML = `<div><h1>⏸ Đang tạm dừng</h1><p class="muted">Đồng hồ đã dừng ở <b>${clock(sess.remainingMs)}</b>. Bài làm đã được lưu.</p><button class="btn primary">Tiếp tục làm bài</button></div>`;
      cover.querySelector('button').onclick = () => { manualPause = false; last = Date.now(); cover.remove(); cover = null; tick(); };
      document.body.appendChild(cover);
    }
    function showPalette() {
      let h = '';
      let lp = null;
      qs.forEach((q, i) => {
        if (q.part !== lp) { h += `<div style="grid-column:1/-1;font-size:13px;font-weight:700;margin-top:6px">${{ mc: 'Phần I', tf: 'Phần II', sa: 'Phần III' }[q.part]}</div>`; lp = q.part; }
        const a = sess.answers[i];
        const full = q.part === 'tf' ? Array.isArray(a) && a.every((x) => x != null) : isAnswered(q, a);
        const partial = q.part === 'tf' && isAnswered(q, a) && !full;
        h += `<button data-go="${i}" class="${full ? 'ans' : partial ? 'part' : ''} ${sess.flags[i] ? 'flg' : ''} ${i === cur ? 'cur' : ''}">${i + 1}</button>`;
      });
      const m = modal({
        title: 'Danh sách câu hỏi',
        body: `<div class="palette">${h}</div><div class="palette-legend"><span>■ Đã làm</span><span>▢ nét đứt: làm chưa đủ 4 ý</span><span style="color:var(--warn)">● Đánh dấu xem lại</span></div>`,
        actions: [{ label: 'Đóng' }, { label: 'Nộp bài', kind: 'primary', onClick: confirmSubmit }],
      });
      m.el.querySelector('.palette').onclick = (e) => {
        const b = e.target.closest('[data-go]'); if (!b) return;
        m.close();
        goQ(+b.dataset.go);
      };
    }
    function confirmSubmit() {
      const n = countAnswered(ex, sess.answers);
      const tfPartial = qs.filter((q, i) => q.part === 'tf' && isAnswered(q, sess.answers[i]) && !sess.answers[i].every((x) => x != null)).length;
      const flags = sess.flags.filter(Boolean).length;
      modal({
        title: 'Nộp bài?',
        body: `<p>Bạn đã làm <b>${n}/${qs.length}</b> câu${tfPartial ? `, trong đó ${tfPartial} câu Đúng/Sai chưa chọn đủ 4 ý` : ''}.${flags ? ` Có ${flags} câu đánh dấu xem lại.` : ''}</p><p>Thời gian còn lại: <b>${clock(sess.remainingMs)}</b>.</p>`,
        actions: [{ label: 'Làm tiếp' }, { label: 'Nộp bài', kind: 'primary', onClick: () => { ended = true; submitSession(sess, 'submit'); } }],
      });
    }
  }

  /* Chấm & lưu kết quả */
  function submitSession(sess, reason) {
    const ex = LT.getExam(sess.subj, sess.no);
    const res = LT.grade(ex, sess.answers || []);
    const now = Date.now();
    const used = sess.mode === 'strict' ? Math.min(now - sess.startedAt, sess.totalMs) : Math.min(sess.totalMs, sess.totalMs - Math.max(0, sess.remainingMs));
    const topics = {};
    Object.entries(res.topics).forEach(([t, v]) => (topics[t] = [Math.round(v.got * 100) / 100, Math.round(v.max * 100) / 100]));
    const id = 'a' + now.toString(36) + Math.random().toString(36).slice(2, 6);
    Store.addAttempt({
      id, subj: sess.subj, no: sess.no, version: ex.version, date: now, score: res.total,
      parts: { mc: res.parts.mc.got, tf: res.parts.tf.got, sa: res.parts.sa.got }, topics,
      answers: sess.answers, usedMs: used, mode: sess.mode, away: sess.away, reason,
    });
    Store.clearActive(sess.subj);
    if (reason !== 'switch') go('#/result/' + id);
    return id;
  }

  /* ---------------- Kết quả & nhận xét ---------------- */
  function viewResult(id) {
    const a = Store.attempt(id);
    if (!a) { app.innerHTML = '<div class="empty">Không tìm thấy kết quả. <a href="#/history">Xem lịch sử</a></div>'; return; }
    const S = LT.SUBJECTS[a.subj];
    const ex = LT.getExam(a.subj, a.no);
    if (!a.answers || (a.version && a.version !== ex.version)) { app.innerHTML = `<div class="card"><h3>${S.name} – Đề ${a.no}: ${fmt(a.score)} điểm</h3><p class="muted">${a.answers ? 'Bài này làm trên phiên bản ngân hàng đề cũ nên không thể hiển thị lại chi tiết.' : 'Chi tiết bài làm cũ đã được dọn để tiết kiệm bộ nhớ.'}</p></div>`; return; }
    const res = LT.grade(ex, a.answers);
    const history = Store.attempts().filter((x) => x.subj === a.subj && x.date < a.date);
    const fb = LT.feedback(ex, res, { usedMs: a.usedMs, history });
    const ringColor = res.total >= 8 ? 'var(--ok)' : res.total >= 5 ? 'var(--primary)' : 'var(--bad)';
    const P = res.parts;
    const pc = (x) => (x.max ? Math.round((x.got / x.max) * 100) : 0);
    const topicRows = fb.topicRows.slice().sort((x, y) => LT.TOPICS[a.subj].indexOf(x.t) - LT.TOPICS[a.subj].indexOf(y.t)).map((t) => {
      const p = Math.round(t.p * 100);
      return `<div class="topic-row"><span>${esc(t.t)}</span><div class="bar"><i class="${p < 50 ? 'lo' : p < 80 ? 'mid' : 'hi'}" style="width:${Math.max(3, p)}%"></i></div><span class="muted">${fmt(t.got)}/${fmt(t.max)} đ</span></div>`;
    }).join('');
    let reviewHtml = '', lp = null;
    ex.questions.forEach((q, i) => {
      if (q.part !== lp) { reviewHtml += partHeader(q.part, S); lp = q.part; }
      reviewHtml += `<div data-ok="${res.items[i].ok ? 1 : 0}">${renderQ(q, i, a.answers[i], true, false, res.items[i])}</div>`;
    });
    const all = Store.attempts();
    const sum = LT.summary(a.subj, all);
    const rec = LT.recommend(a.subj, all);
    const cheer = LT.pickCheer(LT.CHEER.result[fb.band.k], a.date);
    const pct = (x) => Math.round(x * 100);
    const trendSvg = (() => {
      const t = sum.trend, w = 280, h = 70, bw = w / Math.max(t.length, 1);
      return `<svg class="spark" viewBox="0 0 ${w} ${h + 16}" role="img" aria-label="Điểm các lần làm gần nhất">${t.map((v, k) => `<rect x="${k * bw + 3}" y="${h - (v / 10) * h}" width="${bw - 6}" height="${Math.max(2, (v / 10) * h)}" rx="3" class="${v >= 8 ? 'hi' : v >= 5 ? 'mid' : 'lo'}"><title>${fmt(v)}</title></rect><text x="${k * bw + bw / 2}" y="${h + 13}" text-anchor="middle">${fmt(v)}</text>`).join('')}</svg>`;
    })();
    const mastery = sum.topics.map((t) => `<div class="topic-row"><span>${esc(t.t)}${t.p < 0.6 ? ` <a class="small" href="${LT.learnLinks(a.subj, t.t)[0].u}" target="_blank" rel="noopener">học thêm ↗</a>` : ''}</span><div class="bar"><i class="${t.p < 0.5 ? 'lo' : t.p < 0.8 ? 'mid' : 'hi'}" style="width:${Math.max(3, pct(t.p))}%"></i></div><span class="muted">${pct(t.p)}%</span></div>`).join('');
    const evalHtml = `
      <h2>Đánh giá tổng hợp môn ${S.name}</h2>
      <div class="card">
        <div class="kpis">
          <div><span>Điểm dự kiến</span><b>${fmt(sum.lo)} – ${fmt(sum.hi)}</b><small>dựa trên ${Math.min(5, sum.n)} lần gần nhất</small></div>
          <div><span>Cao nhất</span><b>${fmt(sum.best)}</b><small>${sum.n} lần làm</small></div>
          <div><span>Tiến bộ</span><b>${sum.gain == null ? '–' : (sum.gain >= 0 ? '+' : '') + fmt(sum.gain)}</b><small>${sum.gain == null ? 'cần ≥ 4 lần làm' : 'so với 3 lần đầu'}</small></div>
          <div><span>Chủ đề vững</span><b>${sum.mastered}/${sum.total}</b><small>đạt ≥ 80%</small></div>
          <div><span>Thời gian luyện</span><b>${sum.minutes} phút</b><small>${sum.streak ? '🔥 ' + sum.streak + ' ngày liên tiếp' : 'hãy luyện mỗi ngày'}</small></div>
        </div>
        <h3 style="margin-top:14px">Điểm các lần gần nhất</h3>${trendSvg}
        <h3 style="margin-top:14px">Tỉ lệ điểm theo phần (trung bình)</h3>
        <div class="topic-row"><span>Phần I – nhiều lựa chọn</span><div class="bar"><i class="${sum.parts.mc < 0.5 ? 'lo' : sum.parts.mc < 0.8 ? 'mid' : 'hi'}" style="width:${pct(sum.parts.mc)}%"></i></div><span class="muted">${pct(sum.parts.mc)}%</span></div>
        <div class="topic-row"><span>Phần II – đúng/sai</span><div class="bar"><i class="${sum.parts.tf < 0.5 ? 'lo' : sum.parts.tf < 0.8 ? 'mid' : 'hi'}" style="width:${pct(sum.parts.tf)}%"></i></div><span class="muted">${pct(sum.parts.tf)}%</span></div>
        <div class="topic-row"><span>Phần III – trả lời ngắn</span><div class="bar"><i class="${sum.parts.sa < 0.5 ? 'lo' : sum.parts.sa < 0.8 ? 'mid' : 'hi'}" style="width:${pct(sum.parts.sa)}%"></i></div><span class="muted">${pct(sum.parts.sa)}%</span></div>
        <h3 style="margin-top:14px">Mức độ nắm vững từng chủ đề (tích luỹ)</h3>${mastery}
      </div>
      <div class="card rec" style="margin-top:12px"><div class="row"><div style="flex:1;min-width:200px"><b>🎯 Đề gợi ý tiếp theo: Đề số ${rec.no}</b> <span class="tag l${rec.level}">${rec.levelName}</span><br><span class="small muted">${rec.why}</span></div><button class="btn primary" data-act="next">Vào thi Đề ${rec.no}</button></div></div>`;
    app.innerHTML = `
      <p class="small"><a href="#/s/${a.subj}">← ${S.name}</a></p>
      <div class="card">
        <div class="score-hero">
          <div class="ring" style="--p:${res.total * 10};--rc:${ringColor}"><div><div><b>${fmt(res.total)}</b><br><span class="muted small">/ 10 điểm</span></div></div></div>
          <div>
            <h1 style="margin-top:0">${S.name} – Đề số ${a.no}</h1>
            <span class="band ${fb.band.k}">${fb.band.t}</span>
            <p style="margin:8px 0 0">${fb.band.m}</p>
            <p class="cheer" style="margin:8px 0 0">💬 ${cheer}</p>
            <p class="small muted" style="margin:6px 0 0">Nộp lúc ${dateStr(a.date)} · làm trong ${Math.round(a.usedMs / 60000)} phút · ${a.mode === 'strict' ? 'thi thật' : a.mode === 'learn' ? 'luyện tập – chấm ngay' : 'thi thử'}${a.away && a.away.n ? ` · rời trang ${a.away.n} lần` : ''}${a.reason === 'timeout' ? ' · nộp tự động khi hết giờ' : ''}</p>
          </div>
        </div>
      </div>
      <h2>Điểm từng phần</h2>
      <div class="parts3">
        <div>Phần I – nhiều lựa chọn<br><b>${fmt(P.mc.got)}</b>/${fmt(P.mc.max)} · đúng ${P.mc.right}/${P.mc.n} câu<div class="bar" style="margin-top:6px"><i style="width:${pc(P.mc)}%"></i></div></div>
        <div>Phần II – đúng/sai<br><b>${fmt(P.tf.got)}</b>/${fmt(P.tf.max)} · đúng trọn ${P.tf.right}/${P.tf.n} câu<div class="bar" style="margin-top:6px"><i style="width:${pc(P.tf)}%"></i></div></div>
        <div>Phần III – trả lời ngắn<br><b>${fmt(P.sa.got)}</b>/${fmt(P.sa.max)} · đúng ${P.sa.right}/${P.sa.n} câu<div class="bar" style="margin-top:6px"><i style="width:${pc(P.sa)}%"></i></div></div>
      </div>
      <h2>Nhận xét chung</h2>
      <div class="card">
        <ul class="notes">${fb.notes.map((n) => `<li>${n}</li>`).join('')}
          ${fb.strong.length ? `<li>Điểm mạnh: ${fb.strong.map((x) => `<b>${esc(x.t)}</b>`).join(', ')}.</li>` : ''}
          ${fb.weak.length ? `<li>Cần cải thiện: ${fb.weak.map((x) => `<b>${esc(x.t)}</b>`).join(', ')}.</li>` : '<li>Không có chủ đề nào dưới 50% – rất tốt!</li>'}
          <li><b>Gợi ý tiếp theo:</b> ${fb.next}</li>
        </ul>
      </div>
      ${fb.review.length ? `<h2>Kiến thức cần ôn lại</h2>${fb.review.map((r) => `<div class="know"><b>${esc(r.t)}</b>${r.kn}${(((LT.GUIDE || {})[a.subj] || {})[r.t] || { m: [] }).m.length ? `<ol class="small">${LT.GUIDE[a.subj][r.t].m.map((x) => `<li>${x}</li>`).join('')}</ol>` : ''}<div class="links">${LT.learnLinks(a.subj, r.t).map((l) => `<a href="${l.u}" target="_blank" rel="noopener">${l.t}</a>`).join('')}</div></div>`).join('')}` : ''}
      ${evalHtml}
      <h2>Kết quả theo chủ đề (đề này)</h2>
      <div class="card">${topicRows}</div>
      <div class="row" style="margin:20px 0">
        <button class="btn primary" data-act="again">Làm lại đề này</button>
        <button class="btn ghost" onclick="window.print()">In / Lưu PDF</button>
      </div>
      <h2>Xem lại bài làm & lời giải</h2>
      <div class="pill-tabs" id="rv-filter"><button data-f="all" class="on">Tất cả</button><button data-f="wrong">Câu chưa đúng</button><button data-f="right">Câu đúng</button></div>
      <div id="review">${reviewHtml}</div>`;
    app.querySelector('[data-act="again"]').onclick = () => requestStart(a.subj, a.no);
    app.querySelector('[data-act="next"]').onclick = () => requestStart(a.subj, rec.no);
    app.querySelector('#rv-filter').onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      app.querySelectorAll('#rv-filter button').forEach((x) => x.classList.toggle('on', x === b));
      app.querySelectorAll('#review > [data-ok]').forEach((d) => { d.style.display = b.dataset.f === 'all' || (b.dataset.f === 'wrong') === (d.dataset.ok === '0') ? '' : 'none'; });
    };
  }

  /* ---------------- Lịch sử ---------------- */
  function viewHistory() {
    const list = Store.attempts().slice().reverse();
    const rows = list.map((a) => {
      const S = LT.SUBJECTS[a.subj];
      return `<tr><td>${dateStr(a.date)}</td><td>${S ? S.name : a.subj}</td><td>Đề ${a.no}</td><td><span class="score-chip ${scoreCls(a.score)}">${fmt(a.score)}</span></td><td class="hide-m muted">${Math.round((a.usedMs || 0) / 60000)} phút</td><td><a href="#/result/${esc(a.id)}">Xem</a></td></tr>`;
    }).join('');
    app.innerHTML = `
      <h1>Lịch sử làm bài</h1>
      ${resumeCard()}
      <div class="card" style="margin-top:16px">${list.length ? `<table class="hist"><tr><th>Thời gian</th><th>Môn</th><th>Đề</th><th>Điểm</th><th class="hide-m">Thời lượng</th><th></th></tr>${rows}</table>` : '<div class="empty">Bạn chưa làm đề nào. <a href="#/">Bắt đầu ngay</a></div>'}</div>
      <h2>Sao lưu dữ liệu</h2>
      <p class="muted small">Dữ liệu chỉ lưu trong trình duyệt của thiết bị này. Hãy xuất tệp sao lưu để chuyển sang máy khác hoặc phòng khi xoá dữ liệu trình duyệt.</p>
      <div class="row">
        <button class="btn" data-act="export">⬇ Xuất tệp sao lưu</button>
        <label class="btn">⬆ Nhập tệp sao lưu<input type="file" accept="application/json,.json" hidden></label>
        <span class="spacer"></span>
        <button class="btn ghost danger" data-act="clear">Xoá lịch sử</button>
      </div>
      ${Store.persistent ? '' : '<p class="card" style="margin-top:12px;color:var(--bad)">⚠ Trình duyệt đang chặn bộ nhớ cục bộ (có thể do chế độ ẩn danh). Kết quả sẽ mất khi đóng trang.</p>'}`;
    bindDiscard();
    app.querySelector('[data-act="export"]').onclick = () => {
      const blob = new Blob([Store.exportAll()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'luyen-thi-khoi-a-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    app.querySelector('input[type=file]').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then((t) => { try { const n = Store.importAll(t); toast(`Đã nhập ${n} lượt làm bài.`); route(); } catch (err) { toast('Không nhập được: ' + esc(err.message), 'warn'); } });
    };
    app.querySelector('[data-act="clear"]').onclick = () => modal({
      title: 'Xoá toàn bộ lịch sử?', body: '<p>Thao tác này không thể hoàn tác. Nên xuất tệp sao lưu trước.</p>',
      actions: [{ label: 'Không' }, { label: 'Xoá', kind: 'danger', onClick: () => { Store.clearAttempts(); route(); } }],
    });
  }

  /* ---------------- Sổ tay kiến thức ---------------- */
  function viewHandbook(subj, focus) {
    const S = LT.SUBJECTS[subj];
    const sum = LT.summary(subj, Store.attempts());
    const mast = {}; (sum ? sum.topics : []).forEach((t) => (mast[t.t] = t.p));
    const items = LT.TOPICS[subj].map((t, k) => {
      const g = (LT.GUIDE[subj] || {})[t] || { m: [], t: [] };
      const p = mast[t];
      return `<details class="card hb" id="t${k}" ${focus === t ? 'open' : ''}><summary><b>${esc(t)}</b>${p == null ? '' : ` <span class="score-chip ${p >= 0.8 ? '' : p >= 0.5 ? 'mid' : 'lo'}">${Math.round(p * 100)}%</span>`}</summary>
        <div class="explain">
          <div class="ex-sec k"><h4>📘 Kiến thức trọng tâm</h4>${(LT.KNOW[subj] || {})[t] || ''}</div>
          ${g.m.length ? `<div class="ex-sec"><h4>🧭 Phương pháp giải</h4><ol>${g.m.map((x) => `<li>${x}</li>`).join('')}</ol></div>` : ''}
          ${g.t.length ? `<div class="ex-sec warn"><h4>⚠ Lỗi thường gặp</h4><ul>${g.t.map((x) => `<li>${x}</li>`).join('')}</ul></div>` : ''}
          <div class="ex-sec links"><h4>🔗 Học thêm trên Internet</h4>${LT.learnLinks(subj, t).map((l) => `<a href="${l.u}" target="_blank" rel="noopener">${l.t}</a>`).join('')}</div>
        </div></details>`;
    }).join('');
    app.innerHTML = `<p class="small"><a href="#/">← Trang chủ</a></p>
      <h1>📚 Sổ tay kiến thức ${S.name}</h1>
      <p class="muted">Tóm tắt kiến thức, cách giải và lỗi hay gặp của ${LT.TOPICS[subj].length} chủ đề. Con số % là mức nắm vững của bạn qua các lần làm bài.</p>
      <div class="grid" style="gap:10px">${items}</div>
      <div class="row" style="margin-top:16px"><button class="btn primary" id="hb-go">▶ Vào thi ${S.name}</button></div>`;
    document.getElementById('hb-go').onclick = () => quickStart(subj);
    if (focus) { const el = app.querySelector('details[open]'); el && el.scrollIntoView(); }
  }

  /* ---------------- Khởi động ---------------- */
  window.addEventListener('hashchange', route);
  netBadge();
  route();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
