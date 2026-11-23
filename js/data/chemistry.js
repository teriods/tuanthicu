/* Ngân hàng dạng bài môn HOÁ HỌC – CT GDPT 2018 (danh pháp IUPAC, thể tích khí ở điều kiện chuẩn đkc: 24,79 L/mol). */
(function (G) {
  'use strict';
  const LT = G.LT;
  const { num, numF, sci, sub, sup, round, opts, numOpts, claim, MINUS } = LT.U;
  const S = 'chemistry';
  const add = (part, topic, gen) => LT.add(S, part, topic, gen);

  const T = {
    est: 'Ester – Lipid',
    carb: 'Carbohydrate',
    amin: 'Amine – Amino acid – Peptide',
    pol: 'Polymer',
    dh: 'Pin điện & Điện phân',
    kl: 'Đại cương kim loại',
    kiem: 'Kim loại nhóm IA, IIA – Nước cứng',
    ccd: 'Kim loại chuyển tiếp – Phức chất',
    can: 'Cân bằng hoá học – pH',
    nhiet: 'Năng lượng – Tốc độ phản ứng',
    hc: 'Hydrocarbon – Hợp chất hữu cơ',
    nt: 'Nguyên tử – Bảng tuần hoàn',
  };
  LT.TOPICS[S] = Object.values(T);
  const VM = 24.79;

  LT.addKnow(S, {
    [T.est]: 'Ester RCOOR\' thuỷ phân trong môi trường kiềm (xà phòng hoá): RCOOR\' + NaOH → RCOONa + R\'OH (phản ứng một chiều). Chất béo là triester của glycerol với acid béo; xà phòng hoá tạo glycerol và muối của acid béo (xà phòng). Ester no, đơn chức, mạch hở: CₙH₂ₙO₂.',
    [T.carb]: 'Glucose, fructose (C₆H₁₂O₆) là monosaccharide; glucose tráng bạc: 1 glucose → 2Ag. Lên men: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Saccharose (C₁₂H₂₂O₁₁) thuỷ phân → glucose + fructose, không tráng bạc. Tinh bột, cellulose (C₆H₁₀O₅)ₙ thuỷ phân hoàn toàn → glucose.',
    [T.amin]: 'Amine có tính base (làm quỳ ẩm hoá xanh, trừ aniline); RNH₂ + HCl → RNH₃Cl. Amino acid lưỡng tính (có –NH₂ và –COOH). Peptide tạo từ k gốc α-amino acid: M = ΣM(aa) − 18(k − 1). Phản ứng màu biuret (Cu(OH)₂) cho màu tím với peptide có từ 2 liên kết peptide trở lên.',
    [T.pol]: 'Polymer trùng hợp: từ monomer có liên kết bội (PE, PVC, PS, cao su buna...). Polymer trùng ngưng: từ monomer có ≥ 2 nhóm chức, giải phóng phân tử nhỏ (nylon-6,6, tơ lapsan...). Hệ số polymer hoá n = M(polymer)/M(mắt xích).',
    [T.dh]: 'Sức điện động chuẩn của pin: E°pin = E°(cathode) − E°(anode), kim loại có thế điện cực nhỏ hơn là anode (cực âm, bị oxi hoá). Định luật Faraday: m = AIt/(nF), F = 96500 C/mol. Điện phân: cathode xảy ra sự khử, anode xảy ra sự oxi hoá.',
    [T.kl]: 'Kim loại có tính khử: M → Mⁿ⁺ + ne. Kim loại đứng trước H khử được H⁺ trong acid loãng tạo H₂. Ăn mòn điện hoá cần: 2 điện cực khác bản chất, tiếp xúc nhau và cùng nhúng trong dung dịch chất điện li; kim loại mạnh hơn bị ăn mòn.',
    [T.kiem]: 'Kim loại kiềm (IA), kiềm thổ (IIA) có tính khử mạnh, được điều chế bằng điện phân nóng chảy. Nước cứng chứa nhiều Ca²⁺, Mg²⁺; nước cứng tạm thời chứa HCO₃⁻ (làm mềm bằng đun sôi), nước cứng vĩnh cửu chứa Cl⁻, SO₄²⁻; Na₂CO₃, Na₃PO₄ làm mềm được cả hai loại.',
    [T.ccd]: 'Kim loại chuyển tiếp dãy thứ nhất (Sc → Cu) có nhiều số oxi hoá, tạo hợp chất có màu và phức chất. Phức chất gồm nguyên tử trung tâm và các phối tử liên kết cho – nhận; số phối trí thường 2, 4, 6 (dạng thẳng, vuông phẳng/tứ diện, bát diện). [Cu(NH₃)₄]²⁺ màu xanh lam đậm.',
    [T.can]: 'Hằng số cân bằng K_C = [C]ᶜ[D]ᵈ/([A]ᵃ[B]ᵇ) (không ghi chất rắn). Nguyên lí Le Chatelier: cân bằng chuyển dịch theo chiều chống lại sự thay đổi. pH = −lg[H⁺]; pH + pOH = 14 (25 °C).',
    [T.nhiet]: 'ΔrH°₂₉₈ = Σ ΔfH°(sản phẩm) − Σ ΔfH°(chất đầu); ΔrH < 0: phản ứng toả nhiệt. Tốc độ trung bình v = ±ΔC/(hệ số·Δt). Tăng nồng độ, nhiệt độ, diện tích bề mặt, dùng xúc tác làm tăng tốc độ phản ứng.',
    [T.hc]: 'Alkane CₙH₂ₙ₊₂ cháy cho n(H₂O) > n(CO₂), n(alkane) = n(H₂O) − n(CO₂). Alkene CₙH₂ₙ cháy cho n(H₂O) = n(CO₂) và làm mất màu nước bromine. Aldehyde có phản ứng tráng bạc.',
    [T.nt]: 'Vị trí nguyên tố: số thứ tự ô = Z; số chu kì = số lớp electron; nguyên tố s, p thuộc nhóm A với số thứ tự nhóm = số electron lớp ngoài cùng; nguyên tố d thuộc nhóm B.',
  });

  const M = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ag: 108, Ba: 137 };

  /* =============== PHẦN I: TÍNH TOÁN =============== */
  const ESTERS = [
    { f: 'HCOOCH₃', n: 'methyl formate', M: 60, salt: 'HCOONa', Ms: 68, alc: 'CH₃OH', Ma: 32 },
    { f: 'HCOOC₂H₅', n: 'ethyl formate', M: 74, salt: 'HCOONa', Ms: 68, alc: 'C₂H₅OH', Ma: 46 },
    { f: 'CH₃COOCH₃', n: 'methyl acetate', M: 74, salt: 'CH₃COONa', Ms: 82, alc: 'CH₃OH', Ma: 32 },
    { f: 'CH₃COOC₂H₅', n: 'ethyl acetate', M: 88, salt: 'CH₃COONa', Ms: 82, alc: 'C₂H₅OH', Ma: 46 },
    { f: 'C₂H₅COOCH₃', n: 'methyl propionate', M: 88, salt: 'C₂H₅COONa', Ms: 96, alc: 'CH₃OH', Ma: 32 },
  ];
  add('mc', T.est, (r) => {
    const e = r.pick(ESTERS), n = r.pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
    const m = round(n * e.M, 2);
    const askAlc = r.bool();
    const ans = round(n * (askAlc ? e.Ma : e.Ms), 2);
    return {
      q: `Thuỷ phân hoàn toàn ${num(m)} gam ${e.n} (${e.f}) bằng dung dịch NaOH vừa đủ. Khối lượng ${askAlc ? 'alcohol' : 'muối'} thu được là`,
      opts: numOpts(ans, [round(n * (askAlc ? e.Ms : e.Ma), 2), round(n * e.M, 2), round(n * 40, 2), round(ans * 2, 2), round(ans + 1.6, 2)], (x) => num(x, 2) + ' gam'),
      sol: `n(ester) = ${num(m)}/${e.M} = ${num(n)} mol. ${e.f} + NaOH → ${e.salt} + ${e.alc}. m(${askAlc ? e.alc : e.salt}) = ${num(n)}·${askAlc ? e.Ma : e.Ms} = ${num(ans, 2)} gam.`,
    };
  });
  add('mc', T.est, (r) => {
    const fat = r.pick([{ n: 'tristearin', f: '(C₁₇H₃₅COO)₃C₃H₅', M: 890, s: 'C₁₇H₃₅COONa', Ms: 306 }, { n: 'triolein', f: '(C₁₇H₃₃COO)₃C₃H₅', M: 884, s: 'C₁₇H₃₃COONa', Ms: 304 }, { n: 'tripalmitin', f: '(C₁₅H₃₁COO)₃C₃H₅', M: 806, s: 'C₁₅H₃₁COONa', Ms: 278 }]);
    const n = r.pick([0.01, 0.02, 0.05, 0.1]);
    const m = round(n * fat.M, 2);
    const askGly = r.bool();
    const ans = askGly ? round(n * 92, 2) : round(3 * n * fat.Ms, 2);
    return {
      q: `Xà phòng hoá hoàn toàn ${num(m)} gam ${fat.n} ${fat.f} bằng NaOH vừa đủ. Khối lượng ${askGly ? 'glycerol' : 'xà phòng (muối ' + fat.s + ')'} thu được là`,
      opts: numOpts(ans, askGly ? [round(3 * n * 92, 2), round(n * 92 / 3, 2), round(3 * n * 40, 2), round(n * 62, 2)] : [round(n * fat.Ms, 2), round(m + 3 * n * 40, 2), round(m - 3 * n * 40, 2) , round(ans / 2, 2)], (x) => num(x, 2) + ' gam'),
      sol: `n(chất béo) = ${num(m)}/${fat.M} = ${num(n)} mol. ${fat.f} + 3NaOH → 3${fat.s} + C₃H₅(OH)₃. ${askGly ? 'n(glycerol) = ' + num(n) + ' ⇒ m = ' + num(ans, 2) + ' gam.' : 'n(muối) = 3·' + num(n) + ' ⇒ m = ' + num(3 * n) + '·' + fat.Ms + ' = ' + num(ans, 2) + ' gam.'}`,
    };
  });
  add('mc', T.est, (r) => {
    const n = r.int(2, 5);
    const iso = { 2: 1, 3: 2, 4: 4, 5: 9 }[n];
    return {
      q: `Số đồng phân cấu tạo ester ứng với công thức phân tử C${sub(n)}H${sub(2 * n)}O₂ là`,
      opts: numOpts(iso, [iso + 1, iso + 2, iso - 1 > 0 ? iso - 1 : iso + 3, iso * 2]),
      sol: `Ester no, đơn chức C${sub(n)}H${sub(2 * n)}O₂ có ${iso} đồng phân cấu tạo (${{ 2: 'HCOOCH₃', 3: 'HCOOC₂H₅, CH₃COOCH₃', 4: 'HCOOCH₂CH₂CH₃, HCOOCH(CH₃)₂, CH₃COOC₂H₅, C₂H₅COOCH₃', 5: '4 ester của HCOOH, 2 của CH₃COOH, 1 của C₂H₅COOH, 2 của C₃H₇COOH' }[n]}).`,
    };
  });
  add('mc', T.carb, (r) => {
    const n = r.pick([0.05, 0.1, 0.15, 0.2, 0.25]);
    const m = round(n * 180, 2);
    const ag = round(2 * n * 108, 2);
    return {
      q: `Cho ${num(m)} gam glucose tác dụng hoàn toàn với lượng dư dung dịch AgNO₃ trong NH₃ (thuốc thử Tollens). Khối lượng Ag thu được là`,
      opts: numOpts(ag, [round(n * 108, 2), round(4 * n * 108, 2), round(m * 0.6, 2), round(ag * 1.5, 2)], (x) => num(x, 2) + ' gam'),
      sol: `n(glucose) = ${num(m)}/180 = ${num(n)} mol; 1 glucose → 2Ag ⇒ n(Ag) = ${num(2 * n)} mol ⇒ m = ${num(ag, 2)} gam.`,
    };
  });
  add('mc', T.carb, (r) => {
    const m = r.pick([18, 36, 45, 90, 180, 270]), H = r.pick([50, 60, 75, 80, 90]);
    const eth = round((m / 180) * 2 * 46 * (H / 100), 2);
    return {
      q: `Lên men ${m} gam glucose thành ethanol với hiệu suất ${H}%. Khối lượng ethanol thu được là`,
      opts: numOpts(eth, [round((m / 180) * 46 * (H / 100), 2), round((m / 180) * 2 * 46, 2), round(((m / 180) * 2 * 46) / (H / 100), 2), round(eth * 2, 2)], (x) => num(x, 2) + ' gam'),
      sol: `C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. n(C₂H₅OH) = 2·${num(m / 180, 4)}·${H}% = ${num((m / 180) * 2 * (H / 100), 4)} mol ⇒ m = ${num(eth, 2)} gam.`,
    };
  });
  add('mc', T.carb, (r) => {
    const n = r.pick([0.05, 0.1, 0.2]);
    const m = round(n * 342, 2);
    const g = round(n * 180, 2);
    return {
      q: `Thuỷ phân hoàn toàn ${num(m)} gam saccharose trong môi trường acid. Khối lượng glucose thu được là`,
      opts: numOpts(g, [round(2 * n * 180, 2), round(n * 342, 2), round(n * 162, 2), round(g / 2, 2)], (x) => num(x, 2) + ' gam'),
      sol: `C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose). n(glucose) = n(saccharose) = ${num(n)} mol ⇒ m = ${num(g, 2)} gam.`,
    };
  });
  const AMINES = [{ f: 'CH₃NH₂', n: 'methylamine', M: 31 }, { f: 'C₂H₅NH₂', n: 'ethylamine', M: 45 }, { f: '(CH₃)₂NH', n: 'dimethylamine', M: 45 }, { f: 'C₆H₅NH₂', n: 'aniline', M: 93 }, { f: 'C₃H₇NH₂', n: 'propylamine', M: 59 }];
  add('mc', T.amin, (r) => {
    const a = r.pick(AMINES), n = r.pick([0.1, 0.2, 0.05, 0.15]);
    const m = round(n * a.M, 2), salt = round(n * (a.M + 36.5), 3);
    return {
      q: `Cho ${num(m)} gam ${a.n} (${a.f}) tác dụng vừa đủ với dung dịch HCl. Khối lượng muối thu được là`,
      opts: numOpts(salt, [round(m + n * 35.5, 3), round(m + n * 36.5 * 2, 3), round(n * 36.5, 3), round(salt * 2, 3)], (x) => num(x, 3) + ' gam'),
      sol: `n(amine) = ${num(m)}/${a.M} = ${num(n)} mol. RNH₂ + HCl → RNH₃Cl ⇒ m(muối) = m(amine) + m(HCl) = ${num(m)} + ${num(n)}·36,5 = ${num(salt, 3)} gam.`,
    };
  });
  const AA = [{ n: 'glycine', f: 'H₂NCH₂COOH', M: 75, ab: 'Gly' }, { n: 'alanine', f: 'CH₃CH(NH₂)COOH', M: 89, ab: 'Ala' }, { n: 'valine', f: '(CH₃)₂CHCH(NH₂)COOH', M: 117, ab: 'Val' }];
  add('mc', T.amin, (r) => {
    const a = r.pick(AA), n = r.pick([0.1, 0.2, 0.05]);
    const m = round(n * a.M, 2);
    const naoh = r.bool();
    const ans = naoh ? round(n * (a.M + 22), 2) : round(n * (a.M + 36.5), 3);
    return {
      q: `Cho ${num(m)} gam ${a.n} (${a.f}) tác dụng vừa đủ với dung dịch ${naoh ? 'NaOH' : 'HCl'}. Khối lượng muối thu được là`,
      opts: numOpts(ans, naoh ? [round(n * (a.M + 23), 2), round(n * (a.M + 40), 2), round(n * (a.M + 36.5), 2), round(m + 2.2, 2)] : [round(n * (a.M + 22), 2), round(n * (a.M + 35.5), 2), round(n * (a.M + 73), 2), round(m, 2)], (x) => num(x, 3) + ' gam'),
      sol: naoh ? `H₂N–R–COOH + NaOH → H₂N–R–COONa + H₂O. M(muối) = ${a.M} + 22 = ${a.M + 22} ⇒ m = ${num(n)}·${a.M + 22} = ${num(ans, 2)} gam.` : `H₂N–R–COOH + HCl → ClH₃N–R–COOH. m = ${num(n)}·(${a.M} + 36,5) = ${num(ans, 3)} gam.`,
    };
  });
  add('mc', T.amin, (r) => {
    const k = r.int(2, 4);
    const seq = Array.from({ length: k }, () => r.pick(AA));
    const Mp = seq.reduce((s, a) => s + a.M, 0) - 18 * (k - 1);
    return {
      q: `Phân tử khối của peptide ${seq.map((a) => a.ab).join('–')} là`,
      opts: numOpts(Mp, [Mp + 18, seq.reduce((s, a) => s + a.M, 0), Mp - 18, Mp + 36]),
      sol: `Peptide tạo từ ${k} gốc amino acid, tách ${k - 1} phân tử H₂O: M = ${seq.map((a) => a.M).join(' + ')} − 18·${k - 1} = ${Mp}.`,
    };
  });
  add('mc', T.pol, (r) => {
    const p = r.pick([{ n: 'polyethylene (PE)', m: 28, mono: 'CH₂=CH₂' }, { n: 'poly(vinyl chloride) (PVC)', m: 62.5, mono: 'CH₂=CHCl' }, { n: 'polystyrene (PS)', m: 104, mono: 'C₆H₅CH=CH₂' }, { n: 'polypropylene (PP)', m: 42, mono: 'CH₂=CH–CH₃' }]);
    const n = r.pick([1000, 1200, 1500, 2000, 2500, 3000, 5000]);
    const Mpol = n * p.m;
    return {
      q: `Một loại ${p.n} có phân tử khối trung bình là ${num(Mpol)}. Hệ số polymer hoá (số mắt xích) của polymer này là`,
      opts: numOpts(n, [n * 2, Math.round(n / 2), Math.round(Mpol / 14), n + 500]),
      sol: `Mắt xích có M = ${num(p.m)} (từ monomer ${p.mono}) ⇒ n = ${num(Mpol)}/${num(p.m)} = ${n}.`,
    };
  });
  const EO = [
    { c: 'Mg²⁺/Mg', m: 'Mg', E: -2.37 }, { c: 'Al³⁺/Al', m: 'Al', E: -1.66 }, { c: 'Zn²⁺/Zn', m: 'Zn', E: -0.76 }, { c: 'Fe²⁺/Fe', m: 'Fe', E: -0.44 },
    { c: 'Ni²⁺/Ni', m: 'Ni', E: -0.26 }, { c: 'Pb²⁺/Pb', m: 'Pb', E: -0.13 }, { c: '2H⁺/H₂', m: 'H₂', E: 0 }, { c: 'Cu²⁺/Cu', m: 'Cu', E: 0.34 }, { c: 'Ag⁺/Ag', m: 'Ag', E: 0.8 },
  ];
  LT._EO = EO;
  add('mc', T.dh, (r) => {
    const [a, b] = r.sample(EO.filter((x) => x.m !== 'H₂'), 2).sort((x, y) => x.E - y.E);
    const E = round(b.E - a.E, 2);
    return {
      q: `Cho thế điện cực chuẩn E°(${a.c}) = ${num(a.E, 2)} V và E°(${b.c}) = ${num(b.E, 2)} V. Sức điện động chuẩn của pin điện hoá ${a.m}–${b.m} là`,
      opts: numOpts(E, [round(a.E + b.E, 2), round(a.E - b.E, 2), round(Math.abs(a.E + b.E) + 0.1, 2), round(E / 2, 2)], (x) => num(x, 2) + ' V'),
      sol: `${a.m} có thế điện cực nhỏ hơn nên là anode. E°pin = E°cathode − E°anode = ${num(b.E, 2)} − (${num(a.E, 2)}) = ${num(E, 2)} V.`,
    };
  });
  add('mc', T.dh, (r) => {
    const I = r.pick([2, 2.5, 3, 4, 5, 9.65]), tmin = r.pick([16, 32, 40, 48, 60, 80]);
    const met = r.pick([{ m: 'Cu', A: 64, n: 2, s: 'CuSO₄' }, { m: 'Ag', A: 108, n: 1, s: 'AgNO₃' }]);
    const mass = (met.A * I * tmin * 60) / (met.n * 96500);
    return {
      q: `Điện phân dung dịch ${met.s} dư với điện cực trơ, cường độ dòng điện ${num(I)} A trong ${tmin} phút. Khối lượng ${met.m} thu được ở cathode xấp xỉ bằng (F = 96500 C/mol)`,
      opts: numOpts(round(mass, 2), [round(mass * met.n === mass ? mass * 2 : mass * met.n, 2), round(mass / 60, 2), round(mass / 2, 2) === round(mass, 2) ? round(mass + 1, 2) : round(mass / 2, 2), round(mass * 1.5, 2)], (x) => num(x, 2) + ' gam'),
      sol: `m = AIt/(nF) = ${met.A}·${num(I)}·${tmin * 60}/(${met.n}·96500) ≈ ${num(mass, 2)} gam (t tính bằng giây).`,
    };
  });
  const METALS = [{ m: 'Mg', A: 24, n: 2 }, { m: 'Al', A: 27, n: 3 }, { m: 'Zn', A: 65, n: 2 }, { m: 'Fe', A: 56, n: 2 }];
  add('mc', T.kl, (r) => {
    const x = r.pick(METALS), nm = r.pick([0.05, 0.1, 0.15, 0.2]);
    const m = round(nm * x.A, 2);
    const nH2 = (nm * x.n) / 2;
    const V = round(nH2 * VM, 3);
    return {
      q: `Hoà tan hoàn toàn ${num(m)} gam ${x.m} trong dung dịch HCl dư. Thể tích khí H₂ thu được ở điều kiện chuẩn (đkc, 24,79 L/mol) là`,
      opts: numOpts(V, [round(nm * VM, 3), round(nm * x.n * VM, 3), round(nH2 * 22.4, 3), round(V / 2, 3)], (x2) => num(x2, 3) + ' L'),
      sol: `n(${x.m}) = ${num(nm)} mol. Bảo toàn electron: ${x.n}·n(${x.m}) = 2·n(H₂) ⇒ n(H₂) = ${num(nH2, 3)} mol ⇒ V = ${num(nH2, 3)}·24,79 ≈ ${num(V, 3)} L.`,
    };
  });
  add('mc', T.kl, (r) => {
    const n = r.pick([0.05, 0.1, 0.15, 0.2, 0.25]);
    const dm = round(n * 8, 2);
    return {
      q: `Nhúng một thanh sắt vào dung dịch CuSO₄. Sau một thời gian, có ${num(n * 64, 2)} gam Cu bám vào thanh sắt (giả thiết toàn bộ Cu sinh ra bám vào thanh). Khối lượng thanh sắt`,
      opts: opts(`tăng ${num(dm, 2)} gam`, [`giảm ${num(dm, 2)} gam`, `tăng ${num(n * 64, 2)} gam`, `giảm ${num(n * 56, 2)} gam`, `tăng ${num(n * 120, 2)} gam`]),
      sol: `Fe + CuSO₄ → FeSO₄ + Cu. n(Cu) = ${num(n)} mol ⇒ Δm = ${num(n)}·(64 − 56) = ${num(dm, 2)} gam (tăng).`,
    };
  });
  add('mc', T.kiem, (r) => {
    const nOH = r.pick([0.1, 0.15, 0.2]);
    const nCO2 = round(nOH * r.pick([0.5, 0.8, 1, 1.2, 1.5]), 3);
    const ppt = nCO2 <= nOH ? nCO2 : 2 * nOH - nCO2;
    const m = round(ppt * 100, 2);
    return {
      q: `Hấp thụ hoàn toàn ${numF(round(nCO2 * VM, 4), 4)} L khí CO₂ (đkc) vào dung dịch chứa ${num(nOH)} mol Ca(OH)₂. Khối lượng kết tủa thu được là`,
      opts: numOpts(m, [round(nCO2 * 100, 2), round(nOH * 100, 2), round((nCO2 - nOH) * 100, 2) > 0 ? round((nCO2 - nOH) * 100, 2) : round(m + 5, 2), round(m / 2, 2), round(m * 1.5, 2)], (x) => num(x, 2) + ' gam'),
      sol: `n(CO₂) = ${num(nCO2, 3)} mol. ${nCO2 <= nOH ? 'n(CO₂) ≤ n(Ca(OH)₂) ⇒ chỉ tạo CaCO₃: n↓ = n(CO₂)' : 'n(Ca(OH)₂) < n(CO₂) < 2n(Ca(OH)₂) ⇒ tạo hai muối: n↓ = 2n(Ca(OH)₂) − n(CO₂)'} = ${num(ppt, 3)} mol ⇒ m(CaCO₃) = ${num(m, 2)} gam.`,
    };
  });
  add('mc', T.can, (r) => {
    const acid = r.bool();
    const k = r.int(1, 4);
    const two = acid && r.bool();
    const pH = acid ? k : 14 - k;
    return {
      q: `Dung dịch ${acid ? (two ? 'H₂SO₄' : 'HCl') : 'NaOH'} có nồng độ ${two ? '5.10<sup>' + MINUS + (k + 1) + '</sup>' : '10<sup>' + MINUS + k + '</sup>'} M (coi ${two ? 'H₂SO₄ phân li hoàn toàn cả hai nấc' : 'chất điện li mạnh phân li hoàn toàn'}). pH của dung dịch là`,
      opts: numOpts(pH, [14 - pH, pH + 1, pH - 1 >= 0 ? pH - 1 : pH + 2, k * 2 === pH ? pH + 3 : k * 2]),
      sol: acid ? `[H⁺] = ${two ? '2·5.10<sup>−' + (k + 1) + '</sup> = ' : ''}10<sup>−${k}</sup> M ⇒ pH = ${k}.` : `[OH⁻] = 10<sup>−${k}</sup> M ⇒ pOH = ${k} ⇒ pH = 14 − ${k} = ${pH}.`,
    };
  });
  add('mc', T.can, (r) => {
    const h = r.pick([0.1, 0.2, 0.4]), i = r.pick([0.1, 0.2, 0.3]), hi = r.pick([0.6, 0.8, 1, 1.2]);
    const K = round((hi * hi) / (h * i), 2);
    return {
      q: `Xét cân bằng H₂(g) + I₂(g) ⇌ 2HI(g). Ở trạng thái cân bằng: [H₂] = ${num(h)} M, [I₂] = ${num(i)} M, [HI] = ${num(hi)} M. Hằng số cân bằng K<sub>C</sub> bằng`,
      opts: numOpts(K, [round(hi / (h * i), 2), round((2 * hi) / (h * i), 2), round((h * i) / (hi * hi), 2), round(K / 2, 2)], (x) => num(x, 2)),
      sol: `K<sub>C</sub> = [HI]²/([H₂][I₂]) = ${num(hi)}²/(${num(h)}·${num(i)}) = ${num(K, 2)}.`,
    };
  });
  const RXH = [
    { e: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)', l: [[1, -74.9], [2, 0]], rr: [[1, -393.5], [2, -285.8]], data: 'ΔfH°(CH₄) = −74,9; ΔfH°(CO₂) = −393,5; ΔfH°(H₂O, l) = −285,8 kJ/mol' },
    { e: 'C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l)', l: [[1, -277.6], [3, 0]], rr: [[2, -393.5], [3, -285.8]], data: 'ΔfH°(C₂H₅OH, l) = −277,6; ΔfH°(CO₂) = −393,5; ΔfH°(H₂O, l) = −285,8 kJ/mol' },
    { e: 'CaCO₃(s) → CaO(s) + CO₂(g)', l: [[1, -1206.9]], rr: [[1, -635.1], [1, -393.5]], data: 'ΔfH°(CaCO₃) = −1206,9; ΔfH°(CaO) = −635,1; ΔfH°(CO₂) = −393,5 kJ/mol' },
    { e: 'C₂H₄(g) + H₂(g) → C₂H₆(g)', l: [[1, 52.5], [1, 0]], rr: [[1, -84.0]], data: 'ΔfH°(C₂H₄) = +52,5; ΔfH°(C₂H₆) = −84,0 kJ/mol' },
    { e: '2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s)', l: [[2, 0], [1, -824.2]], rr: [[1, -1675.7], [2, 0]], data: 'ΔfH°(Fe₂O₃) = −824,2; ΔfH°(Al₂O₃) = −1675,7 kJ/mol' },
  ];
  add('mc', T.nhiet, (r) => {
    const x = r.pick(RXH);
    const sum = (a) => a.reduce((s, [k, v]) => s + k * v, 0);
    const dH = round(sum(x.rr) - sum(x.l), 1);
    return {
      q: `Cho phản ứng: ${x.e}. Biết ${x.data}. Biến thiên enthalpy chuẩn ΔrH°₂₉₈ của phản ứng là`,
      opts: numOpts(dH, [-dH, round(sum(x.rr) + sum(x.l), 1), round(x.rr.reduce((s, [, v]) => s + v, 0) - x.l.reduce((s, [, v]) => s + v, 0), 1), round(dH / 2, 1)], (v) => num(v, 1) + ' kJ'),
      sol: `ΔrH° = ΣΔfH°(sp) − ΣΔfH°(cđ) = ${num(sum(x.rr), 1)} − (${num(sum(x.l), 1)}) = ${num(dH, 1)} kJ. Phản ứng ${dH < 0 ? 'toả' : 'thu'} nhiệt.`,
    };
  });
  add('mc', T.nhiet, (r) => {
    const c1 = r.pick([0.5, 0.8, 1, 1.2]), c2 = round(c1 - r.pick([0.1, 0.2, 0.3, 0.4]), 2), dt = r.pick([10, 20, 25, 40, 50]);
    const v = (c1 - c2) / dt;
    return {
      q: `Cho phản ứng A → sản phẩm. Nồng độ ban đầu của A là ${num(c1)} M, sau ${dt} giây còn ${num(c2)} M. Tốc độ trung bình của phản ứng trong khoảng thời gian trên là`,
      opts: opts(sci(v, 3) + ' M/s', [sci(c2 / dt, 3) + ' M/s', sci((c1 + c2) / dt, 3) + ' M/s', sci(v * 60, 3) + ' M/s', sci(v / 2, 3) + ' M/s']),
      sol: `v = −ΔC/Δt = (${num(c1)} − ${num(c2)})/${dt} = ${sci(v, 3)} M/s.`,
    };
  });
  add('mc', T.hc, (r) => {
    const n = r.int(1, 5), a = r.pick([0.05, 0.1, 0.2]);
    const nco2 = round(a * n, 3), nh2o = round(a * (n + 1), 3);
    const f = (k) => 'C' + (k > 1 ? sub(k) : '') + 'H' + sub(2 * k + 2);
    return {
      q: `Đốt cháy hoàn toàn một alkane X thu được ${num(nco2)} mol CO₂ và ${num(nh2o)} mol H₂O. Công thức phân tử của X là`,
      opts: opts(f(n), [n > 1 ? f(n - 1) : f(n + 2), f(n + 1), 'C' + (n > 1 ? sub(n) : '') + 'H' + sub(2 * n), f(n + 3)]),
      sol: `n(X) = n(H₂O) − n(CO₂) = ${num(round(nh2o - nco2, 3))} mol ⇒ số C = ${num(nco2)}/${num(a)} = ${n} ⇒ X là ${f(n)}.`,
    };
  });
  add('mc', T.kl, (r) => {
    const sol = r.pick([{ c: 10, m: 200 }, { c: 5, m: 300 }, { c: 20, m: 150 }, { c: 15, m: 400 }]);
    const subst = r.pick(['NaCl', 'NaOH', 'CuSO₄', 'glucose']);
    const mct = (sol.c * sol.m) / 100;
    return {
      q: `Khối lượng ${subst} có trong ${sol.m} gam dung dịch ${subst} ${sol.c}% là`,
      opts: numOpts(mct, [sol.m / sol.c, sol.c * sol.m, mct * 2, sol.m - mct], (x) => num(x, 2) + ' gam'),
      sol: `m(ct) = C%·m(dd)/100 = ${sol.c}·${sol.m}/100 = ${num(mct)} gam.`,
    };
  });
  const ELEM = [
    { s: 'Na', Z: 11, cfg: '[Ne]3s¹', p: 3, g: 'IA' }, { s: 'Mg', Z: 12, cfg: '[Ne]3s²', p: 3, g: 'IIA' }, { s: 'Al', Z: 13, cfg: '[Ne]3s²3p¹', p: 3, g: 'IIIA' },
    { s: 'Si', Z: 14, cfg: '[Ne]3s²3p²', p: 3, g: 'IVA' }, { s: 'P', Z: 15, cfg: '[Ne]3s²3p³', p: 3, g: 'VA' }, { s: 'S', Z: 16, cfg: '[Ne]3s²3p⁴', p: 3, g: 'VIA' },
    { s: 'Cl', Z: 17, cfg: '[Ne]3s²3p⁵', p: 3, g: 'VIIA' }, { s: 'K', Z: 19, cfg: '[Ar]4s¹', p: 4, g: 'IA' }, { s: 'Ca', Z: 20, cfg: '[Ar]4s²', p: 4, g: 'IIA' },
    { s: 'Cr', Z: 24, cfg: '[Ar]3d⁵4s¹', p: 4, g: 'VIB' }, { s: 'Fe', Z: 26, cfg: '[Ar]3d⁶4s²', p: 4, g: 'VIIIB' }, { s: 'Cu', Z: 29, cfg: '[Ar]3d¹⁰4s¹', p: 4, g: 'IB' },
    { s: 'Zn', Z: 30, cfg: '[Ar]3d¹⁰4s²', p: 4, g: 'IIB' }, { s: 'N', Z: 7, cfg: '[He]2s²2p³', p: 2, g: 'VA' }, { s: 'O', Z: 8, cfg: '[He]2s²2p⁴', p: 2, g: 'VIA' },
    { s: 'Mn', Z: 25, cfg: '[Ar]3d⁵4s²', p: 4, g: 'VIIB' },
  ];
  add('mc', T.nt, (r) => {
    const e = r.pick(ELEM);
    const pos = (p, g) => `chu kì ${p}, nhóm ${g}`;
    const others = ELEM.filter((x) => x.g !== e.g || x.p !== e.p);
    const askCfg = r.bool();
    if (askCfg) {
      return {
        q: `Cấu hình electron của nguyên tử ${e.s} (Z = ${e.Z}) là`,
        opts: opts(e.cfg, r.shuffle(others.map((x) => x.cfg))),
        sol: `${e.s} có ${e.Z} electron: ${e.cfg}.`,
      };
    }
    return {
      q: `Nguyên tố ${e.s} có Z = ${e.Z}. Vị trí của ${e.s} trong bảng tuần hoàn là`,
      opts: opts(pos(e.p, e.g), [pos(e.p + 1, e.g), pos(e.p, r.pick(['IA', 'IIA', 'VIIIB', 'IIIA', 'VIA'].filter((g) => g !== e.g))), pos(e.p - 1, e.g), pos(e.p, e.g.replace('A', 'B'))]),
      sol: `Cấu hình ${e.cfg} ⇒ ${e.p} lớp electron (chu kì ${e.p}); ${e.g.endsWith('A') ? 'nguyên tố s/p, số electron lớp ngoài cùng quyết định nhóm A' : 'nguyên tố d, xét tổng electron (n−1)d + ns'} ⇒ nhóm ${e.g}.`,
    };
  });

  /* =============== Câu lí thuyết =============== */
  const K = LT.KNOW[S];
  LT.addConcepts(S, [
    { t: T.est, q: 'Ester nào sau đây có mùi chuối chín?', a: 'Isoamyl acetate', d: ['Ethyl formate', 'Benzyl acetate', 'Methyl salicylate'], kn: 'Isoamyl acetate CH₃COOCH₂CH₂CH(CH₃)₂ có mùi chuối chín; benzyl acetate mùi hoa nhài; ethyl butyrate mùi dứa.' },
    { t: T.est, q: 'Phản ứng thuỷ phân ester trong môi trường kiềm được gọi là phản ứng', a: 'xà phòng hoá', d: ['ester hoá', 'trùng hợp', 'hydrogen hoá'], kn: K[T.est] },
    { t: T.est, q: 'Chất béo lỏng (dầu thực vật) chứa chủ yếu gốc acid béo', a: 'không no', d: ['no', 'thơm', 'hai chức'], kn: 'Chất béo lỏng chứa chủ yếu gốc acid béo không no (oleic, linoleic); hydrogen hoá chất béo lỏng tạo chất béo rắn.' },
    { t: T.est, q: 'Tên gọi của ester CH₃COOCH₃ là', a: 'methyl acetate', d: ['ethyl formate', 'methyl formate', 'ethyl acetate'], kn: 'Tên ester RCOOR\' = tên gốc R\' + tên anion gốc acid (…ate).' },
    { t: T.carb, q: 'Chất nào sau đây thuộc loại monosaccharide?', a: 'Glucose', d: ['Saccharose', 'Tinh bột', 'Cellulose'], kn: K[T.carb] },
    { t: T.carb, q: 'Chất nào sau đây KHÔNG tham gia phản ứng tráng bạc?', a: 'Saccharose', d: ['Glucose', 'Fructose', 'Acetaldehyde'], kn: 'Saccharose không có nhóm –CHO tự do (không mở vòng) nên không tráng bạc.' },
    { t: T.carb, q: 'Dung dịch iodine tạo với hồ tinh bột hợp chất có màu', a: 'xanh tím', d: ['đỏ gạch', 'vàng', 'trắng'], kn: 'Iodine tạo với amylose trong tinh bột hợp chất màu xanh tím – dùng nhận biết tinh bột.' },
    { t: T.carb, q: 'Thuỷ phân hoàn toàn cellulose trong môi trường acid thu được', a: 'glucose', d: ['fructose', 'saccharose', 'maltose và fructose'], kn: K[T.carb] },
    { t: T.amin, q: 'Dung dịch chất nào sau đây làm quỳ tím hoá xanh?', a: 'Methylamine', d: ['Aniline', 'Glycine', 'Acetic acid'], kn: K[T.amin] },
    { t: T.amin, q: 'Hợp chất H₂N–CH₂–COOH có tên gọi là', a: 'glycine', d: ['alanine', 'valine', 'lysine'], kn: K[T.amin] },
    { t: T.amin, q: 'Protein bị đông tụ khi', a: 'đun nóng hoặc gặp acid, base, muối kim loại nặng', d: ['hoà tan vào nước lạnh', 'để ở nhiệt độ thường', 'tác dụng với nước cất'], kn: 'Protein bị đông tụ (biến tính) khi đun nóng hoặc gặp acid, base, một số muối (đông tụ lòng trắng trứng, nấu canh cua...).' },
    { t: T.amin, q: 'Peptide nào sau đây KHÔNG có phản ứng màu biuret?', a: 'Gly–Ala', d: ['Gly–Ala–Val', 'Ala–Gly–Gly', 'Gly–Ala–Val–Gly'], kn: 'Dipeptide chỉ có 1 liên kết peptide nên không có phản ứng màu biuret.' },
    { t: T.pol, q: 'Polymer nào sau đây được điều chế bằng phản ứng trùng ngưng?', a: 'Nylon-6,6', d: ['Polyethylene', 'Poly(vinyl chloride)', 'Polystyrene'], kn: K[T.pol] },
    { t: T.pol, q: 'Tơ nào sau đây thuộc loại tơ thiên nhiên?', a: 'Tơ tằm', d: ['Tơ nylon-6,6', 'Tơ visco', 'Tơ nitron'], kn: 'Tơ thiên nhiên: bông, len, tơ tằm. Tơ bán tổng hợp (nhân tạo): visco, cellulose acetate. Tơ tổng hợp: nylon, nitron, lapsan.' },
    { t: T.pol, q: 'Cao su buna được điều chế bằng phản ứng trùng hợp', a: 'buta-1,3-diene', d: ['isoprene', 'ethylene', 'vinyl chloride'], kn: 'Cao su buna: trùng hợp buta-1,3-diene CH₂=CH–CH=CH₂ (xúc tác Na).' },
    { t: T.dh, q: 'Trong pin điện hoá Zn–Cu, ở anode xảy ra quá trình', a: 'oxi hoá Zn thành Zn²⁺', d: ['khử Cu²⁺ thành Cu', 'khử Zn²⁺ thành Zn', 'oxi hoá Cu thành Cu²⁺'], kn: K[T.dh] },
    { t: T.dh, q: 'Kim loại kiềm được điều chế trong công nghiệp bằng phương pháp', a: 'điện phân nóng chảy muối halide', d: ['điện phân dung dịch muối', 'thuỷ luyện', 'nhiệt luyện bằng CO'], kn: K[T.kiem] },
    { t: T.dh, q: 'Khi điện phân dung dịch CuSO₄ với điện cực trơ, ở anode thu được', a: 'khí O₂', d: ['kim loại Cu', 'khí H₂', 'khí SO₂'], kn: 'Anode trơ: nước bị oxi hoá (SO₄²⁻ không điện phân): 2H₂O → O₂ + 4H⁺ + 4e. Cathode: Cu²⁺ + 2e → Cu.' },
    { t: T.kl, q: 'Kim loại dẫn điện tốt nhất là', a: 'Ag', d: ['Cu', 'Au', 'Al'], kn: 'Tính dẫn điện: Ag > Cu > Au > Al > Fe. Kim loại có nhiệt độ nóng chảy cao nhất: W; thấp nhất: Hg; mềm nhất: Cs; nhẹ nhất: Li.' },
    { t: T.kl, q: 'Kim loại có nhiệt độ nóng chảy cao nhất là', a: 'W', d: ['Fe', 'Cr', 'Hg'], kn: 'W (tungsten) nóng chảy ở ≈ 3410 °C, dùng làm dây tóc bóng đèn.' },
    { t: T.kl, q: 'Để bảo vệ vỏ tàu biển bằng thép, người ta gắn vào vỏ tàu (phần ngâm dưới nước) các khối kim loại', a: 'Zn', d: ['Cu', 'Pb', 'Sn'], kn: 'Phương pháp điện hoá: Zn có tính khử mạnh hơn Fe, đóng vai trò anode hi sinh, bị ăn mòn thay cho thép.' },
    { t: T.kl, q: 'Kim loại nào sau đây bị thụ động hoá trong dung dịch HNO₃ đặc, nguội?', a: 'Al', d: ['Cu', 'Zn', 'Mg'], kn: 'Al, Fe, Cr bị thụ động trong HNO₃ đặc nguội và H₂SO₄ đặc nguội.' },
    { t: T.kl, q: 'Ăn mòn điện hoá xảy ra khi nhúng thanh Fe vào dung dịch nào sau đây?', a: 'CuSO₄', d: ['HCl', 'ZnCl₂', 'MgCl₂'], kn: K[T.kl] },
    { t: T.kiem, q: 'Nước cứng tạm thời chứa các muối', a: 'Ca(HCO₃)₂, Mg(HCO₃)₂', d: ['CaCl₂, MgSO₄', 'NaCl, KCl', 'Na₂CO₃, K₂CO₃'], kn: K[T.kiem] },
    { t: T.kiem, q: 'Chất nào sau đây có thể làm mềm cả nước cứng tạm thời và nước cứng vĩnh cửu?', a: 'Na₂CO₃', d: ['HCl', 'NaCl', 'Ca(OH)₂ dư'], kn: K[T.kiem] },
    { t: T.kiem, q: 'Thạch cao nung (dùng để bó bột, đúc tượng) có công thức là', a: 'CaSO₄.H₂O', d: ['CaSO₄.2H₂O', 'CaSO₄', 'CaCO₃'], kn: 'Thạch cao sống CaSO₄.2H₂O; thạch cao nung CaSO₄.H₂O (hoặc CaSO₄.0,5H₂O); thạch cao khan CaSO₄.' },
    { t: T.kiem, q: 'Kim loại nào sau đây tác dụng mạnh với nước ở nhiệt độ thường?', a: 'K', d: ['Be', 'Fe', 'Cu'], kn: 'Kim loại kiềm và Ca, Sr, Ba tác dụng với nước ở nhiệt độ thường tạo dung dịch base và H₂.' },
    { t: T.ccd, q: 'Phức chất [Cu(NH₃)₄]²⁺ trong dung dịch có màu', a: 'xanh lam đậm', d: ['vàng', 'đỏ máu', 'không màu'], kn: K[T.ccd] },
    { t: T.ccd, q: 'Trong phức chất [Fe(H₂O)₆]³⁺, số phối trí của nguyên tử trung tâm là', a: '6', d: ['3', '4', '2'], kn: K[T.ccd] },
    { t: T.ccd, q: 'Phức chất bát diện có số phối trí là', a: '6', d: ['4', '2', '3'], kn: K[T.ccd] },
    { t: T.ccd, q: 'Trong phức chất, liên kết giữa phối tử và nguyên tử trung tâm là', a: 'liên kết cho – nhận', d: ['liên kết ion', 'liên kết hydrogen', 'liên kết kim loại'], kn: K[T.ccd] },
    { t: T.ccd, q: 'Nhỏ dung dịch NH₃ dư vào dung dịch CuSO₄, hiện tượng quan sát được là', a: 'có kết tủa xanh, sau đó kết tủa tan tạo dung dịch xanh lam đậm', d: ['có kết tủa trắng không tan', 'có khí bay ra', 'dung dịch mất màu'], kn: 'Cu²⁺ + 2NH₃ + 2H₂O → Cu(OH)₂↓ (xanh); Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄](OH)₂ (xanh lam đậm).' },
    { t: T.can, q: 'Đối với một hệ ở trạng thái cân bằng, chất xúc tác', a: 'không làm chuyển dịch cân bằng', d: ['làm cân bằng chuyển dịch theo chiều thuận', 'làm cân bằng chuyển dịch theo chiều nghịch', 'làm thay đổi hằng số cân bằng'], kn: K[T.can] },
    { t: T.can, q: 'Cho cân bằng N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔrH < 0. Cân bằng chuyển dịch theo chiều thuận khi', a: 'tăng áp suất của hệ', d: ['tăng nhiệt độ', 'giảm áp suất của hệ', 'thêm chất xúc tác'], kn: K[T.can] },
    { t: T.can, q: 'Dung dịch có pH = 3 có môi trường', a: 'acid', d: ['base', 'trung tính', 'lưỡng tính'], kn: K[T.can] },
    { t: T.nhiet, q: 'Phản ứng có ΔrH°₂₉₈ < 0 là phản ứng', a: 'toả nhiệt', d: ['thu nhiệt', 'không kèm năng lượng', 'luôn xảy ra chậm'], kn: K[T.nhiet] },
    { t: T.nhiet, q: 'Yếu tố nào sau đây KHÔNG làm tăng tốc độ phản ứng giữa đá vôi và dung dịch HCl?', a: 'Dùng đá vôi dạng cục to thay cho dạng bột', d: ['Tăng nồng độ HCl', 'Đun nóng hỗn hợp', 'Nghiền nhỏ đá vôi'], kn: K[T.nhiet] },
    { t: T.hc, q: 'Chất nào sau đây làm mất màu nước bromine ở điều kiện thường?', a: 'Ethylene', d: ['Methane', 'Ethane', 'Benzene'], kn: K[T.hc] },
    { t: T.hc, q: 'Công thức chung của dãy đồng đẳng alkene là', a: 'CₙH₂ₙ (n ≥ 2)', d: ['CₙH₂ₙ₊₂ (n ≥ 1)', 'CₙH₂ₙ₋₂ (n ≥ 2)', 'CₙH₂ₙ₋₆ (n ≥ 6)'], kn: K[T.hc] },
    { t: T.nt, q: 'Trong một chu kì, theo chiều tăng của điện tích hạt nhân, tính kim loại của các nguyên tố', a: 'giảm dần', d: ['tăng dần', 'không đổi', 'tăng rồi giảm'], kn: 'Trong chu kì: bán kính giảm, độ âm điện tăng, tính kim loại giảm, tính phi kim tăng. Trong nhóm A (từ trên xuống): tính kim loại tăng.' },
  ]);

  /* =============== PHẦN II: ĐÚNG/SAI =============== */
  function tfPool(r, stem, pool) {
    const chosen = r.sample(pool, 4);
    return { q: stem, items: chosen.map((p) => ({ s: p[0], v: p[1], sol: p[2] })) };
  }
  add('tf', T.est, (r) =>
    tfPool(r, 'Tiến hành thí nghiệm xà phòng hoá chất béo: Cho khoảng 2 mL dầu dừa và 4 mL dung dịch NaOH 40% vào bát sứ, đun sôi nhẹ và khuấy liên tục, thỉnh thoảng thêm vài giọt nước cất. Sau khoảng 10 phút, thêm 4–5 mL dung dịch NaCl bão hoà nóng, khuấy nhẹ rồi để nguội.', [
      ['Sau bước thêm NaCl bão hoà, có lớp chất rắn màu trắng nổi lên trên.', true, 'Muối của acid béo (xà phòng) ít tan trong dung dịch NaCl bão hoà và nhẹ hơn nên nổi lên trên.'],
      ['Mục đích thêm NaCl bão hoà là để làm tăng tốc độ phản ứng xà phòng hoá.', false, 'NaCl bão hoà làm giảm độ tan của xà phòng giúp tách xà phòng ra (sự “muối kết”), không phải để tăng tốc độ phản ứng.'],
      ['Việc thêm nước cất trong quá trình đun nhằm giữ cho thể tích hỗn hợp gần như không đổi.', true, 'Nước bay hơi khi đun, thêm nước để phản ứng không bị khô, cháy.'],
      ['Phản ứng xà phòng hoá là phản ứng thuận nghịch.', false, 'Thuỷ phân ester trong môi trường kiềm là phản ứng một chiều.'],
      ['Phần dung dịch còn lại sau khi tách xà phòng có chứa glycerol.', true, 'Chất béo + 3NaOH → 3RCOONa + C₃H₅(OH)₃; glycerol tan trong dung dịch.'],
      ['Có thể thay dầu dừa bằng dầu nhớt bôi trơn động cơ (hydrocarbon) để làm xà phòng.', false, 'Dầu nhớt là hỗn hợp hydrocarbon, không phải ester nên không bị xà phòng hoá.'],
      ['Ở bước đun nóng, nếu không khuấy và không thêm nước, chất béo có thể bị phân huỷ (cháy khét).', true, 'Khi cạn nước nhiệt độ tăng cao, chất béo bị phân huỷ.'],
    ]));
  add('tf', T.dh, (r) => {
    const pairs = r.pick([[EO[2], EO[7]], [EO[3], EO[7]], [EO[2], EO[8]], [EO[1], EO[7]], [EO[4], EO[8]]]);
    const [a, b] = pairs;
    const E = round(b.E - a.E, 2);
    return {
      q: `Một pin điện hoá được tạo bởi điện cực ${a.m} nhúng trong dung dịch muối ${a.c.split('/')[0]} 1 M và điện cực ${b.m} nhúng trong dung dịch muối ${b.c.split('/')[0]} 1 M, nối với nhau bằng cầu muối. Cho E°(${a.c}) = ${num(a.E, 2)} V; E°(${b.c}) = ${num(b.E, 2)} V.`,
      items: [
        claim(r, (v) => `Điện cực ${v} đóng vai trò anode (cực âm).`, a.m, b.m, `${a.m} có thế điện cực chuẩn nhỏ hơn nên bị oxi hoá, là anode.`),
        claim(r, (v) => `Sức điện động chuẩn của pin là ${v} V.`, num(E, 2), num(round(Math.abs(a.E + b.E), 2) === E ? E + 0.2 : Math.abs(a.E + b.E), 2), `E°pin = ${num(b.E, 2)} − (${num(a.E, 2)}) = ${num(E, 2)} V.`),
        claim(r, (v) => `Trong quá trình pin hoạt động, khối lượng điện cực ${b.m} ${v}.`, 'tăng', 'giảm', `Ở cathode, ion ${b.c.split('/')[0]} bị khử thành ${b.m} bám vào điện cực ⇒ khối lượng tăng.`),
        claim(r, (v) => `Dòng electron ở mạch ngoài đi từ điện cực ${v}.`, a.m + ' sang điện cực ' + b.m, b.m + ' sang điện cực ' + a.m, `Electron đi từ anode (${a.m}) sang cathode (${b.m}) qua dây dẫn.`),
      ],
    };
  });
  add('tf', T.carb, (r) =>
    tfPool(r, 'Cho các phát biểu về carbohydrate:', [
      ['Glucose và fructose là đồng phân của nhau.', true, 'Cùng công thức phân tử C₆H₁₂O₆, khác cấu tạo.'],
      ['Saccharose có phản ứng tráng bạc.', false, 'Saccharose không có nhóm –CHO tự do nên không tráng bạc.'],
      ['Tinh bột và cellulose đều thuỷ phân hoàn toàn tạo glucose.', true, 'Đều là polysaccharide tạo từ các gốc glucose.'],
      ['Glucose hoà tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch màu xanh lam.', true, 'Glucose có nhiều nhóm –OH kề nhau (tính chất polyalcohol).'],
      ['Tinh bột và cellulose là đồng phân của nhau.', false, 'Hệ số n khác nhau và cấu trúc khác nhau nên không phải đồng phân.'],
      ['Fructose không làm mất màu nước bromine.', true, 'Fructose không có nhóm –CHO; nước bromine dùng để phân biệt glucose và fructose.'],
      ['Cellulose được dùng để sản xuất tơ visco và giấy.', true, 'Ứng dụng quan trọng của cellulose.'],
      ['Trong máu người, nồng độ glucose gần như không đổi khoảng 0,1%.', true, 'Nồng độ glucose trong máu người khoảng 0,1%.'],
    ]));
  add('tf', T.amin, (r) => {
    const a = r.pick(AA), b = r.pick(AA.filter((x) => x !== a));
    const Md = a.M + b.M - 18;
    return {
      q: `Dipeptide X được tạo từ một gốc ${a.n} và một gốc ${b.n}, trong đó ${a.n} là amino acid đầu N.`,
      items: [
        claim(r, (v) => `X có kí hiệu là ${v}.`, a.ab + '–' + b.ab, b.ab + '–' + a.ab, `Đầu N viết bên trái: ${a.ab}–${b.ab}.`),
        claim(r, (v) => `Phân tử khối của X là ${v}.`, String(Md), String(Md + 18), `M = ${a.M} + ${b.M} − 18 = ${Md}.`),
        claim(r, (v) => `X ${v} phản ứng màu biuret.`, 'không có', 'có', `Dipeptide chỉ có một liên kết peptide nên không có phản ứng màu biuret.`),
        claim(r, (v) => `Thuỷ phân hoàn toàn 1 mol X trong dung dịch NaOH dư cần ${v} mol NaOH.`, '2', '1', `X + 2NaOH → muối của ${a.ab} + muối của ${b.ab} + H₂O.`),
      ],
    };
  });
  add('tf', T.can, (r) =>
    tfPool(r, 'Xét cân bằng trong bình kín: 2NO₂(g, nâu đỏ) ⇌ N₂O₄(g, không màu), ΔrH°₂₉₈ = −58 kJ.', [
      ['Phản ứng thuận là phản ứng toả nhiệt.', true, 'ΔrH < 0 ⇒ chiều thuận toả nhiệt.'],
      ['Ngâm bình vào nước đá, màu nâu đỏ trong bình nhạt dần.', true, 'Giảm nhiệt độ, cân bằng chuyển dịch theo chiều toả nhiệt (thuận) ⇒ NO₂ giảm, màu nhạt.'],
      ['Tăng áp suất chung của hệ, cân bằng chuyển dịch theo chiều nghịch.', false, 'Tăng áp suất, cân bằng chuyển theo chiều giảm số mol khí (2 → 1) tức chiều thuận.'],
      ['Biểu thức hằng số cân bằng là K<sub>C</sub> = [N₂O₄]/[NO₂]².', true, 'Đúng theo định luật tác dụng khối lượng.'],
      ['Thêm chất xúc tác làm tăng lượng N₂O₄ ở trạng thái cân bằng.', false, 'Xúc tác không làm chuyển dịch cân bằng.'],
      ['Đun nóng bình, hằng số cân bằng K<sub>C</sub> tăng.', false, 'Phản ứng thuận toả nhiệt nên khi tăng nhiệt độ K<sub>C</sub> giảm.'],
    ]));
  add('tf', T.kiem, (r) =>
    tfPool(r, 'Một mẫu nước giếng chứa các ion: Ca²⁺, Mg²⁺, HCO₃⁻, Cl⁻, SO₄²⁻.', [
      ['Mẫu nước trên là nước cứng toàn phần.', true, 'Chứa Ca²⁺, Mg²⁺ cùng HCO₃⁻ (tính cứng tạm thời) và Cl⁻, SO₄²⁻ (tính cứng vĩnh cửu).'],
      ['Đun sôi mẫu nước có thể loại bỏ hoàn toàn tính cứng.', false, 'Đun sôi chỉ loại được tính cứng tạm thời; Cl⁻, SO₄²⁻ vẫn giữ Ca²⁺, Mg²⁺.'],
      ['Dùng Na₂CO₃ có thể làm mềm mẫu nước trên.', true, 'CO₃²⁻ kết tủa Ca²⁺, Mg²⁺ dưới dạng CaCO₃, MgCO₃.'],
      ['Dùng nước cứng để giặt bằng xà phòng sẽ làm xà phòng ít bọt, tốn xà phòng.', true, 'Ca²⁺, Mg²⁺ tạo kết tủa với gốc acid béo.'],
      ['Có thể dùng dung dịch HCl để làm mềm nước cứng.', false, 'HCl không loại bỏ được Ca²⁺, Mg²⁺.'],
      ['Phương pháp trao đổi ion có thể làm mềm được cả nước cứng tạm thời và vĩnh cửu.', true, 'Nhựa trao đổi ion thay Ca²⁺, Mg²⁺ bằng Na⁺ hoặc H⁺.'],
    ]));
  add('tf', T.kl, (r) =>
    tfPool(r, 'Cho các phát biểu về ăn mòn và bảo vệ kim loại:', [
      ['Gang, thép để trong không khí ẩm bị ăn mòn điện hoá.', true, 'Fe và C là hai điện cực, lớp nước có hoà tan CO₂, O₂… là dung dịch điện li.'],
      ['Trong ăn mòn điện hoá, kim loại có tính khử mạnh hơn bị ăn mòn.', true, 'Kim loại mạnh hơn là anode, bị oxi hoá.'],
      ['Tôn (sắt tráng kẽm) bị xây xát sâu đến lớp sắt thì sắt bị ăn mòn trước.', false, 'Zn mạnh hơn Fe nên Zn bị ăn mòn trước, bảo vệ sắt.'],
      ['Sắt tây (sắt tráng thiếc) bị xây xát sâu đến lớp sắt thì sắt bị ăn mòn nhanh.', true, 'Fe mạnh hơn Sn nên Fe là anode, bị ăn mòn.'],
      ['Ăn mòn hoá học có phát sinh dòng điện.', false, 'Ăn mòn hoá học không phát sinh dòng điện; ăn mòn điện hoá mới phát sinh dòng điện.'],
      ['Sơn, mạ, bôi dầu mỡ lên bề mặt kim loại là phương pháp bảo vệ bề mặt.', true, 'Ngăn kim loại tiếp xúc với môi trường.'],
    ]));
  add('tf', T.ccd, (r) =>
    tfPool(r, 'Cho các phát biểu về phức chất:', [
      ['Trong phức chất [Ag(NH₃)₂]⁺, nguyên tử trung tâm là Ag⁺ và số phối trí là 2.', true, 'Hai phối tử NH₃ liên kết với Ag⁺ ⇒ số phối trí 2, dạng hình học đường thẳng.'],
      ['Phức chất [Cu(H₂O)₆]²⁺ có dạng hình học bát diện.', true, 'Số phối trí 6 ứng với dạng bát diện.'],
      ['Phối tử là phân tử hoặc ion có cặp electron hoá trị riêng.', true, 'Phối tử cho cặp electron chưa liên kết vào orbital trống của nguyên tử trung tâm.'],
      ['Liên kết giữa nguyên tử trung tâm và phối tử là liên kết ion.', false, 'Đó là liên kết cho – nhận (phối trí).'],
      ['Phức chất [PtCl₄]²⁻ có dạng hình học vuông phẳng.', true, 'Pt(II) với số phối trí 4 có dạng vuông phẳng.'],
      ['Dung dịch Fe³⁺ tác dụng với ion SCN⁻ tạo phức chất màu xanh lam.', false, 'Phức [Fe(SCN)]²⁺ có màu đỏ máu.'],
    ]));

  /* =============== PHẦN III: TRẢ LỜI NGẮN =============== */
  add('sa', T.carb, (r) => {
    const m = r.pick([9, 18, 27, 36, 45]), H = r.pick([60, 75, 80, 90, 100]);
    const ag = (m / 180) * 2 * 108 * (H / 100);
    return {
      q: `Cho ${m} gam glucose tham gia phản ứng tráng bạc với hiệu suất ${H}%. Khối lượng Ag thu được là bao nhiêu gam (làm tròn đến hàng phần mười)?`,
      ans: round(ag, 1), dp: 1,
      sol: `n(Ag) = 2·(${m}/180)·${H}% = ${num((m / 180) * 2 * (H / 100), 4)} mol ⇒ m = ${num(ag, 3)} ≈ ${numF(round(ag, 1), 1)} gam.`,
    };
  });
  add('sa', T.kl, (r) => {
    const x = r.pick(METALS), m = r.pick([2.4, 4.8, 5.4, 6.5, 8.1, 11.2, 13]);
    const nm = m / x.A, V = ((nm * x.n) / 2) * VM;
    return {
      q: `Cho ${num(m)} gam ${x.m} tác dụng hết với dung dịch H₂SO₄ loãng dư. Thể tích H₂ (đkc, 24,79 L/mol) thu được là bao nhiêu lít (làm tròn đến hàng phần trăm)?`,
      ans: round(V, 2), dp: 2,
      sol: `n(${x.m}) = ${num(m)}/${x.A} ≈ ${num(nm, 4)} mol ⇒ n(H₂) = ${x.n}·n/2 ≈ ${num((nm * x.n) / 2, 4)} mol ⇒ V ≈ ${numF(round(V, 2), 2)} L.`,
    };
  });
  add('sa', T.can, (r) => {
    const acid = r.bool(), c = r.pick([0.001, 0.002, 0.005, 0.01, 0.02, 0.05]);
    const pH = acid ? -Math.log10(c) : 14 + Math.log10(c);
    return {
      q: `Tính pH của dung dịch ${acid ? 'HCl' : 'NaOH'} ${num(c)} M ở 25 °C (làm tròn đến hàng phần mười).`,
      ans: round(pH, 1), dp: 1,
      sol: acid ? `[H⁺] = ${num(c)} M ⇒ pH = −lg${num(c)} ≈ ${numF(round(pH, 1), 1)}.` : `[OH⁻] = ${num(c)} M ⇒ pOH = ${num(-Math.log10(c), 2)} ⇒ pH = 14 − pOH ≈ ${numF(round(pH, 1), 1)}.`,
    };
  });
  add('sa', T.dh, (r) => {
    const I = r.pick([1.93, 2.5, 3, 5, 9.65]), t = r.pick([1930, 3860, 2000, 3600, 5790]);
    const m = (64 * I * t) / (2 * 96500);
    return {
      q: `Điện phân dung dịch CuSO₄ dư bằng điện cực trơ với cường độ dòng ${num(I)} A trong ${t} giây. Khối lượng Cu bám vào cathode là bao nhiêu gam (làm tròn đến hàng phần trăm)? (F = 96500)`,
      ans: round(m, 2), dp: 2,
      sol: `m = AIt/(nF) = 64·${num(I)}·${t}/(2·96500) ≈ ${numF(round(m, 2), 2)} gam.`,
    };
  });
  add('sa', T.dh, (r) => {
    const [a, b] = r.sample(EO.filter((x) => x.m !== 'H₂'), 2).sort((x, y) => x.E - y.E);
    const E = round(b.E - a.E, 2);
    return {
      q: `Cho E°(${a.c}) = ${num(a.E, 2)} V; E°(${b.c}) = ${num(b.E, 2)} V. Sức điện động chuẩn của pin ${a.m}–${b.m} là bao nhiêu vôn?`,
      ans: E, dp: 2,
      sol: `E°pin = E°(cathode) − E°(anode) = ${num(b.E, 2)} − (${num(a.E, 2)}) = ${num(E, 2)} V.`,
    };
  });
  add('sa', T.pol, (r) => {
    const p = r.pick([{ n: 'PVC', m: 62.5 }, { n: 'PE', m: 28 }, { n: 'PS', m: 104 }]);
    const n = r.pick([400, 800, 1000, 1500, 2000]);
    return {
      q: `Một mẫu ${p.n} có phân tử khối trung bình ${num(n * p.m)}. Hệ số polymer hoá trung bình của mẫu là bao nhiêu?`,
      ans: n, dp: 0,
      sol: `n = ${num(n * p.m)}/${num(p.m)} = ${n}.`,
    };
  });
  add('sa', T.est, (r) => {
    const acidM = 60, esterM = 88;
    const mA = r.pick([6, 12, 18, 24]), H = r.pick([50, 60, 62.5, 75, 80]);
    const mE = (mA / acidM) * esterM * (H / 100);
    return {
      q: `Đun ${mA} gam acetic acid với lượng dư ethanol (xúc tác H₂SO₄ đặc), hiệu suất phản ứng ester hoá đạt ${num(H)}%. Khối lượng ethyl acetate thu được là bao nhiêu gam (làm tròn đến hàng phần mười)?`,
      ans: round(mE, 1), dp: 1,
      sol: `CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. n(acid) = ${mA}/60 = ${num(mA / 60)} mol ⇒ m(ester) = ${num(mA / 60)}·88·${num(H)}% ≈ ${numF(round(mE, 1), 1)} gam.`,
    };
  });
  add('sa', T.amin, (r) => {
    const k = r.int(3, 5);
    const seq = Array.from({ length: k }, () => r.pick(AA));
    const Mp = seq.reduce((s, a) => s + a.M, 0) - 18 * (k - 1);
    return {
      q: `Tính phân tử khối của peptide ${seq.map((a) => a.ab).join('–')} (Gly = 75, Ala = 89, Val = 117).`,
      ans: Mp, dp: 0,
      sol: `M = ${seq.map((a) => a.M).join(' + ')} − 18·${k - 1} = ${Mp}.`,
    };
  });
  add('sa', T.kiem, (r) => {
    const nOH = r.pick([0.1, 0.2, 0.3]), ratio = r.pick([0.5, 1.2, 1.4, 1.5, 1.6]);
    const nCO2 = round(nOH * ratio, 3);
    const ppt = nCO2 <= nOH ? nCO2 : 2 * nOH - nCO2;
    return {
      q: `Sục ${num(nCO2, 3)} mol CO₂ vào dung dịch chứa ${num(nOH)} mol Ca(OH)₂. Sau phản ứng hoàn toàn thu được bao nhiêu gam kết tủa (làm tròn đến hàng đơn vị)?`,
      ans: Math.round(ppt * 100), dp: 0,
      sol: `${nCO2 <= nOH ? 'n(CO₂) ≤ n(Ca(OH)₂) ⇒ n(CaCO₃) = n(CO₂)' : 'Tạo hai muối ⇒ n(CaCO₃) = 2n(Ca(OH)₂) − n(CO₂)'} = ${num(ppt, 3)} mol ⇒ m = ${num(ppt * 100, 2)} ≈ ${Math.round(ppt * 100)} gam.`,
    };
  });
  add('sa', T.nhiet, (r) => {
    const m = r.pick([8, 16, 32, 4.8, 24]);
    const E = (m / 16) * 890.2;
    return {
      q: `Đốt cháy hoàn toàn methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔrH°₂₉₈ = −890,2 kJ. Nhiệt lượng toả ra khi đốt cháy ${num(m)} gam CH₄ là bao nhiêu kJ (làm tròn đến hàng đơn vị)?`,
      ans: Math.round(E), dp: 0,
      sol: `n(CH₄) = ${num(m)}/16 = ${num(m / 16, 3)} mol ⇒ Q = ${num(m / 16, 3)}·890,2 ≈ ${Math.round(E)} kJ.`,
    };
  });
  add('sa', T.can, (r) => {
    const h = r.pick([0.02, 0.04, 0.05]), i = r.pick([0.02, 0.03, 0.05]), hi = r.pick([0.1, 0.12, 0.16, 0.2]);
    const K = (hi * hi) / (h * i);
    return {
      q: `Cho cân bằng H₂(g) + I₂(g) ⇌ 2HI(g) ở 430 °C. Tại trạng thái cân bằng [H₂] = ${num(h)} M; [I₂] = ${num(i)} M; [HI] = ${num(hi)} M. Tính hằng số cân bằng K<sub>C</sub> (làm tròn đến hàng phần mười).`,
      ans: round(K, 1), dp: 1,
      sol: `K<sub>C</sub> = [HI]²/([H₂][I₂]) = ${num(hi)}²/(${num(h)}·${num(i)}) ≈ ${numF(round(K, 1), 1)}.`,
    };
  });
})(typeof window !== 'undefined' ? window : globalThis);
