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
    /* Bài đang làm: ghi hai bản xen kẽ để một lần ghi hỏng (tắt máy đột ngột) không làm mất bài. */
    getActive() {
      const a = get('active', null), b = get('active.bak', null);
      if (a && b) return (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b;
      return a || b || null;
    },
    setActive(s) {
      const ok1 = set('active', s);
      const ok2 = set('active.bak', s);
      return ok1 || ok2;
    },
    clearActive() { rawDel('active'); rawDel('active.bak'); },
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
    settings() { return Object.assign({ mode: 'practice' }, get('settings', {})); },
    saveSettings(s) { set('settings', s); },
    exportAll() {
      return JSON.stringify({ app: 'luyen-thi-khoi-a-2026', exportedAt: new Date().toISOString(), attempts: Store.attempts(), active: Store.getActive(), settings: Store.settings() });
    },
    importAll(text) {
      const d = JSON.parse(text);
      if (!d || d.app !== 'luyen-thi-khoi-a-2026' || !Array.isArray(d.attempts)) throw new Error('Tệp không đúng định dạng');
      const valid = d.attempts.filter((a) => a && typeof a.id === 'string' && LT.SUBJECTS[a.subj] && Number.isInteger(a.no) && typeof a.score === 'number');
      const cur = Store.attempts();
      const ids = new Set(cur.map((a) => a.id));
      valid.forEach((a) => { if (!ids.has(a.id)) cur.push(a); });
      cur.sort((a, b) => a.date - b.date);
      set('attempts', cur);
      return valid.length;
    },
  };
  LT.Store = Store;
})(window);
