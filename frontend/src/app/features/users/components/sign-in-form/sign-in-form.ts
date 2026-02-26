import { Component, inject } from '@angular/core';
import { FarmButton } from '../../../../shared/components/buttons/farm-button/farm-button';
import { FarmInput } from '../../../../shared/components/form/farm-input/farm-input';
import { FarmInputType } from '../../../../shared/enums/farm-input-type';
import { UserService } from '../../services/user.service';
import { environment } from '../../../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    FarmButton,
    FarmInput,
    RouterLink
  ],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.scss'
})
export class SignInForm {

  //region fields

  /** Email and password for authentication. */
  protected connectionData = {email: '', password: ''};

  /** If the component is loading. */
  protected isLoading = false;

  public readonly FarmInputType = FarmInputType;

  //endregion

  //region injections

  private userService = inject(UserService);

  private router = inject(Router);

  //endregion

  //region methods

  /**
   * Verify if the connection data is valid.
   * @returns True if the form is valid, else false.
   */
  protected isFormValid(): boolean {
    if (
      !environment.emailRegex.test(this.connectionData.email) ||
      this.connectionData.email.length > 50
    ) return false;
    return !(!/\S/.test(this.connectionData.password) || this.connectionData.password.length > 75);
  }

  /** Sign in using the provided connection data. */
  protected async signInUserAsync() {
    this.isLoading = true;
    if (this.isFormValid()) {
      try {

        // Sign in using the provided connection data
        const identity = await this.userService.signInAsync(this.connectionData.email, this.connectionData.password);

        // Save the returned user identity and token inside cookies
        const cookie = new Cookies(null, {path: '/'});
        cookie.set(environment.cookieKeys.userIdentity, identity.identity);
        cookie.set(environment.cookieKeys.userToken, identity.token);

        // Redirect to the animal stock management page
        await this.router.navigateByUrl('/my-farm');

      } catch (e) {
        switch ((e as HttpErrorResponse).status) {
          case 404:
            alert('Aucun utilisateur ne correspond aux données saisies.');
            break;
          case 401:
            alert('Adresse mail ou mot de passe invalide.');
            break;
          default:
            alert('Une erreur est survenue.');
        }
      }
    }
    this.isLoading = false;
  }

  //endregion

}
