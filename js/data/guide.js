/* Cẩm nang theo chủ đề: phương pháp giải (m), lỗi thường gặp (t), từ khoá tìm bài giảng (k).
   Dùng để làm giàu phần giải thích từng câu, trang "Sổ tay kiến thức" và liên kết học thêm. */
(function (G) {
  'use strict';
  const LT = G.LT;
  LT.GUIDE = {
    math: {
      'Tính đơn điệu & cực trị': { m: ['Tìm tập xác định.', 'Tính f\'(x), giải f\'(x) = 0 và tìm điểm f\'(x) không xác định.', 'Lập bảng xét dấu f\'(x) (hoặc đọc bảng biến thiên).', 'Kết luận: f\' > 0 → đồng biến, f\' < 0 → nghịch biến; f\' đổi dấu → cực trị.'], t: ['Nhầm “điểm cực đại” (giá trị x) với “giá trị cực đại” (giá trị y).', 'Đếm cả nghiệm bội chẵn của f\'(x) là điểm cực trị.', 'Quên rằng hệ số a < 0 làm đảo thứ tự cực đại/cực tiểu của hàm bậc ba.'], k: 'tính đơn điệu và cực trị của hàm số lớp 12' },
      'GTLN – GTNN': { m: ['Tính f\'(x), tìm các nghiệm thuộc đoạn [a; b].', 'Tính giá trị f tại hai đầu mút và tại các nghiệm đó.', 'So sánh để chọn lớn nhất, nhỏ nhất.', 'Với bài toán thực tế: đặt ẩn, tìm miền xác định, lập hàm rồi khảo sát.'], t: ['Quên tính giá trị tại đầu mút.', 'Lấy cả nghiệm nằm ngoài đoạn đang xét.', 'Bài thực tế: quên điều kiện của ẩn (độ dài > 0…).'], k: 'giá trị lớn nhất giá trị nhỏ nhất của hàm số' },
      'Tiệm cận & đồ thị': { m: ['Tiệm cận đứng: nghiệm của mẫu mà tử khác 0 (x = −d/c).', 'Tiệm cận ngang: giới hạn tại ±∞ (y = a/c với hàm phân thức bậc nhất).', 'Số giao điểm với y = m: so sánh m với các giá trị cực trị trên bảng biến thiên.'], t: ['Đổi chỗ tiệm cận đứng và ngang.', 'Sai dấu khi tính −d/c.', 'Đường thẳng đi qua điểm cực trị chỉ cho 2 giao điểm, không phải 3.'], k: 'đường tiệm cận của đồ thị hàm số' },
      'Mũ – Logarit': { m: ['Đặt điều kiện xác định (biểu thức trong log > 0, cơ số dương khác 1).', 'Đưa về cùng cơ số hoặc đặt ẩn phụ t = aˣ (t > 0).', 'Với bất phương trình: cơ số > 1 giữ chiều, 0 < cơ số < 1 đổi chiều.', 'Đối chiếu điều kiện rồi kết luận.'], t: ['Quên đổi chiều bất phương trình khi cơ số nhỏ hơn 1.', 'Quên điều kiện xác định của logarit.', 'Áp dụng sai log(a + b) = log a + log b (công thức đúng là log(ab)).', 'Lãi kép dùng nhầm công thức lãi đơn A(1 + nr).'], k: 'phương trình mũ logarit lớp 11' },
      'Lượng giác': { m: ['Đưa phương trình về dạng cơ bản sin x = a, cos x = a, tan x = a.', 'Tìm góc α đặc biệt có giá trị lượng giác bằng a.', 'Áp dụng công thức nghiệm, nhớ chu kì (k2π cho sin, cos; kπ cho tan).', 'Xét dấu theo góc phần tư khi tính giá trị lượng giác.'], t: ['Nhầm chu kì kπ và k2π.', 'Quên họ nghiệm thứ hai π − α của phương trình sin.', 'Quên xét dấu cos, tan theo góc phần tư.'], k: 'phương trình lượng giác cơ bản' },
      'Dãy số – Cấp số': { m: ['Xác định loại dãy: cấp số cộng (cộng thêm d) hay cấp số nhân (nhân thêm q).', 'Viết u₁ và d (hoặc q) từ giả thiết.', 'Áp dụng công thức số hạng tổng quát hoặc tổng n số hạng đầu.'], t: ['Dùng uₙ = u₁ + nd thay vì u₁ + (n − 1)d.', 'Nhầm công thức cấp số cộng với cấp số nhân.'], k: 'cấp số cộng cấp số nhân' },
      'Giới hạn – Đạo hàm': { m: ['Giới hạn dạng 0/0: phân tích nhân tử rồi rút gọn.', 'Giới hạn tại ∞ của phân thức: chia tử và mẫu cho luỹ thừa cao nhất.', 'Đạo hàm: áp dụng bảng đạo hàm và quy tắc tổng, tích, thương.'], t: ['Thay trực tiếp vào dạng 0/0.', 'Quên hệ số khi lấy đạo hàm xⁿ (n·xⁿ⁻¹).'], k: 'giới hạn hàm số đạo hàm lớp 11' },
      'Nguyên hàm': { m: ['Tách biểu thức thành tổng các hàm cơ bản.', 'Áp dụng bảng nguyên hàm cho từng hạng tử.', 'Cộng hằng số C; nếu có điều kiện F(x₀) thì thay vào tìm C.'], t: ['Nhầm nguyên hàm với đạo hàm (nhân thay vì chia số mũ).', 'Sai dấu với ∫sin x dx = −cos x + C.', 'Quên chia cho k với ∫e^{kx}, ∫sin kx, ∫cos kx.'], k: 'nguyên hàm lớp 12' },
      'Tích phân & ứng dụng': { m: ['Tìm một nguyên hàm F(x).', 'Tính F(b) − F(a).', 'Diện tích: tìm hoành độ giao điểm, lấy tích phân của |f − g|.', 'Thể tích tròn xoay: V = π∫f²(x)dx. Quãng đường: s = ∫v(t)dt.'], t: ['Tính F(a) − F(b) (ngược dấu).', 'Diện tích quên lấy trị tuyệt đối nên ra số âm.', 'Thể tích quên bình phương f(x) hoặc quên nhân π.'], k: 'tích phân ứng dụng tính diện tích thể tích' },
      'Hình học không gian': { m: ['Vẽ hình, xác định đáy và đường cao.', 'Tính diện tích đáy B và chiều cao h.', 'Áp dụng V(chóp) = Bh/3, V(lăng trụ) = Bh; góc giữa đường thẳng và mặt phẳng là góc với hình chiếu của nó.'], t: ['Quên hệ số 1/3 của khối chóp.', 'Lấy sai hình chiếu khi tính góc giữa đường thẳng và mặt phẳng.'], k: 'thể tích khối chóp lăng trụ góc giữa đường thẳng và mặt phẳng' },
      'Vectơ & toạ độ Oxyz': { m: ['Toạ độ vectơ AB = điểm cuối − điểm đầu.', 'Tích vô hướng: nhân từng toạ độ rồi cộng.', 'Độ dài: căn tổng bình phương; vuông góc ⇔ tích vô hướng bằng 0.'], t: ['Lấy điểm đầu trừ điểm cuối.', 'Sai dấu khi nhân với số âm.'], k: 'hệ trục toạ độ trong không gian Oxyz' },
      'Phương trình mặt phẳng': { m: ['Xác định một điểm thuộc mặt phẳng và vectơ pháp tuyến n.', 'Viết A(x − x₀) + B(y − y₀) + C(z − z₀) = 0 rồi rút gọn.', 'Khoảng cách: thay toạ độ điểm vào vế trái, lấy trị tuyệt đối, chia √(A² + B² + C²).'], t: ['Đổi dấu sai khi khai triển (x − x₀).', 'Quên trị tuyệt đối hoặc quên chia độ dài pháp tuyến.'], k: 'phương trình mặt phẳng trong không gian' },
      'Phương trình đường thẳng': { m: ['Xác định điểm M₀ và vectơ chỉ phương u.', 'Viết dạng tham số x = x₀ + at, y = y₀ + bt, z = z₀ + ct.', 'Kiểm tra điểm thuộc đường thẳng: tìm t thoả cả ba phương trình.'], t: ['Nhầm toạ độ điểm với vectơ chỉ phương.', 'Chỉ kiểm tra một phương trình khi xét điểm thuộc đường thẳng.'], k: 'phương trình đường thẳng trong không gian' },
      'Phương trình mặt cầu': { m: ['Dạng chính tắc: đọc tâm I(a; b; c), bán kính R.', 'Dạng khai triển: a = −(hệ số x)/2…, R = √(a² + b² + c² − d).'], t: ['Lấy sai dấu toạ độ tâm.', 'Quên khai căn: lấy R² làm R.'], k: 'phương trình mặt cầu' },
      'Tổ hợp': { m: ['Xác định có thứ tự hay không: có thứ tự → chỉnh hợp, không → tổ hợp.', 'Chia trường hợp hoặc chia công đoạn (quy tắc cộng, quy tắc nhân).', 'Với lập số: xử lí chữ số 0 và chữ số đầu tiên trước.'], t: ['Dùng chỉnh hợp khi không phân biệt thứ tự (hoặc ngược lại).', 'Quên loại trường hợp chữ số 0 đứng đầu.'], k: 'hoán vị chỉnh hợp tổ hợp' },
      'Xác suất': { m: ['Xác định không gian mẫu n(Ω).', 'Đếm số kết quả thuận lợi n(A), có thể dùng biến cố đối với “ít nhất một”.', 'P(A) = n(A)/n(Ω); dùng công thức xác suất toàn phần, Bayes khi có nhiều giai đoạn.'], t: ['Đếm thiếu trường hợp; với “ít nhất” nên dùng 1 − P(đối).', 'Nhầm P(A|B) với P(B|A).', 'Nhầm P(A ∩ B) với P(A)·P(B) khi A, B không độc lập.'], k: 'xác suất có điều kiện công thức Bayes lớp 12' },
      'Thống kê mẫu ghép nhóm': { m: ['Xác định giá trị đại diện mỗi nhóm (trung điểm).', 'Số trung bình x̄ = Σnᵢxᵢ/n; phương sai s² = Σnᵢxᵢ²/n − x̄².', 'Tứ phân vị: tìm nhóm chứa vị trí n/4, 3n/4 rồi dùng công thức nội suy.'], t: ['Dùng đầu mút nhóm thay vì giá trị đại diện.', 'Khoảng biến thiên lấy hiệu hai giá trị đại diện thay vì hai đầu mút.'], k: 'khoảng biến thiên khoảng tứ phân vị mẫu số liệu ghép nhóm' },
    },
    physics: {
      'Cấu trúc chất – Nhiệt độ': { m: ['Đổi đơn vị nhiệt độ: T(K) = t(°C) + 273.', 'Áp dụng mô hình động học phân tử để giải thích hiện tượng.'], t: ['Quên đổi °C sang K trong các công thức chất khí.', 'Nhầm hướng đổi: T = t − 273.'], k: 'mô hình động học phân tử thang nhiệt độ vật lí 12' },
      'Nội năng – Định luật I NĐLH': { m: ['Xác định dấu: vật nhận nhiệt Q > 0, nhận công A > 0.', 'Áp dụng ΔU = A + Q.'], t: ['Nhầm dấu khi khí thực hiện công (A < 0) hoặc toả nhiệt (Q < 0).'], k: 'định luật 1 nhiệt động lực học vật lí 12' },
      'Nhiệt dung riêng – Nhiệt chuyển thể': { m: ['Liệt kê các quá trình: nóng lên (mcΔt), nóng chảy (λm), hoá hơi (Lm).', 'Cộng nhiệt lượng từng giai đoạn; cân bằng nhiệt: Q toả = Q thu.', 'Đổi đơn vị: g → kg, phút → giây, J → kJ.'], t: ['Quên đổi gam sang kg.', 'Bỏ sót giai đoạn chuyển thể.', 'Nhầm công suất × thời gian khi chưa đổi phút sang giây.'], k: 'nhiệt dung riêng nhiệt nóng chảy riêng nhiệt hoá hơi riêng' },
      'Các định luật chất khí': { m: ['Xác định quá trình: đẳng nhiệt, đẳng áp, đẳng tích hay tổng quát.', 'Đổi nhiệt độ sang K.', 'Áp dụng pV = const, V/T = const, p/T = const, hoặc pV/T = const; pV = nRT để tìm số mol.'], t: ['Dùng nhiệt độ °C trong công thức.', 'Dùng lít thay vì m³ trong pV = nRT.', 'Áp dụng sai định luật cho quá trình.'], k: 'định luật Boyle Charles phương trình trạng thái khí lí tưởng' },
      'Động học phân tử khí': { m: ['W đ = (3/2)kT với T tính bằng K.', 'v rms = √(3RT/M) với M tính bằng kg/mol.'], t: ['Dùng M theo g/mol.', 'Quên hệ số 3/2.'], k: 'thuyết động học phân tử chất khí áp suất động năng phân tử' },
      'Từ trường – Lực từ': { m: ['Xác định góc α giữa dây dẫn và vectơ B.', 'F = BIl·sinα; chiều theo quy tắc bàn tay trái.'], t: ['Dùng cos thay sin.', 'Quên đổi cm sang m.'], k: 'lực từ tác dụng lên dây dẫn mang dòng điện cảm ứng từ' },
      'Cảm ứng điện từ – Điện xoay chiều': { m: ['Từ thông Φ = NBS·cosα (α giữa pháp tuyến và B).', 'Suất điện động |e| = ΔΦ/Δt; E₀ = NBSω với máy phát.', 'Điện xoay chiều: giá trị hiệu dụng = cực đại/√2; máy biến áp U₁/U₂ = N₁/N₂; hao phí ΔP = P²R/U².'], t: ['Nhầm góc giữa B với mặt khung và góc với pháp tuyến.', 'Quên đổi cm² sang m².', 'Nhầm giá trị hiệu dụng với cực đại.'], k: 'cảm ứng điện từ định luật Lenz dòng điện xoay chiều máy biến áp' },
      'Cấu trúc hạt nhân – Năng lượng liên kết': { m: ['Số neutron N = A − Z.', 'Độ hụt khối Δm = Zmp + Nmn − m hạt nhân.', 'W lk = Δm·931,5 MeV; năng lượng liên kết riêng = W lk/A.'], t: ['Nhầm số nucleon với số neutron.', 'So sánh độ bền bằng năng lượng liên kết thay vì năng lượng liên kết riêng.'], k: 'năng lượng liên kết hạt nhân độ hụt khối' },
      'Phản ứng hạt nhân': { m: ['Bảo toàn số khối và điện tích để tìm hạt chưa biết.', 'ΔE = (m trước − m sau)·931,5 MeV; ΔE > 0 toả năng lượng.'], t: ['Cho rằng khối lượng được bảo toàn.', 'Nhầm hạt β⁻ (electron) với β⁺ (positron).'], k: 'phản ứng hạt nhân phân hạch nhiệt hạch' },
      'Phóng xạ': { m: ['N = N₀·2^(−t/T); nếu t = kT thì còn N₀/2ᵏ.', 'Số hạt đã phân rã = N₀ − N; tỉ số con/mẹ = 2^(t/T) − 1.', 'Độ phóng xạ H = λN với λ = ln2/T (đổi T ra giây).'], t: ['Nhầm phần còn lại với phần đã phân rã.', 'Không đổi chu kì bán rã ra giây khi tính H.'], k: 'định luật phóng xạ chu kì bán rã độ phóng xạ' },
    },
    chemistry: {
      'Ester – Lipid': { m: ['Viết phương trình: RCOOR\' + NaOH → RCOONa + R\'OH; chất béo + 3NaOH → 3 muối + glycerol.', 'Tính số mol ester từ khối lượng.', 'Áp dụng tỉ lệ mol hoặc bảo toàn khối lượng; ester no đơn chức cháy cho n CO₂ = n H₂O.'], t: ['Nhầm muối và alcohol tạo thành.', 'Chất béo dùng tỉ lệ 1:1 thay vì 1:3 với NaOH.', 'Quên NaOH dư trong chất rắn khi cô cạn.'], k: 'ester chất béo phản ứng xà phòng hoá hoá 12' },
      'Carbohydrate': { m: ['Glucose → 2Ag (tráng bạc); glucose → 2C₂H₅OH + 2CO₂ (lên men).', 'Saccharose → glucose + fructose; tinh bột, cellulose → n glucose.', 'Nhân/chia hiệu suất đúng chiều: sản phẩm thực = lí thuyết × H.'], t: ['Quên hệ số 2 của Ag hoặc CO₂.', 'Nhân hiệu suất khi tính chất ban đầu (phải chia).'], k: 'carbohydrate glucose saccharose tinh bột cellulose' },
      'Amine – Amino acid – Peptide': { m: ['Amine + HCl: m muối = m amine + m HCl.', 'Amino acid + NaOH: mỗi –COOH thay H bằng Na (+22).', 'Peptide k gốc: M = ΣM amino acid − 18(k − 1); thuỷ phân cần k mol NaOH.'], t: ['Cộng 35,5 thay vì 36,5 khi tạo muối với HCl.', 'Quên trừ nước khi tính phân tử khối peptide.'], k: 'amine amino acid peptide protein hoá 12' },
      'Polymer': { m: ['Hệ số polymer hoá n = M polymer / M mắt xích.', 'Phân loại: trùng hợp (monomer có liên kết đôi) và trùng ngưng (giải phóng phân tử nhỏ).'], t: ['Lấy nhầm M monomer khác mắt xích (trùng ngưng).', 'Nhầm tơ nhân tạo với tơ tổng hợp.'], k: 'polymer vật liệu polymer tơ cao su' },
      'Pin điện & Điện phân': { m: ['Pin: kim loại có E° nhỏ hơn là anode; E°pin = E°cathode − E°anode.', 'Điện phân: m = AIt/(nF), t tính bằng giây.', 'Cathode: sự khử; anode: sự oxi hoá.'], t: ['Cộng hai thế điện cực thay vì trừ.', 'Quên đổi phút sang giây.', 'Nhầm vị trí xảy ra sự khử và sự oxi hoá.'], k: 'pin điện hoá thế điện cực chuẩn điện phân' },
      'Đại cương kim loại': { m: ['Viết quá trình cho – nhận electron.', 'Bảo toàn electron: Σ(n kim loại × hoá trị) = Σ(n khí × số e nhận).', 'Với kim loại tác dụng muối: tính tăng/giảm khối lượng thanh kim loại.'], t: ['Fe + HNO₃ dư tạo Fe³⁺ (3e) chứ không phải Fe²⁺.', 'Dùng 22,4 thay vì 24,79 L/mol ở điều kiện chuẩn.'], k: 'tính chất hoá học của kim loại ăn mòn kim loại' },
      'Kim loại nhóm IA, IIA – Nước cứng': { m: ['CO₂ + Ca(OH)₂: xét tỉ lệ n CO₂ : n Ca(OH)₂ để biết tạo một hay hai muối.', 'Nước cứng: phân biệt tạm thời (HCO₃⁻) và vĩnh cửu (Cl⁻, SO₄²⁻).'], t: ['Khi CO₂ dư vẫn tính kết tủa bằng n CO₂.', 'Cho rằng đun sôi làm mềm được nước cứng vĩnh cửu.'], k: 'kim loại kiềm kiềm thổ nước cứng' },
      'Kim loại chuyển tiếp – Phức chất': { m: ['Xác định nguyên tử trung tâm, phối tử và số phối trí.', 'Số phối trí 2 – thẳng; 4 – tứ diện/vuông phẳng; 6 – bát diện.'], t: ['Đếm số phối trí bằng số ion trái dấu thay vì số liên kết với phối tử.', 'Nhầm màu các phức quen thuộc.'], k: 'phức chất kim loại chuyển tiếp hoá 12' },
      'Cân bằng hoá học – pH': { m: ['Viết biểu thức K_C (không có chất rắn, nước lỏng).', 'Nguyên lí Le Chatelier: cân bằng chống lại tác động.', 'pH = −lg[H⁺]; base mạnh: pH = 14 + lg[OH⁻].'], t: ['Quên số mũ hệ số trong K_C.', 'H₂SO₄ quên nhân 2 nồng độ H⁺.', 'Cho rằng xúc tác làm chuyển dịch cân bằng.'], k: 'cân bằng hoá học hằng số cân bằng pH' },
      'Năng lượng – Tốc độ phản ứng': { m: ['ΔrH = ΣΔfH(sản phẩm) − ΣΔfH(chất đầu), nhân hệ số.', 'Tốc độ trung bình v = |ΔC|/Δt.'], t: ['Lấy chất đầu trừ sản phẩm.', 'Quên nhân hệ số tỉ lượng.'], k: 'enthalpy tạo thành biến thiên enthalpy tốc độ phản ứng' },
      'Hydrocarbon – Hợp chất hữu cơ': { m: ['Alkane: n alkane = n H₂O − n CO₂; số C = n CO₂ / n alkane.', 'Nhận biết liên kết bội bằng nước bromine.'], t: ['Áp dụng công thức alkane cho alkene.'], k: 'hydrocarbon alkane alkene hoá 11' },
      'Nguyên tử – Bảng tuần hoàn': { m: ['Viết cấu hình electron theo mức năng lượng.', 'Số lớp → chu kì; e lớp ngoài cùng (s, p) → nhóm A; (n−1)d + ns → nhóm B.'], t: ['Quên trường hợp bán bão hoà/bão hoà của Cr, Cu.', 'Xếp nguyên tố d vào nhóm A.'], k: 'cấu hình electron bảng tuần hoàn' },
    },
  };

  /* Liên kết học thêm trên Internet (tìm kiếm luôn hoạt động, không lo link chết) */
  LT.learnLinks = function (subj, topic) {
    const g = (LT.GUIDE[subj] || {})[topic];
    const kw = g ? g.k : topic;
    const e = encodeURIComponent;
    return [
      { t: '▶ Video bài giảng (YouTube)', u: 'https://www.youtube.com/results?search_query=' + e('bài giảng ' + kw) },
      { t: '📖 Lí thuyết & bài tập (Google)', u: 'https://www.google.com/search?q=' + e('lí thuyết ' + kw + ' có lời giải') },
      { t: '🎓 Khan Academy (tiếng Việt)', u: 'https://vi.khanacademy.org/search?page_search_query=' + e(topic) },
    ];
  };

  /* Câu động viên */
  LT.CHEER = {
    daily: [
      'Mỗi đề làm hôm nay là một bước gần hơn tới cánh cổng đại học. Bắt đầu thôi!',
      'Không cần hoàn hảo, chỉ cần tiến bộ hơn hôm qua một chút.',
      'Người thành công không phải người không sai, mà là người sửa sai nhanh nhất.',
      'Chỉ 50 phút mỗi ngày, sau một tháng bạn sẽ ngạc nhiên về chính mình.',
      'Kiến thức là thứ duy nhất không ai lấy đi được của bạn.',
      'Hôm nay khó, ngày mai sẽ dễ hơn – vì bạn đã luyện hôm nay.',
      'Kỳ thi là của bạn – hãy luyện cho đến khi tự tin bước vào phòng thi.',
      'Học đều mỗi ngày hiệu quả hơn học dồn một đêm.',
    ],
    right: ['Chính xác! 🎯', 'Tuyệt vời! ✨', 'Đúng rồi, giỏi lắm! 👏', 'Chuẩn không cần chỉnh! 💯', 'Làm tốt lắm! 🌟'],
    wrong: ['Chưa đúng – đọc lời giải để nhớ lâu hơn nhé 💪', 'Sai một lần, nhớ cả đời. Xem cách giải bên dưới nhé!', 'Không sao, mỗi lỗi sai là một bài học quý 📘', 'Gần đúng rồi! Xem lại kiến thức ở dưới nhé.'],
    streak: { 3: '3 câu đúng liên tiếp! Giữ phong độ nhé 🔥', 5: '5 câu đúng liên tiếp – bạn đang rất tập trung! 🔥🔥', 8: '8 câu liên tiếp! Phong độ thủ khoa đây rồi 🏆', 12: '12 câu liên tiếp – không thể cản nổi! 🚀' },
    result: {
      xs: ['Xuất sắc! Bạn đang ở phong độ của một thủ khoa. Hãy thử thách mình với đề Vận dụng!', 'Điểm số tuyệt vời – công sức của bạn đã được đền đáp xứng đáng!'],
      gioi: ['Rất giỏi! Chỉ còn một chút nữa là chạm tới điểm 9+.', 'Kết quả đáng tự hào! Ôn kĩ vài chủ đề yếu là bạn bứt phá ngay.'],
      kha: ['Khá lắm! Nền tảng đã vững, giờ là lúc tăng tốc.', 'Bạn đang đi đúng hướng – kiên trì thêm vài đề nữa nhé!'],
      tb: ['Bạn đã nắm được phần cơ bản – đó là nền móng quan trọng nhất. Cố lên!', 'Đừng nản! Mỗi đề làm thêm là một lần bạn mạnh hơn.'],
      yeu: ['Khởi đầu nào cũng khó. Điều quan trọng là bạn đã bắt đầu – hãy đọc kĩ lời giải và thử lại nhé!', 'Điểm hôm nay không định nghĩa bạn. Sự kiên trì mới làm nên kết quả!'],
    },
  };
  LT.pickCheer = function (list, seed) { return list[Math.abs(seed == null ? Date.now() : seed) % list.length]; };
})(typeof window !== 'undefined' ? window : globalThis);
