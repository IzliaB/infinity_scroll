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
import { ConversacionComponent } from './conversacion.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MensajesModule } from '../mensajes/mensajes.module';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { FiltrarConversacionesComponent } from '../filtrar-conversaciones/filtrar-conversaciones.component';
import { MatSelectModule } from '@angular/material/select';
// import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// import { IntersectionListenerDirective } from 'app/shared/directive/scrollable.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [ConversacionComponent, MensajesComponent, FiltrarConversacionesComponent],
    imports: [

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        // HotToastModule.forRoot(),
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatDividerModule,
        // ScrollingModule,
        MatSelectModule,
        InfiniteScrollModule,
        FuseSharedModule,

        MatCheckboxModule,
        SharedModule,
        // MensajesModule,
        RouterModule
    ],
    providers: [DatePipe],
    exports: [ConversacionComponent, FiltrarConversacionesComponent]
})
export class ConversacionModule {
}