// Why: coordinates were hardcoded twice (hero + nav) and pointed at Mumbai while the label said Ahmedabad.
// Impact: single source of truth so the displayed coordinates always match the city.
export const LOCATION = {
  city: "Ahmedabad",
  country: "India",
  lat: "23°02′N",
  lon: "72°34′E",
} as const;
