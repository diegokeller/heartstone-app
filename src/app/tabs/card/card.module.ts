import { IonicModule } from "@ionic/angular"
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CardDeckPage } from './card-deck/card-page.page'
import { CardService } from './shared/card.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'card-deck', component: CardDeckPage },
            { path: '', redirectTo: '/tabs/card/card-deck' }
        ])
    ],
    providers: [
        CardService
    ],
    declarations: [
        CardDeckPage
    ]
})
export class CardDeckModule {

}