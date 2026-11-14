import { useGeo } from "@/geo/geo-provider";
import { languages, type Language } from "@/i18n";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type LanguageSwitcherProps = {
  className?: string;
  onSelect?: () => void;
};

export function LanguageSwitcher({ className, onSelect }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const { country } = useGeo();
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const active: Language =
    languages.find((code) => resolved === code || resolved.startsWith(`${code}-`)) ?? "es";
  const visible: Language[] = country === "ES" ? ["es", "ca"] : languages.filter((code) => code !== "ca");

  const pick = (code: Language) => {
    void i18n.changeLanguage(code);
    onSelect?.();
  };

  return (
    <span className={cn("lang", className)} role="group" aria-label="Language">
      {visible.map((code, index) => (
        <span key={code}>
          {index > 0 ? " · " : null}
          {active === code ? (
            <b>{code.toUpperCase()}</b>
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
      ))}
    </span>
  );
}
