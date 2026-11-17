export const WHATSAPP_NUMBER = "5491144169568";

export function whatsappUrl(prefill?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base;
}

export const LINKS = {
  admin: "https://admin.ligasfutbolamateur.com",
  signup: "https://admin.ligasfutbolamateur.com/login?signup=1",
  whatsapp: whatsappUrl(),
  privacy: "/privacy.html",
  logo: "/logo.png",
  capi: "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/CAPI.png",
  youtube: "https://www.youtube.com/@ligasfutbolamateur",
  pricing: "#pricing",
} as const;
