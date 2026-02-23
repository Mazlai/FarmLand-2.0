import { Routes } from '@angular/router';
import { SignUpForm } from './features/users/components/sign-up-form/sign-up-form';
import { SignInForm } from './features/users/components/sign-in-form/sign-in-form';
import { AnimalStockList } from './features/farms/components/animal-stock-list/animal-stock-list';

export const routes: Routes = [
  {path: 'sign-up', component: SignUpForm},
  {path: 'sign-in', component: SignInForm},
  {path: 'my-farm', component: AnimalStockList},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];
