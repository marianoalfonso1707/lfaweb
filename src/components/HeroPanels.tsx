import { useTranslation } from "react-i18next";

export function HeroPanels() {
  const { t } = useTranslation();

  return (
    <div className="stage" id="stage">
      <div className="panel p1" data-depth="18">
        <div className="hd">
          {t("hero.liveMatchday")}{" "}
          <b>
            ● {t("hero.liveBadge")}
          </b>
        </div>
        <div className="row live">
          <span>{t("hero.matches.m1Home")}</span>
          <span className="s" id="liveScore">
            {t("hero.liveScoreStart")}
          </span>
          <span className="r">{t("hero.matches.m1Away")}</span>
        </div>
        <div className="row">
          <span>{t("hero.matches.m2Home")}</span>
          <span className="s">{t("hero.matches.m2Score")}</span>
          <span className="r">{t("hero.matches.m2Away")}</span>
        </div>
        <div className="row">
          <span>{t("hero.matches.m3Home")}</span>
          <span className="s">{t("hero.matches.m3Score")}</span>
          <span className="r">{t("hero.matches.m3Away")}</span>
        </div>
      </div>
      <div className="panel p2" data-depth="30">
        <div className="hd">
          {t("hero.standingsTitle")} <b>{t("hero.standingsZone")}</b>
        </div>
        <table className="tbl">
          <tbody>
            <tr>
              <td className="pos">{t("hero.standingsPos")}</td>
              <td>{t("hero.standingsTeam")}</td>
              <td>{t("hero.standingsPts")}</td>
            </tr>
            <tr>
              <td className="pos">1</td>
              <td>{t("hero.standings.r1Team")}</td>
              <td>{t("hero.standings.r1Pts")}</td>
            </tr>
            <tr>
              <td className="pos">2</td>
              <td>{t("hero.standings.r2Team")}</td>
              <td>{t("hero.standings.r2Pts")}</td>
            </tr>
            <tr>
              <td className="pos">3</td>
              <td>{t("hero.standings.r3Team")}</td>
              <td>{t("hero.standings.r3Pts")}</td>
            </tr>
            <tr>
              <td className="pos">4</td>
              <td>{t("hero.standings.r4Team")}</td>
              <td>{t("hero.standings.r4Pts")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="panel p3" data-depth="10">
        <div className="hd">
          {t("hero.aiTitle")} <b id="aiState">{t("hero.aiReading")}</b>
        </div>
        <div className="sheet sheet-sm">
          <div className="paper" id="aiPaper">
            <i />
            <span className="hand">{t("hero.sheetHandwriting")}</span>
          </div>
          <div className="out" id="aiOut">
            <div>
              <span>{t("hero.aiResult")}</span>
              <span className="y">{t("hero.aiResultValue")}</span>
            </div>
            <div>
              <span>{t("hero.aiGoal")}</span>
              <span>{t("hero.aiGoalValue")}</span>
            </div>
            <div>
              <span>{t("hero.aiYellow")}</span>
              <span>{t("hero.aiYellowValue")}</span>
            </div>
            <div>
              <span>{t("hero.aiRed")}</span>
              <span>{t("hero.aiRedValue")}</span>
            </div>
          </div>
        </div>
        <div id="aiDone">{t("hero.aiDone")}</div>
      </div>
    </div>
  );
}
