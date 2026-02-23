import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FarmButton } from '../../../../shared/components/buttons/farm-button/farm-button';
import { FarmButtonKind } from '../../../../shared/enums/farm-button-kind';
import { AnimalStockModel } from '../../models/animal-stock.model';
import { FarmService } from '../../services/farm.service';
import { AnimalTypeModel } from '../../models/animal-type.model';

@Component({
  selector: 'add-animal-stock-modal',
  imports: [
    CommonModule,
    FormsModule,
    FarmButton
  ],
  templateUrl: './add-animal-stock-modal.html',
  styleUrl: './add-animal-stock-modal.scss'
})
export class AddAnimalStockModal {

  //region parameters

  /** Notify the added animal stock. */
  @Output() public onAnimalAdded = new EventEmitter<AnimalStockModel>();

  //endregion

  //region fields

  /** If the modal is visible. */
  protected isVisible = false;

  /** Available animal types for selection */
  protected selectableAnimalTypes = new Array<AnimalTypeModel>();

  /** Form data */
  protected newAnimalStock = new AnimalStockModel();

  /** Loading state */
  protected isLoading = false;

  protected readonly FarmButtonKind = FarmButtonKind;
  protected readonly isNaN = isNaN;

  //endregion

  //region injections

  private farmService = inject(FarmService);

  //endregion

  //region methods

  /** Open the modal to add a new animal stock. */
  public async openModalAsync() {
    try {
      this.newAnimalStock = new AnimalStockModel();
      this.selectableAnimalTypes = await this.farmService.getAnimalTypesAsync();
      this.isVisible = true;
    } catch (error) {
      alert(`Une erreur est survenue lors du chargement des types d'animaux`);
      this.isVisible = false;
    }
  }

  /** Handle form submission. */
  protected async onSubmitAsync(animalForm: NgForm): Promise<void> {
    this.isLoading = true;
    if (animalForm.valid) {
      try {
        const newAnimal = await this.farmService.createAnimalStockAsync(this.newAnimalStock);
        this.onAnimalAdded.emit(newAnimal);
        this.isVisible = false;
      } catch (error) {
        alert(`Une erreur est survenue lors de la création du stock d'animaux.`);
      }
    }
    this.isLoading = false;
  }

  //endregion

}
