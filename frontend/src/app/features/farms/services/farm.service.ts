import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AnimalStockModel } from '../models/animal-stock.model';
import { environment } from '../../../../environments/environment';
import { UserIdentityService } from '../../../shared/services/user-identity.service';
import { AnimalTypeModel } from '../models/animal-type.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  //region fields

  /** Farm API URL. */
  private apiUrl = `${environment.apiUrl}/farms`;

  //endregion

  //region injections

  private http = inject(HttpClient);

  private userIdentityService = inject(UserIdentityService);

  //endregion

  //region methods

  /**
   * Get current user's animals from API.
   * @returns Animal stock array.
   */
  public getMyAnimalsAsync(): Promise<AnimalStockModel[]> {
    return firstValueFrom(this.http.get<AnimalStockModel[]>(
      `${this.apiUrl}/my-farm`,
      {headers: this.userIdentityService.getUserAuthorizationHeader()}
    ));
  }

  /**
   * Get all available animal types.
   * @returns Animal type array.
   */
  public getAnimalTypesAsync(): Promise<AnimalTypeModel[]> {
    return firstValueFrom(this.http.get<AnimalTypeModel[]>(`${this.apiUrl}/animal-types`));
  }

  /**
   * Create a new animal stock.
   * @param animalStock Animal stock to add.
   * @returns The created animal stock.
   */
  public createAnimalStockAsync(animalStock: AnimalStockModel): Promise<AnimalStockModel> {
    return firstValueFrom(this.http.post<AnimalStockModel>(
      `${this.apiUrl}/my-farm`,
      animalStock,
      {headers: this.userIdentityService.getUserAuthorizationHeader()}
    ));
  }

  /**
   * Update an animal stock (typically just the count).
   * @param animalStock Animal stock to update.
   * @returns The updated animal stock.
   */
  public updateAnimalStockAsync(animalStock: AnimalStockModel): Promise<AnimalStockModel> {
    return firstValueFrom(this.http.put<AnimalStockModel>(
      `${this.apiUrl}/my-farm`,
      animalStock,
      {headers: this.userIdentityService.getUserAuthorizationHeader()}
    ));
  }

  /**
   * Delete an animal stock.
   * @param animalStockId ID of the animal stock to delete.
   */
  public deleteAnimalStockAsync(animalStockId: number): Promise<any> {
    return firstValueFrom(this.http.delete<AnimalStockModel>(
      `${this.apiUrl}/my-farm/${animalStockId}`,
      {headers: this.userIdentityService.getUserAuthorizationHeader()}
    ));
  }

  //endregion

}
