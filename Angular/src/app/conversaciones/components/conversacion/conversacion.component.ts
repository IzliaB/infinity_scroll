import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ConversacionesService } from '../../services/conversacion.service';
import { Router } from '@angular/router';
import { SelectedConversationService } from 'app/conversaciones/services/seleccionarconversacion.service';
import { UsuarioConversacionesService } from 'app/conversaciones/services/usuarioConversaciones.service';
import { UsuarioConversaciones } from 'app/conversaciones/models/usuarioConversaciones';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.scss'],
  encapsulation  : ViewEncapsulation.None,
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

  conversations: any;
  conversationsByClient: { [clienteID: string]: any[] } = {}; // Inicializar como objeto vacío

  conversationsByClientArray: any[] = [];
  customerId: string = "";
  clienteInfo: any;

  conversations$: Observable<any>;
  usuarioConversacion$: Observable<UsuarioConversaciones[]>

  hasConversations: boolean = false;


  constructor(
    private _chatService: ConversacionesService,
    private _changeDetectorRef: ChangeDetectorRef,
    private selectedConversationService: SelectedConversationService,
    private router: Router,
    private usuarioConversaciones: UsuarioConversacionesService
  ) {
  }

  ngOnInit(): void {
    this.usuarioConversacion$ = this.usuarioConversaciones.userConversations$;
  }

  ngOnDestroy(): void {
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

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  filterChats(query: string): void
  {
      // Reset the filter
      if ( !query )
      {
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
