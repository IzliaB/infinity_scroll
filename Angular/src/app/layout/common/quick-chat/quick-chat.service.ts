import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Customer, UserData } from './quick-chat.types';

const APIURL = environment.apiBaseUrl;

@Injectable({
    providedIn: 'root',
})
export class QuickChatService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    //enviar template
    sendMessageToWhatsapp(message: any): Observable<any> {
        const url = `${APIURL}send_messages/messagesTemplate`;
        return this._httpClient.post(url, message);
    }

    //obetner todos los templates
    getAllTemplates(): Observable<any> {
        const url = `${APIURL}whatsapp_templates/getAll`;
        return this._httpClient.get(url);
    }

    //los clientes
    getAllUsers(): Observable<UserData[]> {
        const url = `${APIURL}customer/getAll`;
        return this._httpClient.get<UserData[]>(url);
    }

    //crear cliente
    createCustomer(customer: Customer): Observable<string> {
        const url = `${APIURL}customer/save`;
        return this._httpClient.post<string>(url, customer);
    }
}
