// Navbar shrink on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

faders.forEach((section) => {
  observer.observe(section);
});

// Search functionality
const searchInput = document.querySelector('#searchInput');
if (searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      alert(`Searching for: ${searchInput.value}`);
      searchInput.value = '';
    }
  });
}

// Mock dashboard updates
const updateDashboard = () => {
  const activeThreats = document.querySelector('#active-threats');
  const globalIncidents = document.querySelector('#global-incidents');
  if (activeThreats && globalIncidents) {
    setInterval(() => {
      activeThreats.textContent = Math.floor(Math.random() * 100);
      globalIncidents.textContent = Math.floor(Math.random() * 200);
    }, 5000);
  }
};
updateDashboard();

// Contact form validation
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    contactForm.reset();
  });
}

// Career form validation
const careerForm = document.querySelector('#careerForm');
if (careerForm) {
  careerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Application submitted successfully!');
    careerForm.reset();
  });
}

// Login form validation
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('input[name="username"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;
    const loginError = document.querySelector('#loginError');
    
    if (username === 'agent' && password === 'secure123') {
      alert('Login successful! Welcome, Agent.');
      loginForm.reset();
      loginError.style.display = 'none';
    } else {
      loginError.style.display = 'block';
    }
  });
}
