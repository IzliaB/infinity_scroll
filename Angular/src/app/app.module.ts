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
import { environment } from 'environments/enviroment.qa';
import { mockApiServices } from './shared/common';
import { MatSelectModule } from '@angular/material/select';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

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

        LayoutModule,
        SharedModule,
        MatSelectModule,
        // provideFirebaseApp(() => initializeApp(firebaseConfig)
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())
    ],
    providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
// platformBrowserDynamic().bootstrapModule(AppModule);
