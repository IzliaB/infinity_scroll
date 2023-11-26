import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionarImagenMensajeComponent } from './seleccionar-imagen-mensaje.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [SeleccionarImagenMensajeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FuseSharedModule,
    NgxGalleryModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [SeleccionarImagenMensajeComponent],
})
export class SeleccionarImagenMensajeModule { }
