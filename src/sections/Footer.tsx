import logo from "@/assets/logo.png";
import { LINKS } from "@/lib/links";
import { localeHome, pageLocale } from "@/lib/site";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="wrap">
        <span className="footer-brand">
          <a className="logo" href={localeHome(pageLocale())} aria-label={t("nav.logoAria")}>
            <img src={logo} alt={t("nav.logoAlt")} width={129} height={96} loading="lazy" decoding="async" />
          </a>
          {t("footer.copyright")}
        </span>
        <span>
          <a href={LINKS.privacy}>{t("footer.privacy")}</a>
          {" · "}
          {t("footer.email")}
        </span>
      </div>
    </footer>
  );
}
