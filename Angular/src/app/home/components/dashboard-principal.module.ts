import { NgModule } from '@angular/core';
import { DashboardPrincipalComponent } from './dashboard-principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
// import { FuseWidgetModule, FuseSidebarModule } from '@fuse/components';
// import { FuseSharedModule } from '@fuse/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [DashboardPrincipalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    CommonModule,
    LayoutModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatDividerModule,
    FuseSharedModule,
    // FuseWidgetModule,
    // FuseSidebarModule,
  ],
  exports:[DashboardPrincipalComponent]
})
export class DashboardPrincipalModule { }
