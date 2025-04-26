// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll Animations
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

animateElements.forEach(el => observer.observe(el));

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
}

// Cyber Grid Animation
const svg = document.getElementById('cyber-grid');
const nodesGroup = svg.querySelector('.nodes');
const nodeCount = 15;

function createNodes() {
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    node.setAttribute('class', 'node');
    node.setAttribute('r', '5');
    node.setAttribute('cx', Math.random() * 100 + '%');
    node.setAttribute('cy', Math.random() * 100 + '%');
    nodesGroup.appendChild(node);
  }
}

function animateNodes() {
  const nodes = document.querySelectorAll('.node');
  nodes.forEach((node, index) => {
    setTimeout(() => {
      node.style.animation = `nodePulse 2s ease infinite ${Math.random()}s`;
    }, index * 200);
  });
}

createNodes();
animateNodes();

// Password Strength Meter
const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strength-meter');


function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length > 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  strengthMeter.className = '';
  if (strength <= 1) {
    strengthMeter.classList.add('weak');
  } else if (strength <= 3) {
    strengthMeter.classList.add('medium');
  } else {
    strengthMeter.classList.add('strong');
  }
}

passwordInput.addEventListener('input', () => {
  checkPasswordStrength(passwordInput.value);
});

// Login Form Validation
const loginForm = document.getElementById('login-form');
const errorMessage = loginForm.querySelector('.form-error');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('#email').value.trim();
  const password = loginForm.querySelector('#password').value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage.textContent = 'Please enter a valid email address.';
    errorMessage.style.display = 'block';
    return;
  }

  if (password.length < 8) {
    errorMessage.textContent = 'Password must be at least 8 characters long.';
    errorMessage.style.display = 'block';
    return;
  }

  errorMessage.style.display = 'none';
  alert('Login successful! (This is a demo.)');
  loginForm.reset();
  strengthMeter.className = '';
});

// Newsletter Form Simulation
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input').value;
  if (email) {
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  }
});

