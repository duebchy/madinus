// Force fresh content reload on each page refresh during local static development.
const { siteContent } = await import(`../content/site-content.js?v=${Date.now()}`);

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node && typeof value === "string" && value.trim() !== "") {
    node.textContent = value;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function parseDateInput(dateValue) {
  if (typeof dateValue !== "string") return null;

  const isoMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return date;
    }
  }

  const ruMatch = dateValue.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ruMatch) {
    const day = Number(ruMatch[1]);
    const month = Number(ruMatch[2]);
    const year = Number(ruMatch[3]);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return date;
    }
  }

  return null;
}

function formatDate(dateValue) {
  const date = parseDateInput(dateValue);
  if (!date) return dateValue;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function renderTimeline(items) {
  const root = document.querySelector("#timeline");
  if (!root || !Array.isArray(items)) return;

  root.innerHTML = items.map((item) => {
    const dateRaw = typeof item?.date === "string" ? item.date : "";
    const dateText = escapeHtml(formatDate(dateRaw));
    const title = escapeHtml(item?.title || "Событие");
    const text = escapeHtml(item?.text || "Добавь описание этого события.");
    const detailsLink = typeof item?.detailsLink === "string" ? item.detailsLink : "";

    return `
    <article class="timeline-item">
      <time datetime="${escapeHtml(dateRaw)}">${dateText}</time>
      <h3>
        ${detailsLink
          ? `<a class="timeline-title-link" href="${escapeHtml(detailsLink)}">${title}</a>`
          : `<span class="timeline-title-static">${title}</span>`}
      </h3>
      <p>${text}</p>
    </article>
  `;
  }).join("");
}

function renderFacts(items) {
  const root = document.querySelector("#facts-list");
  if (!root || !Array.isArray(items)) return;

  root.innerHTML = items.map((item) => `
    <li class="fact-card">
      <strong>${escapeHtml(item?.title || "Факт")}</strong>
      <p>${escapeHtml(item?.text || "Добавь текст факта.")}</p>
    </li>
  `).join("");
}

function renderGallery(items) {
  const root = document.querySelector("#gallery-grid");
  if (!root || !Array.isArray(items)) return;

  root.innerHTML = items.map((item) => `
    <figure class="gallery-item">
      <img src="${escapeHtml(item?.src || "")}" alt="${escapeHtml(item?.alt || "Фото")}" loading="lazy">
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
