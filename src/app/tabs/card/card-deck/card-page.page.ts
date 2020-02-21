import { Component, OnInit } from "@angular/core";

import { CardService } from '../shared/card.service';
import { CardDeck } from '../shared/card.model';

@Component({
    selector: 'app-card-deck',
    templateUrl: './card-deck.page.html',
    styleUrls: ['./card-deck.page.scss']
})
export class CardDeckPage implements OnInit {
    
    // Constants
    private readonly ALLOWED_DECKS = ['classes', 'factions', 'qualities', 
        'types', 'races']    

    // Attributes

    private cardDecks: CardDeck[] = []

    // Lifecycle

    constructor(private cardService: CardService){

    }

    ngOnInit(): void {
        this.fetchCardDecks();
    }

    // Private Methods

    private fetchCardDecks(){
        this.cardService.getAllCardDecks().subscribe(data => {
            this.extractAllowedDecks(data)
        })
    }

    private extractAllowedDecks(cardDecks: CardDeck[]) {
        this.ALLOWED_DECKS.forEach((deckName) => {
            this.cardDecks.push(
                {
                    name: deckName,
                    types: cardDecks[deckName]
                }
            )
        })
    }
    
}