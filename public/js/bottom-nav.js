(function () {
  const STYLE_ID = "ze-bottom-nav-styles";
  const ICONS = {
    home: '<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>',
    shop: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  };
  const ITEMS = [
    { key: "home", href: "/", label: "Home" },
    { key: "shop", href: "/my-shop.html", label: "My Shop" },
  ];

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .bottom-nav {
        position: fixed; left: 0; right: 0; bottom: 0; z-index: 120;
        display: flex; background: #111; border-top: 1px solid #222;
        padding: 8px 6px calc(8px + env(safe-area-inset-bottom, 0px));
      }
      body.ze-has-bottom-nav { padding-bottom: 72px; }
      .bottom-nav .nav-item {
        flex: 1; text-align: center; text-decoration: none; color: #9a9490;
        font-size: 10px; font-weight: 600; padding: 4px 2px; min-width: 0;
      }
      .bottom-nav .nav-item.active { color: #F5C518; }
      .bottom-nav .nav-icon {
        display: flex; align-items: center; justify-content: center; margin-bottom: 2px;
      }
      .bottom-nav .nav-icon svg {
        width: 21px; height: 21px; stroke: currentColor; fill: none;
        stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
      }
    `;
    document.head.appendChild(style);
  }

  function renderBottomNav(active) {
    injectStyles();
    document.body.classList.add("ze-has-bottom-nav");
    let mount = document.getElementById("bottomNav");
    if (!mount) {
      mount = document.createElement("nav");
      mount.id = "bottomNav";
      mount.setAttribute("aria-label", "Main");
      document.body.appendChild(mount);
    }
    mount.className = "bottom-nav";
    mount.innerHTML = ITEMS.map((item) => {
      const isActive = active && item.key === active;
      return `
        <a href="${item.href}" class="nav-item${isActive ? " active" : ""}">
          <div class="nav-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[item.key]}</svg></div>
          <div>${item.label}</div>
        </a>`;
    }).join("");
  }

  window.renderBottomNav = renderBottomNav;

  function boot() {
    if (!document.body.hasAttribute("data-nav-active")) return;
    renderBottomNav(document.body.dataset.navActive || null);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
