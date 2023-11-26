import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-dashboard-principal',
    templateUrl: './dashboard-principal.component.html',
    styleUrls: ['./dashboard-principal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DashboardPrincipalComponent implements OnInit {
    drawerComponent: 'profile' | 'new-chat';
    drawerOpened: boolean = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        // this._changeDetectorRef.markForCheck();
    }

    // Define una lista de productos
    products = [
        { id: 2, nombre: 'Producto 1' },
        { id: 3, nombre: 'Producto 2' },
        { id: 4, nombre: 'Producto 3' },
    ];

    // Define una lista de Tickets
    tickets = [
        { id: 2, nombre: 'Ticket 1' },
        { id: 3, nombre: 'Ticket 2' },
        { id: 4, nombre: 'Ticket 3' },
    ];

    // Define una lista de Chats
    chats = [
        { id: 2, nombre: 'Chat 1' },
        { id: 3, nombre: 'Chat 2' },
        { id: 4, nombre: 'Chat 3' },
    ];

    // Define una lista de Llamadas
    llamadas = [
        { id: 2, nombre: 'Llamada 1' },
        { id: 3, nombre: 'Llamada 2' },
        { id: 4, nombre: 'Llamada 3' },
    ];
}
