import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsApiService } from 'app/shared/service/api/boards-api.service';
import { ListColumnsRequest, ListColumnsFilters } from 'app/shared/models/requests/list-columns.request';
import { DeletedStatus, ToastService } from 'devfeteam-init';
import { HiddenStatus } from 'app/shared/models/enums/hidden-status.model';
import { ListBoard } from 'app/shared/models/list-board.model';
import { Column } from 'app/shared/models/column.model';
import { DropResult } from 'ngx-smooth-dnd';
import { DeleteBoarDialogComponent } from 'app/boards/dialogs/delete-board-dialog/delete-board-dialog.component';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { UpdateColumnPositionRequest } from 'app/shared/models/requests/update-column-position.request';
import { UpdateColumnRequest } from 'app/shared/models/requests/update-column.request';
import { DeleteColumnRequest } from 'app/shared/models/requests/delete-column.request';

@Component({
    selector: 'app-columns-configuration',
    templateUrl: './columns-configuration.component.html',
    styleUrls: ['./columns-configuration.component.scss']
})
export class ColumnsConfigurationComponent implements OnInit {
    board: ListBoard;
    columns: Column[] = [];
    editColumnIndex: number;

    constructor(private route: ActivatedRoute,
        private _boardsService: BoardsApiService, 
        private _dialog: MatDialog,
        private _toastService: ToastService,
        private _translateService: TranslateService) { }

    ngOnInit(): void {
        this.route.params.subscribe((data) => {
            this.board = JSON.parse(data.data);
            this.getColumnList();
        });
    }

    saveColumn(column): void {
        let request = new UpdateColumnRequest();
        request.boardId = this.board.boardId;
        request.column = column;
        if(column.columnId) {
            this._boardsService.updateColumn(request).subscribe((res) => {
                this.editColumnIndex = null;
                this._toastService.showSuccess(this._translateService.instant('UPDATE-COLUMN-SUCCESS'));
                this.getColumnList();
            });
        } else {
            request.column.position = this.columns.length - 1;
            this._boardsService.addColumn(request).subscribe((res) => {
                this.editColumnIndex = null;
                this._toastService.showSuccess(this._translateService.instant('ADD-COLUMN-SUCCESS'));
                this.getColumnList();
             });
        }
    }

    cancelColumn(column, index): void {
        if(!column.columnId) {
            this.columns.splice(index, 1);
        }

        this.editColumnIndex = null;
    }

    deleteColumn(column): void {
        const dialogRef = this._dialog.open(DeleteBoarDialogComponent, {
            width: '476px',
            height: '270px',
            autoFocus: false,
            backdropClass: 'cdk-overlay-transparent-backgdrop',
            data: column
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.editColumnIndex = null;
                let request = new DeleteColumnRequest();
                request.boardId = this.board.boardId;
                request.columnId = column.columnId;
                this._boardsService.deleteColumn(request).subscribe((res) => {
                    this.editColumnIndex = null;
                    this._toastService.showSuccess(this._translateService.instant('DELETED-COLUMN-SUCCESS'));
                    this.getColumnList();
                 });
            }
        });
    }

    editColumn(index): void {
        this.editColumnIndex = index;
    }

    onDrop(dropResult: DropResult): void {
        this.columns = this.applyDrag(this.columns, dropResult);
        for (let i = 0; i < this.columns.length; i++) {
            let request = new UpdateColumnPositionRequest();
            request.boardId = this.board.boardId;
            request.columnId = this.columns[i].columnId;
            request.position = i;
            this._boardsService.updateColumnPosition(request).subscribe((res) => {
                this.editColumnIndex = null;
            });
        }
    }

    getColumnList(): void {
        let columnFilters = this.getListColumnFilters();

        let request: ListColumnsRequest = {
            boardId: this.board.boardId,
            filters: columnFilters
        };

        this._boardsService.listColumns(request).subscribe(result => {
            if (result) {
                this.columns = result.columns;
            }
        });
    }

    getListColumnFilters(): ListColumnsFilters {

        let columnFilters: ListColumnsFilters = {
            deletedStatus: DeletedStatus.EXCLUDE_DELETED,
            hiddenStatus: HiddenStatus.EXCLUDE_HIDDEN
        };

        return columnFilters;
    }

    applyDrag(arr, dragResult): Column[] {
        const { removedIndex, addedIndex, payload } = dragResult;
        if (removedIndex === null && addedIndex === null) return arr;
    
        const result = [...arr];
        let itemToAdd = payload;
    
        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
        }
    
        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
        }
    
        return result;
    };

    addColumn(): void {
        if((this.columns[this.columns.length - 1] && this.columns[this.columns.length - 1].columnId) || this.columns.length === 0) {
            let column = new Column();
            this.columns.push(column);
            this.editColumnIndex = this.columns.length - 1;
        }
    }
}
