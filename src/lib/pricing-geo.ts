import { LINKS } from "@/lib/links";
import type { PricingRegion, TeamTier } from "@/lib/geo";

export type BillingId = "monthly" | "semiannual" | "annual";

export type GeoPlan = {
  id: BillingId;
  labelKey: string;
  amount: number | null;
  noteKey: string;
  saveKey: string;
  ctaKey: string;
  href: string;
};

export function currencyFor(region: PricingRegion): { code: string; suffix: boolean } {
  if (region === "EU") {
    return { code: "€", suffix: true };
  }
  if (region === "BR") {
    return { code: "R$", suffix: false };
  }
  if (region === "AR") {
    return { code: "", suffix: false };
  }
  return { code: "US$", suffix: false };
}

export function formatAmount(amount: number, region: PricingRegion): string {
  if (region === "EU") {
    return amount.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return String(Math.round(amount));
}

export function parseShownAmount(text: string): number {
  const normalized = text.replace(",", ".").replace(/[^\d.]/g, "");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function showsBillingToggle(region: PricingRegion): boolean {
  return region === "ROW" || region === "BR";
}

export function plansFor(region: PricingRegion, tier: TeamTier): GeoPlan[] {
  if (region === "AR") {
    return [
      {
        id: "monthly",
        labelKey: "pricing.arTitle",
        amount: null,
        noteKey: tier === "over30" ? "pricing.arNoteOver" : "pricing.arNoteUnder",
        saveKey: "",
        ctaKey: tier === "over30" ? "pricing.arCtaOver" : "pricing.arCtaUnder",
        href: LINKS.whatsapp,
      },
    ];
  }

  if (region === "EU") {
    return [
      {
        id: "monthly",
        labelKey: "pricing.monthly",
        amount: tier === "over30" ? 39.99 : 19.99,
        noteKey: "pricing.euroNote",
        saveKey: "",
        ctaKey: "pricing.cta",
        href: LINKS.signup,
      },
    ];
  }

  if (region === "BR") {
    const amounts =
      tier === "over30"
        ? { monthly: 99, semiannual: 80, annual: 65 }
        : { monthly: 49, semiannual: 40, annual: 35 };
    const notes =
      tier === "over30"
        ? {
            monthly: "pricing.brMonthlyNote",
            semiannual: "pricing.brSemiannualNoteOver",
            annual: "pricing.brAnnualNoteOver",
          }
        : {
            monthly: "pricing.brMonthlyNote",
            semiannual: "pricing.brSemiannualNoteUnder",
            annual: "pricing.brAnnualNoteUnder",
          };
    return cyclePlans(amounts, notes);
  }

  const amounts =
    tier === "over30"
      ? { monthly: 20, semiannual: 15, annual: 12 }
      : { monthly: 10, semiannual: 8, annual: 6 };
  const notes =
    tier === "over30"
      ? {
          monthly: "pricing.rowOverMonthlyNote",
          semiannual: "pricing.rowOverSemiannualNote",
          annual: "pricing.rowOverAnnualNote",
        }
      : {
          monthly: "pricing.monthlyNote",
          semiannual: "pricing.semiannualNote",
          annual: "pricing.annualNote",
        };
  const save =
    tier === "over30"
      ? { monthly: "", semiannual: "", annual: "" }
      : { monthly: "", semiannual: "pricing.semiannualSave", annual: "pricing.annualSave" };
  return cyclePlans(amounts, notes, save);
}

function cyclePlans(
  amounts: { monthly: number; semiannual: number; annual: number },
  notes: { monthly: string; semiannual: string; annual: string },
  save: { monthly: string; semiannual: string; annual: string } = {
    monthly: "",
    semiannual: "",
    annual: "",
  },
): GeoPlan[] {
  return [
    {
      id: "monthly",
      labelKey: "pricing.monthly",
      amount: amounts.monthly,
      noteKey: notes.monthly,
      saveKey: save.monthly,
      ctaKey: "pricing.cta",
      href: LINKS.signup,
    },
    {
      id: "semiannual",
      labelKey: "pricing.semiannual",
      amount: amounts.semiannual,
      noteKey: notes.semiannual,
      saveKey: save.semiannual,
      ctaKey: "pricing.cta",
      href: LINKS.signup,
    },
    {
      id: "annual",
      labelKey: "pricing.annual",
      amount: amounts.annual,
      noteKey: notes.annual,
      saveKey: save.annual,
      ctaKey: "pricing.cta",
      href: LINKS.signup,
    },
  ];
}
