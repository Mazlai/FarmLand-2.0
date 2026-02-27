import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpHeaders } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FarmService } from './farm.service';
import { UserIdentityService } from '../../../shared/services/user-identity.service';
import { AnimalStockModel } from '../models/animal-stock.model';
import { environment } from '../../../../environments/environment';

describe('FarmService', () => {

  let service: FarmService;
  let httpMock: HttpTestingController;
  let mockUserIdentityService: any;

  beforeEach(() => {
    mockUserIdentityService = {
      getUserAuthorizationHeader: vi.fn().mockReturnValue(
        new HttpHeaders({ Authorization: 'Bearer test-token' })
      )
    };

    TestBed.configureTestingModule({
      providers: [
        FarmService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserIdentityService, useValue: mockUserIdentityService }
      ]
    });

    service = TestBed.inject(FarmService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMyAnimalsAsync', () => {

    it('should send a GET request to /farms/my-farm', async () => {
      const promise = service.getMyAnimalsAsync();
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
      await promise;
    });

    it('should include the Authorization header', async () => {
      const promise = service.getMyAnimalsAsync();
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush([]);
      await promise;
    });

    it('should resolve with the animal stock array', async () => {
      const mockData = [{ id: 1, count: 5 }, { id: 2, count: 10 }];
      const promise = service.getMyAnimalsAsync();
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm`);
      req.flush(mockData);
      const result = await promise;
      expect(result).toEqual(mockData as any);
    });

  });

  describe('getAnimalTypesAsync', () => {

    it('should send a GET request to /farms/animal-types', async () => {
      const promise = service.getAnimalTypesAsync();
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/animal-types`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
      await promise;
    });

    it('should not send an Authorization header', async () => {
      const promise = service.getAnimalTypesAsync();
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/animal-types`);
      expect(req.request.headers.has('Authorization')).toBe(false);
      req.flush([]);
      await promise;
    });

  });

  describe('createAnimalStockAsync', () => {

    it('should send a POST request to /farms/my-farm', async () => {
      const stock = new AnimalStockModel({ id: 1, description: 'Vaches', count: 10 });
      const promise = service.createAnimalStockAsync(stock);
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm`);
      expect(req.request.method).toBe('POST');
      req.flush(stock);
      await promise;
    });

    it('should include the animal stock in the body', async () => {
      const stock = new AnimalStockModel({ description: 'Poules', count: 20 });
      const promise = service.createAnimalStockAsync(stock);
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm`);
      expect(req.request.body.description).toBe('Poules');
      expect(req.request.body.count).toBe(20);
      req.flush(stock);
      await promise;
    });

  });

  describe('updateAnimalStockAsync', () => {

    it('should send a PUT request to /farms/my-farm', async () => {
      const stock = new AnimalStockModel({ id: 3, count: 15 });
      const promise = service.updateAnimalStockAsync(stock);
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm`);
      expect(req.request.method).toBe('PUT');
      req.flush(stock);
      await promise;
    });

  });

  describe('deleteAnimalStockAsync', () => {

    it('should send a DELETE request to /farms/my-farm/:id', async () => {
      const promise = service.deleteAnimalStockAsync(42);
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm/42`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
      await promise;
    });

    it('should include the Authorization header', async () => {
      const promise = service.deleteAnimalStockAsync(7);
      const req = httpMock.expectOne(`${environment.apiUrl}/farms/my-farm/7`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush({});
      await promise;
    });

  });

});