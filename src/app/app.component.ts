import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { InjectScriptService } from './services/inject-script.service';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { GetStoreLayoutUsecase } from './modules/store/usecase/get-store-layout.usecase';
import { GetStoreDefinitionsService } from './modules/store/services/get-store-definitions.service';
import { StoreLayout } from './modules/store/types/store-layout';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private layout: StoreLayout;

  constructor(
    @Inject(InjectScriptService)
    private readonly injectScript: InjectScriptService,
    private router: Router,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly getStoreLayoutUsecase: GetStoreLayoutUsecase,
    private readonly getStoreDefService: GetStoreDefinitionsService,
    private readonly renderer: Renderer2
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setStoreLayout();
    await this.setColorPallet();
    this.injectScript.inject();

    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof ActivationStart
        )
      )
      .subscribe((event: any) => {
        if (event.url == '/') {
          // this.router.navigate(['/overview']);
        }
      });
  }

  async setStoreLayout(): Promise<void> {
    this.layout = await this.getStoreLayoutUsecase.getStoreLayout();

    if (this.layout) {
      return;
    }

    const store_layout = await this.getStoreDefService.getStoreLayout();
    if (!store_layout) {
      return;
    }

    this.layout = new StoreLayout(store_layout);
    await this.getStoreLayoutUsecase.setStoreLayout(this.layout);
  }

  ngAfterViewInit(): void {
    /*Togglable Js*/
    const wrapper = $('.hk-wrapper');
    const hkNavbarTogglable = $('.hk-navbar-togglable');
    $(document).on('click', '.hk-navbar-togglable', function (e: any) {
      if (!(wrapper.attr('data-navbar-style') == 'collapsed'))
        wrapper.attr('data-navbar-style', 'collapsed');
      else wrapper.removeAttr('data-navbar-style');
      hkNavbarTogglable.find('.feather-icon').toggleClass('d-none');
      return false;
    });
  }

  private setColorPallet(): void {
    this.document.documentElement.style.setProperty(
      '--primary',
      this.layout.primary_color
    );
  }
}
