import { Injectable } from "@angular/core";
import { of as ObservableOf, Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { CardDeck } from './card.model'

@Injectable()
export class CardService {

    // Constants

    private readonly HS_API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com'
    private readonly API_KEY = '3eedaaffdbmsha80ca405cd23528p13d94bjsn95c7d94e84a7'

    // Attributes

    // Lifecycle

    constructor(private http: HttpClient){

    }

    // Public methods

    public getAllCardDecks(): Observable<CardDeck[]>{
        const headers = new HttpHeaders(
            {'x-rapidapi-key': this.API_KEY}
        )
        return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`, 
            {headers: headers}
        )
    }
}