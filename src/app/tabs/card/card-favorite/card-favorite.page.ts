import { Component } from '@angular/core';
import { FavoriteCardStore } from '../shared/card-favorite-store';
import { Card } from '../shared/card.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-card-favorite',
    templateUrl: './card-favorite.html'
})
export class CardFavoritePage {

    favoriteCards: Card[] = []

    favoriteCardSubscription: Subscription

    constructor(private favoriteCardStore: FavoriteCardStore){
        this.favoriteCardSubscription = this.favoriteCardStore.favoriteCards.subscribe(cards => {
            this.favoriteCards = this.getFavoriteCardList(cards)
        })
    }

    ionViewDidLeave(){
        if(this.favoriteCardSubscription && !this.favoriteCardSubscription.closed){
            this.favoriteCardSubscription.unsubscribe()
        }
    }

    private getFavoriteCardList(favoriteCards: any): Card[] {
        if (favoriteCards) {
          return Object.keys(favoriteCards)
            .filter(key => favoriteCards[key])
            .map(key => favoriteCards[key])
        }
  
        return [];
    }

}