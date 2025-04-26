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