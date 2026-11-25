/* Lưu trữ cục bộ: bài đang làm (lưu tạm), lịch sử làm bài, cài đặt.
   Mọi thứ nằm trên thiết bị (localStorage) nên vẫn hoạt động khi mất mạng. */
(function (G) {
  'use strict';
  const LT = G.LT;
  const P = 'ltA26:';
  const mem = {};
  let ok = true;
  try { const t = P + '__t'; G.localStorage.setItem(t, '1'); G.localStorage.removeItem(t); } catch (e) { ok = false; }

  function rawGet(k) { try { return ok ? G.localStorage.getItem(P + k) : mem[k] ?? null; } catch (e) { return mem[k] ?? null; } }
  function rawSet(k, v) {
    mem[k] = v;
    if (!ok) return false;
    try { G.localStorage.setItem(P + k, v); return true; } catch (e) { return false; }
  }
  function rawDel(k) { delete mem[k]; try { ok && G.localStorage.removeItem(P + k); } catch (e) { /* */ } }
  function get(k, def) {
    const s = rawGet(k);
    if (s == null) return def;
    try { return JSON.parse(s); } catch (e) { return def; }
  }
  function set(k, v) { return rawSet(k, JSON.stringify(v)); }

  const Store = {
    persistent: ok,
    get, set,
    /* Bài đang làm: mỗi môn một bài, ghi hai bản xen kẽ để một lần ghi hỏng (tắt máy đột ngột) không làm mất bài. */
    getActive(subj) {
      if (!subj) { const l = Store.listActive(); return l.length ? l[0] : null; }
      const a = get('active.' + subj, null), b = get('active.' + subj + '.bak', null);
      if (a && b) return (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b;
      return a || b || null;
    },
    listActive() {
      return Object.keys(LT.SUBJECTS || {}).map((k) => Store.getActive(k)).filter(Boolean).sort((x, y) => (y.updatedAt || 0) - (x.updatedAt || 0));
    },
    setActive(s) {
      const ok1 = set('active.' + s.subj, s);
      const ok2 = set('active.' + s.subj + '.bak', s);
      return ok1 || ok2;
    },
    clearActive(subj) { rawDel('active.' + subj); rawDel('active.' + subj + '.bak'); },
    attempts() { return get('attempts', []); },
    addAttempt(a) {
      const list = Store.attempts();
      list.push(a);
      // giữ tối đa 600 lượt gần nhất
      while (list.length > 600) list.shift();
      if (!set('attempts', list)) {
        // nếu đầy bộ nhớ: bỏ đáp án chi tiết của các lượt cũ
        list.slice(0, Math.max(0, list.length - 50)).forEach((x) => delete x.answers);
        set('attempts', list);
      }
    },
    attempt(id) { return Store.attempts().find((a) => a.id === id) || null; },
    clearAttempts() { rawDel('attempts'); },
    settings() { return Object.assign({ instant: true, strict: false }, get('settings', {})); },
    saveSettings(s) { set('settings', s); },
    exportAll() {
      return JSON.stringify({ app: 'luyen-thi-khoi-a-2027', exportedAt: new Date().toISOString(), attempts: Store.attempts(), active: Store.listActive(), settings: Store.settings() });
    },
    importAll(text) {
      const d = JSON.parse(text);
      if (!d || !/^luyen-thi-khoi-a-202[67]$/.test(d.app) || !Array.isArray(d.attempts)) throw new Error('Tệp không đúng định dạng');
      const valid = d.attempts.filter((a) => a && typeof a.id === 'string' && LT.SUBJECTS[a.subj] && Number.isInteger(a.no) && typeof a.score === 'number');
      const cur = Store.attempts();
      const ids = new Set(cur.map((a) => a.id));
      valid.forEach((a) => { if (!ids.has(a.id)) cur.push(a); });
      cur.sort((a, b) => a.date - b.date);
      set('attempts', cur);
      return valid.length;
    },
  };
  // Chuyển dữ liệu bài làm dở kiểu cũ (một bài chung) sang kiểu mới (mỗi môn một bài)
  try {
    const old = get('active', null) || get('active.bak', null);
    if (old && old.subj && !Store.getActive(old.subj)) Store.setActive(old);
    rawDel('active'); rawDel('active.bak');
  } catch (e) { /* */ }
  LT.Store = Store;
})(window);
