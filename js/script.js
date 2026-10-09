document.addEventListener("DOMContentLoaded", () => {

  // 1. Welcome Modal & Theme Setup
  const welcomeModal = document.getElementById("welcome-modal");
  if (sessionStorage.getItem("hasVisited")) welcomeModal?.classList.add("hidden");
  
  document.getElementById("enter-site-btn")?.addEventListener("click", () => {
    welcomeModal.classList.add("hidden");
    sessionStorage.setItem("hasVisited", "true");
  });

  const themeBtn = document.getElementById("theme-toggle-btn");
  const applyTheme = (theme) => {
    document.body.className = theme === "light" ? "theme-light" : "theme-dark";
    document.getElementById("theme-icon").textContent = theme === "light" ? "🌙" : "☀️";
    document.getElementById("theme-text").textContent = theme === "light" ? "Dark Mode" : "Light Mode";
  };
  
  themeBtn?.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    const nextTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
  applyTheme(localStorage.getItem("theme") || "dark");

  // 2. Mobile Drawer Navigation Toggle & Auto-Close on Click
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const sidebarNav = document.getElementById("sidebar-nav");
  
  toggleBtn?.addEventListener("click", () => sidebarNav.classList.toggle("is-open"));

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      sidebarNav.classList.remove("is-open");
    });
  });

  // 3. Projects Filter
  const projectsData = [
    { title: "JavaFX Application", category: "project", desc: "Modular OOP JavaFX desktop UI." },
    { title: "Responsive Portfolio", category: "project", desc: "Personal interactive showcase." },
    { title: "Automotive Diagnostics", category: "project", desc: "Troubleshooting & ECU analysis." },
    { title: "Combinational Logic", category: "skill", desc: "Designing digital Boolean circuits." },
    { title: "Computer Architecture", category: "coursework", desc: "CPU execution cycles & assembly." },
    { title: "Statistical Analysis", category: "coursework", desc: "Quantitative data modeling." }
  ];

  const grid = document.getElementById("projects-grid");
  const searchInput = document.getElementById("filter-search-input");
  let activeCategory = "all";

  function renderProjects() {
    const query = searchInput.value.toLowerCase().trim();
    grid.innerHTML = "";
    
    const filtered = projectsData.filter(item => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchQuery = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    document.getElementById("no-results-msg")?.classList.toggle("hidden", filtered.length > 0);

    filtered.forEach(item => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `<span class="label">${item.category.toUpperCase()}</span><h3>${item.title}</h3><p>${item.desc}</p>`;
      grid.appendChild(card);
    });
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      activeCategory = e.target.dataset.category;
      renderProjects();
    });
  });

  searchInput?.addEventListener("input", renderProjects);
  document.getElementById("filter-reset-btn")?.addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "all";
    renderProjects();
  });
  renderProjects();

  // 4. Study Hours Calculator
  document.getElementById("study-calc-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const hours = parseFloat(document.getElementById("hours-per-day").value);
    const days = parseInt(document.getElementById("days-per-week").value);

    if (hours > 0 && days >= 1 && days <= 7) {
      const weekly = hours * days;
      document.getElementById("res-weekly-hours").textContent = weekly.toFixed(1);
      document.getElementById("res-monthly-hours").textContent = (weekly * 4).toFixed(1);
      document.getElementById("res-semester-hours").textContent = (weekly * 16).toFixed(1);
      document.getElementById("calc-results").classList.remove("hidden");
    }
  });

  // 5. Gallery
  const galleryItems = [
    { src: "photos/photo1.jpeg", alt: "Photo 1", caption: "My first day wearing specs" },
    { src: "photos/photo2.jpeg", alt: "Photo 2", caption: "Reporting for my first day at work." },
    { src: "photos/photo3.jpeg", alt: "Photo 3", caption: "A good day with my brothers." }
  ];

  const galleryContainer = document.getElementById("gallery-container");
  const lightbox = document.getElementById("gallery-lightbox");
  let currentIndex = 0;

  galleryItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "photo-card";
    div.innerHTML = `<img src="${item.src}" alt="${item.alt}"><p>${item.caption}</p>`;
    div.onclick = () => {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.remove("hidden");
    };
    galleryContainer?.appendChild(div);
  });

  function updateLightbox() {
    const item = galleryItems[currentIndex];
    document.getElementById("lightbox-img").src = item.src;
    document.getElementById("lightbox-caption").textContent = item.caption;
    document.getElementById("lightbox-counter").textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  }

  document.getElementById("lightbox-close")?.addEventListener("click", () => lightbox.classList.add("hidden"));
  document.getElementById("lightbox-prev")?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  });
  document.getElementById("lightbox-next")?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  });

  // 6. Contact Form
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      document.getElementById("summary-name").textContent = name;
      document.getElementById("summary-email").textContent = email;
      document.getElementById("summary-topic").textContent = document.getElementById("topic").value;
      document.getElementById("summary-message").textContent = message;
      document.getElementById("contact-summary-card").classList.remove("hidden");
    }
  });
});