import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter()

  constructor( public el: ElementRef ) { }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    try {

      let top = event.target.scrollTop
      const height = this.el.nativeElement.scrollHeight
      const offset = this.el.nativeElement.offsetHeight

      if (top === 0) {
        this.scrollPosition.emit('bottom')
      }

      if (offset - height === top) {
        this.scrollPosition.emit('top')
      }

    } catch (err) {}
  }


}
