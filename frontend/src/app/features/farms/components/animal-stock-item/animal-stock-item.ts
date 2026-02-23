import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AnimalStockModel } from '../../models/animal-stock.model';
import { FarmButtonKind } from '../../../../shared/enums/farm-button-kind';
import { FarmService } from '../../services/farm.service';

@Component({
  selector: 'animal-stock-item',
  templateUrl: './animal-stock-item.html',
  styleUrl: './animal-stock-item.scss'
})
export class AnimalStockItem {

  //region parameters

  /** Animal data to display. */
  @Input() public animal = new AnimalStockModel();

  /** Notify when the item is clicked. */
  @Output() public onItemClick = new EventEmitter<void>();

  /** Notify when the count of the animal stock has been updated. */
  @Output() public onCountUpdate = new EventEmitter();

  /** Notify when the animal stock has been deleted. */
  @Output() public onStockDeleted = new EventEmitter();

  //endregion

  //region fields

  protected readonly FarmButtonKind = FarmButtonKind;

  //endregion

  //region injections

  private farmService = inject(FarmService);

  //endregion

  //region methods

  /**
   * Update the count of the animal stock.
   * @param value The value to add to the stock count.
   */
  protected async updateStockCountAsync(value: number) {
    try {
      this.animal.count += value;
      await this.farmService.updateAnimalStockAsync(this.animal);
      this.onCountUpdate.emit();
    } catch (e) {
      alert('Une erreur est survenue lors de la modification.');
    }
  }

  /** Delete the animal stock. */
  protected async deleteStockAsync() {
    if (confirm(`Supprimer ce stock d'animaux ?`)) {
      try {
        await this.farmService.deleteAnimalStockAsync(this.animal.id);
        this.onStockDeleted.emit();
      } catch (e) {
        alert('Une erreur est survenue lors de la suppression.');
      }
    }
  }

  //endregion

}
