import { IonicModule } from "@ionic/angular"
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';

import { CardDeckPage } from './card-deck/card-page.page'
import { CardService } from './shared/card.service';
import { CardListComponent } from './components/card-list.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: 'card-deck', component: CardDeckPage },
            { path: '', redirectTo: '/tabs/card/card-deck' }
        ])
    ],
    providers: [
        CardService
    ],
    declarations: [
        CardDeckPage,
        CardListComponent
    ]
})
export class CardDeckModule {

}