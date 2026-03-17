import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { environment } from '../../../../environments/environment';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUpAsync', () => {

    it('should send a POST request to /users/sign-up', async () => {
      const user = new UserModel();
      user.email = 'test@example.com';
      const promise = service.signUpAsync(user);

      const req = httpMock.expectOne(`${environment.apiUrl}/users/sign-up`);
      expect(req.request.method).toBe('POST');
      req.flush({});

      await promise;
    });

    it('should include the user object in the request body', async () => {
      const user = new UserModel();
      user.email = 'jean@example.com';
      user.firstName = 'Jean';
      const promise = service.signUpAsync(user);

      const req = httpMock.expectOne(`${environment.apiUrl}/users/sign-up`);
      expect(req.request.body.email).toBe('jean@example.com');
      expect(req.request.body.firstName).toBe('Jean');
      req.flush({});

      await promise;
    });

  });

  describe('signInAsync', () => {

    it('should send a POST request to /users/sign-in', async () => {
      const promise = service.signInAsync('test@example.com', 'pass123');

      const req = httpMock.expectOne(`${environment.apiUrl}/users/sign-in`);
      expect(req.request.method).toBe('POST');
      req.flush({ identity: 'Test User', token: 'jwt' });

      await promise;
    });

    it('should send email and password in the request body', async () => {
      const promise = service.signInAsync('test@example.com', 'pass123');

      const req = httpMock.expectOne(`${environment.apiUrl}/users/sign-in`);
      expect(req.request.body).toEqual({ email: 'test@example.com', password: 'pass123' });
      req.flush({ identity: 'Test User', token: 'jwt' });

      await promise;
    });

    it('should resolve with the identity and token returned by the API', async () => {
      const expected = { identity: 'Jean Dupont', token: 'my-jwt-token' };
      const promise = service.signInAsync('jean@example.com', 'secret');

      const req = httpMock.expectOne(`${environment.apiUrl}/users/sign-in`);
      req.flush(expected);

      const result = await promise;
      expect(result).toEqual(expected);
    });

  });

});
