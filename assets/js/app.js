function getPageKey() {
  const page = document.body.dataset.page;
  return page || "home";
}

function getBasePath() {
  return getPageKey() === "home" ? "." : "..";
}

function resolveLink(linkName) {
  const url = LINKS[linkName];

  if (!url) {
    return "#";
  }

  if (url.startsWith("./")) {
    return `${getBasePath()}${url.slice(1)}`;
  }

  return url;
}

function isExternalLink(url) {
  return /^https?:\/\//.test(url);
}

function isDesktop() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function trackClick(linkName) {
  const targetUrl = resolveLink(linkName);
  const data = {
    link: linkName,
    url: targetUrl,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    referrer: document.referrer || "direct"
  };

  console.log("Clique registrado:", data);

  if (typeof gtag === "function") {
    gtag("event", "link_click", {
      link_name: linkName,
      page_path: window.location.pathname,
      link_url: targetUrl
    });
  }

  // Futuro: integrar este evento a um endpoint quando houver backend.
  if (targetUrl === "#") {
    return;
  }

  if (isExternalLink(targetUrl) && isDesktop()) {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = targetUrl;
}

function createLinkButton(item) {
  const button = document.createElement("a");
  const targetUrl = resolveLink(item.key);
  button.className = "link-button";
  button.href = targetUrl;

  if (isExternalLink(targetUrl) && isDesktop()) {
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  }

  button.dataset.link = item.key;
  button.innerHTML = `
    <span class="link-icon" aria-hidden="true">${item.icon}</span>
    <span class="link-content">
      <span class="link-title">${item.title}</span>
      <span class="link-description">${item.description}</span>
    </span>
    <span class="link-arrow" aria-hidden="true">›</span>
  `;

  button.addEventListener("click", (event) => {
    event.preventDefault();
    trackClick(item.key);
  });

  return button;
}

function renderLinks() {
  const container = document.querySelector("[data-links]") || document.querySelector("#main-links");
  const pageKey = getPageKey();
  const items = LINK_CONTENT[pageKey] || LINK_CONTENT.home;

  if (!container) {
    return;
  }

  container.innerHTML = "";
  items.forEach((item) => container.appendChild(createLinkButton(item)));
}

function setupBackButtons() {
  document.querySelectorAll("[data-back-home]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "../index.html";
    });
  });
}

renderLinks();
setupBackButtons();
