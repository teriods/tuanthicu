/* Ngân hàng dạng bài môn VẬT LÍ – CT GDPT 2018 (Vật lí nhiệt, Khí lí tưởng, Từ trường, Vật lí hạt nhân). */
(function (G) {
  'use strict';
  const LT = G.LT;
  const { num, numF, sci, fr, frs, sup, sub, round, opts, numOpts, claim, MINUS } = LT.U;
  const S = 'physics';
  const add = (part, topic, gen) => LT.add(S, part, topic, gen);

  const T = {
    nhiet: 'Cấu trúc chất – Nhiệt độ',
    nl: 'Nội năng – Định luật I NĐLH',
    nr: 'Nhiệt dung riêng – Nhiệt chuyển thể',
    khi: 'Các định luật chất khí',
    dh: 'Động học phân tử khí',
    tt: 'Từ trường – Lực từ',
    cu: 'Cảm ứng điện từ – Điện xoay chiều',
    hn: 'Cấu trúc hạt nhân – Năng lượng liên kết',
    pu: 'Phản ứng hạt nhân',
    px: 'Phóng xạ',
  };
  LT.TOPICS[S] = Object.values(T);

  LT.addKnow(S, {
    [T.nhiet]: 'Mô hình động học phân tử: chất được cấu tạo từ các phân tử chuyển động hỗn loạn không ngừng; nhiệt độ càng cao, phân tử chuyển động càng nhanh. T(K) = t(°C) + 273. Nhiệt độ không tuyệt đối 0 K.',
    [T.nl]: 'Nội năng U là tổng động năng và thế năng của các phân tử. Định luật I: ΔU = A + Q (A > 0: vật nhận công; Q > 0: vật nhận nhiệt). Nội năng của khí lí tưởng chỉ phụ thuộc nhiệt độ.',
    [T.nr]: 'Q = mcΔt (c: nhiệt dung riêng, J/kg.K). Nóng chảy: Q = λm (λ: nhiệt nóng chảy riêng, J/kg). Hoá hơi: Q = Lm (L: nhiệt hoá hơi riêng). Cân bằng nhiệt: Q<sub>toả</sub> = Q<sub>thu</sub>.',
    [T.khi]: 'Boyle (T không đổi): p₁V₁ = p₂V₂. Charles (p không đổi): V/T = const. Đẳng tích: p/T = const. Phương trình trạng thái: pV/T = const. Phương trình Clapeyron: pV = nRT, R = 8,31 J/(mol.K). Nhiệt độ phải đổi ra kelvin.',
    [T.dh]: 'Áp suất khí: p = ⅓·μ·m·v̄² (μ: mật độ phân tử). Động năng tịnh tiến trung bình của phân tử: W<sub>đ</sub> = (3/2)kT, k = 1,38.10⁻²³ J/K. v<sub>rms</sub> = √(3RT/M).',
    [T.tt]: 'Lực từ tác dụng lên đoạn dây dẫn: F = BIl·sinα (α là góc giữa dây và vectơ B), chiều theo quy tắc bàn tay trái. Đơn vị cảm ứng từ: tesla (T).',
    [T.cu]: 'Từ thông Φ = NBS·cosα (α giữa pháp tuyến và B), đơn vị Wb. Suất điện động cảm ứng |e| = |ΔΦ/Δt|. Định luật Lenz: dòng cảm ứng chống lại sự biến thiên từ thông. Dòng xoay chiều: I = I₀/√2, U = U₀/√2, f = ω/2π. Máy biến áp: U₁/U₂ = N₁/N₂.',
    [T.hn]: 'Hạt nhân ᴬ_ZX có Z proton và N = A − Z neutron. Độ hụt khối Δm = Zm<sub>p</sub> + (A − Z)m<sub>n</sub> − m<sub>X</sub>. Năng lượng liên kết W<sub>lk</sub> = Δm·c² (1 u ≈ 931,5 MeV/c²). Năng lượng liên kết riêng W<sub>lk</sub>/A càng lớn, hạt nhân càng bền.',
    [T.pu]: 'Phản ứng hạt nhân bảo toàn số khối A, điện tích Z, năng lượng toàn phần và động lượng (không bảo toàn khối lượng). Năng lượng phản ứng ΔE = (m<sub>trước</sub> − m<sub>sau</sub>)c²; ΔE > 0: toả năng lượng.',
    [T.px]: 'Định luật phóng xạ: N = N₀·2<sup>−t/T</sup> = N₀e<sup>−λt</sup>, λ = ln2/T. Độ phóng xạ H = λN (Bq). Tia α là hạt nhân ⁴₂He, β⁻ là electron, β⁺ là positron, γ là sóng điện từ.',
  });

  const W = { c: 4200, lam: 3.34e5, L: 2.26e6, cIce: 2100, R: 8.31, k: 1.38e-23, NA: 6.02e23 };

  /* =============== PHẦN I: TÍNH TOÁN =============== */
  add('mc', T.nhiet, (r) => {
    const t = r.int(-50, 150);
    const toK = r.bool();
    if (toK) {
      return { q: `Nhiệt độ ${t} °C tương ứng với nhiệt độ trong thang Kelvin là`, opts: numOpts(t + 273, [t - 273, 273 - t, t + 373], (x) => num(x) + ' K'), sol: `T = t + 273 = ${t} + 273 = ${t + 273} K.` };
    }
    const T1 = r.int(200, 450);
    return { q: `Nhiệt độ ${T1} K tương ứng với nhiệt độ trong thang Celsius là`, opts: numOpts(T1 - 273, [T1 + 273, 273 - T1, T1 - 373], (x) => num(x) + ' °C'), sol: `t = T − 273 = ${T1} − 273 = ${T1 - 273} °C.` };
  });
  add('mc', T.nhiet, (r) => {
    const tf = r.int(50, 120);
    const tc = round(((tf - 32) * 5) / 9, 1);
    return { q: `Nhiệt độ ${tf} °F tương ứng với bao nhiêu độ Celsius?`, opts: numOpts(tc, [round((tf * 9) / 5 + 32, 1), round(tf - 32, 1), round((tf * 5) / 9, 1)], (x) => num(x, 1) + ' °C'), sol: `t(°C) = (t(°F) − 32)·5/9 = (${tf} − 32)·5/9 ≈ ${num(tc, 1)} °C.` };
  });
  add('mc', T.nl, (r) => {
    const Q = r.int(2, 30) * 100, A = r.int(1, 15) * 100;
    const kind = r.int(0, 1);
    if (kind === 0) {
      const dU = Q - A;
      return {
        q: `Người ta truyền cho khí trong xi lanh nhiệt lượng ${Q} J. Khí nở ra thực hiện công ${A} J đẩy pit-tông. Độ biến thiên nội năng của khí là`,
        opts: numOpts(dU, [Q + A, A - Q, -(Q + A)], (x) => num(x) + ' J'),
        sol: `ΔU = A + Q với Q = +${Q} J (nhận nhiệt), A = −${A} J (khí thực hiện công) ⇒ ΔU = ${dU} J.`,
      };
    }
    const dU = A - Q;
    return {
      q: `Người ta thực hiện công ${A} J để nén khí trong xi lanh, khí truyền ra môi trường nhiệt lượng ${Q} J. Độ biến thiên nội năng của khí là`,
      opts: numOpts(dU, [Q + A, Q - A, -(Q + A)], (x) => num(x) + ' J'),
      sol: `ΔU = A + Q với A = +${A} J (khí nhận công), Q = −${Q} J (khí toả nhiệt) ⇒ ΔU = ${dU} J.`,
    };
  });
  add('mc', T.nr, (r) => {
    const m = r.pick([0.2, 0.5, 1, 1.5, 2, 2.5, 3]), t1 = r.int(15, 30), t2 = r.pick([60, 70, 80, 90, 100]);
    const Q = m * W.c * (t2 - t1);
    return {
      q: `Nhiệt lượng cần cung cấp để đun nóng ${num(m)} kg nước từ ${t1} °C lên ${t2} °C là bao nhiêu? Biết nhiệt dung riêng của nước là 4200 J/(kg.K).`,
      opts: numOpts(Q / 1000, [(m * W.c * t2) / 1000, (m * W.c * (t2 + t1)) / 1000, Q / 100000, (m * 4.2 * (t2 - t1))], (x) => num(x, 2) + ' kJ'),
      sol: `Q = mcΔt = ${num(m)}·4200·(${t2} − ${t1}) = ${num(Q)} J = ${num(Q / 1000, 2)} kJ.`,
    };
  });
  add('mc', T.nr, (r) => {
    const m = r.pick([0.1, 0.2, 0.25, 0.4, 0.5, 1, 2]);
    const melt = r.bool();
    const Q = melt ? m * W.lam : m * W.L;
    return {
      q: melt
        ? `Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn ${num(m)} kg nước đá ở 0 °C là bao nhiêu? Biết nhiệt nóng chảy riêng của nước đá là 3,34.10<sup>5</sup> J/kg.`
        : `Nhiệt lượng cần cung cấp để làm hoá hơi hoàn toàn ${num(m)} kg nước ở 100 °C là bao nhiêu? Biết nhiệt hoá hơi riêng của nước là 2,26.10<sup>6</sup> J/kg.`,
      opts: numOpts(Q / 1000, [(melt ? W.lam / m : W.L / m) / 1000, Q / 100, Q / 10000, Q / 1000 * 2], (x) => num(x, 2) + ' kJ'),
      sol: `${melt ? 'Q = λm = 3,34.10⁵·' : 'Q = Lm = 2,26.10⁶·'}${num(m)} = ${num(Q)} J = ${num(Q / 1000, 2)} kJ.`,
    };
  });
  add('mc', T.nr, (r) => {
    const m1 = r.pick([0.2, 0.3, 0.4, 0.5, 1]), m2 = r.pick([0.2, 0.3, 0.5, 0.6, 1]), t1 = r.int(15, 30), t2 = r.int(60, 95);
    const t = (m1 * t1 + m2 * t2) / (m1 + m2);
    return {
      q: `Trộn ${num(m1)} kg nước ở ${t1} °C với ${num(m2)} kg nước ở ${t2} °C. Bỏ qua sự trao đổi nhiệt với môi trường và bình chứa. Nhiệt độ khi cân bằng nhiệt xấp xỉ bằng`,
      opts: numOpts(round(t, 1), [round((t1 + t2) / 2, 1) === round(t, 1) ? round(t + 5, 1) : round((t1 + t2) / 2, 1), round((m1 * t2 + m2 * t1) / (m1 + m2), 1), round(t + 3, 1), round(t - 4, 1)], (x) => num(x, 1) + ' °C'),
      sol: `Cân bằng nhiệt: m₁c(t − ${t1}) = m₂c(${t2} − t) ⇒ t = (m₁t₁ + m₂t₂)/(m₁ + m₂) = (${num(m1)}·${t1} + ${num(m2)}·${t2})/${num(m1 + m2)} ≈ ${num(t, 1)} °C.`,
    };
  });
  add('mc', T.nr, (r) => {
    const P = r.pick([500, 800, 1000, 1200, 1500, 2000]), m = r.pick([1, 1.5, 2]), dt = r.pick([50, 60, 75, 80]);
    const tsec = (m * W.c * dt) / P;
    return {
      q: `Một ấm điện có công suất ${P} W dùng để đun ${num(m)} kg nước, nhiệt độ nước tăng thêm ${dt} °C. Bỏ qua hao phí, c = 4200 J/(kg.K). Thời gian đun nước xấp xỉ bằng`,
      opts: numOpts(round(tsec / 60, 1), [round(tsec / 600, 1), round((P * dt) / (m * W.c), 1), round(tsec / 30, 1), round(tsec / 60 + 2, 1)], (x) => num(x, 1) + ' phút'),
      sol: `Pt = mcΔt ⇒ t = ${num(m)}·4200·${dt}/${P} = ${num(tsec, 1)} s ≈ ${num(tsec / 60, 1)} phút.`,
    };
  });
  add('mc', T.khi, (r) => {
    const p1 = r.pick([1, 1.5, 2, 3, 4]), V1 = r.pick([2, 4, 6, 8, 10, 12]), k = r.pick([2, 3, 4, 0.5]);
    const V2 = V1 / k, p2 = p1 * k;
    return {
      q: `Một lượng khí lí tưởng có thể tích ${num(V1)} lít ở áp suất ${num(p1)} atm. Nén đẳng nhiệt khối khí đến thể tích ${num(V2)} lít thì áp suất của khí là`,
      opts: numOpts(p2, [p1 / k, (p1 * V2) / V1, p1 + k, p2 * 2], (x) => num(x, 3) + ' atm'),
      sol: `Định luật Boyle: p₁V₁ = p₂V₂ ⇒ p₂ = ${num(p1)}·${num(V1)}/${num(V2)} = ${num(p2, 3)} atm.`,
    };
  });
  add('mc', T.khi, (r) => {
    const V1 = r.pick([2, 3, 4, 5, 6]), t1 = r.int(0, 57), t2 = r.int(77, 227);
    const V2 = (V1 * (t2 + 273)) / (t1 + 273);
    return {
      q: `Một lượng khí có thể tích ${V1} lít ở ${t1} °C. Nung nóng đẳng áp khối khí đến ${t2} °C thì thể tích của khí xấp xỉ bằng`,
      opts: numOpts(round(V2, 2), [round((V1 * t2) / (t1 || 1), 2), round((V1 * (t1 + 273)) / (t2 + 273), 2), round(V2 + 1, 2), round(V2 * 1.5, 2)], (x) => num(x, 2) + ' lít'),
      sol: `Đẳng áp: V₁/T₁ = V₂/T₂ ⇒ V₂ = ${V1}·${t2 + 273}/${t1 + 273} ≈ ${num(V2, 2)} lít (nhiệt độ phải đổi sang K).`,
    };
  });
  add('mc', T.khi, (r) => {
    const p1 = r.pick([1, 1.5, 2, 2.5, 3]), t1 = r.int(7, 37), t2 = r.int(47, 177);
    const p2 = (p1 * (t2 + 273)) / (t1 + 273);
    return {
      q: `Một bình kín chứa khí ở nhiệt độ ${t1} °C và áp suất ${num(p1)}.10<sup>5</sup> Pa. Khi nhiệt độ của khí tăng đến ${t2} °C (thể tích bình không đổi) thì áp suất khí xấp xỉ bằng`,
      opts: numOpts(round(p2, 2), [round((p1 * t2) / t1, 2), round((p1 * (t1 + 273)) / (t2 + 273), 2), round(p2 + 0.5, 2), round(p1 * 2, 2) === round(p2, 2) ? round(p2 - 0.3, 2) : round(p1 * 2, 2)], (x) => num(x, 2) + '.10<sup>5</sup> Pa'),
      sol: `Đẳng tích: p₁/T₁ = p₂/T₂ ⇒ p₂ = ${num(p1)}.10⁵·${t2 + 273}/${t1 + 273} ≈ ${num(p2, 2)}.10⁵ Pa.`,
    };
  });
  add('mc', T.khi, (r) => {
    const p1 = r.pick([1, 2, 3]), V1 = r.pick([10, 12, 15, 20]), T1 = r.pick([280, 300, 320]), p2 = r.pick([2, 4, 5, 6]), V2 = r.pick([4, 5, 6, 8]);
    if (p2 * V2 === p1 * V1) throw new Error('retry');
    const T2 = (p2 * V2 * T1) / (p1 * V1);
    return {
      q: `Một khối khí lí tưởng ở trạng thái 1 có p₁ = ${p1} atm, V₁ = ${V1} lít, T₁ = ${T1} K. Ở trạng thái 2 có p₂ = ${p2} atm, V₂ = ${V2} lít. Nhiệt độ T₂ xấp xỉ bằng`,
      opts: numOpts(round(T2, 1), [round((p1 * V1 * T1) / (p2 * V2), 1), round((p2 * V1 * T1) / (p1 * V2), 1), round(T2 - 273, 1), round(T2 + 50, 1)], (x) => num(x, 1) + ' K'),
      sol: `Phương trình trạng thái: p₁V₁/T₁ = p₂V₂/T₂ ⇒ T₂ = p₂V₂T₁/(p₁V₁) = ${p2}·${V2}·${T1}/(${p1}·${V1}) ≈ ${num(T2, 1)} K.`,
    };
  });
  add('mc', T.khi, (r) => {
    const gas = r.pick([{ n: 'oxygen (O₂)', M: 32 }, { n: 'nitrogen (N₂)', M: 28 }, { n: 'helium (He)', M: 4 }, { n: 'carbon dioxide (CO₂)', M: 44 }, { n: 'hydrogen (H₂)', M: 2 }]);
    const V = r.pick([5, 10, 20, 25]) /* lít */, p = r.pick([1, 2, 3, 5]) /* .10^5 Pa */, t = r.int(7, 47);
    const n = (p * 1e5 * V * 1e-3) / (W.R * (t + 273));
    const m = n * gas.M;
    const askMass = r.bool();
    if (askMass) {
      return {
        q: `Một bình thể tích ${V} lít chứa khí ${gas.n} ở áp suất ${p}.10<sup>5</sup> Pa và nhiệt độ ${t} °C. Cho R = 8,31 J/(mol.K). Khối lượng khí trong bình xấp xỉ bằng`,
        opts: numOpts(round(m, 2), [round(n, 2), round((p * 1e5 * V * 1e-3 * gas.M) / (W.R * t), 2), round(m * 10, 2), round(m / 2, 2)], (x) => num(x, 2) + ' g'),
        sol: `n = pV/(RT) = ${p}.10⁵·${V}.10⁻³/(8,31·${t + 273}) ≈ ${num(n, 3)} mol ⇒ m = nM = ${num(n, 3)}·${gas.M} ≈ ${num(m, 2)} g.`,
      };
    }
    return {
      q: `Một bình thể tích ${V} lít chứa khí lí tưởng ở áp suất ${p}.10<sup>5</sup> Pa và nhiệt độ ${t} °C. Cho R = 8,31 J/(mol.K). Số mol khí trong bình xấp xỉ bằng`,
      opts: numOpts(round(n, 3), [round((p * 1e5 * V * 1e-3) / (W.R * t), 3), round(n * 1000, 3), round(n / 2, 3), round(n * 2, 3)], (x) => num(x, 3) + ' mol'),
      sol: `pV = nRT ⇒ n = ${p}.10⁵·${V}.10⁻³/(8,31·${t + 273}) ≈ ${num(n, 3)} mol (đổi lít → m³, °C → K).`,
    };
  });
  add('mc', T.dh, (r) => {
    const t = r.int(-23, 227), Tk = t + 273;
    const E = 1.5 * W.k * Tk;
    return {
      q: `Động năng tịnh tiến trung bình của phân tử khí lí tưởng ở nhiệt độ ${t} °C xấp xỉ bằng (k = 1,38.10<sup>−23</sup> J/K)`,
      opts: opts(sci(E, 3) + ' J', [sci(W.k * Tk, 3) + ' J', sci(1.5 * W.k * Math.max(1, Math.abs(t)), 3) + ' J', sci(3 * W.k * Tk, 3) + ' J', sci(E * 10, 3) + ' J']),
      sol: `W<sub>đ</sub> = (3/2)kT = 1,5·1,38.10⁻²³·${Tk} ≈ ${sci(E, 3)} J.`,
    };
  });
  add('mc', T.dh, (r) => {
    const gas = r.pick([{ n: 'H₂', M: 2e-3 }, { n: 'He', M: 4e-3 }, { n: 'N₂', M: 28e-3 }, { n: 'O₂', M: 32e-3 }]);
    const Tk = r.pick([273, 300, 320, 350, 400]);
    const v = Math.sqrt((3 * W.R * Tk) / gas.M);
    return {
      q: `Tốc độ căn quân phương v<sub>rms</sub> của phân tử khí ${gas.n} ở nhiệt độ ${Tk} K xấp xỉ bằng (R = 8,31 J/(mol.K))`,
      opts: numOpts(Math.round(v), [Math.round(Math.sqrt((W.R * Tk) / gas.M)), Math.round(Math.sqrt((3 * W.R * Tk) / (gas.M * 1000))), Math.round(v * 2), Math.round(v / 2)], (x) => num(x) + ' m/s'),
      sol: `v<sub>rms</sub> = √(3RT/M) = √(3·8,31·${Tk}/${num(gas.M)}) ≈ ${Math.round(v)} m/s (M tính bằng kg/mol).`,
    };
  });
  add('mc', T.tt, (r) => {
    const B = r.pick([0.02, 0.05, 0.1, 0.2, 0.4, 0.5]), I = r.pick([2, 3, 4, 5, 8, 10]), l = r.pick([0.1, 0.2, 0.25, 0.5]), a = r.pick([30, 90, 60, 90]);
    const s = { 30: 0.5, 60: Math.sqrt(3) / 2, 90: 1 }[a];
    const F = B * I * l * s;
    return {
      q: `Một đoạn dây dẫn thẳng dài ${num(l * 100)} cm mang dòng điện ${I} A đặt trong từ trường đều có cảm ứng từ ${num(B)} T, dây hợp với vectơ cảm ứng từ góc ${a}°. Độ lớn lực từ tác dụng lên đoạn dây là`,
      opts: numOpts(round(F, 4), [round(B * I * l, 4) === round(F, 4) ? round(F / 2, 4) : round(B * I * l, 4), round(B * I * l * 100 * s, 4), round(F * 2, 4), round(B * I * l * Math.cos((a * Math.PI) / 180), 4) || round(F / 4, 4)], (x) => num(x, 4) + ' N'),
      sol: `F = BIl·sinα = ${num(B)}·${I}·${num(l)}·sin${a}° ≈ ${num(F, 4)} N.`,
    };
  });
  add('mc', T.tt, (r) => {
    const F = r.pick([0.06, 0.1, 0.12, 0.2, 0.3]), I = r.pick([2, 4, 5, 6]), l = r.pick([0.1, 0.2, 0.3, 0.5]);
    const B = F / (I * l);
    return {
      q: `Một đoạn dây dài ${num(l * 100)} cm mang dòng điện ${I} A đặt vuông góc với các đường sức từ của một từ trường đều. Lực từ tác dụng lên đoạn dây là ${num(F)} N. Độ lớn cảm ứng từ là`,
      opts: numOpts(round(B, 4), [round(F * I * l, 4), round((F * l) / I, 4), round(B * 2, 4), round(B / 10, 4)], (x) => num(x, 4) + ' T'),
      sol: `F = BIl ⇒ B = F/(Il) = ${num(F)}/(${I}·${num(l)}) = ${num(B, 4)} T.`,
    };
  });
  add('mc', T.cu, (r) => {
    const N = r.pick([1, 10, 50, 100, 200]), B = r.pick([0.02, 0.05, 0.1, 0.2]), Scm = r.pick([20, 50, 100, 200]), a = r.pick([0, 60, 30]);
    const c = { 0: 1, 60: 0.5, 30: Math.sqrt(3) / 2 }[a];
    const phi = N * B * Scm * 1e-4 * c;
    return {
      q: `Một khung dây phẳng gồm ${N} vòng, diện tích mỗi vòng ${Scm} cm², đặt trong từ trường đều B = ${num(B)} T. Pháp tuyến của mặt khung hợp với vectơ cảm ứng từ góc ${a}°. Từ thông qua khung dây là`,
      opts: opts(sci(phi, 3) + ' Wb', [sci((phi / c) * (a === 0 ? 0.5 : 1), 3) + ' Wb', sci(phi * 100, 3) + ' Wb', sci(phi / N, 3) + ' Wb', sci(phi * 2, 3) + ' Wb']),
      sol: `Φ = NBS·cosα = ${N}·${num(B)}·${Scm}.10⁻⁴·cos${a}° ≈ ${sci(phi, 3)} Wb (đổi cm² → m²).`,
    };
  });
  add('mc', T.cu, (r) => {
    const N = r.pick([10, 20, 50, 100]), dB = r.pick([0.1, 0.2, 0.4, 0.5]), S1 = r.pick([0.01, 0.02, 0.05]), dt = r.pick([0.01, 0.02, 0.05, 0.1]);
    const e = (N * dB * S1) / dt;
    return {
      q: `Một cuộn dây có ${N} vòng, diện tích mỗi vòng ${num(S1)} m², đặt vuông góc với từ trường. Trong thời gian ${num(dt)} s, cảm ứng từ tăng đều thêm ${num(dB)} T. Độ lớn suất điện động cảm ứng trong cuộn dây là`,
      opts: numOpts(round(e, 3), [round((dB * S1) / dt, 3), round(N * dB * S1 * dt, 3), round(e * 2, 3), round(e / 10, 3)], (x) => num(x, 3) + ' V'),
      sol: `|e| = NΔΦ/Δt = N·S·ΔB/Δt = ${N}·${num(S1)}·${num(dB)}/${num(dt)} = ${num(e, 3)} V.`,
    };
  });
  add('mc', T.cu, (r) => {
    const U0 = r.pick([100, 110, 200, 220, 311, 400]) , f = r.pick([50, 60]), phase = r.pick(['', ' + π/3', ' − π/6', ' + π/2']);
    const kind = r.int(0, 1);
    const U0s = U0 === 311 ? '220√2' : U0 === 200 ? '200' : String(U0);
    const Uval = U0 === 311 ? 220 : U0 / Math.SQRT2;
    if (kind === 0) {
      return {
        q: `Điện áp xoay chiều u = ${U0s}cos(${2 * f}πt${phase}) (V). Giá trị hiệu dụng của điện áp là`,
        opts: numOpts(round(Uval, 1), [U0 === 311 ? round(220 * Math.SQRT2, 1) : U0, round(Uval / Math.SQRT2, 1), round(Uval * 2, 1), round(Uval + 10, 1)], (x) => num(x, 1) + ' V'),
        sol: `U = U₀/√2 = ${U0s}/√2 ≈ ${num(Uval, 1)} V.`,
      };
    }
    return {
      q: `Dòng điện xoay chiều i = ${r.pick([2, 3, 4])}cos(${2 * f}πt${phase}) (A) có tần số là`,
      opts: numOpts(f, [2 * f, f / 2, 2 * f * 3.14], (x) => num(x, 2) + ' Hz'),
      sol: `ω = ${2 * f}π rad/s ⇒ f = ω/(2π) = ${f} Hz.`,
    };
  });
  add('mc', T.cu, (r) => {
    const N1 = r.pick([500, 1000, 1200, 2000, 2400]), ratio = r.pick([2, 4, 5, 10, 0.5, 0.2]), U1 = r.pick([110, 220, 380]);
    const N2 = N1 / ratio, U2 = U1 / ratio;
    if (!Number.isInteger(N2)) throw new Error('retry');
    return {
      q: `Một máy biến áp lí tưởng có cuộn sơ cấp ${N1} vòng, cuộn thứ cấp ${N2} vòng. Đặt vào cuộn sơ cấp điện áp xoay chiều có giá trị hiệu dụng ${U1} V. Điện áp hiệu dụng ở hai đầu cuộn thứ cấp để hở là`,
      opts: numOpts(round(U2, 2), [round(U1 * ratio, 2), round(U1 + N2 / 10, 2), round(U2 / 2, 2), round(U2 * 3, 2)], (x) => num(x, 2) + ' V'),
      sol: `U₂/U₁ = N₂/N₁ ⇒ U₂ = ${U1}·${N2}/${N1} = ${num(U2, 2)} V. Đây là máy ${ratio > 1 ? 'hạ áp' : 'tăng áp'}.`,
    };
  });

  const NUC = [
    { s: 'C', A: 12, Z: 6 }, { s: 'C', A: 14, Z: 6 }, { s: 'N', A: 14, Z: 7 }, { s: 'O', A: 16, Z: 8 }, { s: 'Na', A: 23, Z: 11 }, { s: 'Al', A: 27, Z: 13 },
    { s: 'P', A: 31, Z: 15 }, { s: 'Co', A: 60, Z: 27 }, { s: 'Fe', A: 56, Z: 26 }, { s: 'Sr', A: 90, Z: 38 }, { s: 'I', A: 131, Z: 53 }, { s: 'Cs', A: 137, Z: 55 },
    { s: 'Ra', A: 226, Z: 88 }, { s: 'U', A: 235, Z: 92 }, { s: 'U', A: 238, Z: 92 }, { s: 'Po', A: 210, Z: 84 }, { s: 'Pb', A: 206, Z: 82 }, { s: 'Th', A: 232, Z: 90 },
  ];
  const nuc = (n) => `<sup>${n.A}</sup><sub>${n.Z}</sub>${n.s}`;
  add('mc', T.hn, (r) => {
    const n = r.pick(NUC);
    const askN = r.bool();
    const N = n.A - n.Z;
    return askN
      ? { q: `Hạt nhân ${nuc(n)} có số neutron là`, opts: numOpts(N, [n.A, n.Z, n.A + n.Z]), sol: `N = A − Z = ${n.A} − ${n.Z} = ${N}.` }
      : { q: `Hạt nhân ${nuc(n)} có số nucleon là`, opts: numOpts(n.A, [N, n.Z, n.A + n.Z]), sol: `Số nucleon bằng số khối A = ${n.A} (gồm ${n.Z} proton và ${N} neutron).` };
  });
  const MASS = [
    { n: { s: 'He', A: 4, Z: 2 }, m: 4.0015 }, { n: { s: 'H', A: 2, Z: 1 }, m: 2.0136 }, { n: { s: 'Li', A: 7, Z: 3 }, m: 7.0144 },
    { n: { s: 'C', A: 12, Z: 6 }, m: 11.9967 }, { n: { s: 'O', A: 16, Z: 8 }, m: 15.9904 }, { n: { s: 'Be', A: 9, Z: 4 }, m: 9.0108 },
    { n: { s: 'H', A: 3, Z: 1 }, m: 3.0155 }, { n: { s: 'N', A: 14, Z: 7 }, m: 13.9992 },
  ];
  const mp = 1.0073, mn = 1.0087, u = 931.5;
  function bind(x) {
    const dm = x.n.Z * mp + (x.n.A - x.n.Z) * mn - x.m;
    return { dm, W: dm * u, Wr: (dm * u) / x.n.A };
  }
  LT._bind = bind; LT._MASS = MASS;
  add('mc', T.hn, (r) => {
    const x = r.pick(MASS);
    const b = bind(x);
    const per = r.bool();
    return {
      q: `Cho khối lượng hạt nhân ${nuc(x.n)} là ${num(x.m, 4)} u; m<sub>p</sub> = 1,0073 u; m<sub>n</sub> = 1,0087 u; 1 u = 931,5 MeV/c². Năng lượng liên kết ${per ? 'riêng ' : ''}của hạt nhân này xấp xỉ bằng`,
      opts: per
        ? numOpts(round(b.Wr, 2), [round(b.W, 2), round(b.Wr * 2, 2), round(b.W / x.n.Z, 2) === round(b.Wr, 2) ? round(b.Wr + 1.5, 2) : round(b.W / x.n.Z, 2), round(b.dm, 2)], (v) => num(v, 2) + ' MeV/nucleon')
        : numOpts(round(b.W, 2), [round(b.Wr, 2), round(b.W * 2, 2), round(b.dm * 1000, 2), round(b.W + 10, 2)], (v) => num(v, 2) + ' MeV'),
      sol: `Δm = ${x.n.Z}·1,0073 + ${x.n.A - x.n.Z}·1,0087 − ${num(x.m, 4)} = ${num(b.dm, 4)} u. W<sub>lk</sub> = Δm·931,5 ≈ ${num(b.W, 2)} MeV${per ? '; W<sub>lk</sub>/A ≈ ' + num(b.Wr, 2) + ' MeV/nucleon' : ''}.`,
    };
  });
  const PART = { n: '<sup>1</sup><sub>0</sub>n', p: '<sup>1</sup><sub>1</sub>p', a: '<sup>4</sup><sub>2</sub>He', d: '<sup>2</sup><sub>1</sub>H', t: '<sup>3</sup><sub>1</sub>H', e: '<sup>0</sup><sub>−1</sub>e', ep: '<sup>0</sup><sub>+1</sub>e' };
  const PNAME = { n: 'neutron', p: 'proton', a: 'hạt α', d: 'deuteri', t: 'triti', e: 'electron (β⁻)', ep: 'positron (β⁺)' };
  const RX = [
    { l: [nuc({ s: 'N', A: 14, Z: 7 }), PART.a], r: [nuc({ s: 'O', A: 17, Z: 8 })], x: 'p' },
    { l: [nuc({ s: 'Be', A: 9, Z: 4 }), PART.a], r: [nuc({ s: 'C', A: 12, Z: 6 })], x: 'n' },
    { l: [nuc({ s: 'Al', A: 27, Z: 13 }), PART.a], r: [nuc({ s: 'P', A: 30, Z: 15 })], x: 'n' },
    { l: [PART.d, PART.t], r: [PART.a], x: 'n' },
    { l: [nuc({ s: 'Li', A: 7, Z: 3 }), PART.p], r: [PART.a], x: 'a' },
    { l: [nuc({ s: 'C', A: 14, Z: 6 })], r: [nuc({ s: 'N', A: 14, Z: 7 })], x: 'e' },
    { l: [nuc({ s: 'P', A: 30, Z: 15 })], r: [nuc({ s: 'Si', A: 30, Z: 14 })], x: 'ep' },
    { l: [nuc({ s: 'Ra', A: 226, Z: 88 })], r: [nuc({ s: 'Rn', A: 222, Z: 86 })], x: 'a' },
    { l: [nuc({ s: 'Na', A: 23, Z: 11 }), PART.p], r: [nuc({ s: 'Ne', A: 20, Z: 10 })], x: 'a' },
    { l: [nuc({ s: 'Cl', A: 37, Z: 17 }), PART.p], r: [nuc({ s: 'Ar', A: 37, Z: 18 })], x: 'n' },
  ];
  add('mc', T.pu, (r) => {
    const rx = r.pick(RX);
    const others = Object.keys(PNAME).filter((k) => k !== rx.x);
    return {
      q: `Cho phản ứng hạt nhân: ${rx.l.join(' + ')} → ${rx.r.join(' + ')} + X. Hạt X là`,
      opts: opts(PNAME[rx.x] + ' ' + PART[rx.x], r.shuffle(others).map((k) => PNAME[k] + ' ' + PART[k])),
      sol: `Áp dụng định luật bảo toàn số khối và bảo toàn điện tích cho phản ứng, ta tìm được X có A, Z ứng với ${PNAME[rx.x]} ${PART[rx.x]}.`,
    };
  });
  add('mc', T.pu, (r) => {
    const rx = r.pick([
      { e: `${PART.d} + ${PART.t} → ${PART.a} + ${PART.n}`, ml: [2.0136, 3.0155], mr: [4.0015, 1.0087] },
      { e: `${PART.d} + ${PART.d} → <sup>3</sup><sub>2</sub>He + ${PART.n}`, ml: [2.0136, 2.0136], mr: [3.0149, 1.0087] },
      { e: `${nuc({ s: 'Li', A: 7, Z: 3 })} + ${PART.p} → 2${PART.a}`, ml: [7.0144, 1.0073], mr: [4.0015, 4.0015] },
      { e: `${PART.d} + ${PART.d} → ${PART.t} + ${PART.p}`, ml: [2.0136, 2.0136], mr: [3.0155, 1.0073] },
    ]);
    const dm = rx.ml.reduce((a, b) => a + b, 0) - rx.mr.reduce((a, b) => a + b, 0);
    const E = dm * u;
    return {
      q: `Cho phản ứng ${rx.e}. Biết khối lượng các hạt (theo u): ${[...rx.ml, ...rx.mr].map((x) => num(x, 4)).join('; ')} (theo thứ tự xuất hiện trong phương trình), 1 u = 931,5 MeV/c². Phản ứng này`,
      opts: opts(`toả ${num(E, 2)} MeV`, [`thu ${num(E, 2)} MeV`, `toả ${num(E * 2, 2)} MeV`, `toả ${num(dm, 4)} MeV`, `thu ${num(E / 2, 2)} MeV`]),
      sol: `Δm = m<sub>trước</sub> − m<sub>sau</sub> = ${num(dm, 4)} u > 0 ⇒ phản ứng toả năng lượng ΔE = ${num(dm, 4)}·931,5 ≈ ${num(E, 2)} MeV.`,
    };
  });
  add('mc', T.px, (r) => {
    const Tn = r.pick([2, 3, 5, 8, 10, 12]), k = r.int(1, 4), unit = r.pick(['ngày', 'giờ', 'năm']);
    const m0 = r.pick([16, 32, 64, 80, 100, 200]);
    const askMass = r.bool();
    const left = m0 / Math.pow(2, k);
    if (askMass) {
      return {
        q: `Một chất phóng xạ có chu kì bán rã ${Tn} ${unit}. Ban đầu có ${m0} g chất này. Sau ${Tn * k} ${unit}, khối lượng chất phóng xạ còn lại là`,
        opts: numOpts(left, [m0 - left, m0 / (2 * k), m0 / Math.pow(2, k + 1), m0 / Math.pow(2, k - 1)], (x) => num(x, 3) + ' g'),
        sol: `t = ${k}T ⇒ m = m₀/2<sup>${k}</sup> = ${m0}/${Math.pow(2, k)} = ${num(left, 3)} g.`,
      };
    }
    const decayed = 1 - 1 / Math.pow(2, k);
    return {
      q: `Một chất phóng xạ có chu kì bán rã ${Tn} ${unit}. Sau ${Tn * k} ${unit}, phần trăm số hạt nhân đã bị phân rã so với ban đầu là`,
      opts: numOpts(round(decayed * 100, 2), [round(100 / Math.pow(2, k), 2) === round(decayed * 100, 2) ? 25 : round(100 / Math.pow(2, k), 2), round((100 * k) / (k + 1), 2) === round(decayed * 100, 2) ? 90 : round((100 * k) / (k + 1), 2), round(100 - 100 / (2 * k), 2), 100 / 3], (x) => num(x, 2) + '%'),
      sol: `N/N₀ = 2<sup>−${k}</sup> = ${num(1 / Math.pow(2, k), 4)} ⇒ đã phân rã ${num(decayed * 100, 2)}%.`,
    };
  });
  add('mc', T.px, (r) => {
    const n = r.pick([{ s: 'I-131', T: 8.02, unit: 'ngày', d: 86400 }, { s: 'Co-60', T: 5.27, unit: 'năm', d: 3.156e7 }, { s: 'P-32', T: 14.3, unit: 'ngày', d: 86400 }, { s: 'Na-24', T: 15, unit: 'giờ', d: 3600 }]);
    const N = r.pick([1, 2, 5, 8]) * 1e18;
    const lam = Math.log(2) / (n.T * n.d);
    const H = lam * N;
    return {
      q: `Một mẫu ${n.s} (chu kì bán rã ${num(n.T)} ${n.unit}) chứa ${sci(N, 2)} hạt nhân. Độ phóng xạ của mẫu xấp xỉ bằng`,
      opts: opts(sci(H, 3) + ' Bq', [sci(N / (n.T * n.d), 3) + ' Bq', sci((Math.log(2) * N) / n.T, 3) + ' Bq', sci(H * 10, 3) + ' Bq', sci(H / 3.7e10, 3) + ' Bq']),
      sol: `λ = ln2/T = 0,693/(${num(n.T)}·${sci(n.d, 4)} s) ≈ ${sci(lam, 3)} s⁻¹; H = λN ≈ ${sci(H, 3)} Bq.`,
    };
  });

  /* =============== Câu lí thuyết =============== */
  const K = LT.KNOW[S];
  LT.addConcepts(S, [
    { t: T.nhiet, q: 'Theo mô hình động học phân tử, khi nhiệt độ của vật tăng thì', a: 'các phân tử chuyển động hỗn loạn nhanh hơn', d: ['các phân tử đứng yên', 'khối lượng phân tử tăng', 'số phân tử trong vật tăng'], kn: K[T.nhiet] },
    { t: T.nhiet, q: 'Nhiệt độ không tuyệt đối (0 K) tương ứng với', a: '−273 °C', d: ['0 °C', '273 °C', '−100 °C'], kn: K[T.nhiet] },
    { t: T.nhiet, q: 'Ở thể khí, các phân tử', a: 'ở xa nhau, lực tương tác yếu, chuyển động hỗn loạn về mọi phía', d: ['sắp xếp có trật tự, dao động quanh vị trí cân bằng cố định', 'nằm sát nhau, lực tương tác rất mạnh', 'không chuyển động'], kn: K[T.nhiet] },
    { t: T.nhiet, q: 'Trong quá trình nóng chảy của một chất rắn kết tinh ở áp suất không đổi, nhiệt độ của chất đó', a: 'không thay đổi', d: ['tăng liên tục', 'giảm liên tục', 'tăng rồi giảm'], kn: 'Chất rắn kết tinh nóng chảy ở nhiệt độ xác định; nhiệt lượng nhận vào dùng để phá vỡ cấu trúc mạng tinh thể.' },
    { t: T.nhiet, q: 'Sự bay hơi của chất lỏng có đặc điểm nào sau đây?', a: 'Xảy ra ở mọi nhiệt độ và chỉ ở mặt thoáng', d: ['Chỉ xảy ra ở nhiệt độ sôi', 'Xảy ra trong lòng chất lỏng', 'Không phụ thuộc diện tích mặt thoáng'], kn: 'Bay hơi xảy ra ở mặt thoáng, ở mọi nhiệt độ; sự sôi xảy ra cả ở mặt thoáng và trong lòng chất lỏng tại nhiệt độ sôi.' },
    { t: T.nl, q: 'Nội năng của một lượng khí lí tưởng phụ thuộc vào', a: 'nhiệt độ', d: ['thể tích', 'áp suất', 'hình dạng bình chứa'], kn: K[T.nl] },
    { t: T.nl, q: 'Trong hệ thức ΔU = A + Q, quy ước nào sau đây đúng?', a: 'Q > 0 khi vật nhận nhiệt lượng', d: ['A > 0 khi vật thực hiện công', 'Q > 0 khi vật truyền nhiệt', 'A < 0 khi vật nhận công'], kn: K[T.nl] },
    { t: T.nl, q: 'Cách làm nào sau đây làm thay đổi nội năng của vật bằng hình thức thực hiện công?', a: 'Cọ xát miếng kim loại trên mặt bàn', d: ['Đặt cốc nước lên bếp', 'Phơi vật dưới nắng', 'Thả viên đá vào cốc nước ấm'], kn: 'Hai cách làm thay đổi nội năng: thực hiện công (cọ xát, nén khí...) và truyền nhiệt (dẫn nhiệt, đối lưu, bức xạ).' },
    { t: T.nr, q: 'Đơn vị của nhiệt dung riêng là', a: 'J/(kg.K)', d: ['J/kg', 'J.kg/K', 'kg/(J.K)'], kn: K[T.nr] },
    { t: T.nr, q: 'Đơn vị của nhiệt nóng chảy riêng là', a: 'J/kg', d: ['J/(kg.K)', 'J.kg', 'W/kg'], kn: K[T.nr] },
    { t: T.khi, q: 'Trong hệ toạ độ (p, V), đường đẳng nhiệt của một lượng khí lí tưởng là', a: 'đường hypebol', d: ['đường thẳng song song trục p', 'đường thẳng đi qua gốc toạ độ', 'đường parabol'], kn: K[T.khi] },
    { t: T.khi, q: 'Trong hệ toạ độ (p, T), đường đẳng tích là', a: 'đường thẳng có đường kéo dài đi qua gốc toạ độ', d: ['đường hypebol', 'đường thẳng song song trục p', 'đường thẳng song song trục T'], kn: K[T.khi] },
    { t: T.khi, q: 'Quá trình biến đổi trạng thái trong đó áp suất được giữ không đổi gọi là quá trình', a: 'đẳng áp', d: ['đẳng nhiệt', 'đẳng tích', 'đoạn nhiệt'], kn: K[T.khi] },
    { t: T.khi, q: 'Khi nén đẳng nhiệt một lượng khí, mật độ phân tử khí', a: 'tăng tỉ lệ nghịch với thể tích', d: ['giảm', 'không đổi', 'tăng tỉ lệ với nhiệt độ'], kn: 'Mật độ phân tử μ = N/V; khi V giảm, N không đổi thì μ tăng tỉ lệ nghịch với V, đồng thời áp suất tăng.' },
    { t: T.dh, q: 'Áp suất chất khí lên thành bình là do', a: 'các phân tử khí va chạm với thành bình', d: ['trọng lượng của các phân tử khí', 'lực hút giữa các phân tử khí', 'khí bị nén'], kn: K[T.dh] },
    { t: T.dh, q: 'Động năng tịnh tiến trung bình của phân tử khí lí tưởng tỉ lệ thuận với', a: 'nhiệt độ tuyệt đối', d: ['thể tích khí', 'khối lượng mol', 'bình phương nhiệt độ'], kn: K[T.dh] },
    { t: T.tt, q: 'Đơn vị của cảm ứng từ là', a: 'tesla (T)', d: ['weber (Wb)', 'henry (H)', 'vôn (V)'], kn: K[T.tt] },
    { t: T.tt, q: 'Chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường được xác định bằng', a: 'quy tắc bàn tay trái', d: ['quy tắc nắm tay phải', 'định luật Lenz', 'quy tắc vào Nam ra Bắc'], kn: K[T.tt] },
    { t: T.tt, q: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện bằng 0 khi dây dẫn', a: 'đặt song song với đường sức từ', d: ['đặt vuông góc với đường sức từ', 'hợp với đường sức từ góc 45°', 'có dòng điện lớn'], kn: K[T.tt] },
    { t: T.tt, q: 'Đường sức từ của nam châm thẳng ở bên ngoài nam châm có chiều', a: 'đi ra từ cực Bắc, đi vào cực Nam', d: ['đi ra từ cực Nam, đi vào cực Bắc', 'song song với trục nam châm', 'là các đường tròn đồng tâm'], kn: 'Ngoài nam châm, đường sức từ đi ra từ cực Bắc (N), vào cực Nam (S); các đường sức không cắt nhau.' },
    { t: T.cu, q: 'Đơn vị của từ thông là', a: 'weber (Wb)', d: ['tesla (T)', 'henry (H)', 'ampe (A)'], kn: K[T.cu] },
    { t: T.cu, q: 'Theo định luật Lenz, dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra', a: 'chống lại sự biến thiên của từ thông qua mạch', d: ['cùng chiều với từ trường ngoài', 'luôn ngược chiều từ trường ngoài', 'làm từ thông tăng nhanh hơn'], kn: K[T.cu] },
    { t: T.cu, q: 'Máy phát điện xoay chiều hoạt động dựa trên hiện tượng', a: 'cảm ứng điện từ', d: ['tự cảm', 'nhiệt điện', 'quang điện'], kn: K[T.cu] },
    { t: T.cu, q: 'Sóng điện từ', a: 'là sóng ngang và truyền được trong chân không', d: ['là sóng dọc', 'không truyền được trong chân không', 'có vectơ E và B cùng phương'], kn: 'Sóng điện từ là sóng ngang (E ⊥ B ⊥ phương truyền), truyền được trong chân không với tốc độ c = 3.10⁸ m/s.' },
    { t: T.cu, q: 'Để giảm hao phí khi truyền tải điện năng đi xa, biện pháp hiệu quả nhất là', a: 'tăng điện áp ở nơi phát bằng máy tăng áp', d: ['giảm điện áp ở nơi phát', 'tăng điện trở đường dây', 'giảm tiết diện dây dẫn'], kn: 'Công suất hao phí ΔP = P²R/(U²cos²φ); tăng U lên n lần thì ΔP giảm n² lần.' },
    { t: T.hn, q: 'Hai hạt nhân đồng vị là hai hạt nhân có', a: 'cùng số proton, khác số neutron', d: ['cùng số neutron, khác số proton', 'cùng số khối', 'cùng năng lượng liên kết'], kn: K[T.hn] },
    { t: T.hn, q: 'Đại lượng đặc trưng cho mức độ bền vững của hạt nhân là', a: 'năng lượng liên kết riêng', d: ['năng lượng liên kết', 'số khối', 'độ hụt khối'], kn: K[T.hn] },
    { t: T.hn, q: 'Lực hạt nhân là lực', a: 'hút rất mạnh giữa các nucleon, có bán kính tác dụng rất ngắn', d: ['đẩy giữa các proton', 'tương tác tĩnh điện', 'hấp dẫn giữa các nucleon'], kn: 'Lực hạt nhân là lực hút rất mạnh, chỉ tác dụng trong phạm vi kích thước hạt nhân (≈10⁻¹⁵ m), không phụ thuộc điện tích.' },
    { t: T.pu, q: 'Trong phản ứng hạt nhân, đại lượng nào sau đây KHÔNG được bảo toàn?', a: 'Khối lượng nghỉ', d: ['Số khối', 'Điện tích', 'Năng lượng toàn phần'], kn: K[T.pu] },
    { t: T.pu, q: 'Phản ứng phân hạch là', a: 'sự vỡ của một hạt nhân nặng thành hai hạt nhân trung bình', d: ['sự kết hợp hai hạt nhân nhẹ thành hạt nhân nặng hơn', 'sự phát ra tia γ', 'sự hấp thụ electron'], kn: 'Phân hạch: hạt nhân nặng (U-235, Pu-239) hấp thụ neutron chậm vỡ thành hai hạt nhân trung bình, kèm 2–3 neutron, toả năng lượng lớn. Nhiệt hạch: hai hạt nhân nhẹ hợp thành hạt nặng hơn ở nhiệt độ rất cao.' },
    { t: T.pu, q: 'Phản ứng nhiệt hạch xảy ra trong lòng Mặt Trời là', a: 'sự tổng hợp các hạt nhân hydrogen thành helium', d: ['sự phân hạch uranium', 'sự phóng xạ α', 'sự phân rã neutron'], kn: 'Năng lượng Mặt Trời chủ yếu từ phản ứng nhiệt hạch tổng hợp H thành He.' },
    { t: T.px, q: 'Tia α là dòng các', a: 'hạt nhân ⁴₂He', d: ['electron', 'photon năng lượng cao', 'positron'], kn: K[T.px] },
    { t: T.px, q: 'Tia nào sau đây KHÔNG bị lệch trong điện trường?', a: 'Tia γ', d: ['Tia α', 'Tia β⁻', 'Tia β⁺'], kn: 'Tia γ là sóng điện từ (photon), không mang điện nên không bị lệch trong điện trường và từ trường.' },
    { t: T.px, q: 'Chu kì bán rã của một chất phóng xạ', a: 'không phụ thuộc vào nhiệt độ, áp suất bên ngoài', d: ['tăng khi nhiệt độ tăng', 'giảm khi áp suất tăng', 'phụ thuộc khối lượng mẫu'], kn: K[T.px] },
    { t: T.px, q: 'Trong phóng xạ β⁻, hạt nhân con so với hạt nhân mẹ', a: 'có cùng số khối, số proton tăng 1', d: ['số khối giảm 4, số proton giảm 2', 'số khối tăng 1', 'có cùng số proton'], kn: 'β⁻: ᴬ_ZX → ᴬ_(Z+1)Y + e⁻ + ν̄. α: ᴬ_ZX → ᴬ⁻⁴_(Z−2)Y + ⁴₂He.' },
    { t: T.px, q: 'Biện pháp nào sau đây giúp giảm liều chiếu xạ khi làm việc với nguồn phóng xạ?', a: 'Tăng khoảng cách, giảm thời gian tiếp xúc và dùng tấm chắn', d: ['Tiếp xúc trực tiếp bằng tay', 'Đứng gần nguồn để quan sát rõ', 'Ăn uống gần nơi đặt nguồn'], kn: 'Nguyên tắc an toàn phóng xạ: thời gian – khoảng cách – che chắn.' },
  ]);

  /* =============== PHẦN II: ĐÚNG/SAI =============== */
  add('tf', T.khi, (r) => {
    const p1 = r.pick([1, 2, 3]), V1 = r.pick([6, 8, 12]), k = r.pick([2, 3, 4]), t = r.int(17, 37);
    const V2 = V1 / k, p2 = p1 * k;
    return {
      q: `Một xi lanh chứa ${V1} lít khí lí tưởng ở áp suất ${p1}.10<sup>5</sup> Pa và nhiệt độ ${t} °C. Người ta nén đẳng nhiệt khí đến thể tích ${num(V2)} lít.`,
      items: [
        claim(r, (v) => `Áp suất khí sau khi nén là ${v}.10<sup>5</sup> Pa.`, num(p2), num(p1 / k, 2), `p₂ = p₁V₁/V₂ = ${num(p2)}.10⁵ Pa.`),
        claim(r, (v) => `Trong quá trình nén, nội năng của khí ${v}.`, 'không đổi', 'tăng', `Nhiệt độ không đổi ⇒ nội năng khí lí tưởng không đổi (ΔU = 0).`),
        claim(r, (v) => `Mật độ phân tử khí sau khi nén ${v} so với ban đầu.`, 'tăng ' + k + ' lần', 'giảm ' + k + ' lần', `μ = N/V, V giảm ${k} lần ⇒ μ tăng ${k} lần.`),
        claim(r, (v) => `Trong quá trình nén đẳng nhiệt, khí ${v}.`, 'truyền nhiệt ra môi trường', 'nhận nhiệt từ môi trường', `ΔU = A + Q = 0, khí nhận công (A > 0) ⇒ Q = −A < 0: khí toả nhiệt.`),
      ],
    };
  });
  add('tf', T.nr, (r) => {
    const P = r.pick([500, 800, 1000]), m = r.pick([1, 2]), t1 = r.int(20, 30), tm = r.pick([3, 4, 5, 6]);
    const Q = P * tm * 60;
    const c = r.pick([3800, 4000, 4200]);
    const dtExp = Q / (m * c);
    if (dtExp < 8 || t1 + dtExp > 85) throw new Error('retry');
    return {
      q: `Trong thí nghiệm đo nhiệt dung riêng của nước, một học sinh dùng dây đun có công suất ${P} W đun ${num(m)} kg nước trong ${tm} phút, nhiệt độ ban đầu ${t1} °C. Bỏ qua hao phí; học sinh đo được nhiệt độ cuối là ${num(t1 + dtExp, 1)} °C.`,
      items: [
        claim(r, (v) => `Nhiệt lượng dây đun cung cấp là ${v} J.`, num(Q), num(P * tm), `Q = Pt = ${P}·${tm * 60} = ${num(Q)} J (đổi phút → giây).`),
        claim(r, (v) => `Độ tăng nhiệt độ của nước là ${v} K.`, num(dtExp, 1), num(dtExp + 273, 1), `Δt = ${num(dtExp, 1)} °C = ${num(dtExp, 1)} K (độ chia bằng nhau).`),
        claim(r, (v) => `Nhiệt dung riêng của nước tính được từ thí nghiệm xấp xỉ ${v} J/(kg.K).`, num(Math.round(Q / (m * dtExp))), num(Math.round(Q / (m * dtExp)) + 400), `c = Q/(mΔt) = ${num(Q)}/(${num(m)}·${num(dtExp, 1)}) ≈ ${num(Math.round(Q / (m * dtExp)))} J/(kg.K).`),
        claim(r, (v) => `Nếu tính đến hao phí nhiệt ra môi trường thì giá trị nhiệt dung riêng thực tế ${v} giá trị tính được.`, 'nhỏ hơn', 'lớn hơn', `Nhiệt lượng nước thực nhận nhỏ hơn Pt ⇒ c thực = Q<sub>thu</sub>/(mΔt) nhỏ hơn giá trị tính bằng Pt.`),
      ],
    };
  });
  add('tf', T.tt, (r) => {
    const B = r.pick([0.1, 0.2, 0.5]), I = r.pick([2, 4, 5]), l = r.pick([0.2, 0.5]);
    const F = B * I * l;
    return {
      q: `Một đoạn dây dẫn thẳng MN dài ${num(l * 100)} cm mang dòng điện ${I} A đặt trong từ trường đều có B = ${num(B)} T, dây vuông góc với các đường sức từ.`,
      items: [
        claim(r, (v) => `Lực từ tác dụng lên đoạn dây có độ lớn ${v} N.`, num(F, 3), num(F * 100, 3), `F = BIl = ${num(B)}·${I}·${num(l)} = ${num(F, 3)} N.`),
        claim(r, (v) => `Lực từ có phương ${v}.`, 'vuông góc với cả dây dẫn và vectơ cảm ứng từ', 'song song với vectơ cảm ứng từ', `Lực từ luôn vuông góc với mặt phẳng chứa dây dẫn và vectơ B (quy tắc bàn tay trái).`),
        claim(r, (v) => `Nếu quay dây đến vị trí hợp với đường sức góc 30° thì lực từ có độ lớn ${v} N.`, num(F / 2, 3), num((F * Math.sqrt(3)) / 2, 3), `F' = BIl·sin30° = ${num(F / 2, 3)} N.`),
        claim(r, (v) => `Nếu đổi chiều dòng điện thì lực từ ${v}.`, 'đổi chiều, độ lớn không đổi', 'giữ nguyên chiều', `Đổi chiều I thì lực từ đổi chiều, độ lớn F = BIl không đổi.`),
      ],
    };
  });
  add('tf', T.px, (r) => {
    const Tn = r.pick([2, 4, 5, 8]), N0 = r.pick([1, 2, 4, 8]) * 1e20, k = r.int(2, 3);
    const N = N0 / Math.pow(2, k);
    return {
      q: `Một mẫu chất phóng xạ có chu kì bán rã T = ${Tn} giờ, ban đầu chứa ${sci(N0, 2)} hạt nhân.`,
      items: [
        claim(r, (v) => `Hằng số phóng xạ của chất này là ${v} s⁻¹.`, sci(Math.log(2) / (Tn * 3600), 3), sci(Math.log(2) / Tn, 3), `λ = ln2/T = 0,693/(${Tn}·3600) ≈ ${sci(Math.log(2) / (Tn * 3600), 3)} s⁻¹.`),
        claim(r, (v) => `Sau ${k * Tn} giờ, số hạt nhân còn lại là ${v}.`, sci(N, 3), sci(N0 / (2 * k), 3), `t = ${k}T ⇒ N = N₀/2<sup>${k}</sup> = ${sci(N, 3)}.`),
        claim(r, (v) => `Độ phóng xạ của mẫu ${v} theo thời gian.`, 'giảm', 'tăng', `H = λN giảm theo quy luật hàm mũ giống N.`),
        claim(r, (v) => `Sau ${k * Tn} giờ, số hạt nhân đã phân rã chiếm ${v} số hạt nhân ban đầu.`, num((1 - 1 / Math.pow(2, k)) * 100, 1) + '%', num(100 / Math.pow(2, k), 1) + '%', `ΔN/N₀ = 1 − 2<sup>−${k}</sup> = ${num((1 - 1 / Math.pow(2, k)) * 100, 1)}%.`),
      ],
    };
  });
  add('tf', T.pu, (r) => {
    const E = 17.6;
    const nAvo = r.pick([1, 2, 0.5]);
    const Etot = E * 1.6e-13 * W.NA * nAvo;
    return {
      q: `Phản ứng nhiệt hạch: ${PART.d} + ${PART.t} → ${PART.a} + X, toả năng lượng khoảng 17,6 MeV. Cho N<sub>A</sub> = 6,02.10<sup>23</sup> mol⁻¹, 1 MeV = 1,6.10<sup>−13</sup> J.`,
      items: [
        claim(r, (v) => `X là ${v}.`, 'neutron', 'proton', `Bảo toàn số khối: 2 + 3 = 4 + A ⇒ A = 1; điện tích: 1 + 1 = 2 + Z ⇒ Z = 0 ⇒ X là neutron.`),
        claim(r, (v) => `Tổng khối lượng các hạt sau phản ứng ${v} tổng khối lượng các hạt trước phản ứng.`, 'nhỏ hơn', 'lớn hơn', `Phản ứng toả năng lượng ⇒ m<sub>sau</sub> < m<sub>trước</sub>.`),
        claim(r, (v) => `Phản ứng này ${v}.`, 'cần nhiệt độ rất cao (hàng chục triệu độ) mới xảy ra', 'xảy ra ở nhiệt độ thường', `Phản ứng nhiệt hạch cần nhiệt độ rất cao để các hạt nhân thắng lực đẩy Coulomb.`),
        claim(r, (v) => `Năng lượng toả ra khi tổng hợp ${num(nAvo)} mol helium theo phản ứng trên xấp xỉ ${v} J.`, sci(Etot, 3), sci(Etot / W.NA, 3), `E = ${num(nAvo)}·N<sub>A</sub>·17,6·1,6.10⁻¹³ ≈ ${sci(Etot, 3)} J.`),
      ],
    };
  });
  add('tf', T.cu, (r) => {
    const N = r.pick([100, 200, 500]), Scm = r.pick([50, 100, 200]), B1 = r.pick([0.1, 0.2]), B2 = r.pick([0.5, 0.6, 0.8]), dt = r.pick([0.1, 0.2, 0.5]), R = r.pick([2, 4, 5, 10]);
    const dPhi = N * (B2 - B1) * Scm * 1e-4;
    const e = dPhi / dt, I = e / R;
    return {
      q: `Một cuộn dây phẳng có ${N} vòng, diện tích mỗi vòng ${Scm} cm², điện trở ${R} Ω, đặt trong từ trường đều có các đường sức vuông góc với mặt cuộn dây. Trong ${num(dt)} s, cảm ứng từ tăng đều từ ${num(B1)} T lên ${num(B2)} T.`,
      items: [
        claim(r, (v) => `Độ biến thiên từ thông qua cuộn dây là ${v} Wb.`, num(dPhi, 4), num(dPhi / N, 4), `ΔΦ = N(B₂ − B₁)S = ${N}·${num(B2 - B1)}·${Scm}.10⁻⁴ = ${num(dPhi, 4)} Wb.`),
        claim(r, (v) => `Suất điện động cảm ứng có độ lớn ${v} V.`, num(e, 3), num(e * dt * dt, 3), `|e| = ΔΦ/Δt = ${num(dPhi, 4)}/${num(dt)} = ${num(e, 3)} V.`),
        claim(r, (v) => `Cường độ dòng điện cảm ứng trong cuộn dây là ${v} A.`, num(I, 3), num(e * R, 3), `I = e/R = ${num(e, 3)}/${R} = ${num(I, 3)} A.`),
        claim(r, (v) => `Từ trường do dòng điện cảm ứng sinh ra ${v} từ trường ngoài.`, 'ngược chiều với', 'cùng chiều với', `B tăng ⇒ Φ tăng; theo định luật Lenz, từ trường cảm ứng ngược chiều từ trường ngoài.`),
      ],
    };
  });
  add('tf', T.nr, (r) => {
    const m = r.pick([0.1, 0.2, 0.5]), tEnd = r.pick([20, 30, 40]);
    const Q1 = m * W.lam, Q2 = m * W.c * tEnd;
    return {
      q: `Người ta cung cấp nhiệt cho ${num(m)} kg nước đá ở 0 °C để nó tan hết và nóng lên tới ${tEnd} °C. Cho λ = 3,34.10<sup>5</sup> J/kg; c<sub>nước</sub> = 4200 J/(kg.K).`,
      items: [
        claim(r, (v) => `Trong quá trình nước đá tan, nhiệt độ của hỗn hợp ${v}.`, 'giữ không đổi ở 0 °C', 'tăng dần', `Nóng chảy chất rắn kết tinh xảy ra ở nhiệt độ không đổi.`),
        claim(r, (v) => `Nhiệt lượng để nước đá tan hết là ${v} kJ.`, num(Q1 / 1000, 1), num((Q1 / 1000) * 10, 1), `Q₁ = λm = 3,34.10⁵·${num(m)} = ${num(Q1 / 1000, 1)} kJ.`),
        claim(r, (v) => `Nhiệt lượng để nước nóng từ 0 °C đến ${tEnd} °C là ${v} kJ.`, num(Q2 / 1000, 1), num((m * 2100 * tEnd) / 1000, 1), `Q₂ = mcΔt = ${num(m)}·4200·${tEnd} = ${num(Q2 / 1000, 1)} kJ.`),
        claim(r, (v) => `Tổng nhiệt lượng cần cung cấp là ${v} kJ.`, num((Q1 + Q2) / 1000, 1), num((Q1 - Q2) / 1000, 1), `Q = Q₁ + Q₂ = ${num((Q1 + Q2) / 1000, 1)} kJ.`),
      ],
    };
  });
  add('tf', T.cu, (r) => {
    const N1 = r.pick([200, 400, 500]), k = r.pick([2, 4, 5, 10]), U1 = r.pick([220, 110]), up = r.bool();
    const N2 = up ? N1 * k : N1 / k, U2 = up ? U1 * k : U1 / k;
    return {
      q: `Một máy biến áp lí tưởng có cuộn sơ cấp ${N1} vòng và cuộn thứ cấp ${N2} vòng. Cuộn sơ cấp nối với điện áp xoay chiều có giá trị hiệu dụng ${U1} V, tần số 50 Hz.`,
      items: [
        claim(r, (v) => `Đây là máy ${v}.`, up ? 'tăng áp' : 'hạ áp', up ? 'hạ áp' : 'tăng áp', `N₂ ${up ? '>' : '<'} N₁ nên là máy ${up ? 'tăng' : 'hạ'} áp.`),
        claim(r, (v) => `Điện áp hiệu dụng ở cuộn thứ cấp để hở là ${v} V.`, num(U2), num(up ? U1 / k : U1 * k), `U₂ = U₁N₂/N₁ = ${num(U2)} V.`),
        claim(r, (v) => `Tần số dòng điện ở cuộn thứ cấp là ${v} Hz.`, '50', num(up ? 50 * k : 50 / k), `Máy biến áp không làm thay đổi tần số.`),
        claim(r, (v) => `Máy biến áp ${v} với dòng điện một chiều không đổi.`, 'không hoạt động được', 'vẫn hoạt động bình thường', `Dòng một chiều không đổi không tạo từ thông biến thiên nên không có cảm ứng ở cuộn thứ cấp.`),
      ],
    };
  });

  /* =============== PHẦN III: TRẢ LỜI NGẮN =============== */
  add('sa', T.nr, (r) => {
    const m = r.pick([0.5, 1, 1.5, 2]), t1 = r.int(15, 30), t2 = 100, cpot = r.pick([0.3, 0.4, 0.5]);
    const Q = (m * W.c + cpot * 880) * (t2 - t1);
    return {
      q: `Một ấm nhôm khối lượng ${num(cpot)} kg chứa ${num(m)} kg nước ở ${t1} °C. Nhiệt lượng tối thiểu để đun sôi nước là bao nhiêu kJ (làm tròn đến hàng đơn vị)? Biết c<sub>nước</sub> = 4200 J/(kg.K), c<sub>nhôm</sub> = 880 J/(kg.K).`,
      ans: Math.round(Q / 1000), dp: 0,
      sol: `Q = (m<sub>n</sub>c<sub>n</sub> + m<sub>Al</sub>c<sub>Al</sub>)(100 − ${t1}) = (${num(m)}·4200 + ${num(cpot)}·880)·${100 - t1} = ${num(Q)} J ≈ ${Math.round(Q / 1000)} kJ.`,
    };
  });
  add('sa', T.nr, (r) => {
    const m1 = r.pick([0.2, 0.3, 0.5]), t1 = r.int(70, 95), m2 = r.pick([0.4, 0.5, 0.8, 1]), t2 = r.int(10, 25);
    const t = (m1 * t1 + m2 * t2) / (m1 + m2);
    return {
      q: `Đổ ${num(m1)} kg nước ở ${t1} °C vào ${num(m2)} kg nước ở ${t2} °C. Bỏ qua trao đổi nhiệt với môi trường. Nhiệt độ cân bằng là bao nhiêu °C (làm tròn đến hàng phần mười)?`,
      ans: round(t, 1), dp: 1,
      sol: `t = (m₁t₁ + m₂t₂)/(m₁ + m₂) = (${num(m1)}·${t1} + ${num(m2)}·${t2})/${num(m1 + m2)} ≈ ${numF(round(t, 1), 1)} °C.`,
    };
  });
  add('sa', T.khi, (r) => {
    const p1 = r.pick([1, 1.2, 1.5, 2]), V1 = r.pick([10, 15, 20, 30]), V2 = r.pick([3, 4, 5, 6]);
    const p2 = (p1 * V1) / V2;
    return {
      q: `Một bơm tay nén đẳng nhiệt ${V1} lít không khí ở áp suất ${num(p1)} atm xuống còn ${V2} lít. Áp suất khí sau khi nén là bao nhiêu atm (làm tròn đến hàng phần mười)?`,
      ans: round(p2, 1), dp: 1,
      sol: `p₂ = p₁V₁/V₂ = ${num(p1)}·${V1}/${V2} ≈ ${numF(round(p2, 1), 1)} atm.`,
    };
  });
  add('sa', T.khi, (r) => {
    const p1 = r.pick([2, 2.2, 2.5]), t1 = r.int(15, 27), p2 = r.pick([2.6, 2.8, 3, 3.2]);
    const T2 = ((t1 + 273) * p2) / p1;
    if (p2 <= p1) throw new Error('retry');
    return {
      q: `Lốp xe chứa khí ở áp suất ${num(p1)} bar, nhiệt độ ${t1} °C. Coi thể tích lốp không đổi, lốp chịu được áp suất tối đa ${num(p2)} bar. Nhiệt độ tối đa của khí trong lốp là bao nhiêu °C (làm tròn đến hàng đơn vị)?`,
      ans: Math.round(T2 - 273), dp: 0,
      sol: `Đẳng tích: p₁/T₁ = p₂/T₂ ⇒ T₂ = ${t1 + 273}·${num(p2)}/${num(p1)} ≈ ${num(T2, 1)} K ⇒ t₂ ≈ ${Math.round(T2 - 273)} °C.`,
    };
  });
  add('sa', T.khi, (r) => {
    const V = r.pick([10, 20, 24, 50]), p = r.pick([1, 2, 1.5]), t = r.int(0, 40);
    const n = (p * 1e5 * V * 1e-3) / (W.R * (t + 273));
    return {
      q: `Một bình kín dung tích ${V} lít chứa khí lí tưởng ở ${num(p)}.10<sup>5</sup> Pa và ${t} °C. Số mol khí trong bình là bao nhiêu (làm tròn đến hàng phần trăm)? Cho R = 8,31 J/(mol.K).`,
      ans: round(n, 2), dp: 2,
      sol: `n = pV/(RT) = ${num(p)}.10⁵·${V}.10⁻³/(8,31·${t + 273}) ≈ ${numF(round(n, 2), 2)} mol.`,
    };
  });
  add('sa', T.tt, (r) => {
    const B = r.pick([0.04, 0.05, 0.08, 0.1]), I = r.pick([5, 6, 8, 10, 12]), lcm = r.pick([10, 15, 20, 25, 40]), a = r.pick([30, 90]);
    const F = B * I * lcm * 0.01 * (a === 30 ? 0.5 : 1);
    return {
      q: `Một đoạn dây dài ${lcm} cm mang dòng điện ${I} A, đặt trong từ trường đều B = ${num(B)} T và hợp với vectơ cảm ứng từ góc ${a}°. Lực từ tác dụng lên đoạn dây bằng bao nhiêu N (làm tròn đến hàng phần trăm)?`,
      ans: round(F, 2), dp: 2,
      sol: `F = BIl·sinα = ${num(B)}·${I}·${num(lcm / 100)}·sin${a}° = ${num(F, 4)} ≈ ${numF(round(F, 2), 2)} N.`,
    };
  });
  add('sa', T.cu, (r) => {
    const N = r.pick([50, 100, 200]), S1 = r.pick([0.01, 0.02, 0.04]), B = r.pick([0.2, 0.4, 0.5]), dt = r.pick([0.05, 0.1, 0.2]);
    const e = (N * B * S1) / dt;
    return {
      q: `Một khung dây ${N} vòng, diện tích mỗi vòng ${num(S1)} m², đặt vuông góc với từ trường đều B = ${num(B)} T. Trong ${num(dt)} s, từ trường giảm đều về 0. Độ lớn suất điện động cảm ứng là bao nhiêu V (làm tròn đến hàng phần mười)?`,
      ans: round(e, 1), dp: 1,
      sol: `|e| = NSΔB/Δt = ${N}·${num(S1)}·${num(B)}/${num(dt)} = ${numF(round(e, 1), 1)} V.`,
    };
  });
  add('sa', T.px, (r) => {
    const Tn = r.pick([3, 5, 8, 10]), t = r.pick([2, 4, 6, 7, 12, 15]);
    const pct = 100 * Math.pow(2, -t / Tn);
    return {
      q: `Một chất phóng xạ có chu kì bán rã ${Tn} ngày. Sau ${t} ngày, số hạt nhân còn lại bằng bao nhiêu phần trăm số hạt nhân ban đầu (làm tròn đến hàng phần mười)?`,
      ans: round(pct, 1), dp: 1,
      sol: `N/N₀ = 2<sup>−t/T</sup> = 2<sup>−${t}/${Tn}</sup> ≈ ${num(pct / 100, 4)} ⇒ ≈ ${numF(round(pct, 1), 1)}%.`,
    };
  });
  add('sa', T.hn, (r) => {
    const x = r.pick(MASS);
    const b = bind(x);
    return {
      q: `Cho m(${nuc(x.n)}) = ${num(x.m, 4)} u; m<sub>p</sub> = 1,0073 u; m<sub>n</sub> = 1,0087 u; 1 u = 931,5 MeV/c². Năng lượng liên kết riêng của hạt nhân ${nuc(x.n)} bằng bao nhiêu MeV/nucleon (làm tròn đến hàng phần trăm)?`,
      ans: round(b.Wr, 2), dp: 2,
      sol: `Δm = ${num(b.dm, 4)} u ⇒ W<sub>lk</sub> = ${num(b.W, 3)} MeV ⇒ W<sub>lk</sub>/A = ${num(b.W, 3)}/${x.n.A} ≈ ${numF(round(b.Wr, 2), 2)} MeV/nucleon.`,
    };
  });
  add('sa', T.cu, (r) => {
    const U1 = r.pick([220, 380]), U2 = r.pick([6, 12, 24, 44, 55, 110]), N1 = r.pick([1100, 2200, 3800]);
    const N2 = (N1 * U2) / U1;
    if (!Number.isInteger(N2)) throw new Error('retry');
    return {
      q: `Một máy biến áp lí tưởng biến đổi điện áp hiệu dụng ${U1} V thành ${U2} V. Cuộn sơ cấp có ${N1} vòng. Số vòng của cuộn thứ cấp là bao nhiêu?`,
      ans: N2, dp: 0,
      sol: `N₂ = N₁U₂/U₁ = ${N1}·${U2}/${U1} = ${N2} vòng.`,
    };
  });
  add('sa', T.dh, (r) => {
    const t = r.int(0, 100);
    const E = 1.5 * W.k * (t + 273);
    return {
      q: `Động năng tịnh tiến trung bình của một phân tử khí ở ${t} °C bằng x.10<sup>−21</sup> J. Tìm x (làm tròn đến hàng phần trăm). Cho k = 1,38.10<sup>−23</sup> J/K.`,
      ans: round(E * 1e21, 2), dp: 2,
      sol: `W<sub>đ</sub> = 1,5kT = 1,5·1,38.10⁻²³·${t + 273} ≈ ${num(E * 1e21, 4)}.10⁻²¹ J ⇒ x ≈ ${numF(round(E * 1e21, 2), 2)}.`,
    };
  });
})(typeof window !== 'undefined' ? window : globalThis);
