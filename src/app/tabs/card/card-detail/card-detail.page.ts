import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { CardDeckModule } from '../card.module';
import { LoadingService } from '../shared/loading.service';
import { ToastService } from '../shared/toast.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html'
})
export class CardDetailPage implements OnInit {
    
    cardId: string
    card: Card = undefined
    
    constructor(private router: ActivatedRoute, 
        private cardService: CardService, 
        private loading: LoadingService,
        private toaster: ToastService){

    }

    ngOnInit() {

        this.loading.show()

        this.cardId = this.router.snapshot.paramMap.get('cardId');
        this.cardService.getCardById(this.cardId)
            .subscribe(c => {
                this.card = c
                this.card.text = this.cardService.handleDescription(c.text)
                this.loading.hide()
            }, ((error) => {
                this.toaster.presentTemporaryToast(`Error loading card. `)
                this.loading.hide()
            }))

    }

    setDefaultImage() {
        this.card.img = '/assets/images/DefaultCard.png'    
    }

}