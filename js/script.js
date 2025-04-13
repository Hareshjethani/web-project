$(document).ready(function() {
   
    new WOW().init();
    
   
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
    
    
    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                if ($(this).data('target') == 4.8) {
                    $(this).text(now.toFixed(1));
                } else {
                    $(this).text(Math.ceil(now));
                }
            }
        });
    });
    
    
    $.ajax({
        url: 'js/library-data.json',
        dataType: 'json',
        success: function(data) {
            let featuresHtml = '';
            data.features.forEach(function(feature, index) {
                featuresHtml += `
                    <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="${0.1 + (index * 0.1)}s">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="${feature.icon}"></i>
                            </div>
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                        </div>
                    </div>
                `;
            });
            $('#features-container').html(featuresHtml);
            
          
            let testimonialsHtml = '';
            data.testimonials.forEach(function(testimonial, index) {
                testimonialsHtml += `
                    <div class="col-md-6 wow fadeInUp" data-wow-delay="${0.1 + (index * 0.2)}s">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                ${testimonial.content}
                            </div>
                            <div class="testimonial-author">
                                <img src="${testimonial.image}" alt="${testimonial.name}">
                                <div class="author-info">
                                    <h5>${testimonial.name}</h5>
                                    <p>${testimonial.position}, ${testimonial.organization}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('#testimonials-container').html(testimonialsHtml);
        },
        error: function() {
            $('#features-container').html('<div class="col-12 text-center"><p>Failed to load features. Please try again later.</p></div>');
        }
    });
    
   
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
      
        if (this.checkValidity() === false) {
            e.stopPropagation();
            $(this).addClass('was-validated');
            return;
        }
        
       
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };
        
        
        console.log('Form submitted:', formData);
        
        
        $('#formSuccess').removeClass('d-none');
        $('#contactForm')[0].reset();
        $('#contactForm').removeClass('was-validated');
        
       
        setTimeout(function() {
            $('#formSuccess').addClass('d-none');
        }, 5000);
    });
    
   
    $('.btn-login').click(function(e) {
        e.preventDefault();
        $('#loginModal').modal('show');
    });
    
    
    $('#registerLink').click(function(e) {
        e.preventDefault();
        $('#loginModal').modal('hide');
        alert('Registration form would appear here in a real application.');
    });
    
   
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
       
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        
        
        console.log('Login attempt:', email, password);
        
        
        alert('Login successful! (This is a demo)');
        $('#loginModal').modal('hide');
        $('#loginForm')[0].reset();
    });
    
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });
    
    
    $('body').append('<a href="#" class="scroll-to-top"><i class="fas fa-arrow-up"></i></a>');
    
    $('.scroll-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, '300');
    });
});