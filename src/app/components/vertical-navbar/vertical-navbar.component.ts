import { Component, OnInit } from '@angular/core';
import { StoreLayout } from '../../modules/store/types/store-layout';
import { GetStoreLayoutUsecase } from '../../modules/store/usecase/get-store-layout.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss'
})
export class VerticalNavbarComponent implements OnInit {
  public layout: StoreLayout;

  constructor(
    private readonly getStoreLayoutUsecase: GetStoreLayoutUsecase,
    public readonly router: Router
  ){    }


  ngOnInit(): void {
    this.getStoreLayoutUsecase.store_layout.subscribe(() => {
      this.layout = this.getStoreLayoutUsecase.getStoreLayout();
    });
  }
}
