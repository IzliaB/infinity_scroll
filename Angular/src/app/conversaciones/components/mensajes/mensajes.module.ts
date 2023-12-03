import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
// import { HotToastModule } from '@ngneat/hot-toast';
import { MensajesComponent } from './mensajes.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from 'app/shared/shared.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [],
    imports: [

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
       // InfiniteScrollModule,
        // HotToastModule.forRoot(),
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatDividerModule,
        // InfiniteScrollModule,
        NgxGalleryModule,

        MatCheckboxModule,
        SharedModule,
        FuseSharedModule
    ],
    providers: [DatePipe]
})
export class MensajesModule {
}
// platformBrowserDynamic().bootstrapModule(MensajesModule);
