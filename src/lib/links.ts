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
  logo: "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/LFA_transparent.png",
  capi: "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/CAPI.png",
  youtube: "https://youtube.com/@ligasfutbolamateur?si=J8pq9jfMqvleKlqI",
  pricing: "#pricing",
} as const;
