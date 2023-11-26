import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-filtrar-conversaciones',
    templateUrl: './filtrar-conversaciones.component.html',
    styleUrls: [],
})
export class FiltrarConversacionesComponent implements OnInit {
    @Input() drawer: MatDrawer;

    constructor() {}

    ngOnInit() {}

    showContent: boolean = false;
    showContent2: boolean = false;

    toggleContent() {
        this.showContent = !this.showContent;
    }

    toggleContent2() {
        this.showContent2 = !this.showContent2;
    }


    vistasPredeterminadas = [
        { label: 'Conversaciones abiertas y sin asignar', cantidad: 15 },
        { label: 'Conversaciones abiertas y asignadas', cantidad: 32 },
        { label: 'Conversaciones resueltas', cantidad: 152 },
        { label: 'Conversaciones de boots', cantidad: 139 },
    ];

    vistasCopartidas = [
        { label: 'Bip Bip Solucionados', cantidad: 185 },
        { label: 'Yalo Tech Ventas', cantidad: 306 },
        { label: 'Yalo Tech Support', cantidad: 175 },
    ];
}
