import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreModel } from '../../../../core/models/store.model';
import { GetCurrentStoreUsecase } from '../../../../core/usecases/get-current-store.usecase';

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss',
})
export class VerticalNavbarComponent implements OnInit {
  public store: StoreModel;

  constructor(
    private readonly getCurentStoreUC: GetCurrentStoreUsecase,
    public readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getCurentStoreUC.execute().subscribe({
      next: (store) => {
        this.store = store;
      },
    });
  }
}
