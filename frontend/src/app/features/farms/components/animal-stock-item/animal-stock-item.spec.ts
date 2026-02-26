import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AnimalStockItem } from './animal-stock-item';
import { FarmService } from '../../services/farm.service';
import { AnimalStockModel } from '../../models/animal-stock.model';

describe('AnimalStockItem', () => {

  let component: AnimalStockItem;
  let fixture: ComponentFixture<AnimalStockItem>;
  let mockFarmService: jasmine.SpyObj<FarmService>;

  beforeEach(async () => {
    mockFarmService = jasmine.createSpyObj('FarmService', [
      'updateAnimalStockAsync',
      'deleteAnimalStockAsync'
    ]);
    mockFarmService.updateAnimalStockAsync.and.returnValue(Promise.resolve(new AnimalStockModel()));
    mockFarmService.deleteAnimalStockAsync.and.returnValue(Promise.resolve({}));

    await TestBed.configureTestingModule({
      imports: [AnimalStockItem],
      providers: [
        { provide: FarmService, useValue: mockFarmService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalStockItem);
    component = fixture.componentInstance;
    component.animal = new AnimalStockModel({ id: 1, count: 5, description: 'Vaches' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateStockCountAsync', () => {

    it('should increment the count by the given value', async () => {
      component.animal.count = 5;
      await (component as any).updateStockCountAsync(1);
      expect(component.animal.count).toBe(6);
    });

    it('should decrement the count by the given value', async () => {
      component.animal.count = 5;
      await (component as any).updateStockCountAsync(-1);
      expect(component.animal.count).toBe(4);
    });

    it('should call farmService.updateAnimalStockAsync', async () => {
      await (component as any).updateStockCountAsync(1);
      expect(mockFarmService.updateAnimalStockAsync).toHaveBeenCalledWith(component.animal);
    });

    it('should emit onCountUpdate after a successful update', async () => {
      const emitSpy = spyOn(component.onCountUpdate, 'emit');
      await (component as any).updateStockCountAsync(1);
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should show an alert when the update fails', async () => {
      mockFarmService.updateAnimalStockAsync.and.returnValue(Promise.reject(new Error('err')));
      const alertSpy = spyOn(window, 'alert');
      await (component as any).updateStockCountAsync(1);
      expect(alertSpy).toHaveBeenCalled();
    });

  });

  describe('deleteStockAsync', () => {

    it('should call farmService.deleteAnimalStockAsync when confirmed', async () => {
      spyOn(window, 'confirm').and.returnValue(true);
      await (component as any).deleteStockAsync();
      expect(mockFarmService.deleteAnimalStockAsync).toHaveBeenCalledWith(1);
    });

    it('should emit onStockDeleted when confirmed and deletion succeeds', async () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const emitSpy = spyOn(component.onStockDeleted, 'emit');
      await (component as any).deleteStockAsync();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should not call farmService.deleteAnimalStockAsync when user cancels', async () => {
      spyOn(window, 'confirm').and.returnValue(false);
      await (component as any).deleteStockAsync();
      expect(mockFarmService.deleteAnimalStockAsync).not.toHaveBeenCalled();
    });

    it('should show an alert when the deletion fails', async () => {
      spyOn(window, 'confirm').and.returnValue(true);
      mockFarmService.deleteAnimalStockAsync.and.returnValue(Promise.reject(new Error('err')));
      const alertSpy = spyOn(window, 'alert');
      await (component as any).deleteStockAsync();
      expect(alertSpy).toHaveBeenCalled();
    });

  });

});
