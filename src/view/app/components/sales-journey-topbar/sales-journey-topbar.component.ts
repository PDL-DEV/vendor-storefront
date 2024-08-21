import { Component, Input, OnInit } from '@angular/core';
import { PreviousRouteService } from '../../../services/previous-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-journey-topbar',
  templateUrl: './sales-journey-topbar.component.html',
  styleUrl: './sales-journey-topbar.component.scss',
})
export class SalesJourneyTopbarComponent {
  constructor(
    private readonly previousRouteService: PreviousRouteService,
    private router: Router
  ) {}

  exit(): void {
    const prevUrl = this.previousRouteService.getPreviousUrl();
    const redirect = !prevUrl ? '/' : prevUrl;

    this.router.navigate([redirect]);
  }
}
