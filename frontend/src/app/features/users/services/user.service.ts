import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //region fields

  /** User API URL. */
  private apiUrl = `${environment.apiUrl}/users`;

  //endregion

  //region injections

  private http = inject(HttpClient);

  //endregion

  //region methods

  /**
   * Creating a new user account.
   * @param user The user to sign up.
   */
  public signUpAsync(user: UserModel): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}/sign-up`, user));
  }

  /**
   * Authenticate using the provided connection data.
   * @param email User email.
   * @param password User password.
   * @returns The identity and the token corresponding to the authenticated user.
   */
  public signInAsync(email: string, password: string): Promise<{ identity: string, token: string }> {
    return firstValueFrom(this.http.post<{ identity: string, token: string }>(
      `${this.apiUrl}/sign-in`,
      {email: email, password: password}
    ));
  }

  //endregion

}
