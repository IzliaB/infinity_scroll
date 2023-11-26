import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProactiveWhatsappComponent } from './proactive-whatsapp.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    declarations: [ProactiveWhatsappComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule
    ],
    exports: [ProactiveWhatsappComponent],
})
export class ProactiveWhatsappModule {}
