import { AfterViewInit, Component, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
    selector: 'app-seleccionar-imagen',
    templateUrl: './seleccionar-imagen-mensaje.component.html',
    styleUrls: ['./seleccionar-imagen-mensaje.component.scss'],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeleccionarImagenMensajeComponent implements OnInit, AfterViewInit, OnDestroy {

    unsubscribe$ = new Subject<void>();

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(
        public dialogRef: MatDialogRef<SeleccionarImagenMensajeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() { }

    closeGallery(): void {
        this.dialogRef.close();
    }


    downloadImage(): void {
        // Implementa lógica para descargar la imagen
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

