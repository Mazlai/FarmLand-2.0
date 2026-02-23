import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAnimalStockModal } from '../add-animal-stock-modal/add-animal-stock-modal';
import { AnimalStockItem } from '../animal-stock-item/animal-stock-item';
import { AnimalStockModel } from '../../models/animal-stock.model';
import { FarmService } from '../../services/farm.service';
import { FarmButtonKind } from '../../../../shared/enums/farm-button-kind';
import { FarmHeader } from '../farm-header/farm-header';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-stock-list',
  imports: [
    CommonModule,
    FarmHeader,
    AddAnimalStockModal,
    AnimalStockItem,
    FarmHeader
  ],
  templateUrl: './animal-stock-list.html',
  styleUrl: './animal-stock-list.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AnimalStockList implements OnInit {

  //region fields

  /** List of animal stocks from API. */
  protected animalStocks: AnimalStockModel[] = [];

  /** Loading state. */
  protected isLoading = true;

  protected readonly FarmButtonKind = FarmButtonKind;

  //endregion

  //region injections

  private farmService = inject(FarmService);

  private router = inject(Router);

  //endregion

  //region methods

  async ngOnInit() {
    await this.loadAnimalStocksAsync();
  }

  /** Load animal stocks from API. */
  protected async loadAnimalStocksAsync() {
    this.isLoading = true;
    try {
      this.animalStocks = (await this.farmService.getMyAnimalsAsync()).sort((a, b) => a.id - b.id);
      this.isLoading = false;
    } catch (e) {
      switch ((e as HttpErrorResponse).status) {
        case 401:
          await this.router.navigateByUrl('/');
          break;
        default:
          alert(`Une erreur est survenue lors du chargement des stocks d'animaux.`);
      }
    }
  }

  //endregion

}
