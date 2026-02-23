import { Injectable } from '@angular/core';
import Cookies from 'universal-cookie';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {

  //region methods

  /**
   * Get the current user identity.
   * @returns The current user identity and token.
   */
  public getUserIdentity(): { identity: string, token: string } {
    const cookie = new Cookies(null, {path: '/'});
    return {
      identity: cookie.get(environment.cookieKeys.userIdentity),
      token: cookie.get(environment.cookieKeys.userToken)
    };
  }

  /**
   * Get a `Authorization` HTTP header with the current user token.
   * @returns An HTTP header made from the current user token.
   */
  public getUserAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${this.getUserIdentity().token}`});
  }

  //endregion

}
