(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const icon = toggle.querySelector(".theme-toggle__icon");
  const label = toggle.querySelector(".theme-toggle__label");
  const colorMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, save = false) {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    icon.textContent = isDark ? "☀" : "☾";
    const englishLabel = isDark ? "Dark" : "Light";
    const cantoneseLabel = isDark ? "暗色" : "亮色";
    if (label) {
      label.dataset.en = englishLabel;
      label.dataset.zh = cantoneseLabel;
      label.textContent = root.lang === "zh-HK" ? cantoneseLabel : englishLabel;
    }
    const modeLabel = isDark ? "Dark mode / 暗色模式" : "Light mode / 亮色模式";
    toggle.setAttribute("aria-label", modeLabel);
    toggle.title = modeLabel;
    if (colorMeta) colorMeta.content = isDark ? "#0B1220" : "#173B70";

    if (save) {
      try {
        localStorage.setItem("liushan-care-theme", isDark ? "dark" : "light");
      } catch (_error) {
        // Theme changes still work when browser storage is unavailable.
      }
    }
  }

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
  toggle.addEventListener("click", () => {
    applyTheme(toggle.getAttribute("aria-pressed") === "true" ? "light" : "dark", true);
  });
})();
