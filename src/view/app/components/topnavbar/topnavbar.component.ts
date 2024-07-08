import { Component, OnInit } from '@angular/core';
import { VendorType } from '../../modules/account/types/vendor.type';
import { AuthenticateUserUsecase } from '../../modules/account/usecase/authenticate-user.usecase';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss'
})
export class TopnavbarComponent implements OnInit{
  public user: VendorType;

  constructor(
    private readonly authenticateUserUsecase: AuthenticateUserUsecase
  ){}

  ngOnInit(): void {
    this.authenticateUserUsecase.current_user.subscribe(() => {
      this.user = this.authenticateUserUsecase.getCurrentUser();
    });
  }

  async logout(): Promise<void> {
    await this.authenticateUserUsecase.logout();
    window.location.href = '/login';
  }
}
