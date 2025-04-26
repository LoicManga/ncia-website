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

// Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.querySelector('.counter-number').innerText;
    const increment = target / 200;

    if (count < target) {
      counter.querySelector('.counter-number').innerText = Math.ceil(count + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.querySelector('.counter-number').innerText = target.toLocaleString();
    }
  };

  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCounter();
      counterObserver.disconnect();
    }
  }, { threshold: 0.5 });

  counterObserver.observe(counter);
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
}

// Cyber Grid Animation
const svg = document.getElementById('cyber-grid');
const nodesGroup = svg.querySelector('.nodes');
const nodeCount = 20;

function createNodes() {
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    node.setAttribute('class', 'node');
    node.setAttribute('r', '4');
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

// Resize SVG
window.addEventListener('resize', () => {
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
});