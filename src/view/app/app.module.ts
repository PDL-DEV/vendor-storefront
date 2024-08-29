import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import {
  CurrencyMaskConfig,
  CurrencyMaskModule,
  CURRENCY_MASK_CONFIG,
  CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
} from 'ng2-currency-mask';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  registerLocaleData,
} from '@angular/common';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutBaseComponent } from './components/layout-base/layout-base.component';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { VerticalNavbarComponent } from './components/vertical-navbar/vertical-navbar.component';
import { ProgressQueryBarComponent } from './components/progress-query-bar/progress-query-bar.component';
import { ProgressQueryBarService } from '../services/progress-query-bar.service';
import { InjectScriptService } from '../services/inject-script.service';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginModule } from './pages/login/login.module';
import { DataModule } from '../../data/data.module';
import { SalesJourneyContentComponent } from './components/sales-journey-content/sales-journey-content.component';
import { SalesJourneyModule } from './pages/sales-journey/sales-journey.module';
import { SalesJourneyTopbarComponent } from './components/sales-journey-topbar/sales-journey-topbar.component';
import { PreviousRouteService } from '../services/previous-route.service';
import { SalesJourneyResumeSidebarComponent } from './components/sales-journey-resume-sidebar/sales-journey-resume-sidebar.component';
import { ComponentsModule } from './components/components.module';

registerLocaleData(localePt);
export let options: Partial<IConfig> | (() => Partial<IConfig>);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

export const CustomPercentMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '%',
  thousands: '.',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    LoginModule,
    DataModule,
    SalesJourneyModule,
  ],
  providers: [
    ProgressQueryBarService,
    InjectScriptService,
    provideClientHydration(),
    provideAnimationsAsync(),
    DatePipe,
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    provideEnvironmentNgxMask(),
    PreviousRouteService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
