// scrollService.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPositionSubject = new Subject<number>();
  private scrollDirectionSubject = new Subject<string>();

  scrollPosition$ = this.scrollPositionSubject.asObservable();
  scrollDirection$ = this.scrollDirectionSubject.asObservable();

  updateScrollPosition(position: number): void {
    this.scrollPositionSubject.next(position);
  }

  scrollDirection(direction: string): void {
    console.log('Dirección del desplazamiento:', direction);
    this.scrollDirectionSubject.next(direction);
  }
}
