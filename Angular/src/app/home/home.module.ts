import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardPrincipalModule } from './components/dashboard-principal.module';
import { FuseSharedModule } from '@fuse/shared.module';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DashboardPrincipalModule,

    // MatButtonModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatRadioModule,
    // MatSidenavModule,
    // MatToolbarModule,

    FuseSharedModule
  ]
})
export class HomeModule { }
