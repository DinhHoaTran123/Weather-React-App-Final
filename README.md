React Weather App
React Weather App là một ứng dụng thời tiết widget-based được xây dựng bằng React và Vite với TypeScript. Ứng dụng cho phép người dùng tìm kiếm địa điểm, hiển thị thông tin thời tiết hiện tại và dự báo, tự động cập nhật dữ liệu, kéo thả widget và nhiều tính năng nâng cao khác, nhằm tạo ra một trải nghiệm thời tiết trực quan và hiện đại.


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

Tính Năng
Tìm kiếm thông minh:

Cho phép người dùng nhập tên thành phố và nhận danh sách gợi ý trực tiếp (sử dụng API Geocoding của OpenWeatherMap).

Chọn thành phố từ danh sách gợi ý để thêm widget thời tiết.

Hiển thị thời tiết:

Hiển thị thông tin thời tiết hiện tại với nhiệt độ, cảm giác, và mô tả thời tiết.

Hiển thị dự báo thời tiết theo giờ cho ngày hiện tại.

Cho phép chuyển đổi sang hiển thị dự báo 5 ngày (min/max nhiệt độ theo từng ngày).

Tính năng nâng cao:

Auto Refresh: Dữ liệu được tự động cập nhật mỗi 10 phút.

Kéo - Thả Widget: Giao diện dạng dashboard cho phép người dùng kéo thả vị trí các widget.

Resize Widget: Cho phép người dùng thay đổi kích thước widget bằng cách kéo góc widget.

Chuyển đổi đơn vị nhiệt độ: Người dùng có thể chuyển đổi giữa Celsius và Fahrenheit.

Hiển thị chi tiết thông tin: Khi click vào widget sẽ mở ra modal chi tiết hiển thị nhiều thông tin bổ sung (tốc độ gió, độ ẩm, áp suất, thời gian mặt trời mọc/lặn…).

Mapping mô tả thời tiết: Cho phép chuyển đổi một số mô tả ngắn gọn (ví dụ: "mist") sang nội dung chi tiết hơn (ví dụ: "Chi tiết thời tiết").

Demo
(Nếu có hosting hoặc video demo, bạn có thể chèn link demo vào đây)

Cài Đặt
Yêu Cầu
Node.js (phiên bản 14.x trở lên)

NPM / Yarn / PNPM

Hướng Dẫn Cài Đặt
Clone dự án:

bash
Copy
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

Tạo một file .env ở thư mục gốc dự án với nội dung:

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
Mở trình duyệt tại http://localhost:3000 (hoặc URL được hiển thị trong terminal) để xem ứng dụng.

Cấu Trúc Dự Án
css
Copy
react-weather-app/
├── node_modules/                
├── public/                      
├── src/
│   ├── api/
│   │   └── weatherApi.ts        # Các hàm gọi API (OpenWeatherMap)
│   ├── assets/
│   │   └── SettingsContext.tsx  # Context lưu trữ cài đặt (đơn vị nhiệt độ, ...) 
│   ├── components/
│   │   ├── Dashboard.tsx        # Dashboard chứa danh sách widget và SearchBar
│   │   ├── SearchBar.tsx        # Component tìm kiếm và gợi ý thành phố
│   │   ├── Widget.tsx           # Widget hiển thị dữ liệu thời tiết
│   │   ├── WeatherModal.tsx     # Modal hiển thị thông tin chi tiết
│   │   └── UnitToggle.tsx       # Chuyển đổi đơn vị nhiệt độ
│   ├── App.tsx                  # Ứng dụng gốc
│   ├── main.tsx                 # File entry point, sử dụng React 18 createRoot
│   └── index.css                # File CSS toàn cục
├── .env                         # File biến môi trường (không commit lên Git)
├── .gitignore                   # File ignore (đã ignore file .env)
├── package.json
└── vite.config.ts
Biến Môi Trường
VITE_OPENWEATHER_API_KEY:
API key của OpenWeatherMap.
Lưu ý: File .env nên được thêm vào .gitignore để bảo mật thông tin.

Hướng Dẫn Sử Dụng
Tìm kiếm:
Nhập tên thành phố vào ô tìm kiếm, chọn từ danh sách gợi ý để thêm widget hiển thị thông tin thời tiết.

Widget:
Mỗi widget hiển thị thông tin thời tiết hiện tại, dự báo theo giờ hoặc 5 ngày, và cho phép:

Kéo - Thả vị trí.

Resize widget bằng cách kéo góc dưới bên phải.

Nhấn vào header để mở modal hiển thị chi tiết thời tiết.

Sử dụng nút "Làm mới" để cập nhật dữ liệu ngay lập tức.

Đơn Vị Nhiệt Độ:
Sử dụng nút chuyển đổi để thay đổi giữa Celsius và Fahrenheit.

Công Nghệ Sử Dụng
React: Thư viện UI xây dựng giao diện người dùng.

Vite: Công cụ bundler nhanh, hỗ trợ TypeScript và hot reload.

TypeScript: Ngôn ngữ lập trình an toàn và mạnh mẽ.

Axios: Thư viện xử lý HTTP requests.

React-Draggable: Hỗ trợ kéo-thả widget.

CSS3 & Flexbox, CSS Grid: Xây dựng giao diện responsive.

Contributing
Nếu bạn muốn góp ý hay cải tiến dự án, hãy fork repository, tạo branch và gửi Pull Request. Mọi ý kiến đóng góp đều được hoan nghênh!

License
Phát hành theo MIT License.
(Bạn có thể thay đổi license tùy theo dự án của mình.)

