import { Component, ViewEncapsulation, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ImageIndexSVG } from 'app/shared/models/enums/image-index-svg.enum';
import { FacilityApiService } from 'app/shared/service/api/facility-api.service';
import { Board } from 'app/shared/models/board.model';
import { FacilityListNamesRequest } from 'app/shared/models/requests/facility-list-names.request';
import { FacilityListName } from 'app/shared/models/facility-list-names.model';

@Component({
    selector: 'board-configuration-card',
    templateUrl: './board-configuration-card.component.html',
    styleUrls: ['./board-configuration-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BoardConfigurationCardComponent implements OnInit{

    @Input() data: Board;
    @Output() openEditSideBarEvent = new EventEmitter();
    @Output() openDeleteSideBarEvent = new EventEmitter();
    @Output() selectBoardEvent = new EventEmitter();
    
    hideContent: boolean = false;
    showNewCardFooter: boolean = false;
    showUpdatedCardFooter: boolean = false;
    showWorkingCardFooter: boolean = false;
    showCheckbox: boolean = false;
    showFacilityIds: boolean;
    imageIndexSVG = ImageIndexSVG;
    facilities: FacilityListName[];

    constructor(private facilityApiService: FacilityApiService) {
    }

    ngOnInit(): void {
        this.hideContent = false;
        this.showNewCardFooter = false;
        this.showUpdatedCardFooter = false;
        this.showWorkingCardFooter = false;
        this.showWorkingCardFooter = false;
        this.showCheckbox = false;

        if(this.data.facilityIds.length){
            this.getListNames();
        }
    }

    getListNames(): void {
        let request = new FacilityListNamesRequest();
        request.facilityIds = this.data.facilityIds;

        this.facilityApiService.listNames(request).subscribe((data) => {
            this.facilities = data.facilities;
        })
    }

    openEditSideBar(): void {
        this.openEditSideBarEvent.emit(this.data);
    }

    openDeleteSideBar(): void {
        this.openDeleteSideBarEvent.emit(this.data);
    }

    selectBoard() :void {
        this.selectBoardEvent.emit(this.data);
    }
}
