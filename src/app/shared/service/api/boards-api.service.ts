import { Injectable } from '@angular/core';
import { devfeteamRestService, devfeteamBaseResponse, devfeteamResponse } from 'devfeteam-init';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListBoardsRequest } from 'app/shared/models/requests/list-boards.request';
import { ListBoardResponse } from 'app/shared/models/responses/list-board-response';
import { ListColumnsRequest } from 'app/shared/models/requests/list-columns.request';
import { ListColumnsResponse } from 'app/shared/models/responses/list-columns-response';
import { SearchCardsResponse } from 'app/shared/models/responses/search-cards.response';
import { SearchCardRequest } from 'app/shared/models/requests/search-card-request';
import { ReadCardRequest } from 'app/shared/models/requests/read-card.request';
import { ReadCardResponse } from 'app/shared/models/responses/read-card.response';
import { TransitionCardRequest } from 'app/shared/models/requests/transition-card.request';
import { CreateCardRequest } from 'app/shared/models/requests/create-card.request';
import { Column } from 'app/shared/models/column.model';
import { DeleteBoardRequest } from 'app/shared/models/requests/delete-board.request';
import { UpdateBoardRequest } from 'app/shared/models/requests/update-board.request';
import { CreateBoardRequest } from 'app/shared/models/requests/create-board.request';
import { UpdateColumnPositionRequest } from 'app/shared/models/requests/update-column-position.request';
import { AddColumnRequest } from 'app/shared/models/requests/add-column.request';
import { UpdateColumnRequest } from 'app/shared/models/requests/update-column.request';
import { DeleteColumnRequest } from 'app/shared/models/requests/delete-column.request';

@Injectable()
export class BoardsApiService {

    constructor(private _restfulService: devfeteamRestService) {}

    listBoards(request: ListBoardsRequest): Observable<ListBoardResponse> {

        return this._restfulService.post('ListBoards', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new ListBoardResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    listColumns(request: ListColumnsRequest): Observable<ListColumnsResponse> {

        return this._restfulService.post('ListColumns', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new ListColumnsResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    addColumn(request: AddColumnRequest): Observable<Column> {

        return this._restfulService.post('AddColumn', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new Column();

            if (res.success) {
                searchResponse = res.value;
            }

            return searchResponse;
        }));
    }

    deleteColumn(request: DeleteColumnRequest): Observable<Column> {

        return this._restfulService.post('DeleteColumn', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new Column();

            if (res.success) {
                searchResponse = res.value;
            }

            return searchResponse;
        }));
    }

    updateColumn(request: UpdateColumnRequest): Observable<Column> {

        return this._restfulService.post('UpdateColumn', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new Column();

            if (res.success) {
                searchResponse = res.value;
            }

            return searchResponse;
        }));
    }

    
    updateColumnPosition(request: UpdateColumnPositionRequest): Observable<Column> {

        return this._restfulService.post('UpdateColumnPosition', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new Column();

            if (res.success) {
                searchResponse = res.value;
            }

            return searchResponse;
        }));
    }

    searchCards(request: SearchCardRequest): Observable<SearchCardsResponse> {

        return this._restfulService.post('SearchCards', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new SearchCardsResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    transitionCard(request: TransitionCardRequest): Observable<devfeteamBaseResponse> {

        return this._restfulService.post('TransitionCard', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new devfeteamBaseResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    read(request: ReadCardRequest): Observable<ReadCardResponse> {

        return this._restfulService.post('ReadCard', request, 'boards-api').pipe(map(res => {
            
            let searchResponse = new ReadCardResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    createCard(request: CreateCardRequest): Observable<devfeteamResponse> {

        return this._restfulService.post('CreateCard', request, 'boards-api', true).pipe(map(res => {
            
            let searchResponse = new devfeteamResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    createBoard(request: CreateBoardRequest): Observable<devfeteamResponse> {

        return this._restfulService.post('CreateBoard', request, 'boards-api', false).pipe(map(res => {
            
            let searchResponse = new devfeteamResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }
    
    updateBoard(request: UpdateBoardRequest): Observable<devfeteamResponse> {

        return this._restfulService.post('UpdateBoard', request, 'boards-api', false).pipe(map(res => {
            
            let searchResponse = new devfeteamResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    deleteBoard(request: DeleteBoardRequest): Observable<devfeteamResponse> {

        return this._restfulService.post('DeleteBoard', request, 'boards-api', false).pipe(map(res => {
            
            let searchResponse = new devfeteamResponse();

            if (res.success) {
                searchResponse = res.value;
            }

            searchResponse.success = res.success;
            return searchResponse;
        }));
    }

    

}
