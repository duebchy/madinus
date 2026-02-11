import { siteContent } from "../content/site-content.js";

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function renderTimeline(items) {
  const root = document.querySelector("#timeline");
  if (!root || !Array.isArray(items)) return;

  root.innerHTML = items.map((item) => `
    <article class="timeline-item">
      <time datetime="${item.date}">${formatDate(item.date)}</time>
      <h3>
        ${item.detailsLink
          ? `<a class="timeline-title-link" href="${item.detailsLink}">${item.title}</a>`
          : `<span class="timeline-title-static">${item.title}</span>`}
      </h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderFacts(items) {
  const root = document.querySelector("#facts-list");
  if (!root || !Array.isArray(items)) return;

  root.innerHTML = items.map((item) => `
    <li class="fact-card">
      <strong>${item.title}</strong>
      <p>${item.text}</p>
    </li>
  `).join("");
}

function renderGallery(items) {
  const root = document.querySelector("#gallery-grid");
  if (!root || !Array.isArray(items)) return;

  root.innerHTML = items.map((item) => `
    <figure class="gallery-item">
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
    </figure>
  `).join("");
}

function setupRevealAnimation() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  targets.forEach((node) => observer.observe(node));
}

function init() {
  setText("[data-couple-names]", siteContent.coupleNames);
  setText("[data-hero-eyebrow]", siteContent.heroEyebrow);
  setText("[data-hero-lead]", siteContent.heroLead);
  setText("[data-anniversary-date]", siteContent.anniversaryDate);
  setText("[data-signature]", siteContent.signature);
  setText("[data-letter-text]", siteContent.letter);
  setText("#year", new Date().getFullYear().toString());

  renderTimeline(siteContent.timeline);
  renderFacts(siteContent.facts);
  renderGallery(siteContent.gallery);
  setupRevealAnimation();
}

init();
