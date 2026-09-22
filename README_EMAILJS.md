# 📧 EmailJS Integration - Portfolio Contact Form

## 📦 Files đã tạo

```
WebPortfolio/
├── EMAILJS_SETUP_GUIDE.md              # Hướng dẫn chi tiết từng bước
├── QUICK_INTEGRATION.md                 # Hướng dẫn nhanh tích hợp vào index.html
├── README_EMAILJS.md                    # File này (tổng quan)
└── portfolio-page-main/
    ├── emailjs-config.js                # File config EmailJS (QUAN TRỌNG!)
    ├── contact-form-example.html        # Demo form hoàn chỉnh
    └── index.html                       # (cần cập nhật theo hướng dẫn)
```

---

## 🚀 QUICK START (3 PHÚT)

### 1️⃣ Đăng ký EmailJS
- Truy cập: https://www.emailjs.com/
- Sign up → Verify email

### 2️⃣ Thiết lập trên EmailJS Dashboard
- **Email Service:** Add New Service → Chọn Gmail → Lấy `Service ID`
- **Email Template:** Create Template → Thiết kế email → Lấy `Template ID`
- **Public Key:** Account → General → Copy `Public Key`

### 3️⃣ Cấu hình trong code
Mở `portfolio-page-main/emailjs-config.js` và thay 3 giá trị:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',      // ← Paste Public Key
    serviceId: 'YOUR_SERVICE_ID',       // ← Paste Service ID
    templateId: 'YOUR_TEMPLATE_ID'      // ← Paste Template ID
};
```

### 4️⃣ Tích hợp vào index.html

**Thêm trong `<head>`:**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

**Thêm trước `</body>`:**
```html
<script src="emailjs-config.js"></script>
```

**Cập nhật form:**
- Đảm bảo `<form id="contact-form">`
- Các input phải có `name="from_name"`, `name="from_email"`, `name="message"`, etc.
- Thêm `<div id="form-status"></div>` để hiển thị thông báo

### 5️⃣ Test
- Mở `index.html` → Contact section
- Điền form → Send
- ✅ Kiểm tra email inbox

---

## 📚 DOCUMENTATION

### Chi tiết từng bước
→ Xem **`EMAILJS_SETUP_GUIDE.md`**
- Hướng dẫn đăng ký tài khoản
- Tạo Email Service
- Tạo Email Template với HTML đẹp
- Lấy API keys
- Xử lý lỗi

### Tích hợp nhanh
→ Xem **`QUICK_INTEGRATION.md`**
- Copy/paste code snippets
- Checklist từng bước
- Common issues & fixes

### Demo hoàn chỉnh
→ Mở **`contact-form-example.html`**
- Form đầy đủ chức năng
- Cyber theme UI
- Có validation
- Responsive

---

## 🎨 FEATURES

✅ **Gửi email trực tiếp từ browser** (không cần backend)  
✅ **Validation form** với thông báo lỗi rõ ràng  
✅ **Loading state** khi đang gửi  
✅ **Success/Error messages** với animation  
✅ **Auto-reset form** sau khi gửi thành công  
✅ **Responsive design** phù hợp với cyber theme  
✅ **Console logging** để debug dễ dàng  

---

## 🔧 TEMPLATE VARIABLES

Trong EmailJS template, sử dụng các biến sau:

| Variable | Form Field | Description |
|----------|------------|-------------|
| `{{from_name}}` | `name="from_name"` | Tên người gửi |
| `{{from_email}}` | `name="from_email"` | Email người gửi |
| `{{phone}}` | `name="phone"` | Số điện thoại (optional) |
| `{{subject}}` | `name="subject"` | Tiêu đề tin nhắn |
| `{{message}}` | `name="message"` | Nội dung tin nhắn |

---

## 🎯 EMAIL TEMPLATE EXAMPLE

```html
<div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px;">
        <h2 style="color: #e31b54;">📧 New Contact from Portfolio</h2>
        
        <p><strong>From:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
        <p><strong>Phone:</strong> {{phone}}</p>
        <p><strong>Subject:</strong> {{subject}}</p>
        
        <div style="padding: 15px; background: #f9f9f9; border-left: 4px solid #e31b54;">
            {{message}}
        </div>
    </div>
</div>
```

---

## 💡 TIPS

### Rate Limits
- **Free:** 200 emails/tháng
- **Paid:** 70,000 emails/tháng

### Security
- Public Key an toàn để hiển thị client-side
- EmailJS có built-in rate limiting
- Nên enable domain whitelist

### Customization
- Thay đổi màu sắc trong CSS
- Chỉnh sửa text trong `emailjs-config.js`
- Tùy chỉnh template HTML trong EmailJS Dashboard

---

## 🐛 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| "Service not found" | Kiểm tra `serviceId` trong config |
| "Template not found" | Kiểm tra `templateId` trong config |
| "Invalid public key" | Kiểm tra `publicKey` hoặc `emailjs.init()` |
| Email không đến | Check spam folder, verify service connection |
| Button không loading | Check console, verify `emailjs-config.js` included |

---

## 📞 SUPPORT

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Dashboard:** https://dashboard.emailjs.com/
- **Support Email:** support@emailjs.com

---

## ✅ CHECKLIST

Copy checklist này để theo dõi tiến độ:

```
[ ] Đã đăng ký tài khoản EmailJS
[ ] Đã tạo Email Service và lấy Service ID
[ ] Đã tạo Email Template và lấy Template ID
[ ] Đã lấy Public Key từ Dashboard
[ ] Đã cấu hình emailjs-config.js với 3 keys
[ ] Đã thêm EmailJS SDK vào <head>
[ ] Đã include emailjs-config.js trước </body>
[ ] Đã cập nhật form với đúng name attributes
[ ] Đã thêm CSS cho alert messages
[ ] Đã test gửi email thành công
[ ] Đã kiểm tra email trong inbox
```

---

## 🎉 KẾT QUẢ

Sau khi hoàn thành, bạn sẽ có:

✅ Contact form hoạt động hoàn hảo  
✅ Nhận email ngay lập tức khi có người liên hệ  
✅ UI đẹp mắt, phù hợp với cyber theme  
✅ UX tốt với loading states và notifications  
✅ Không cần backend server  
✅ Miễn phí (200 emails/tháng)  

---

**Happy Coding! 🚀**

Nếu cần hỗ trợ, hãy check `EMAILJS_SETUP_GUIDE.md` hoặc `QUICK_INTEGRATION.md`
