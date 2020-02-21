import { IonicModule } from "@ionic/angular"
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CardDeckPage } from './card-deck/card-page.page'

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'card-deck', component: CardDeckPage },
            { path: '', redirectTo: '/tabs/card/card-deck' }
        ])
    ],
    declarations: [
        CardDeckPage
    ]
})
export class CardDeckModule {

}