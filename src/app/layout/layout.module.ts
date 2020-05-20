import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        RouterModule,
        FuseSharedModule,
        FuseSidebarModule,
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {}
