# 📧 HƯỚNG DẪN TÍCH HỢP EMAILJS VÀO PORTFOLIO

## 🎯 TỔNG QUAN
EmailJS cho phép gửi email trực tiếp từ JavaScript mà không cần backend server.

---

## 📋 BƯỚC 1: THIẾT LẬP TRÊN EMAILJS.COM

### 1.1 Đăng ký tài khoản
1. Truy cập: https://www.emailjs.com/
2. Click **Sign Up** (hoặc Sign Up Free)
3. Đăng ký với email của bạn
4. Xác nhận email

### 1.2 Tạo Email Service
1. Vào **Dashboard** → **Email Services**
2. Click **Add New Service**
3. Chọn **Gmail** (hoặc provider bạn dùng)
4. Đăng nhập với Gmail account
5. Cho phép EmailJS truy cập
6. **LƯU LẠI SERVICE_ID** (ví dụ: `service_abc123`)

### 1.3 Tạo Email Template
1. Vào **Dashboard** → **Email Templates**
2. Click **Create New Template**
3. Điền thông tin template:

**Template Name:** `portfolio_contact_form`

**Subject:** 
```
New Contact from Portfolio - {{from_name}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #e31b54; margin-bottom: 20px;">📧 New Message from Portfolio</h2>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">From:</strong>
            <p style="margin: 5px 0; color: #666;">{{from_name}}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Email:</strong>
            <p style="margin: 5px 0; color: #666;">{{from_email}}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Phone:</strong>
            <p style="margin: 5px 0; color: #666;">{{phone}}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Subject:</strong>
            <p style="margin: 5px 0; color: #666;">{{subject}}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Message:</strong>
            <div style="margin: 10px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #e31b54; color: #333;">
                {{message}}
            </div>
        </div>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
            Sent from your Portfolio Website | maivannhieu.com
        </p>
    </div>
</div>
```

4. Click **Save**
5. **LƯU LẠI TEMPLATE_ID** (ví dụ: `template_xyz789`)

### 1.4 Lấy Public Key
1. Vào **Dashboard** → **Account** → **General**
2. Tìm **Public Key** (hoặc API Keys)
3. **LƯU LẠI PUBLIC_KEY** (ví dụ: `YOUR_PUBLIC_KEY_HERE`)

---

## 📝 BƯỚC 2: CẬP NHẬT CODE TRONG PORTFOLIO

### 2.1 Thêm EmailJS SDK vào index.html

Thêm script này TRƯỚC thẻ `</head>`:

```html
<!-- EmailJS SDK -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

### 2.2 Khởi tạo EmailJS

Thêm script này TRƯỚC thẻ `</body>`:

```javascript
<script>
    // Khởi tạo EmailJS với Public Key của bạn
    emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Thay YOUR_PUBLIC_KEY_HERE bằng key thực
</script>
```

### 2.3 Cập nhật Contact Form

Form hiện tại cần các trường sau:
```html
<input type="text" name="from_name" placeholder="Your Name" required>
<input type="email" name="from_email" placeholder="Your Email" required>
<input type="tel" name="phone" placeholder="Phone (optional)">
<input type="text" name="subject" placeholder="Subject" required>
<textarea name="message" placeholder="Your Message" required></textarea>
```

### 2.4 Thêm JavaScript xử lý form

```javascript
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button[type="submit"]');
    const btnText = btn.innerHTML;
    const statusDiv = document.getElementById('form-status');
    
    // Disable button và hiển thị loading
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Gửi email qua EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Hiển thị thông báo thành công
            statusDiv.style.display = 'block';
            statusDiv.className = 'alert alert-success';
            statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.';
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Ẩn thông báo sau 5 giây
            setTimeout(function() {
                statusDiv.style.display = 'none';
            }, 5000);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Hiển thị thông báo lỗi
            statusDiv.style.display = 'block';
            statusDiv.className = 'alert alert-danger';
            statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or contact me directly.';
        })
        .finally(function() {
            // Enable button trở lại
            btn.disabled = false;
            btn.innerHTML = btnText;
        });
});
```

---

## 🎨 BƯỚC 3: THÊM CSS CHO THÔNG BÁO

Thêm CSS cho alert messages:

```css
#form-status {
    padding: 15px;
    border-radius: 4px;
    margin-top: 20px;
    font-family: 'Rajdhani', sans-serif;
    animation: fadeIn 0.5s;
}

.alert-success {
    background: rgba(0, 255, 213, 0.1);
    border: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
}

.alert-danger {
    background: rgba(227, 27, 84, 0.1);
    border: 1px solid var(--accent-red);
    color: var(--accent-red);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

---

## 🔧 BƯỚC 4: THAY THẾ CÁC GIÁ TRỊ

Trong code JavaScript, thay thế:

1. `YOUR_PUBLIC_KEY_HERE` → Public Key từ EmailJS
2. `YOUR_SERVICE_ID` → Service ID từ bước 1.2
3. `YOUR_TEMPLATE_ID` → Template ID từ bước 1.3

**Ví dụ:**
```javascript
emailjs.init('xyzABC123def456'); // Public Key

emailjs.sendForm('service_abc123', 'template_xyz789', this) // Service ID & Template ID
```

---

## 📊 BƯỚC 5: TEST

1. Mở portfolio trong browser
2. Điền form contact
3. Click **Send Message**
4. Kiểm tra:
   - ✅ Button hiển thị "Sending..."
   - ✅ Thông báo thành công xuất hiện
   - ✅ Form được reset
   - ✅ Email đến inbox của bạn

---

## 💡 TIPS & TRICKS

### Rate Limits (Free Plan)
- **200 emails/tháng** (free)
- **70,000 emails/tháng** (paid)

### Bảo mật Public Key
- Public Key có thể hiển thị trên client-side
- EmailJS có rate limiting & domain restriction
- Nên thêm domain whitelist trong Dashboard

### Tùy chỉnh template
- Có thể thêm nhiều trường tùy ý: `{{field_name}}`
- Dùng HTML để format đẹp
- Test template với **Send Test Email** button

### Auto-reply
1. Tạo template thứ 2 cho auto-reply
2. Gửi 2 emails: 1 cho bạn, 1 cho người gửi
```javascript
emailjs.sendForm('service_id', 'template_1', form); // To you
emailjs.sendForm('service_id', 'template_2', form); // Auto-reply to sender
```

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: "Service not found"
→ Kiểm tra lại SERVICE_ID

### Lỗi 2: "Template not found"  
→ Kiểm tra lại TEMPLATE_ID

### Lỗi 3: "Invalid public key"
→ Kiểm tra lại PUBLIC_KEY hoặc khởi tạo `emailjs.init()`

### Lỗi 4: Email không đến
→ Kiểm tra spam folder
→ Verify email service connection

### Lỗi 5: CORS error
→ EmailJS tự động handle CORS, không cần config

---

## 📞 HỖ TRỢ

- EmailJS Docs: https://www.emailjs.com/docs/
- Support: support@emailjs.com
- Dashboard: https://dashboard.emailjs.com/

---

## ✅ CHECKLIST

- [ ] Đã tạo tài khoản EmailJS
- [ ] Đã tạo Email Service
- [ ] Đã tạo Email Template
- [ ] Đã lấy Public Key
- [ ] Đã thêm EmailJS SDK vào HTML
- [ ] Đã khởi tạo EmailJS với Public Key
- [ ] Đã cập nhật form với đúng name attributes
- [ ] Đã thêm JavaScript handler
- [ ] Đã thêm CSS cho alerts
- [ ] Đã thay thế SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY
- [ ] Đã test gửi email thành công

---

**Chúc bạn thành công! 🚀**
