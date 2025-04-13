document.addEventListener('DOMContentLoaded', function() {
    
    const authModal = new bootstrap.Modal(document.getElementById('authModal'), {
        backdrop: 'static',
        keyboard: false
    });
    
    const authModalTrigger = document.getElementById('authModalTrigger');
    
    
    if (authModalTrigger) {
        authModalTrigger.addEventListener('click', function() {
            const modalElement = document.getElementById('authModal');
            modalElement.style.display = 'block';
            setTimeout(() => {
                modalElement.classList.add('show');
                document.querySelector('.auth-modal-content').classList.add('show');
            }, 10);
            
           
            document.querySelectorAll('.auth-form-group').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            });
        });
    }
    
   
    document.getElementById('authModal').addEventListener('hide.bs.modal', function() {
        const modalContent = document.querySelector('.auth-modal-content');
        modalContent.classList.remove('show');
        
        setTimeout(() => {
            document.getElementById('authModal').classList.remove('show');
            document.getElementById('authModal').style.display = 'none';
        }, 300);
    });
    
    
    const validateField = (field, isValid) => {
        const formGroup = field.closest('.auth-form-group');
        if (!formGroup) return;
        
        if (isValid) {
            formGroup.classList.remove('is-invalid');
            formGroup.classList.add('is-valid');
        } else {
            formGroup.classList.remove('is-valid');
            formGroup.classList.add('is-invalid');
            
            
            formGroup.style.animation = 'shake 0.5s';
            setTimeout(() => {
                formGroup.style.animation = '';
            }, 500);
        }
    };
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .is-valid .auth-form-control {
            border-color: #28a745;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        .is-invalid .auth-form-control {
            border-color: #dc3545;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        .is-invalid label {
            color: #dc3545;
        }
        .is-valid label {
            color: #28a745;
        }
    `;
    document.head.appendChild(style);
    
    
    document.querySelectorAll('.auth-form-control').forEach(field => {
        field.addEventListener('input', function() {
            if (this.checkValidity()) {
                validateField(this, true);
            }
        });
        
        field.addEventListener('blur', function() {
            validateField(this, this.checkValidity());
        });
    });
    
    
    const passwordField = document.getElementById('signupPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    if (passwordField && confirmPasswordField) {
        const validatePasswordMatch = () => {
            if (passwordField.value && confirmPasswordField.value) {
                const isValid = passwordField.value === confirmPasswordField.value;
                validateField(confirmPasswordField, isValid);
            }
        };
        
        passwordField.addEventListener('input', validatePasswordMatch);
        confirmPasswordField.addEventListener('input', validatePasswordMatch);
    }
});