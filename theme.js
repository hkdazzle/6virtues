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
    const englishLabel = isDark ? "Light" : "Dark";
    const cantoneseLabel = isDark ? "亮色" : "暗色";
    if (label) {
      label.dataset.en = englishLabel;
      label.dataset.zh = cantoneseLabel;
      label.textContent = root.lang === "zh-HK" ? cantoneseLabel : englishLabel;
    }
    const actionLabel = isDark
      ? "Switch to light mode / 切換至亮色模式"
      : "Switch to dark mode / 切換至暗色模式";
    toggle.setAttribute("aria-label", actionLabel);
    toggle.title = actionLabel;
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
