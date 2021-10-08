# Prosjekt arkitektur

Prosjektet går ut på en samling av kort spill som baserer seg på samme måte å lage/vise/bruke kort på.

# Del 1 - Kortene

- En class Card.
  - Innholder:
    - Tallverdi
    - Hus
    - symbol

# Del 2 - Spillene

## Spill 1 - Blackjack

Et relativt enkelt spill, god som test spill.

### Arkitektur

Globale

- Har en array med Card
  - arrayen skal ha standard kortstokk * 3 blandet
- Gir spiller 2 kort
- Viser 1 av motstanders kort

Start fase

- Er kortstokken mindre enn en tredjedell av ny kortstokk?
  - Ja: Beksjed om ny kortstokk, Lag ny kortstokk
  - Nei: fortsett
- Del ut 2 kort til motstander, vis 1 kort
- Del ut 2 kort til spiller, vis begge kort

Spill fase

- Gi muligheten til å trekke kort
  - Sjekk hvis samlet verdi av kortene er over 21
- Hvis ferdig med å trekke kort (enten med at spiller trykker ferdig eller går over max)
  - Sjekk hvis spiller er over 21
    - Ja: gå til tap fase
    - Nei: fortsett
  - loop
    - motstander trekker kort
    - Sjekk over 21
      - Ja: gå til vinn fase
      - Nei: fortsett
    - Sjekk over max
      - Ja: gå til evaluerings fase
      - Nei: trekk nytt kort

Tap fase

- Vis tap beskjed
- gå til start fase

Vinn fase

- Vis vinn beskjed
- gå til start fase
