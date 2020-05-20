import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Column } from 'app/shared/models/column.model';
import { CardColumn } from 'app/shared/models/card-column.model';
import { ListBoard } from 'app/shared/models/list-board.model';
import { ListBoardsRequest } from 'app/shared/models/requests/list-boards.request';
import { ListBoardsFilters } from 'app/shared/models/list-boards-filters.model';
import { DeletedStatus, SidebarConfiguration, SidebarModuleService, ToastService } from 'devfeteam-init';
import { BoardsApiService } from 'app/shared/service/api/boards-api.service';
import { SearchCard } from 'app/shared/models/search-card.model';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { DeleteBoarDialogComponent } from '../dialogs/delete-board-dialog/delete-board-dialog.component';
import { Router } from '@angular/router';
import { DeleteBoardRequest } from 'app/shared/models/requests/delete-board.request';

@Component({
    selector: 'board-configuration',
    templateUrl: './board-configuration.component.html',
    styleUrls: ['./board-configuration.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BoardConfigurationComponent implements OnInit {
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
    facilityIds: string[] = [];
    searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    cancelSearchSubject: Subject<any> = new Subject();
    filterFlag = DeletedStatus.EXCLUDE_DELETED;
    isLoading: boolean = false;
    searchValue: string;
    
    // Prevents the control making an extra search after setting an empty string
    // When changing the board
    triggerSearch: boolean = true; 
    searchText: string;
    private _unsubscribeAll: Subject<any>;

    constructor(private _boardsService: BoardsApiService,
        private _sidebarService: SidebarModuleService,
        private _translateService: TranslateService,
        private _dialog: MatDialog,
        private _router: Router,
        private _toastService: ToastService,) {     
        this._unsubscribeAll = new Subject();   
    }

    ngOnInit(): void {
        this.getBoards();
    }


    getBoards(facilityIds: string[] = []): void {

        let boardFilters = this.getListBoardFilters(this.filterFlag, facilityIds);

        let request: ListBoardsRequest = {
            filters: boardFilters
        };

        this.gettingBoards = true;
        this._boardsService.listBoards(request).subscribe(result => {
            if (result && result.success) {
                this.boards = result.boards;
            }

            this.gettingBoards = false;
            
        });
    }

    //#region FILTERS
    getListBoardFilters(deletedStatus = DeletedStatus.EXCLUDE_DELETED, facilityIds: string[] = []): ListBoardsFilters {
        this.facilityIds = facilityIds;
        let boardFilters: ListBoardsFilters = {
            facilityIds: facilityIds,
            deletedStatus: deletedStatus
        };

        return boardFilters;
    }

    openBoard(data?): void{
        let config: SidebarConfiguration = {
            moduleId: "boards",
            moduleRoute: "add-board-sidebar",
            width: 468,
            header: data ? this._translateService.instant('EDIT-BOARD') : this._translateService.instant('ADD-NEW-BOARD') ,
            moduleData: data ? data : ''
          };
      ​
        this._sidebarService
        .onOpenSidebar(config)
        .subscribe(newInbox => {
            setTimeout(() => {
            this.getBoards();
            }, 1000);
        });
    }

    filterClick(data?): void {
        let config: SidebarConfiguration = {
            moduleId: "boards",
            moduleRoute: "filter-board-sidebar",
            width: 468,
            header: this._translateService.instant('FILTERS') ,
            moduleData: data ? data : ''
          };
      ​
        this._sidebarService
        .onOpenSidebar(config)
        .subscribe(res => {
            setTimeout(() => {
                this.getBoards(res.moduleData);
                this.facilityIds = res.moduleData;
            }, 1000);
        }); 
    }

    addBoard(): void {
        this.openBoard();
    }

    openEditSideBar(data): void {
        this.openBoard(data);
    }

    openDeleteSideBar(data): void {
            const dialogRef = this._dialog.open(DeleteBoarDialogComponent, {
                width: '476px',
                height: '275px',
                autoFocus: false,
                backdropClass: 'cdk-overlay-transparent-backgdrop',
                data: data
            });
    
            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    let request = new DeleteBoardRequest();
                    request.boardId = result.boardId;
                    this._boardsService.deleteBoard(request).subscribe(() => {
                        setTimeout(() => {
                            this._toastService.showSuccess(this._translateService.instant('DELETED-BOARD-SUCCESS'));
                            this.getBoards();
                        }, 1000);
                    })
                }
            });
    }

    showDeleted(flag): void {
        let res = flag ? DeletedStatus.INCLUDE_DELETED : DeletedStatus.EXCLUDE_DELETED;
        this.filterFlag = res;
        this.getBoards();
    }

    facilityIdsChange(arr): void {
        this.getBoards(arr);
    }

    selectBoard(data): void {
        this._router.navigate(['column-configuration', {data: JSON.stringify(data)}]);
    }
}
