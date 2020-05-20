import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FacilityApiService } from 'app/shared/service/api/facility-api.service';
import { FacilityListNamesRequest } from 'app/shared/models/requests/facility-list-names.request';
import { FacilityListName } from 'app/shared/models/facility-list-names.model';

@Component({
    selector: 'board-configuration-header',
    templateUrl: './board-configuration-header.component.html',
    styleUrls: ['./board-configuration-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BoardConfigurationHeaderComponent implements OnInit {
    @Output() searchOutput = new EventEmitter<string>();
    @Output() addBoardEvent = new EventEmitter<string>();
    @Output() filterClickEvent = new EventEmitter<string>();
    @Output() showDeletedEvent = new EventEmitter<boolean>();
    @Output() facilityIdsChangeEvent = new EventEmitter<any>();
    
    searchControl: FormControl = new FormControl('');

    showDeleted: boolean;
    facilities: FacilityListName[];
    facilityIds: string[] = [];

    @Input('facilityIdsSet')
    set facilityIdsSet(arr) {
        if(arr.length){
            this.getListNames(arr);
            this.facilityIds = arr;
        } else {
            this.facilities = [];
        }
    }

    constructor(private facilityApiService: FacilityApiService) {
    }

    ngOnInit(): void {
        this.subscribeToSearchInputChanges();
    }

    removeChip(i): void {
        const index = this.facilityIds.indexOf(this.facilities[i].facilityId);
    
        this.facilityIds.splice(index, 1);
        
        this.facilities.splice(i, 1);

        this.facilityIdsChanges();
    }

    private subscribeToSearchInputChanges(): void {
        this.searchControl.valueChanges.subscribe(input => {
            this.searchOutput.emit(input);
        });
    }

    addBoard(): void {
        this.addBoardEvent.emit("");
    }

    showDeletedChanged(e): void {
        this.showDeletedEvent.emit(e.checked);
    }

    facilityIdsChanges(): void {
        this.facilityIdsChangeEvent.emit(this.facilityIds);
    }

    filterClick(): void {
        this.filterClickEvent.emit("");
    }

    getListNames(facilityIds): void {
        let request = new FacilityListNamesRequest();
        request.facilityIds = facilityIds;
        
        this.facilityApiService.listNames(request).subscribe((data) => {
            this.facilities = data.facilities;
        })
    }
}
