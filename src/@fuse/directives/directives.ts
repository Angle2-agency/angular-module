import { NgModule } from '@angular/core';
import { FuseInnerScrollDirective } from '@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';

@NgModule({
    declarations: [
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        FuseInnerScrollDirective,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePerfectScrollbarDirective
    ]
})
export class FuseDirectivesModule
{
}
