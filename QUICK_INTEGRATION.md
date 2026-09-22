# ⚡ TÍCH HỢP EMAILJS VÀO INDEX.HTML - HƯỚNG DẪN NHANH

## 🎯 BƯỚC 1: THÊM VÀO `<head>` SECTION

Tìm thẻ `</head>` trong `index.html` và thêm TRƯỚC nó:

```html
<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

---

## 🎯 BƯỚC 2: CẬP NHẬT CONTACT FORM

Tìm form trong section Contact (dòng ~2175) và đảm bảo các `name` attributes đúng:

```html
<form id="contact-form">
    <div class="row">
        <div class="col-md-6">
            <input type="text" name="from_name" class="form-control" placeholder="Your Name" required>
        </div>
        <div class="col-md-6">
            <input type="email" name="from_email" class="form-control" placeholder="Your Email" required>
        </div>
        <div class="col-md-6">
            <input type="tel" name="phone" class="form-control" placeholder="Phone (Optional)">
        </div>
        <div class="col-md-6">
            <input type="text" name="subject" class="form-control" placeholder="Subject" required>
        </div>
        <div class="col-12">
            <textarea name="message" class="form-control" placeholder="Your Message" required></textarea>
        </div>
        <div class="col-12 mt-3">
            <button type="submit" class="btn-cyber w-100">
                <i class="fas fa-paper-plane"></i> Send Message
            </button>
        </div>
        <div class="col-12 mt-3">
            <div id="form-status" style="display: none;"></div>
        </div>
    </div>
</form>
```

**QUAN TRỌNG:** Các `name` attributes phải khớp với template variables:
- `from_name` → `{{from_name}}`
- `from_email` → `{{from_email}}`
- `phone` → `{{phone}}`
- `subject` → `{{subject}}`
- `message` → `{{message}}`

---

## 🎯 BƯỚC 3: THÊM CSS CHO ALERTS

Tìm phần `<style>` trong `<head>` và thêm vào cuối:

```css
/* EmailJS Status Messages */
#form-status {
    padding: 15px 20px;
    border-radius: 4px;
    margin-top: 20px;
    font-family: 'Rajdhani', sans-serif;
    animation: fadeInStatus 0.5s ease;
    transition: opacity 0.5s ease;
}

.alert-success {
    background: rgba(0, 255, 213, 0.15);
    border: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
}

.alert-success i {
    margin-right: 8px;
}

.alert-danger {
    background: rgba(227, 27, 84, 0.15);
    border: 1px solid var(--accent-red);
    color: var(--accent-red);
}

.alert-danger i {
    margin-right: 8px;
}

@keyframes fadeInStatus {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## 🎯 BƯỚC 4: THÊM JAVASCRIPT

Tìm thẻ `</body>` cuối file và thêm TRƯỚC nó:

```html
<!-- EmailJS Configuration -->
<script src="emailjs-config.js"></script>
```

---

## 🎯 BƯỚC 5: CẤU HÌNH EMAILJS-CONFIG.JS

Mở file `emailjs-config.js` và thay đổi 3 giá trị:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',      // Thay bằng Public Key của bạn
    serviceId: 'YOUR_SERVICE_ID',       // Thay bằng Service ID của bạn
    templateId: 'YOUR_TEMPLATE_ID'      // Thay bằng Template ID của bạn
};
```

### Lấy các giá trị này ở đâu?

1. **Public Key:**
   - Dashboard → Account → General → Public Key
   - VD: `xyzABC123def456`

2. **Service ID:**
   - Dashboard → Email Services → Chọn service → Service ID
   - VD: `service_abc123`

3. **Template ID:**
   - Dashboard → Email Templates → Chọn template → Template ID
   - VD: `template_xyz789`

---

## 🎯 BƯỚC 6: TEST

1. Mở `index.html` trong browser
2. Scroll xuống Contact section
3. Điền form và click "Send Message"
4. Kiểm tra:
   - ✅ Button hiển thị "Sending..."
   - ✅ Thông báo success xuất hiện
   - ✅ Form được reset
   - ✅ Email đến inbox

---

## 📋 SUMMARY - CÁC FILES CẦN CÓ

```
portfolio-page-main/
├── index.html (đã cập nhật)
├── emailjs-config.js (file mới)
└── contact-form-example.html (demo - optional)
```

---

## 🔍 CHECKLIST

- [ ] Đã thêm EmailJS SDK script vào `<head>`
- [ ] Đã cập nhật form với đúng `name` attributes
- [ ] Đã thêm CSS cho alert messages
- [ ] Đã include `emailjs-config.js` trước `</body>`
- [ ] Đã cấu hình `publicKey`, `serviceId`, `templateId` trong `emailjs-config.js`
- [ ] Đã tạo Email Service trên EmailJS
- [ ] Đã tạo Email Template trên EmailJS
- [ ] Đã test gửi email thành công

---

## 🚨 COMMON ISSUES

**1. Form không gửi được:**
→ Mở Console (F12) và xem error message
→ Kiểm tra lại SERVICE_ID và TEMPLATE_ID

**2. Email không đến:**
→ Kiểm tra spam folder
→ Kiểm tra Email Service connection trên Dashboard

**3. Button không loading:**
→ Kiểm tra xem đã include `emailjs-config.js` chưa
→ Kiểm tra Console có lỗi không

---

## ✅ DONE!

Nếu làm đúng các bước trên, form contact sẽ hoạt động perfect! 🎉

Questions? Check `EMAILJS_SETUP_GUIDE.md` để biết thêm chi tiết.
