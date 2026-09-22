/**
 * EmailJS Configuration and Contact Form Handler
 * 
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Thay YOUR_PUBLIC_KEY bằng Public Key từ EmailJS Dashboard
 * 2. Thay YOUR_SERVICE_ID bằng Service ID của bạn
 * 3. Thay YOUR_TEMPLATE_ID bằng Template ID của bạn
 * 4. Include script này vào index.html TRƯỚC </body>
 */

// ============================================
// CẤU HÌNH - THAY ĐỔI CÁC GIÁ TRỊ NÀY
// ============================================
const EMAILJS_CONFIG = {
    publicKey: 'XeKMzwPdLHEWyT2BF',      // Lấy từ EmailJS Dashboard > Account > General
    serviceId: 'service_a466a5a',       // Lấy từ EmailJS Dashboard > Email Services
    templateId: 'template_usr7a9i'      // Lấy từ EmailJS Dashboard > Email Templates
};

// ============================================
// KHỞI TẠO EMAILJS
// ============================================
(function() {
    // Khởi tạo EmailJS với Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized successfully');
    } else {
        console.error('❌ EmailJS library not loaded. Please add the SDK script tag.');
    }
})();

// ============================================
// XỬ LÝ CONTACT FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('⚠️ Contact form not found on this page');
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Kiểm tra EmailJS đã được load chưa
        if (typeof emailjs === 'undefined') {
            showStatus('error', 'EmailJS is not loaded. Please refresh the page and try again.');
            return;
        }

        // Kiểm tra config đã được thiết lập chưa
        if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY' || 
            EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
            EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID') {
            showStatus('error', 'EmailJS is not configured. Please update the configuration in emailjs-config.js');
            return;
        }

        // Lấy các elements
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const statusDiv = document.getElementById('form-status');
        
        // Disable button và hiển thị loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.style.cursor = 'not-allowed';
        
        // Ẩn status cũ nếu có
        if (statusDiv) {
            statusDiv.style.display = 'none';
        }

        // Gửi email qua EmailJS
        emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, contactForm)
            .then(function(response) {
                console.log('✅ Email sent successfully!', response.status, response.text);
                
                // Hiển thị thông báo thành công
                showStatus('success', 
                    '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Add success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ffd5, #0084ff)';
                
                // Reset button sau 3 giây
                setTimeout(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
                
            })
            .catch(function(error) {
                console.error('❌ Failed to send email:', error);
                
                // Hiển thị thông báo lỗi
                let errorMessage = '<i class="fas fa-exclamation-circle"></i> Failed to send message. ';
                
                if (error.text) {
                    errorMessage += `Error: ${error.text}`;
                } else {
                    errorMessage += 'Please try again or contact me directly via email/social media.';
                }
                
                showStatus('error', errorMessage);
                
                // Reset button
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                submitBtn.style.background = 'linear-gradient(135deg, #960029, #e31b54)';
                
                // Reset button sau 3 giây
                setTimeout(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            })
            .finally(function() {
                // Enable button trở lại
                submitBtn.disabled = false;
                submitBtn.style.cursor = 'pointer';
            });
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Hiển thị thông báo status
 * @param {string} type - 'success' hoặc 'error'
 * @param {string} message - Nội dung thông báo
 */
function showStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    
    if (!statusDiv) {
        console.warn('Status div not found');
        return;
    }
    
    // Reset classes
    statusDiv.className = '';
    
    // Set class dựa trên type
    if (type === 'success') {
        statusDiv.className = 'alert alert-success';
    } else if (type === 'error') {
        statusDiv.className = 'alert alert-danger';
    }
    
    // Set message và hiển thị
    statusDiv.innerHTML = message;
    statusDiv.style.display = 'block';
    
    // Scroll to status message
    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto hide sau 8 giây
    setTimeout(function() {
        statusDiv.style.opacity = '0';
        setTimeout(function() {
            statusDiv.style.display = 'none';
            statusDiv.style.opacity = '1';
        }, 500);
    }, 8000);
}

/**
 * Validate form data trước khi gửi
 * @param {FormData} formData
 * @returns {boolean}
 */
function validateForm(formData) {
    const name = formData.get('from_name');
    const email = formData.get('from_email');
    const message = formData.get('message');
    
    if (!name || name.trim().length < 2) {
        showStatus('error', 'Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showStatus('error', 'Please enter a valid email address');
        return false;
    }
    
    if (!message || message.trim().length < 10) {
        showStatus('error', 'Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

/**
 * Kiểm tra email hợp lệ
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// DEBUG MODE (Chỉ dùng khi development)
// ============================================
const DEBUG_MODE = false; // Set thành true để bật debug logs

if (DEBUG_MODE) {
    console.log('🔧 EmailJS Debug Mode');
    console.log('Config:', EMAILJS_CONFIG);
    console.log('EmailJS loaded:', typeof emailjs !== 'undefined');
}
