import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AnimalStockItem } from './animal-stock-item';
import { FarmService } from '../../services/farm.service';
import { AnimalStockModel } from '../../models/animal-stock.model';

describe('AnimalStockItem', () => {

  let component: AnimalStockItem;
  let fixture: ComponentFixture<AnimalStockItem>;
  let mockFarmService: any;

  beforeEach(async () => {
    mockFarmService = {
      updateAnimalStockAsync: vi.fn().mockResolvedValue(new AnimalStockModel()),
      deleteAnimalStockAsync: vi.fn().mockResolvedValue({})
    };

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
      const emitSpy = vi.spyOn(component.onCountUpdate, 'emit');
      await (component as any).updateStockCountAsync(1);
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should show an alert when the update fails', async () => {
      mockFarmService.updateAnimalStockAsync.mockRejectedValue(new Error('err'));
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      await (component as any).updateStockCountAsync(1);
      expect(alertSpy).toHaveBeenCalled();
    });

  });

  describe('deleteStockAsync', () => {

    it('should call farmService.deleteAnimalStockAsync when confirmed', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      await (component as any).deleteStockAsync();
      expect(mockFarmService.deleteAnimalStockAsync).toHaveBeenCalledWith(1);
    });

    it('should emit onStockDeleted when confirmed and deletion succeeds', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      const emitSpy = vi.spyOn(component.onStockDeleted, 'emit');
      await (component as any).deleteStockAsync();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should not call farmService.deleteAnimalStockAsync when user cancels', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false);
      await (component as any).deleteStockAsync();
      expect(mockFarmService.deleteAnimalStockAsync).not.toHaveBeenCalled();
    });

    it('should show an alert when the deletion fails', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      mockFarmService.deleteAnimalStockAsync.mockRejectedValue(new Error('err'));
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      await (component as any).deleteStockAsync();
      expect(alertSpy).toHaveBeenCalled();
    });

  });

});