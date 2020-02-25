import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../shared/card.model';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent {

    @Input() items: any[] = []
    @Input() filteredProperty: string

    @Output() searchCompleted: EventEmitter<any[]> = new EventEmitter()

    handleSearch(event: any) {

        let term: string = event.target.value || ''
        
        let filteredItems = this.items.filter((item: any) => {
            return item[this.filteredProperty].toLocaleLowerCase().includes(term.toLocaleLowerCase())
        })

        this.searchCompleted.emit(filteredItems)
    }

}