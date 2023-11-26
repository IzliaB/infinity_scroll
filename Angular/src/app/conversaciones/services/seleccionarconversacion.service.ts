// En el servicio SelectedConversationService

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SelectedConversationService {
  private selectedConversationIdSubject = new BehaviorSubject<number | null>(null);
  private isConversationSelectedSubject = new BehaviorSubject<boolean>(false);

  selectedConversationId$ = this.selectedConversationIdSubject.asObservable();
  isConversationSelected$ = this.isConversationSelectedSubject.asObservable();

  constructor() {}

  selectConversation(conversationId: number) {
    this.selectedConversationIdSubject.next(conversationId);
    this.isConversationSelectedSubject.next(true); // Marcar como seleccionada
  }

  clearSelectedConversation() {
    this.selectedConversationIdSubject.next(null);
    this.isConversationSelectedSubject.next(false); // Marcar como no seleccionada
  }
}
