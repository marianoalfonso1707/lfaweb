export type League = {
  name: string;
  shortName?: string;
  logoUrl: string;
  href: string;
};

export function leagueShortName(league: League): string {
  return league.shortName ?? league.name;
}

const publicLeague = (slug: string) =>
  `https://admin.ligasfutbolamateur.com/l?league=${slug}`;

export const leagues: League[] = [
  {
    name: "Copa Rey del Sur",
    shortName: "Copa Rey",
    href: "https://app.ligasfutbolamateur.com/copa-rey-del-sur-3",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/9c94d1bb-a4d3-4c65-9307-a927c79fac77/branding/9c94d1bb-a4d3-4c65-9307-a927c79fac77.webp",
  },
  {
    name: "Torneos Del Sur",
    shortName: "Del Sur",
    href: "https://app.ligasfutbolamateur.com/torneos-del-sur",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/0027bf00-b928-4f7d-981f-37d409e36d41/branding/0027bf00-b928-4f7d-981f-37d409e36d41.webp",
  },
  {
    name: "M90 Deportivo SL",
    shortName: "M90",
    href: "https://app.ligasfutbolamateur.com/m90-deportivo-san-luis",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/3e241736-041a-4203-bc20-ab43b30a90e1/branding/3e241736-041a-4203-bc20-ab43b30a90e1.jpg",
  },
  {
    name: "La Villa",
    shortName: "La Villa",
    href: "https://app.ligasfutbolamateur.com/la-villa-2",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/99e559be-2a26-4463-a4de-791f64bba4d8/branding/99e559be-2a26-4463-a4de-791f64bba4d8.webp",
  },
  {
    name: "Soccer Pro F11",
    shortName: "Soccer Pro",
    href: "https://app.ligasfutbolamateur.com/soccer-pro-f11",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/7a2efc37-15cd-4328-b7a3-3b81434916ba/branding/7a2efc37-15cd-4328-b7a3-3b81434916ba.png",
  },
  {
    name: "Futbol City",
    shortName: "Futbol City",
    href: "https://app.ligasfutbolamateur.com/futbol-city",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/564d2eef-ec05-4312-94a1-669d559e32a7/branding/77ddcce5-f276-4b91-abd6-b2452b765b09.webp",
  },
  {
    name: "La Estancia Super 8",
    shortName: "La Estancia",
    href: "https://app.ligasfutbolamateur.com/la-estancia-super-8",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/7a8378bb-2659-4961-8006-234abc166f9f/branding/8d10d21b-b2ac-4356-919d-ead4869ae004.png",
  },
  {
    name: "Las Cabanas",
    shortName: "Las Cabanas",
    href: "https://app.ligasfutbolamateur.com/las-cabanas-liga-de-futbol-7",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/70f236de-bf16-46e8-ab4e-2bec0649778c/branding/70f236de-bf16-46e8-ab4e-2bec0649778c.webp",
  },
  {
    name: "Copa Play",
    shortName: "Copa Play",
    href: "https://app.ligasfutbolamateur.com/la-copa-play",
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/8253b052-0f70-472c-a12e-ec984410dbbe/branding/8253b052-0f70-472c-a12e-ec984410dbbe-logo-circle.webp",
  },
  {
    name: "Torneos Dibuje Maestro",
    shortName: "Dibuje",
    href: publicLeague("torneos-dibuje-maestro"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/68a7adbb-edf9-48f5-8d73-b734ae950d55/branding/6199f35d-6fa2-42bc-9c4e-acb0993e7bac.png",
  },
  {
    name: "MNT Torneos",
    shortName: "MNT",
    href: publicLeague("mnttorneos-2"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/7311ab33-3ee4-47b4-b486-77faa7dfed7b/branding/7311ab33-3ee4-47b4-b486-77faa7dfed7b.png",
  },
  {
    name: "Terraza Futbol 99",
    shortName: "Terraza",
    href: publicLeague("terraza-futbol-99"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/ca32c6c5-eec7-4d91-9e16-f2d5ced253e1/branding/70a118d7-9187-4292-92d6-2ba1397bb2d1.webp",
  },
  {
    name: "Liga De Rabona",
    shortName: "De Rabona",
    href: publicLeague("liga-de-rabona"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/6928285e-55f6-463a-a932-5345ed5626d8/branding/4947bc4a-6231-4b9b-8dde-af683d636c2c.png",
  },
  {
    name: "Azteca Torneos",
    shortName: "Azteca",
    href: publicLeague("azteca-torneos"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/7a29a8ca-5688-4014-a41e-9478888e8cda/organization/57339bfc-c27d-46d0-9e4c-02a36dc868fe.webp",
  },
  {
    name: "Cancha Mancilla",
    shortName: "Mancilla",
    href: publicLeague("cancha-mancilla"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/ef29e102-95fa-4a70-9749-8b9c5ed4bbc2/branding/ef29e102-95fa-4a70-9749-8b9c5ed4bbc2.webp",
  },
  {
    name: "El Pino FC",
    shortName: "El Pino",
    href: publicLeague("el-pino-fc"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/5ed0355e-d019-4951-a912-6133ac3dff50/branding/5ed0355e-d019-4951-a912-6133ac3dff50.webp",
  },
  {
    name: "Evolution 7",
    shortName: "Evolution 7",
    href: publicLeague("evolution-7"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/199d6ff0-fac1-4f75-9ff6-121a5d7faeb5/branding/12873374-0fc5-419a-b1a7-6ff06817100b.webp",
  },
  {
    name: "Fecha Libre Torneo",
    shortName: "Fecha Libre",
    href: publicLeague("fecha-libre-torneo"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/5a24746b-36be-411b-8677-43a356d26585/branding/5a24746b-36be-411b-8677-43a356d26585.webp",
  },
  {
    name: "Fútbol 7 Gral. Terán",
    shortName: "Gral. Terán",
    href: publicLeague("futbol-7-gral-teran"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/f9760de3-ab12-4962-a42e-ee94651233fe/branding/788dd489-be21-4624-9fb1-bb22b0f8932d.webp",
  },
  {
    name: "Goles Son Amores",
    shortName: "Goles Son Amores",
    href: publicLeague("goles-son-amores"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/22b21ca2-e7a6-4ea8-b1ab-07420e1f8282/branding/22b21ca2-e7a6-4ea8-b1ab-07420e1f8282.webp",
  },
  {
    name: "Liga de Fut6AC Sports",
    shortName: "Fut6AC",
    href: publicLeague("liga-de-fut6ac-sports"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/451335b2-0c3d-4532-ae6f-ed77a0734186/branding/451335b2-0c3d-4532-ae6f-ed77a0734186.webp",
  },
  {
    name: "Liga de Futbol San Pedro de Colalao",
    shortName: "San Pedro",
    href: publicLeague("liga-de-futbol-san-pedro-de-colalao"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/3c9460cb-0f04-473e-8737-c4228f5d3b7e/branding/3c9460cb-0f04-473e-8737-c4228f5d3b7e.webp",
  },
  {
    name: "Liga Élite",
    shortName: "Liga Élite",
    href: publicLeague("liga-elite"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/f9aa6344-8467-4d8c-8f99-eaaa799bea7b/branding/f9aa6344-8467-4d8c-8f99-eaaa799bea7b.webp",
  },
  {
    name: "Liga La Tapera",
    shortName: "La Tapera",
    href: publicLeague("torneo-amateur-40"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/75e38977-a20e-478f-8e93-c717161abe3d/branding/60f13db7-6628-4ab9-ac37-4ec02e3376ac.webp",
  },
  {
    name: "Liga Los Pinos BS",
    shortName: "Los Pinos",
    href: publicLeague("liga-los-pinos-bs"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/f4c5cbf0-868e-4860-814b-5f3191e21984/branding/f4c5cbf0-868e-4860-814b-5f3191e21984.webp",
  },
  {
    name: "Liga Premier Camp",
    shortName: "Premier Camp",
    href: publicLeague("liga-premier-camp"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/4513f8ae-9848-40f3-b375-7d54f388c37d/branding/4513f8ae-9848-40f3-b375-7d54f388c37d.webp",
  },
  {
    name: "Por la Camiseta",
    shortName: "Por la Camiseta",
    href: publicLeague("por-la-camiseta"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/e2d2a013-2ec5-43a3-829e-6c14913774b4/branding/2b59ffc3-789c-4282-8fbb-2b391147b7f7.webp",
  },
  {
    name: "Potrero 1968",
    shortName: "Potrero 1968",
    href: publicLeague("potrero-1968"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/3b75d993-b658-4719-a475-efc4abee6338/organization/7c25bad5-66ed-4279-a86a-08fd900de8e1.webp",
  },
  {
    name: "Premier Elite",
    shortName: "Premier Elite",
    href: publicLeague("premier-elite"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/09f47109-ff2d-44e6-ae0e-a33827448a8b/branding/09f47109-ff2d-44e6-ae0e-a33827448a8b.webp",
  },
  {
    name: "Regatas Cup 3° Edición",
    shortName: "Regatas Cup",
    href: publicLeague("regatas-cup-3-edicion"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/bd101af9-ea12-4f03-9679-f506f50cfeb1/branding/bd101af9-ea12-4f03-9679-f506f50cfeb1.webp",
  },
  {
    name: "Super League",
    shortName: "Super League",
    href: publicLeague("super-league"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/a0b2b89c-4fb3-4fa5-9255-326dc2c4977a/organization/a53929b1-a8c3-4a23-9607-127689f46689.webp",
  },
  {
    name: "Súper Liga de Fútbol Cristiana ACF",
    shortName: "Super Liga ACF",
    href: publicLeague("super-liga-de-futbol-cristiana-acf"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/0bd31335-74a2-4239-a679-abf4025fe3fe/branding/0bd31335-74a2-4239-a679-abf4025fe3fe.webp",
  },
  {
    name: "Superleague",
    shortName: "Superleague",
    href: publicLeague("superleague"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/0fbb4f1f-4e35-4c61-8fc5-9cbbd43d936e/branding/0fbb4f1f-4e35-4c61-8fc5-9cbbd43d936e.webp",
  },
  {
    name: "Torneo 912",
    shortName: "Torneo 912",
    href: publicLeague("torneo-912"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/bc959597-4f3d-4c27-a0fb-da010dcc0c3f/branding/6f7ec390-f712-439b-a673-f389ba0585df.webp",
  },
  {
    name: "Torneo Liga Mano de D10S",
    shortName: "Mano de D10S",
    href: publicLeague("torneo-liga-mano-de-d10s"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/1ab7118d-7166-4dbe-8dd0-7d9ce33995b7/branding/1ab7118d-7166-4dbe-8dd0-7d9ce33995b7.webp",
  },
  {
    name: "Torneo Locos x el Futbol Salta",
    shortName: "Locos x el Futbol",
    href: publicLeague("torneo-locos-x-el-futbol-salta"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/1047f6f4-72d7-460e-ae7b-bc6a2551688c/branding/1047f6f4-72d7-460e-ae7b-bc6a2551688c.webp",
  },
  {
    name: "Torneo Potrero",
    shortName: "Torneo Potrero",
    href: publicLeague("torneo-potrero"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/92f2128a-040b-4736-89f3-1363f51853c4/branding/92f2128a-040b-4736-89f3-1363f51853c4.webp",
  },
  {
    name: "Torneo Super 11",
    shortName: "Super 11",
    href: publicLeague("torneo-super-11"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/cd2227a7-7615-4c21-8925-4588d159e798/branding/cd2227a7-7615-4c21-8925-4588d159e798.webp",
  },
  {
    name: "Torneo Vintage",
    shortName: "Vintage",
    href: publicLeague("torneo-vintage"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/9a84f999-c362-4a31-807e-9fe9b9d25881/organization/f8804299-f517-4216-86f3-ac7a1e58b1f4.webp",
  },
  {
    name: "Torneof5ok",
    shortName: "Torneof5ok",
    href: publicLeague("torneof5ok"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/def3e2db-ee3e-45b1-8d8f-e3e76e4f4950/branding/4f24279f-a9a4-4745-a464-a9a8cb0e4e8c.webp",
  },
  {
    name: "Torneos El 26",
    shortName: "El 26",
    href: publicLeague("torneos-el-26"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/59e5438f-0165-4bbe-abee-ee10afaefd0a/branding/d918246c-1406-4511-a42b-106df7c3d5b7.webp",
  },
  {
    name: "Torneos La Pelota No Se Mancha",
    shortName: "La Pelota No Se Mancha",
    href: publicLeague("torneos-la-pelota-no-se-mancha"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/efb3c2a3-84a6-4bff-9788-25435909b1b9/organization/03964d27-16b1-430d-845c-90a77f0c5200.webp",
  },
  {
    name: "Torneos PantaLeague",
    shortName: "PantaLeague",
    href: publicLeague("torneos-pantaleague"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/d46bf018-f055-44f0-bcfd-1ba5ba8aa42a/branding/d46bf018-f055-44f0-bcfd-1ba5ba8aa42a.webp",
  },
  {
    name: "Tornsad Events",
    shortName: "Tornsad",
    href: publicLeague("magic-international-football"),
    logoUrl:
      "https://pclupmmesnecujsszrfm.supabase.co/storage/v1/object/public/images/19bcb26e-555b-4a53-b156-50ffbc45b619/branding/e7da333d-665d-46b0-8a12-a91e081a99d6.webp",
  },
];
