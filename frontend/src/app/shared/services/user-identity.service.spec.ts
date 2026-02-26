import { TestBed } from '@angular/core/testing';
import { UserIdentityService } from './user-identity.service';
import { HttpHeaders } from '@angular/common/http';

describe('UserIdentityService', () => {

  let service: UserIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIdentityService]
    });
    service = TestBed.inject(UserIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserIdentity', () => {

    it('should return an object with identity and token properties', () => {
      const result = service.getUserIdentity();
      expect(result.identity).toBeDefined();
      expect(result.token).toBeDefined();
    });

  });

  describe('getUserAuthorizationHeader', () => {

    it('should return an HttpHeaders instance', () => {
      spyOn(service, 'getUserIdentity').and.returnValue({ identity: 'Jean', token: 'abc123' });
      const headers = service.getUserAuthorizationHeader();
      expect(headers).toBeInstanceOf(HttpHeaders);
    });

    it('should set Authorization header as Bearer token', () => {
      spyOn(service, 'getUserIdentity').and.returnValue({ identity: 'Jean', token: 'my-token' });
      const headers = service.getUserAuthorizationHeader();
      expect(headers.get('Authorization')).toBe('Bearer my-token');
    });

  });

});
