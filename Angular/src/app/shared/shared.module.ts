import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoCoreModule } from './transloco/transcolo.module';
import { IconsModule } from './icons/icons.module';
import { SeleccionarImagenMensajeModule } from './modals/seleccionar-imagen-mensaje/seleccionar-imagen-mensaje.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        TranslocoCoreModule,
        SeleccionarImagenMensajeModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        TranslocoCoreModule,
    ],
    declarations: [
  ]
})
export class SharedModule
{
}
