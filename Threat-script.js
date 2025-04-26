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

// Dashboard Data
const data = {
  '24h': {
    trends: [10, 20, 15, 30, 25, 40],
    attackTypes: { malware: 40, phishing: 30, ddos: 20, other: 10 },
    regions: { 'North America': 50, Europe: 30, Asia: 15, Other: 5 }
  },
  '7d': {
    trends: [50, 60, 55, 70, 65, 80],
    attackTypes: { malware: 35, phishing: 35, ddos: 25, other: 5 },
    regions: { 'North America': 45, Europe: 35, Asia: 10, Other: 10 }
  },
  '30d': {
    trends: [100, 120, 110, 130, 125, 140],
    attackTypes: { malware: 30, phishing: 40, ddos: 20, other: 10 },
    regions: { 'North America': 40, Europe: 30, Asia: 20, Other: 10 }
  }
};

// Chart Rendering
function drawLineChart(timeRange, threatType) {
  const svg = document.querySelector('#threat-trends .chart-svg');
  svg.innerHTML = '';
  let trends = data[timeRange].trends;
  if (threatType !== 'all') {
    trends = trends.map(v => v * (data[timeRange].attackTypes[threatType] / 100));
  }
  const maxY = Math.max(...trends);
  const points = trends.map((value, index) => {
    const x = (index / (trends.length - 1)) * 400;
    const y = 200 - (value / maxY) * 180;
    return `${x},${y}`;
  }).join(' ');
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('class', 'chart-path');
  polyline.setAttribute('points', points);
  svg.appendChild(polyline);
}

function drawPieChart(timeRange, threatType) {
  const svg = document.querySelector('#attack-types .chart-svg');
  svg.innerHTML = '';
  const types = threatType === 'all' ? data[timeRange].attackTypes : { [threatType]: 100 };
  let startAngle = 0;
  Object.entries(types).forEach(([key, value], index) => {
    const angle = (value / 100) * 360;
    const radians = (startAngle * Math.PI) / 180;
    const endRadians = ((startAngle + angle) * Math.PI) / 180;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = 100 + 80 * Math.cos(radians);
    const y1 = 100 + 80 * Math.sin(radians);
    const x2 = 100 + 80 * Math.cos(endRadians);
    const y2 = 100 + 80 * Math.sin(endRadians);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'chart-slice');
    path.setAttribute('d', `M100,100 L${x1},${y1} A80,80 0 ${largeArc},1 ${x2},${y2} Z`);
    path.setAttribute('fill', ['#00d4ff', '#007bff', '#00b0d8', '#005bb5'][index % 4]);
    svg.appendChild(path);
    startAngle += angle;
  });
}

function drawBarChart(timeRange, threatType) {
  const svg = document.querySelector('#regions .chart-svg');
  svg.innerHTML = '';
  const regions = threatType === 'all' ? data[timeRange].regions : { ...data[timeRange].regions };
  if (threatType !== 'all') {
    Object.keys(regions).forEach(key => regions[key] *= (data[timeRange].attackTypes[threatType] / 100));
  }
  const maxY = Math.max(...Object.values(regions));
  const barWidth = 80;
  Object.entries(regions).forEach(([key, value], index) => {
    const height = (value / maxY) * 180;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('class', 'chart-bar');
    rect.setAttribute('x', index * 100 + 10);
    rect.setAttribute('y', 200 - height);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', height);
    svg.appendChild(rect);
  });
}

// Filter Handling
const timeRangeSelect = document.getElementById('time-range');
const threatTypeSelect = document.getElementById('threat-type');

function updateCharts() {
  const timeRange = timeRangeSelect.value;
  const threatType = threatTypeSelect.value;
  drawLineChart(timeRange, threatType);
  drawPieChart(timeRange, threatType);
  drawBarChart(timeRange, threatType);
}

timeRangeSelect.addEventListener('change', updateCharts);
threatTypeSelect.addEventListener('change', updateCharts);

// Initial Render
updateCharts();

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