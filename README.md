# React Weather App

Ứng dụng thời tiết widget-based, cho phép tìm kiếm và hiển thị dữ liệu thời tiết hiện tại cũng như dự báo theo giờ hoặc theo ngày, kèm theo tính năng kéo thả, resize widget, và nhiều tính năng nâng cao khác.

## Table of Contents

- [Tính Năng](#tính-năng)
- [Demo](#demo)
- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Biến Môi Trường](#biến-môi-trường)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Contributing](#contributing)
- [License](#license)

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

## Demo

*(Nếu có, bạn có thể thêm link demo trực tuyến hoặc video demo ở đây)*

## Cài Đặt

### Yêu Cầu

- Node.js (phiên bản 14.x trở lên)
- NPM / Yarn / PNPM

### Hướng Dẫn Cài Đặt

1. **Clone dự án:**

   ```bash
   git clone https://github.com/yourusername/react-weather-app.git
   cd react-weather-app
Cài đặt các dependencies:

bash
Copy
npm install
hoặc

bash
Copy
yarn install
Tạo file biến môi trường:

Tạo file .env ở thư mục gốc với nội dung:

env
Copy
VITE_OPENWEATHER_API_KEY=6f5146b1cd2be5ee3f6f1d7f3ffda826
Chạy dự án:

bash
Copy
npm run dev
hoặc

bash
Copy
yarn dev
Mở trình duyệt tại URL được hiển thị (thường là http://localhost:3000).

Cấu Trúc Dự Án
css
Copy
react-weather-app/
├── node_modules/                
├── public/                      
├── src/
│   ├── api/
│   │   └── weatherApi.ts        # Hàm gọi API (OpenWeatherMap)
│   ├── assets/
│   │   └── SettingsContext.tsx  # Context quản lý cài đặt (đơn vị nhiệt độ, …)
│   ├── components/
│   │   ├── Dashboard.tsx        # Dashboard chứa danh sách widget và SearchBar
│   │   ├── SearchBar.tsx        # Component tìm kiếm và gợi ý thành phố
│   │   ├── Widget.tsx           # Widget hiển thị thông tin thời tiết, dự báo, resize, drag
│   │   ├── WeatherModal.tsx     # Modal hiển thị thông tin chi tiết thời tiết
│   │   └── UnitToggle.tsx       # Chuyển đổi đơn vị nhiệt độ
│   ├── App.tsx                  # Ứng dụng gốc
│   ├── main.tsx                 # File entry point (React 18 createRoot)
│   └── index.css                # Styles toàn cục
├── .env                         # File biến môi trường (không commit lên Git)
├── .gitignore                   # File ignore, đã ignore file .env
├── package.json
└── vite.config.ts
Biến Môi Trường
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

Công Nghệ Sử Dụng
React – Thư viện xây dựng giao diện người dùng.

Vite – Công cụ bundler và phát triển nhanh.

TypeScript – Ngôn ngữ lập trình an toàn và có kiểu.

Axios – Thư viện để thực hiện các HTTP request.

React-Draggable – Hỗ trợ kéo – thả cho các widget.

CSS3 (Flexbox & Grid) – Xây dựng giao diện responsive.

Contributing
Nếu bạn muốn góp ý hay cải tiến dự án:

Fork repository.

Tạo branch mới cho các tính năng hoặc fix bug.

Thực hiện commit và gửi Pull Request.

Mọi ý kiến đóng góp sẽ được đánh giá và xem xét!

License
Phát hành theo MIT License.

Nếu có thắc mắc hoặc cần hỗ trợ, bạn có thể mở issue trên GitHub repository.

Chúc bạn thành công với React Weather App!
