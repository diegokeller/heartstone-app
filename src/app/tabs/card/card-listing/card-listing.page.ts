import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Storage } from '@ionic/storage'

import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { LoadingService } from '../shared/loading.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  // Attributes

  cardDeckGroup: string
  cardDeck: string

  cards: Card[] = []
  copyOfCards: Card[] = []

  favoriteCards: any = {}

  // Lifecycle

  constructor(private route: ActivatedRoute, 
    private cardService: CardService,
    private loading: LoadingService,
    private toaster: ToastService,
    private storage: Storage) {
      this.storage.get('favoriteCards').then(favoriteCards => {
        this.favoriteCards = favoriteCards || {}
      })
    }

  ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup')
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck')

    this.loading.show()

    this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck)
      .subscribe((cards: Card[]) => {
        this.cards = cards.map((card: Card) => {
          card.text = this.cardService.handleDescription(card.text);
          card.favorite = this.isFavoriteCard(card)
          return card;
        });
        this.copyOfCards = Array.from(this.cards)
        this.loading.hide()
      }, ((error) => {
        this.toaster.presentToastWithOK('Error', `Error loading cards. `)
        this.loading.hide()
      }))
  }

  hydrateCards(event){
    this.cards = event
  }

  favoriteCard(card) {
    if(card.favorite){
      card.favorite = false
      delete this.favoriteCards[card.cardId]
    }else{
      card.favorite = true
      this.favoriteCards[card.cardId] = card
    }
    this.storage.set('favoriteCards', this.favoriteCards).then((e) => {})
  }

  isFavoriteCard(card: Card): boolean {
    return this.favoriteCards[card.cardId] !== undefined
  }

}
