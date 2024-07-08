import { Component, OnInit } from '@angular/core';
import { GetCurrentUserUsecase } from '../../../../core/usecases/get-current-user.usecase';
import { UserModel } from '../../../../core/models/user.model';
import { UserLogoutUsecase } from '../../../../core/usecases/user-logout.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
})
export class TopnavbarComponent implements OnInit {
  public user: UserModel;

  constructor(
    private readonly getCurrentUserUC: GetCurrentUserUsecase,
    private readonly userLogoutUC: UserLogoutUsecase,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.getCurrentUserUC.get();
  }

  getInitialsName(): string {
    if (!this.user || !this.user.name) {
      return '';
    }

    return this.user.name.charAt(0);
  }

  async logout(): Promise<void> {
    this.userLogoutUC.execute();
    this.router.navigate(['/login'])
  }
}
