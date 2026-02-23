import { Component, inject, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../../shared/services/user-identity.service';
import Cookies from 'universal-cookie';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'farm-header',
  imports: [],
  templateUrl: './farm-header.html',
  styleUrl: './farm-header.scss'
})
export class FarmHeader implements OnInit {

  //region fields

  /** Username to display. */
  public userName = '';

  //endregion

  //region injections

  private userIdentityService = inject(UserIdentityService);

  private router = inject(Router);

  //endregion

  //region methods

  ngOnInit() {
    this.userName = this.userIdentityService.getUserIdentity().identity;
  }

  /** Sign out the current user. */
  protected async signOutUserAsync() {
    if (confirm(`Êtes-vous sûr(e) de vouloir vous déconnecter ?`)) {
      const cookies = new Cookies(null, {path: '/'});
      cookies.remove(environment.cookieKeys.userToken);
      cookies.remove(environment.cookieKeys.userIdentity);
      await this.router.navigateByUrl('/');
    }
  }

  //endregion

}
