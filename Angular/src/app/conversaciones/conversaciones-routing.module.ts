import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversacionComponent } from './components/conversacion/conversacion.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

const routes: Routes = [
    {
        path: 'chats',
        component: ConversacionComponent,
        children: [
            {
                path: ':id',
                component: MensajesComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConversacionesRoutingModule { }
