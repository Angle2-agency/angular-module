import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, 
         MatIconModule, 
         MatCheckboxModule, 
         MatInputModule, 
         MatSnackBarModule, 
         MatMenuModule, 
         MatSelectModule, 
         MatTabsModule, 
         MatCardModule, 
         MatStepperModule,
         MatRadioModule,
         MatDatepickerModule,
         MatProgressSpinnerModule,
         MatExpansionModule,
         MatTooltipModule,
         MatChipsModule,
         MatStepper,
         MatDividerModule,
         MatTableModule,
         MatPaginatorModule} from '@angular/material';

@NgModule({ 
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule, 
        MatMomentDateModule,
        MatSnackBarModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatProgressSpinnerModule, 
        MatRadioModule,
        MatDatepickerModule,   
        MatExpansionModule,
        MatStepperModule, 
        MatTooltipModule,
        MatChipsModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule

    ], 

    exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule, 
        MatMomentDateModule,
        MatSnackBarModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatDatepickerModule,  
        MatExpansionModule,
        MatStepperModule, 
        MatTooltipModule,
        MatChipsModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule
    ],

    providers: [{provide: MatStepper}]
})
 export class AppMaterialModule { }

