import logo from "@/assets/logo.png";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useGeo } from "@/geo/geo-provider";
import { LINKS } from "@/lib/links";
import { navScrollBlurPx } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#journey", key: "nav.how" },
  { href: "#features", key: "nav.features" },
  { href: "#app", key: "nav.app" },
  { href: "#pricing", key: "nav.pricing" },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const { hideTrial } = useGeo();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > navScrollBlurPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <nav id="nav" className={cn(scrolled && "scrolled")}>
      <div className="wrap">
        <a className="logo" href="/" aria-label={t("nav.logoAria")}>
          <img src={logo} alt={t("nav.logoAlt")} width={129} height={96} decoding="async" />
        </a>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{t(link.key)}</a>
            </li>
          ))}
        </ul>
        <div className="right">
          <LanguageSwitcher />
          <a className="btn btn-g" href={LINKS.admin} target="_blank" rel="noopener noreferrer">
            {t("nav.login")}
          </a>
          {hideTrial ? null : (
            <a className="btn btn-y" href="#pricing">
              {t("nav.trial")}
            </a>
          )}
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => {
              setOpen((value) => !value);
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div id={menuId} className={cn("nav-drawer", open && "open")}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
        <LanguageSwitcher onSelect={close} />
        <a
          className="btn btn-g"
          href={LINKS.admin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          {t("nav.login")}
        </a>
      </div>
    </nav>
  );
}
