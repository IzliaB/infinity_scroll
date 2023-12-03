import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, take, tap, catchError } from 'rxjs';


// Options to reproduce firestore queries consistently
interface QueryConfig {
    path: string, // path to collection
    field: string, // field to orderBy
    limit?: number, // limit per query
    reverse?: boolean, // reverse order?
    prepend?: boolean // prepend to source?
}

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    // Source data
    private _done = new BehaviorSubject(false);
    private _loading = new BehaviorSubject(false);
    private _data = new BehaviorSubject([]);
    private _state = new BehaviorSubject<'loading' | 'complete' | 'error'>('complete'); // Added state

    private query: QueryConfig;

    // Observable data
    data: Observable<any>;
    done: Observable<boolean> = this._done.asObservable();
    loading: Observable<boolean> = this._loading.asObservable();
    state: Observable<'loading' | 'complete' | 'error'> = this._state.asObservable();


    constructor(private afs: AngularFirestore) { }

    getAllMessageByCustomerId(customerId: string, index: number) {
        return this.afs.collection('messages', (ref) => ref.where("customerID", "==", customerId).orderBy("createdAt").limit(10)).valueChanges() as Observable<any>;
    }

    // Initial query sets options and defines the Observable
    init(clienteID: string, opts?) {
        this.query = {
            path: 'conversations',
            field: 'createdAt',
            limit: 10,
            reverse: false,
            prepend: false,
            ...opts
        };
    
        const first = this.afs.collection(this.query.path, ref => {
            return ref
                .where('customerID', '==', clienteID)
                .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit);
        });
    
        // console.log('Firestore Query:', first);
    
        this.mapAndUpdate(first);
    
        this.data = this._data.asObservable().pipe(
            switchMap((conversations: any) => {
                const messagesObservables = conversations.map(conversation => {
                    // console.log('conversation', conversation);
                    const messagesCollection = this.afs.collection(`conversations/${conversation.uid}/messages`);
                    return messagesCollection.valueChanges().pipe(
                        catchError(error => {
                            console.error('Error fetching messages:', error);
                            return of([]); // Manejar el error devolviendo un observable de un array vacío
                        })
                    );
                });
        
                return combineLatest(messagesObservables);
            }),
            tap((messagesArrays: any) => {
                // console.log('Messages Arrays:', messagesArrays);
            }),
            map((messagesArrays: any) => {
                const flattenedMessages = messagesArrays.flat().map(message => ({
                    ...message,
                    createdAt: this.formatDate(message.createdAt)
                }));
                // console.log('Flattened Messages (unsorted):', flattenedMessages);
                const sortedMessages = flattenedMessages.sort((a, b) => a.createdAt - b.createdAt);

                console.log('Sorted Messages:', sortedMessages);
                return sortedMessages;
            }),
            catchError(error => {
                console.error('Error combining messages:', error);
                return of([]); // Manejar el error devolviendo un observable de un array vacío
            })
        );
        
    }

    // Retrieves additional data from firestore
    more(clienteID) {
        // console.log('Calling more function with clienteID:', clienteID);
        const cursor = this.getCursor();

        // console.log('cursor', cursor);

        const more = this.afs.collection(this.query.path, ref => {
            return ref
                .where('customerID', '==', clienteID)
                .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                .limit(this.query.limit)
                .startAfter(cursor);
        });

        // console.log('Firestore More Query:', more);

        this.mapAndUpdate(more);
    }


    // Determines the doc snapshot to paginate query 
    private getCursor() {
        const current = this._data.value;
        if (current.length) {
            return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
        }
        return null;
    }

    // Maps the snapshot to usable format the updates source
    private mapAndUpdate(col: AngularFirestoreCollection<any>) {
        if (this._done.value || this._loading.value) {
            return;
        }
    
        // loading
        this._loading.next(true);

        this._state.next('loading'); // Set loading state
    
        // Map snapshot with doc ref (needed for cursor)
        return col.snapshotChanges()
            .pipe(
                take(1),
                tap(arr => {
                    let values = arr.map(snap => {
                        const data = snap.payload.doc.data();
                        const doc = snap.payload.doc;
    
                        // Transforma el campo createdAt a un objeto de fecha
                        const transformedData = {
                            ...data,
                            doc,
                            createdAt: this.formatDate(data.createdAt)
                        };
    
                        return transformedData;
                    });
    
                    // console.log('Transformed Values:', values);
    
                    // If prepending, reverse array
                    values = this.query.prepend ? values.reverse() : values;
    
                    // update source with new values, done loading
                    this._data.next(this._data.value.concat(values));
                    this._loading.next(false);
                    this._state.next('complete'); // Set complete state
    
                    // no more values, mark done
                    if (!values.length) {
                        this._done.next(true);
                    }
                })
            )
            .subscribe();
    }
    
    formatDate(timestamp) {
        // console.log(timestamp);
        const date = new Date(timestamp.seconds * 1000); // Multiplicamos por 1000 para convertir los segundos a milisegundos
        // console.log('date', date);
        return date;
    }
    // Reset the page
    reset() {
        this._data.next([]);
        this._done.next(false);
    }
}
