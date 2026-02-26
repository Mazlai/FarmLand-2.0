import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FarmInput } from '../../../../shared/components/form/farm-input/farm-input';
import { FarmInputType } from '../../../../shared/enums/farm-input-type';
import { UserModel } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { FarmSelect } from '../../../../shared/components/form/farm-select/farm-select';
import { Genders } from '../../../../shared/enums/genders';
import { FarmButton } from '../../../../shared/components/buttons/farm-button/farm-button';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  imports: [
    FarmInput,
    FormsModule,
    FarmSelect,
    FarmButton,
    RouterLink
  ],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignUpForm {

  //region fields

  /** User to create via the form. */
  protected newUser = new UserModel();

  /** Genders selectable for the user. */
  protected selectableGenders = [{label: 'Fermier', value: Genders.MALE}, {label: 'Fermière', value: Genders.FEMALE}];

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
   * Verify if the user crated via the form is valid.
   * @returns True if the form is valid, else false.
   */
  protected isFormValid(): boolean {
    if (!/\S/.test(this.newUser.firstName) || this.newUser.firstName.length > 50) return false;
    if (this.newUser.lastName.length > 50) return false;
    if (!this.newUser.birthDate) return false;
    if (!this.newUser.gender) return false;
    if (
      !environment.emailRegex.test(this.newUser.email) ||
      this.newUser.email.length > 50
    ) return false;
    if (this.newUser.phone.length > 25) return false;
    return !(!/\S/.test(this.newUser.password) || this.newUser.password.length > 75);
  }

  /** Sign up the new user. */
  protected async signUpUserAsync() {
    this.isLoading = true;
    if (this.isFormValid()) {
      try {
        await this.userService.signUpAsync(this.newUser);
        alert('Compte créé, utilisez le formulaire pour vous connecter.');
        await this.router.navigateByUrl('/sign-in');
      } catch (e) {
        switch ((e as HttpErrorResponse).status) {
          case 403:
            alert('Un utilisateur avec la même adresse mail existe déjà.');
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
