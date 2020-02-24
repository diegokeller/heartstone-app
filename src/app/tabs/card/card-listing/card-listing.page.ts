import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

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

  // Lifecycle

  constructor(private route: ActivatedRoute, 
    private cardService: CardService,
    private loading: LoadingService,
    private toaster: ToastService) { }

  ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup')
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck')

    this.loading.show()

    this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck)
      .subscribe((cards: Card[]) => {
        this.cards = cards.map((card: Card) => {
          card.text = this.cardService.handleDescription(card.text);
          return card;
        });
        this.loading.hide()
      }, ((error) => {
        this.toaster.presentToastWithOK('Error', `Error loading cards. `)
        this.loading.hide()
      }))
  }

}
