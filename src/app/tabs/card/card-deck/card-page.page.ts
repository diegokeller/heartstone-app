import { Component, OnInit } from "@angular/core";
import { CardService } from '../shared/card.service';

@Component({
    selector: 'app-card-deck',
    templateUrl: './card-deck.page.html',
    styleUrls: ['./card-deck.page.scss']
})
export class CardDeckPage implements OnInit {
    
    // Attributes

    private cardDecks: string[] = []

    // Lifecycle

    constructor(private cardService: CardService){

    }

    ngOnInit(): void {
        this.fetchCardDecks();
    }

    // Private Methods

    private fetchCardDecks(){
        this.cardService.getAllCardDecks().subscribe(data => {
            this.cardDecks = data
        })
    }
    
}