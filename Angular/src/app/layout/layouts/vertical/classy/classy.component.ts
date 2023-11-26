import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/shared/types/navigation.types';
import { NavigationService } from 'app/shared/services/navigation.service';
import { navigation } from 'app/navigation/navigation';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig } from 'app/fuse-config/app.config';
import { DOCUMENT } from '@angular/common';
// import { Navigation } from 'app/core/navigation/navigation.types';
// import { NavigationService } from 'app/core/navigation/navigation.service';
// import { User } from 'app/core/user/user.types';
// import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: any;
    config: AppConfig;

    // user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        // private _navigationService: NavigationService,
        // private _userService: UserService,
        private _fuseConfigService: FuseConfigService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {

        this.navigation = navigation;

        this._fuseNavigationService.storeNavigation('main', this.navigation)

        this._fuseNavigationService.getNavigation('main')
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        // this._navigationService.navigation$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((navigation: Navigation) => {
        //         console.log('navigation1', navigation);
        //         this.navigation = navigation;
        //     });

        // // Subscribe to the user service
        // this._userService.user$
        //     .pipe((takeUntil(this._unsubscribeAll)))
        //     .subscribe((user: User) => {
        //         this.user = user;
        //     });

        // console.log('123', this.navigation);

        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {

                // console.log('config', config);

                this.config = config;

                // console.log(object);

            })
        // .config
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe((config) => {
        //     console.log('config', config);
        //     this.config = config;
        // });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // console.log('matchingAliases', matchingAliases);
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        console.log('navigation234 ', navigation);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
