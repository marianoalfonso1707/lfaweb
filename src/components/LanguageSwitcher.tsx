import { useGeo } from "@/geo/geo-provider";
import { languages, type Language } from "@/i18n";
import { localeHome, pageLocale } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type LanguageSwitcherProps = {
  className?: string;
  onSelect?: () => void;
};

function hrefFor(code: Language): string | null {
  if (code === "es") {
    return localeHome("es");
  }
  if (code === "pt") {
    return localeHome("pt");
  }
  return null;
}

export function LanguageSwitcher({ className, onSelect }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const { country } = useGeo();
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const pathLocale = pageLocale();
  const active: Language =
    pathLocale === "pt"
      ? "pt"
      : (languages.find((code) => resolved === code || resolved.startsWith(`${code}-`)) ?? "es");
  const visible: Language[] = country === "ES" ? ["es", "ca"] : languages.filter((code) => code !== "ca");

  const pick = (code: Language) => {
    void i18n.changeLanguage(code);
    onSelect?.();
  };

  return (
    <span className={cn("lang", className)} role="group" aria-label="Language">
      {visible.map((code, index) => {
        const href = hrefFor(code);
        return (
          <span key={code}>
            {index > 0 ? " · " : null}
            {active === code ? (
              <b>{code.toUpperCase()}</b>
            ) : href ? (
              <a href={href} hrefLang={code === "pt" ? "pt-BR" : "es"} onClick={onSelect}>
                {code.toUpperCase()}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  pick(code);
                }}
                aria-pressed={false}
                aria-label={code.toUpperCase()}
              >
                {code.toUpperCase()}
              </button>
            )}
          </span>
        );
      })}
    </span>
  );
}
