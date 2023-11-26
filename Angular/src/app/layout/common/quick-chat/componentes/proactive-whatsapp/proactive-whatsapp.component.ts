import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    Customer,
    MessageTemplate,
    SendMessageInterface,
    TemplateData,
    UserData,
} from '../../quick-chat.types';
import { QuickChatService } from '../../quick-chat.service';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-proactive-whatsapp',
    templateUrl: './proactive-whatsapp.component.html',
    styleUrls: [],
})
export class ProactiveWhatsappComponent implements OnInit {
    number = '15550577504';
    private destroy$: Subject<any> = new Subject<any>();
    form: FormGroup;
    templates: MessageTemplate[] = [];
    users: UserData[];
    CodUser: string;
    selectedUserId: string;
    showNameField: boolean = false;

    constructor(
        private fb: FormBuilder,
        private quickService: QuickChatService
    ) {
        //formulario reactivo
        this.form = this.fb.group({
            fromNumber: ['', Validators.required],
            toNumber: ['', Validators.required],
            message: ['', Validators.required],
            name: [''],
            senderName: [''],
        });
    }

    ngOnInit() {
        this.allUsers();
        this.allTemplates();

        this.form
            .get('message')
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe((selectedTemplate) => {
                console.log(
                    'Valor del template seleccionado:',
                    selectedTemplate
                );
                this.showNameField =
                    selectedTemplate === '4lHzM282MNDmOiQMoe2m';
                // Limpiar los campos name y senderName si el template no lo requiere
                if (!this.showNameField) {
                    this.form.get('name').setValue('');
                    this.form.get('senderName').setValue('');
                }
                // Actualizar la validación en los campos name y senderName
                this.updateValidators();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.destroy$.next(null);
        this.destroy$.complete();
    }

    //Usuarios
    allUsers() {
        this.quickService
            .getAllUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    // console.log('users:', data);
                    this.users = data;
                },
                error: (err) => {
                    console.log('Error:', err);
                },
            });
    }

    // templates WhatsApp
    allTemplates() {
        this.quickService
            .getAllTemplates()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    // console.log('Templates:', data);
                    this.templates = data;
                },
                error: (err) => {
                    console.log('Error:', err);
                },
            });
    }

    //Enviar template
    private sendMessage(formValues: any, customerId: string): void {
        // Construir el objeto de mensaje
        let message: SendMessageInterface = {
            conversationID: null,
            customerID: customerId,
            fromPhoneNumber: formValues.fromNumber,
            toPhoneNumber: formValues.toNumber,
            templateID: formValues.message,
            attachment: [],
            templateData: [], // Inicializar templateData como un arreglo vacío
        };

        console.log('TemplateID:', formValues.message);

        // Obtener el valor seleccionado del template (ID)
        const selectedTemplateId = formValues.message;
        message.templateData = [];

        // Verificar si el template seleccionado es diferente a '4lHzM282MNDmOiQMoe2m'
        if (selectedTemplateId === '4lHzM282MNDmOiQMoe2m') {
            const enteredName = formValues.name;
            const enteredSenderName = formValues.senderName;
            // Agregar datos adicionales al objeto message
            message.templateData = [
                {
                    data: enteredName,
                    contentType: 'BODY',
                    type: 'text',
                },
                {
                    data: enteredSenderName,
                    contentType: 'BODY',
                    type: 'text',
                },
            ];

            console.log('Added templateData:', message.templateData);
        } else {
            // Para 'template hello-world', asegúrate de que templateData esté vacío
            message.templateData = [];

            console.log('Empty templateData:', message.templateData);
        }

        // Enviar el mensaje
        this.quickService
            .sendMessageToWhatsapp(message)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mensaje Enviado con éxito',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Limpiar formulario
                    this.form.reset();
                },
                error: (error) => {
                    console.log('Error: ', error);
                    Swal.fire({
                        title: 'A ocurrido un error, el mensaje no fue enviado.',
                        text: 'Póngase en contacto con el equipo de soporte.',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                    });
                },
            });
    }

    filterUserNumber(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filtrar usuarios según la entrada de texto
        this.users = this.users.filter((user) => {
            const includesValue = user.phoneNumber
                .toLowerCase()
                .includes(value);
            if (includesValue) {
                this.selectedUserId = user.id; // Almacena el customerID
            }
            return includesValue;
        });

        // Si el campo está vacío, mostrar todos los usuarios nuevamente
        if (value === '') {
            this.allUsers(); // Obtener todos los usuarios nuevamente
        }
    }

    selectedPhoneNumber(event: MatAutocompleteSelectedEvent): void {
        const userNumber = event.option.value;
        const selectedUser = this.users.find(
            (x) => x.phoneNumber === userNumber
        );

        if (selectedUser) {
            this.selectedUserId = selectedUser.id; // Almacena el customerID
            this.form.controls['toNumber'].setValue(selectedUser.phoneNumber);
        }
    }

    //Crear customer
    createNewCustomer(): Observable<string> {
        const phoneNumber = this.form.get('toNumber').value;
        const newCustomer: Customer = {
            phoneNumber: phoneNumber,
            email: null,
            fullName: phoneNumber,
            lastChannelID: 'MVMvPJ3TAb0dwydLy1ht',
            lastOrganizationID: 'qhaVePBpUdx3yCEzx2ez',
        };

        return this.quickService.createCustomer(newCustomer);
    }

    onSubmit() {
        if (this.form.valid) {
            const formValues = this.form.value;
            const selectedTemplate = this.getSelectedTemplateValue();
            // Imprimir el valor en la consola
            console.log('Valor del template seleccionado:', selectedTemplate);
            // Verificar si el usuario ya existe
            const existingUser = this.users.find(
                (user) => user.phoneNumber === formValues.toNumber
            );

            if (!existingUser) {
                // Si el usuario no existe, crea un nuevo cliente
                this.createNewCustomer().subscribe(
                    (customerId) => {
                        // El nuevo cliente ha sido creado, actualiza la lista de usuarios
                        this.updateUserList();

                        // Asignar el customerId a selectedUserId
                        this.selectedUserId = customerId;

                        // Enviar el mensaje
                        this.sendMessage(formValues, customerId);
                    },
                    (error) => {
                        console.error('Error creando el cliente:', error);
                        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                    }
                );
            } else {
                // Si el usuario ya existe, simplemente envía el mensaje
                this.selectedUserId = existingUser.id; // Asignar el id del usuario existente a selectedUserId
                this.sendMessage(formValues, existingUser.id);
            }
        }
    }

    getSelectedTemplateValue(): string {
        return this.form.get('message').value;
    }

    // Método para la validación condicional de los campos name y senderName
    private updateValidators() {
        const nameControl = this.form.get('name');
        const senderNameControl = this.form.get('senderName');

        if (this.showNameField) {
            nameControl.setValidators([Validators.required]);
            senderNameControl.setValidators([Validators.required]);
        } else {
            nameControl.clearValidators();
            senderNameControl.clearValidators();
        }

        nameControl.updateValueAndValidity();
        senderNameControl.updateValueAndValidity();
    }

    updateUserList() {
        this.allUsers(); // Obtener todos los usuarios nuevamente
    }
}
