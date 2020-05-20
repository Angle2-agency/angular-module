import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SidebarModuleService } from 'devfeteam-init';

@Component({
    selector: 'filter-board-sidebar',
    templateUrl: './filter-board-sidebar.component.html',
    styleUrls: ['./filter-board-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FilterBoardSidebarComponent implements OnInit {
    facilityIds: string[] = [];

    constructor(private _sidebarService: SidebarModuleService) { }

    ngOnInit(): void {

    }

    showResult(): void {
        this.closeSidebar();
    }

    closeSidebar(): void {
        this._sidebarService.sendResponse({
            moduleData: this.facilityIds,
            openType: "filter"
        }, true);
    }

    clearAll(): void {
        this.facilityIds = [];
        this.closeSidebar();
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