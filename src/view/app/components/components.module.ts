import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { LayoutBaseComponent } from './layout-base/layout-base.component';
import { ProgressQueryBarComponent } from './progress-query-bar/progress-query-bar.component';
import { SalesJourneyContentComponent } from './sales-journey-content/sales-journey-content.component';
import { SalesJourneyResumeSidebarComponent } from './sales-journey-resume-sidebar/sales-journey-resume-sidebar.component';
import { SalesJourneyTopbarComponent } from './sales-journey-topbar/sales-journey-topbar.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { QuantityInputComponent } from './quantity-input/quantity-input.component';



@NgModule({
  declarations: [
    FabButtonComponent,
    LayoutBaseComponent,
    ProgressQueryBarComponent,
    SalesJourneyContentComponent,
    SalesJourneyResumeSidebarComponent,
    SalesJourneyTopbarComponent,
    TopnavbarComponent,
    VerticalNavbarComponent,
    QuantityInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    FabButtonComponent,
    LayoutBaseComponent,
    ProgressQueryBarComponent,
    SalesJourneyContentComponent,
    SalesJourneyResumeSidebarComponent,
    SalesJourneyTopbarComponent,
    TopnavbarComponent,
    VerticalNavbarComponent,
    QuantityInputComponent
  ]
})
export class ComponentsModule { }
