import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  // Kijk naar de div die als het droplistContainer element bevat en maak daar een ElementRef van => wordt gebruikt voor queryselectors te kunnen doen en zo de placeholder etc aan te spreken.
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  // Lijst met waardes die worden getoond in de kaarten.
  public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Declaratie van wat er wordt verwacht bij de drag en drop. Is noodzakelijk bij bepaalde functies.
  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  // Functie die wordt opgeroepen als een dragbaar element wordt gedragd in een nieuw veld (als het een nieuw drop gebied entered => DragEnter).
  dragEntered(event: CdkDragEnter<number>) {
    // Het drag element zelf
    const drag = event.item;
    // De lijst waarin het drag element zal worden gedropped
    const dropList = event.container;
    // De index van het drag object
    const dragIndex = drag.data;
    // De index van de drop plaats (als je het drag object daarin zou plaatsen)
    const dropIndex = dropList.data;

    // We plaatsen beide variabelen in 1 variabele => is meer overzichtelijk, plus handig als je beide variabelen wilt gebruiken voor controles (if) => Vb. DragMoved functie
    this.dragDropInfo = { dragIndex, dropIndex };
    console.log('dragEntered', { dragIndex, dropIndex });

    // We halen het native element op van de lijst (phContainer) en de kaart (phElement) die daarin aanwezig is. Om vervolgens dan een querySelector erop toe te passen. 
    // Kort samengevat: List element ophalen => haal het kaart element op in het list element => haal de class op die in het kaart element aanwezig is en doe er iets mee.
    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    // Als het classe bestaat/ aanwezig is in phElement => verwijder het (want placeholder is aanwezig op de plaats waar je kaart eerst stond en moet dus worden verwijderd aangezien deze niet meer op deze locatie zal staan.)
    if (phElement) {
      phContainer.removeChild(phElement);
      // Plaats het element en de lijst waar het in zit op de nieuwe locatie (https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)
      phContainer.parentElement?.insertBefore(phElement, phContainer);
      
      // Update de lijst om volgorde van de kaarten te updaten (moveItemInArray is een Angular functie).
      moveItemInArray(this.items, dragIndex, dropIndex);
    }
  }

  // Registreert de beweging van de drag elementen, gebeurt bij iedere pixel verandering => Kan mogelijks voor performance issues zorgen, maar in dit geval normaal niet (het is maar een kleine implementatie)
  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    // Haal het placeholder element op.
    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );
    
    // Log om de movement te zien met bijhorende indexen van de kaart ten opzichte van de lijst.
    console.log(this.dragDropInfo.dragIndex, this.dragDropInfo.dropIndex)

    // Variabele om te controleren of de originele plaats van de kaart groter is dan de nieuwe plaats waar het wordt gedropt. Dit bepaald het placeholder element met bijhorende gerelateerde kaart (ofwel de volgende of vorige kaart). ReceiverElement is uiteindelijk een KAART en niet een placeholder.

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    // Om mogelijke null values op te vangen
    if (!receiverElement) {
      return;
    }
    
    // Pas display none toe op het receiver element.
    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    // Als element niet bestaat return niets.
    if (!this.dropListReceiverElement) {
      return;
    }
    
    // Eenmaal de drag/drop voorbij is, reset alles.
    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }
}