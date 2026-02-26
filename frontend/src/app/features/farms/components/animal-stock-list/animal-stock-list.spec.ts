import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AnimalStockList } from './animal-stock-list';
import { FarmService } from '../../services/farm.service';
import { UserIdentityService } from '../../../../shared/services/user-identity.service';
import { AnimalStockModel } from '../../models/animal-stock.model';

describe('AnimalStockList', () => {

  let component: AnimalStockList;
  let fixture: ComponentFixture<AnimalStockList>;
  let mockFarmService: jasmine.SpyObj<FarmService>;
  let mockUserIdentityService: jasmine.SpyObj<UserIdentityService>;

  beforeEach(async () => {
    mockFarmService = jasmine.createSpyObj('FarmService', [
      'getMyAnimalsAsync',
      'createAnimalStockAsync'
    ]);
    mockFarmService.getMyAnimalsAsync.and.returnValue(Promise.resolve([]));
    mockFarmService.createAnimalStockAsync.and.returnValue(Promise.resolve(new AnimalStockModel()));

    mockUserIdentityService = jasmine.createSpyObj('UserIdentityService', [
      'getUserIdentity',
      'getUserAuthorizationHeader'
    ]);
    mockUserIdentityService.getUserIdentity.and.returnValue({ identity: 'Fermier Test', token: 'token' });
    mockUserIdentityService.getUserAuthorizationHeader.and.returnValue(
      new HttpHeaders({ Authorization: 'Bearer token' })
    );

    await TestBed.configureTestingModule({
      imports: [AnimalStockList],
      providers: [
        { provide: FarmService, useValue: mockFarmService },
        { provide: UserIdentityService, useValue: mockUserIdentityService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalStockList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit — loadAnimalStocksAsync', () => {

    it('should call farmService.getMyAnimalsAsync on init', async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      expect(mockFarmService.getMyAnimalsAsync).toHaveBeenCalled();
    });

    it('should populate animalStocks after loading', async () => {
      const mockAnimals = [
        new AnimalStockModel({ id: 1, count: 5 }),
        new AnimalStockModel({ id: 2, count: 10 })
      ];
      mockFarmService.getMyAnimalsAsync.and.returnValue(Promise.resolve(mockAnimals));

      fixture.detectChanges();
      await fixture.whenStable();

      expect((component as any).animalStocks.length).toBe(2);
    });

    it('should sort animal stocks by ascending id', async () => {
      const mockAnimals = [
        new AnimalStockModel({ id: 3, count: 1 }),
        new AnimalStockModel({ id: 1, count: 2 }),
        new AnimalStockModel({ id: 2, count: 3 })
      ];
      mockFarmService.getMyAnimalsAsync.and.returnValue(Promise.resolve(mockAnimals));

      fixture.detectChanges();
      await fixture.whenStable();

      const stocks: AnimalStockModel[] = (component as any).animalStocks;
      expect(stocks[0].id).toBe(1);
      expect(stocks[1].id).toBe(2);
      expect(stocks[2].id).toBe(3);
    });

    it('should set isLoading to false after successful load', async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      expect((component as any).isLoading).toBeFalse();
    });

    it('should navigate to / on a 401 error', async () => {
      mockFarmService.getMyAnimalsAsync.and.returnValue(Promise.reject({ status: 401 }));
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

      fixture.detectChanges();
      await fixture.whenStable();

      expect(navigateSpy).toHaveBeenCalledWith('/');
    });

    it('should show an alert on a non-401 error', async () => {
      mockFarmService.getMyAnimalsAsync.and.returnValue(Promise.reject({ status: 500 }));
      const alertSpy = spyOn(window, 'alert');

      fixture.detectChanges();
      await fixture.whenStable();

      expect(alertSpy).toHaveBeenCalled();
    });

  });

});
