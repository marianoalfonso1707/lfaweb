export type League = {
  name: string;
  shortName?: string;
  logoUrl: string;
  href: string;
};

export function leagueShortName(league: League): string {
  return league.shortName ?? league.name;
}

export const leagues: League[] = [
  {
    name: "Torneos Mendoza",
    shortName: "Mendoza",
    href: "https://app.ligasfutbolamateur.com/torneos-mendoza",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/765e3bf5-be9e-49e0-97c3-3ec4e4d5b46f_200x200",
  },
  {
    name: "Copa Rey del Sur",
    shortName: "Copa Rey",
    href: "https://app.ligasfutbolamateur.com/copa-rey-del-sur-3",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/9c94d1bb-a4d3-4c65-9307-a927c79fac77_200x200",
  },
  {
    name: "Torneos Del Sur",
    shortName: "Del Sur",
    href: "https://app.ligasfutbolamateur.com/torneos-del-sur",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/0027bf00-b928-4f7d-981f-37d409e36d41_200x200",
  },
  {
    name: "M90 Deportivo SL",
    shortName: "M90",
    href: "https://app.ligasfutbolamateur.com/m90-deportivo-san-luis",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/3e241736-041a-4203-bc20-ab43b30a90e1_200x200",
  },
  {
    name: "La Villa",
    shortName: "La Villa",
    href: "https://app.ligasfutbolamateur.com/la-villa-2",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/99e559be-2a26-4463-a4de-791f64bba4d8_200x200",
  },
  {
    name: "Soccer Pro F11",
    shortName: "Soccer Pro",
    href: "https://app.ligasfutbolamateur.com/soccer-pro-f11",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/7a2efc37-15cd-4328-b7a3-3b81434916ba_200x200",
  },
  {
    name: "Futbol City",
    shortName: "Futbol City",
    href: "https://app.ligasfutbolamateur.com/futbol-city",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/564d2eef-ec05-4312-94a1-669d559e32a7",
  },
  {
    name: "La Estancia Super 8",
    shortName: "La Estancia",
    href: "https://app.ligasfutbolamateur.com/la-estancia-super-8",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/7a8378bb-2659-4961-8006-234abc166f9f_200x200",
  },
  {
    name: "Liga Intercolegial de Flag Football",
    shortName: "Flag Football",
    href: "https://app.ligasfutbolamateur.com/liga-intercolegial-de-flag-football",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/ad774b27-b1b2-492f-b005-74d21f18c3b6_200x200",
  },
  {
    name: "La Chilena Senior",
    shortName: "La Chilena",
    href: "https://app.ligasfutbolamateur.com/la-chilena-senior",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/2271c314-c26b-42b4-884f-48b8a3b9cb11_200x200",
  },
  {
    name: "Las Cabanas",
    shortName: "Las Cabanas",
    href: "https://app.ligasfutbolamateur.com/las-cabanas-liga-de-futbol-7",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/70f236de-bf16-46e8-ab4e-2bec0649778c",
  },
  {
    name: "Copa Play",
    shortName: "Copa Play",
    href: "https://app.ligasfutbolamateur.com/la-copa-play",
    logoUrl:
      "https://storage.googleapis.com/ligas-futbol-amateur.appspot.com/uploads/8253b052-0f70-472c-a12e-ec984410dbbe_200x200",
  },
  {
    name: "Torneos Dibuje Maestro",
    shortName: "Dibuje",
    href: "https://admin.ligasfutbolamateur.com/l?league=torneos-dibuje-maestro",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/68a7adbb-edf9-48f5-8d73-b734ae950d55/branding/6199f35d-6fa2-42bc-9c4e-acb0993e7bac.png",
  },
  {
    name: "MNT Torneos",
    shortName: "MNT",
    href: "https://admin.ligasfutbolamateur.com/l?league=mnttorneos-2",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/7311ab33-3ee4-47b4-b486-77faa7dfed7b/branding/7311ab33-3ee4-47b4-b486-77faa7dfed7b.png",
  },
  {
    name: "Terraza Futbol 99",
    shortName: "Terraza",
    href: "https://admin.ligasfutbolamateur.com/l?league=terraza-futbol-99",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/ca32c6c5-eec7-4d91-9e16-f2d5ced253e1/branding/70a118d7-9187-4292-92d6-2ba1397bb2d1.webp",
  },
  {
    name: "Liga De Rabona",
    shortName: "De Rabona",
    href: "https://admin.ligasfutbolamateur.com/l?league=liga-de-rabona",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/6928285e-55f6-463a-a932-5345ed5626d8/branding/4947bc4a-6231-4b9b-8dde-af683d636c2c.png",
  },
];
