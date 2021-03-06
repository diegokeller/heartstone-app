import { IonicModule } from "@ionic/angular"
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';

import { CardDeckPage } from './card-deck/card-page.page'
import { CardService } from './shared/card.service';
import { CardListComponent } from './components/card-list.component';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';
import { LoadingService } from './shared/loading.service';
import { ToastService } from './shared/toast.service';
import { SearchComponent } from './components/search.component';
import { FavoriteCardStore } from './shared/card-favorite-store';
import { CardFavoritePage } from './card-favorite/card-favorite.page';
import { CardCardComponent } from './components/card-card.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: 'card-deck', component: CardDeckPage },
            { path: 'card-favorite', component: CardFavoritePage },
            { path: 'card-detail/:cardId', component: CardDetailPage },
            { path: ':cardDeckGroup/:cardDeck', component: CardListingPage },
            { path: '', redirectTo: '/tabs/card/card-deck' }
        ])
    ],
    providers: [
        CardService,
        LoadingService,
        ToastService,
        FavoriteCardStore
    ],
    declarations: [
        CardDeckPage,
        CardListingPage,
        CardListComponent,
        CardDetailPage,
        CardFavoritePage,
        SearchComponent,
        CardCardComponent
    ]
})
export class CardDeckModule {

}