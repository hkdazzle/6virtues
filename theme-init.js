(() => {
  const root = document.documentElement;
  try {
    const savedTheme = localStorage.getItem("liushan-care-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : (prefersDark ? "dark" : "light");
  } catch (_error) {
    root.dataset.theme = "light";
  }
})();
