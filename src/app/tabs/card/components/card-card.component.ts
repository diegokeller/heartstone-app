import { Component, Input } from '@angular/core';
import { Card } from '../shared/card.model';
import { FavoriteCardStore } from '../shared/card-favorite-store';

@Component({
    selector: 'app-card-card',
    styles: [`
    .like-icon {
        font-size: 30px;
        float: right;
    }
    
    .favorite {
        color: orange
    }
    `],
    template: `
    <ion-card *ngFor="let card of cards">
        <ion-card-header text-wrap>
        <ion-card-subtitle>
            {{card.cardSet}}
            <ion-icon (click)="favoriteCard(card)" [ngClass]="card.favorite ? 'favorite' : ''" name="flame" class="like-icon"></ion-icon>
        </ion-card-subtitle>
        <ion-card-title>
            {{card.name}}
        </ion-card-title>
        </ion-card-header>
        <ion-card-content>
        <div [innerHTML]="card?.text"></div>
        <ion-button size="medium" expand="full" [href]="'/tabs/card/card-detail/' + card.cardId">See details...
        </ion-button>
        </ion-card-content>
    </ion-card>
    `
})
export class CardCardComponent {

    @Input() cards: Card[] = []

    constructor(private favoriteCardStore: FavoriteCardStore){

    }

    favoriteCard(card) {
        this.favoriteCardStore.toggleCard(card);
    }

}