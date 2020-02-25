import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { Card } from '../shared/card.model';


@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent {

    private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('')

    @Input() items: any[] = []
    @Input() filteredProperty: string

    @Output() searchCompleted: EventEmitter<any[]> = new EventEmitter()

    handleSearch(event: any) {
        this.searchSubject.next(event.target.value)
    }

    ngAfterViewInit(){
        this.searchSubject.pipe(
            debounceTime(750),
            distinctUntilChanged()
        ).subscribe(term => {
            
            let filteredItems = this.items.filter((item: any) => {
                return item[this.filteredProperty].toLocaleLowerCase().includes(term.toLocaleLowerCase())
            })

            this.searchCompleted.emit(filteredItems)
        })
    }

}