[out:json][timeout:180];
area["ISO3166-2"="DE-NW"][admin_level=4]->.a;
(
  nwr(area.a)["leisure"="fishing"];
  nwr(area.a)["sport"="fishing"];
  nwr(area.a)["shop"="fishing"];
  nwr(area.a)["natural"="water"]["name"]["water"~"^(lake|pond|reservoir|fishpond|basin|oxbow)$"];
  nwr(area.a)["water"~"^(lake|pond|reservoir|fishpond|basin|oxbow)$"]["name"];
  nwr(area.a)["landuse"="reservoir"]["name"];
);
out center tags qt;
