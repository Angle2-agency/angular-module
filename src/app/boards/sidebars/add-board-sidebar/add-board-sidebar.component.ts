import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModuleService, SidebarModuleService, ImageIndex, ToastService } from 'devfeteam-init';
import { BoardsApiService } from 'app/shared/service/api/boards-api.service';
import { ImageIndexSVG } from 'app/shared/models/enums/image-index-svg.enum';
import { TranslateService } from '@ngx-translate/core';
import { UpdateBoardRequest } from 'app/shared/models/requests/update-board.request';
import { CreateBoardRequest } from 'app/shared/models/requests/create-board.request';

@Component({
    selector: 'add-board-sidebar',
    templateUrl: './add-board-sidebar.component.html',
    styleUrls: ['./add-board-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddBoardSidebarComponent implements OnInit {
        
    get moduleData(): any {
        return this._moduleService.moduleConfiguration.moduleData;
    }

    get isValidForm(): boolean {
        return this.addBoardForm.valid;
    }
    
    addBoardForm: FormGroup;
    imageIndex = ImageIndex;
    showImgsList: boolean;
    imgIndex: number;
    imageIndexSVG = ImageIndexSVG;
    editFlag: boolean;
    facilityIds: string[] = [];
    isAddingBoard: boolean = false;
    isSavingBoard: boolean = false;
    
    constructor(private _formBuilder: FormBuilder,
        private _moduleService: ModuleService,
        private _sidebarService: SidebarModuleService,
        private _boardsApiService: BoardsApiService,
        private _toastService: ToastService,
        private _translateService: TranslateService,) { }

    ngOnInit(): void {
        this.createBoardForm();
    }

    private createBoardForm(): void {
        if(this.moduleData) {
            this.addBoardForm = this._formBuilder.group({
                name: [this.moduleData.name],
                description: [this.moduleData.description],
            });

            this.imgIndex = this.moduleData.imageIndex;
            this.editFlag = true;
        } else {
            this.addBoardForm = this._formBuilder.group({
                name: [''],
                description: [''],
            });
        }
    }

    createBoard(): void {
        let request = this.createRequest();
        this.isAddingBoard = true;
        this._boardsApiService.createBoard(request).subscribe((res) => {
            this.isAddingBoard = false;

            this._toastService.showSuccess(this._translateService.instant('ADD-BOARD-SUCCESS'));

            this._sidebarService.sendResponse({
                moduleData: res,
                openType: "create"
            }, true);
        });
    }

    editBoard(): void {
        let request = this.updateRequest();
        request.boardId = this.moduleData.boardId;
        this.isSavingBoard = true;
        this._boardsApiService.updateBoard(request).subscribe((res) => {
            this.isSavingBoard = false;
            this._toastService.showSuccess(this._translateService.instant('UPDATE-BOARD-SUCCESS'));
            this._sidebarService.sendResponse({
                moduleData: res,
                openType: "edit"
            }, true);
        });
    }

    private updateRequest(): UpdateBoardRequest {
        let request = new UpdateBoardRequest();
        request.name = this.addBoardForm.get('name').value;
        request.description = this.addBoardForm.get('description').value;
        request.imageIndex = this.imgIndex;
        request.facilityIds = this.facilityIds;

        return request;
    }

    private createRequest(): CreateBoardRequest {
        let request = new CreateBoardRequest();
        request.name = this.addBoardForm.get('name').value;
        request.description = this.addBoardForm.get('description').value;
        request.imageIndex = this.imgIndex;
        request.facilityIds = this.facilityIds;
        request.columns = [{
            "position": 0,
            "name": "Column 1",
            "description": "",
            "hidden": false
        },
        {
            "position": 1,
            "name": "Column 2",
            "description": "",
            "hidden": false,
        }];

        return request;
    }

    selectImgsIndex(index): void {
        this.imgIndex = index;
        this.showImgsList = false;
    }

    facilitySelected(value): void {
        if(this.facilityIds.indexOf(value.facilityId) === -1){
            this.facilityIds.push(value.facilityId);
        }
    }

    facilityRemoved(value): void {
        let index = this.facilityIds.indexOf(value.facilityId);
        if(index !== -1){
            this.facilityIds.splice(index, 1);
        } 
    }
}