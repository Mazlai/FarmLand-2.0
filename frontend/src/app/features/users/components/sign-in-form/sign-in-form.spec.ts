import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SignInForm } from './sign-in-form';
import { UserService } from '../../services/user.service';

describe('SignInForm', () => {

  let component: SignInForm;
  let fixture: ComponentFixture<SignInForm>;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      signInAsync: vi.fn().mockResolvedValue({ identity: 'Jean', token: 'token' })
    };

    await TestBed.configureTestingModule({
      imports: [SignInForm],
      providers: [
        { provide: UserService, useValue: mockUserService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isFormValid', () => {

    it('should return false when form is empty', () => {
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false with an invalid email format', () => {
      (component as any).connectionData = { email: 'pas-un-email', password: 'password123' };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false with a blank password', () => {
      (component as any).connectionData = { email: 'test@example.com', password: '   ' };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when email exceeds 50 characters', () => {
      (component as any).connectionData = {
        email: 'a'.repeat(42) + '@example.com',
        password: 'password'
      };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when password exceeds 75 characters', () => {
      (component as any).connectionData = {
        email: 'test@example.com',
        password: 'a'.repeat(76)
      };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return true with valid email and password', () => {
      (component as any).connectionData = { email: 'test@example.com', password: 'password123' };
      expect((component as any).isFormValid()).toBe(true);
    });

  });

  describe('signInUserAsync', () => {

    it('should call userService.signInAsync when form is valid', async () => {
      (component as any).connectionData = { email: 'test@example.com', password: 'password123' };
      await (component as any).signInUserAsync();
      expect(mockUserService.signInAsync).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should not call userService.signInAsync when form is invalid', async () => {
      (component as any).connectionData = { email: '', password: '' };
      await (component as any).signInUserAsync();
      expect(mockUserService.signInAsync).not.toHaveBeenCalled();
    });

    it('should set isLoading to false after completion', async () => {
      (component as any).connectionData = { email: 'test@example.com', password: 'password123' };
      await (component as any).signInUserAsync();
      expect((component as any).isLoading).toBe(false);
    });

  });

});