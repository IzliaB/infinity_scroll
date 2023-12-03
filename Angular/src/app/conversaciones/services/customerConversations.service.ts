import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';
import { collection, Firestore, onSnapshot, query, orderBy, where, limit, startAfter, DocumentData, Query } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class CustomerConversationService {

    private nuevosMensajesState: State = {
        groupMessageIndex: 1,
        maxMessageSize: 10,
        lastVisibleDoc: null,
        isNewMessageEmit: false
    }

    private mensajesPaginadosStates: State = {
        groupMessageIndex: 1,
        maxMessageSize: 10,
        lastVisibleDoc: null,
        isNewMessageEmit: false
    }

    private _nuevosMensajesSubject = new BehaviorSubject<State>(this.nuevosMensajesState);
    readonly nuevosMensajesChanged$ = this._nuevosMensajesSubject.asObservable().pipe(distinctUntilChanged());

    private _mensajesPaginadosSubject = new BehaviorSubject<State>(this.mensajesPaginadosStates);
    readonly mensajesPaginadosChanged$ = this._mensajesPaginadosSubject.asObservable().pipe(distinctUntilChanged());

    private readonly firestore: Firestore = inject(Firestore);
    public allMessage: any[] = [];

    constructor() { }


    getNewMessages(customerId: string): Observable<any[]> {
        return this.nuevosMensajesChanged$.pipe(
            switchMap(({ maxMessageSize }) => {
                return new Observable<any[]>((observer) => {
                    let querySnapshot = query(
                        collection(this.firestore, 'messages'),
                        where('customerID', '==', customerId),
                        orderBy('createdAt', 'desc'),
                        limit(maxMessageSize)
                    );

                    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
                        const newMessage = snapshot.docs.map((u) => {
                            const userConversation = u.data() as any;
                            const id = u.id;
                            const transformedData = {
                                id,
                                ...userConversation,
                                createdAt: this.formatDate(userConversation.createdAt),
                            };
                            return transformedData as any;
                        });

                        console.log('newMessage', newMessage);

                        const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                        console.log('lastVisibleDoc 1', lastVisibleDoc);
                        this.nuevosMensajesState.lastVisibleDoc = lastVisibleDoc;

                        this.allMessage = [...newMessage];

                        console.log('this.allMessage 1', this.allMessage);

                        this.nuevosMensajesState.isNewMessageEmit = true;

                        this._nuevosMensajesSubject.next(this.nuevosMensajesState);

                        observer.next(this.allMessage);
                    });

                    return () => {
                        unsubscribe();
                    };
                });
            })
        );
    }

    getPageMessages(customerId: string, groupIndex: number) {
        console.log('groupIndex', groupIndex);
        return this.mensajesPaginadosChanged$.pipe(
            switchMap(({ maxMessageSize }) => {
                return new Observable<any[]>((observer) => {

                    let querySnapshot: Query<DocumentData, DocumentData>;

                    if (groupIndex > 1) {
                        querySnapshot = query(
                            collection(this.firestore, 'messages'),
                            where('customerID', '==', customerId),
                            orderBy('createdAt', 'desc'),
                            startAfter(this.nuevosMensajesState.lastVisibleDoc),
                            limit(maxMessageSize)
                        );
                    }

                    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
                        const newData = snapshot.docs.map((u) => {
                            const userConversation = u.data() as any;
                            const id = u.id;
                            const transformedData = {
                                id,
                                ...userConversation,
                                createdAt: this.formatDate(userConversation.createdAt),
                            };
                            return transformedData as any;
                        });

                        console.log('newData', newData);

                        if (newData.length === 0) {

                            console.log('ya no hay mas mensajes a mostrar');
                            this.allMessage = []
                            // this.resetPagination()

                        } else {
                            const lastVisibleDocPage = snapshot.docs[snapshot.docs.length - 1];
                            console.log('lastVisibleDocPage  1', lastVisibleDocPage);
                            this.nuevosMensajesState.lastVisibleDoc = lastVisibleDocPage;
                            
                            if (groupIndex > 1) {
                                // Páginas subsiguientes: agregar al final solo los mensajes paginados
                                this.allMessage = [...this.allMessage, ...newData];
                            } else {
                                // Primera página: agregar al principio los nuevos mensajes y los paginados
                                this.allMessage = newData;
                            }

                            console.log('this.allMessage 2', this.allMessage);

                            observer.next(this.allMessage);
                        }
                    });

                    return () => {
                        unsubscribe();
                    };
                });
            })
        );
    }

    changeStatePaginated(state: Partial<State>) {
        this.mensajesPaginadosStates = { ...this.mensajesPaginadosStates, ...state };
        this._mensajesPaginadosSubject.next(this.mensajesPaginadosStates);
    }

    formatDate(timestamp) {
        const date = new Date(timestamp.seconds * 1000);
        return date;
    }

}
interface State {
    groupMessageIndex: number,
    maxMessageSize: number,
    lastVisibleDoc: any,
    isNewMessageEmit: boolean
}
