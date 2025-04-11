$(document).ready(function() {
  // DOM Manipulation: Set footer year
  $('#year').text(new Date().getFullYear());

  // DOM Manipulation: Disable active navbar link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $('.navbar-nav a').each(function() {
    if ($(this).attr('href') === currentPath) {
      $(this).addClass('disabled').attr('aria-disabled', 'true');
    }
  });

  // jQuery Effect: Fade in Home section elements
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    $('#home .fade-in').hide().each(function(index) {
      $(this).delay(200 * index).fadeIn(1000);
    });

    // AJAX: Load library stats for About section
    $.ajax({
      url: 'library-stats.json',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        $('#aboutText').text(data.description);
        const statsHtml = `
          <div class="stat">Total Books: ${data.totalBooks}</div>
          <div class="stat">Members: ${data.totalMembers}</div>
          <div class="stat">Active Loans: ${data.activeLoans}</div>
        `;
        $('#libraryStats').html(statsHtml).hide().fadeIn(1000);
      },
      error: function() {
        $('#aboutText').text('Failed to load library information.');
      }
    });

    // DOM Manipulation & AJAX: Book search
    $('#bookSearch').on('input', function() {
      const query = $(this).val().toLowerCase();
      if (query.length < 2) {
        $('#searchResults').empty();
        return;
      }
      $.ajax({
        url: 'books.json',
        method: 'GET',
        dataType: 'json',
        success: function(books) {
          const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
          );
          let resultsHtml = '';
          if (filteredBooks.length === 0) {
            resultsHtml = '<p class="text-muted">No books found.</p>';
          } else {
            filteredBooks.forEach(book => {
              resultsHtml += `
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author: ${book.author}</p>
                    <p class="card-text">ISBN: ${book.isbn}</p>
                  </div>
                </div>
              `;
            });
          }
          $('#searchResults').html(resultsHtml).hide().fadeIn(500);
        },
        error: function() {
          $('#searchResults').html('<p class="text-danger">Error loading books.</p>').hide().fadeIn(500);
        }
      });
    });
  }

  // jQuery Effect: Toggle chat window
  $('.chat-btn').on('click', function() {
    $('#chatWindow').slideToggle(300);
  });

  // DOM Manipulation: Handle chat submission
  $('.chat-window button').on('click', function() {
    const message = $('.chat-window textarea').val().trim();
    if (message) {
      $('.chat-window p').text('Thank you! Your message: "' + message + '" has been sent.');
      $('.chat-window textarea').val('');
      setTimeout(() => {
        $('.chat-window p').text('How can we assist you?');
      }, 3000);
    }
  });

  // AJAX & DOM Manipulation: Login form submission
  $('#loginForm').on('submit', function(event) {
    event.preventDefault();
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val();
    const messageDiv = $('#formMessage');

    // Email validation: Must match a basic email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password validation: At least 6 characters, at least one number
    const passwordRegex = /^(?=.*\d).{6,}$/;

    if (!emailRegex.test(email)) {
      messageDiv.text('Please enter a valid email address (e.g., user@domain.com).').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      return;
    }

    if (!passwordRegex.test(password)) {
      messageDiv.text('Password must be at least 6 characters long and contain at least one number.').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      return;
    }

    $.ajax({
      url: 'login.json',
      method: 'POST',
      data: JSON.stringify({ email, password }),
      contentType: 'application/json',
      success: function(response) {
        messageDiv.text(response.message).addClass('text-success').removeClass('text-danger').hide().fadeIn(500);
        $('#loginForm')[0].reset();
        setTimeout(() => {
          window.location.href = 'index.html'; // Redirect to index.html
        }, 1000);
      },
      error: function() {
        messageDiv.text('Login failed. Please try again.').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      }
    });
  });

  // AJAX & DOM Manipulation: Contact form submission
  $('#contactForm').on('submit', function(event) {
    event.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const message = $('#message').val().trim();
    const messageDiv = $('#formMessage');

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length < 2) {
      messageDiv.text('Name must be at least 2 characters long.').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      return;
    }
    if (!emailRegex.test(email)) {
      messageDiv.text('Please enter a valid email address (e.g., user@domain.com).').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      return;
    }
    if (message.length < 5) {
      messageDiv.text('Message must be at least 5 characters long.').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      return;
    }

    // AJAX request
    $.ajax({
      url: 'contact.json',
      method: 'POST',
      data: JSON.stringify({ name, email, message }),
      contentType: 'application/json',
      success: function(response) {
        messageDiv.text(response.message).addClass('text-success').removeClass('text-danger').hide().fadeIn(500);
        $('#contactForm')[0].reset();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('AJAX Error:', textStatus, errorThrown);
        messageDiv.text('Error sending message. Please try again later.').addClass('text-danger').removeClass('text-success').hide().fadeIn(500);
      }
    });
  });

  // jQuery Effect: Welcome banner (Home only)
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    setTimeout(() => {
      const banner = $('<div>')
        .addClass('alert alert-info alert-dismissible fade show fixed-top')
        .css('z-index', '2000')
        .html(`
          Welcome to our Library Management System!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `);
      $('body').prepend(banner);
      banner.hide().fadeIn(1000);
    }, 1000);
  }
});