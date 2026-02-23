import { AnimalTypeModel } from './animal-type.model';

export class AnimalStockModel {

  public id = NaN;

  public description = '';

  public animalTypeId = NaN;

  public count = 0;

  public userId = NaN;

  public animalType = new AnimalTypeModel();

  constructor(data?: Partial<AnimalStockModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
