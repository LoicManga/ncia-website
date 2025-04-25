// Smooth Scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

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
const faders = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

faders.forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Basic Search Alert
const searchBox = document.querySelector('.search-box input');
searchBox.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    alert(`Searching for: ${searchBox.value}`);
    searchBox.value = '';
  }
});
