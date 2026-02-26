import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { FarmHeader } from './farm-header';
import { UserIdentityService } from '../../../../shared/services/user-identity.service';

describe('FarmHeader', () => {

  let component: FarmHeader;
  let fixture: ComponentFixture<FarmHeader>;
  let mockUserIdentityService: jasmine.SpyObj<UserIdentityService>;

  beforeEach(async () => {
    mockUserIdentityService = jasmine.createSpyObj('UserIdentityService', ['getUserIdentity', 'getUserAuthorizationHeader']);
    mockUserIdentityService.getUserIdentity.and.returnValue({ identity: 'Jean Dupont', token: 'token' });

    await TestBed.configureTestingModule({
      imports: [FarmHeader],
      providers: [
        { provide: UserIdentityService, useValue: mockUserIdentityService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set userName from the user identity service', () => {
      expect(component.userName).toBe('Jean Dupont');
    });

    it('should call getUserIdentity on init', () => {
      expect(mockUserIdentityService.getUserIdentity).toHaveBeenCalled();
    });

  });

  describe('signOutUserAsync', () => {

    it('should navigate to / when the user confirms sign-out', async () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

      await (component as any).signOutUserAsync();

      expect(navigateSpy).toHaveBeenCalledWith('/');
    });

    it('should not navigate when the user cancels sign-out', async () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigateByUrl');

      await (component as any).signOutUserAsync();

      expect(navigateSpy).not.toHaveBeenCalled();
    });

  });

});
