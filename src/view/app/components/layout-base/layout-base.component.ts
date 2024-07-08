import { AfterViewInit, Component } from '@angular/core';
import { ProgressQueryBarService } from '../../services/progress-query-bar.service';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.scss',
})
export class LayoutBaseComponent implements AfterViewInit {
  public progressShow: boolean = false;

  constructor(private readonly progressBarService: ProgressQueryBarService) {}

  ngAfterViewInit(): void {
    this.progressBarService.visibility.subscribe((show) => {
      this.progressShow = show;
    });
  }
}
