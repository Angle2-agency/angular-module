import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ListBoard } from 'app/shared/models/list-board.model';
import { BoardsApiService } from 'app/shared/service/api/boards-api.service';
import { ListBoardsFilters } from 'app/shared/models/list-boards-filters.model';
import { ModuleService, ToastService, Tag, DateTimeService } from 'devfeteam-init';
import { ListBoardsRequest } from 'app/shared/models/requests/list-boards.request';
import { LocalListBoardModel } from 'app/shared/models/local-list-board.model';
import { DemographicsApiService } from 'app/shared/service/api/demographics-api.service';
import { ReadPatientRequest } from 'app/shared/models/requests/read-patient.request';
import { ReadPatientResponse } from 'app/shared/models/responses/read-patient-response';
import { CreateCardRequest } from 'app/shared/models/requests/create-card.request';
import { Patient } from 'app/shared/models/patient.model';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'send-to-board',
    templateUrl: './send-to-board.component.html',
    styleUrls: ['./send-to-board.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SendToBoardComponent implements OnInit {

    boards: LocalListBoardModel[] = [];
    selectedBoard: LocalListBoardModel;
    gettingBoards: boolean;
    sendingToBoard: boolean;
    readingPatient: boolean;
    organizationId: string;
    userSearchControl: FormControl = new FormControl();

    constructor(private _boardsApiService: BoardsApiService,
        private _moduleService: ModuleService,
        private _demographicsApiService: DemographicsApiService,
        private _toastService: ToastService,
        private _translateService: TranslateService) {
    }

    get boardSelected(): boolean {
        return this.boards.some(b => b.selected === true);
    }

    ngOnInit(): void {
        this.organizationId = this._moduleService.userContext.organization.id;
        this.getBoards();
    }

    getBoards(): void {

        let boardFilters = this.getListBoardFilters();

        let request: ListBoardsRequest = {
            filters: boardFilters
        };

        this.gettingBoards = true;
        this._boardsApiService.listBoards(request).subscribe(result => {

            if (result && result.success) {
                this.boards = result.boards;
            }

            this.gettingBoards = false;
        });
    }
    
    getListBoardFilters(): ListBoardsFilters {

        let boardFilters: ListBoardsFilters = {
            facilityIds: [ this._moduleService.userContext.facility.id],
            deletedStatus: 0
        };

        return boardFilters;
    }

    selectBoard(board: LocalListBoardModel): void {

        if (board.selected) {
            board.selected = false;
            this.selectedBoard = undefined;
        } 
        
        else {
            this.boards.map(b => b.selected = false);
            board.selected = true;
            this.selectedBoard = board;
        }
    }

    sendPatientToBoard(): void {

        let request: ReadPatientRequest = {
            id: this._moduleService.patient.patientId
        };

        this.sendingToBoard = true;
        this._demographicsApiService.read(request).subscribe(result => {

            if (result && result.success) {
                this.createCard(result);
            }

            this.sendingToBoard = false;
        });
    }

    createCard(readPatient: ReadPatientResponse): void {

        let patient = this.buildPatient(readPatient);
        let tag = this.buildTags(readPatient.patient.labels);

        let request: CreateCardRequest = {
            boardId: this.selectedBoard.boardId,
            columnId: this.selectedBoard.columns.find(cl => (cl.position === undefined || cl.position === 0)).columnId,
            title: readPatient.patient.name[0].text,
            patient: patient,
            tags: tag,
            userId: this.userSearchControl.value ? this.userSearchControl.value.userId : '',
            collapsed: true
        };

        this._boardsApiService.createCard(request).subscribe(result => {

            if (result && result.success) {

                this._toastService.showSuccess(this._translateService.instant('PATIENT-SENT-TO',
                {
                    patient: request.patient.name.text,
                    boardName: this.selectedBoard.name
                }));
            }

            else {
                this._toastService.showError(this._translateService.instant('BOARD-SENT-ERROR'));
            }

            this.sendingToBoard = false;
        });

    }

    buildPatient(readPatient: ReadPatientResponse): Patient {

        let patient: Patient = {
            patientId: readPatient.patient.id,
            name: readPatient.patient.name[0],
            coverage: readPatient.patient.coverage,
            telecom: readPatient.patient.telecom
        };

        return patient;
    }

    buildTags(labels: string[]): Tag[] {

        if (labels && labels.length > 0) {

            let tags = new Array<Tag>();

            labels.forEach(label => {

                let tag = new Tag();
                tag.text = label;
                tags.push(tag);
            });

            return tags;
        }

        else {
            return [];
        }

    }

    getSvgIcon(board: ListBoard): string {

        switch (board.imageIndex) {
            case undefined:
            case 0:
            case 1:
                return 'generic-board';
        
            case 2:
                return 'front-desk-board';
            
            case 3:
                return 'nurse-board';
            
            case 4:
                return 'doctor-board';
        }

    }

}
