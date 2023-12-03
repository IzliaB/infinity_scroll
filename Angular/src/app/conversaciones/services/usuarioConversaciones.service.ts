import { Inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Firestore, collectionData} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { UsuarioConversaciones } from '../models/usuarioConversaciones';

const APIURL = environment.apiBaseUrl

@Injectable({ 
    providedIn: 'root'
})
export class UsuarioConversacionesService {

    constructor(private firestore: Firestore) { }

    // firestoreUserConversationsCollection = this.firestore.collection('userConversations');
    // firestoreUserConversationsCollection = this.firestore.collection('userConversations', ref => ref.orderBy('date', 'desc'));

    // userConversations$ = this.firestoreUserConversationsCollection.snapshotChanges().pipe(
    //     map(actions => {
    //         return actions.map(u => {
    //             const userConversation = u.payload.doc as any;
    //             const id = userConversation.id;
    //             // console.log('userConversation',{ id, ...userConversation.data() });
    //             return { id, ...userConversation.data() } as UsuarioConversaciones;
    //         });
    //     })
    // );


}
