import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'delete-board-dialog',
    templateUrl: './delete-board-dialog.component.html',
    styleUrls: ['./delete-board-dialog.component.scss']
})
export class DeleteBoarDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DeleteBoarDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
    }

    close(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(this.data);
    }
}
