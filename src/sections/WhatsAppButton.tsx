import { whatsappUrl } from "@/lib/links";
import { useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

const DISMISS_KEY = "lfa-wa-bubble-dismissed";

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* private mode / quota */
  }
}

function subscribeDismissed(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
  };
}

export function WhatsAppButton() {
  const { t } = useTranslation();
  const dismissedStored = useSyncExternalStore(subscribeDismissed, readDismissed, () => false);
  const [dismissedNow, setDismissedNow] = useState(false);
  const showBubble = !dismissedStored && !dismissedNow;

  const dismiss = () => {
    writeDismissed();
    setDismissedNow(true);
  };

  return (
    <div className="wa-wrap">
      {showBubble ? (
        <div className="wa-bubble" id="wa-bubble">
          <span>{t("footer.bubble")}</span>
          <button
            type="button"
            className="wa-bubble-close"
            aria-label={t("footer.closeBubble")}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              dismiss();
            }}
          >
            ×
          </button>
        </div>
      ) : null}
      <a
        className="wa"
        href={whatsappUrl(t("footer.waPrefill"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("footer.whatsapp")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 12 12 0 004.6 4 5.3 5.3 0 003.2.7 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" />
        </svg>
      </a>
    </div>
  );
}
