import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, filter, forkJoin, map, mergeMap, Observable, of, switchMap, take, tap, throwError, Subject, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { BodyMessage, ResponseImage, TypeMessage } from '../conversations.types';
import { ConversationMessagesInterface } from '../models/conversaciones';

const APIURL = environment.apiBaseUrl

export interface IConversation {
    customerID: string;
    ticketID: string;
    status: boolean;
    userIDs: any[];
    readDateTime: CreatedAt;
    lastMessageID: string;
    channelID: string;
    read: boolean;
    accountServiceID: string;
    createdAt: CreatedAt;
    isClosed: boolean;
    uid: string;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}
@Injectable({
    providedIn: 'root'
})
export class ConversacionesService {
    private _chat: BehaviorSubject<any> = new BehaviorSubject(null);
    private _chats: BehaviorSubject<any[]> = new BehaviorSubject(null);
    private _contact: BehaviorSubject<any> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<any[]> = new BehaviorSubject(null);
    private _profile: BehaviorSubject<any> = new BehaviorSubject(null);

    contacts: any[];
    chats: any[];
    user: any;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    constructor(private _httpClient: HttpClient, private afs: AngularFirestore) {
        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
    }


    getCustomerByID(customerId: string): Observable<any> {
        console.log('getCustomerByID customerId ', customerId);
        return this.afs.collection('customers').doc(customerId).get().pipe(
            map(customerData => {
                return customerData.data();
            })
        );
    }

    formatDate(timestamp) {
        // console.log(timestamp);
        const date = new Date(timestamp.seconds * 1000); // Multiplicamos por 1000 para convertir los segundos a milisegundos
        // console.log('date', date);
        return date;
    }

    //Enviar Mensaje
    sendMessage(message: any): Observable<any> {
        const url = `${APIURL}messages/messages-text`;
        return this._httpClient.post(url, message);
    }

    //enviar multimedia
    sendMessageMultimedia(bodyImage: BodyMessage, typeMessage: TypeMessage) {
        let formData = new FormData();
        formData.append('content', bodyImage.content);
        formData.append('toPhoneNumber', bodyImage.toPhone);
        formData.append('conversationID', bodyImage.conversationID);
        formData.append('customerID', bodyImage.customerID);
        formData.append('fromPhoneNumber', bodyImage.fromPhoneNumber);

        if (typeMessage === 'image' && bodyImage.uploaded_file) {
            // Para imágenes
            formData.append('uploaded_file', bodyImage.uploaded_file);
        } else if (typeMessage === 'document' && bodyImage.uploaded_file) {
            // Para documentos
            formData.append('uploaded_file', bodyImage.uploaded_file);
        }

        const url = `${APIURL}send_messages/messagesMedia?typeMessage=${typeMessage}`;
        console.log(formData);

        return this._httpClient.post<Document>(url, formData);
    }


    sendTextMessage(message: any): Observable<any> {
        const url = `${APIURL}send_messages/messages-text`;
        return this._httpClient.post(url, message);
    }

    //Enviar template de whatsapp
    sendMessageToWhatsapp(message: any): Observable<any> {
        const url = `${APIURL}send_messages/send`;
        return this._httpClient.post(url, message);
    }

    //obtner todos los chats
    getallChats(): Observable<any> {
        const url = `${APIURL}messages/getMessages`;
        return this._httpClient.get(url);
    }

    getTemplateById(id: string): Observable<any> {
        const url = `${APIURL}/get-template/${id}`;
        return this._httpClient.get(url);
    }

    getAllTemplates(): Observable<any> {
        const url = `${APIURL}whatsapp_templates/getAll`;
        return this._httpClient.get(url);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for chat
     */
    // get chat$(): Observable<any> {
    //     return this._chat.asObservable();
    // }

    /**
     * Getter for chats
     */
    get chats$(): Observable<any[]> {
        return this._chats.asObservable();
    }

    /**
     * Getter for contact
     */
    get contact$(): Observable<any> {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<any[]> {
        return this._contacts.asObservable();
    }

    /**
     * Getter for profile
     */
    get profile$(): Observable<any> {
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chats
     */
    getChats(): Observable<any> {
        return this._httpClient.get<any[]>('api/apps/chat/chats').pipe(
            tap((response: any[]) => {
                this._chats.next(response);
            })
        );
    }

    /**
     * Get contact
     *
     * @param id
     */
    getContact(id: string): Observable<any> {
        return this._httpClient.get<any>('api/apps/chat/contacts', { params: { id } }).pipe(
            tap((response: any) => {
                this._contact.next(response);
            })
        );
    }

    /**
     * Get contacts
     */
    getContacts(): Observable<any> {
        return this._httpClient.get<any[]>('api/apps/chat/contacts').pipe(
            tap((response: any[]) => {
                this._contacts.next(response);
            })
        );
    }

    /**
     * Get profile
     */
    getProfile(): Observable<any> {
        return this._httpClient.get<any>('api/apps/chat/profile').pipe(
            tap((response: any) => {
                this._profile.next(response);
            })
        );
    }

    /**
     * Reset the selected chat
     */
    resetChat(): void {
        this._chat.next(null);
    }
}
