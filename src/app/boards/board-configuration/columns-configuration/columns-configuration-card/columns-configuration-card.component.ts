import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'columns-configuration-card',
    templateUrl: './columns-configuration-card.component.html',
    styleUrls: ['./columns-configuration-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ColumnsConfigurationCardComponent implements OnInit {

    @Input() data: any;
    @Input('editColumnIndex')
    set editColumnIndex(value: number) {
        this.editIndex = value;
        this.setEdit();
    }

    @Input('indexSet')
    set indexSet(index: number) {
        this.index = index;
        this.setEdit();
    }

    @Output() saveColumnEvent = new EventEmitter();
    @Output() cancelColumnEvent = new EventEmitter();
    @Output() deleteColumnEvent = new EventEmitter();
    @Output() editColumnEvent = new EventEmitter();
    
    isEdit: boolean;
    addColumn: FormGroup;
    index: number;
    editIndex: number;

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.addColumn = this._formBuilder.group({
            name: [this.data.name || ''],
            description: [this.data.description || '']
        });
    }

    save(): void {
        this.data.name = this.addColumn.get('name').value;
        this.data.description = this.addColumn.get('description').value;
        this.saveColumnEvent.emit(this.data);
    }

    cancel(): void {
        this.cancelColumnEvent.emit(this.data);
    }

    delete(): void {
        this.deleteColumnEvent.emit(this.data);
    }

    edit(): void {
        this.editColumnEvent.emit(this.data);
    }

    setEdit(): void {
        if(this.index === this.editIndex) {
            this.isEdit = true;
        } else {
            this.isEdit = false;
        }
    }

}