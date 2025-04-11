# React Weather App

Ứng dụng thời tiết widget-based, cho phép tìm kiếm và hiển thị dữ liệu thời tiết hiện tại cũng như dự báo theo giờ hoặc theo ngày, kèm theo tính năng kéo thả, resize widget, và nhiều tính năng nâng cao khác.

## Table of Contents

- [Tính Năng](#tính-năng)
- [Biến Môi Trường](#biến-môi-trường)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)


## Tính Năng

- **Tìm kiếm thông minh:**  
  Cho phép nhập tên thành phố, hiển thị danh sách gợi ý (sử dụng API Geocoding của OpenWeatherMap) và thêm widget khi chọn thành phố.

- **Hiển thị thời tiết chi tiết:**  
  Thông tin thời tiết hiện tại, dự báo theo giờ và dự báo 5 ngày được hiển thị trên các widget. Ngoài ra, mô tả thời tiết có thể được ánh xạ chuyển đổi (ví dụ: "mist" sẽ hiển thị là "Chi tiết thời tiết").

- **Tính năng nâng cao:**  
  - **Auto Refresh:** Dữ liệu tự động cập nhật mỗi 10 phút.
  - **Kéo – Thả Widget:** Các widget có thể di chuyển tự do trên dashboard.
  - **Resize Widget:** Cho phép kéo góc dưới widget để thay đổi kích thước.
  - **Chuyển đổi đơn vị nhiệt độ:** Hỗ trợ đổi giữa Celsius và Fahrenheit.
  - **Modal chi tiết:** Nhấn vào widget để xem thêm thông tin chi tiết về thời tiết.

### Yêu Cầu

- Node.js (phiên bản 14.x trở lên)
- NPM / Yarn / PNPM


## Biến Môi Trường
VITE_OPENWEATHER_API_KEY:
API key của OpenWeatherMap được lưu trong file .env.

Lưu ý: File .env đã được thêm vào .gitignore để bảo mật.

Hướng Dẫn Sử Dụng
Tìm kiếm thành phố:
Nhập tên thành phố vào ô tìm kiếm, chọn thành phố từ danh sách gợi ý để thêm widget.

Widget:
Mỗi widget hiển thị thông tin thời tiết hiện tại, dự báo theo giờ hoặc dự báo 5 ngày, đồng thời hỗ trợ kéo – thả và resize.
Nhấn vào header widget để mở modal hiển thị chi tiết thông tin thời tiết.

Đơn Vị Nhiệt Độ:
Sử dụng nút chuyển đổi để thay đổi giữa Celsius và Fahrenheit.

Làm mới dữ liệu:
Nhấn nút “Làm mới” trong widget để cập nhật dữ liệu ngay lập tức.

## Công Nghệ Sử Dụng
React – Thư viện xây dựng giao diện người dùng.

Vite – Công cụ bundler và phát triển nhanh.

TypeScript – Ngôn ngữ lập trình an toàn và có kiểu.

Axios – Thư viện để thực hiện các HTTP request.

React-Draggable – Hỗ trợ kéo – thả cho các widget.

CSS3 (Flexbox & Grid) – Xây dựng giao diện responsive.

