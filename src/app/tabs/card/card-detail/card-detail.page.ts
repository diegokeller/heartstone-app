import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { CardDeckModule } from '../card.module';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html'
})
export class CardDetailPage implements OnInit {
    
    cardId: string
    card: Card = undefined

    constructor(private router: ActivatedRoute, private cardService: CardService){

    }

    ngOnInit(): void {
        this.cardId = this.router.snapshot.paramMap.get('cardId');
        this.cardService.getCardById(this.cardId).subscribe(c => this.card = c)
    }

    setDefaultImage() {
        this.card.img = '/assets/images/DefaultCard.png'    
    }

}