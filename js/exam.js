/* Dựng đề, chấm điểm, nhận xét. */
(function (G) {
  'use strict';
  const LT = G.LT;
  const VERSION = 'v1';
  const EXAMS_PER_SUBJECT = 120;

  /* Cấu trúc đề theo định dạng thi tốt nghiệp THPT từ năm 2025 */
  LT.SUBJECTS = {
    math: { key: 'math', name: 'Toán', icon: '∑', minutes: 90, parts: { mc: 12, tf: 4, sa: 6 }, pts: { mc: 0.25, sa: 0.5 }, concepts: 1, color: 'blue' },
    physics: { key: 'physics', name: 'Vật lí', icon: '⚛', minutes: 50, parts: { mc: 18, tf: 4, sa: 6 }, pts: { mc: 0.25, sa: 0.25 }, concepts: 7, color: 'violet' },
    chemistry: { key: 'chemistry', name: 'Hoá học', icon: '⚗', minutes: 50, parts: { mc: 18, tf: 4, sa: 6 }, pts: { mc: 0.25, sa: 0.25 }, concepts: 7, color: 'green' },
  };
  LT.EXAMS_PER_SUBJECT = EXAMS_PER_SUBJECT;
  LT.PART_NAMES = { mc: 'PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn', tf: 'PHẦN II. Câu trắc nghiệm đúng sai', sa: 'PHẦN III. Câu trắc nghiệm trả lời ngắn' };
  /* Điểm câu Đúng/Sai theo số ý đúng: 1 ý 0,1; 2 ý 0,25; 3 ý 0,5; 4 ý 1 */
  const TF_PTS = [0, 0.1, 0.25, 0.5, 1];
  LT.TF_PTS = TF_PTS;

  function level(no) {
    if (no <= 40) return { k: 1, name: 'Cơ bản' };
    if (no <= 80) return { k: 2, name: 'Trung bình' };
    return { k: 3, name: 'Vận dụng' };
  }
  LT.level = level;

  function runGen(g, seed) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const r = new LT.Rng(seed + '#' + attempt);
      try {
        const q = g.gen(r);
        if (q) return { q, r };
      } catch (e) {
        /* thử lại với hạt giống khác */
      }
    }
    throw new Error('Không sinh được câu hỏi từ dạng ' + g.id);
  }

  /* Chuẩn hoá dấu trừ: "·-2" → "·(−2)", "-3" → "−3" (không đụng tới thẻ HTML). */
  function fixMinus(s) {
    if (typeof s !== 'string') return s;
    return s
      .replace(/([·×+]\s*|[−-]\s+)-(\d+(?:[.,]\d+)?)/g, (m, a, n) => a + '(−' + n + ')')
      .replace(/(^|[^A-Za-z0-9_\-])-(?=\d)/g, '$1−');
  }
  LT.fixMinus = fixMinus;

  function pickTemplates(r, pool, count) {
    // Chọn không lặp; nếu thiếu thì cho phép lặp dạng (tham số vẫn khác).
    const out = [];
    let bag = [];
    while (out.length < count) {
      if (!bag.length) bag = r.shuffle(pool);
      const g = bag.pop();
      // tránh hai câu cùng dạng liền kề khi lặp
      out.push(g);
    }
    return out;
  }

  /** Sinh đề số `no` (1..120) của môn `subj` – luôn cho cùng một đề. */
  function buildExam(subj, no) {
    const S = LT.SUBJECTS[subj];
    const bank = LT.BANK[subj];
    const topics = LT.TOPICS[subj];
    const r = new LT.Rng(subj + '#' + no + '#' + VERSION);
    const questions = [];
    ['mc', 'tf', 'sa'].forEach((part) => {
      let chosen;
      if (part === 'mc') {
        const calc = bank.mc.filter((g) => g.kind !== 'concept');
        const conc = bank.mc.filter((g) => g.kind === 'concept');
        const nConc = Math.min(S.concepts, conc.length);
        chosen = pickTemplates(r, calc, S.parts.mc - nConc).concat(r.sample(conc, nConc));
      } else {
        chosen = pickTemplates(r, bank[part], S.parts[part]);
      }
      // sắp theo thứ tự chủ đề (như đề thật đi theo chương)
      chosen = chosen.map((g, i) => ({ g, i })).sort((a, b) => topics.indexOf(a.g.topic) - topics.indexOf(b.g.topic) || a.i - b.i).map((x) => x.g);
      chosen.forEach((g, k) => {
        const { q, r: qr } = runGen(g, subj + '#' + no + '#' + part + '#' + k + '#' + g.id);
        const item = { part, topic: g.topic, gid: g.id, q: fixMinus(q.q), kn: q.kn || (LT.KNOW[subj] || {})[g.topic] || '', sol: fixMinus(q.sol || '') };
        if (part === 'mc') {
          const order = qr.shuffle([0, 1, 2, 3]);
          item.opts = order.map((i) => fixMinus(q.opts[i]));
          item.ans = order.indexOf(0);
        } else if (part === 'tf') {
          item.items = q.items.map((x) => ({ s: fixMinus(x.s), v: x.v, sol: fixMinus(x.sol) }));
        } else {
          item.ans = q.ans;
          item.dp = q.dp || 0;
        }
        questions.push(item);
      });
    });
    return { subj, no, version: VERSION, minutes: S.minutes, level: level(no), questions };
  }

  /* Bộ nhớ đệm đề trong phiên */
  const cache = {};
  LT.getExam = function (subj, no) {
    const k = subj + '#' + no;
    if (!cache[k]) cache[k] = buildExam(subj, no);
    return cache[k];
  };
  LT.buildExam = buildExam;

  /** Chuẩn hoá đáp án trả lời ngắn: chấp nhận dấu phẩy hoặc chấm. */
  function parseShort(s) {
    if (s == null) return NaN;
    s = String(s).trim().replace(/\s+/g, '').replace('−', '-').replace(',', '.');
    if (!/^[-+]?\d*\.?\d+$/.test(s)) return NaN;
    return parseFloat(s);
  }
  LT.parseShort = parseShort;
  function shortCorrect(q, input) {
    const v = parseShort(input);
    if (isNaN(v)) return false;
    const tol = 0.5 * Math.pow(10, -q.dp) + 1e-9;
    return Math.abs(v - q.ans) < tol;
  }
  LT.shortCorrect = shortCorrect;

  /** Chấm bài. answers[i]: mc → số 0..3; tf → mảng 4 phần tử true/false/null; sa → chuỗi */
  function grade(exam, answers) {
    const S = LT.SUBJECTS[exam.subj];
    const res = { total: 0, max: 10, parts: { mc: { got: 0, max: 0, right: 0, n: 0 }, tf: { got: 0, max: 0, right: 0, n: 0 }, sa: { got: 0, max: 0, right: 0, n: 0 } }, items: [], topics: {}, blank: 0 };
    exam.questions.forEach((q, i) => {
      const a = answers[i];
      let pts = 0, max = 0, ok = false, detail = null, answered = false;
      if (q.part === 'mc') {
        max = S.pts.mc; answered = a != null && a !== '';
        ok = answered && Number(a) === q.ans; pts = ok ? max : 0;
      } else if (q.part === 'tf') {
        max = 1;
        const arr = Array.isArray(a) ? a : [];
        detail = q.items.map((it, j) => arr[j] != null && arr[j] === it.v);
        answered = arr.some((x) => x != null);
        const c = detail.filter(Boolean).length;
        pts = TF_PTS[c]; ok = c === 4;
      } else {
        max = S.pts.sa; answered = a != null && String(a).trim() !== '';
        ok = answered && shortCorrect(q, a); pts = ok ? max : 0;
      }
      if (!answered) res.blank++;
      const p = res.parts[q.part];
      p.got += pts; p.max += max; p.n++; if (ok) p.right++;
      res.total += pts;
      const t = (res.topics[q.topic] = res.topics[q.topic] || { got: 0, max: 0, n: 0, right: 0, wrong: [] });
      t.got += pts; t.max += max; t.n++; if (ok) t.right++; else t.wrong.push(i);
      res.items.push({ pts, max, ok, detail, answered });
    });
    res.total = Math.round(res.total * 100) / 100;
    Object.values(res.parts).forEach((p) => (p.got = Math.round(p.got * 100) / 100));
    return res;
  }
  LT.grade = grade;

  /** Nhận xét chung sau khi làm cả đề. */
  function feedback(exam, res, ctx) {
    const S = LT.SUBJECTS[exam.subj];
    const sc = res.total;
    const band =
      sc >= 9 ? { k: 'xs', t: 'Xuất sắc', m: 'Bạn nắm rất chắc kiến thức và kĩ năng. Hãy duy trì phong độ bằng các đề mức Vận dụng và luyện tốc độ để dư thời gian kiểm tra lại.' }
      : sc >= 8 ? { k: 'gioi', t: 'Giỏi', m: 'Kết quả rất tốt. Các lỗi còn lại thường nằm ở vài chủ đề cụ thể – ôn kĩ những chủ đề được nêu dưới đây là có thể bứt lên 9+.' }
      : sc >= 6.5 ? { k: 'kha', t: 'Khá', m: 'Nền tảng khá vững. Cần củng cố các chủ đề còn yếu và luyện kĩ năng làm phần Đúng/Sai, Trả lời ngắn để tăng điểm.' }
      : sc >= 5 ? { k: 'tb', t: 'Trung bình', m: 'Bạn đã nắm được phần kiến thức cơ bản nhưng còn hổng ở nhiều chủ đề. Hãy xem lại lời giải từng câu sai và học lại kiến thức trọng tâm bên dưới.' }
      : { k: 'yeu', t: 'Cần cố gắng', m: 'Kết quả chưa đạt. Đừng nản! Hãy bắt đầu từ các đề mức Cơ bản, đọc kĩ phần “Kiến thức” của từng câu và làm lại đề này sau vài ngày.' };

    const notes = [];
    const P = res.parts;
    const pct = (p) => (p.max ? p.got / p.max : 0);
    const partName = { mc: 'Phần I (nhiều lựa chọn)', tf: 'Phần II (Đúng/Sai)', sa: 'Phần III (trả lời ngắn)' };
    const partsSorted = Object.keys(P).sort((a, b) => pct(P[a]) - pct(P[b]));
    const weakest = partsSorted[0], strongest = partsSorted[2];
    notes.push(`${partName[strongest]} là phần bạn làm tốt nhất (${fmt(P[strongest].got)}/${fmt(P[strongest].max)} điểm); ${partName[weakest]} đạt thấp nhất (${fmt(P[weakest].got)}/${fmt(P[weakest].max)} điểm).`);
    if (pct(P.tf) < 0.6) notes.push('Phần Đúng/Sai: điểm chỉ thật sự cao khi đúng cả 4 ý (1 điểm), đúng 3 ý chỉ được 0,5. Hãy kiểm tra từng ý một cách độc lập, nhất là các ý có tính toán.');
    if (pct(P.sa) < 0.5) notes.push('Phần Trả lời ngắn: chú ý đơn vị và yêu cầu làm tròn của đề; tính toán cẩn thận vì không có phương án để đối chiếu.');
    if (res.blank > 0) notes.push(`Bạn bỏ trống ${res.blank} câu. Với phần I, nên luôn chọn một phương án (không bị trừ điểm khi sai).`);
    if (ctx && ctx.usedMs != null) {
      const used = ctx.usedMs / 60000, lim = S.minutes;
      if (used < lim * 0.4 && sc < 8) notes.push(`Bạn chỉ dùng ${Math.round(used)}/${lim} phút. Làm quá nhanh dễ mắc lỗi – hãy dành thời gian còn lại để soát lại bài.`);
      else if (used >= lim * 0.98) notes.push('Bạn dùng gần hết thời gian. Hãy luyện thêm để tăng tốc độ: làm nhanh câu dễ ở phần I trước, câu khó để sau.');
      else notes.push(`Thời gian làm bài: ${Math.round(used)}/${lim} phút – phân bổ hợp lí.`);
    }

    const topicRows = Object.keys(res.topics).map((t) => {
      const x = res.topics[t];
      return { t, ...x, p: x.max ? x.got / x.max : 0 };
    }).sort((a, b) => a.p - b.p);
    const weak = topicRows.filter((x) => x.p < 0.5);
    const strong = topicRows.filter((x) => x.p >= 0.85);
    const review = weak.slice(0, 4).map((x) => ({ t: x.t, kn: (LT.KNOW[exam.subj] || {})[x.t] || '' }));

    let trend = null;
    if (ctx && ctx.history && ctx.history.length) {
      const prev = ctx.history.slice(-5);
      const avg = prev.reduce((s, h) => s + h.score, 0) / prev.length;
      trend = { avg, diff: sc - avg, n: prev.length };
      notes.push(sc >= avg ? `So với trung bình ${prev.length} lần làm gần nhất của môn ${S.name} (${fmt(avg)}), bạn tiến bộ ${fmt(sc - avg)} điểm. Rất tốt!` : `Điểm lần này thấp hơn trung bình ${prev.length} lần gần nhất (${fmt(avg)}) ${fmt(avg - sc)} điểm. Hãy xem lại các chủ đề yếu bên dưới.`);
    }

    let next;
    if (sc >= 8 && exam.no < 81) next = 'Bạn đã sẵn sàng thử các đề mức Vận dụng (đề 81–120).';
    else if (sc < 5 && exam.no > 40) next = 'Nên quay lại luyện một số đề mức Cơ bản (đề 1–40) để chắc kiến thức nền.';
    else next = 'Tiếp tục luyện đề kế tiếp và làm lại đề này sau 3–5 ngày để kiểm tra mức độ ghi nhớ.';

    return { band, notes, weak, strong, review, topicRows, trend, next };
  }
  function fmt(x) { return LT.U.num(x, 2); }
  LT.feedback = feedback;
})(typeof window !== 'undefined' ? window : globalThis);
