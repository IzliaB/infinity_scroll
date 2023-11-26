import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

@Component({
    selector: 'quick-chat',
    templateUrl: './quick-chat.component.html',
    styleUrls: ['./quick-chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'quickChat',
})
export class QuickChatComponent implements OnInit, OnDestroy {
    @ViewChild('messageInput') messageInput: ElementRef;
    opened: boolean = false;
    selectedChat: any;
    private _scrollStrategy: ScrollStrategy =
        this._scrollStrategyOptions.block();
    private _overlay: HTMLElement;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    showProactiveWhatsapp = false;

    /**
     * Constructor
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer2: Renderer2,
        private _detectChange: ChangeDetectorRef,
        private _zone: NgZone,
        private _scrollStrategyOptions: ScrollStrategyOptions
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'quick-chat-opened': this.opened,
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the panel
     */
    open(): void {
        // Return if the panel has already opened
        if (this.opened) {
            return;
        }

        // Open the panel
        this._toggleOpened(true);
    }

    /**
     * Close the panel
     */
    close(): void {
        // Return if the panel has already closed
        if (!this.opened) {
            return;
        }

        // Close the panel
        this._toggleOpened(false);
        this.showProactiveWhatsapp = false;
    }

    /**
     * Toggle the panel
     */
    toggle(): void {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the backdrop
     *
     * @private
     */
    private _showOverlay(): void {
        // Try hiding the overlay in case there is one already opened
        this._hideOverlay();

        // Create the backdrop element
        this._overlay = this._renderer2.createElement('div');

        // Return if overlay couldn't be create for some reason
        if (!this._overlay) {
            return;
        }

        // Add a class to the backdrop element
        this._overlay.classList.add('quick-chat-overlay');

        // Append the backdrop to the parent of the panel
        this._renderer2.appendChild(
            this._elementRef.nativeElement.parentElement,
            this._overlay
        );

        // Enable block scroll strategy
        this._scrollStrategy.enable();

        // Add an event listener to the overlay
        this._overlay.addEventListener('click', () => {
            this.close();
        });
    }

    /**
     * Hide the backdrop
     *
     * @private
     */
    private _hideOverlay(): void {
        if (!this._overlay) {
            return;
        }

        // If the backdrop still exists...
        if (this._overlay) {
            // Remove the backdrop
            this._overlay.parentNode.removeChild(this._overlay);
            this._overlay = null;
        }

        // Disable block scroll strategy
        this._scrollStrategy.disable();
    }

    /**
     * Open/close the panel
     *
     * @param open
     * @private
     */
    private _toggleOpened(open: boolean): void {
        // Set the opened
        this.opened = open;

        // If the panel opens, show the overlay
        if (open) {
            this._showOverlay();
        }
        // Otherwise, hide the overlay
        else {
            this._hideOverlay();
        }
    }

    //mostrar proactive Whatspp
    mostrarWhatsapp(): void {
        this.open();
        // Cambia el estado de visibilidad de ProactiveWhatsappComponent
        this._zone.run(() => {
            this.showProactiveWhatsapp = !this.showProactiveWhatsapp;
        });
        this._detectChange.detectChanges();
    }
}
