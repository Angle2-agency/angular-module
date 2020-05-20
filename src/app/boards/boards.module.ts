import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BoardComponent } from './board/board.component';
import { BoardHeaderComponent } from './board/board-header/board-header.component';
import { CardComponent } from './board/card/card.component';
import { ViewCardDetailsComponent } from './sidebars/view-card-details/view-card-details.component';
import { SendToBoardComponent } from './send-to-board/send-to-board.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddBoardSidebarComponent } from './sidebars/add-board-sidebar/add-board-sidebar.component';
import { BoardConfigurationComponent } from './board-configuration/board-configuration.component';
import { BoardConfigurationHeaderComponent } from './board-configuration/board-configuration-header/board-configuration-header.component';
import { BoardConfigurationCardComponent } from './board-configuration/board-configuration-card/board-configuration-card.component';
import { DeleteBoarDialogComponent } from './dialogs/delete-board-dialog/delete-board-dialog.component';
import { FilterBoardSidebarComponent } from './sidebars/filter-board-sidebar/filter-board-sidebar.component';
import { ColumnsConfigurationComponent } from './board-configuration/columns-configuration/columns-configuration.component';
import { ColumnsConfigurationCardComponent } from './board-configuration/columns-configuration/columns-configuration-card/columns-configuration-card.component';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { CardSkeletonComponent } from './board-configuration/card-skeleton/card-skeleton.component';

@NgModule({
    imports: [
        MatSlideToggleModule,
        SharedModule,
        NgxSmoothDnDModule
    ],
    declarations: [
        BoardConfigurationCardComponent,
        BoardComponent,
        BoardHeaderComponent,
        CardComponent,
        ViewCardDetailsComponent,
        FilterBoardSidebarComponent,
        AddBoardSidebarComponent,
        SendToBoardComponent,
        BoardConfigurationHeaderComponent,
        BoardConfigurationComponent,
        DeleteBoarDialogComponent,
        ColumnsConfigurationComponent,
        ColumnsConfigurationCardComponent,
        CardSkeletonComponent
    ],
    exports: [
    ],
    entryComponents: [
        DeleteBoarDialogComponent
    ]
})
export class BoardsModule { }
