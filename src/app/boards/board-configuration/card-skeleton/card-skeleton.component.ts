import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'card-skeleton',
    templateUrl: './card-skeleton.component.html',
    styleUrls: ['./card-skeleton.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CardSkeletonComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
