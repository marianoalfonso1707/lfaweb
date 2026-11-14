import { marquee } from "@/lib/motion";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const COPIES = 12;

export function Ticker() {
  const { t } = useTranslation();
  const label = `${t("ticker.tag")} ${t("ticker.phrase")} ${t("ticker.phraseBold")}`;

  return (
    <div className="ticker" role="status" aria-label={label}>
      <div className="live">
        <i />
        {t("ticker.tag")}
      </div>
      <div className="track" style={{ animationDuration: `${String(marquee.ticker)}s` }} aria-hidden="true">
        {Array.from({ length: COPIES }, (_, index) => (
          <Fragment key={index}>
            <span>
              {t("ticker.phrase")} <b>{t("ticker.phraseBold")}</b>
            </span>
            <span>●</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
