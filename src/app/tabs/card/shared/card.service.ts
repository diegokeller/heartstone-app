import { Injectable } from "@angular/core";
import { of as ObservableOf, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { CardDeck, Card } from './card.model'

@Injectable()
export class CardService {

    // Constants

    private readonly HS_API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com'
    private readonly API_KEY = '3eedaaffdbmsha80ca405cd23528p13d94bjsn95c7d94e84a7'

    private readonly headers = new HttpHeaders(
        {'x-rapidapi-key': this.API_KEY}
    )

    // Attributes

    // Lifecycle

    constructor(private http: HttpClient){

    }

    // Public methods

    public getAllCardDecks(): Observable<CardDeck[]>{
        return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`, 
            {headers: this.headers}
        )
    }

    public getCardsByDeck(cardDeckGroup: string, cardDeck: string): Observable<Card[]> {
        return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardDeckGroup}/${cardDeck}`, 
            {headers: this.headers}
        )
    }

    public getCardById(cardId: string): Observable<Card> {
        return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardId}`, {headers: this.headers})
            .pipe(
                map(res => res[0])
            )
    }

    public handleDescription(text: string): string {
        return text ? text.replace(new RegExp("\\\\n", "g"), " ") : 'No Description'
    }
}