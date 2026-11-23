/* DẠNG BÀI KINH ĐIỂN – những dạng xuất hiện lặp lại trong đề thi Đại học/THPT Quốc gia/Tốt nghiệp THPT
   từ 2009 đến 2025, được chọn lọc phần còn nằm trong Chương trình GDPT 2018 và chuyển sang định dạng đề mới.
   Số liệu được sinh ngẫu nhiên; đáp án và lời giải được tính từ chính số liệu đó. */
(function (G) {
  'use strict';
  const LT = G.LT;
  const { num, numF, sci, fr, frs, sup, sub, poly, sg, C, round, opts, numOpts, claim, MINUS } = LT.U;
  const cl = (subj) => (part, topic, gen) => LT.addClassic(subj, part, topic, gen);

  /* ============================== TOÁN ============================== */
  const M = cl('math');
  const TM = { don: 'Tính đơn điệu & cực trị', mu: 'Mũ – Logarit', hkg: 'Hình học không gian', day: 'Dãy số – Cấp số', xs: 'Xác suất', gh: 'Giới hạn – Đạo hàm', tc: 'Tiệm cận & đồ thị' };
  const ninf = MINUS + '∞', pinf = '+∞';
  const iv = (a, b) => '(' + a + '; ' + b + ')';

  // Bảng biến thiên (rất hay gặp trong đề 2017–2025)
  function bbt(r) {
    const x1 = r.int(-3, 1), x2 = x1 + r.int(1, 3);
    const up = r.bool(); // true: + − + ; false: − + −
    const lo = r.int(-5, 2), hi = lo + r.int(2, 7);
    const y1 = up ? hi : lo, y2 = up ? lo : hi;
    const s = up ? ['+', MINUS, '+'] : [MINUS, '+', MINUS];
    const ar = up ? ['↗', '↘', '↗'] : ['↘', '↗', '↘'];
    const ends = up ? [ninf, pinf] : [pinf, ninf];
    const table = `<table class="tbl bbt"><tr><th>x</th><td>${ninf}</td><td></td><td>${x1}</td><td></td><td>${x2}</td><td></td><td>${pinf}</td></tr>` +
      `<tr><th>f'(x)</th><td></td><td>${s[0]}</td><td>0</td><td>${s[1]}</td><td>0</td><td>${s[2]}</td><td></td></tr>` +
      `<tr><th>f(x)</th><td>${ends[0]}</td><td>${ar[0]}</td><td>${y1}</td><td>${ar[1]}</td><td>${y2}</td><td>${ar[2]}</td><td>${ends[1]}</td></tr></table>`;
    return { x1, x2, y1, y2, up, table, xCD: up ? x1 : x2, xCT: up ? x2 : x1, yCD: hi, yCT: lo };
  }
  M('mc', TM.don, (r) => {
    const b = bbt(r);
    const k = r.int(0, 3);
    const head = `Cho hàm số y = f(x) có bảng biến thiên như sau:${b.table}`;
    const sol0 = `Từ bảng biến thiên: f'(x) đổi dấu từ + sang − tại x = ${b.xCD} (điểm cực đại, y<sub>CĐ</sub> = ${b.yCD}) và từ − sang + tại x = ${b.xCT} (điểm cực tiểu, y<sub>CT</sub> = ${b.yCT}).`;
    if (k === 0) return { q: head + 'Hàm số đã cho đạt cực đại tại', opts: opts('x = ' + b.xCD, ['x = ' + b.xCT, 'x = ' + b.yCD, 'x = ' + b.yCT, 'x = 0']), sol: sol0 };
    if (k === 1) return { q: head + 'Giá trị cực tiểu của hàm số đã cho bằng', opts: numOpts(b.yCT, [b.yCD, b.xCT, b.xCD, b.yCT - 1]), sol: sol0 };
    if (k === 2) {
      const dec = b.up ? iv(b.x1, b.x2) : iv(b.x2, pinf);
      return { q: head + 'Hàm số đã cho nghịch biến trên khoảng nào dưới đây?', opts: opts(dec, b.up ? [iv(b.x2, pinf), iv(ninf, b.x1), iv(b.yCT, b.yCD)] : [iv(b.x1, b.x2), iv(ninf, b.x2), iv(b.yCT, b.yCD)]), sol: `f'(x) < 0 trên ${b.up ? iv(b.x1, b.x2) : iv(ninf, b.x1) + ' và ' + iv(b.x2, pinf)} nên hàm số nghịch biến trên khoảng đó.` };
    }
    const m = r.pick([b.yCT - 1, b.yCT, b.yCT + 1 < b.yCD ? b.yCT + 1 : b.yCD, b.yCD, b.yCD + 1]);
    const cnt = m > b.yCD || m < b.yCT ? 1 : m === b.yCD || m === b.yCT ? 2 : 3;
    return { q: head + `Số nghiệm thực của phương trình f(x) = ${m} là`, opts: numOpts(cnt, [0, 1, 2, 3, 4].filter((v) => v !== cnt)), sol: `Số nghiệm bằng số giao điểm của đồ thị y = f(x) với đường thẳng y = ${m}. ${sol0} Đường thẳng y = ${m} ${cnt === 3 ? 'nằm giữa y<sub>CT</sub> và y<sub>CĐ</sub> nên có 3 giao điểm' : cnt === 2 ? 'đi qua một điểm cực trị nên có 2 giao điểm' : 'nằm ngoài đoạn [y<sub>CT</sub>; y<sub>CĐ</sub>] nên có 1 giao điểm'}.` };
  });
  M('mc', TM.mu, (r) => {
    const b = r.intNZ(-4, 4), k = r.int(0, 2);
    const xb = 'x ' + (b > 0 ? MINUS + ' ' + b : '+ ' + -b);
    if (k === 0) {
      const a = r.pick([2, 3, 5]);
      return { q: `Tập xác định của hàm số y = log<sub>${a}</sub>(${xb}) là`, opts: opts(iv(b, pinf), ['[' + b + '; +∞)', iv(ninf, b), 'ℝ \\ {' + b + '}', 'ℝ']), sol: `Hàm logarit xác định khi ${xb} > 0 ⇔ x > ${b}. Tập xác định D = ${iv(b, pinf)}.` };
    }
    if (k === 1) return { q: `Tập xác định của hàm số y = (${xb})<sup>${MINUS}3</sup> là`, opts: opts('ℝ \\ {' + b + '}', [iv(b, pinf), 'ℝ', '[' + b + '; +∞)']), sol: `Số mũ nguyên âm: cơ số phải khác 0 ⇔ x ≠ ${b}. D = ℝ \\ {${b}}.` };
    return { q: `Tập xác định của hàm số y = (${xb})<sup>√2</sup> là`, opts: opts(iv(b, pinf), ['ℝ \\ {' + b + '}', 'ℝ', '[' + b + '; +∞)']), sol: `Số mũ không nguyên: cơ số phải dương ⇔ x > ${b}. D = ${iv(b, pinf)}.` };
  });
  M('mc', TM.mu, (r) => {
    const a = r.pick([2, 3, 5, 7, 10]);
    if (r.bool()) return { q: `Đạo hàm của hàm số y = ${a}<sup>x</sup> là`, opts: opts(`y' = ${a}<sup>x</sup>ln ${a}`, [`y' = x·${a}<sup>x${MINUS}1</sup>`, `y' = ${frs(a + '<sup>x</sup>', 'ln ' + a)}`, `y' = ${a}<sup>x</sup>`]), sol: `(a<sup>x</sup>)' = a<sup>x</sup>ln a với a = ${a}.` };
    return { q: `Đạo hàm của hàm số y = log<sub>${a}</sub>x là`, opts: opts(`y' = ${frs('1', 'x ln ' + a)}`, [`y' = ${frs('1', 'x')}`, `y' = ${frs('ln ' + a, 'x')}`, `y' = ${frs('x', 'ln ' + a)}`]), sol: `(log<sub>a</sub>x)' = 1/(x ln a) với a = ${a}.` };
  });
  M('mc', TM.hkg, (r) => {
    const v = r.pick([{ sa: 'a√2', ang: 45, t: '1' }, { sa: 'a√6', ang: 60, t: '√3' }, { sa: frs('a√6', 3), ang: 30, t: frs('√3', 3) }]);
    return {
      q: `Cho hình chóp S.ABCD có đáy là hình vuông cạnh a, SA vuông góc với mặt phẳng đáy và SA = ${v.sa}. Góc giữa đường thẳng SC và mặt phẳng (ABCD) bằng`,
      opts: opts(v.ang + '°', ['30°', '45°', '60°', '90°'].filter((x) => x !== v.ang + '°')),
      sol: `AC là hình chiếu của SC lên (ABCD) nên góc cần tìm là góc SCA. AC = a√2, tan SCA = SA/AC = ${v.t} ⇒ góc bằng ${v.ang}°.`,
    };
  });
  M('mc', TM.hkg, (r) => {
    const R = r.int(1, 6), h = r.int(2, 9), k = r.int(0, 2);
    const pi = (n, d) => { const g = LT.U.gcd(n, d); n /= g; d /= g; return d === 1 ? (n === 1 ? '' : n) + 'π' : frs(n + 'π', d); };
    if (k === 0) return { q: `Thể tích của khối nón có bán kính đáy r = ${R} và chiều cao h = ${h} bằng`, opts: opts(pi(R * R * h, 3), [pi(R * R * h, 1), pi(R * h, 3), pi(2 * R * h, 3), pi(R * R * h, 6)]), sol: `V = (1/3)πr²h = (1/3)π·${R * R}·${h} = ${pi(R * R * h, 3)}.` };
    if (k === 1) return { q: `Thể tích của khối trụ có bán kính đáy r = ${R} và chiều cao h = ${h} bằng`, opts: opts(pi(R * R * h, 1), [pi(R * R * h, 3), pi(2 * R * h, 1), pi(R * h, 1), pi(2 * R * R * h, 1)]), sol: `V = πr²h = π·${R * R}·${h} = ${pi(R * R * h, 1)}.` };
    return { q: `Thể tích của khối cầu bán kính R = ${R} bằng`, opts: opts(pi(4 * R * R * R, 3), [pi(4 * R * R, 1), pi(R * R * R, 3), pi(4 * R * R * R, 1), pi(2 * R * R * R, 3)]), sol: `V = (4/3)πR³ = (4/3)π·${R * R * R} = ${pi(4 * R * R * R, 3)}.` };
  });
  M('mc', TM.day, (r) => {
    const u1 = r.int(-5, 6), d = r.intNZ(-4, 5), k = r.int(3, 9);
    const uk = u1 + (k - 1) * d;
    return { q: `Cho cấp số cộng (uₙ) với u₁ = ${u1} và u<sub>${k}</sub> = ${uk}. Công sai của cấp số cộng đã cho bằng`, opts: numOpts(d, [-d, (uk - u1) / k, uk - u1, d + 1, d * 2]), sol: `u<sub>${k}</sub> = u₁ + ${k - 1}d ⇒ d = (${uk} − ${u1 < 0 ? '(' + u1 + ')' : u1})/${k - 1} = ${d}.` };
  });
  M('mc', TM.xs, (r) => {
    const n = r.int(15, 30);
    const o = Math.ceil(n / 2), e = Math.floor(n / 2);
    const fav = C(o, 2) + C(e, 2), tot = C(n, 2);
    return { q: `Chọn ngẫu nhiên hai số khác nhau từ ${n} số nguyên dương đầu tiên. Xác suất để chọn được hai số có tổng là một số chẵn bằng`, opts: opts(fr(fav, tot), [fr(o * e, tot), fr(1, 2), fr(C(o, 2), tot), fr(fav, n * n)]), sol: `Tổng chẵn khi hai số cùng chẵn hoặc cùng lẻ. Có ${o} số lẻ, ${e} số chẵn ⇒ n(A) = C<sub>${o}</sub><sup>2</sup> + C<sub>${e}</sub><sup>2</sup> = ${fav}; n(Ω) = C<sub>${n}</sub><sup>2</sup> = ${tot}. P = ${fr(fav, tot)}.` };
  });
  M('mc', TM.mu, (r) => {
    const A0 = r.pick([50, 100, 200, 300]), rr = r.pick([6, 6.5, 7, 7.5, 8]), f = r.pick([1.5, 2]);
    let n = 0; while (A0 * Math.pow(1 + rr / 100, n) < A0 * f) n++;
    return { q: `Một người gửi ${A0} triệu đồng vào ngân hàng với lãi suất ${num(rr)}%/năm. Biết rằng nếu không rút tiền thì cứ sau mỗi năm số tiền lãi được nhập vào vốn. Hỏi sau ít nhất bao nhiêu năm người đó nhận được số tiền (cả gốc lẫn lãi) không ít hơn ${num(A0 * f)} triệu đồng, giả định lãi suất không thay đổi?`, opts: numOpts(n, [n - 1, n + 1, n + 2, n - 2]), sol: `Sau n năm: T = ${A0}(1 + ${num(rr / 100)})ⁿ ≥ ${num(A0 * f)} ⇔ n ≥ log<sub>${num(1 + rr / 100)}</sub>${num(f)} ≈ ${num(Math.log(f) / Math.log(1 + rr / 100), 2)} ⇒ n nhỏ nhất là ${n}.` };
  });
  M('sa', TM.xs, (r) => {
    const n = r.int(15, 30);
    const o = Math.ceil(n / 2), e = Math.floor(n / 2);
    const p = (o * e) / C(n, 2);
    return { q: `Chọn ngẫu nhiên hai số khác nhau từ ${n} số nguyên dương đầu tiên. Tính xác suất để tổng hai số được chọn là một số lẻ (làm tròn đến hàng phần trăm).`, ans: round(p, 2), dp: 2, sol: `Tổng lẻ khi một số chẵn và một số lẻ: n(A) = ${o}·${e} = ${o * e}; n(Ω) = C<sub>${n}</sub><sup>2</sup> = ${C(n, 2)}. P ≈ ${numF(round(p, 2), 2)}.` };
  });
  M('sa', TM.hkg, (r) => {
    const R = r.int(2, 9), h = r.int(3, 12);
    const V = (Math.PI * R * R * h) / 3;
    return { q: `Một chiếc phễu có dạng hình nón với bán kính đáy ${R} cm và chiều cao ${h} cm. Thể tích của phễu bằng bao nhiêu cm³ (làm tròn đến hàng đơn vị)?`, ans: Math.round(V), dp: 0, sol: `V = (1/3)πr²h = (1/3)·π·${R * R}·${h} ≈ ${num(V, 2)} ≈ ${Math.round(V)} cm³.` };
  });

  /* ============================== VẬT LÍ ============================== */
  const P = cl('physics');
  const TP = { px: 'Phóng xạ', pu: 'Phản ứng hạt nhân', cu: 'Cảm ứng điện từ – Điện xoay chiều' };
  P('mc', TP.px, (r) => {
    const k = r.int(1, 4), useH = r.bool();
    const age = 5730 * k;
    return {
      q: `Biết chu kì bán rã của <sup>14</sup>C là 5730 năm. ${useH ? 'Độ phóng xạ' : 'Lượng <sup>14</sup>C'} trong một mẫu gỗ cổ chỉ bằng ${fr(1, Math.pow(2, k))} so với ${useH ? 'độ phóng xạ' : 'lượng <sup>14</sup>C'} của một mẫu gỗ cùng loại, cùng khối lượng vừa mới chặt. Tuổi của mẫu gỗ cổ là`,
      opts: numOpts(age, [5730 * Math.pow(2, k), (5730 * k) / 2, 5730 * (k + 1), 5730 * (k - 1) || 2865], (x) => num(x) + ' năm'),
      sol: `N/N₀ = 2<sup>−t/T</sup> = 2<sup>−${k}</sup> ⇒ t = ${k}T = ${k}·5730 = ${num(age)} năm.`,
    };
  });
  P('mc', TP.px, (r) => {
    const k = r.int(1, 4), T1 = r.pick([3, 5, 8, 10, 138]);
    const ratio = Math.pow(2, k) - 1;
    return {
      q: `Hạt nhân X phóng xạ biến thành hạt nhân Y bền với chu kì bán rã ${T1} ngày. Ban đầu có một mẫu X nguyên chất. Sau ${k * T1} ngày, tỉ số giữa số hạt nhân Y và số hạt nhân X còn lại trong mẫu là`,
      opts: numOpts(ratio, [Math.pow(2, k), 1 / ratio, k, Math.pow(2, k) + 1].filter((x) => x !== ratio)),
      sol: `N<sub>X</sub> = N₀·2<sup>−${k}</sup>; N<sub>Y</sub> = N₀ − N<sub>X</sub> = N₀(1 − 2<sup>−${k}</sup>) ⇒ N<sub>Y</sub>/N<sub>X</sub> = 2<sup>${k}</sup> − 1 = ${ratio}.`,
    };
  });
  P('mc', TP.pu, (r) => {
    const m = r.pick([1, 2, 5, 10, 100]);
    const E = (m / 235) * 6.02e23 * 200 * 1.6e-13;
    return {
      q: `Mỗi phân hạch của hạt nhân <sup>235</sup>U toả ra năng lượng trung bình 200 MeV. Lấy N<sub>A</sub> = 6,02.10<sup>23</sup> mol<sup>−1</sup>, 1 MeV = 1,6.10<sup>−13</sup> J, khối lượng mol của <sup>235</sup>U là 235 g/mol. Năng lượng toả ra khi ${m} g <sup>235</sup>U phân hạch hết là`,
      opts: opts(sci(E, 3) + ' J', [sci(E / 1.6e-13, 3) + ' J', sci(E * 235, 3) + ' J', sci(E / 1000, 3) + ' J', sci(E * 10, 3) + ' J']),
      sol: `Số hạt nhân: N = (${m}/235)·6,02.10²³ ≈ ${sci((m / 235) * 6.02e23, 3)}. E = N·200·1,6.10⁻¹³ ≈ ${sci(E, 3)} J.`,
    };
  });
  P('mc', TP.cu, (r) => {
    const Pk = r.pick([100, 200, 500, 1000]), U = r.pick([5, 10, 20, 25]), R = r.pick([5, 10, 20]);
    const dP = (Math.pow(Pk * 1000, 2) * R) / Math.pow(U * 1000, 2) / 1000;
    const H = 100 * (1 - dP / Pk);
    if (H < 50) throw new Error('retry');
    const askH = r.bool();
    return askH
      ? { q: `Điện năng được truyền đi với công suất ${Pk} kW, điện áp hiệu dụng ở nơi phát ${U} kV, hệ số công suất bằng 1, điện trở tổng cộng của đường dây là ${R} Ω. Hiệu suất truyền tải điện năng là`, opts: numOpts(round(H, 2), [round(100 - H, 2), round(100 - dP, 2), round(100 * (1 - dP / Pk / 2), 2)], (x) => num(x, 2) + '%'), sol: `ΔP = P²R/U² = ${num(dP, 3)} kW; H = 1 − ΔP/P = ${num(H, 2)}%.` }
      : { q: `Điện năng được truyền đi với công suất ${Pk} kW, điện áp hiệu dụng ở nơi phát ${U} kV, hệ số công suất bằng 1, điện trở tổng cộng của đường dây là ${R} Ω. Công suất hao phí trên đường dây là`, opts: numOpts(round(dP, 3), [round(dP * 1000, 3), round((Pk * R) / U / 1000, 3), round(dP / 2, 3), round(dP * 4, 3)], (x) => num(x, 3) + ' kW'), sol: `ΔP = P²R/U² = (${Pk}.10³)²·${R}/(${U}.10³)² = ${num(dP * 1000)} W = ${num(dP, 3)} kW.` };
  });
  P('mc', TP.cu, (r) => {
    const n = r.pick([2, 3, 4, 5]);
    return { q: `Khi truyền tải một công suất điện không đổi, nếu tăng điện áp hiệu dụng ở nơi phát lên ${n} lần (hệ số công suất không đổi) thì công suất hao phí trên đường dây`, opts: opts(`giảm ${n * n} lần`, [`giảm ${n} lần`, `tăng ${n} lần`, `tăng ${n * n} lần`, `giảm ${2 * n} lần`]), sol: `ΔP = P²R/(U²cos²φ) tỉ lệ nghịch với U². Tăng U lên ${n} lần ⇒ ΔP giảm ${n}² = ${n * n} lần.` };
  });
  P('mc', TP.cu, (r) => {
    const N = r.pick([100, 200, 500]), B = r.pick([0.1, 0.2, 0.4]), Scm = r.pick([50, 100, 200, 400]), n = r.pick([25, 50]);
    const w = 2 * Math.PI * n, E0 = N * B * Scm * 1e-4 * w;
    return { q: `Một khung dây phẳng có ${N} vòng, diện tích mỗi vòng ${Scm} cm², quay đều với tốc độ ${n} vòng/s quanh một trục nằm trong mặt phẳng khung, trong từ trường đều có vectơ cảm ứng từ vuông góc với trục quay, độ lớn ${num(B)} T. Suất điện động cực đại trong khung dây xấp xỉ bằng`, opts: numOpts(round(E0, 1), [round(N * B * Scm * 1e-4 * n, 1), round(E0 / Math.SQRT2, 1), round(E0 * 2, 1), round(E0 / 100, 1)], (x) => num(x, 1) + ' V'), sol: `ω = 2πn = ${2 * n}π rad/s; E₀ = NBSω = ${N}·${num(B)}·${Scm}.10⁻⁴·${2 * n}π ≈ ${num(E0, 1)} V.` };
  });
  P('sa', TP.px, (r) => {
    const k = r.pick([1.5, 2, 2.5, 3]), T1 = r.pick([5, 8, 15]);
    const ratio = Math.pow(2, k) - 1;
    return { q: `Hạt nhân X phóng xạ biến thành hạt nhân Y bền, chu kì bán rã ${T1} ngày. Ban đầu mẫu X nguyên chất. Tính tỉ số số hạt nhân Y và số hạt nhân X sau ${num(k * T1)} ngày (làm tròn đến hàng phần trăm).`, ans: round(ratio, 2), dp: 2, sol: `N<sub>Y</sub>/N<sub>X</sub> = 2<sup>t/T</sup> − 1 = 2<sup>${num(k)}</sup> − 1 ≈ ${numF(round(ratio, 2), 2)}.` };
  });
  P('sa', TP.px, (r) => {
    const pct = r.pick([10, 20, 25, 30, 40, 60, 70]);
    const t = (5730 * Math.log(100 / pct)) / Math.log(2);
    return { q: `Đo độ phóng xạ của <sup>14</sup>C trong một mẫu xương cổ thấy chỉ còn bằng ${pct}% so với mẫu xương cùng loại mới. Chu kì bán rã của <sup>14</sup>C là 5730 năm. Tuổi của mẫu xương là bao nhiêu nghìn năm (làm tròn đến hàng phần mười)?`, ans: round(t / 1000, 1), dp: 1, sol: `H/H₀ = 2<sup>−t/T</sup> = ${num(pct / 100)} ⇒ t = T·log₂(1/${num(pct / 100)}) = 5730·${num(Math.log(100 / pct) / Math.log(2), 4)} ≈ ${num(t, 0)} năm ≈ ${numF(round(t / 1000, 1), 1)} nghìn năm.` };
  });
  P('tf', TP.cu, (r) => {
    const Pk = r.pick([200, 500, 1000]), U = r.pick([10, 20, 25]), R = r.pick([10, 20]);
    const dP = (Math.pow(Pk * 1000, 2) * R) / Math.pow(U * 1000, 2) / 1000;
    const H = 100 * (1 - dP / Pk);
    return {
      q: `Một nhà máy điện truyền đi công suất ${Pk} kW bằng đường dây có điện trở tổng cộng ${R} Ω, điện áp hiệu dụng ở nơi phát là ${U} kV, hệ số công suất bằng 1.`,
      items: [
        claim(r, (v) => `Cường độ dòng điện hiệu dụng trên đường dây là ${v} A.`, num(Pk / U), num(U * 1000 / Pk), `I = P/U = ${Pk}.10³/(${U}.10³) = ${num(Pk / U)} A.`),
        claim(r, (v) => `Công suất hao phí trên đường dây là ${v} kW.`, num(dP, 2), num(dP * 2, 2), `ΔP = I²R = ${num(Pk / U)}²·${R} = ${num(dP * 1000)} W = ${num(dP, 2)} kW.`),
        claim(r, (v) => `Hiệu suất truyền tải là ${v}%.`, num(H, 2), num(100 - H, 2), `H = 1 − ΔP/P = ${num(H, 2)}%.`),
        claim(r, (v) => `Nếu dùng máy biến áp tăng điện áp nơi phát lên gấp đôi thì công suất hao phí giảm ${v} lần.`, '4', '2', `ΔP tỉ lệ nghịch với U² ⇒ giảm 4 lần.`),
      ],
    };
  });
  const KP = LT.KNOW.physics;
  LT.addConcepts('physics', [
    { classic: true, t: TP.px, q: 'Trong các tia phóng xạ α, β⁻, β⁺, γ, tia có khả năng đâm xuyên mạnh nhất là', a: 'tia γ', d: ['tia α', 'tia β⁻', 'tia β⁺'], kn: 'Khả năng đâm xuyên: γ > β > α; khả năng ion hoá: α > β > γ.' },
    { classic: true, t: TP.px, q: 'Đơn vị đo độ phóng xạ trong hệ SI là', a: 'becquerel (Bq)', d: ['curie (Ci)', 'gray (Gy)', 'MeV'], kn: KP['Phóng xạ'] },
    { classic: true, t: TP.pu, q: 'Phản ứng phân hạch và phản ứng nhiệt hạch có điểm chung là', a: 'đều là phản ứng hạt nhân toả năng lượng', d: ['đều cần nhiệt độ rất cao', 'đều là phản ứng thu năng lượng', 'đều xảy ra với hạt nhân nặng'], kn: KP['Phản ứng hạt nhân'] },
    { classic: true, t: TP.cu, q: 'Máy biến áp là thiết bị', a: 'biến đổi điện áp xoay chiều mà không làm thay đổi tần số', d: ['biến đổi tần số dòng điện xoay chiều', 'biến dòng xoay chiều thành dòng một chiều', 'làm tăng công suất dòng điện'], kn: KP['Cảm ứng điện từ – Điện xoay chiều'] },
    { classic: true, t: TP.cu, q: 'Số chỉ của vôn kế xoay chiều cho biết giá trị', a: 'hiệu dụng của điện áp', d: ['cực đại của điện áp', 'tức thời của điện áp', 'trung bình của điện áp'], kn: 'Các dụng cụ đo điện xoay chiều chỉ giá trị hiệu dụng: U = U₀/√2, I = I₀/√2.' },
  ]);

  /* ============================== HOÁ HỌC ============================== */
  const H = cl('chemistry');
  const TH = { est: 'Ester – Lipid', kl: 'Đại cương kim loại', amin: 'Amine – Amino acid – Peptide', carb: 'Carbohydrate', kiem: 'Kim loại nhóm IA, IIA – Nước cứng', ccd: 'Kim loại chuyển tiếp – Phức chất', pol: 'Polymer' };
  const VM = 24.79;
  const cf = (n, h, o) => 'C' + (n > 1 ? sub(n) : '') + 'H' + sub(h) + (o ? 'O' + (o > 1 ? sub(o) : '') : '');
  H('mc', TH.est, (r) => {
    const n = r.int(2, 5), b = r.pick([0.05, 0.1, 0.15, 0.2]);
    const m = round(b * (14 * n + 32), 2), nco2 = round(b * n, 2);
    return {
      q: `Đốt cháy hoàn toàn ${num(m)} gam một ester X no, đơn chức, mạch hở thu được ${num(round(nco2 * VM, 3))} lít CO₂ (đkc, 24,79 L/mol). Công thức phân tử của X là`,
      opts: opts(cf(n, 2 * n, 2), [cf(n + 1, 2 * n + 2, 2), cf(n - 1 || n + 2, 2 * (n - 1 || n + 2), 2), cf(n, 2 * n - 2, 2), cf(n, 2 * n + 2, 2)]),
      sol: `X có dạng CₙH₂ₙO₂ (M = 14n + 32). n(CO₂) = ${num(nco2)} mol ⇒ n(X) = ${num(nco2)}/n. Ta có ${num(m)} = (${num(nco2)}/n)(14n + 32) ⇒ n = ${n}. X là ${cf(n, 2 * n, 2)}.`,
    };
  });
  H('mc', TH.kl, (r) => {
    const nAl = r.pick([0.1, 0.2, 0.3, 0.4]);
    const V = round(1.5 * nAl * VM, 3);
    return { q: `Cho ${num(round(nAl * 27, 2))} gam Al tác dụng hết với dung dịch NaOH dư, thu được V lít khí H₂ (đkc, 24,79 L/mol). Giá trị của V là`, opts: numOpts(V, [round(nAl * VM, 3), round(3 * nAl * VM, 3), round(1.5 * nAl * 22.4, 3), round(0.5 * nAl * VM, 3)], (x) => num(x, 3)), sol: `2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂ (hay 2NaAlO₂ + 3H₂). n(H₂) = 1,5·n(Al) = ${num(1.5 * nAl)} mol ⇒ V = ${num(V, 3)} L.` };
  });
  H('mc', TH.kl, (r) => {
    const fe = r.bool(), n = r.pick([0.06, 0.09, 0.12, 0.15, 0.3]);
    const nNO = fe ? n : (2 * n) / 3;
    const V = round(nNO * VM, 3);
    const met = fe ? 'Fe' : 'Cu', A = fe ? 56 : 64;
    return { q: `Hoà tan hoàn toàn ${num(round(n * A, 2))} gam ${met} trong dung dịch HNO₃ loãng dư, thu được V lít khí NO (sản phẩm khử duy nhất, đkc 24,79 L/mol). Giá trị của V là`, opts: numOpts(V, [round(n * VM, 3), round((n * VM * 2) / 3, 3), round(n * 3 * VM, 3), round((n * 2 * VM) / 3 * (fe ? 1.5 : 0.75), 3), round(V / 2, 3)].filter((x) => x !== V), (x) => num(x, 3)), sol: `Bảo toàn electron: ${fe ? '3' : '2'}·n(${met}) = 3·n(NO) ${fe ? '(Fe → Fe³⁺ vì HNO₃ dư)' : ''} ⇒ n(NO) = ${num(nNO, 4)} mol ⇒ V = ${num(V, 3)} L.` };
  });
  H('mc', TH.amin, (r) => {
    const k = r.int(1, 4), n = r.pick([0.1, 0.2, 0.05, 0.15]);
    const Mm = 14 * k + 17, m = round(n * Mm, 3), ms = round(n * (Mm + 36.5), 3);
    return { q: `Cho ${num(m)} gam amine no, đơn chức, mạch hở X tác dụng hết với dung dịch HCl dư, thu được ${num(ms)} gam muối. Công thức phân tử của X là`, opts: opts(cf(k, 2 * k + 3) + 'N', [1, 2, 3, 4, 5].filter((x) => x !== k).map((x) => cf(x, 2 * x + 3) + 'N')), sol: `Bảo toàn khối lượng: m(HCl) = ${num(ms)} − ${num(m)} = ${num(ms - m, 3)} g ⇒ n(X) = n(HCl) = ${num(n)} mol ⇒ M(X) = ${num(m)}/${num(n)} = ${Mm} = 14n + 17 ⇒ n = ${k}. X là ${cf(k, 2 * k + 3)}N.` };
  });
  H('mc', TH.amin, (r) => {
    const n = r.pick([0.05, 0.1, 0.15, 0.2]);
    const pep = r.pick([{ s: 'Gly–Ala', M: 146, salt: 97 + 111 }, { s: 'Ala–Gly', M: 146, salt: 97 + 111 }, { s: 'Gly–Gly', M: 132, salt: 97 * 2 }, { s: 'Ala–Ala', M: 160, salt: 111 * 2 }]);
    const ms = round(n * pep.salt, 2);
    return { q: `Thuỷ phân hoàn toàn ${num(round(n * pep.M, 2))} gam dipeptide ${pep.s} trong dung dịch NaOH dư, thu được m gam muối. Giá trị của m là`, opts: numOpts(ms, [round(n * (pep.salt - 22), 2), round(n * pep.M + n * 40, 2), round(n * pep.salt / 2, 2), round(n * (pep.salt + 18), 2)], (x) => num(x, 2)), sol: `${pep.s} + 2NaOH → muối + H₂O. n(peptide) = ${num(n)} mol; muối gồm ${pep.s.split('–').map((x) => (x === 'Gly' ? 'H₂NCH₂COONa (97)' : 'CH₃CH(NH₂)COONa (111)')).join(' và ')} ⇒ m = ${num(n)}·${pep.salt} = ${num(ms, 2)} g.` };
  });
  H('mc', TH.carb, (r) => {
    const mk = r.pick([10, 20, 30, 40, 50]), Hp = r.pick([60, 75, 80, 90]);
    const mg = ((mk / 100) / 2) * 180 / (Hp / 100);
    return { q: `Lên men m gam glucose với hiệu suất ${Hp}%, toàn bộ khí CO₂ sinh ra được hấp thụ hết vào dung dịch Ca(OH)₂ dư, thu được ${mk} gam kết tủa. Giá trị của m là`, opts: numOpts(round(mg, 2), [round((mk / 100) * 180 / (Hp / 100), 2), round(((mk / 100) / 2) * 180 * (Hp / 100), 2), round(((mk / 100) / 2) * 180, 2), round(mg / 2, 2)], (x) => num(x, 2)), sol: `n(CaCO₃) = n(CO₂) = ${num(mk / 100)} mol. C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ ⇒ n(glucose phản ứng) = ${num(mk / 200)} mol ⇒ m = ${num(mk / 200)}·180/${Hp}% = ${num(mg, 2)} g.` };
  });
  H('mc', TH.ccd, (r) => {
    const n = r.pick([0.05, 0.1, 0.15, 0.2]);
    const askV = r.bool();
    return askV
      ? { q: `Khử hoàn toàn ${num(round(n * 160, 2))} gam Fe₂O₃ bằng khí CO ở nhiệt độ cao. Thể tích CO (đkc, 24,79 L/mol) tối thiểu cần dùng là`, opts: numOpts(round(3 * n * VM, 3), [round(n * VM, 3), round(2 * n * VM, 3), round(3 * n * 22.4, 3), round(1.5 * n * VM, 3)], (x) => num(x, 3) + ' L'), sol: `Fe₂O₃ + 3CO → 2Fe + 3CO₂. n(CO) = 3·${num(n)} = ${num(3 * n)} mol ⇒ V = ${num(3 * n * VM, 3)} L.` }
      : { q: `Khử hoàn toàn ${num(round(n * 160, 2))} gam Fe₂O₃ bằng khí CO dư ở nhiệt độ cao. Khối lượng Fe thu được là`, opts: numOpts(round(2 * n * 56, 2), [round(n * 56, 2), round(3 * n * 56, 2), round(n * 160 * 0.5, 2), round(n * 112 * 1.5, 2)], (x) => num(x, 2) + ' gam'), sol: `Fe₂O₃ + 3CO → 2Fe + 3CO₂ ⇒ n(Fe) = 2·${num(n)} = ${num(2 * n)} mol ⇒ m = ${num(2 * n * 56, 2)} g.` };
  });
  H('sa', TH.kl, (r) => {
    const m = r.pick([2.7, 5.4, 8.1, 10.8, 4.05]);
    const V = 1.5 * (m / 27) * VM;
    return { q: `Cho ${num(m)} gam Al vào dung dịch NaOH dư. Sau khi phản ứng xảy ra hoàn toàn, thể tích khí H₂ (đkc, 24,79 L/mol) thu được là bao nhiêu lít (làm tròn đến hàng phần trăm)?`, ans: round(V, 2), dp: 2, sol: `n(Al) = ${num(m / 27, 3)} mol ⇒ n(H₂) = 1,5·n(Al) = ${num(1.5 * m / 27, 3)} mol ⇒ V ≈ ${numF(round(V, 2), 2)} L.` };
  });
  H('sa', TH.est, (r) => {
    const n = r.pick([0.1, 0.15, 0.2, 0.25]);
    const e = r.pick([{ f: 'CH₃COOC₂H₅', n: 'ethyl acetate', M: 88, salt: 82 }, { f: 'HCOOCH₃', n: 'methyl formate', M: 60, salt: 68 }, { f: 'CH₃COOCH₃', n: 'methyl acetate', M: 74, salt: 82 }]);
    const naoh = n * 1.5;
    const solid = n * e.salt + (naoh - n) * 40;
    return { q: `Xà phòng hoá ${num(round(n * e.M, 2))} gam ${e.n} (${e.f}) bằng dung dịch chứa ${num(naoh)} mol NaOH. Cô cạn dung dịch sau phản ứng thu được bao nhiêu gam chất rắn khan (làm tròn đến hàng phần mười)?`, ans: round(solid, 1), dp: 1, sol: `n(ester) = ${num(n)} mol < n(NaOH) = ${num(naoh)} mol ⇒ NaOH dư ${num(naoh - n)} mol. Chất rắn gồm muối (${num(n)}·${e.salt} = ${num(n * e.salt, 2)} g) và NaOH dư (${num((naoh - n) * 40, 2)} g) ⇒ m = ${numF(round(solid, 1), 1)} g.` };
  });
  H('tf', TH.est, (r) => {
    const pool = [
      ['H₂SO₄ đặc có vai trò xúc tác và hút nước, làm tăng hiệu suất tạo ester.', true, 'H₂SO₄ đặc vừa xúc tác, vừa hút nước làm cân bằng chuyển dịch theo chiều tạo ester.'],
      ['Sau phản ứng, thêm dung dịch NaCl bão hoà vào ống nghiệm thì ester tách lớp nổi lên trên.', true, 'Ethyl acetate ít tan trong nước muối và nhẹ hơn nước nên nổi lên trên.'],
      ['Phản ứng ester hoá giữa acetic acid và ethanol là phản ứng một chiều.', false, 'Phản ứng ester hoá là phản ứng thuận nghịch.'],
      ['Ester tạo thành có mùi thơm đặc trưng.', true, 'Ethyl acetate có mùi thơm dễ chịu.'],
      ['Có thể thay acetic acid bằng giấm ăn loãng mà hiệu suất không thay đổi.', false, 'Giấm chứa nhiều nước, làm cân bằng chuyển dịch theo chiều nghịch, hiệu suất giảm.'],
      ['Ethyl acetate có nhiệt độ sôi cao hơn ethanol do có phân tử khối lớn hơn.', false, 'Ester không tạo liên kết hydrogen liên phân tử nên sôi thấp hơn (77 °C) so với ethanol (78 °C) dù M lớn hơn.'],
      ['Có thể đun nóng hỗn hợp bằng cách ngâm ống nghiệm trong cốc nước nóng 65–70 °C.', true, 'Đun cách thuỷ giúp nhiệt độ ổn định, hạn chế các chất bay hơi.'],
    ];
    return { q: 'Thí nghiệm điều chế ethyl acetate: Cho vào ống nghiệm 1 mL ethanol, 1 mL acetic acid nguyên chất và vài giọt H₂SO₄ đặc. Lắc đều, đun cách thuỷ 5–6 phút ở 65–70 °C. Làm lạnh rồi thêm 2 mL dung dịch NaCl bão hoà.', items: r.sample(pool, 4).map((p) => ({ s: p[0], v: p[1], sol: p[2] })) };
  });
  const KH = LT.KNOW.chemistry;
  LT.addConcepts('chemistry', [
    { classic: true, t: TH.est, q: 'Ester nào sau đây tác dụng với dung dịch NaOH theo tỉ lệ mol 1 : 2?', a: 'Phenyl acetate', d: ['Ethyl acetate', 'Methyl formate', 'Vinyl acetate'], kn: 'Ester của phenol: CH₃COOC₆H₅ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O.' },
    { classic: true, t: TH.kiem, q: 'Kim loại nào sau đây là kim loại kiềm?', a: 'Na', d: ['Ca', 'Al', 'Mg'], kn: KH['Kim loại nhóm IA, IIA – Nước cứng'] },
    { classic: true, t: TH.kl, q: 'Kim loại nào sau đây có tính khử mạnh nhất?', a: 'K', d: ['Fe', 'Cu', 'Mg'], kn: 'Dãy hoạt động hoá học: K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Hg > Ag > Pt > Au.' },
    { classic: true, t: TH.kl, q: 'Kim loại nào sau đây KHÔNG tác dụng với dung dịch HCl?', a: 'Cu', d: ['Fe', 'Zn', 'Al'], kn: 'Kim loại đứng sau H trong dãy hoạt động (Cu, Ag, Au…) không khử được H⁺ của acid loãng.' },
    { classic: true, t: TH.pol, q: 'Tơ nào sau đây thuộc loại tơ polyamide?', a: 'Tơ nylon-6,6', d: ['Tơ visco', 'Tơ nitron', 'Tơ cellulose acetate'], kn: 'Tơ polyamide có liên kết –CO–NH–: nylon-6, nylon-6,6, capron. Tơ nitron (olon) trùng hợp từ acrylonitrile.' },
    { classic: true, t: TH.carb, q: 'Chất nào sau đây thuộc loại disaccharide?', a: 'Saccharose', d: ['Glucose', 'Tinh bột', 'Fructose'], kn: KH['Carbohydrate'] },
    { classic: true, t: TH.amin, q: 'Chất nào sau đây là amine bậc hai?', a: 'CH₃NHCH₃', d: ['CH₃NH₂', '(CH₃)₃N', 'C₆H₅NH₂'], kn: 'Bậc amine = số gốc hydrocarbon liên kết với nguyên tử N.' },
    { classic: true, t: TH.kl, q: 'Oxide nào sau đây là oxide lưỡng tính?', a: 'Al₂O₃', d: ['Fe₂O₃', 'MgO', 'Na₂O'], kn: 'Al₂O₃, Al(OH)₃, ZnO, Zn(OH)₂, Cr₂O₃, Cr(OH)₃ là các chất lưỡng tính, tác dụng được với cả acid và base.' },
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
