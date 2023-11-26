import { DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ConversacionesService } from 'app/conversaciones/services/conversacion.service';
import { Observable, Subject, concat, debounceTime, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionarImagenMensajeComponent } from 'app/shared/modals/seleccionar-imagen-mensaje/seleccionar-imagen-mensaje.component';
import {
    BodyMessage,
    TypeMessage,
} from 'app/conversaciones/conversations.types';
import { ScrollService } from 'app/conversaciones/services/scrollService.service';
import { PaginationService } from 'app/conversaciones/services/messages.service';
@Component({
    selector: 'app-mensajes',
    templateUrl: './mensajes.component.html',
    styleUrls: ['./mensajes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajesComponent implements OnInit {
    isConversationSelected = false;
    customerID: string = '';

    @ViewChild('messageInput') messageInput: ElementRef;
    @ViewChild('pdfFileInput') pdfFileInput: ElementRef | undefined;
    @ViewChild('imageFileInput') imageFileInput: ElementRef | undefined;
    chat: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    messageContent: string = ''; // Propiedad para el contenido del mensaje
    conversations$: Observable<any[]>;

    // lightboxActiveState: boolean[] = [];
    lightboxActiveState: { [messageId: string]: boolean } = {};

    isResponderInputVisible = true;
    isNotaPrivadaInputVisible = false;
    isResponderActive = true;
    isNotaPrivadaActive = false;

    imgIndex: number = 0;
    selectedFileType: TypeMessage;
    selectedImage: { name: string; url: string } | null = null;
    selectedPDF: { name: string; url: string } | null = null;
    selectedImageName: string = '';
    fileSelected: File;
    fileSelectedDocument: File;
    showEmptyMessageWarning = false;

    @ViewChild('scrollContainer') scrollContainer: ElementRef;

    pageSize = 3; // Número de mensajes por página
    messages = [];
    loading = false;
    lastVisible = null; // Último mensaje visible para paginación

    constructor(
        private route: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _chatService: ConversacionesService,
        private datePipe: DatePipe,
        private sanitizer: DomSanitizer,
        public dialog: MatDialog,
        private scrollService: ScrollService,
        public pageMessages: PaginationService
    ) { }

    @HostListener('input')
    @HostListener('ngModelChange')

    ngOnInit(): void {

        this.customerID = this.route.snapshot.paramMap.get('id');

        this.getAvisosTest();


        this._changeDetectorRef.markForCheck();

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                this._changeDetectorRef.markForCheck();
            });
    }



    getAvisosTest() {
        console.log('Calling getAvisosTest with customerID:', this.customerID);
        this.pageMessages.init(this.customerID, {
            reverse: false,
            prepend: false,
        });
    }



    scrollHandler(e) {
        // if (e === 'bottom') {
        //   this.page.more()
        // }

        if (e === 'top') {
            this.pageMessages.more(this.customerID);
        }
    }





    loadMoreMessages(): void {
        if (this.lastVisible) {
            this.loading = true;
            this._chatService
                .getConversationxMessages(this.customerID, this.pageSize, this.lastVisible)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(({ messages, hasMore }) => {
                    if (hasMore) {
                        // Use a temporary array to prevent overwriting the existing messages
                        const tempMessages = [...this.messages, ...messages];
                        this.lastVisible = messages[messages.length - 1].createdAt;

                        // Update the conversations$ observable (if needed)
                        // This might be optional based on your use case
                        this.conversations$ = of(tempMessages);

                        // Delay the update to reduce the visual flickering
                        setTimeout(() => {
                            this.messages = tempMessages;
                            this.loading = false;
                            this._changeDetectorRef.markForCheck();
                        }, 300);
                    } else {
                        // No more messages to load
                        this.loading = false;
                    }
                });
        }
    }

    openImageInGallery(imageUrl: any) {
        // console.log('imageUrl', imageUrl.changingThisBreaksApplicationSecurity.toString());
        this.dialog.open(SeleccionarImagenMensajeComponent, {
            width: '100%',
            data: { imageUrl: imageUrl },
        });
    }

    openImageInLightbox(messageId: any) {
        console.log(
            'lightboxActiveState antes de la actualización:',
            this.lightboxActiveState
        );
        console.log('imgIndex antes de la actualización:', this.imgIndex);

        this.lightboxActiveState[messageId] =
            !this.lightboxActiveState[messageId];
        this.imgIndex = messageId; // Ajusta esto según tus necesidades

        console.log(
            'lightboxActiveState después de la actualización:',
            this.lightboxActiveState
        );
        console.log('imgIndex después de la actualización:', this.imgIndex);
    }

    closeLightbox(index): void {
        this.lightboxActiveState[index] = false;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // Función para convertir el objeto de fecha a Date
    convertirAFecha(fecha: any): Date {
        const segundos = fecha?.seconds || 0;
        const nanosegundos = fecha?.nanoseconds || 0;
        const milisegundos = segundos * 1000 + nanosegundos / 1000000;
        return new Date(milisegundos);
    }

    // Función para formatear la fecha utilizando DatePipe
    formatearFecha(fecha: any, formato: string): string {
        return this.datePipe.transform(fecha, formato);
    }


    getMessageContent(message): SafeHtml {
        return this.sanitizer.bypassSecurityTrustResourceUrl(message);
    }

    openContactInfo(): void {
        this.drawerOpened = true;
        this._changeDetectorRef.markForCheck();
    }

    sendText(conversationId, context, phoneNumber, ticketID) {
        console.log('customerId send', conversationId);
        console.log('data', context);

        const data = {
            message_text: context,
            customerID: conversationId,
            ticketID: ticketID,
            from_phone_number: '15550577504',
            to_phone_number: phoneNumber,
        };
        console.log('new message', data);

        this._chatService.sendTextMessage(data).subscribe(
            (value) => {
                console.log('value', value);

                // Limpiar el contenido del mensaje después de enviarlo
                this.messageContent = '';
                this.selectedImage = null;
                this.messageInput.nativeElement.blur();
            },
            (error) => {
                console.error('Error sending message:', error);
            }
        );
    }

    // Enviar multimedia
    sendMultimedia(conversationId, context, phoneNumber, customerID) {
        console.log('customerId send', conversationId);
        console.log('data', context);

        // Verifica si hay un archivo de imagen seleccionado
        if (this.fileSelected) {
            const data: BodyMessage = {
                content: context,
                toPhone: phoneNumber,
                conversationID: conversationId,
                customerID: customerID,
                fromPhoneNumber: '15550577504',
                uploaded_file: this.fileSelected,
            };

            console.log('new message', data);

            // Verifica si el archivo seleccionado es una imagen
            if (this.isImageFile(this.fileSelected)) {
                this.selectedFileType = 'image';
            } else {
                console.error('Unsupported file type');
                return; // Tipo de archivo no compatible
            }

            // Envía el mensaje con el archivo de imagen
            this._chatService
                .sendMessageMultimedia(data, this.selectedFileType)
                .subscribe(
                    (value) => {
                        console.log('value', value);

                        // Limpiar el contenido del mensaje después de enviarlo
                        this.messageContent = '';
                        this.selectedImage = null;
                        this.fileSelected = null;
                        this.messageInput.nativeElement.blur();
                    },
                    (error) => {
                        console.error('Error sending message:', error);
                    }
                );
        }

        // Verifica si hay un archivo PDF seleccionado
        if (this.fileSelectedDocument) {
            const data: BodyMessage = {
                content: context,
                toPhone: phoneNumber,
                conversationID: conversationId,
                customerID: customerID,
                fromPhoneNumber: '15550577504',
                uploaded_file: this.fileSelectedDocument,
            };

            console.log('new message document', data);

            // Verifica si el archivo seleccionado es un PDF
            if (this.isPDFFile(this.fileSelectedDocument)) {
                this.selectedFileType = 'document';
            } else {
                console.error('Unsupported file type');
                return; // Tipo de archivo no compatible
            }

            // Envía el mensaje con el archivo PDF
            this._chatService
                .sendMessageMultimedia(data, this.selectedFileType)
                .subscribe(
                    (value) => {
                        console.log('value', value);

                        // Limpiar el contenido del mensaje después de enviarlo
                        this.messageContent = '';
                        this.selectedPDF = null;
                        this.fileSelectedDocument = null;
                        this.messageInput.nativeElement.blur();
                    },
                    (error) => {
                        console.error('Error sending message:', error);
                    }
                );
        }
    }

    trackByFn(index: number, item: any): any {
        return item || index;
    }

    message = '';
    sets = [
        'native',
        'google',
        'twitter',
        'facebook',
        'emojione',
        'apple',
        'messenger',
    ];
    set = 'facebook';
    showEmojiPicker = false;
    // messageContent: string = '';
    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    addEmoji(event: any) {
        const emoji = event.emoji.native;
        this.messageContent = this.messageContent + emoji; // Agrega el emoji al contenido actual
    }

    mostrarResponderInput() {
        this.isResponderInputVisible = true;
        this.isNotaPrivadaInputVisible = false;
        this.isResponderActive = true;
        this.isNotaPrivadaActive = false;
    }

    mostrarNotaPrivadaInput() {
        this.isResponderInputVisible = false;
        this.isNotaPrivadaInputVisible = true;
        this.isResponderActive = false;
        this.isNotaPrivadaActive = true;
    }

    openPDFSelector(): void {
        if (this.pdfFileInput) {
            this.pdfFileInput.nativeElement.accept = '.pdf';
            this.pdfFileInput.nativeElement.click();
        }
    }

    openImageSelector(): void {
        if (this.imageFileInput) {
            this.imageFileInput.nativeElement.accept = 'image/*';
            this.imageFileInput.nativeElement.click();
        }
    }

    // Función para verificar si el archivo es una imagen
    private isImageFile(file: File): boolean {
        return file.type.startsWith('image/');
    }

    // Función para verificar si el archivo es un PDF
    private isPDFFile(file: File): boolean {
        return (
            file.type === 'application/pdf' ||
            file.name.toLowerCase().endsWith('.pdf')
        );
    }

    handleImageInput(event: any): void {
        const files = event.target.files;
        if (files.length > 0) {
            const selectedFile: File = files[0];
            this.fileSelected = selectedFile;
            console.log(this.fileSelected);

            if (this.isImageFile(selectedFile)) {
                const imageUrl = URL.createObjectURL(selectedFile);

                // Almacena la información de la imagen seleccionada
                this.selectedImage = { name: selectedFile.name, url: imageUrl };
                this.selectedFileType = 'image';
            } else {
                Swal.fire({
                    text: 'Por favor, seleccione una imagen.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    }

    handlePDFInput(event: any): void {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            const selectedFile: File = files[0];
            this.fileSelectedDocument = selectedFile;
            console.log(this.fileSelectedDocument);

            if (this.isPDFFile(selectedFile)) {
                const pdfUrl = URL.createObjectURL(selectedFile);

                // Almacena la información del archivo PDF seleccionado
                this.selectedPDF = { name: selectedFile.name, url: pdfUrl };
                this.selectedFileType = 'document';
            } else {
                Swal.fire({
                    text: 'Por favor, seleccione un archivo PDF.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    }

    // Enviar mensaje presionando tecla enter
    onEnterKey(
        event: KeyboardEvent,
        uid: string,
        phoneNumber: string,
        ticketID: string
    ) {
        event.preventDefault(); // Evita el salto de línea

        // Verifica si la tecla presionada es Enter y el textarea está vacío
        if (event.key === 'Enter' && !this.messageContent.trim()) {
            console.warn(
                'No es permitido enviar un mensaje vacío al presionar Enter.'
            );
            // Muestra la advertencia solo si el textarea está vacío
            this.showEmptyMessageWarning = true;
            return;
        }

        // Envía el mensaje si la tecla presionada es Enter y el textarea no está vacío
        if (event.key === 'Enter') {
            this.sendText(uid, this.messageContent, phoneNumber, ticketID);
            // Oculta la advertencia si se envía un mensaje
            this.showEmptyMessageWarning = false;
        }
    }

    clearSelectedFile(): void {
        // Limpiar la información del archivo seleccionado
        this.selectedFileType = null;
        this.selectedImage = null;
        this.selectedPDF = null;
        this.fileSelected = null;
        this.fileSelectedDocument = null;

        // Restablecer las variables relacionadas con la selección de archivos
        if (this.pdfFileInput) {
            this.pdfFileInput.nativeElement.value = '';
        }
        if (this.imageFileInput) {
            this.imageFileInput.nativeElement.value = '';
        }

        // Forzar la detección de cambios después de limpiar el archivo
        this._changeDetectorRef.detectChanges();
    }


}
