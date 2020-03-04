import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { Card } from "./card.model";

@Injectable()
export class FavoriteCardStore {
  private _favoriteCardsSubject = new BehaviorSubject({});

  get favoriteCards(): Observable<any> {
    return this._favoriteCardsSubject.asObservable();
  }

  constructor(private storage: Storage) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.storage.get("favoriteCards").then(cards => {
      this._favoriteCardsSubject.next(cards || {});
    });
  }

  public toggleCard(card: Card) {
    const favoriteCards = this._favoriteCardsSubject.getValue();
    if (card.favorite) {
      card.favorite = false;
      delete favoriteCards[card.cardId];
    } else {
      card.favorite = true;
      favoriteCards[card.cardId] = card;
    }
    this.storage.set("favoriteCards", favoriteCards).then(e => {
      this._favoriteCardsSubject.next(favoriteCards);
    });
  }
}
