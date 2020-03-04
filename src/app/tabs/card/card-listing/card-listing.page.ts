import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Storage } from "@ionic/storage";

import { CardService } from "../shared/card.service";
import { Card } from "../shared/card.model";
import { LoadingService } from "../shared/loading.service";
import { ToastService } from "../shared/toast.service";
import { FavoriteCardStore } from "../shared/card-favorite-store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-card-listing",
  templateUrl: "./card-listing.page.html",
  styleUrls: ["./card-listing.page.scss"]
})
export class CardListingPage {
  cardDeckGroup: string;
  cardDeck: string;

  cards: Card[] = [];
  copyOfCards: Card[] = [];

  favoriteCards: any = {};

  favoriteCardStoreSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private loading: LoadingService,
    private toaster: ToastService,
    private storage: Storage,
    private favoriteCardStore: FavoriteCardStore
  ) {
    this.favoriteCardStoreSubscription = this.favoriteCardStore.favoriteCards.subscribe(
      favoriteCards => {
        this.favoriteCards = favoriteCards;
      }
    );

    this.storage.get("favoriteCards").then(favoriteCards => {
      this.favoriteCards = favoriteCards || {};
    });
  }

  ionViewDidLeave() {
    if (
      this.favoriteCardStoreSubscription &&
      !this.favoriteCardStoreSubscription.closed
    ) {
      this.favoriteCardStoreSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get("cardDeckGroup");
    this.cardDeck = this.route.snapshot.paramMap.get("cardDeck");

    this.loading.show();

    this.cardService
      .getCardsByDeck(this.cardDeckGroup, this.cardDeck)
      .subscribe(
        (cards: Card[]) => {
          this.cards = cards.map((card: Card) => {
            card.text = this.cardService.handleDescription(card.text);
            card.favorite = this.isFavoriteCard(card);
            return card;
          });
          this.copyOfCards = Array.from(this.cards);
          this.loading.hide();
        },
        error => {
          this.toaster.presentToastWithOK("Error", `Error loading cards. `);
          this.loading.hide();
        }
      );
  }

  hydrateCards(event) {
    this.cards = event;
  }

  favoriteCard(card) {
    this.favoriteCardStore.toggleCard(card);
  }

  isFavoriteCard(card: Card): boolean {
    return this.favoriteCards[card.cardId] !== undefined;
  }
}
