/* Ngân hàng dạng bài môn TOÁN – theo cấu trúc đề thi tốt nghiệp THPT từ năm 2025 (CT GDPT 2018).
   Mỗi dạng là một hàm sinh câu hỏi có tham số ngẫu nhiên, kèm kiến thức và lời giải. */
(function (G) {
  'use strict';
  const LT = G.LT;
  const { num, numF, fr, frs, sup, poly, sg, xm, vec, C, A, round, opts, numOpts, claim, MINUS } = LT.U;
  const S = 'math';
  const add = (part, topic, gen) => LT.add(S, part, topic, gen);

  const T = {
    don: 'Tính đơn điệu & cực trị',
    gtln: 'GTLN – GTNN',
    tc: 'Tiệm cận & đồ thị',
    mu: 'Mũ – Logarit',
    lg: 'Lượng giác',
    day: 'Dãy số – Cấp số',
    gh: 'Giới hạn – Đạo hàm',
    ng: 'Nguyên hàm',
    tp: 'Tích phân & ứng dụng',
    hkg: 'Hình học không gian',
    vt: 'Vectơ & toạ độ Oxyz',
    mp: 'Phương trình mặt phẳng',
    dt: 'Phương trình đường thẳng',
    mc: 'Phương trình mặt cầu',
    th: 'Tổ hợp',
    xs: 'Xác suất',
    tk: 'Thống kê mẫu ghép nhóm',
  };
  // Thứ tự chủ đề (giống thứ tự xuất hiện trong đề)
  Object.values(T).forEach((t) => (LT.TOPICS[S] = LT.TOPICS[S] || []).indexOf(t) < 0 && LT.TOPICS[S].push(t));

  LT.addKnow(S, {
    [T.don]: 'Xét dấu f\'(x): f\'(x) > 0 trên khoảng K ⇒ f đồng biến trên K; f\'(x) < 0 ⇒ nghịch biến. f\'(x) đổi dấu khi qua x₀ thì x₀ là điểm cực trị (đổi từ + sang − là cực đại, − sang + là cực tiểu). Nghiệm bội chẵn của f\'(x) không làm f\' đổi dấu.',
    [T.gtln]: 'Tìm GTLN – GTNN của hàm liên tục trên đoạn [a; b]: tính f tại a, b và tại các nghiệm của f\'(x) = 0 thuộc (a; b), rồi so sánh.',
    [T.tc]: 'Hàm y = (ax + b)/(cx + d) (c ≠ 0, ad − bc ≠ 0) có tiệm cận đứng x = −d/c và tiệm cận ngang y = a/c.',
    [T.mu]: 'log_a b = c ⇔ a^c = b (0 < a ≠ 1, b > 0). log_a(xy) = log_a x + log_a y; log_a x^n = n·log_a x. Với a > 1: a^u < a^v ⇔ u < v; với 0 < a < 1 bất đẳng thức đổi chiều.',
    [T.lg]: 'cos x = cos α ⇔ x = ±α + k2π; sin x = sin α ⇔ x = α + k2π hoặc x = π − α + k2π; tan x = tan α ⇔ x = α + kπ.',
    [T.day]: 'Cấp số cộng: uₙ = u₁ + (n − 1)d, Sₙ = n(u₁ + uₙ)/2. Cấp số nhân: uₙ = u₁·qⁿ⁻¹, Sₙ = u₁(1 − qⁿ)/(1 − q) (q ≠ 1).',
    [T.gh]: 'Giới hạn hàm phân thức tại vô cực: chia tử và mẫu cho luỹ thừa cao nhất của x. Đạo hàm: (xⁿ)\' = n·xⁿ⁻¹, (u + v)\' = u\' + v\'.',
    [T.ng]: '∫xⁿdx = xⁿ⁺¹/(n + 1) + C (n ≠ −1); ∫eᵏˣdx = eᵏˣ/k + C; ∫sin kx dx = −cos kx / k + C; ∫cos kx dx = sin kx / k + C.',
    [T.tp]: '∫ₐᵇ f(x)dx = F(b) − F(a). Diện tích hình phẳng giới hạn bởi y = f(x), y = g(x), x = a, x = b: S = ∫ₐᵇ |f(x) − g(x)|dx. Thể tích vật tròn xoay quanh Ox: V = π∫ₐᵇ f²(x)dx. Quãng đường: s = ∫v(t)dt.',
    [T.hkg]: 'V(chóp) = (1/3)·B·h; V(lăng trụ) = B·h, với B là diện tích đáy, h là chiều cao.',
    [T.vt]: 'Với a = (a₁; a₂; a₃), b = (b₁; b₂; b₃): a·b = a₁b₁ + a₂b₂ + a₃b₃; |a| = √(a₁² + a₂² + a₃²); a ⊥ b ⇔ a·b = 0; AB = (x_B − x_A; y_B − y_A; z_B − z_A).',
    [T.mp]: 'Mặt phẳng qua M(x₀; y₀; z₀) có vectơ pháp tuyến n = (A; B; C): A(x − x₀) + B(y − y₀) + C(z − z₀) = 0. Khoảng cách từ M đến (P): Ax + By + Cz + D = 0 là |Ax₀ + By₀ + Cz₀ + D|/√(A² + B² + C²).',
    [T.dt]: 'Đường thẳng qua M(x₀; y₀; z₀) có vectơ chỉ phương u = (a; b; c): x = x₀ + at, y = y₀ + bt, z = z₀ + ct.',
    [T.mc]: 'Mặt cầu tâm I(a; b; c), bán kính R: (x − a)² + (y − b)² + (z − c)² = R². Dạng x² + y² + z² − 2ax − 2by − 2cz + d = 0 có R = √(a² + b² + c² − d).',
    [T.th]: 'Hoán vị Pₙ = n!; chỉnh hợp Aₙᵏ = n!/(n − k)! (có thứ tự); tổ hợp Cₙᵏ = n!/(k!(n − k)!) (không thứ tự). Quy tắc nhân cho các công đoạn liên tiếp.',
    [T.xs]: 'P(A) = n(A)/n(Ω). Xác suất có điều kiện P(A|B) = P(AB)/P(B). Công thức xác suất toàn phần: P(B) = P(A)P(B|A) + P(Ā)P(B|Ā). Công thức Bayes: P(A|B) = P(A)P(B|A)/P(B).',
    [T.tk]: 'Mẫu ghép nhóm: khoảng biến thiên R = (đầu mút phải nhóm cuối) − (đầu mút trái nhóm đầu); số trung bình x̄ = Σnᵢxᵢ/n (xᵢ là giá trị đại diện); phương sai s² = Σnᵢxᵢ²/n − x̄²; khoảng tứ phân vị ΔQ = Q₃ − Q₁.',
  });

  /* ---------- Hàm bậc ba có cực trị nguyên ---------- */
  function cubic(r) {
    // y = x³ − (3/2)(x1+x2)x² + 3x1x2·x + d,  y' = 3(x − x1)(x − x2)
    let x1, x2;
    do { x1 = r.int(-4, 3); x2 = x1 + 2 * r.int(1, 2); } while (x2 > 5);
    const b = (-3 * (x1 + x2)) / 2, c = 3 * x1 * x2, d = r.int(-5, 5);
    const f = (x) => x * x * x + b * x * x + c * x + d;
    return { x1, x2, b, c, d, f, s: poly([1, b, c, d]), dp: poly([3, 2 * b, c]) };
  }
  const iv = (a, b) => '(' + a + '; ' + b + ')';
  const ninf = MINUS + '∞', pinf = '+∞';

  add('mc', T.don, (r) => {
    const k = cubic(r);
    const dec = r.bool();
    return {
      q: `Hàm số y = ${k.s} ${dec ? 'nghịch biến' : 'đồng biến'} trên khoảng nào dưới đây?`,
      opts: dec
        ? opts(iv(k.x1, k.x2), [iv(ninf, k.x1), iv(k.x2, pinf), iv(k.x1, pinf), iv(ninf, k.x2)])
        : opts(iv(k.x2, pinf), [iv(k.x1, k.x2), iv(ninf, k.x2), iv(k.x1, pinf)]),
      sol: `y' = ${k.dp} = 3${xm(k.x1)}${xm(k.x2)}. y' < 0 ⇔ ${k.x1} < x < ${k.x2}; y' > 0 ⇔ x < ${k.x1} hoặc x > ${k.x2}. Vậy hàm số nghịch biến trên ${iv(k.x1, k.x2)}, đồng biến trên ${iv(ninf, k.x1)} và ${iv(k.x2, pinf)}.`,
    };
  });

  add('mc', T.don, (r) => {
    const k = cubic(r);
    const askMax = r.bool();
    const yc = k.f(k.x1), yt = k.f(k.x2);
    const ans = askMax ? yc : yt;
    return {
      q: `Giá trị ${askMax ? 'cực đại' : 'cực tiểu'} của hàm số y = ${k.s} bằng`,
      opts: numOpts(ans, [askMax ? yt : yc, askMax ? k.x1 : k.x2, askMax ? k.x2 : k.x1, ans + 2, -ans]),
      sol: `y' = 3${xm(k.x1)}${xm(k.x2)} = 0 ⇔ x = ${k.x1} hoặc x = ${k.x2}. Hệ số a = 1 > 0 nên hàm đạt cực đại tại x = ${k.x1} (y = ${num(yc)}) và cực tiểu tại x = ${k.x2} (y = ${num(yt)}). Đáp án: ${num(ans)}.`,
    };
  });

  add('mc', T.don, (r) => {
    const roots = r.sample([-3, -2, -1, 0, 1, 2, 3, 4], 3).sort((a, b) => a - b);
    const ex = roots.map(() => r.int(1, 4));
    const cnt = ex.filter((e) => e % 2 === 1).length;
    const expr = roots.map((a, i) => xm(a) + (ex[i] > 1 ? sup(ex[i]) : '')).join('');
    const expr2 = expr.replace(/^\(x\)/, 'x');
    return {
      q: `Cho hàm số f(x) có đạo hàm f'(x) = ${expr2} với mọi x ∈ ℝ. Số điểm cực trị của hàm số f(x) là`,
      opts: numOpts(cnt, [3, 2, 1, 0, 4].filter((v) => v !== cnt)),
      sol: `f'(x) chỉ đổi dấu khi đi qua nghiệm bội lẻ. Các nghiệm ${roots.map((a, i) => 'x = ' + a + ' (bội ' + ex[i] + ')').join(', ')}. Số nghiệm bội lẻ là ${cnt} ⇒ hàm số có ${cnt} điểm cực trị.`,
    };
  });

  add('mc', T.gtln, (r) => {
    const k = r.int(1, 3), m = k * k, d = r.int(-4, 6);
    const f = (x) => x * x * x - 3 * m * x + d;
    const lo = r.int(-k - 2, 0), hi = r.int(k, k + 2);
    const pts = [lo, hi, -k, k].filter((x) => x >= lo && x <= hi);
    const vals = pts.map(f);
    const askMax = r.bool();
    const ans = askMax ? Math.max(...vals) : Math.min(...vals);
    const other = askMax ? Math.min(...vals) : Math.max(...vals);
    return {
      q: `${askMax ? 'Giá trị lớn nhất' : 'Giá trị nhỏ nhất'} của hàm số y = ${poly([1, 0, -3 * m, d])} trên đoạn [${lo}; ${hi}] bằng`,
      opts: numOpts(ans, [other, f(lo), f(hi), f(k), f(-k), ans + 1, ans - 1]),
      sol: `y' = 3x² − ${3 * m} = 0 ⇔ x = ±${k}. Tính: ${pts.map((x) => 'y(' + x + ') = ' + num(f(x))).join('; ')}. Vậy ${askMax ? 'max' : 'min'} = ${num(ans)}.`,
    };
  });

  add('mc', T.tc, (r) => {
    let a, c, d, b;
    do { c = r.pick([1, 1, 2]); a = c * r.intNZ(-3, 3); d = c * r.intNZ(-4, 4); b = r.int(-5, 5); } while (a * d - b * c === 0);
    const tcd = -d / c, tcn = a / c;
    const f = (u, v) => `x = ${num(u)} và y = ${num(v)}`;
    return {
      q: `Đồ thị hàm số y = ${frs(poly([a, b]), poly([c, d]))} có đường tiệm cận đứng và tiệm cận ngang lần lượt là`,
      opts: opts(f(tcd, tcn), [f(-tcd, tcn), f(tcn, tcd), f(tcd, -tcn), f(-tcd, -tcn)]),
      sol: `Tiệm cận đứng: cx + d = 0 ⇔ x = ${num(tcd)}. Tiệm cận ngang: y = a/c = ${num(tcn)}.`,
    };
  });

  add('mc', T.tc, (r) => {
    // Đọc số giao điểm của đồ thị bậc ba với đường thẳng y = m
    const k = cubic(r);
    const yc = k.f(k.x1), yt = k.f(k.x2);
    const m = r.pick([yt - 1, yt, Math.round((yc + yt) / 2), yc, yc + 1]);
    const cnt = m > yc || m < yt ? 1 : m === yc || m === yt ? 2 : 3;
    return {
      q: `Số giao điểm của đồ thị hàm số y = ${k.s} với đường thẳng y = ${num(m)} là`,
      opts: numOpts(cnt, [0, 1, 2, 3].filter((v) => v !== cnt)),
      sol: `y' = 3${xm(k.x1)}${xm(k.x2)}; y_CĐ = y(${k.x1}) = ${num(yc)}, y_CT = y(${k.x2}) = ${num(yt)}. Đường thẳng y = ${num(m)} ${cnt === 3 ? 'nằm giữa y_CT và y_CĐ nên cắt đồ thị tại 3 điểm' : cnt === 2 ? 'đi qua một điểm cực trị nên có 2 giao điểm' : 'nằm ngoài đoạn [y_CT; y_CĐ] nên chỉ cắt tại 1 điểm'}.`,
    };
  });

  /* ---------- Mũ – Logarit ---------- */
  add('mc', T.mu, (r) => {
    const a = r.pick([2, 3, 5]), k = r.int(1, a === 5 ? 2 : 3), bcoef = r.pick([1, 2]);
    const pw = Math.pow(a, k);
    let c;
    do { c = r.int(-6, 6); } while ((pw - c) % bcoef !== 0 || (pw - c) / bcoef === 0);
    const x = (pw - c) / bcoef;
    return {
      q: `Nghiệm của phương trình log<sub>${a}</sub>(${poly([bcoef, c])}) = ${k} là`,
      opts: numOpts(x, [(pw + c) / bcoef, (a * k - c) / bcoef, x + 1, x - 1, -x]),
      sol: `Điều kiện ${poly([bcoef, c])} > 0. Phương trình ⇔ ${poly([bcoef, c])} = ${a}${sup(k)} = ${pw} ⇔ x = ${num(x)} (thoả điều kiện).`,
    };
  });

  add('mc', T.mu, (r) => {
    const base = r.pick([2, 3, '1/2', '1/3']);
    const inc = base === 2 || base === 3;
    const p = r.int(-3, 3), q = r.int(-2, 4);
    const bstr = inc ? String(base) : '(' + fr(1, base === '1/2' ? 2 : 3) + ')';
    const rhs = p + q;
    const right = inc ? `(${ninf}; ${rhs})` : `(${rhs}; ${pinf})`;
    const wrong = inc ? `(${rhs}; ${pinf})` : `(${ninf}; ${rhs})`;
    return {
      q: `Tập nghiệm của bất phương trình ${bstr}${sup('x' + (p ? sg(-p).replace(/ /g, '') : ''))} &lt; ${bstr}${sup(q)} là`,
      opts: opts(right, [wrong, inc ? `(${ninf}; ${q - p})` : `(${q - p}; ${pinf})`, inc ? `(${q - p}; ${pinf})` : `(${ninf}; ${q - p})`, `(${ninf}; ${rhs + 1})`]),
      sol: `Cơ số ${inc ? base + ' > 1 nên giữ nguyên chiều' : 'thuộc (0; 1) nên đổi chiều'} bất phương trình: x ${p ? sg(-p) : ''} ${inc ? '&lt;' : '&gt;'} ${q} ⇔ x ${inc ? '&lt;' : '&gt;'} ${rhs}. Tập nghiệm ${right}.`,
    };
  });

  add('mc', T.mu, (r) => {
    const a = r.pick([2, 3, 5, 7]), m = r.int(2, 9), p = r.int(1, 3), q = r.int(2, 3);
    const ansExpr = (u, v) => (u ? u + ' + ' : '') + (v === 1 ? '' : v) + 'b';
    return {
      q: `Cho log<sub>${a}</sub>${m} = b. Khi đó log<sub>${a}</sub>(${a}${sup(p)}·${m}${sup(q)}) bằng`,
      opts: opts(ansExpr(p, q), [ansExpr(q, p), p + q + 'b', ansExpr(p * a, q), ansExpr(0, p * q)]),
      sol: `log<sub>${a}</sub>(${a}${sup(p)}·${m}${sup(q)}) = log<sub>${a}</sub>${a}${sup(p)} + log<sub>${a}</sub>${m}${sup(q)} = ${p} + ${q}·log<sub>${a}</sub>${m} = ${ansExpr(p, q)}.`,
    };
  });

  /* ---------- Lượng giác ---------- */
  const TRIG = [
    { eq: 'cos x = ' + fr(1, 2), ok: 'x = ±' + frs('π', 3) + ' + k2π', bad: ['x = ±' + frs('π', 6) + ' + k2π', 'x = ' + frs('π', 3) + ' + kπ', 'x = ±' + frs('2π', 3) + ' + k2π'] },
    { eq: 'sin x = ' + fr(1, 2), ok: 'x = ' + frs('π', 6) + ' + k2π, x = ' + frs('5π', 6) + ' + k2π', bad: ['x = ±' + frs('π', 6) + ' + k2π', 'x = ' + frs('π', 3) + ' + k2π, x = ' + frs('2π', 3) + ' + k2π', 'x = ' + frs('π', 6) + ' + kπ'] },
    { eq: 'tan x = 1', ok: 'x = ' + frs('π', 4) + ' + kπ', bad: ['x = ' + frs('π', 4) + ' + k2π', 'x = ±' + frs('π', 4) + ' + k2π', 'x = ' + frs('π', 2) + ' + kπ'] },
    { eq: 'cos x = 0', ok: 'x = ' + frs('π', 2) + ' + kπ', bad: ['x = kπ', 'x = k2π', 'x = ' + frs('π', 2) + ' + k2π'] },
    { eq: 'sin x = 0', ok: 'x = kπ', bad: ['x = k2π', 'x = ' + frs('π', 2) + ' + kπ', 'x = ' + frs('π', 2) + ' + k2π'] },
    { eq: 'cos x = −1', ok: 'x = π + k2π', bad: ['x = kπ', 'x = ' + frs('π', 2) + ' + kπ', 'x = k2π'] },
    { eq: 'sin x = 1', ok: 'x = ' + frs('π', 2) + ' + k2π', bad: ['x = ' + frs('π', 2) + ' + kπ', 'x = π + k2π', 'x = k2π'] },
    { eq: 'cos 2x = 1', ok: 'x = kπ', bad: ['x = k2π', 'x = ' + frs('kπ', 2), 'x = ' + frs('π', 2) + ' + kπ'] },
    { eq: 'tan x = √3', ok: 'x = ' + frs('π', 3) + ' + kπ', bad: ['x = ' + frs('π', 6) + ' + kπ', 'x = ' + frs('π', 3) + ' + k2π', 'x = ±' + frs('π', 3) + ' + k2π'] },
  ];
  add('mc', T.lg, (r) => {
    const t = r.pick(TRIG);
    return { q: `Nghiệm của phương trình ${t.eq} là (k ∈ ℤ)`, opts: opts(t.ok, t.bad), sol: `Áp dụng công thức nghiệm của phương trình lượng giác cơ bản: ${t.eq} ⇔ ${t.ok} (k ∈ ℤ).` };
  });
  add('mc', T.lg, (r) => {
    const sinv = r.pick([[3, 5], [4, 5], [5, 13], [12, 13], [8, 17]]);
    const [p, h] = sinv;
    const cs = Math.round(Math.sqrt(h * h - p * p));
    const q2 = r.bool();
    // α ∈ (π/2; π) → cos < 0
    const ansCos = fr(-cs, h);
    if (q2) {
      return {
        q: `Cho sin α = ${fr(p, h)} với ${frs('π', 2)} &lt; α &lt; π. Giá trị của cos α là`,
        opts: opts(ansCos, [fr(cs, h), fr(-p, h), fr(p, cs)]),
        sol: `cos²α = 1 − sin²α = 1 − ${fr(p * p, h * h)} = ${fr(cs * cs, h * h)}. Vì α thuộc góc phần tư thứ II nên cos α &lt; 0 ⇒ cos α = ${ansCos}.`,
      };
    }
    const tanv = fr(-p, cs);
    return {
      q: `Cho sin α = ${fr(p, h)} với ${frs('π', 2)} &lt; α &lt; π. Giá trị của tan α là`,
      opts: opts(tanv, [fr(p, cs), fr(-cs, p), fr(cs, p)]),
      sol: `cos α = −√(1 − sin²α) = ${ansCos} (góc phần tư II). tan α = sin α / cos α = ${tanv}.`,
    };
  });

  /* ---------- Dãy số, cấp số ---------- */
  add('mc', T.day, (r) => {
    if (r.bool()) {
      const u1 = r.int(-5, 8), d = r.intNZ(-4, 5), n = r.int(8, 20);
      const un = u1 + (n - 1) * d, Sn = (n * (u1 + un)) / 2;
      const askS = r.bool();
      const ans = askS ? Sn : un;
      return {
        q: `Cho cấp số cộng (uₙ) có u₁ = ${u1} và công sai d = ${d}. ${askS ? 'Tổng ' + n + ' số hạng đầu S' + '<sub>' + n + '</sub>' : 'Số hạng u<sub>' + n + '</sub>'} bằng`,
        opts: numOpts(ans, askS ? [n * (u1 + u1 + n * d) / 2, Sn + d * n, n * un, Sn - u1] : [u1 + n * d, un - d, u1 * Math.pow(1, n) + n * d + d, un + 2 * d]),
        sol: askS ? `u<sub>${n}</sub> = u₁ + ${n - 1}d = ${un}; S<sub>${n}</sub> = ${n}(u₁ + u<sub>${n}</sub>)/2 = ${n}·(${u1} + ${un})/2 = ${Sn}.` : `u<sub>${n}</sub> = u₁ + (${n} − 1)d = ${u1} + ${n - 1}·${d < 0 ? '(' + d + ')' : d} = ${un}.`,
      };
    }
    const u1 = r.pick([1, 2, 3, -1, -2]), q = r.pick([2, -2, 3]), n = r.int(4, 7);
    const un = u1 * Math.pow(q, n - 1);
    return {
      q: `Cho cấp số nhân (uₙ) có u₁ = ${u1} và công bội q = ${q}. Số hạng u<sub>${n}</sub> bằng`,
      opts: numOpts(un, [u1 * Math.pow(q, n), u1 * Math.pow(q, n - 2), u1 + (n - 1) * q, -un]),
      sol: `u<sub>${n}</sub> = u₁·q<sup>${n - 1}</sup> = ${u1}·(${q})<sup>${n - 1}</sup> = ${un}.`,
    };
  });

  /* ---------- Giới hạn – Đạo hàm ---------- */
  add('mc', T.gh, (r) => {
    if (r.bool()) {
      const a = r.intNZ(-6, 6), c = r.intNZ(1, 4), b = r.int(-5, 5), d = r.int(-5, 5);
      const ans = fr(a, c);
      return {
        q: `lim<sub>x→+∞</sub> ${frs(poly([a, b, 1]), poly([c, 0, d]))} bằng`,
        opts: opts(ans, [fr(c, a), fr(b, c), '+∞', fr(1, d || 7), '0']),
        sol: `Chia tử và mẫu cho x²: giới hạn bằng tỉ số hệ số của x² là ${a}/${c} = ${ans}.`,
      };
    }
    const a = r.intNZ(-5, 5);
    return {
      q: `lim<sub>x→${a}</sub> ${frs('x² ' + MINUS + ' ' + a * a, poly([1, -a]))} bằng`,
      opts: numOpts(2 * a, [a, 0, -2 * a, a * a, 2 * a + 1]),
      sol: `x² − ${a * a} = ${xm(a)}${xm(-a)} nên biểu thức bằng x ${sg(a)} khi x ≠ ${a}. Giới hạn = ${a} ${sg(a)} = ${2 * a}.`,
    };
  });
  add('mc', T.gh, (r) => {
    const a = r.intNZ(-3, 3), b = r.int(-4, 4), c = r.int(-5, 5), x0 = r.int(-2, 2);
    const fp = (x) => 3 * a * x * x + 2 * b * x + c;
    const ans = fp(x0);
    return {
      q: `Cho hàm số f(x) = ${poly([a, b, c, r.int(-3, 3)])}. Giá trị f'(${x0}) bằng`,
      opts: numOpts(ans, [a * x0 * x0 * x0 + b * x0 * x0 + c * x0, 6 * a * x0 + 2 * b, ans + 2, ans - 3, -ans]),
      sol: `f'(x) = ${poly([3 * a, 2 * b, c])} ⇒ f'(${x0}) = ${ans}.`,
    };
  });

  /* ---------- Nguyên hàm ---------- */
  add('mc', T.ng, (r) => {
    const a = r.intNZ(-3, 3), b = r.int(-4, 4), c = r.intNZ(-5, 5);
    const F = poly([a, b, c, 0]) + ' + C';
    return {
      q: `Họ nguyên hàm của hàm số f(x) = ${poly([3 * a, 2 * b, c])} là`,
      opts: opts(F, [poly([6 * a, 2 * b, 0]) + ' + C', poly([3 * a, 2 * b, c, 0]) + ' + C', poly([a, 2 * b, c, 0]) + ' + C', poly([a, b, 0, 0]) + ' + C']),
      sol: `∫(${poly([3 * a, 2 * b, c])})dx = ${3 * a}·x³/3 + ${2 * b}·x²/2 + ${c}x + C = ${F}.`,
    };
  });
  add('mc', T.ng, (r) => {
    const k = r.int(2, 5);
    const kind = r.int(0, 2);
    if (kind === 0) {
      return {
        q: `Họ nguyên hàm của hàm số f(x) = e<sup>${k}x</sup> là`,
        opts: opts(frs('1', k) + 'e<sup>' + k + 'x</sup> + C', [k + 'e<sup>' + k + 'x</sup> + C', 'e<sup>' + k + 'x</sup> + C', frs('1', k + 1) + 'e<sup>' + (k + 1) + 'x</sup> + C']),
        sol: `∫e<sup>kx</sup>dx = e<sup>kx</sup>/k + C với k = ${k}.`,
      };
    }
    if (kind === 1) {
      return {
        q: `Họ nguyên hàm của hàm số f(x) = sin ${k}x là`,
        opts: opts(MINUS + frs('1', k) + 'cos ' + k + 'x + C', [frs('1', k) + 'cos ' + k + 'x + C', MINUS + k + 'cos ' + k + 'x + C', k + 'cos ' + k + 'x + C']),
        sol: `∫sin kx dx = −cos kx / k + C với k = ${k}.`,
      };
    }
    return {
      q: `Họ nguyên hàm của hàm số f(x) = cos ${k}x là`,
      opts: opts(frs('1', k) + 'sin ' + k + 'x + C', [MINUS + frs('1', k) + 'sin ' + k + 'x + C', k + 'sin ' + k + 'x + C', MINUS + k + 'sin ' + k + 'x + C']),
      sol: `∫cos kx dx = sin kx / k + C với k = ${k}.`,
    };
  });
  add('mc', T.ng, (r) => {
    const k = r.int(2, 5);
    return {
      q: `Nguyên hàm F(x) của hàm số f(x) = ${poly([2 * k, 0])} thoả mãn F(0) = ${k} là`,
      opts: opts('F(x) = ' + poly([k, 0, k]), ['F(x) = ' + poly([k, 0, 0]), 'F(x) = ' + poly([2 * k, 0, k]), 'F(x) = ' + poly([k, 0, -k]), 'F(x) = ' + poly([2 * k, k])]),
      sol: `F(x) = ∫${2 * k}x dx = ${k}x² + C. F(0) = C = ${k} ⇒ F(x) = ${poly([k, 0, k])}.`,
    };
  });

  /* ---------- Tích phân & ứng dụng ---------- */
  add('mc', T.tp, (r) => {
    const a = r.int(0, 1), b = r.int(2, 3), p = r.intNZ(-3, 3), q = r.int(-4, 4);
    const F = (x) => p * x * x * x + q * x; // f = 3p x² + q
    const ans = F(b) - F(a);
    return {
      q: `Tích phân ∫<sub>${a}</sub><sup>${b}</sup>(${poly([3 * p, 0, q])})dx bằng`,
      opts: numOpts(ans, [ans + q, F(b) + F(a), 3 * p * b * b + q - (3 * p * a * a + q), ans * 2, -ans]),
      sol: `∫(${poly([3 * p, 0, q])})dx = ${poly([p, 0, q, 0])}. Giá trị = F(${b}) − F(${a}) = ${F(b)} − ${F(a)} = ${ans}.`,
    };
  });
  add('mc', T.tp, (r) => {
    const A1 = r.int(-3, 6), B1 = r.int(-4, 5), m = r.intNZ(-3, 3), n = r.intNZ(-3, 3), c = r.int(0, 3), len = r.int(1, 3);
    const ans = m * A1 + n * B1 + c * len;
    const fx = (m === 1 ? '' : m === -1 ? MINUS : m) + 'f(x)' + (n < 0 ? ' ' + MINUS + ' ' + (n === -1 ? '' : -n) : ' + ' + (n === 1 ? '' : n)) + 'g(x)' + (c ? ' + ' + c : '');
    return {
      q: `Cho ∫<sub>0</sub><sup>${len}</sup>f(x)dx = ${A1} và ∫<sub>0</sub><sup>${len}</sup>g(x)dx = ${B1}. Khi đó ∫<sub>0</sub><sup>${len}</sup>[${fx}]dx bằng`,
      opts: numOpts(ans, [m * A1 + n * B1 + c, m * A1 - n * B1 + c * len, ans + len, A1 + B1 + c * len, ans - 1]),
      sol: `Tính chất tuyến tính: = ${m}·${A1} + (${n})·${B1}${c ? ' + ' + c + '·' + len : ''} = ${ans}.`,
    };
  });
  add('mc', T.tp, (r) => {
    const k = r.int(1, 6);
    return {
      q: `Diện tích hình phẳng giới hạn bởi parabol y = x² và đường thẳng y = ${k === 1 ? '' : k}x bằng`,
      opts: opts(fr(k * k * k, 6), [fr(k * k * k, 3), fr(k * k * k, 2), fr(k * k, 6), fr(k * k * k * 5, 6)]),
      sol: `Hoành độ giao điểm: x² = ${k}x ⇔ x = 0 hoặc x = ${k}. S = ∫<sub>0</sub><sup>${k}</sup>(${k}x − x²)dx = ${k}·${k}²/2 − ${k}³/3 = ${fr(k * k * k, 6)}.`,
    };
  });
  add('mc', T.tp, (r) => {
    const a = r.int(1, 4);
    const kind = r.int(0, 2);
    const data = [
      { f: '√x', v: [a * a, 2], wrong: [[a * a, 1], [a * a * a, 3], [a, 2]] },
      { f: 'x', v: [a * a * a, 3], wrong: [[a * a, 2], [a * a * a, 2], [a * a * a, 1]] },
      { f: 'x²', v: [Math.pow(a, 5), 5], wrong: [[a * a * a, 3], [Math.pow(a, 5), 3], [Math.pow(a, 4), 4]] },
    ][kind];
    const s = (p) => (p[1] / LT.U.gcd(p[0], p[1]) === 1 ? num(p[0] / p[1]) + 'π' : frs((p[0] / LT.U.gcd(p[0], p[1])) + 'π', p[1] / LT.U.gcd(p[0], p[1])));
    return {
      q: `Thể tích khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi y = ${data.f}, y = 0, x = 0, x = ${a} quanh trục Ox là`,
      opts: opts(s(data.v), data.wrong.map(s).concat([s([data.v[0] * 2, data.v[1]])])),
      sol: `V = π∫<sub>0</sub><sup>${a}</sup>(${data.f})²dx = ${s(data.v)}.`,
    };
  });

  /* ---------- Hình học không gian ---------- */
  add('mc', T.hkg, (r) => {
    const k = r.int(1, 4), type = r.int(0, 2);
    const ka = (n, d) => (d === 1 ? (n === 1 ? '' : n) + 'a³' : frs((n === 1 ? '' : n) + 'a³', d));
    const simp = (n, d) => { const g = LT.U.gcd(n, d); return ka(n / g, d / g); };
    if (type === 0) {
      return {
        q: `Cho hình chóp S.ABCD có đáy là hình vuông cạnh a, SA vuông góc với đáy và SA = ${k === 1 ? '' : k}a. Thể tích khối chóp S.ABCD bằng`,
        opts: opts(simp(k, 3), [simp(k, 1), simp(k, 6), simp(k, 2), simp(k + 1, 3)]),
        sol: `V = (1/3)·S<sub>ABCD</sub>·SA = (1/3)·a²·${k === 1 ? '' : k}a = ${simp(k, 3)}.`,
      };
    }
    if (type === 1) {
      return {
        q: `Cho khối lăng trụ đứng ABC.A'B'C' có đáy là tam giác vuông cân tại A, AB = a và AA' = ${k === 1 ? '' : k}a. Thể tích khối lăng trụ bằng`,
        opts: opts(simp(k, 2), [simp(k, 6), simp(k, 1), simp(k, 3), simp(k * 2, 3)]),
        sol: `S<sub>ABC</sub> = a²/2; V = S<sub>ABC</sub>·AA' = (a²/2)·${k === 1 ? '' : k}a = ${simp(k, 2)}.`,
      };
    }
    return {
      q: `Một khối hộp chữ nhật có ba kích thước a, ${k + 1}a, ${k === 1 ? '' : k}a. Thể tích khối hộp bằng`,
      opts: opts(simp(k * (k + 1), 1), [simp(k * (k + 1), 3), simp(k + k + 1, 1), simp(k * (k + 1), 2), simp(k * (k + 1) * 2, 1)]),
      sol: `V = a·${k + 1}a·${k === 1 ? '' : k}a = ${simp(k * (k + 1), 1)}.`,
    };
  });
  add('mc', T.hkg, (r) => {
    const t = r.pick([
      { q: 'Cho hình lập phương ABCD.A\'B\'C\'D\'. Góc giữa hai đường thẳng AC và A\'D\' bằng', a: '45°', d: ['90°', '60°', '30°'], s: 'A\'D\' // AD nên góc(AC, A\'D\') = góc(AC, AD) = 45° (AC là đường chéo hình vuông).' },
      { q: 'Cho hình lập phương ABCD.A\'B\'C\'D\'. Góc giữa hai đường thẳng AB\' và CD\' bằng', a: '90°', d: ['45°', '60°', '0°'], s: 'CD\' // BA\' nên góc(AB\', CD\') = góc(AB\', A\'B) = 90° (hai đường chéo của hình vuông ABB\'A\').' },
      { q: 'Cho hình lập phương ABCD.A\'B\'C\'D\'. Góc giữa hai đường thẳng A\'C\' và BD bằng', a: '90°', d: ['45°', '60°', '30°'], s: 'A\'C\' // AC và AC ⊥ BD nên góc bằng 90°.' },
      { q: 'Cho hình lập phương ABCD.A\'B\'C\'D\'. Góc giữa hai đường thẳng AB\' và BC\' bằng', a: '60°', d: ['45°', '90°', '30°'], s: 'BC\' // AD\'. Tam giác AB\'D\' đều (các cạnh là đường chéo mặt) nên góc bằng 60°.' },
      { q: 'Cho hình chóp S.ABCD có đáy là hình vuông, SA ⊥ (ABCD). Đường thẳng BC vuông góc với mặt phẳng nào sau đây?', a: '(SAB)', d: ['(SAC)', '(SAD)', '(SCD)'], s: 'BC ⊥ AB (hình vuông) và BC ⊥ SA (SA ⊥ đáy) ⇒ BC ⊥ (SAB).' },
      { q: 'Cho hình chóp S.ABCD có đáy là hình vuông, SA ⊥ (ABCD). Đường thẳng BD vuông góc với mặt phẳng nào sau đây?', a: '(SAC)', d: ['(SAB)', '(SAD)', '(SBC)'], s: 'BD ⊥ AC (hai đường chéo hình vuông) và BD ⊥ SA ⇒ BD ⊥ (SAC).' },
    ]);
    return { q: t.q, opts: [t.a].concat(t.d), sol: t.s };
  });

  /* ---------- Vectơ & toạ độ ---------- */
  const rv = (r, a, b) => [r.int(a, b), r.int(a, b), r.int(a, b)];
  add('mc', T.vt, (r) => {
    const a = rv(r, -4, 4), b = rv(r, -4, 4);
    const kind = r.int(0, 2);
    if (kind === 0) {
      const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      return {
        q: `Trong không gian Oxyz, cho a = ${vec(a)} và b = ${vec(b)}. Tích vô hướng a·b bằng`,
        opts: numOpts(dot, [dot + 2, -dot, a[0] * b[0] + a[1] * b[1] - a[2] * b[2], a[0] + b[0] + a[1] + b[1] + a[2] + b[2], dot - 1]),
        sol: `a·b = ${a[0]}·${b[0] < 0 ? '(' + b[0] + ')' : b[0]} + ${a[1]}·${b[1] < 0 ? '(' + b[1] + ')' : b[1]} + ${a[2]}·${b[2] < 0 ? '(' + b[2] + ')' : b[2]} = ${dot}.`,
      };
    }
    if (kind === 1) {
      const m = r.intNZ(-3, 3);
      const c = a.map((x, i) => 2 * x + m * b[i]);
      const label = '2a' + (m < 0 ? ' ' + MINUS + ' ' + (m === -1 ? '' : -m) : ' + ' + (m === 1 ? '' : m)) + 'b';
      return {
        q: `Trong không gian Oxyz, cho a = ${vec(a)} và b = ${vec(b)}. Toạ độ vectơ ${label} là`,
        opts: opts(vec(c), [vec(a.map((x, i) => 2 * x - m * b[i])), vec(a.map((x, i) => x + m * b[i])), vec(a.map((x, i) => 2 * x + m * b[i] + 1)), vec(c.map((x) => -x))]),
        sol: `${label} = (2·${a[0]} + ${m}·${b[0]}; 2·${a[1]} + ${m}·${b[1]}; 2·${a[2]} + ${m}·${b[2]}) = ${vec(c)}.`,
      };
    }
    // vuông góc tìm m
    let u, v, m;
    do { u = rv(r, -3, 3); v = rv(r, -3, 3); v[1] = r.intNZ(-3, 3); } while ((u[0] * v[0] + u[2] * v[2]) % v[1] !== 0 || u[0] * v[0] + u[2] * v[2] === 0);
    m = -(u[0] * v[0] + u[2] * v[2]) / v[1];
    return {
      q: `Trong không gian Oxyz, cho u = (${u[0]}; m; ${u[2]}) và v = ${vec(v)}. Giá trị của m để u ⊥ v là`,
      opts: numOpts(m, [-m, m + 1, m - 2, 2 * m, 0]),
      sol: `u ⊥ v ⇔ u·v = 0 ⇔ ${u[0]}·${v[0]} + ${v[1]}m + ${u[2]}·${v[2]} = 0 ⇔ m = ${num(m)}.`,
    };
  });
  add('mc', T.vt, (r) => {
    const A1 = rv(r, -5, 5), B1 = A1.map((x) => x + 2 * r.int(-3, 3));
    const M = A1.map((x, i) => (x + B1[i]) / 2);
    const askMid = r.bool();
    if (askMid) {
      return {
        q: `Trong không gian Oxyz, cho A${vec(A1)} và B${vec(B1)}. Trung điểm của đoạn AB có toạ độ là`,
        opts: opts(vec(M), [vec(B1.map((x, i) => x - A1[i])), vec(B1.map((x, i) => (x - A1[i]) / 2)), vec(A1.map((x, i) => x + B1[i])), vec(M.map((x, i) => (i === 2 ? -x : x)))]),
        sol: `M = ((x_A + x_B)/2; (y_A + y_B)/2; (z_A + z_B)/2) = ${vec(M)}.`,
      };
    }
    const d = B1.map((x, i) => x - A1[i]);
    const L2 = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
    const sq = (n) => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : '√' + n);
    return {
      q: `Trong không gian Oxyz, cho A${vec(A1)} và B${vec(B1)}. Độ dài đoạn thẳng AB bằng`,
      opts: opts(sq(L2), [sq(L2 + 4), sq(Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2])) === sq(L2) ? sq(L2 + 2) : sq(Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2])), sq(L2 * 2), sq(L2 + 1), sq(Math.max(1, L2 - 3))]),
      sol: `AB = ${vec(d)} ⇒ AB = √(${d.map((x) => x * x).join(' + ')}) = ${sq(L2)}.`,
    };
  });

  /* ---------- Mặt phẳng ---------- */
  function planeStr(n, D) {
    let s = poly([n[0], 0]).replace('x', 'x');
    const terms = [];
    const t = (c, v) => (c === 0 ? null : { c, v });
    [t(n[0], 'x'), t(n[1], 'y'), t(n[2], 'z')].forEach((x) => x && terms.push(x));
    s = '';
    terms.forEach((x, i) => {
      const abs = Math.abs(x.c), body = (abs === 1 ? '' : abs) + x.v;
      s += i === 0 ? (x.c < 0 ? MINUS : '') + body : (x.c < 0 ? ' ' + MINUS + ' ' : ' + ') + body;
    });
    s += sg(D);
    return s + ' = 0';
  }
  add('mc', T.mp, (r) => {
    const M = rv(r, -3, 3), n = rv(r, -3, 3);
    if (n.every((x) => x === 0)) n[0] = 1;
    const D = -(n[0] * M[0] + n[1] * M[1] + n[2] * M[2]);
    const right = planeStr(n, D);
    return {
      q: `Trong không gian Oxyz, mặt phẳng đi qua điểm M${vec(M)} và có vectơ pháp tuyến n = ${vec(n)} có phương trình là`,
      opts: opts(right, [planeStr(n, -D), planeStr(M.some((x) => x) ? M : [1, 1, 1], -(M[0] * n[0] + M[1] * n[1] + M[2] * n[2])), planeStr(n, D + 1), planeStr(n, D - 2)]),
      sol: `Phương trình: ${n[0]}(x − ${M[0]}) + ${n[1]}(y − ${M[1]}) + ${n[2]}(z − ${M[2]}) = 0 ⇔ ${right}.`,
    };
  });
  const NORMS = [[1, 2, 2, 3], [2, 1, 2, 3], [2, 2, 1, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 2, 3, 7], [1, 0, 0, 1], [3, 0, 4, 5], [0, 3, 4, 5]];
  function randNorm(r) {
    const b = r.pick(NORMS);
    return { n: [b[0] * r.sign(), b[1] * r.sign(), b[2] * r.sign()], L: b[3] };
  }
  add('mc', T.mp, (r) => {
    const { n, L } = randNorm(r), D = r.int(-9, 9), M = rv(r, -3, 3);
    const v = n[0] * M[0] + n[1] * M[1] + n[2] * M[2] + D;
    const ans = fr(Math.abs(v), L);
    return {
      q: `Trong không gian Oxyz, khoảng cách từ điểm M${vec(M)} đến mặt phẳng (P): ${planeStr(n, D)} bằng`,
      opts: opts(ans, [fr(Math.abs(v), L * L), fr(Math.abs(v - D) + 1, L), fr(Math.abs(v) + L, L), fr(Math.abs(v + 2 * D) + 2, L), fr(Math.abs(v) + 1, L)]),
      sol: `d(M, (P)) = |${n[0]}·${M[0]} + ${n[1]}·${M[1]} + ${n[2]}·${M[2]} ${sg(D)}| / √(${n.map((x) => x * x).join(' + ')}) = ${Math.abs(v)}/${L} = ${ans}.`,
    };
  });

  /* ---------- Đường thẳng ---------- */
  function lineParam(M, u) {
    const c = ['x', 'y', 'z'];
    return '{ ' + c.map((v, i) => v + ' = ' + (M[i] === 0 ? '' : M[i]) + (u[i] === 0 ? (M[i] === 0 ? '0' : '') : (u[i] < 0 ? (M[i] === 0 ? MINUS : ' ' + MINUS + ' ') : M[i] === 0 ? '' : ' + ') + (Math.abs(u[i]) === 1 ? '' : Math.abs(u[i])) + 't')).join('; ') + ' }';
  }
  add('mc', T.dt, (r) => {
    const M = rv(r, -3, 3); let u = rv(r, -3, 3);
    if (u.every((x) => x === 0)) u = [1, 2, -1];
    const askVec = r.bool();
    if (askVec) {
      return {
        q: `Trong không gian Oxyz, đường thẳng d: ${lineParam(M, u)} có một vectơ chỉ phương là`,
        opts: opts(vec(u), [vec(M), vec(u.map((x, i) => x + M[i])), vec([u[0], -u[1], u[2]]), vec([u[1], u[0], u[2]]), vec([u[0] + 1, u[1], u[2]])]),
        sol: `Hệ số của t là toạ độ vectơ chỉ phương: u = ${vec(u)}.`,
      };
    }
    const t = r.intNZ(-2, 2);
    const P = M.map((x, i) => x + t * u[i]);
    return {
      q: `Trong không gian Oxyz, điểm nào dưới đây thuộc đường thẳng d: ${lineParam(M, u)}?`,
      opts: opts(vec(P), [vec(u), vec(M.map((x, i) => x - u[i] + (i === 0 ? 1 : 0))), vec(P.map((x, i) => (i === 1 ? x + 1 : x))), vec(M.map((x, i) => x + u[i] + (i === 2 ? 1 : 0)))].filter((s) => s !== vec(M))),
      sol: `Với t = ${t} ta được điểm ${vec(P)} thuộc d. Các phương án khác không tồn tại t thoả mãn cả ba phương trình.`,
    };
  });

  /* ---------- Mặt cầu ---------- */
  add('mc', T.mc, (r) => {
    const I = rv(r, -4, 4), R = r.int(1, 6);
    const general = r.bool();
    const sq = (v, c) => (c === 0 ? v + '²' : '(' + v + (c > 0 ? ' ' + MINUS + ' ' + c : ' + ' + -c) + ')²');
    const eq = general
      ? 'x² + y² + z²' + [['x', I[0]], ['y', I[1]], ['z', I[2]]].map(([v, c]) => (c === 0 ? '' : sg(-2 * c) + v)).join('') + sg(I[0] * I[0] + I[1] * I[1] + I[2] * I[2] - R * R) + ' = 0'
      : sq('x', I[0]) + ' + ' + sq('y', I[1]) + ' + ' + sq('z', I[2]) + ' = ' + R * R;
    const f = (c, rr) => `I${vec(c)}, R = ${rr}`;
    return {
      q: `Trong không gian Oxyz, mặt cầu (S): ${eq} có tâm I và bán kính R là`,
      opts: opts(f(I, R), [f(I.map((x) => -x), R), f(I, R * R), f(I.map((x) => -x), R * R), f(I, R + 1)]),
      sol: general ? `Đồng nhất với x² + y² + z² − 2ax − 2by − 2cz + d = 0 ta có tâm I${vec(I)}, R = √(a² + b² + c² − d) = √${R * R} = ${R}.` : `Mặt cầu có tâm I${vec(I)} và R² = ${R * R} ⇒ R = ${R}.`,
    };
  });

  /* ---------- Tổ hợp ---------- */
  add('mc', T.th, (r) => {
    const kind = r.int(0, 2);
    if (kind === 0) {
      const n = r.int(6, 12), k = r.int(2, 4);
      return {
        q: `Có bao nhiêu cách chọn ${k} học sinh từ một nhóm gồm ${n} học sinh để đi trực nhật (không phân biệt vai trò)?`,
        opts: numOpts(C(n, k), [A(n, k), Math.pow(n, k), n * k, C(n, k - 1)]),
        sol: `Mỗi cách chọn là một tổ hợp chập ${k} của ${n}: C<sub>${n}</sub><sup>${k}</sup> = ${C(n, k)}.`,
      };
    }
    if (kind === 1) {
      const n = r.int(6, 12), k = r.int(2, 3);
      return {
        q: `Một lớp có ${n} học sinh ứng cử. Có bao nhiêu cách bầu ${k === 2 ? 'một lớp trưởng và một lớp phó' : 'một lớp trưởng, một lớp phó và một bí thư'} (mỗi bạn giữ tối đa một chức)?`,
        opts: numOpts(A(n, k), [C(n, k), Math.pow(n, k), n * k, A(n, k) / 2]),
        sol: `Các chức vụ khác nhau nên có thứ tự: A<sub>${n}</sub><sup>${k}</sup> = ${A(n, k)}.`,
      };
    }
    const d = r.int(5, 7), k = r.int(3, 4);
    const digits = Array.from({ length: d }, (_, i) => i + 1).join(', ');
    return {
      q: `Từ các chữ số ${digits} lập được bao nhiêu số tự nhiên có ${k} chữ số đôi một khác nhau?`,
      opts: numOpts(A(d, k), [C(d, k), Math.pow(d, k), LT.U.fact(k), A(d, k - 1)]),
      sol: `Mỗi số là một chỉnh hợp chập ${k} của ${d} chữ số (không có chữ số 0): A<sub>${d}</sub><sup>${k}</sup> = ${A(d, k)}.`,
    };
  });

  /* ---------- Xác suất ---------- */
  add('mc', T.xs, (r) => {
    const red = r.int(3, 7), blue = r.int(2, 6), n = red + blue;
    const both = r.bool();
    const fav = both ? C(red, 2) : red * blue;
    const tot = C(n, 2);
    return {
      q: `Một hộp có ${red} viên bi đỏ và ${blue} viên bi xanh. Lấy ngẫu nhiên đồng thời 2 viên. Xác suất để ${both ? 'cả hai viên đều màu đỏ' : 'lấy được hai viên khác màu'} là`,
      opts: opts(fr(fav, tot), [fr(both ? red : red + blue, n * 2), fr(both ? C(blue, 2) : C(red, 2), tot), fr(both ? red * blue : C(red, 2) + C(blue, 2), tot), fr(fav, n * n)]),
      sol: `n(Ω) = C<sub>${n}</sub><sup>2</sup> = ${tot}. ${both ? 'n(A) = C<sub>' + red + '</sub><sup>2</sup> = ' + fav : 'n(A) = ' + red + '·' + blue + ' = ' + fav}. P = ${fr(fav, tot)}.`,
    };
  });
  add('mc', T.xs, (r) => {
    const pa = r.pick([0.2, 0.3, 0.4, 0.5, 0.6]), pba = r.pick([0.5, 0.6, 0.7, 0.8, 0.9]), pbna = r.pick([0.1, 0.2, 0.3, 0.4]);
    const pb = round(pa * pba + (1 - pa) * pbna, 4);
    const f = (x) => num(x, 4);
    return {
      q: `Cho hai biến cố A, B với P(A) = ${num(pa)}, P(B|A) = ${num(pba)}, P(B|Ā) = ${num(pbna)}. Giá trị P(B) là`,
      opts: numOpts(pb, [pa * pba, pba + pbna - pa, round(pa * pbna + (1 - pa) * pba, 4), round((pba + pbna) / 2, 4) === pb ? pb + 0.1 : round((pba + pbna) / 2, 4), pb + 0.05], f),
      sol: `Công thức xác suất toàn phần: P(B) = P(A)·P(B|A) + P(Ā)·P(B|Ā) = ${num(pa)}·${num(pba)} + ${num(1 - pa)}·${num(pbna)} = ${num(pb, 4)}.`,
    };
  });
  add('mc', T.xs, (r) => {
    const pAB = r.pick([0.1, 0.12, 0.15, 0.2, 0.24]), pB = r.pick([0.3, 0.4, 0.5, 0.6]);
    const ans = round(pAB / pB, 4);
    return {
      q: `Cho hai biến cố A và B với P(B) = ${num(pB)} và P(A ∩ B) = ${num(pAB)}. Xác suất có điều kiện P(A|B) bằng`,
      opts: numOpts(ans, [round(pAB * pB, 4), round(pB / pAB, 4), round(pB - pAB, 4), round(1 - ans, 4)], (x) => num(x, 4)),
      sol: `P(A|B) = P(A ∩ B)/P(B) = ${num(pAB)}/${num(pB)} = ${num(ans, 4)}.`,
    };
  });

  /* ---------- Thống kê mẫu ghép nhóm ---------- */
  function groupData(r) {
    const a = r.pick([0, 5, 10, 20, 40, 150]), h = r.pick([2, 5, 10]), k = 5;
    const fq = Array.from({ length: k }, () => r.int(2, 12));
    const groups = fq.map((n, i) => ({ lo: a + i * h, hi: a + (i + 1) * h, n, x: a + i * h + h / 2 }));
    const N = fq.reduce((s, x) => s + x, 0);
    const mean = groups.reduce((s, g) => s + g.n * g.x, 0) / N;
    const variance = groups.reduce((s, g) => s + g.n * g.x * g.x, 0) / N - mean * mean;
    const quart = (p) => {
      const pos = (p * N) / 4; let cum = 0;
      for (const g of groups) { if (cum + g.n >= pos) return g.lo + ((pos - cum) / g.n) * h; cum += g.n; }
      return groups[k - 1].hi;
    };
    const table =
      '<table class="tbl"><tr><th>Nhóm</th>' + groups.map((g) => '<td>[' + num(g.lo) + '; ' + num(g.hi) + ')</td>').join('') + '</tr><tr><th>Tần số</th>' + groups.map((g) => '<td>' + g.n + '</td>').join('') + '</tr></table>';
    const modeG = groups.reduce((m, g) => (g.n > m.n ? g : m), groups[0]);
    return { a, h, groups, N, mean, variance, Q1: quart(1), Q3: quart(3), table, R: a + k * h - a, modeG };
  }
  LT._groupData = groupData;
  add('mc', T.tk, (r) => {
    const g = groupData(r);
    const kind = r.int(0, 2);
    if (kind === 0) {
      return {
        q: `Cho mẫu số liệu ghép nhóm:${g.table}Khoảng biến thiên của mẫu số liệu là`,
        opts: numOpts(g.R, [g.R - g.h, g.h, g.R + g.h, g.groups[4].x - g.groups[0].x === g.R - g.h ? g.R / 2 : g.groups[4].x - g.groups[0].x]),
        sol: `R = ${num(g.a + 5 * g.h)} − ${num(g.a)} = ${num(g.R)}.`,
      };
    }
    if (kind === 1) {
      const m = round(g.mean, 2);
      return {
        q: `Cho mẫu số liệu ghép nhóm:${g.table}Số trung bình của mẫu số liệu (làm tròn đến hàng phần trăm) là`,
        opts: numOpts(m, [round(g.mean + g.h / 2, 2), round(g.groups[2].x, 2) === m ? m + g.h : round(g.groups[2].x, 2), round(g.mean - g.h / 2, 2), round(g.mean + g.h, 2)], (x) => num(x, 2)),
        sol: `Giá trị đại diện các nhóm: ${g.groups.map((x) => num(x.x)).join('; ')}. x̄ = (${g.groups.map((x) => x.n + '·' + num(x.x)).join(' + ')})/${g.N} ≈ ${num(m, 2)}.`,
      };
    }
    const modeIdx = g.groups.indexOf(g.modeG);
    const f = (x) => '[' + num(x.lo) + '; ' + num(x.hi) + ')';
    // đảm bảo nhóm mốt duy nhất
    if (g.groups.filter((x) => x.n === g.modeG.n).length > 1) throw new Error('mốt không duy nhất');
    return {
      q: `Cho mẫu số liệu ghép nhóm:${g.table}Nhóm chứa mốt của mẫu số liệu là`,
      opts: opts(f(g.modeG), g.groups.filter((_, i) => i !== modeIdx).map(f)),
      sol: `Nhóm chứa mốt là nhóm có tần số lớn nhất (${g.modeG.n}): ${f(g.modeG)}.`,
    };
  });

  /* =================== PHẦN II: ĐÚNG/SAI =================== */
  add('tf', T.don, (r) => {
    const k = cubic(r);
    const yc = k.f(k.x1), yt = k.f(k.x2);
    const lo = k.x1 - 1, hi = k.x2 + 1;
    const pts = [lo, hi, k.x1, k.x2];
    const mx = Math.max(...pts.map(k.f));
    return {
      q: `Cho hàm số f(x) = ${k.s}.`,
      items: [
        claim(r, (v) => `f'(x) = ${v}.`, k.dp, poly([3, k.b, k.c]), `f'(x) = 3x² ${sg(2 * k.b)}x ${sg(k.c)} = ${k.dp}.`),
        claim(r, (v) => `Hàm số nghịch biến trên khoảng ${v}.`, iv(k.x1, k.x2), iv(k.x2, pinf), `f'(x) = 3${xm(k.x1)}${xm(k.x2)} < 0 ⇔ ${k.x1} < x < ${k.x2}.`),
        claim(r, (v) => `Giá trị cực tiểu của hàm số bằng ${v}.`, num(yt), num(yc), `Hàm đạt cực tiểu tại x = ${k.x2}, y_CT = f(${k.x2}) = ${yt}; cực đại y_CĐ = f(${k.x1}) = ${yc}.`),
        claim(r, (v) => `Giá trị lớn nhất của hàm số trên đoạn [${lo}; ${hi}] bằng ${v}.`, num(mx), num(mx + r.pick([1, 2, -1, -2])), `So sánh f(${lo}) = ${k.f(lo)}, f(${k.x1}) = ${yc}, f(${k.x2}) = ${yt}, f(${hi}) = ${k.f(hi)} ⇒ max = ${mx}.`),
      ],
    };
  });
  add('tf', T.vt, (r) => {
    const A1 = rv(r, -3, 3), B1 = A1.map((x) => x + r.intNZ(-3, 3));
    const AB = B1.map((x, i) => x - A1[i]);
    const D = -(AB[0] * A1[0] + AB[1] * A1[1] + AB[2] * A1[2]);
    const L2 = AB.reduce((s, x) => s + x * x, 0);
    const dB = round(L2 / Math.sqrt(L2), 2); // khoảng cách từ B đến mặt phẳng qua A vuông góc AB = AB
    const M = A1.map((x, i) => (x + B1[i]) / 2);
    return {
      q: `Trong không gian Oxyz, cho hai điểm A${vec(A1)} và B${vec(B1)}. Gọi (P) là mặt phẳng đi qua A và vuông góc với AB.`,
      items: [
        claim(r, (v) => `Vectơ AB = ${v}.`, vec(AB), vec(AB.map((x) => -x)), `AB = (x_B − x_A; y_B − y_A; z_B − z_A) = ${vec(AB)}.`),
        claim(r, (v) => `Trung điểm của AB là ${v}.`, vec(M), vec(M.map((x, i) => (i === 0 ? x + 1 : x))), `Trung điểm M = ${vec(M)}.`),
        claim(r, (v) => `Mặt phẳng (P) có phương trình ${v}.`, planeStr(AB, D), planeStr(AB, -D === D ? D + 1 : -D), `(P) nhận AB làm vectơ pháp tuyến và qua A: ${planeStr(AB, D)}.`),
        claim(r, (v) => `Khoảng cách từ B đến (P) bằng ${v} (làm tròn đến hàng phần trăm).`, num(dB, 2), numF(round(dB / 2, 2), 2), `Vì AB ⊥ (P) tại A nên d(B, (P)) = AB = √${L2} ≈ ${num(dB, 2)}.`),
      ],
    };
  });
  add('tf', T.tp, (r) => {
    const v0 = r.pick([10, 12, 15, 16, 20]), a = r.pick([2, 4, 5]);
    if (v0 % a !== 0) throw new Error('retry');
    const t0 = v0 / a, s = (v0 * v0) / (2 * a);
    const s2 = v0 * 2 - a * 2;
    return {
      q: `Một ô tô đang chạy với vận tốc ${v0} m/s thì người lái đạp phanh; từ thời điểm đó ô tô chuyển động chậm dần đều với vận tốc v(t) = ${v0} − ${a}t (m/s), t tính bằng giây.`,
      items: [
        claim(r, (x) => `Vận tốc của ô tô sau 1 giây kể từ lúc đạp phanh là ${x} m/s.`, num(v0 - a), num(v0 + a), `v(1) = ${v0} − ${a} = ${v0 - a} m/s.`),
        claim(r, (x) => `Ô tô dừng hẳn sau ${x} giây kể từ lúc đạp phanh.`, num(t0), num(t0 + 1), `v(t) = 0 ⇔ t = ${v0}/${a} = ${t0} s.`),
        claim(r, (x) => `Quãng đường ô tô đi được trong 2 giây đầu sau khi đạp phanh là ${x} m.`, num(s2), num(2 * v0), `s = ∫<sub>0</sub><sup>2</sup>(${v0} − ${a}t)dt = ${2 * v0} − ${2 * a} = ${s2} m.`),
        claim(r, (x) => `Từ lúc đạp phanh đến khi dừng hẳn, ô tô đi được ${x} m.`, num(s), num(v0 * t0), `s = ∫<sub>0</sub><sup>${t0}</sup>(${v0} − ${a}t)dt = ${v0}·${t0} − ${a}·${t0}²/2 = ${num(s)} m.`),
      ],
    };
  });
  add('tf', T.xs, (r) => {
    const r1 = r.int(3, 6), b1 = r.int(2, 5), r2 = r.int(1, 4), b2 = r.int(3, 6);
    const p1 = r1 / (r1 + b1), p2 = r2 / (r2 + b2);
    const pR = 0.5 * p1 + 0.5 * p2;
    const pIgR = (0.5 * p1) / pR;
    return {
      q: `Có hai hộp: hộp I chứa ${r1} bi đỏ và ${b1} bi xanh; hộp II chứa ${r2} bi đỏ và ${b2} bi xanh. Chọn ngẫu nhiên một hộp (khả năng như nhau) rồi lấy ngẫu nhiên một viên bi từ hộp đó. Gọi A: “chọn hộp I”, B: “lấy được bi đỏ”.`,
      items: [
        claim(r, (x) => `P(B|A) = ${x}.`, fr(r1, r1 + b1), fr(r1, r1 + b1 + r2 + b2), `Hộp I có ${r1} đỏ trên ${r1 + b1} bi ⇒ P(B|A) = ${fr(r1, r1 + b1)}.`),
        claim(r, (x) => `P(A) = ${x}.`, fr(1, 2), fr(r1 + b1, r1 + b1 + r2 + b2) === fr(1, 2) ? fr(1, 3) : fr(r1 + b1, r1 + b1 + r2 + b2), `Hai hộp được chọn với khả năng như nhau ⇒ P(A) = 1/2.`),
        claim(r, (x) => `Xác suất lấy được bi đỏ là ${x} (làm tròn đến hàng phần trăm).`, numF(round(pR, 2), 2), num(round((r1 + r2) / (r1 + b1 + r2 + b2), 2) === round(pR, 2) ? round(pR + 0.05, 2) : round((r1 + r2) / (r1 + b1 + r2 + b2), 2), 2), `P(B) = ½·${fr(r1, r1 + b1)} + ½·${fr(r2, r2 + b2)} ≈ ${num(pR, 4)}.`),
        claim(r, (x) => `Biết viên bi lấy ra màu đỏ, xác suất viên bi đó thuộc hộp I là ${x} (làm tròn đến hàng phần trăm).`, numF(round(pIgR, 2), 2), num(round(1 - pIgR, 2) === round(pIgR, 2) ? round(pIgR + 0.1, 2) : round(1 - pIgR, 2), 2), `Bayes: P(A|B) = P(A)P(B|A)/P(B) = ${num(0.5 * p1, 4)}/${num(pR, 4)} ≈ ${num(pIgR, 4)}.`),
      ],
    };
  });
  add('tf', T.tk, (r) => {
    const g = groupData(r);
    const m = round(g.mean, 2);
    if (g.groups.filter((x) => x.n === g.modeG.n).length > 1) throw new Error('retry');
    const f = (x) => '[' + num(x.lo) + '; ' + num(x.hi) + ')';
    const other = g.groups.find((x) => x !== g.modeG);
    return {
      q: `Thời gian (phút) tự học mỗi ngày của một nhóm học sinh được cho bởi mẫu số liệu ghép nhóm:${g.table}`,
      items: [
        claim(r, (x) => `Cỡ mẫu là ${x}.`, String(g.N), String(g.N + 5), `n = ${g.groups.map((x) => x.n).join(' + ')} = ${g.N}.`),
        claim(r, (x) => `Khoảng biến thiên của mẫu số liệu là ${x}.`, num(g.R), num(g.R - g.h), `R = ${num(g.a + 5 * g.h)} − ${num(g.a)} = ${num(g.R)}.`),
        claim(r, (x) => `Nhóm chứa mốt là ${x}.`, f(g.modeG), f(other), `Nhóm có tần số lớn nhất (${g.modeG.n}) là ${f(g.modeG)}.`),
        claim(r, (x) => `Số trung bình của mẫu số liệu xấp xỉ ${x} (làm tròn đến hàng phần trăm).`, num(m, 2), numF(round(m + g.h / 2, 2), 2), `x̄ = Σnᵢxᵢ/n = ${num(g.mean * g.N)}/${g.N} ≈ ${num(m, 2)}.`),
      ],
    };
  });
  add('tf', T.tp, (r) => {
    const k = r.int(1, 4) * 2; // f(x) = x² − kx
    const F = (x) => (x * x * x) / 3 - (k * x * x) / 2;
    const S1 = (k * k * k) / 6;
    return {
      q: `Cho hàm số f(x) = x² − ${k}x.`,
      items: [
        claim(r, (v) => `Một nguyên hàm của f(x) là F(x) = ${v}.`, frs('x³', 3) + ' − ' + (k / 2 === 1 ? '' : k / 2) + 'x²', frs('x³', 3) + ' − ' + k + 'x²', `∫(x² − ${k}x)dx = x³/3 − ${k / 2}x² + C.`),
        claim(r, (v) => `∫<sub>0</sub><sup>${k}</sup>f(x)dx = ${v}.`, fr(-k * k * k, 6), fr(k * k * k, 6), `F(${k}) − F(0) = ${fr(k * k * k, 3)} − ${fr(k * k * k, 2)} = ${fr(-k * k * k, 6)}.`),
        claim(r, (v) => `Đồ thị hàm số y = f(x) cắt trục hoành tại ${v} điểm.`, '2', '3', `x² − ${k}x = 0 ⇔ x = 0 hoặc x = ${k}: 2 giao điểm.`),
        claim(r, (v) => `Diện tích hình phẳng giới hạn bởi đồ thị y = f(x) và trục hoành bằng ${v}.`, fr(k * k * k, 6), fr(k * k * k, 3), `S = ∫<sub>0</sub><sup>${k}</sup>|x² − ${k}x|dx = |${fr(-k * k * k, 6)}| = ${fr(k * k * k, 6)}.`),
      ],
    };
  });
  add('tf', T.lg, (r) => {
    return {
      q: `Cho hàm số f(x) = 2cos x + x trên đoạn [0; π].`,
      items: [
        claim(r, (v) => `f(0) = ${v}.`, '2', '3', `f(0) = 2cos 0 + 0 = 2.`),
        claim(r, (v) => `f'(x) = ${v}.`, '1 − 2sin x', '1 + 2sin x', `(2cos x)' = −2sin x, (x)' = 1 ⇒ f'(x) = 1 − 2sin x.`),
        claim(r, (v) => `Phương trình f'(x) = 0 có ${v} nghiệm thuộc đoạn [0; π].`, '2', '1', `sin x = 1/2 ⇔ x = π/6 hoặc x = 5π/6 trên [0; π]: 2 nghiệm.`),
        claim(r, (v) => `Giá trị lớn nhất của f(x) trên [0; π] bằng ${v}.`, '√3 + ' + frs('π', 6), '2', `f(0) = 2; f(π/6) = √3 + π/6 ≈ 2,256; f(5π/6) = −√3 + 5π/6 ≈ 0,886; f(π) = π − 2 ≈ 1,14 ⇒ max = √3 + π/6.`),
      ],
    };
  });
  add('tf', T.mu, (r) => {
    const A0 = r.pick([100, 200, 300, 500]), rr = r.pick([5, 6, 7, 8]), n = r.int(2, 4);
    const after = A0 * Math.pow(1 + rr / 100, n);
    const after1 = A0 * (1 + rr / 100);
    let years = 0; while (A0 * Math.pow(1 + rr / 100, years) < 2 * A0) years++;
    return {
      q: `Bác An gửi ${A0} triệu đồng vào ngân hàng với lãi suất ${rr}%/năm theo hình thức lãi kép (tiền lãi mỗi năm được nhập vào vốn), lãi suất không đổi.`,
      items: [
        claim(r, (v) => `Sau 1 năm, số tiền cả gốc lẫn lãi là ${v} triệu đồng.`, num(after1, 2), num(A0 * (rr / 100), 2), `${A0}·(1 + ${rr}%) = ${num(after1, 2)} triệu.`),
        claim(r, (v) => `Số tiền sau n năm được tính theo công thức T = ${v}.`, A0 + '·(1 + 0,0' + rr + ')ⁿ', A0 + '·(1 + 0,0' + rr + '·n)', `Lãi kép: Tₙ = A(1 + r)ⁿ.`),
        claim(r, (v) => `Sau ${n} năm, số tiền bác An nhận được xấp xỉ ${v} triệu đồng (làm tròn đến hàng phần trăm).`, numF(round(after, 2), 2), num(round(A0 * (1 + (n * rr) / 100), 2), 2), `T = ${A0}·${num(1 + rr / 100)}<sup>${n}</sup> ≈ ${num(after, 2)} triệu.`),
        claim(r, (v) => `Sau ít nhất ${v} năm thì số tiền nhận được gấp đôi số tiền gửi ban đầu.`, String(years), String(years - 1), `Cần (1 + ${rr}%)ⁿ ≥ 2 ⇔ n ≥ log<sub>${num(1 + rr / 100)}</sub>2 ≈ ${num(Math.log(2) / Math.log(1 + rr / 100), 2)} ⇒ n = ${years}.`),
      ],
    };
  });

  /* =================== PHẦN III: TRẢ LỜI NGẮN =================== */
  add('sa', T.gtln, (r) => {
    const a = 6 * r.int(2, 10);
    const V = (2 * a * a * a) / 27;
    return {
      q: `Từ một tấm bìa hình vuông cạnh ${a} cm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh x cm rồi gấp lại thành một chiếc hộp chữ nhật không nắp. Thể tích lớn nhất của chiếc hộp bằng bao nhiêu cm³?`,
      ans: V, dp: 0,
      sol: `V(x) = x(${a} − 2x)², 0 < x < ${a / 2}. V'(x) = (${a} − 2x)(${a} − 6x) = 0 ⇒ x = ${a / 6}. V<sub>max</sub> = ${a / 6}·${(2 * a) / 3}² = ${num(V)} cm³.`,
    };
  });
  add('sa', T.tp, (r) => {
    const a = r.int(1, 3), b = r.int(0, 6), T1 = r.int(2, 5);
    const s = a * T1 * T1 * T1 + b * T1; // v = 3a t² + b
    return {
      q: `Một vật chuyển động với vận tốc v(t) = ${poly([3 * a, 0, b])} (m/s), t tính bằng giây. Quãng đường vật đi được trong ${T1} giây đầu tiên bằng bao nhiêu mét?`,
      ans: s, dp: 0,
      sol: `s = ∫<sub>0</sub><sup>${T1}</sup>(${poly([3 * a, 0, b])})dt = ${a}·${T1}³ ${b ? '+ ' + b + '·' + T1 : ''} = ${s} m.`,
    };
  });
  add('sa', T.xs, (r) => {
    const n = r.int(8, 14), girls = r.int(3, n - 3), k = 3;
    const fav = C(n, k) - C(n - girls, k);
    const p = fav / C(n, k);
    return {
      q: `Một nhóm có ${n} học sinh, trong đó có ${girls} học sinh nữ. Chọn ngẫu nhiên ${k} học sinh. Tính xác suất để trong ${k} học sinh được chọn có ít nhất một học sinh nữ (làm tròn đến hàng phần trăm).`,
      ans: round(p, 2), dp: 2,
      sol: `P = 1 − C<sub>${n - girls}</sub><sup>${k}</sup>/C<sub>${n}</sub><sup>${k}</sup> = 1 − ${C(n - girls, k)}/${C(n, k)} ≈ ${num(p, 4)} ≈ ${numF(round(p, 2), 2)}.`,
    };
  });
  add('sa', T.vt, (r) => {
    const A1 = rv(r, -4, 4), B1 = rv(r, -4, 4);
    const d2 = A1.reduce((s, x, i) => s + (x - B1[i]) * (x - B1[i]), 0);
    if (d2 === 0) throw new Error('retry');
    const d = Math.sqrt(d2);
    return {
      q: `Trong một phòng học được gắn hệ trục Oxyz (đơn vị: mét), một camera đặt tại A${vec(A1)} và một bóng đèn đặt tại B${vec(B1)}. Khoảng cách giữa camera và bóng đèn bằng bao nhiêu mét (làm tròn đến hàng phần trăm)?`,
      ans: round(d, 2), dp: 2,
      sol: `AB = √(${A1.map((x, i) => '(' + (B1[i] - x) + ')²').join(' + ')}) = √${d2} ≈ ${numF(round(d, 2), 2)} m.`,
    };
  });
  add('sa', T.mu, (r) => {
    let a, b; do { a = r.int(0, 4); b = r.int(1, 5); } while (a === b);
    const s1 = Math.pow(2, a) + Math.pow(2, b), s2 = Math.pow(2, a + b);
    return {
      q: `Tính tổng các nghiệm của phương trình 4<sup>x</sup> − ${s1}·2<sup>x</sup> + ${s2} = 0.`,
      ans: a + b, dp: 0,
      sol: `Đặt t = 2<sup>x</sup> > 0: t² − ${s1}t + ${s2} = 0 ⇔ t = ${Math.pow(2, a)} hoặc t = ${Math.pow(2, b)} ⇒ x = ${a} hoặc x = ${b}. Tổng = ${a + b}.`,
    };
  });
  add('sa', T.tk, (r) => {
    const g = groupData(r);
    const dq = g.Q3 - g.Q1;
    return {
      q: `Cho mẫu số liệu ghép nhóm:${g.table}Tính khoảng tứ phân vị ΔQ của mẫu số liệu (làm tròn đến hàng phần mười).`,
      ans: round(dq, 1), dp: 1,
      sol: `n = ${g.N}. Q₁ ở vị trí n/4 = ${num(g.N / 4)} ⇒ Q₁ ≈ ${num(g.Q1, 3)}; Q₃ ở vị trí 3n/4 = ${num((3 * g.N) / 4)} ⇒ Q₃ ≈ ${num(g.Q3, 3)}. Dùng công thức Q = u<sub>m</sub> + ((kn/4 − C)/n<sub>m</sub>)·h. ΔQ = Q₃ − Q₁ ≈ ${numF(round(dq, 1), 1)}.`,
    };
  });
  add('sa', T.hkg, (r) => {
    const a = r.int(2, 6), h = r.int(3, 9);
    const V = (a * a * h) / 3;
    return {
      q: `Một kim tự tháp mô hình có dạng hình chóp tứ giác đều, cạnh đáy ${a} dm và chiều cao ${h} dm. Thể tích của mô hình bằng bao nhiêu dm³ (làm tròn đến hàng phần mười)?`,
      ans: round(V, 1), dp: 1,
      sol: `V = (1/3)·${a}²·${h} = ${num(V, 3)} ≈ ${numF(round(V, 1), 1)} dm³.`,
    };
  });
  add('sa', T.th, (r) => {
    const k = r.int(3, 4);
    const total = 9 * A(9, k - 1);
    const even = r.bool();
    if (even) {
      // số có k chữ số khác nhau, chẵn, từ 0..9
      const end0 = A(9, k - 1);
      const endOther = 4 * 8 * A(8, k - 2);
      return {
        q: `Có bao nhiêu số tự nhiên chẵn có ${k} chữ số đôi một khác nhau?`,
        ans: end0 + endOther, dp: 0,
        sol: `Tận cùng 0: A<sub>9</sub><sup>${k - 1}</sup> = ${end0} số. Tận cùng 2, 4, 6, 8 (4 cách): chữ số đầu có 8 cách (khác 0 và khác chữ số cuối), các chữ số giữa có A<sub>8</sub><sup>${k - 2}</sup> cách ⇒ ${endOther} số. Tổng ${end0 + endOther}.`,
      };
    }
    return {
      q: `Có bao nhiêu số tự nhiên có ${k} chữ số đôi một khác nhau?`,
      ans: total, dp: 0,
      sol: `Chữ số đầu có 9 cách (khác 0), ${k - 1} chữ số còn lại chọn có thứ tự từ 9 chữ số còn lại: A<sub>9</sub><sup>${k - 1}</sup>. Tổng 9·${A(9, k - 1)} = ${total}.`,
    };
  });
  add('sa', T.mu, (r) => {
    const A0 = r.pick([50, 100, 150, 200]), rr = r.pick([5, 6, 6.5, 7, 7.5]), n = r.int(3, 6);
    const T1 = A0 * Math.pow(1 + rr / 100, n);
    return {
      q: `Một người gửi ${A0} triệu đồng vào ngân hàng với lãi suất ${num(rr)}%/năm, lãi kép. Sau ${n} năm người đó nhận được bao nhiêu triệu đồng (làm tròn đến hàng phần mười)?`,
      ans: round(T1, 1), dp: 1,
      sol: `T = ${A0}·(1 + ${num(rr / 100)})<sup>${n}</sup> ≈ ${num(T1, 3)} ≈ ${numF(round(T1, 1), 1)} triệu đồng.`,
    };
  });
  add('sa', T.tp, (r) => {
    const p = r.int(2, 6);
    const S1 = (p * p * p) / 6;
    return {
      q: `Một cổng có dạng parabol y = −x² + ${p}x (đơn vị mét, trục Ox là mặt đất). Tính diện tích phần giới hạn bởi cổng và mặt đất (làm tròn đến hàng phần trăm, đơn vị m²).`,
      ans: round(S1, 2), dp: 2,
      sol: `Cổng cắt Ox tại x = 0 và x = ${p}. S = ∫<sub>0</sub><sup>${p}</sup>(−x² + ${p}x)dx = ${p}³/6 = ${num(S1, 4)} ≈ ${numF(round(S1, 2), 2)} m².`,
    };
  });
  add('sa', T.don, (r) => {
    const x0 = r.int(-2, 4), m = x0 - 1;
    return {
      q: `Tìm giá trị của tham số m để hàm số y = x³ − 3mx² + 3(m² − 1)x + 2 đạt cực tiểu tại x = ${x0}.`,
      ans: m, dp: 0,
      sol: `y' = 3x² − 6mx + 3(m² − 1) = 3(x − m − 1)(x − m + 1). Hàm có hai điểm cực trị x = m − 1 (cực đại) và x = m + 1 (cực tiểu). Cực tiểu tại x = ${x0} ⇔ m + 1 = ${x0} ⇔ m = ${m}.`,
    };
  });
  add('sa', T.mp, (r) => {
    const { n, L } = randNorm(r), D = r.int(-12, 12), M = rv(r, -4, 4);
    const v = Math.abs(n[0] * M[0] + n[1] * M[1] + n[2] * M[2] + D);
    return {
      q: `Trong không gian Oxyz, tính khoảng cách từ điểm M${vec(M)} đến mặt phẳng (P): ${planeStr(n, D)} (làm tròn đến hàng phần trăm).`,
      ans: round(v / L, 2), dp: 2,
      sol: `d = |${n[0]}·${M[0]} + ${n[1]}·${M[1]} + ${n[2]}·${M[2]} ${sg(D)}|/${L} = ${v}/${L} ≈ ${numF(round(v / L, 2), 2)}.`,
    };
  });

  /* Câu lí thuyết (ít, dùng để đa dạng phần I) */
  LT.addConcepts(S, [
    { t: T.don, q: 'Cho hàm số y = f(x) có đạo hàm f\'(x) > 0 với mọi x ∈ (a; b). Khẳng định nào sau đây đúng?', a: 'f(x) đồng biến trên (a; b)', d: ['f(x) nghịch biến trên (a; b)', 'f(x) không đổi trên (a; b)', 'f(x) có cực trị trên (a; b)'], kn: LT.KNOW[S][T.don] },
    { t: T.tk, q: 'Đại lượng nào sau đây đo mức độ phân tán của 50% số liệu ở giữa của mẫu số liệu ghép nhóm?', a: 'Khoảng tứ phân vị', d: ['Khoảng biến thiên', 'Số trung bình', 'Mốt'], kn: LT.KNOW[S][T.tk] },
    { t: T.xs, q: 'Cho A, B là hai biến cố độc lập. Khẳng định nào sau đây đúng?', a: 'P(AB) = P(A)·P(B)', d: ['P(AB) = P(A) + P(B)', 'P(A|B) = P(B)', 'P(A ∪ B) = P(A)·P(B)'], kn: 'A, B độc lập ⇔ P(AB) = P(A)·P(B); khi đó P(A|B) = P(A).' },
    { t: T.vt, q: 'Trong không gian Oxyz, hình chiếu vuông góc của điểm M(a; b; c) lên mặt phẳng (Oxy) là', a: '(a; b; 0)', d: ['(0; 0; c)', '(a; 0; c)', '(0; b; c)'], kn: 'Hình chiếu lên (Oxy) giữ nguyên hoành độ, tung độ và cho cao độ bằng 0.' },
    { t: T.tp, q: 'Nếu F(x) là một nguyên hàm của f(x) trên [a; b] thì ∫ₐᵇ f(x)dx bằng', a: 'F(b) − F(a)', d: ['F(a) − F(b)', 'F(b) + F(a)', 'f(b) − f(a)'], kn: LT.KNOW[S][T.tp] },
    { t: T.mc, q: 'Trong không gian Oxyz, phương trình nào sau đây là phương trình mặt cầu?', a: 'x² + y² + z² − 2x + 4y − 4 = 0', d: ['x² + y² − z² + 2x − 1 = 0', 'x² + 2y² + z² − 4 = 0', 'x² + y² + z² + 2x + 2 = 0'], kn: LT.KNOW[S][T.mc], sol: 'Phương trình x² + y² + z² − 2ax − 2by − 2cz + d = 0 là mặt cầu khi a² + b² + c² − d > 0. Với phương án đúng: 1 + 4 + 4 = 9 > 0. Phương án x² + y² + z² + 2x + 2 = 0 có 1 − 2 < 0 nên không phải mặt cầu.' },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
