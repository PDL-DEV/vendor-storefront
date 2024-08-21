import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { URLUtils } from '../../../../utils/url.utils';

enum JourneySteps {
  CUSTOMER = 'customer',
  CART = 'cart'
}

@Component({
  selector: 'app-sales-journey-content',
  templateUrl: './sales-journey-content.component.html',
  styleUrl: './sales-journey-content.component.scss',
})
export class SalesJourneyContentComponent implements OnInit {

  private currentJourney: string;

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof ActivationStart
        )
      )
      .subscribe((event: any) => {
        this.currentJourney = URLUtils.getLastPath(event.url);
      });
  }

  async ngOnInit(): Promise<void> {
  }

  public journeyResumeIsActive(): boolean {
    if (this.currentJourney === JourneySteps.CUSTOMER) {
      return false;
    }

    return true;
  }
}
