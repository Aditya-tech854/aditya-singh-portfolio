// ====== mobile nav toggle ======
const navToggle = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');

if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('active'));
});

// ====== hero query typewriter ======
const queryCode = document.querySelector('.query-body code');
const typeCursor = document.getElementById('type-cursor');
const resultTable = document.getElementById('result-table');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealResultTable() {
  if (typeCursor) typeCursor.style.display = 'none';
  if (resultTable) resultTable.classList.add('show');
}

if (prefersReducedMotion) {
  revealResultTable();
} else if (queryCode && typeCursor && resultTable) {
  const fullMarkup = queryCode.innerHTML;
  const fullText = queryCode.textContent.replace('_', '');
  queryCode.innerHTML = '';
  let i = 0;

  function typeStep() {
    if (i <= fullText.length) {
      queryCode.textContent = fullText.slice(0, i);
      queryCode.appendChild(typeCursor);
      i++;
      setTimeout(typeStep, 18);
    } else {
      queryCode.innerHTML = fullMarkup;
      setTimeout(revealResultTable, 300);
    }
  }

  setTimeout(typeStep, 400);
}

// ====== scroll reveal + nav active state (IntersectionObserver) ======
const revealSections = document.querySelectorAll('.reveal, .hero');
const navAnchors = document.querySelectorAll('.nav-links a');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-animate');

      const id = entry.target.getAttribute('id');
      if (id) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const match = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (match) match.classList.add('active');
      }
    }
  });
}, { threshold: 0.25 });

revealSections.forEach(sec => revealObserver.observe(sec));

// ====== contact form (EmailJS) ======
const contactForm = document.getElementById('myForm');
const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    const fullname = contactForm.querySelector('[name="fullname"]')?.value || '';
    const email = contactForm.querySelector('[name="email"]')?.value || '';
    const message = contactForm.querySelector('[name="message"]')?.value || '';
    const now = new Date();

    const templateParams = {
      // Subject line
      subject: `New Portfolio Message from ${fullname}`,

      // Recipient info
      to_email: 'sing48933@gmail.com',
      to_name: 'Aditya Singh',

      // Sender Name aliases
      from_name: fullname,
      user_name: fullname,
      name: fullname,
      fullname: fullname,

      // Sender Email & Reply-To aliases
      from_email: email,
      user_email: email,
      reply_to: email,
      email: email,

      // Message content
      message: message,

      // Time & Date aliases
      time: now.toLocaleString(),
      date: now.toLocaleDateString(),
      send_time: now.toLocaleString()
    };

    emailjs.send('service_3g6bk42', 'template_fem1asa', templateParams, 'ltRX0BwjWmO1qJ28k')
      .then(function (response) {
        console.log('EmailJS Success:', response.status, response.text);
        alert("Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
      }, function (error) {
        console.error('EmailJS Error:', error);
        alert('Failed to send message. Error: ' + (error.text || JSON.stringify(error)));
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
  });
}
