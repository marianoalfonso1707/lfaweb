import i18n from "@/i18n";

function applyHeroCopy(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    if (el.id === "aiState" || el.id === "liveScore") {
      return;
    }
    const key = el.dataset.i18n;
    if (!key) {
      return;
    }
    el.textContent = i18n.t(key);
  });
}

export function bindHeroCopy(root: HTMLElement) {
  applyHeroCopy(root);
  const onLanguage = () => {
    applyHeroCopy(root);
  };
  i18n.on("languageChanged", onLanguage);
  return () => {
    i18n.off("languageChanged", onLanguage);
  };
}
