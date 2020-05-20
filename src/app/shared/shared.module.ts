import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppMaterialModule } from 'app/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceModule } from './service/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSidebarModule, FuseProgressBarModule } from '@fuse/components';
import { devfeteaminitModule } from 'devfeteam-init';
import { devfeteamComponentsModule } from 'devfeteam-mode';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
    declarations: [SearchPipe],
    imports: [
        CommonModule,
        BrowserModule,
        FuseSharedModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceModule,
        TranslateModule,
        FuseSidebarModule,
        FuseProgressBarModule,
        devfeteaminitModule,
        devfeteamComponentsModule
    ],
    exports: [
        CommonModule,
        BrowserModule,
        FuseSharedModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceModule,
        TranslateModule,
        FuseSidebarModule,
        FuseProgressBarModule,
        devfeteaminitModule,
        devfeteamComponentsModule,
        SearchPipe

    ],    
})
export class SharedModule {}
