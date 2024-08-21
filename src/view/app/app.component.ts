import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { InjectScriptService } from '../services/inject-script.service';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { GetStoreUsecase } from '../../core/usecases/get-store.usecase';
import { GetCurrentStoreUsecase } from '../../core/usecases/get-current-store.usecase';
import { SetCurrentStoreUseCase } from '../../core/usecases/set-current-store.usecase';
import { StoreModel } from '../../core/models/store.model';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  private store: StoreModel;
  private currentUrl: string;
  private previousUrl: string;

  constructor(
    @Inject(InjectScriptService)
    private readonly injectScript: InjectScriptService,
    private router: Router,
    @Inject(DOCUMENT) private readonly document: Document,    
    private readonly getStoreUsecase: GetStoreUsecase,
    private readonly setCurrentStoreUC: SetCurrentStoreUseCase,
    private readonly getCurrentStoreUC: GetCurrentStoreUsecase
  ) {}

  async ngOnInit(): Promise<void> {        
    this.setStore();    
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

  setStore(): void {
    this.getCurrentStoreUC.execute().subscribe((currentStore) => {
      if (!currentStore) {
        this.getStoreUsecase.execute().subscribe((store) => {
          if (store) {
            this.setCurrentStoreUC.set(store);
          }
        });
      }

      this.store = currentStore;
      this.setColorPallet();
    });
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
      this.store.layout.primary_color
    );
  }
}
