/**
 * EmailJS Contact Form Handler
 * Portfolio Website - Mai Van Nhieu
 */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'XeKMzwPdLHEWyT2BF',
    serviceId: 'service_a466a5a',
    templateId: 'template_usr7a9i'
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized');
    } else {
        console.error('❌ EmailJS SDK not loaded');
    }
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (typeof emailjs === 'undefined') {
            showStatus('error', 'EmailJS is not loaded. Please refresh the page.');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const statusDiv = document.getElementById('form-status');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.style.cursor = 'not-allowed';
        
        if (statusDiv) {
            statusDiv.style.display = 'none';
        }

        // Send email via EmailJS
        emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, contactForm)
            .then(function(response) {
                console.log('✅ Email sent:', response.status);
                
                showStatus('success', 
                    '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.');
                
                contactForm.reset();
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ffd5, #0084ff)';
                
                setTimeout(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
                
            })
            .catch(function(error) {
                console.error('❌ Failed to send:', error);
                
                let errorMessage = '<i class="fas fa-exclamation-circle"></i> Failed to send message. ';
                errorMessage += error.text ? `Error: ${error.text}` : 'Please try again or contact me directly.';
                
                showStatus('error', errorMessage);
                
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                submitBtn.style.background = 'linear-gradient(135deg, #960029, #e31b54)';
                
                setTimeout(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.style.cursor = 'pointer';
            });
    });
});

// Helper: Show status message
function showStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    
    if (!statusDiv) return;
    
    statusDiv.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
    statusDiv.innerHTML = message;
    statusDiv.style.display = 'block';
    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    setTimeout(function() {
        statusDiv.style.opacity = '0';
        setTimeout(function() {
            statusDiv.style.display = 'none';
            statusDiv.style.opacity = '1';
        }, 500);
    }, 8000);
}
