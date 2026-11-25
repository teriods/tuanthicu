# Luyện thi THPT 2027 – Khối A (Toán · Vật lí · Hoá học)

Web luyện đề thi tốt nghiệp THPT theo **cấu trúc đề mới từ năm 2025** (Chương trình GDPT 2018), chạy hoàn toàn trên trình duyệt, không cần máy chủ.

## Tính năng
- **3 môn × 120 đề** (Toán, Vật lí, Hoá học). Đề 1–40 mức Cơ bản, 41–80 Trung bình, 81–120 Vận dụng.
- **Bám sát đề thi 2009–2025**: khoảng một nửa số câu tính toán lấy từ các *dạng bài kinh điển* xuất hiện lặp lại trong đề thi các năm (bảng biến thiên, tập xác định, lãi kép, góc giữa đường và mặt, xác suất chọn số; tuổi cổ vật C-14, truyền tải điện, máy phát điện; đốt cháy ester, Al + NaOH, Fe/Cu + HNO₃, lên men glucose, thuỷ phân peptide…), đã lọc theo Chương trình GDPT 2018. Các câu này có nhãn **“Dạng đề các năm”** (`js/data/classic.js`).
- **Vào là thi**: bấm “Vào thi ngay” là bắt đầu luôn đề được gợi ý, không phải chọn gì. Hai tuỳ chọn (hiện đáp án ngay, tính giờ như thi thật) nằm gọn ở trang chủ.
- **Gợi ý đề theo năng lực**: ước lượng năng lực từ 5 lần làm gần nhất → chọn mức đề (Cơ bản/Trung bình/Vận dụng) → trong mức đó chọn đề có nhiều câu thuộc chủ đề bạn đang yếu.
- **Giải thích chi tiết**: đáp án đúng, phương án bạn chọn sai, kiến thức cần nhớ, phương pháp giải từng bước, lời giải chi tiết đánh số, lỗi thường gặp, liên kết học thêm (YouTube, Google, Khan Academy) và **Sổ tay kiến thức** trong ứng dụng (`js/data/guide.js`).
- **Đánh giá tổng hợp sau khi thi**: điểm dự kiến, điểm cao nhất, mức tiến bộ, số chủ đề đã vững, thời gian luyện, chuỗi ngày học, biểu đồ điểm, tỉ lệ điểm từng phần, mức nắm vững từng chủ đề.
- **Động viên**: câu động viên mỗi ngày, khen khi đúng, chuỗi câu đúng liên tiếp, khích lệ khi sai và sau khi nộp bài.
- **Chế độ làm bài** (chỉnh ở trang chủ): *Luyện tập – chấm ngay* (chọn xong biết ngay đúng/sai và cách giải từng câu, từng ý), *Thi thử* (chấm khi nộp, đồng hồ dừng khi rời trang), *Thi thật* (đồng hồ chạy liên tục như phòng thi).
- **Đúng cấu trúc đề thi mới**
  | | Toán (90 phút) | Vật lí / Hoá học (50 phút) |
  |---|---|---|
  | Phần I – nhiều lựa chọn | 12 câu × 0,25 đ | 18 câu × 0,25 đ |
  | Phần II – đúng/sai (4 ý) | 4 câu: 1 ý 0,1 · 2 ý 0,25 · 3 ý 0,5 · 4 ý 1 đ | như Toán |
  | Phần III – trả lời ngắn | 6 câu × 0,5 đ | 6 câu × 0,25 đ |
- **Giải thích từng câu**: phần *Kiến thức* (công thức, lí thuyết dùng) và *Lời giải* chi tiết; câu đúng/sai có giải thích từng ý.
- **Chấm điểm tự động** theo đúng thang điểm của từng phần.
- **Nhận xét chung sau khi nộp**: xếp loại, phần làm tốt/kém, chủ đề mạnh/yếu, kiến thức cần ôn lại, nhận xét về thời gian, so sánh với các lần làm trước, gợi ý đề tiếp theo.
- **Lưu tạm chống mất bài**
  - Mỗi thao tác được lưu ngay vào máy (localStorage) kèm bản sao dự phòng, và lưu định kì mỗi 5 giây.
  - Mất mạng vẫn làm bài bình thường (đề được tạo trên máy); có service worker để mở trang khi ngoại tuyến, có thể cài như ứng dụng (PWA).
  - Có cuộc gọi / chuyển ứng dụng: chế độ *Luyện tập* tự dừng đồng hồ khi rời trang; chế độ *Thi thật* tính giờ liên tục như phòng thi.
  - Lỡ đóng trình duyệt, hết pin: mở lại trang sẽ được hỏi khôi phục bài làm dở.
- **Lịch sử & sao lưu**: xem lại mọi lượt làm, xuất/nhập tệp JSON để chuyển máy.

## Cách đề được tạo
Mỗi dạng bài là một hàm sinh câu hỏi có tham số (`js/data/*.js`), đáp án và lời giải được **tính toán** từ chính tham số đó nên luôn khớp nhau. Đề số *n* được sinh từ hạt giống cố định nên **luôn giống nhau** mỗi lần mở (để làm lại, xem lại bài). Ngoài ra có ngân hàng câu lí thuyết cho Vật lí và Hoá học.

## Chạy thử trên máy
```bash
python3 -m http.server 8000
```
rồi mở http://localhost:8000 (cũng có thể mở trực tiếp `index.html`, nhưng chế độ ngoại tuyến cần chạy qua http).

## Kiểm thử
```bash
node tests/check-exams.js
```
Sinh toàn bộ 360 đề, kiểm tra cấu trúc, phương án không trùng, đáp án hợp lệ, làm đúng hết được 10 điểm, đề ổn định.

## Đưa lên mạng (GitHub Pages)
Workflow `.github/workflows/pages.yml` chạy kiểm thử rồi xuất bản lên nhánh `gh-pages` mỗi khi đẩy lên `main`. GitHub Pages phục vụ từ nhánh `gh-pages` (Settings → Pages → Branch: `gh-pages` / root). Địa chỉ: https://teriods.github.io/tuanthicu/

## Thêm dạng bài
Dùng `LT.add(môn, 'mc' | 'tf' | 'sa', chủ_đề, (r) => ({ q, opts | items | ans, sol, kn }))` trong file môn tương ứng; với câu nhiều lựa chọn, phương án đúng đặt đầu mảng `opts` (sẽ được xáo trộn). Chạy lại kiểm thử sau khi thêm.
