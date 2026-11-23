/* Lõi: bộ sinh số ngẫu nhiên có hạt giống, định dạng số kiểu Việt Nam, tiện ích tạo câu hỏi. */
(function (G) {
  'use strict';
  const LT = (G.LT = G.LT || {});

  function hashStr(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  class Rng {
    constructor(seed) {
      this.r = mulberry32(typeof seed === 'string' ? hashStr(seed) : seed >>> 0);
    }
    next() { return this.r(); }
    int(a, b) { return a + Math.floor(this.r() * (b - a + 1)); }
    intNZ(a, b) { let v; do { v = this.int(a, b); } while (v === 0); return v; }
    pick(arr) { return arr[Math.floor(this.r() * arr.length)]; }
    bool(p) { return this.r() < (p == null ? 0.5 : p); }
    sign() { return this.r() < 0.5 ? -1 : 1; }
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(this.r() * (i + 1));
        const t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    sample(arr, k) { return this.shuffle(arr).slice(0, k); }
  }

  const MINUS = '−';

  /** Định dạng số theo kiểu Việt Nam: dấu phẩy thập phân, tối đa d chữ số sau dấu phẩy. */
  function num(x, d) {
    if (d == null) d = 4;
    if (!isFinite(x)) return String(x);
    let v = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
    if (Object.is(v, -0) || Math.abs(v) < 1e-12) v = 0;
    let s = Math.abs(v).toFixed(d);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    s = s.replace('.', ',');
    return (v < 0 ? MINUS : '') + s;
  }
  /** Số cố định d chữ số thập phân (không cắt số 0). */
  function numF(x, d) {
    let v = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
    if (Math.abs(v) < 1e-12) v = 0;
    const s = Math.abs(v).toFixed(d).replace('.', ',');
    return (v < 0 ? MINUS : '') + s;
  }
  /** Dạng khoa học: 1,23.10^5 */
  function sci(x, sig) {
    if (sig == null) sig = 3;
    if (x === 0) return '0';
    let e = Math.floor(Math.log10(Math.abs(x)));
    let m = x / Math.pow(10, e);
    m = Math.round(m * Math.pow(10, sig - 1)) / Math.pow(10, sig - 1);
    if (Math.abs(m) >= 10) { m /= 10; e += 1; }
    if (e === 0) return num(m, sig - 1);
    return num(m, sig - 1) + '.10<sup>' + (e < 0 ? MINUS + -e : e) + '</sup>';
  }

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }

  /** Phân số rút gọn dạng HTML. */
  function fr(p, q) {
    if (q === 0) throw new Error('chia 0');
    if (q < 0) { p = -p; q = -q; }
    const g = gcd(p, q); p /= g; q /= g;
    if (q === 1) return num(p);
    const s = p < 0 ? MINUS : '';
    return s + '<span class="fr"><span>' + Math.abs(p) + '</span><span>' + q + '</span></span>';
  }
  /** Phân số với tử/mẫu là chuỗi HTML tuỳ ý */
  function frs(top, bot) { return '<span class="fr"><span>' + top + '</span><span>' + bot + '</span></span>'; }

  function sup(n) { return '<sup>' + n + '</sup>'; }
  function sub(n) { return '<sub>' + n + '</sub>'; }

  /** Đa thức từ hệ số bậc cao → thấp. */
  function poly(coeffs, v) {
    v = v || 'x';
    const n = coeffs.length - 1;
    let out = '';
    coeffs.forEach((c, i) => {
      if (c === 0) return;
      const p = n - i;
      const abs = Math.abs(c);
      let body;
      const cStr = Number.isInteger(abs) ? String(abs) : num(abs);
      if (p === 0) body = cStr;
      else body = (abs === 1 ? '' : cStr) + v + (p > 1 ? sup(p) : '');
      if (out === '') out = (c < 0 ? MINUS : '') + body;
      else out += (c < 0 ? ' ' + MINUS + ' ' : ' + ') + body;
    });
    return out || '0';
  }
  /** " + 3" hoặc " − 3" (bỏ qua nếu 0) */
  function sg(n, withZero) {
    if (n === 0 && !withZero) return '';
    return n < 0 ? ' ' + MINUS + ' ' + num(-n) : ' + ' + num(n);
  }
  /** (x − a) với a có dấu */
  function xm(a, v) {
    v = v || 'x';
    if (a === 0) return v;
    return '(' + v + (a > 0 ? ' ' + MINUS + ' ' + a : ' + ' + -a) + ')';
  }
  function vec(a) { return '(' + a.map((x) => num(x)).join('; ') + ')'; }

  function C(n, k) { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); }
  function A(n, k) { let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; }
  function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  function round(x, d) { const p = Math.pow(10, d); return Math.round(x * p + (x >= 0 ? 1e-9 : -1e-9)) / p; }

  /** Ghép phương án đúng (đầu tiên) + các nhiễu duy nhất. */
  function opts(correct, cands) {
    const o = [correct];
    for (const c of cands) {
      if (o.length === 4) break;
      if (c != null && o.indexOf(c) < 0) o.push(c);
    }
    if (o.length < 4) throw new Error('Không đủ phương án nhiễu');
    return o;
  }
  /** Phương án số: định dạng bằng f, tự loại trùng. */
  function numOpts(correct, cands, f) {
    f = f || ((x) => num(x));
    return opts(f(correct), cands.filter((c) => isFinite(c)).map(f));
  }

  /** Mệnh đề Đúng/Sai: chọn ngẫu nhiên đưa giá trị đúng hoặc sai vào câu. */
  function claim(r, textFn, right, wrong, sol) {
    if (textFn(right) === textFn(wrong)) throw new Error('Mệnh đề đúng/sai trùng nhau');
    const v = r.bool();
    return { s: textFn(v ? right : wrong), v: v, sol: sol };
  }

  /* Ngân hàng dạng bài: LT.BANK[môn][phần] = [{id, topic, kind, gen(r)}] */
  LT.BANK = LT.BANK || {};
  LT.TOPICS = LT.TOPICS || {};
  LT.KNOW = LT.KNOW || {};
  LT.add = function (subj, part, topic, gen, kind) {
    const b = (LT.BANK[subj] = LT.BANK[subj] || { mc: [], tf: [], sa: [] });
    const t = (LT.TOPICS[subj] = LT.TOPICS[subj] || []);
    if (t.indexOf(topic) < 0) t.push(topic);
    b[part].push({ id: subj + '.' + part + '.' + b[part].length, topic: topic, kind: kind || 'calc', gen: gen });
  };
  /** Ngân hàng câu lí thuyết: mỗi mục {t: chủ đề, q, a: đáp án đúng, d: [3 nhiễu], kn: kiến thức} */
  LT.addConcepts = function (subj, list) {
    list.forEach((c) => {
      LT.add(subj, 'mc', c.t, () => ({ q: c.q, opts: [c.a].concat(c.d), kn: c.kn, sol: c.sol || ('Đáp án đúng: <b>' + c.a + '</b>.') }), 'concept');
    });
  };
  /** Tóm tắt kiến thức trọng tâm theo chủ đề (dùng cho nhận xét). */
  LT.addKnow = function (subj, map) { LT.KNOW[subj] = Object.assign(LT.KNOW[subj] || {}, map); };

  LT.Rng = Rng;
  LT.hashStr = hashStr;
  LT.U = { num, numF, sci, gcd, fr, frs, sup, sub, poly, sg, xm, vec, C, A, fact, round, opts, numOpts, claim, MINUS };
})(typeof window !== 'undefined' ? window : globalThis);
