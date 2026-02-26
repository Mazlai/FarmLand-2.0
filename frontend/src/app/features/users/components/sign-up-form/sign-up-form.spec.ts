import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SignUpForm } from './sign-up-form';
import { UserService } from '../../services/user.service';
import { Genders } from '../../../../shared/enums/genders';

const VALID_USER = {
  firstName: 'Jean',
  lastName: 'Dupont',
  birthDate: new Date('1990-06-15'),
  gender: Genders.MALE,
  email: 'jean.dupont@example.com',
  phone: '0612345678',
  password: 'MonMotDePasse123'
};

describe('SignUpForm', () => {

  let component: SignUpForm;
  let fixture: ComponentFixture<SignUpForm>;
  let mockUserService: any;

  beforeEach(async () => {
    mockUserService = {
      signUpAsync: vi.fn().mockResolvedValue({})
    };

    await TestBed.configureTestingModule({
      imports: [SignUpForm],
      providers: [
        { provide: UserService, useValue: mockUserService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isFormValid', () => {

    it('should return false with default empty form', () => {
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return true with all valid fields', () => {
      (component as any).newUser = { ...VALID_USER };
      expect((component as any).isFormValid()).toBe(true);
    });

    it('should return false when firstName is blank', () => {
      (component as any).newUser = { ...VALID_USER, firstName: '   ' };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when firstName exceeds 50 characters', () => {
      (component as any).newUser = { ...VALID_USER, firstName: 'a'.repeat(51) };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when lastName exceeds 50 characters', () => {
      (component as any).newUser = { ...VALID_USER, lastName: 'a'.repeat(51) };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when birthDate is missing', () => {
      (component as any).newUser = { ...VALID_USER, birthDate: null };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when gender is not set', () => {
      (component as any).newUser = { ...VALID_USER, gender: undefined };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false with an invalid email format', () => {
      (component as any).newUser = { ...VALID_USER, email: 'pas-un-email' };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when email exceeds 50 characters', () => {
      (component as any).newUser = { ...VALID_USER, email: 'a'.repeat(42) + '@example.com' };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when phone exceeds 25 characters', () => {
      (component as any).newUser = { ...VALID_USER, phone: '0'.repeat(26) };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when password is blank', () => {
      (component as any).newUser = { ...VALID_USER, password: '   ' };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return false when password exceeds 75 characters', () => {
      (component as any).newUser = { ...VALID_USER, password: 'a'.repeat(76) };
      expect((component as any).isFormValid()).toBe(false);
    });

    it('should return true without a phone number (optional field)', () => {
      (component as any).newUser = { ...VALID_USER, phone: '' };
      expect((component as any).isFormValid()).toBe(true);
    });

    it('should return true without a lastName (optional field)', () => {
      (component as any).newUser = { ...VALID_USER, lastName: '' };
      expect((component as any).isFormValid()).toBe(true);
    });

  });

  describe('signUpUserAsync', () => {

    it('should call userService.signUpAsync when form is valid', async () => {
      (component as any).newUser = { ...VALID_USER };
      await (component as any).signUpUserAsync();
      expect(mockUserService.signUpAsync).toHaveBeenCalled();
    });

    it('should not call userService.signUpAsync when form is invalid', async () => {
      await (component as any).signUpUserAsync();
      expect(mockUserService.signUpAsync).not.toHaveBeenCalled();
    });

    it('should set isLoading to false after completion', async () => {
      (component as any).newUser = { ...VALID_USER };
      vi.spyOn(window, 'alert').mockImplementation(() => {});
      await (component as any).signUpUserAsync();
      expect((component as any).isLoading).toBe(false);
    });

  });

});