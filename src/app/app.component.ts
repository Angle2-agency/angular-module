import { Component, Inject, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from 'app/i18n/en';
import { locale as spanish } from 'app/i18n/es';
import { DomainService, ModuleService, ModuleContextResult } from 'devfeteam-init';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    isAllowed = false;

    messageSubscription: any;
    private _unsubscribeAll: Subject<any>;

    constructor(@Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _moduleService: ModuleService,
        private _domainService: DomainService,
        private _router: Router,
        private _matIconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Get Context
        this.getApplicationContext();

        // Register custom SVG icons
        this.initSvgIconRegistry();

        // Add languages
        this._translateService.addLangs(['en', 'es']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);

        // Use a language
        this._translateService.use('en');

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }
    }

    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if ( this.fuseConfig.layout.width === 'boxed' ) {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for ( let i = 0; i < this.document.body.classList.length; i++ ) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    private getApplicationContext(): void {
        if (window.self === window.top) {

            if (isDevMode()) {
                // Set your token and IDs here for single module testing.
                this._moduleService.authToken = '';
                this._moduleService.subscriptionId = '';
                this._moduleService.organizationId = '';
                this._moduleService.facilityId = '';
                this.isAllowed = true;

                return;
            }

            window.location.href = this._domainService.shellDomain;
            return;
        }

        // Request user context.
        this._moduleService.onModuleContextRequest().pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                if (result.userContext) {
                    this.resolveShellCulture(result);
                    this.resolveRoute(result);
                    this.isAllowed = true;
                }
        });
    }

    // Read initial culture from shell context message
    private resolveShellCulture(shellResponse: ModuleContextResult): void {
        if (shellResponse.moduleConfiguration.culture) {
            this._translateService.use(shellResponse.moduleConfiguration.culture);   
        }
    }

    private resolveRoute(shellResponse: ModuleContextResult): void {
        if (!shellResponse.moduleConfiguration.moduleRoute || 
            shellResponse.moduleConfiguration.moduleRoute === '') {
            // Default route
            this._router.navigate(['boards']);

        } else {
            // Route from module configuration
            this._router.navigate([shellResponse.moduleConfiguration.moduleRoute]);
        }
    }

    // Register custom SVG icons
    private initSvgIconRegistry(): void {
         this._matIconRegistry.addSvgIcon('search', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/search.svg'));
        this._matIconRegistry.addSvgIcon('add', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/add.svg'));
        this._matIconRegistry.addSvgIcon('close', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/close.svg'));
        this._matIconRegistry.addSvgIcon('filter', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/filter.svg'));
        this._matIconRegistry.addSvgIcon('ellipsis', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/ellipsis.svg'));
        this._matIconRegistry.addSvgIcon('vertical-list', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/vertical-list.svg'));
        this._matIconRegistry.addSvgIcon('setting', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/setting.svg'));
        this._matIconRegistry.addSvgIcon('empty-board', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/empty-board.svg'));
        this._matIconRegistry.addSvgIcon('board-icon', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/board-icon.svg'));
        this._matIconRegistry.addSvgIcon('arrow-down', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/arrow-down.svg'));
        this._matIconRegistry.addSvgIcon('arrow-up', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/arrow-up.svg'));
        this._matIconRegistry.addSvgIcon('time', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/time.svg'));
        this._matIconRegistry.addSvgIcon('info', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/info.svg'));
        this._matIconRegistry.addSvgIcon('edit', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/edit.svg'));
        this._matIconRegistry.addSvgIcon('billable', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/billable.svg'));
        this._matIconRegistry.addSvgIcon('nobillable', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/nobillable.svg'));
        this._matIconRegistry.addSvgIcon('unspecified', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/unspecified.svg'));
        this._matIconRegistry.addSvgIcon('generic-board', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/generic-board.svg'));
        this._matIconRegistry.addSvgIcon('deff-board', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/generic-board.svg'));
        this._matIconRegistry.addSvgIcon('doctor-board', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/doctor-board.svg'));
        this._matIconRegistry.addSvgIcon('nurse-board', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/nurse-board.svg'));
        this._matIconRegistry.addSvgIcon('front-desk-board', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/front-desk-board.svg'));
        this._matIconRegistry.addSvgIcon('demographics', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/demographics.svg'));
        this._matIconRegistry.addSvgIcon('no-results', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/no-results.svg'));
        this._matIconRegistry.addSvgIcon('picture', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/picture.svg'));
        this._matIconRegistry.addSvgIcon('delete', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/delete.svg'));
        this._matIconRegistry.addSvgIcon('drag', this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/drag.svg'));
    }
}
