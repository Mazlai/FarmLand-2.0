import { AnimalStockModel } from './animal-stock.model';
import { AnimalTypeModel } from './animal-type.model';

describe('AnimalStockModel', () => {

  describe('default values', () => {

    it('should initialise id as NaN', () => {
      expect(isNaN(new AnimalStockModel().id)).toBeTrue();
    });

    it('should initialise description as empty string', () => {
      expect(new AnimalStockModel().description).toBe('');
    });

    it('should initialise count as 0', () => {
      expect(new AnimalStockModel().count).toBe(0);
    });

    it('should initialise animalType as an AnimalTypeModel instance', () => {
      expect(new AnimalStockModel().animalType).toBeInstanceOf(AnimalTypeModel);
    });

  });

  describe('constructor with partial data', () => {

    it('should apply provided id', () => {
      expect(new AnimalStockModel({ id: 42 }).id).toBe(42);
    });

    it('should apply provided description', () => {
      expect(new AnimalStockModel({ description: 'Vaches laitières' }).description).toBe('Vaches laitières');
    });

    it('should apply provided count', () => {
      expect(new AnimalStockModel({ count: 15 }).count).toBe(15);
    });

    it('should apply multiple fields simultaneously', () => {
      const model = new AnimalStockModel({ id: 1, description: 'Poulets', count: 100, userId: 7 });
      expect(model.id).toBe(1);
      expect(model.description).toBe('Poulets');
      expect(model.count).toBe(100);
      expect(model.userId).toBe(7);
    });

    it('should keep defaults for fields not provided', () => {
      const model = new AnimalStockModel({ id: 5 });
      expect(model.description).toBe('');
      expect(model.count).toBe(0);
    });

  });

});
