import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SidebarConfiguration, devfeteamHelperService, Tag, SidebarModuleService } from 'devfeteam-init';
import { Column } from 'app/shared/models/column.model';
import { SearchCard } from 'app/shared/models/search-card.model';
import { DateFormatService } from 'app/shared/service/date-format/date-format.service';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CardComponent implements OnInit {

    @Input() columns: Column[];
    @Input() card: SearchCard;
    @Input() searchText: string;

    constructor(private _sidebarService: SidebarModuleService,
        private _helperService: devfeteamHelperService,
        private _dateFormatService: DateFormatService) {
    }

    ngOnInit(): void {
    }

    collapseCard(card: SearchCard): void {
        card.collapsed = true;
    }

    expandCard(card: SearchCard): void {
        card.collapsed = false;
    }

    openCardDetails(selectedCard: SearchCard): void {

        let sideBarConfiguration: SidebarConfiguration = {
            moduleId: 'boards',
            moduleRoute: 'view-card-details',
            header: selectedCard.title,
            width: 600,
            moduleData: 
                { 
                    columnName: this.getColumnName(selectedCard.columnId),
                    cardId: selectedCard.cardId,
                    boardId: selectedCard.boardId
                }
        };

        this._sidebarService.onOpenSidebar(sideBarConfiguration);
    }

    getColumnName(columnId: string): string {
        return this.columns.find(c => c.columnId === columnId).name;
    }

    getFormattedDate(date: string): string {
        return this._dateFormatService.getPrettyDateFormat(date);
    }

    //#region STYLE REGIONS
    getTagColor(tag: Tag): string {
        let color =  this._helperService.stringToColor(tag.text);
        return color;
    }

    getTopRadius(tag: Tag): string {

        let tagLength = this.card.tags.length;

        if (tagLength === 1) {
            return '7px';
        }
        else {

            let index = this.card.tags.findIndex(c => c.text === tag.text);

            if (index === 0) {
                return '7px';

            } else {
                return '0px';
            }
        }
    }

    getBottomRadius(tag: Tag): string {

        let tagLength = this.card.tags.length;

        if (tagLength === 1) {
            return '7px';
        }
        else {

            let index = this.card.tags.findIndex(c => c.text === tag.text);

            if (index === (tagLength - 1)) {
                return '7px';
            } else {
                return '0px';
            }
        }
    }
    //#endregion STYLE REGIONS    
}
