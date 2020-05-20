import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BoardsModule } from './boards/boards.module';
import { DomainService } from 'devfeteam-init';
import { environment } from 'environments/environment';
import { fuseConfig } from '@fuse/fuse-config';

const appInitializerFn = (domainService: DomainService) => {
    return () => {
        return domainService.setAppDomains(environment.apiHost, 'boards-api');
    };
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),

        // Shared module
        SharedModule,
   
        // Fuse Config
        FuseModule.forRoot(fuseConfig),
        
        // App modules
        LayoutModule,
        BoardsModule,

        // Routing, should be at the end
        AppRoutingModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [DomainService]
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
