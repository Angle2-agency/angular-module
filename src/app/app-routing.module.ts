import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './boards/board/board.component';
import { ViewCardDetailsComponent } from './boards/sidebars/view-card-details/view-card-details.component';
import { SendToBoardComponent } from './boards/send-to-board/send-to-board.component';
import { AddBoardSidebarComponent } from './boards/sidebars/add-board-sidebar/add-board-sidebar.component';
import { BoardConfigurationComponent } from './boards/board-configuration/board-configuration.component';
import { FilterBoardSidebarComponent } from './boards/sidebars/filter-board-sidebar/filter-board-sidebar.component';
import { ColumnsConfigurationComponent } from './boards/board-configuration/columns-configuration/columns-configuration.component';

const routes: Routes = [
    { path: 'boards', component: BoardComponent },
    { path: 'view-card-details', component: ViewCardDetailsComponent },
    { path: 'board-configuration', component: BoardConfigurationComponent },
    { path: 'add-board-sidebar', component: AddBoardSidebarComponent },
    { path: 'filter-board-sidebar', component: FilterBoardSidebarComponent },
    { path: 'column-configuration', component: ColumnsConfigurationComponent },
    { path: 'send-to-board', component: SendToBoardComponent },
    { path: '**', redirectTo: 'boards' }
];

@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forRoot(routes)
    ],

    exports: [ RouterModule ],
})
export class AppRoutingModule {}
