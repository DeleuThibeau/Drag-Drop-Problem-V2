# Documentatie

## Waar kan je de code vinden?
In de app folder => app.component files (.ts, .html, .scss)

## Wat is afgewerkt?
- Styling van de test kaarten en bijhorende HTML.
- Het flex-wrap probleem. Kaarten kunnen nu gesleept worden naar verschillende locaties van de lijst, ook al staan ze in flex-wrap. Voor deze toevoeging werd er puur gebruikt gemaakt van Angular material (versie 11).

## Problemen?
- Zeldzame bug waarbij een kaart kan verdwijnen (gebeurt 1x om de 10 of 20 keren. Dit komt hoogstwaarschijnlijk door de dragDropped functie die de display property verwijderd (moet nog verder worden bekeken).

## Wat moet er nog worden gedaan?
- Drag handle probleem oplossen.
- Predicate implementatie voor conditiionele dragging
- Groepen van kaarten kunnen draggen.

# Bronnen
- https://www.thisdot.co/blog/angular-cdk-sorting-items-using-drag-and-drop
- https://material.angular.io/cdk/drag-drop/overview
- https://stackblitz.com/edit/angular-cdk-drag-drop-sortable-flex-wrap-v2
