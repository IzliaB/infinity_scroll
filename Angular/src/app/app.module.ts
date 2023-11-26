import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, Route, RouterModule } from '@angular/router';
import { FuseConfigModule } from '@fuse/services/config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from './layout/layout.module';
import { FuseModule } from '@fuse';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from 'app/layout/layout.component';
import { appConfig } from './fuse-config/app.config';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { AngularFireModule, FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'environments/enviroment.qa';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IAbcDataAccessConfig } from './shared/interfaces/firebase-config.interface';
import { mockApiServices } from './shared/common';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule


const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    // Activa los router events
    // enableTracing: true
};

export const appRoutes: Route[] = [
    {
        path: 'home',
        component: LayoutComponent,
        data: {
            layout: 'classy'
        },
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'conversations',
        component: LayoutComponent,
        data: {
            layout: 'classy'
        },
        loadChildren: () => import('./conversaciones/conversaciones.module').then(m => m.ConversacionesModule)
    },
];


@NgModule({
    declarations: [
        AppComponent,
        // ConversationsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse Modules
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        FuseSharedModule,
        // FuseLoadingBarModule,

        LayoutModule,
        SharedModule,
        // TranslateModule.forRoot()
        AngularFireModule.initializeApp(environment.dataAccessConfig),
        AngularFirestoreModule.enablePersistence(),
        MatSelectModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    static forRoot(
        config: IAbcDataAccessConfig
    ): ModuleWithProviders<AppModule> {
        return {
            ngModule: AppModule,
            providers: [
                { provide: FIREBASE_APP_NAME, useValue: config.appName },
                { provide: FIREBASE_OPTIONS, useValue: config.firebaseConfig }
            ]
        }
    }
}
