function startHere(role) {
  alert(`Welcome ${role}! Let's get started.`);
}

// Mode Toggle
const toggleBtn = document.getElementById("modeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", currentTheme); // Save theme to localStorage
});

// Responsive Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Filtering Logic
const tutorials = document.querySelectorAll(".tutorial-card");
const languageFilter = document.getElementById("languageFilter");
const difficultyFilter = document.getElementById("difficultyFilter");

languageFilter.addEventListener("change", filterCards);
difficultyFilter.addEventListener("change", filterCards);

function filterCards() {
  const lang = languageFilter.value;
  const diff = difficultyFilter.value;

  tutorials.forEach(card => {
    const matchLang = lang === "all" || card.dataset.lang === lang;
    const matchDiff = diff === "all" || card.dataset.level === diff;
    card.style.display = (matchLang && matchDiff) ? "block" : "none";
  });

  // Save preference
  localStorage.setItem("language", lang);
}

// User Progress Tracking System (using localStorage)
function saveProgress(tutorialId, status) {
  let progress = JSON.parse(localStorage.getItem("userProgress")) || {};
  progress[tutorialId] = status;
  localStorage.setItem("userProgress", JSON.stringify(progress));
}

function getProgress(tutorialId) {
  const progress = JSON.parse(localStorage.getItem("userProgress")) || {};
  return progress[tutorialId] || "not started";
}

// Bookmarking Functionality
function bookmarkTutorial(tutorialId) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (bookmarks.includes(tutorialId)) {
    bookmarks = bookmarks.filter(id => id !== tutorialId);
  } else {
    bookmarks.push(tutorialId);
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Code Editor
function runCode() {
  const code = document.getElementById("codeEditor").value;
  const iframe = document.getElementById("output");
  iframe.srcdoc = code;
}

// Form Validation for User Signup
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!email.match(/\S+@\S+\.\S+/)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  alert("Form submitted successfully!");
});

// Initial State Setup
window.addEventListener("DOMContentLoaded", () => {
  // Theme
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.add(theme);
  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";

  // Language Filter
  const savedLang = localStorage.getItem("language") || "all";
  languageFilter.value = savedLang;
  filterCards();

  // Simulated tutorial loading
  const tutorialSection = document.querySelector(".tutorials");
  const tutorialCards = Array.from(tutorialSection.querySelectorAll(".tutorial-card"));
  const loadingHTML = `<div class="loading">Loading tutorials...</div>`;

  tutorialSection.innerHTML = loadingHTML;
  setTimeout(() => {
    tutorialSection.innerHTML = tutorialCards.map(card => card.outerHTML).join("") || "<p>No tutorials found.</p>";
  }, 1000);
});
// Expand/Collapse Tutorial Cards
document.addEventListener("click", (e) => {
  const card = e.target.closest(".tutorial-card");
  if (!card) return;

  card.classList.toggle("expanded");
});
// Expand/Collapse tutorial cards
document.querySelectorAll(".tutorial-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("expanded");
  });
});




