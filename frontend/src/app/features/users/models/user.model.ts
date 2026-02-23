import { Genders } from '../../../shared/enums/genders';

export class UserModel {

  public id = NaN;

  public firstName = '';

  public lastName = '';

  public birthDate = new Date();

  public gender?: Genders.MALE;

  public email = '';

  public password = '';

  public phone = '';

}
