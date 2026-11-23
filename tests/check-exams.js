/* Kiểm tra: sinh toàn bộ đề của 3 môn, xác nhận cấu trúc, tính hợp lệ của đáp án và tính ổn định (deterministic).
   Chạy: node tests/check-exams.js */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { console, Math, Date, JSON };
ctx.globalThis = ctx;
vm.createContext(ctx);
['js/core.js', 'js/data/math.js', 'js/data/physics.js', 'js/data/chemistry.js', 'js/data/classic.js', 'js/exam.js'].forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
});
const LT = ctx.LT;

let errors = 0;
const fail = (m) => { errors++; if (errors < 40) console.error('✗ ' + m); };
const stats = {};

for (const subj of Object.keys(LT.SUBJECTS)) {
  const S = LT.SUBJECTS[subj];
  const bank = LT.BANK[subj];
  // mỗi dạng phải sinh được ở nhiều hạt giống
  for (const part of ['mc', 'tf', 'sa']) {
    for (const g of bank[part]) {
      let okCount = 0;
      for (let s = 0; s < 60; s++) {
        try { if (g.gen(new LT.Rng('probe' + s + g.id))) okCount++; } catch (e) { /* */ }
      }
      if (okCount < 20) fail(`${g.id} (${g.topic}) chỉ sinh thành công ${okCount}/60 lần`);
    }
  }
  const sigs = new Set();
  let qCount = 0;
  const t0 = Date.now();
  for (let no = 1; no <= LT.EXAMS_PER_SUBJECT; no++) {
    const ex = LT.buildExam(subj, no);
    const ex2 = LT.buildExam(subj, no);
    if (JSON.stringify(ex) !== JSON.stringify(ex2)) fail(`${subj} đề ${no} không ổn định`);
    const cnt = { mc: 0, tf: 0, sa: 0 };
    ex.questions.forEach((q, i) => {
      cnt[q.part]++; qCount++;
      const where = `${subj} đề ${no} câu ${i + 1} (${q.gid})`;
      if (!q.q || /undefined|NaN|Infinity|\[object/.test(JSON.stringify(q))) fail(`${where}: nội dung lỗi: ${JSON.stringify(q).slice(0, 300)}`);
      if (q.part === 'mc') {
        if (q.opts.length !== 4) fail(`${where}: không đủ 4 phương án`);
        if (new Set(q.opts).size !== 4) fail(`${where}: phương án trùng: ${q.opts.join(' | ')}`);
        if (!(q.ans >= 0 && q.ans < 4)) fail(`${where}: đáp án sai chỉ số`);
      } else if (q.part === 'tf') {
        if (q.items.length !== 4) fail(`${where}: không đủ 4 ý`);
        q.items.forEach((it) => { if (typeof it.v !== 'boolean' || !it.s) fail(`${where}: ý lỗi`); });
      } else {
        if (typeof q.ans !== 'number' || !isFinite(q.ans)) fail(`${where}: đáp án không phải số`);
        // đáp án hiển thị phải tự chấm đúng
        const shown = LT.U.numF(q.ans, q.dp);
        if (!LT.shortCorrect(q, shown)) fail(`${where}: đáp án ${shown} tự chấm sai`);
        if (shown.replace(/[−,]/g, '').length > 6) fail(`${where}: đáp án quá dài (${shown})`);
      }
    });
    if (cnt.mc !== S.parts.mc || cnt.tf !== S.parts.tf || cnt.sa !== S.parts.sa) fail(`${subj} đề ${no}: sai cấu trúc ${JSON.stringify(cnt)}`);
    // chấm thử: làm đúng hết phải được 10 điểm
    const answers = ex.questions.map((q) => (q.part === 'mc' ? q.ans : q.part === 'tf' ? q.items.map((x) => x.v) : LT.U.numF(q.ans, q.dp)));
    const g = LT.grade(ex, answers);
    if (Math.abs(g.total - 10) > 1e-6) fail(`${subj} đề ${no}: làm đúng hết nhưng được ${g.total}`);
    const g0 = LT.grade(ex, []);
    if (g0.total !== 0) fail(`${subj} đề ${no}: bỏ trống mà được ${g0.total}`);
    sigs.add(ex.questions.map((q) => q.q).join('|'));
  }
  if (sigs.size !== LT.EXAMS_PER_SUBJECT) fail(`${subj}: có đề trùng nhau (${sigs.size} đề khác nhau)`);
  stats[subj] = { dạng_mc: bank.mc.length, dạng_tf: bank.tf.length, dạng_sa: bank.sa.length, câu: qCount, ms: Date.now() - t0 };
}

// chấm điểm Đúng/Sai từng mức
(() => {
  const ex = LT.buildExam('math', 1);
  const i = ex.questions.findIndex((q) => q.part === 'tf');
  const q = ex.questions[i];
  for (let k = 0; k <= 4; k++) {
    const arr = q.items.map((x, j) => (j < k ? x.v : !x.v));
    const ans = []; ans[i] = arr;
    const g = LT.grade(ex, ans);
    if (Math.abs(g.total - LT.TF_PTS[k]) > 1e-9) fail(`Điểm Đúng/Sai với ${k} ý đúng = ${g.total}`);
  }
  if (!LT.shortCorrect({ ans: 2.35, dp: 1 }, '2,4') && !LT.shortCorrect({ ans: 2.4, dp: 1 }, '2,4')) fail('parse 2,4');
  if (LT.shortCorrect({ ans: 12, dp: 0 }, '12a')) fail('nhận chuỗi rác');
  if (!LT.shortCorrect({ ans: -3, dp: 0 }, '−3')) fail('dấu trừ unicode');
})();

console.table(stats);
if (errors) { console.error(`\n${errors} lỗi.`); process.exit(1); }
console.log('\n✓ Tất cả đề hợp lệ.');
