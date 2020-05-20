import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Column } from 'app/shared/models/column.model';
import { CardColumn } from 'app/shared/models/card-column.model';
import { DropResult } from 'ngx-smooth-dnd';
import { ListBoard } from 'app/shared/models/list-board.model';
import { ListBoardsRequest } from 'app/shared/models/requests/list-boards.request';
import { ListBoardsFilters } from 'app/shared/models/list-boards-filters.model';
import { ModuleService, DeletedStatus, devfeteamUserService, UserSettingsUpdateRequest, UserSettingsReadRequest, Value, Metadata } from 'devfeteam-init';
import { BoardsApiService } from 'app/shared/service/api/boards-api.service';
import { ListColumnsRequest, ListColumnsFilters } from 'app/shared/models/requests/list-columns.request';
import { HiddenStatus } from 'app/shared/models/enums/hidden-status.model';
import { SearchCard } from 'app/shared/models/search-card.model';
import { SearchCardRequest, SearchCardsFilters } from 'app/shared/models/requests/search-card-request';
import { TransitionCardRequest } from 'app/shared/models/requests/transition-card.request';
import { FormControl } from '@angular/forms';
import { merge, Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil, filter, delay } from 'rxjs/operators';
import { SearchUser } from 'devfeteam-mode/lib/shared/models/search-user.model';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

    columns: Column[] = [];
    cards: SearchCard[] = [];
    cardsColumn: CardColumn[] = [];
    boards: ListBoard[] = [];
    gettingBoards: boolean;
    gettingCards: boolean;
    readingUserSettings: boolean;
    searchingCards: boolean;
    selectedBoard: ListBoard;
    searchControl: FormControl = new FormControl();
    
    // Prevents the control making an extra search after setting an empty string
    // When changing the board
    triggerSearch: boolean = true; 
    searchText: string;

    // Index to which column the card was added
    private newCardColumnIndex: number = null;

    // Index to which column the card was removed
    private movedCardColumnIndex: number = null;

    // ID of the column where the card was added
    private addedColumnId: string = null;

    // ID of the column where the card was removed
    private removedColumnId: string = null;

    private _unsubscribeAll: Subject<any>;

    constructor(private _moduleService: ModuleService,
        private _boardsService: BoardsApiService,
        private _userService: devfeteamUserService) {     
        this._unsubscribeAll = new Subject();   
    }

    get apiInProcess(): boolean {

        if (!this.gettingBoards && !this.gettingCards && !this.readingUserSettings) {
            return false;
        } else {
            return true;
        }
    }

    ngOnInit(): void {
        this.readUserSetting();
        this.subscribeToSearchValueChanges();
    }

    subscribeToSearchValueChanges(): void {

        merge(
            this.searchControl.valueChanges
        ).pipe(
            debounceTime(500),
            distinctUntilChanged(),
            map(term => !term || typeof term !== 'string' ? '' : term),
            filter(term => (term || !term) && this.triggerSearch === true),
            switchMap((term: string) => this.searchCards(term))
        ).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (cards: SearchCard[]) => {
                this.cards = cards;
                this.cardsColumn = this.getCardColumns(this.selectedBoard, cards);
            }
        );
    }

    getBoards(userSettingResult: string): void {

        let boardId = userSettingResult ? userSettingResult : '';

        let boardFilters = this.getListBoardFilters();

        let request: ListBoardsRequest = {
            filters: boardFilters
        };

        this.gettingBoards = true;
        this._boardsService.listBoards(request).subscribe(result => {

            if (result && result.success) {
                this.boards = result.boards;

                let index: number;

                if (boardId) {
                    index = this.boards.findIndex(b => b.boardId === boardId);

                    // Board id right now being shared between different subscriptions Id
                    // Reset index to ensure nothing fails
                    if (index === -1) {
                        index = 0;
                    }

                } else {
                    index = 0;
                }

                if (this.boards.length > 0 ) {
                    this.selectedBoard = this.boards[index];
                    this.columns = this.boards[index].columns;
                    this.getCards(this.boards[index]);
                }
              
            }

            this.gettingBoards = false;
        });
    }

    getColumns(board: ListBoard): void {

        let columnFilters = this.getListColumnFilters();

        let request: ListColumnsRequest = {
            boardId: board.boardId,
            filters: columnFilters
        };

        this._boardsService.listColumns(request).subscribe(result => {

            if (result) {
                this.columns = result.columns;
                board.columns = result.columns;
                this.getCards(board);
                this.triggerSearch = false;
                this.searchControl.setValue('');
            }

            this.triggerSearch = true;
            this.gettingBoards = false;     
        });
    }

    searchCards(term: string): Observable<SearchUser[]> {

        this.searchText = term;

        let searchCardFilters = this.getSearchCardFilters(this.selectedBoard);

        let request: SearchCardRequest = {
            term: term,
            filters: searchCardFilters
        };

        this.searchingCards = true;
        return this._boardsService.searchCards(request).pipe(
            delay(250),
            takeUntil(this._unsubscribeAll),
            map(res => {
                
                if (res && res.success) {
                    this.searchingCards = false;
                    return res.cards;
                }

                this.searchingCards = false;
                return [];
            })
        );
    }

    getCards(board: ListBoard): void {

        let searchCardFilters = this.getSearchCardFilters(board);

        let request: SearchCardRequest = {
            term: '',
            filters: searchCardFilters
        };

        this.gettingCards = true;
        this._boardsService.searchCards(request).subscribe(result => {

            if (result) {
                
                this.cards = result.cards;
                
                let cardColumn = this.getCardColumns(board, this.cards);
                this.cardsColumn = cardColumn;
            }

            this.gettingCards = false;
        });
    }

    getCardColumns(board: ListBoard, card: SearchCard[]): CardColumn[] {

        let cardColumns = new Array<CardColumn>();

        board.columns.forEach(column => {

            let cardColumn = new CardColumn();
            cardColumn.column = column;
            cardColumn.cards = [];
            cardColumn.cards = card.filter(x => x.columnId === column.columnId);

            cardColumns.push(cardColumn);
        });

        return cardColumns;
    }

    saveSelectedBoard(): void {

        let userSettingValue = this.getUserSettingValue();

        let request: UserSettingsUpdateRequest = {
            module: 'boards',
            key: 'listboards.selected',
            value: userSettingValue
        };

        this._userService.onUpdateSetting(request).subscribe();
    }

    readUserSetting(): void {

        let request: UserSettingsReadRequest = {
            key: 'listboards.selected',
            module: 'boards'
        };

        this.readingUserSettings = true;
        this._userService.onReadSetting(request).subscribe(result => {

            if (result) {

                let boardId = this.getUserSettingBoard(result);
                this.getBoards(boardId);
            }

            // If user has no user setting
            if (!result) {
                this.getBoards('');
            }

            this.readingUserSettings = false;
            
        });
    }

    getUserSettingBoard(value: Value): string {

        if ((value.keypair && value.keypair.length > 0) && (value.keypair[0].value === this._moduleService.userContext.organization.id)) {
            return value.keypair[0].key;
        }
        else {
            return '';
        }
    }

    //#region REQUEST PROPERTIES
    getListBoardFilters(): ListBoardsFilters {

        let boardFilters: ListBoardsFilters = {
            facilityIds: [ this._moduleService.userContext.facility.id ],
            deletedStatus: 0
        };

        return boardFilters;
    }

    getListColumnFilters(): ListColumnsFilters {
        
        let columnFilters: ListColumnsFilters = {
            deletedStatus: DeletedStatus.EXCLUDE_DELETED,
            hiddenStatus: HiddenStatus.EXCLUDE_HIDDEN
        };

        return columnFilters;
    }

    getSearchCardFilters(board: ListBoard): SearchCardsFilters {

        let columnIds = new Array<string>();

        board.columns.forEach(column => {
            columnIds.push(column.columnId);
        });

        let searchCardFilters: SearchCardsFilters = {
            boardIds: [board.boardId],
            columnIds: columnIds,
            deletedStatus: DeletedStatus.EXCLUDE_DELETED
        };

        return searchCardFilters;
    }

    getUserSettingValue(): Value {

        let value: Value = {
            keypair: this.getMetaData()
        };

        return value;
    }

    getMetaData(): Metadata[] {

        let metaDataArray = new Array<Metadata>();

        let metaData: Metadata = {
            key: this.selectedBoard.boardId,
            value: this._moduleService.userContext.organization.id
        };

        metaDataArray.push(metaData);
        return metaDataArray;
    }
    //#endregion FILTERS

    //#region BOARD HEADERS EVENTS

    expandCollapseAll(collapse: boolean): void {
        this.cardsColumn.map(c => c.cards.map(r => r.collapsed = collapse));
    }

    changeBoard(board: ListBoard): void {
        this.selectedBoard = board;
        
        this.saveSelectedBoard();
        this.getColumns(board);
    }
    //#endregion BOARD HEADERS EVENTS
    
    //#region CARD TRANSITIONS
    onCardDrop(columnId: string, dropResult: DropResult): void {
        this.moveColumnCards(columnId, dropResult);
    }

    private moveColumnCards(columnId: string, dropResult: DropResult): void {

        // Checks index of the card when dropped in a new column
        if (dropResult.addedIndex !== null) {
            this.newCardColumnIndex = dropResult.addedIndex;
            this.addedColumnId = columnId;
        }

        // Checks index from where the moved card used to be
        if (dropResult.removedIndex !== null) {
            this.movedCardColumnIndex = dropResult.removedIndex;
            this.removedColumnId = columnId;
        }

        // Validates we have both values of where the card was dropped and removed from
        if (this.newCardColumnIndex !== null && this.movedCardColumnIndex !== null) {

            // Checks the index of the column which the card was dropped
            let addToColumnIndex = this.cardsColumn.findIndex(c => c.column.columnId === this.addedColumnId);

            // Checks the index of the column which the card was removed
            let removeFromColumnIndex = this.cardsColumn.findIndex(c => c.column.columnId === this.removedColumnId);

            // Gets the moved card
            let movedCard = this.cardsColumn[removeFromColumnIndex].cards[this.movedCardColumnIndex];
            
            // Update columnId locally
            movedCard.columnId = this.addedColumnId;

            // Removes card from Array which is used to be
            this.cardsColumn[removeFromColumnIndex].cards.splice(this.movedCardColumnIndex, 1);

            // Adds card to new Array in a specific index
            this.cardsColumn[addToColumnIndex].cards.splice(this.newCardColumnIndex, 0, movedCard);

            this.newCardColumnIndex = null;
            this.movedCardColumnIndex = null;
            this.addedColumnId = null;
            this.removedColumnId = null;

            let request: TransitionCardRequest = {
                boardId: movedCard.boardId,
                cardId: movedCard.cardId,
                sourceColumnId: this.cardsColumn[removeFromColumnIndex].column.columnId,
                targetColumnId: this.cardsColumn[addToColumnIndex].column.columnId
            };
            
            this._boardsService.transitionCard(request).subscribe();
        }
    }
    //#endregion CARD TRANSITIONS
}
