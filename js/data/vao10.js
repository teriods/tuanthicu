/* NGÂN HÀNG ĐỀ THI VÀO LỚP 10 – Hà Nội / THPT chuyên Nguyễn Huệ (Hà Đông).
   Hà Nội thi 3 bài chung: Toán (tự luận 120'), Ngữ văn (tự luận 120'), Ngoại ngữ (trắc nghiệm 60'),
   thí sinh chuyên thi thêm môn chuyên (150', hệ số 2). Toán được chuyển sang dạng “ghi kết quả” để chấm tự động. */
(function (G) {
  'use strict';
  const LT = G.LT;
  const { num, numF, fr, frs, sup, sub, poly, sg, C, round, opts, numOpts, claim, MINUS } = LT.U;

  /* ======================= TOÁN VÀO 10 ======================= */
  const S1 = 'toan10';
  const add1 = (part, topic, gen) => LT.add(S1, part, topic, gen);
  const T = {
    can: 'Căn thức bậc hai', hs: 'Hàm số y = ax² và đồ thị', hpt: 'Hệ phương trình bậc nhất', pt2: 'Phương trình bậc hai – Viète',
    lpt: 'Giải toán bằng cách lập PT/HPT', kg: 'Hình trụ – nón – cầu', tg: 'Hệ thức lượng trong tam giác vuông', dtr: 'Đường tròn và góc',
    tk: 'Thống kê – Xác suất', bdt: 'Cực trị – Bất đẳng thức',
  };
  LT.TOPICS[S1] = Object.values(T);
  LT.addKnow(S1, {
    [T.can]: '√A xác định ⇔ A ≥ 0. √(A²) = |A|. √(A·B) = √A·√B (A, B ≥ 0). Đưa thừa số ra ngoài dấu căn: √(a²b) = |a|√b. Khi rút gọn biểu thức chứa √x cần ghi điều kiện x ≥ 0 và mẫu khác 0.',
    [T.hs]: 'Đồ thị y = ax² (a ≠ 0) là parabol đỉnh O, nhận Oy làm trục đối xứng; a > 0 quay lên, a < 0 quay xuống. Điểm M(x₀; y₀) thuộc đồ thị ⇔ y₀ = a·x₀². Hoành độ giao điểm của parabol và đường thẳng là nghiệm của phương trình hoành độ giao điểm.',
    [T.hpt]: 'Giải hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế hoặc cộng đại số.',
    [T.pt2]: 'ax² + bx + c = 0 (a ≠ 0): Δ = b² − 4ac (hoặc Δ\' = b\'² − ac). Δ > 0: hai nghiệm phân biệt; Δ = 0: nghiệm kép; Δ < 0: vô nghiệm. Viète: x₁ + x₂ = −b/a, x₁x₂ = c/a; x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂.',
    [T.lpt]: 'Các bước: chọn ẩn và đặt điều kiện; biểu diễn các đại lượng chưa biết theo ẩn; lập phương trình/hệ; giải; đối chiếu điều kiện và trả lời. Năng suất = khối lượng công việc / thời gian; quãng đường = vận tốc × thời gian.',
    [T.kg]: 'Hình trụ: V = πr²h, S<sub>xq</sub> = 2πrh. Hình nón: V = (1/3)πr²h, S<sub>xq</sub> = πrl. Hình cầu: V = (4/3)πR³, S = 4πR².',
    [T.tg]: 'Trong tam giác vuông: sin = đối/huyền, cos = kề/huyền, tan = đối/kề. Cạnh góc vuông = cạnh huyền × sin góc đối = cạnh góc vuông kia × tan góc đối. Định lí Pythagore: a² = b² + c².',
    [T.dtr]: 'Góc nội tiếp bằng nửa số đo cung bị chắn; góc ở tâm bằng số đo cung bị chắn. Độ dài cung n°: l = πRn/180; diện tích hình quạt: S = πR²n/360. Tứ giác nội tiếp có tổng hai góc đối bằng 180°.',
    [T.tk]: 'Xác suất của biến cố A trong phép thử có các kết quả đồng khả năng: P(A) = số kết quả thuận lợi / tổng số kết quả. Tần số tương đối = tần số / cỡ mẫu.',
    [T.bdt]: 'Hằng đẳng thức (x − a)² ≥ 0; bất đẳng thức Cauchy (AM–GM): a + b ≥ 2√(ab) với a, b ≥ 0, dấu “=” khi a = b. Tìm GTNN của ax² + bx + c (a > 0): đạt tại x = −b/(2a).',
  });
  const sq = (n) => { const r = Math.round(Math.sqrt(n)); return r * r === n ? String(r) : '√' + n; };

  add1('mc', T.can, (r) => {
    const a = r.int(1, 5), b = r.intNZ(-9, 9);
    const right = 'x ≥ ' + fr(b, a);
    return { q: `Điều kiện xác định của biểu thức √(${poly([a, -b])}) là`, opts: opts(right, ['x ≤ ' + fr(b, a), 'x > ' + fr(b, a), 'x ≥ ' + fr(-b, a), 'x ≠ ' + fr(b, a)]), sol: `√A xác định ⇔ A ≥ 0: ${poly([a, -b])} ≥ 0 ⇔ x ≥ ${fr(b, a)}.` };
  });
  add1('mc', T.can, (r) => {
    const k = r.pick([2, 3, 5, 6, 7]), p = r.int(1, 3), q = r.int(1, 3), a = r.int(2, 4), b = r.int(1, 3);
    const c = p * a - q * b;
    if (c === 0) throw new Error('retry');
    const f = (n) => (n === 1 ? '' : n === -1 ? MINUS : num(n)) + '√' + k;
    return { q: `Giá trị của biểu thức ${p === 1 ? '' : p}√${a * a * k} − ${q === 1 ? '' : q}√${b * b * k} là`, opts: opts(f(c), [f(p * a + q * b), f(c + 1), f(-c), num(c * k)]), sol: `√${a * a * k} = ${a}√${k}; √${b * b * k} = ${b}√${k}. Biểu thức = ${p * a}√${k} − ${q * b}√${k} = ${f(c)}.` };
  });
  add1('mc', T.hs, (r) => {
    const a = r.pick([1, 2, 3, -1, -2, 0.5, -0.5]), x0 = r.intNZ(-3, 3);
    const y0 = a * x0 * x0;
    const P = (x, y) => `(${num(x)}; ${num(y)})`;
    return { q: `Điểm nào sau đây thuộc đồ thị hàm số y = ${num(a) === '1' ? '' : num(a) === MINUS + '1' ? MINUS : num(a)}x²?`, opts: opts(P(x0, y0), [P(x0, -y0), P(x0, y0 + 1), P(-x0, 2 * y0), P(x0 * 2, y0)]), sol: `Thay x = ${x0}: y = ${num(a)}·(${x0})² = ${num(y0)}. Vậy điểm ${P(x0, y0)} thuộc đồ thị.` };
  });
  add1('mc', T.hpt, (r) => {
    const x = r.int(-5, 6), y = r.int(-5, 6), a = r.int(1, 3), b = r.intNZ(-3, 3), c = r.int(1, 3), d = r.intNZ(-3, 3);
    if (a * d - b * c === 0) throw new Error('retry');
    const e1 = a * x + b * y, e2 = c * x + d * y;
    const P = (u, v) => `(${u}; ${v})`;
    const lhs = (p, q) => poly([p, 0]).replace('x', 'x') + (q < 0 ? ' ' + MINUS + ' ' + (q === -1 ? '' : -q) : ' + ' + (q === 1 ? '' : q)) + 'y';
    return { q: `Nghiệm (x; y) của hệ phương trình { ${lhs(a, b)} = ${e1}; ${lhs(c, d)} = ${e2} } là`, opts: opts(P(x, y), [P(y, x), P(-x, y), P(x, -y), P(x + 1, y - 1)]), sol: `Giải bằng phương pháp cộng đại số hoặc thế, được x = ${x}, y = ${y}. Thử lại: ${a}·${x} + ${b}·${y} = ${e1}; ${c}·${x} + ${d}·${y} = ${e2}.` };
  });
  add1('mc', T.pt2, (r) => {
    let x1, x2; do { x1 = r.int(-6, 6); x2 = r.int(-6, 6); } while (x1 === -x2 || x1 * x2 === 0);
    const s = x1 + x2, p = x1 * x2;
    const askSum = r.bool();
    return { q: `Gọi x₁, x₂ là hai nghiệm của phương trình ${poly([1, -s, p])} = 0. Giá trị của ${askSum ? 'x₁ + x₂' : 'x₁·x₂'} là`, opts: numOpts(askSum ? s : p, askSum ? [-s, p, -p, s + 1] : [-p, s, -s, p + 1]), sol: `Δ = ${s * s - 4 * p} > 0 nên phương trình có hai nghiệm. Theo Viète: x₁ + x₂ = ${s}, x₁·x₂ = ${p}.` };
  });
  add1('mc', T.pt2, (r) => {
    const b = r.int(-8, 8), a = r.pick([1, 2, 1, 3]), c = r.int(-8, 8);
    const D = b * b - 4 * a * c;
    const n = D > 0 ? 2 : D === 0 ? 1 : 0;
    const txt = ['vô nghiệm', 'có nghiệm kép', 'có hai nghiệm phân biệt'][n];
    return { q: `Phương trình ${poly([a, b, c])} = 0`, opts: opts(txt, ['vô nghiệm', 'có nghiệm kép', 'có hai nghiệm phân biệt', 'có vô số nghiệm'].filter((x) => x !== txt)), sol: `Δ = b² − 4ac = ${b * b} − ${4 * a * c} = ${D} ${D > 0 ? '> 0' : D === 0 ? '= 0' : '< 0'} ⇒ phương trình ${txt}.` };
  });
  add1('mc', T.tg, (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25]]);
    const k = r.int(0, 2), name = ['sin', 'cos', 'tan'][k];
    const v = [fr(a, c), fr(b, c), fr(a, b)][k];
    return { q: `Cho tam giác ABC vuông tại A có AB = ${b} cm, AC = ${a} cm, BC = ${c} cm. Giá trị ${name} B là`, opts: opts(v, [fr(a, c), fr(b, c), fr(a, b), fr(b, a)].filter((x) => x !== v)), sol: `Với góc B: cạnh đối là AC = ${a}, cạnh kề là AB = ${b}, cạnh huyền BC = ${c}. ${name} B = ${['đối/huyền', 'kề/huyền', 'đối/kề'][k]} = ${v}.` };
  });
  add1('mc', T.dtr, (r) => {
    const arc = r.pick([60, 80, 100, 120, 140, 160]);
    const k = r.int(0, 1);
    return k === 0
      ? { q: `Trên đường tròn (O), cung nhỏ AB có số đo ${arc}°. Góc nội tiếp ACB chắn cung nhỏ AB có số đo bằng`, opts: numOpts(arc / 2, [arc, 180 - arc / 2, 360 - arc, arc * 2], (x) => x + '°'), sol: `Góc nội tiếp bằng nửa số đo cung bị chắn: ${arc}°/2 = ${arc / 2}°.` }
      : { q: `Tứ giác ABCD nội tiếp đường tròn có góc A = ${arc / 2 + 20}°. Số đo góc C là`, opts: numOpts(180 - (arc / 2 + 20), [arc / 2 + 20, 90, 360 - (arc / 2 + 20), 180 - arc / 2], (x) => x + '°'), sol: `Tứ giác nội tiếp có tổng hai góc đối bằng 180° ⇒ C = 180° − ${arc / 2 + 20}° = ${180 - (arc / 2 + 20)}°.` };
  });
  add1('mc', T.kg, (r) => {
    const R = r.int(1, 6), h = r.int(2, 9), k = r.int(0, 2);
    const pi = (n, d) => { const g = LT.U.gcd(n, d); n /= g; d /= g; return d === 1 ? (n === 1 ? '' : n) + 'π' : frs(n + 'π', d); };
    if (k === 0) return { q: `Một hình trụ có bán kính đáy ${R} cm và chiều cao ${h} cm. Thể tích hình trụ là`, opts: opts(pi(R * R * h, 1) + ' cm³', [pi(R * R * h, 3) + ' cm³', pi(2 * R * h, 1) + ' cm³', pi(R * h, 1) + ' cm³']), sol: `V = πr²h = π·${R * R}·${h} = ${pi(R * R * h, 1)} cm³.` };
    if (k === 1) return { q: `Một hình nón có bán kính đáy ${R} cm và chiều cao ${h} cm. Thể tích hình nón là`, opts: opts(pi(R * R * h, 3) + ' cm³', [pi(R * R * h, 1) + ' cm³', pi(R * h, 3) + ' cm³', pi(2 * R * R * h, 3) + ' cm³']), sol: `V = (1/3)πr²h = (1/3)π·${R * R}·${h} = ${pi(R * R * h, 3)} cm³.` };
    return { q: `Diện tích mặt cầu có bán kính ${R} cm là`, opts: opts(pi(4 * R * R, 1) + ' cm²', [pi(4 * R * R * R, 3) + ' cm²', pi(R * R, 1) + ' cm²', pi(2 * R * R, 1) + ' cm²']), sol: `S = 4πR² = 4π·${R * R} = ${pi(4 * R * R, 1)} cm².` };
  });
  add1('mc', T.tk, (r) => {
    const k = r.int(0, 1);
    if (k === 0) {
      const face = r.pick([['một số chẵn', 3], ['một số nguyên tố', 3], ['số chấm lớn hơn 4', 2], ['số chấm chia hết cho 3', 2], ['mặt 6 chấm', 1]]);
      return { q: `Gieo một con xúc xắc cân đối và đồng chất. Xác suất để xuất hiện ${face[0]} là`, opts: opts(fr(face[1], 6), [fr(1, 6), fr(1, 2), fr(1, 3), fr(2, 3), fr(5, 6)].filter((x) => x !== fr(face[1], 6))), sol: `Có 6 kết quả đồng khả năng, trong đó ${face[1]} kết quả thuận lợi ⇒ P = ${fr(face[1], 6)}.` };
    }
    const n = r.int(30, 45), f = r.int(5, 15);
    return { q: `Một lớp có ${n} học sinh, trong đó ${f} học sinh đạt loại Giỏi. Tần số tương đối của học sinh Giỏi (làm tròn đến hàng phần mười, theo %) là`, opts: numOpts(round((f / n) * 100, 1), [f, round((n / f), 1), round((f / n) * 10, 1), round(100 - (f / n) * 100, 1)], (x) => num(x, 1) + '%'), sol: `Tần số tương đối = ${f}/${n} ≈ ${num((f / n) * 100, 1)}%.` };
  });

  /* ---- Ghi kết quả (thay cho tự luận) ---- */
  add1('sa', T.can, (r) => {
    const t = r.int(2, 9);
    const A = (t + 1) / (t - 1);
    return { q: `Cho biểu thức A = ${frs('√x + 1', '√x − 1')} với x ≥ 0, x ≠ 1. Tính giá trị của A khi x = ${t * t} (làm tròn đến hàng phần trăm).`, ans: round(A, 2), dp: 2, sol: `x = ${t * t} thoả điều kiện, √x = ${t}. A = (${t} + 1)/(${t} − 1) = ${fr(t + 1, t - 1)} ≈ ${numF(round(A, 2), 2)}.` };
  });
  add1('sa', T.can, (r) => {
    const k = 2 * r.int(0, 5) + 1, m = r.pick([1, 3]);
    // B = 2√x − m = k ⇒ √x = (k + m)/2
    if ((k + m) % 2) throw new Error('retry');
    const sx = (k + m) / 2;
    return { q: `Cho biểu thức B = 2√x − ${m} (x ≥ 0). Tìm x để B = ${k}.`, ans: sx * sx, dp: 0, sol: `2√x − ${m} = ${k} ⇔ √x = ${sx} ⇔ x = ${sx * sx} (thoả mãn x ≥ 0).` };
  });
  add1('sa', T.can, (r) => {
    const a = r.int(2, 6);
    // P = (√x/(√x − a) − a/(√x + a))·... chọn dạng quen thuộc: P = x − a²)/(√x − a) = √x + a
    const t = r.int(a + 1, a + 8);
    return { q: `Cho biểu thức P = ${frs('x − ' + a * a, '√x − ' + a)} với x ≥ 0, x ≠ ${a * a}. Rút gọn P rồi tính giá trị của P khi x = ${t * t}.`, ans: t + a, dp: 0, sol: `x − ${a * a} = (√x − ${a})(√x + ${a}) ⇒ P = √x + ${a}. Với x = ${t * t}: √x = ${t} ⇒ P = ${t} + ${a} = ${t + a}.` };
  });
  add1('sa', T.hs, (r) => {
    let x1, x2; do { x1 = r.int(-4, 4); x2 = r.int(-4, 4); } while (x1 === x2);
    const s = x1 + x2, p = x1 * x2;
    return { q: `Đường thẳng (d): y = ${poly([s, -p])} cắt parabol (P): y = x² tại hai điểm. Tính tổng tung độ của hai giao điểm.`, ans: x1 * x1 + x2 * x2, dp: 0, sol: `Phương trình hoành độ giao điểm: x² = ${poly([s, -p])} ⇔ ${poly([1, -s, p])} = 0 ⇔ x = ${x1} hoặc x = ${x2}. Tung độ y = x²: ${x1 * x1} và ${x2 * x2}. Tổng = ${x1 * x1 + x2 * x2}.` };
  });
  add1('sa', T.pt2, (r) => {
    let x1, x2; do { x1 = r.int(-7, 7); x2 = r.int(-7, 7); } while (x1 * x2 === 0);
    const s = x1 + x2, p = x1 * x2;
    return { q: `Gọi x₁, x₂ là hai nghiệm của phương trình ${poly([1, -s, p])} = 0. Không giải phương trình, tính x₁² + x₂².`, ans: s * s - 2 * p, dp: 0, sol: `Δ = ${s * s - 4 * p} ≥ 0. Viète: x₁ + x₂ = ${s}, x₁x₂ = ${p}. x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = ${s * s} − ${2 * p < 0 ? '(' + 2 * p + ')' : 2 * p} = ${s * s - 2 * p}.` };
  });
  add1('sa', T.pt2, (r) => {
    const a = 2 * r.int(-3, 4) + 1;
    const m = (a - 1) / 2;
    return { q: `Tìm m để phương trình x² − 2(m + 1)x + m² ${sg(a).trim()} = 0 có nghiệm kép.`, ans: m, dp: 0, sol: `Δ' = (m + 1)² − (m² ${sg(a).trim()}) = 2m + 1 ${sg(-a).trim()}. Nghiệm kép ⇔ Δ' = 0 ⇔ m = ${num(m)}.` };
  });
  // Bài toán công việc: 1/x + 1/(x + d) = 1/T, chọn bộ số nguyên
  const WORK = []; for (let x = 3; x <= 30; x++) for (let d = 1; d <= 30; d++) if ((x * (x + d)) % (2 * x + d) === 0) WORK.push([x, d, (x * (x + d)) / (2 * x + d)]);
  add1('sa', T.lpt, (r) => {
    const [x, d, Tt] = r.pick(WORK);
    return { q: `Hai đội công nhân cùng làm một công việc thì hoàn thành trong ${Tt} ngày. Nếu làm riêng, đội thứ nhất hoàn thành nhanh hơn đội thứ hai ${d} ngày. Hỏi nếu làm riêng thì đội thứ nhất hoàn thành công việc trong bao nhiêu ngày?`, ans: x, dp: 0, sol: `Gọi thời gian đội I làm riêng là x (ngày, x > 0) ⇒ đội II: x + ${d}. Một ngày: đội I làm 1/x, đội II làm 1/(x + ${d}) công việc. Ta có 1/x + 1/(x + ${d}) = 1/${Tt} ⇔ x² ${sg(d - 2 * Tt)}x ${sg(-d * Tt)} = 0 ⇒ x = ${x} (loại nghiệm âm). Đội I làm riêng trong ${x} ngày.` };
  });
  const MOVE = []; for (let v = 20; v <= 60; v += 5) for (const a of [5, 10]) for (const S of [60, 90, 100, 120, 150, 180]) { const T2 = S / v + S / (v + a); if (Math.abs(T2 * 2 - Math.round(T2 * 2)) < 1e-9) MOVE.push([v, a, S, T2]); }
  add1('sa', T.lpt, (r) => {
    const [v, a, S, Tt] = r.pick(MOVE);
    return { q: `Một người đi xe máy từ A đến B cách nhau ${S} km. Lúc về, người đó tăng vận tốc thêm ${a} km/h so với lúc đi. Tổng thời gian cả đi và về là ${num(Tt)} giờ. Tính vận tốc lúc đi (km/h).`, ans: v, dp: 0, sol: `Gọi vận tốc lúc đi là x (km/h, x > 0). Thời gian đi ${S}/x, thời gian về ${S}/(x + ${a}). Ta có ${S}/x + ${S}/(x + ${a}) = ${num(Tt)}. Giải phương trình bậc hai, nhận x = ${v} (loại nghiệm âm).` };
  });
  add1('sa', T.lpt, (r) => {
    const A = r.int(3, 12) * 50, B = r.int(3, 12) * 50, p = r.pick([10, 20, 15, 25]), q = r.pick([10, 20, 30]);
    if (p === q) throw new Error('retry');
    const tot = A + B, paid = A * (1 - p / 100) + B * (1 - q / 100);
    return { q: `Mua một chiếc quạt và một chiếc nồi cơm điện hết ${tot} nghìn đồng theo giá niêm yết. Trong đợt khuyến mại, quạt giảm ${p}%, nồi cơm điện giảm ${q}% nên chỉ phải trả ${num(paid)} nghìn đồng. Tính giá niêm yết của chiếc quạt (nghìn đồng).`, ans: A, dp: 0, sol: `Gọi giá quạt x, giá nồi y (nghìn đồng). Hệ: x + y = ${tot}; ${num(1 - p / 100)}x + ${num(1 - q / 100)}y = ${num(paid)}. Giải hệ được x = ${A}, y = ${B}.` };
  });
  add1('sa', T.kg, (r) => {
    const d = r.pick([0.8, 1, 1.2, 1.4]), h = r.pick([1.2, 1.5, 1.8, 2]);
    const V = Math.PI * (d / 2) * (d / 2) * h * 1000;
    return { q: `Một bồn chứa nước inox hình trụ có đường kính đáy ${num(d)} m, chiều cao ${num(h)} m. Bồn chứa được tối đa bao nhiêu lít nước (làm tròn đến hàng đơn vị)?`, ans: Math.round(V), dp: 0, sol: `r = ${num(d / 2)} m. V = πr²h = π·${num(d / 2)}²·${num(h)} ≈ ${num(V / 1000, 4)} m³ = ${Math.round(V)} lít (1 m³ = 1000 lít).` };
  });
  add1('sa', T.kg, (r) => {
    const r1 = r.pick([20, 25, 30]), l = r.pick([30, 32, 35, 40]);
    const S = Math.PI * r1 * l;
    return { q: `Một chiếc nón lá có dạng hình nón với bán kính đáy ${r1} cm và độ dài đường sinh ${l} cm. Tính diện tích lá cần dùng để phủ mặt xung quanh nón (cm², làm tròn đến hàng đơn vị).`, ans: Math.round(S), dp: 0, sol: `S<sub>xq</sub> = πrl = π·${r1}·${l} ≈ ${Math.round(S)} cm².` };
  });
  add1('sa', T.kg, (r) => {
    const d = r.pick([6, 8, 10, 22, 24]);
    const S = Math.PI * d * d;
    return { q: `Một quả bóng hình cầu có đường kính ${d} cm. Tính diện tích bề mặt quả bóng (cm², làm tròn đến hàng phần mười).`, ans: round(S, 1), dp: 1, sol: `R = ${d / 2} cm. S = 4πR² = πd² = π·${d * d} ≈ ${numF(round(S, 1), 1)} cm².` };
  });
  add1('sa', T.tg, (r) => {
    const L = r.pick([3, 4, 5, 6]), a = r.pick([60, 65, 70, 75]);
    const h = L * Math.sin((a * Math.PI) / 180);
    return { q: `Một chiếc thang dài ${L} m dựa vào tường, thang tạo với mặt đất một góc ${a}°. Hỏi đầu thang chạm tường ở độ cao bao nhiêu mét (làm tròn đến hàng phần trăm)?`, ans: round(h, 2), dp: 2, sol: `Độ cao = ${L}·sin ${a}° ≈ ${numF(round(h, 2), 2)} m.` };
  });
  add1('sa', T.tg, (r) => {
    const b = r.pick([8, 10, 12, 15]), a = r.pick([30, 35, 40, 45, 50]);
    const h = b * Math.tan((a * Math.PI) / 180);
    return { q: `Bóng của một cột cờ trên mặt đất dài ${b} m, tia nắng mặt trời tạo với mặt đất một góc ${a}°. Tính chiều cao cột cờ (m, làm tròn đến hàng phần mười).`, ans: round(h, 1), dp: 1, sol: `Chiều cao = ${b}·tan ${a}° ≈ ${numF(round(h, 1), 1)} m.` };
  });
  add1('sa', T.dtr, (r) => {
    const R = r.int(2, 10), n = r.pick([30, 45, 60, 72, 90, 120]);
    const S = (Math.PI * R * R * n) / 360;
    return { q: `Tính diện tích hình quạt tròn bán kính ${R} cm, số đo cung ${n}° (cm², làm tròn đến hàng phần trăm).`, ans: round(S, 2), dp: 2, sol: `S = πR²n/360 = π·${R * R}·${n}/360 ≈ ${numF(round(S, 2), 2)} cm².` };
  });
  add1('sa', T.tk, (r) => {
    const n = r.int(20, 50), k = r.pick([3, 4, 5, 6]);
    const f = Math.floor(n / k);
    return { q: `Một hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên một thẻ. Tính xác suất để số trên thẻ chia hết cho ${k} (làm tròn đến hàng phần trăm).`, ans: round(f / n, 2), dp: 2, sol: `Có ${f} số chia hết cho ${k} trong 1..${n} ⇒ P = ${f}/${n} ≈ ${numF(round(f / n, 2), 2)}.` };
  });
  add1('sa', T.bdt, (r) => {
    const k = r.int(0, 1);
    if (k === 0) {
      const a = r.intNZ(-5, 5), b = r.int(-5, 30);
      return { q: `Tìm giá trị nhỏ nhất của biểu thức P = ${poly([1, -2 * a, b])}.`, ans: b - a * a, dp: 0, sol: `P = (x ${sg(-a)})² + ${b - a * a < 0 ? '(' + (b - a * a) + ')' : b - a * a} ≥ ${b - a * a}. Dấu “=” xảy ra khi x = ${a}. Vậy P<sub>min</sub> = ${b - a * a}.` };
    }
    const s = r.pick([2, 4, 6, 8, 10]);
    return { q: `Cho hai số thực x, y thoả mãn x + y = ${s}. Tìm giá trị nhỏ nhất của x² + y².`, ans: (s * s) / 2, dp: 0, sol: `x² + y² ≥ (x + y)²/2 = ${s * s}/2 = ${(s * s) / 2} (vì (x − y)² ≥ 0). Dấu “=” khi x = y = ${s / 2}.` };
  });

  /* ======================= TOÁN CHUYÊN ======================= */
  const S2 = 'toanchuyen';
  const add2 = (topic, gen) => LT.add(S2, 'sa', topic, gen);
  const U2 = { sh: 'Số học', ds: 'Đại số – biến đổi', pt: 'Phương trình – hệ phương trình', bdt: 'Bất đẳng thức – cực trị', th: 'Tổ hợp – đếm', hh: 'Hình học phẳng' };
  LT.TOPICS[S2] = Object.values(U2);
  LT.addKnow(S2, {
    [U2.sh]: 'N = p₁^a·p₂^b·p₃^c có (a + 1)(b + 1)(c + 1) ước nguyên dương. Đồng dư: nếu a ≡ b (mod m) thì aⁿ ≡ bⁿ (mod m); chữ số tận cùng của aⁿ lặp theo chu kì (thường chu kì 4). Phương trình nghiệm nguyên: đưa về dạng tích (x − a)(y − b) = k rồi xét ước.',
    [U2.ds]: 'Biểu thức đối xứng: a² + b² = (a + b)² − 2ab; a³ + b³ = (a + b)³ − 3ab(a + b). Với x + 1/x = t: x² + 1/x² = t² − 2; x³ + 1/x³ = t³ − 3t. Tổng sai phân: 1/(k(k + 1)) = 1/k − 1/(k + 1).',
    [U2.pt]: 'Phương trình √A = B ⇔ B ≥ 0 và A = B². Luôn thử lại nghiệm hoặc đối chiếu điều kiện để loại nghiệm ngoại lai.',
    [U2.bdt]: 'AM–GM: a + b ≥ 2√(ab). Cauchy–Schwarz dạng Engel: a²/x + b²/y ≥ (a + b)²/(x + y) với x, y > 0. Luôn chỉ ra dấu “=” xảy ra.',
    [U2.th]: 'Đa giác lồi n cạnh có n(n − 3)/2 đường chéo. Số cách chọn k phần tử từ n: C(n, k). Số nghiệm nguyên dương của x₁ + … + x_k = n là C(n − 1, k − 1).',
    [U2.hh]: 'Diện tích tam giác (Heron): S = √(p(p − a)(p − b)(p − c)), p là nửa chu vi. Bán kính đường tròn nội tiếp r = S/p; ngoại tiếp R = abc/(4S).',
  });
  const nd = (n) => { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c; };
  const modpow = (b, e, m) => { let r = 1 % m; b %= m; while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e >>= 1; } return r; };
  add2(U2.sh, (r) => {
    const a = r.int(1, 5), b = r.int(1, 4), c = r.int(0, 3);
    const N = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c);
    return { q: `Số ${N} có bao nhiêu ước nguyên dương?`, ans: (a + 1) * (b + 1) * (c + 1), dp: 0, sol: `${N} = 2<sup>${a}</sup>·3<sup>${b}</sup>${c ? '·5<sup>' + c + '</sup>' : ''} ⇒ số ước = (${a} + 1)(${b} + 1)${c ? '(' + c + ' + 1)' : ''} = ${(a + 1) * (b + 1) * (c + 1)}.` };
  });
  add2(U2.sh, (r) => {
    const b = r.pick([2, 3, 7, 13, 17]), e = r.int(2025, 2099), m = r.pick([5, 7, 9, 11, 13]);
    if (b % m === 0) throw new Error('retry');
    return { q: `Tìm số dư khi chia ${b}<sup>${e}</sup> cho ${m}.`, ans: modpow(b, e, m), dp: 0, sol: `Tìm chu kì của ${b}ⁿ mod ${m} (theo định lí Fermat nhỏ hoặc tính trực tiếp các luỹ thừa nhỏ), rồi rút gọn số mũ ${e} theo chu kì. Kết quả: ${b}<sup>${e}</sup> ≡ ${modpow(b, e, m)} (mod ${m}).` };
  });
  add2(U2.sh, (r) => {
    const b = r.pick([2, 3, 7, 8, 9, 13]), e = r.int(100, 2100);
    return { q: `Tìm chữ số tận cùng của ${b}<sup>${e}</sup>.`, ans: modpow(b, e, 10), dp: 0, sol: `Chữ số tận cùng của ${b}ⁿ lặp lại theo chu kì 4 (hoặc ước của 4). ${e} chia 4 dư ${e % 4} ⇒ chữ số tận cùng là ${modpow(b, e, 10)}.` };
  });
  add2(U2.sh, (r) => {
    const k = r.pick([5, 7, 11, 15, 17, 23, 29, 35, 47, 59]);
    return { q: `Có bao nhiêu cặp số nguyên dương (x; y) thoả mãn xy − x − y = ${k}?`, ans: nd(k + 1), dp: 0, sol: `xy − x − y = ${k} ⇔ (x − 1)(y − 1) = ${k + 1}. Vì x, y nguyên dương và tích dương nên x − 1, y − 1 là các ước dương của ${k + 1}. ${k + 1} có ${nd(k + 1)} ước dương ⇒ ${nd(k + 1)} cặp (có thứ tự).` };
  });
  add2(U2.ds, (r) => {
    const s = r.int(2, 9), p = r.int(-6, 6);
    return { q: `Cho a + b = ${s} và ab = ${p}. Tính a³ + b³.`, ans: s * s * s - 3 * p * s, dp: 0, sol: `a³ + b³ = (a + b)³ − 3ab(a + b) = ${s}³ − 3·(${p})·${s} = ${s * s * s - 3 * p * s}.` };
  });
  add2(U2.ds, (r) => {
    const t = r.int(3, 7), k = r.int(0, 1);
    return k ? { q: `Cho x > 0 thoả mãn x + 1/x = ${t}. Tính x³ + 1/x³.`, ans: t * t * t - 3 * t, dp: 0, sol: `x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x) = ${t}³ − 3·${t} = ${t * t * t - 3 * t}.` } : { q: `Cho x > 0 thoả mãn x + 1/x = ${t}. Tính x² + 1/x².`, ans: t * t - 2, dp: 0, sol: `x² + 1/x² = (x + 1/x)² − 2 = ${t * t} − 2 = ${t * t - 2}.` };
  });
  add2(U2.ds, (r) => {
    const n = r.int(5, 40);
    return { q: `Tính S = ${frs(1, '1·2')} + ${frs(1, '2·3')} + … + ${frs(1, n + '·' + (n + 1))} (làm tròn đến hàng phần nghìn).`, ans: round(n / (n + 1), 3), dp: 3, sol: `1/(k(k + 1)) = 1/k − 1/(k + 1) ⇒ S = 1 − 1/${n + 1} = ${n}/${n + 1} ≈ ${numF(round(n / (n + 1), 3), 3)}.` };
  });
  add2(U2.pt, (r) => {
    const rt = r.int(3, 12), b = r.int(0, rt - 1);
    const a = (rt - b) * (rt - b) - rt;
    // √(x + a) = x − b ⇔ x ≥ b, x² − (2b + 1)x + b² − a = 0
    const disc = (2 * b + 1) * (2 * b + 1) - 4 * (b * b - a);
    const sd = Math.sqrt(disc);
    const roots = [((2 * b + 1) + sd) / 2, ((2 * b + 1) - sd) / 2].filter((x, i, arr) => arr.indexOf(x) === i).filter((x) => x - b >= -1e-9 && x + a >= -1e-9);
    const sum = roots.reduce((s, x) => s + x, 0);
    if (!Number.isInteger(round(sum, 6))) throw new Error('retry');
    return { q: `Tính tổng các nghiệm của phương trình √(x ${sg(a).trim() || '+ 0'}) = x ${b ? MINUS + ' ' + b : ''}.`, ans: round(sum, 0), dp: 0, sol: `Điều kiện x ≥ ${b}. Bình phương hai vế: x ${sg(a).trim()} = (x − ${b})² ⇔ ${poly([1, -(2 * b + 1), b * b - a])} = 0 ⇔ x = ${num(((2 * b + 1) + sd) / 2)} hoặc x = ${num(((2 * b + 1) - sd) / 2)}. Đối chiếu điều kiện, nhận ${roots.map((x) => num(x)).join(' và ')}. Tổng = ${num(sum)}.` };
  });
  add2(U2.pt, (r) => {
    let x, y; do { x = r.int(-5, 6); y = r.int(-5, 6); } while (x === y);
    const s = x + y, p = x * y;
    return { q: `Giải hệ phương trình { x + y = ${s}; x² + y² = ${x * x + y * y} }. Tính giá trị lớn nhất của x trong các nghiệm (x; y).`, ans: Math.max(x, y), dp: 0, sol: `xy = ((x + y)² − (x² + y²))/2 = (${s * s} − ${x * x + y * y})/2 = ${p}. x, y là nghiệm của t² − ${s}t ${sg(p)} = 0 ⇒ t = ${x} hoặc ${y}. Hệ có nghiệm (${x}; ${y}) và (${y}; ${x}) ⇒ x lớn nhất bằng ${Math.max(x, y)}.` };
  });
  add2(U2.bdt, (r) => {
    const s = r.pick([1, 2, 3, 4, 5, 6]), [a, b] = r.pick([[1, 2], [1, 3], [2, 3], [1, 1]]);
    const m = ((a + b) * (a + b)) / s;
    return { q: `Cho x, y > 0 thoả mãn x + y = ${s}. Tìm giá trị nhỏ nhất của P = ${frs(a * a, 'x')} + ${frs(b * b, 'y')} (làm tròn đến hàng phần trăm).`, ans: round(m, 2), dp: 2, sol: `Theo bất đẳng thức Cauchy–Schwarz: ${a * a}/x + ${b * b}/y ≥ (${a} + ${b})²/(x + y) = ${(a + b) * (a + b)}/${s} ≈ ${numF(round(m, 2), 2)}. Dấu “=” khi x/${a} = y/${b}, tức x = ${num((a * s) / (a + b), 3)}, y = ${num((b * s) / (a + b), 3)}.` };
  });
  add2(U2.th, (r) => {
    const k = r.int(0, 2);
    if (k === 0) { const n = r.int(6, 25); return { q: `Một đa giác lồi có ${n} cạnh. Hỏi đa giác đó có bao nhiêu đường chéo?`, ans: (n * (n - 3)) / 2, dp: 0, sol: `Số đường chéo = n(n − 3)/2 = ${n}·${n - 3}/2 = ${(n * (n - 3)) / 2}.` }; }
    if (k === 1) { const n = r.int(6, 20); return { q: `Một giải bóng đá có ${n} đội thi đấu vòng tròn hai lượt (mỗi cặp đội gặp nhau 2 trận). Tổng số trận đấu là bao nhiêu?`, ans: n * (n - 1), dp: 0, sol: `Số cặp đội C(${n}, 2) = ${C(n, 2)}, mỗi cặp 2 trận ⇒ ${n * (n - 1)} trận.` }; }
    const n = r.int(6, 20);
    return { q: `Có bao nhiêu bộ ba số nguyên dương (x; y; z) thoả mãn x + y + z = ${n}?`, ans: C(n - 1, 2), dp: 0, sol: `Phương pháp “chia kẹo”: số nghiệm nguyên dương bằng C(${n} − 1, 2) = C(${n - 1}, 2) = ${C(n - 1, 2)}.` };
  });
  add2(U2.hh, (r) => {
    const [a, b, c] = r.pick([[13, 14, 15], [5, 12, 13], [6, 8, 10], [9, 12, 15], [7, 24, 25], [10, 13, 13], [9, 10, 17], [8, 15, 17]]);
    const p = (a + b + c) / 2, S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    const askR = r.bool();
    const v = askR ? (a * b * c) / (4 * S) : S / p;
    return { q: `Cho tam giác có độ dài ba cạnh là ${a}, ${b}, ${c} (cm). Tính bán kính đường tròn ${askR ? 'ngoại tiếp' : 'nội tiếp'} tam giác (cm, làm tròn đến hàng phần trăm).`, ans: round(v, 2), dp: 2, sol: `Nửa chu vi p = ${num(p)}. Diện tích (Heron) S = √(${num(p)}·${num(p - a)}·${num(p - b)}·${num(p - c)}) = ${num(S)}. ${askR ? `R = abc/(4S) = ${a * b * c}/(4·${num(S)})` : `r = S/p = ${num(S)}/${num(p)}`} ≈ ${numF(round(v, 2), 2)} cm.` };
  });

  /* ======================= TIẾNG ANH VÀO 10 ======================= */
  const S3 = 'anh10';
  const E = { pr: 'Ngữ âm', st: 'Trọng âm', te: 'Thì động từ', pa: 'Câu bị động', co: 'Câu điều kiện & câu ước', re: 'Mệnh đề quan hệ', rs: 'Câu tường thuật', gi: 'Danh động từ & động từ nguyên mẫu', cp: 'So sánh', pp: 'Giới từ & cụm động từ', wf: 'Từ loại', vo: 'Từ vựng & kết hợp từ', cm: 'Giao tiếp', tr: 'Viết lại câu', er: 'Tìm lỗi sai', rd: 'Đọc hiểu' };
  LT.TOPICS[S3] = Object.values(E);
  LT.addKnow(S3, {
    [E.pr]: 'Đuôi -ed: /ɪd/ sau t, d; /t/ sau âm vô thanh (p, k, f, s, ʃ, tʃ); /d/ sau các âm còn lại. Đuôi -s/-es: /ɪz/ sau s, z, ʃ, tʃ, ʒ, dʒ; /s/ sau p, t, k, f, θ; /z/ sau các âm còn lại.',
    [E.st]: 'Động từ 2 âm tiết thường nhấn âm 2 (begin, decide); danh từ/tính từ 2 âm tiết thường nhấn âm 1 (happy, teacher). Từ tận cùng -tion, -sion, -ic nhấn ngay trước đuôi; -ee, -eer nhấn vào chính đuôi.',
    [E.te]: 'Hiện tại hoàn thành (have/has + V3) với since/for, yet, already; quá khứ tiếp diễn cho hành động đang xảy ra thì hành động khác xen vào; quá khứ hoàn thành (had + V3) cho hành động xảy ra trước một mốc quá khứ.',
    [E.pa]: 'Bị động: be + V3 (be chia theo thì của câu chủ động). Tiếp diễn: be being V3; hoàn thành: have/has been V3; tương lai: will be V3. Cấu trúc “They say that S + V” → “S is said to V”.',
    [E.co]: 'Loại 1: If + hiện tại đơn, will + V. Loại 2: If + quá khứ đơn (were), would + V. Loại 3: If + had V3, would have V3. Câu ước: wish + quá khứ đơn (hiện tại), wish + had V3 (quá khứ). Unless = If … not.',
    [E.re]: 'who (người, làm chủ ngữ), whom (người, làm tân ngữ), which (vật), whose (sở hữu), where (nơi chốn), when (thời gian). Mệnh đề không xác định (có dấu phẩy) không dùng that.',
    [E.rs]: 'Lùi thì khi động từ tường thuật ở quá khứ (am/is → was, do → did…). Câu hỏi Yes/No: asked + if/whether + S + V. Câu hỏi Wh-: asked + wh- + S + V (không đảo ngữ). Mệnh lệnh: told sb (not) to V.',
    [E.gi]: 'V-ing sau: enjoy, mind, avoid, finish, giới từ, It’s no use… To V sau: decide, want, hope, plan. Let/make + O + V nguyên mẫu.',
    [E.cp]: 'So sánh hơn: adj-er / more adj + than. Nhất: the adj-est / the most adj. Ngang bằng: as adj as. Càng… càng: The + so sánh hơn…, the + so sánh hơn. Bất quy tắc: good–better–best, bad–worse–worst.',
    [E.pp]: 'on + ngày/thứ, in + tháng/năm, at + giờ. good at, interested in, famous for. turn off (tắt), look for (tìm), look after (chăm sóc), give up (từ bỏ).',
    [E.wf]: 'Trạng từ bổ nghĩa cho động từ (sing beautifully); tính từ đứng trước danh từ (environmental problem); danh từ đứng sau mạo từ/tính từ.',
    [E.vo]: 'Collocations: make an effort, do sb a favour, pay attention, take a photo. Renewable energy: năng lượng tái tạo.',
    [E.cm]: 'Cảm ơn → You’re welcome. Lời mời “Would you like…?” → Yes, please / No, thanks. Lời rủ “How about…?” → That’s a great idea. Lời xin lỗi → That’s all right / Never mind.',
    [E.tr]: 'Bắt đầu làm… từ… → have done for/since. too + adj + to V = not adj enough to V. Although + mệnh đề = Despite/In spite of + danh từ/V-ing.',
    [E.er]: 'Soát lỗi chia động từ theo chủ ngữ, giới từ đi kèm, since/for, so sánh kép (more taller sai).',
    [E.rd]: 'Đọc câu hỏi trước, gạch từ khoá, tìm đoạn chứa thông tin; câu hỏi NOT mentioned cần loại từng phương án; câu hỏi ý chính chọn phương án bao quát cả bài.',
  });
  const P = 'Choose the word whose underlined part is pronounced differently from the others.';
  const ST = 'Choose the word that differs from the other three in the position of primary stress.';
  const ER = 'Identify the underlined part that needs correction.';
  const HOIAN = '<div class="passage">Hoi An is an ancient town in Quang Nam Province. It was an important trading port from the 15th to the 19th century. Today, it is famous for its old houses, the Japanese Covered Bridge and colourful lanterns. In 1999, Hoi An was recognized as a UNESCO World Heritage Site. Every month, on the full-moon night, people turn off the electric lights and light lanterns, which creates a magical atmosphere.</div>';
  const PLASTIC = '<div class="passage">Plastic pollution is one of the biggest environmental problems today. Every year, millions of tonnes of plastic end up in the oceans, harming fish, turtles and seabirds. Plastic can take hundreds of years to break down. To reduce plastic waste, we can bring our own bags when shopping, use reusable bottles and say no to plastic straws. Small actions from each person can make a big difference.</div>';
  const bank = [
    [E.pr, P, 'want<u>ed</u>', 'play<u>ed</u>', 'open<u>ed</u>', 'clean<u>ed</u>', '“wanted” đọc /ɪd/ (sau âm /t/); các từ còn lại đọc /d/.'],
    [E.pr, P, 'watch<u>ed</u>', 'need<u>ed</u>', 'visit<u>ed</u>', 'decid<u>ed</u>', '“watched” đọc /t/ (sau /tʃ/); các từ còn lại đọc /ɪd/.'],
    [E.pr, P, 'book<u>s</u>', 'pen<u>s</u>', 'bag<u>s</u>', 'toy<u>s</u>', '“books” đọc /s/ (sau /k/); các từ còn lại đọc /z/.'],
    [E.pr, P, 'watch<u>es</u>', 'stop<u>s</u>', 'laugh<u>s</u>', 'book<u>s</u>', '“watches” đọc /ɪz/; các từ còn lại đọc /s/.'],
    [E.pr, P, 'h<u>ea</u>d', 'm<u>ea</u>t', 't<u>ea</u>ch', 'b<u>ea</u>ch', '“head” đọc /e/; các từ còn lại đọc /iː/.'],
    [E.pr, P, 'c<u>a</u>ll', 'c<u>a</u>t', 'h<u>a</u>t', 'm<u>a</u>p', '“call” đọc /ɔː/; các từ còn lại đọc /æ/.'],
    [E.pr, P, '<u>ch</u>emistry', '<u>ch</u>air', '<u>ch</u>eap', '<u>ch</u>ild', '“chemistry” đọc /k/; các từ còn lại đọc /tʃ/.'],
    [E.pr, P, '<u>th</u>ink', '<u>th</u>is', '<u>th</u>ey', '<u>th</u>ere', '“think” đọc /θ/; các từ còn lại đọc /ð/.'],
    [E.pr, P, 'h<u>o</u>me', 'h<u>o</u>t', 'st<u>o</u>p', 'b<u>o</u>x', '“home” đọc /əʊ/; các từ còn lại đọc /ɒ/.'],
    [E.pr, P, 'f<u>oo</u>d', 'g<u>oo</u>d', 'b<u>oo</u>k', 'f<u>oo</u>t', '“food” đọc /uː/; các từ còn lại đọc /ʊ/.'],
    [E.pr, P, '<u>h</u>our', '<u>h</u>ouse', '<u>h</u>appy', '<u>h</u>otel', '“hour” có h câm; các từ còn lại đọc /h/.'],
    [E.pr, P, 'c<u>i</u>ty', 'f<u>i</u>ne', 'k<u>i</u>nd', 'n<u>i</u>ce', '“city” đọc /ɪ/; các từ còn lại đọc /aɪ/.'],
    [E.st, ST, 'begin', 'happy', 'water', 'teacher', '“begin” nhấn âm 2; các từ còn lại nhấn âm 1.'],
    [E.st, ST, 'happen', 'arrive', 'decide', 'explain', '“happen” nhấn âm 1; các từ còn lại nhấn âm 2.'],
    [E.st, ST, 'important', 'beautiful', 'family', 'holiday', '“important” nhấn âm 2; các từ còn lại nhấn âm 1.'],
    [E.st, ST, 'engineer', 'difficult', 'national', 'animal', '“engineer” nhấn âm 3 (đuôi -eer); các từ còn lại nhấn âm 1.'],
    [E.st, ST, 'protect', 'colour', 'person', 'village', '“protect” nhấn âm 2; các từ còn lại nhấn âm 1.'],
    [E.st, ST, 'environment', 'information', 'population', 'conversation', '“environment” nhấn âm 2; các từ đuôi -tion nhấn âm 3.'],
    [E.st, ST, 'polite', 'student', 'window', 'garden', '“polite” nhấn âm 2; các từ còn lại nhấn âm 1.'],
    [E.st, ST, 'volunteer', 'interview', 'telephone', 'furniture', '“volunteer” nhấn âm 3; các từ còn lại nhấn âm 1.'],
    [E.te, 'She ___ English for five years.', 'has learned', 'learns', 'learned', 'is learning', '“for five years” (khoảng thời gian kéo dài đến hiện tại) → hiện tại hoàn thành.'],
    [E.te, 'When I came, they ___ dinner.', 'were having', 'had', 'have had', 'are having', 'Hành động đang diễn ra (quá khứ tiếp diễn) thì hành động khác xen vào (quá khứ đơn).'],
    [E.te, 'Look! The children ___ in the garden.', 'are playing', 'play', 'played', 'have played', '“Look!” → hành động đang diễn ra: hiện tại tiếp diễn.'],
    [E.te, 'By the time we arrived, the film ___.', 'had started', 'started', 'has started', 'starts', '“By the time + quá khứ” → hành động xảy ra trước: quá khứ hoàn thành.'],
    [E.te, 'I ___ to Da Nang last summer.', 'went', 'have gone', 'go', 'had gone', '“last summer” là mốc quá khứ xác định → quá khứ đơn.'],
    [E.te, 'Water ___ at 100 °C.', 'boils', 'is boiling', 'boiled', 'has boiled', 'Sự thật hiển nhiên → hiện tại đơn.'],
    [E.te, 'This time next week, we ___ on the beach.', 'will be lying', 'lie', 'are lying', 'have lain', '“This time next week” → tương lai tiếp diễn.'],
    [E.te, 'He has lived here ___ 2020.', 'since', 'for', 'in', 'from', 'since + mốc thời gian; for + khoảng thời gian.'],
    [E.te, 'I ___ my homework yet.', "haven't finished", "didn't finish", "don't finish", "hadn't finished", '“yet” trong câu phủ định → hiện tại hoàn thành.'],
    [E.pa, 'This bridge ___ in 2015.', 'was built', 'built', 'is built', 'has built', 'Cây cầu “được xây” (bị động) trong quá khứ → was built.'],
    [E.pa, 'English ___ in many countries.', 'is spoken', 'speaks', 'is speaking', 'spoke', 'Tiếng Anh “được nói” → bị động hiện tại đơn: is spoken.'],
    [E.pa, 'The letter ___ tomorrow.', 'will be sent', 'will send', 'is sent', 'sends', '“tomorrow” + bị động → will be sent.'],
    [E.pa, 'The room ___ at the moment.', 'is being cleaned', 'is cleaning', 'cleans', 'has cleaned', '“at the moment” + bị động → is being cleaned.'],
    [E.pa, 'A new school ___ in our village since last year.', 'has been built', 'was built', 'is built', 'has built', '“since last year” + bị động → has been built.'],
    [E.pa, 'They say that he is rich. → He is said ___ rich.', 'to be', 'being', 'be', 'to being', 'S + is said + to V.'],
    [E.co, 'If it ___ tomorrow, we will stay at home.', 'rains', 'rained', 'will rain', 'would rain', 'Câu điều kiện loại 1: If + hiện tại đơn, will + V.'],
    [E.co, 'If I ___ you, I would study harder.', 'were', 'am', 'will be', 'had been', 'Câu điều kiện loại 2: If I were you…'],
    [E.co, 'If she had studied harder, she ___ the exam.', 'would have passed', 'would pass', 'will pass', 'passed', 'Câu điều kiện loại 3: would have + V3.'],
    [E.co, 'I wish I ___ taller.', 'were', 'am', 'will be', 'have been', 'Ước điều trái hiện tại: wish + quá khứ đơn (were).'],
    [E.co, '___ you hurry, you will miss the bus.', 'Unless', 'If', 'Because', 'When', 'Unless = If… not: Nếu không nhanh lên, bạn sẽ lỡ xe buýt.'],
    [E.co, 'I wish I ___ to the party last night.', 'had gone', 'went', 'go', 'have gone', 'Ước điều trái quá khứ: wish + had V3.'],
    [E.re, 'The man ___ is talking to my father is a doctor.', 'who', 'which', 'whose', 'whom', 'Thay cho người, làm chủ ngữ → who.'],
    [E.re, 'This is the book ___ I bought yesterday.', 'which', 'who', 'whose', 'where', 'Thay cho vật → which.'],
    [E.re, 'The girl ___ bike was stolen is crying.', 'whose', 'who', 'which', 'whom', 'Chỉ sở hữu (xe đạp của cô gái) → whose.'],
    [E.re, 'Ha Long Bay, ___ is in Quang Ninh, attracts many tourists.', 'which', 'that', 'where', 'who', 'Mệnh đề không xác định (có dấu phẩy), thay cho vật, làm chủ ngữ → which (không dùng that).'],
    [E.re, 'That is the village ___ I was born.', 'where', 'which', 'when', 'who', 'Thay cho nơi chốn → where.'],
    [E.rs, 'He said, “I am tired.” → He said that he ___ tired.', 'was', 'is', 'has been', 'will be', 'Lùi thì: am → was.'],
    [E.rs, 'She asked me, “Where do you live?” → She asked me where I ___.', 'lived', 'live', 'did I live', 'do I live', 'Câu hỏi Wh- tường thuật: không đảo ngữ và lùi thì → where I lived.'],
    [E.rs, '“Don’t touch it,” the teacher said to us. → The teacher told us ___ it.', 'not to touch', "don't touch", 'to not touching', 'not touching', 'Mệnh lệnh phủ định: told sb not to V.'],
    [E.rs, '“Are you a student?” he asked me. → He asked me ___ a student.', 'if I was', 'was I', 'if I am', 'that I was', 'Câu hỏi Yes/No: asked + if + S + V (lùi thì).'],
    [E.gi, 'I enjoy ___ books in my free time.', 'reading', 'to read', 'read', 'to reading', 'enjoy + V-ing.'],
    [E.gi, 'She decided ___ abroad.', 'to study', 'studying', 'study', 'studied', 'decide + to V.'],
    [E.gi, 'He is interested in ___ stamps.', 'collecting', 'collect', 'to collect', 'collected', 'Sau giới từ (in) dùng V-ing.'],
    [E.gi, 'My parents let me ___ out at weekends.', 'go', 'to go', 'going', 'went', 'let + O + V nguyên mẫu.'],
    [E.gi, 'Would you mind ___ the window?', 'opening', 'to open', 'open', 'opened', 'mind + V-ing.'],
    [E.gi, "It's no use ___ about it.", 'worrying', 'to worry', 'worry', 'worried', 'It’s no use + V-ing.'],
    [E.cp, 'This book is ___ than that one.', 'more interesting', 'interestinger', 'most interesting', 'as interesting', 'Tính từ dài: more + adj + than.'],
    [E.cp, 'Nam is the ___ student in my class.', 'tallest', 'taller', 'most tall', 'tall', 'So sánh nhất tính từ ngắn: the + adj-est.'],
    [E.cp, 'The ___ you study, the better results you get.', 'harder', 'hard', 'hardest', 'more hard', 'Càng… càng: The + so sánh hơn…, the + so sánh hơn.'],
    [E.cp, 'Her house is not as ___ as mine.', 'big', 'bigger', 'biggest', 'more big', 'So sánh ngang bằng: as + adj nguyên mẫu + as.'],
    [E.cp, 'Today is ___ than yesterday.', 'worse', 'badder', 'worst', 'more bad', 'bad – worse – worst (bất quy tắc).'],
    [E.pp, 'I was born ___ 15th May.', 'on', 'in', 'at', 'for', 'on + ngày cụ thể.'],
    [E.pp, 'She is good ___ maths.', 'at', 'in', 'on', 'with', 'be good at.'],
    [E.pp, 'Please ___ the lights when you leave.', 'turn off', 'turn on', 'turn up', 'turn into', 'turn off: tắt.'],
    [E.pp, "I'm looking ___ my keys. Have you seen them?", 'for', 'after', 'at', 'up', 'look for: tìm kiếm.'],
    [E.pp, 'We should ___ our grandparents.', 'look after', 'look for', 'look up', 'look into', 'look after: chăm sóc.'],
    [E.pp, 'He gave ___ smoking last year.', 'up', 'in', 'off', 'away', 'give up: từ bỏ.'],
    [E.pp, 'Our school is famous ___ its beautiful garden.', 'for', 'of', 'with', 'about', 'be famous for.'],
    [E.wf, 'She sings very ___. (BEAUTIFUL)', 'beautifully', 'beautiful', 'beauty', 'beautify', 'Bổ nghĩa cho động từ “sings” → trạng từ.'],
    [E.wf, 'Pollution is a serious ___ problem. (ENVIRONMENT)', 'environmental', 'environment', 'environmentally', 'environmentalist', 'Đứng trước danh từ “problem” → tính từ.'],
    [E.wf, 'We need more ___ about the course. (INFORM)', 'information', 'informative', 'inform', 'informed', 'Sau “more” và làm tân ngữ → danh từ.'],
    [E.wf, 'He is one of the most ___ writers. (SUCCESS)', 'successful', 'success', 'successfully', 'succeed', 'Đứng trước danh từ “writers” → tính từ.'],
    [E.wf, 'The ___ of the new library made students happy. (OPEN)', 'opening', 'open', 'opened', 'opener', 'Sau “The” và trước “of” → danh từ (sự khai trương).'],
    [E.wf, 'It is ___ to swim in this river. (DANGER)', 'dangerous', 'danger', 'dangerously', 'endanger', 'Sau “is” làm vị ngữ → tính từ.'],
    [E.vo, 'We must ___ an effort to protect the environment.', 'make', 'do', 'take', 'get', 'make an effort: nỗ lực.'],
    [E.vo, 'Can you ___ me a favour?', 'do', 'make', 'give', 'take', 'do sb a favour: giúp ai một việc.'],
    [E.vo, 'Students should ___ attention to the teacher.', 'pay', 'give', 'take', 'make', 'pay attention to: chú ý.'],
    [E.vo, 'She ___ a photo of the beautiful scenery.', 'took', 'made', 'did', 'had', 'take a photo: chụp ảnh.'],
    [E.vo, 'Áo dài is the ___ dress of Vietnamese women.', 'traditional', 'modern', 'casual', 'foreign', 'traditional: truyền thống.'],
    [E.vo, 'Solar energy is a ___ source of energy.', 'renewable', 'harmful', 'limited', 'polluted', 'renewable: có thể tái tạo.'],
    [E.cm, 'Lan: “Thank you very much for your help.” – Mai: “___”', "You're welcome.", 'Yes, please.', 'I agree.', 'Not at all bad.', 'Đáp lại lời cảm ơn: You’re welcome.'],
    [E.cm, '“Would you like a cup of tea?” – “___”', 'Yes, please.', "You're welcome.", "No, I don't.", "That's right.", 'Nhận lời mời: Yes, please.'],
    [E.cm, '“How about going to the cinema tonight?” – “___”', "That's a great idea.", 'Yes, I do.', 'You are right.', "I'm fine, thanks.", 'Đồng ý lời rủ: That’s a great idea.'],
    [E.cm, '“Congratulations on your success!” – “___”', 'Thank you.', "I'm sorry.", 'Never mind.', 'Same to you.', 'Đáp lại lời chúc mừng: Thank you.'],
    [E.cm, "“I'm sorry I'm late.” – “___”", "That's all right.", "You're welcome.", 'Congratulations!', 'Yes, please.', 'Đáp lại lời xin lỗi: That’s all right.'],
    [E.cm, '“What does your father do?” – “___”', "He's an engineer.", "He's fine, thanks.", 'He likes football.', 'He is tall.', '“What does he do?” hỏi nghề nghiệp.'],
    [E.tr, 'Choose the sentence closest in meaning: “I started learning English 5 years ago.”', 'I have learned English for 5 years.', 'I learned English for 5 years.', "I haven't learned English for 5 years.", 'I learn English 5 years ago.', 'started … ago → have done … for.'],
    [E.tr, 'Choose the sentence closest in meaning: “It’s a pity I can’t speak French.”', 'I wish I could speak French.', 'I wish I can speak French.', "I wish I couldn't speak French.", 'If only I can speak French.', 'Tiếc điều ở hiện tại → wish + could.'],
    [E.tr, 'Choose the sentence closest in meaning: “He is too young to drive a car.”', 'He is not old enough to drive a car.', 'He is old enough to drive a car.', 'He is so young that he can drive a car.', 'He is young enough to drive a car.', 'too + adj + to V = not + adj trái nghĩa + enough + to V.'],
    [E.tr, 'Choose the sentence closest in meaning: “Although it rained heavily, they went out.”', 'Despite the heavy rain, they went out.', 'Because of the heavy rain, they went out.', 'In spite it rained heavily, they went out.', 'Despite it rained heavily, they went out.', 'Although + mệnh đề = Despite + cụm danh từ.'],
    [E.tr, 'Choose the sentence closest in meaning: “Nobody in my class is taller than Nam.”', 'Nam is the tallest student in my class.', 'Nam is taller than nobody in my class.', 'Nam is not as tall as other students.', 'Nam is shorter than everyone.', 'Không ai cao hơn Nam → Nam cao nhất.'],
    [E.tr, 'Choose the sentence closest in meaning: “The last time I saw her was 2 years ago.”', "I haven't seen her for 2 years.", 'I saw her for 2 years.', 'I have seen her for 2 years.', "I didn't see her 2 years ago.", 'The last time … ago → haven’t done … for.'],
    [E.er, ER + ' “<u>She</u> <u>don’t</u> <u>like</u> <u>coffee</u>.”', 'don’t', 'She', 'like', 'coffee', 'Chủ ngữ số ít “She” → doesn’t.'],
    [E.er, ER + ' “<u>I</u> <u>have lived</u> <u>here</u> <u>since</u> five years.”', 'since', 'I', 'have lived', 'here', '“five years” là khoảng thời gian → for.'],
    [E.er, ER + ' “<u>He</u> <u>is</u> interested <u>on</u> <u>music</u>.”', 'on', 'He', 'is', 'music', 'interested in.'],
    [E.er, ER + ' “<u>My brother</u> <u>is</u> <u>more taller</u> <u>than me</u>.”', 'more taller', 'My brother', 'is', 'than me', 'tall là tính từ ngắn → taller (không dùng more).'],
    [E.rd, HOIAN + 'Hoi An was recognized as a UNESCO World Heritage Site in ___.', '1999', '1995', '2009', 'the 15th century', 'Câu: “In 1999, Hoi An was recognized as a UNESCO World Heritage Site.”'],
    [E.rd, HOIAN + 'What happens on the full-moon night?', 'People light lanterns instead of electric lights.', 'People build new bridges.', 'The town is closed to tourists.', 'People sell old houses.', 'Câu cuối: “people turn off the electric lights and light lanterns”.'],
    [E.rd, HOIAN + 'The word “famous” in the passage is closest in meaning to ___.', 'well-known', 'strange', 'modern', 'expensive', 'famous = well-known: nổi tiếng.'],
    [E.rd, PLASTIC + 'According to the passage, plastic can take ___ to break down.', 'hundreds of years', 'a few days', 'ten years', 'one month', 'Câu: “Plastic can take hundreds of years to break down.”'],
    [E.rd, PLASTIC + 'Which is NOT mentioned as a way to reduce plastic waste?', 'Burning plastic bags', 'Bringing our own bags', 'Using reusable bottles', 'Refusing plastic straws', 'Bài chỉ nêu mang túi riêng, dùng chai tái sử dụng, từ chối ống hút nhựa.'],
    [E.rd, PLASTIC + 'What is the main idea of the passage?', 'Plastic pollution and how we can reduce it', 'How to make plastic bags', 'The life of sea turtles', 'Shopping in supermarkets', 'Bài nói về ô nhiễm nhựa và cách giảm thiểu.'],
  ];
  LT.addConcepts(S3, bank.map(([t, q, a, d1, d2, d3, ex]) => ({ t, q, a, d: [d1, d2, d3], kn: LT.KNOW[S3][t], sol: ex })));

  /* ======================= CẨM NANG ======================= */
  LT.GUIDE = LT.GUIDE || {};
  LT.GUIDE[S1] = {
    [T.can]: { m: ['Tìm điều kiện xác định (biểu thức dưới căn ≥ 0, mẫu ≠ 0).', 'Phân tích tử, mẫu thành nhân tử (hằng đẳng thức x − a² = (√x − a)(√x + a)).', 'Quy đồng, rút gọn rồi thay giá trị.'], t: ['Quên điều kiện x ≠ giá trị làm mẫu bằng 0.', 'Viết √(a²) = a khi a có thể âm (đúng là |a|).'], k: 'rút gọn biểu thức chứa căn toán 9 thi vào 10' },
    [T.hs]: { m: ['Điểm thuộc đồ thị: thay toạ độ vào công thức.', 'Giao điểm parabol – đường thẳng: lập phương trình hoành độ giao điểm.', 'Dùng Viète cho các bài toán về hoành độ giao điểm.'], t: ['Nhầm hoành độ với tung độ khi tính.', 'Quên bình phương số âm: (−2)² = 4.'], k: 'hàm số y=ax² parabol và đường thẳng toán 9' },
    [T.hpt]: { m: ['Chọn phương pháp thế hoặc cộng đại số.', 'Giải ra một ẩn, thay vào tìm ẩn còn lại.', 'Thử lại nghiệm vào cả hai phương trình.'], t: ['Sai dấu khi chuyển vế hoặc trừ hai phương trình.'], k: 'giải hệ phương trình bậc nhất hai ẩn' },
    [T.pt2]: { m: ['Xác định a, b, c; tính Δ hoặc Δ\'.', 'Xét dấu Δ để kết luận số nghiệm.', 'Dùng Viète tính các biểu thức đối xứng của nghiệm.'], t: ['Quên kiểm tra Δ ≥ 0 trước khi dùng Viète.', 'Sai dấu: x₁ + x₂ = −b/a.'], k: 'phương trình bậc hai hệ thức Viète toán 9' },
    [T.lpt]: { m: ['Chọn ẩn, đơn vị, điều kiện.', 'Biểu diễn các đại lượng theo ẩn, lập phương trình hoặc hệ.', 'Giải, đối chiếu điều kiện, trả lời đúng câu hỏi.'], t: ['Quên loại nghiệm âm hoặc không thoả điều kiện.', 'Nhầm năng suất (công việc/ngày) với thời gian.'], k: 'giải bài toán bằng cách lập phương trình hệ phương trình thi vào 10' },
    [T.kg]: { m: ['Xác định hình (trụ, nón, cầu) và các kích thước r, h, l, R.', 'Áp dụng công thức thể tích/diện tích.', 'Đổi đơn vị (1 m³ = 1000 lít; đường kính → bán kính).'], t: ['Dùng đường kính thay cho bán kính.', 'Quên 1/3 với hình nón.'], k: 'hình trụ hình nón hình cầu toán 9' },
    [T.tg]: { m: ['Xác định cạnh đối, cạnh kề, cạnh huyền với góc đang xét.', 'Chọn tỉ số lượng giác phù hợp.', 'Bấm máy tính, làm tròn theo yêu cầu.'], t: ['Nhầm cạnh đối và cạnh kề.', 'Máy tính để chế độ Rad thay vì Deg.'], k: 'tỉ số lượng giác của góc nhọn hệ thức lượng tam giác vuông' },
    [T.dtr]: { m: ['Xác định góc nội tiếp/góc ở tâm và cung bị chắn.', 'Áp dụng tính chất tứ giác nội tiếp.', 'Độ dài cung, diện tích hình quạt theo công thức.'], t: ['Nhầm góc nội tiếp bằng số đo cung (phải là một nửa).'], k: 'góc nội tiếp tứ giác nội tiếp đường tròn toán 9' },
    [T.tk]: { m: ['Liệt kê không gian mẫu, đếm kết quả thuận lợi.', 'P = số thuận lợi / tổng số kết quả.'], t: ['Đếm thiếu hoặc trùng kết quả.'], k: 'xác suất của biến cố toán 9' },
    [T.bdt]: { m: ['Biến đổi về tổng bình phương + hằng số.', 'Hoặc áp dụng AM–GM, chỉ ra dấu “=”.'], t: ['Quên chỉ ra dấu bằng xảy ra.'], k: 'tìm giá trị nhỏ nhất bất đẳng thức Cauchy toán 9' },
  };
  LT.GUIDE[S2] = {
    [U2.sh]: { m: ['Phân tích thừa số nguyên tố hoặc xét đồng dư.', 'Tìm chu kì của luỹ thừa theo modulo.', 'Phương trình nghiệm nguyên: đưa về tích, xét ước.'], t: ['Bỏ sót ước hoặc nghiệm âm/dương.', 'Sai chu kì khi số mũ chia hết cho chu kì.'], k: 'số học thi chuyên toán đồng dư nghiệm nguyên' },
    [U2.ds]: { m: ['Đưa biểu thức về tổng và tích (a + b, ab).', 'Dùng hằng đẳng thức bậc ba.', 'Tổng sai phân: tách từng số hạng.'], t: ['Nhớ sai hằng đẳng thức (a + b)³.'], k: 'biến đổi đại số hằng đẳng thức thi chuyên toán' },
    [U2.pt]: { m: ['Đặt điều kiện, bình phương hoặc đặt ẩn phụ.', 'Giải, thử lại để loại nghiệm ngoại lai.', 'Hệ đối xứng: đặt S = x + y, P = xy.'], t: ['Không thử lại sau khi bình phương.'], k: 'phương trình vô tỉ hệ phương trình đối xứng thi chuyên' },
    [U2.bdt]: { m: ['Chọn bất đẳng thức phù hợp (AM–GM, Cauchy–Schwarz).', 'Tìm điểm rơi (dấu “=”).', 'Kết luận giá trị lớn nhất/nhỏ nhất.'], t: ['Áp dụng AM–GM cho số âm.', 'Không kiểm tra dấu “=” có xảy ra.'], k: 'bất đẳng thức Cauchy Schwarz AM GM thi chuyên toán' },
    [U2.th]: { m: ['Xác định đối tượng đếm và có/không thứ tự.', 'Dùng quy tắc cộng, nhân, tổ hợp hoặc “chia kẹo”.'], t: ['Đếm trùng do thứ tự.'], k: 'tổ hợp đếm thi chuyên toán' },
    [U2.hh]: { m: ['Tính nửa chu vi, diện tích (Heron).', 'r = S/p; R = abc/(4S).'], t: ['Dùng chu vi thay vì nửa chu vi.'], k: 'công thức Heron bán kính đường tròn nội tiếp ngoại tiếp' },
  };
  LT.GUIDE[S3] = {};
  Object.values(E).forEach((t) => (LT.GUIDE[S3][t] = { m: ['Đọc kĩ câu, xác định dấu hiệu nhận biết (từ khoá thời gian, cấu trúc).', 'Loại các phương án sai ngữ pháp.', 'Chọn phương án đúng nghĩa và đúng cấu trúc.'], t: ['Chọn theo cảm giác mà không xét dấu hiệu ngữ pháp.', 'Bỏ qua chủ ngữ số ít/số nhiều khi chia động từ.'], k: t + ' tiếng Anh thi vào 10' }));
})(typeof window !== 'undefined' ? window : globalThis);
