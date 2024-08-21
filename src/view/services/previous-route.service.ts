import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  public getPreviousUrl(): string | null {
    return this.previousUrl;
  }
}
