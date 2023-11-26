import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversacionesRoutingModule } from './conversaciones-routing.module';
import { ConversacionModule } from './components/conversacion/conversacion.module';
import { MensajesModule } from './components/mensajes/mensajes.module';
import { SelectedConversationService } from './services/seleccionarconversacion.service';
import { SharedModule } from 'app/shared/shared.module';
import { NuevaConversacionComponent } from './components/nueva-conversacion/nueva-conversacion.component';
import { NuevaConversacionModule } from './components/nueva-conversacion/nueva-conversacion.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ConversacionesRoutingModule,
    NuevaConversacionModule,
    SharedModule
  ],
  providers: [SelectedConversationService]
})
export class ConversacionesModule { }
