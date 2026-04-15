// script.js

// Sample App Data
const apps = [
  {
    id: 1,
    name: "CodeWave Editor",
    icon: "💻",
    description: "A sleek, open-source code editor with real-time collaboration.",
    version: "2.1.0",
    size: "45.2 MB",
    rating: 4.8,
    category: "development",
    downloads: 12500
  },
  {
    id: 2,
    name: "NeonNote Pro",
    icon: "📒",
    description: "Beautiful note-taking app with neon themes and encryption.",
    version: "1.8.3",
    size: "28.7 MB",
    rating: 4.6,
    category: "productivity",
    downloads: 9800
  },
  {
    id: 3,
    name: "PixelForge Studio",
    icon: "🎨",
    description: "Open-source graphic design tool for creators.",
    version: "3.0.1",
    size: "120.5 MB",
    rating: 4.9,
    category: "design",
    downloads: 15200
  },
  {
    id: 4,
    name: "Guardian Vault",
    icon: "🔐",
    description: "Secure password manager with zero-knowledge encryption.",
    version: "2.5.0",
    size: "34.1 MB",
    rating: 4.7,
    category: "security",
    downloads: 11300
  },
  {
    id: 5,
    name: "TaskFlow AI",
    icon: "🚀",
    description: "Smart task manager with AI-powered prioritization.",
    version: "1.9.4",
    size: "38.9 MB",
    rating: 4.5,
    category: "productivity",
    downloads: 8700
  },
  {
    id: 6,
    name: "DevKit Terminal",
    icon: "⚡",
    description: "Modern terminal with syntax themes and plugin support.",
    version: "4.2.1",
    size: "52.3 MB",
    rating: 4.9,
    category: "development",
    downloads: 14200
  }
];

// DOM Elements
const appsGrid = document.getElementById('apps-grid');
const latestGrid = document.getElementById('latest-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryCards = document.querySelectorAll('.category-card');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Generate Star Rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }

  if (hasHalf) {
    stars += '☆'; // Simplified half star
  }

  const remaining = 5 - Math.ceil(rating);
  for (let i = 0; i < remaining; i++) {
    stars += '☆';
  }

  return stars;
}

// Create App Card
function createAppCard(app) {
  const card = document.createElement('div');
  card.className = 'app-card';
  card.innerHTML = `
    <div class="app-icon">${app.icon}</div>
    <div class="app-info">
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <div class="app-meta">
        <span>v${app.version}</span>
        <span>${app.size}</span>
      </div>
      <div class="rating">${generateStars(app.rating)} <small>(${app.rating})</small></div>
      <button class="download-btn" onclick="downloadApp(${app.id})">Download</button>
    </div>
  `;
  return card;
}

// Render Apps
function renderApps(container, appList) {
  container.innerHTML = '';
  appList.forEach(app => {
    container.appendChild(createAppCard(app));
  });
}

// Initial Render
renderApps(appsGrid, apps);
renderApps(latestGrid, [...apps].reverse()); // Reverse order for "latest"

// Search Functionality
function filterApps(query) {
  const filtered = apps.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase()) ||
    app.description.toLowerCase().includes(query.toLowerCase())
  );
  renderApps(appsGrid, filtered);
}

searchBtn.addEventListener('click', () => {
  filterApps(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    filterApps(searchInput.value);
  }
});

// Category Filter
categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    const filtered = category === 'all' ? apps : apps.filter(app => app.category === category);
    renderApps(appsGrid, filtered);
    
    // Update active state
    categoryCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// Download Function
function downloadApp(id) {
  const app = apps.find(a => a.id === id);
  if (app) {
    alert(`🚀 Starting download: ${app.name} v${app.version}\nSize: ${app.size}\n\nThis is a legal open-source app. Thank you for supporting free software!`);
    // In a real app, this would trigger a file download
  }
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});
