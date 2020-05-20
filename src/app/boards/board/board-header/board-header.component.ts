import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CardColumn } from 'app/shared/models/card-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ListBoard } from 'app/shared/models/list-board.model';
import { MatOptionSelectionChange } from '@angular/material';
import { Card } from 'app/shared/models/card.model';

@Component({
    selector: 'board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BoardHeaderComponent implements OnInit {

    @Input() cardsColumn: CardColumn[];
    @Input() boards: ListBoard[];
    @Input() cards: Card[];
    @Input() apiInProcess: boolean;
    @Input() selectedBoard: ListBoard;
    @Input() searchControl: FormControl;
    @Input() searchText: string;
    @Input() searchingCards: boolean;

    @Output() expandCollapseAll = new EventEmitter<boolean>();
    @Output() changeBoard = new EventEmitter<ListBoard>();
    
    opened: boolean = false;

    constructor(private _translateService: TranslateService) {

    }

    ngOnInit(): void {
    }

    setSelectedBoard(selectionChange: MatOptionSelectionChange): void {
        
        // Mat selection changes fire twice, expected behavior since selection includes
        // A selection and deselection, user input identifiers the selectd one
        if (selectionChange.isUserInput && this.opened) {
            this.selectedBoard = selectionChange.source.value;
            this.changeBoard.emit(this.selectedBoard);
        }
    }

    matSelectOpened(): void {
        // This is to prevent the mat-option onSelectionChange to trigger
        // When the component loads
        this.opened = true;
    }

    getExpandCollapseText(): string {

        let cardsCollapsed = this.checkAllCardsCollapse();

        if (cardsCollapsed) {
            return this._translateService.instant('EXPAND-ALL');
        } else {
            return  this._translateService.instant('COLLAPSE-ALL');
        }
    }

    onExpandCollapseAll(): void {

        let cardsCollapsed = this.checkAllCardsCollapse();

        if (cardsCollapsed) {
            this.expandCollapseAll.emit(false);
        } else {
            this.expandCollapseAll.emit(true);
        }
    }

    checkAllCardsCollapse(): boolean {

        let cardCollapsed: boolean;

        for (let i = 0; i < this.cardsColumn.length; i++) {
            const column = this.cardsColumn[i];

            let foundCollapsed = column.cards.find(r => r.collapsed === true);

            if (foundCollapsed) {
                cardCollapsed = true;
                break;
            }
        }

        if (cardCollapsed) {
            return true;
        } else {
            return false;
        }
    }
}
