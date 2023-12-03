import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioConversaciones } from 'app/conversaciones/models/usuarioConversaciones';
import { Unsubscribe, collection, Firestore, onSnapshot, query, orderBy } from '@angular/fire/firestore';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversacionComponent implements OnInit, OnDestroy {
  chats: any[];
  drawerComponent: 'filter' | 'new-chat';
  drawerOpened: boolean = false;
  filteredChats: any[];
  filter: any;
  selectedChat: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  conversations: UsuarioConversaciones[] = [];
  conversationsByClient: { [clienteID: string]: any[] } = {}; // Inicializar como objeto vacío

  conversationsByClientArray: any[] = [];
  customerId: string = "";
  clienteInfo: any;

  conversations$: Observable<any>;
  usuarioConversacion$: Observable<UsuarioConversaciones[]>

  hasConversations: boolean = false;

  private _unsubscribe: Unsubscribe;
  private readonly firestore: Firestore = inject(Firestore);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getUserConversations();
  }


  getUserConversations() {
    const querySnapshot = query(collection(this.firestore, 'userConversations'), orderBy('date', 'desc'));
    this._unsubscribe = onSnapshot(querySnapshot, (snap) => {
      const data = snap.docs.map(u => {
        const userConversation = u.data() as any;
        const id = u.id;
        return { id, ...userConversation } as UsuarioConversaciones;
      });
      this.conversations = data;
      // console.log('this.conversations', this.conversations);
      this._changeDetectorRef.markForCheck();
    }, (err) => {
      console.log('err userConversations', err);
    });
  }


  ngOnDestroy(): void {
    if (this._unsubscribe) {
      this._unsubscribe(); // Desuscribirse del snapshot cuando el componente se destruye.
    }
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  selectConversation(conversationId: number, lastConversationID: string) {
    this.router.navigate(['/conversations/chats', conversationId], {
      queryParams: { lastConversation: lastConversationID }
    });
  }

  formatFecha(createdAt: { seconds: number, nanoseconds: number }): string {
    const currentDate = new Date();
    const messageDate = new Date(createdAt.seconds * 1000); // Multiplicar por 1000 para convertir segundos en milisegundos

    if (messageDate.toDateString() === currentDate.toDateString()) {
      // La fecha es igual a la fecha actual, mostrar hora:minuto
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
      return `${formattedHours}:${formattedMinutes}`;
    } else if (messageDate.getFullYear() === currentDate.getFullYear()) {
      // La fecha es del mismo año que la fecha actual, mostrar solo día/mes
      return `${messageDate.getDate()}/${messageDate.getMonth() + 1}`;
    } else {
      // La fecha es de un año diferente, mostrar día/mes/año
      return `${messageDate.getDate()}/${messageDate.getMonth() + 1}/${messageDate.getFullYear()}`;
    }
  }


  // Obtener Info del cliente

  getClientIds(conversations: any): string[] {
    // console.log('conversations gett', conversations);
    this._changeDetectorRef.markForCheck();
    return Object.keys(conversations);
  }

  getWhoIsMessage(conversacion: UsuarioConversaciones) {
    if (conversacion.lastMessage.isMessageCustomer === true) {
      const contentText = `Usted: ${conversacion.lastMessage.content}`
      const contentImg = `Usted: Ha enviado una imagen`;
      const contentFile = `Usted: Ha enviado un archivo`;
      const contentVideo = `Usted: Ha enviado un video`;
      const contentAudio = `Usted: Ha enviado un audio`;

      if (conversacion.lastMessage.type === "text") {
        return contentText;
      }

      if (conversacion.lastMessage.type === "document") {
        return contentFile;
      }

      if (conversacion.lastMessage.type === "image") {
        return contentImg;
      }
    } else {
      const contentText = conversacion.lastMessage.content
      const contentImg = `Ha enviado una imagen`;
      const contentFile = `Ha enviado un archivo`;
      const contentVideo = `Ha enviado un video`;
      const contentAudio = `Ha enviado un audio`;

      if (conversacion.lastMessage.type === "text") {
        return contentText;
      }

      if (conversacion.lastMessage.type === "document") {
        return contentFile;
      }

      if (conversacion.lastMessage.type === "image") {
        return contentImg;
      }
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  filterChats(query: string): void {
    // Reset the filter
    if (!query) {
      this.filteredChats = this.chats;
      return;
    }
  }


  //Open the new chat sidebar
  openNewChat(): void {
    this.drawerComponent = 'new-chat';
    this.drawerOpened = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }


  openMessageView(id: string) {
    this.router.navigate(['messages/conversation', id]);
  }

  //Open the profile sidebar
  openFilter(): void {
    this.drawerComponent = 'filter';
    this.drawerOpened = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

}
